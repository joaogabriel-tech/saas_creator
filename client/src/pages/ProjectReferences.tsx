import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, Video, Trash2, ExternalLink } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import ProjectLayout from "@/components/ProjectLayout";


export default function ProjectReferences() {
  const [, params] = useRoute("/project/:id/references");
  const [, navigate] = useLocation();
  const projectId = params?.id;

  const [videoUrl, setVideoUrl] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [niche, setNiche] = useState("");

  if (!projectId) {
    return <div>Projeto não encontrado</div>;
  }

  const { data: project } = trpc.projects.getById.useQuery({ id: parseInt(projectId) });
  const { data: references, refetch: refetchReferences } = trpc.references.list.useQuery({
    projectId: parseInt(projectId),
  });

  const utils = trpc.useUtils();

  const analyzeReferenceMutation = trpc.manus.analyzeReference.useMutation({
    onSuccess: async (data) => {
      toast.success(`Análise concluída! Novo saldo: ${data.newBalance} créditos`, {
        description: "Referência salva com sucesso",
      });
      
      // Save to database
      await createReferenceMutation.mutateAsync({
        projectId: parseInt(projectId),
        videoUrl,
        creatorName: creatorName || undefined,
        niche: niche || undefined,
        analysis: data.analysis,
        status: "completed",
      });

      setVideoUrl("");
      setCreatorName("");
      setNiche("");
      refetchReferences();
      utils.credits.getBalance.invalidate();
      utils.projects.getStats.invalidate({ projectId: parseInt(projectId) });
    },
    onError: (error) => {
      if (error.message.includes("créditos insuficientes")) {
        toast.error("Créditos insuficientes!", {
          description: "Você precisa de mais créditos para realizar esta análise",
          action: {
            label: "Ver Planos",
            onClick: () => window.location.href = "/pricing",
          },
        });
      } else {
        toast.error(`Erro na análise: ${error.message}`);
      }
    },
  });

  const createReferenceMutation = trpc.references.create.useMutation();

  const deleteReferenceMutation = trpc.references.delete.useMutation({
    onSuccess: () => {
      toast.success("Referência deletada!");
      refetchReferences();
      utils.projects.getStats.invalidate({ projectId: parseInt(projectId) });
    },
    onError: (error) => {
      toast.error(`Erro ao deletar: ${error.message}`);
    },
  });

  const handleAnalyze = async () => {
    if (!videoUrl.trim()) {
      toast.error("Por favor, insira uma URL de vídeo");
      return;
    }

    try {
      await analyzeReferenceMutation.mutateAsync({
        videoUrl,
        creatorName: creatorName || undefined,
        niche: niche || undefined,
      });
    } catch (error) {
      // Error already handled in onError
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja deletar esta referência?")) {
      deleteReferenceMutation.mutate({ id });
    }
  };

  return (
    <ProjectLayout projectId={projectId}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-foreground mb-3">
            Referências
          </h2>
          <p className="text-muted-foreground font-sans text-base sm:text-lg max-w-2xl leading-relaxed">
            Analise vídeos de criadores para identificar padrões de sucesso para <span className="font-semibold text-foreground">{project?.persona}</span>.
          </p>
        </div>

        {/* Add Reference Form */}
        <Card className="soft-card border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-display font-bold">Adicionar Nova Referência</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="youtube" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 mb-6">
                <TabsTrigger value="youtube">YouTube</TabsTrigger>
                <TabsTrigger value="shorts">Shorts</TabsTrigger>
                <TabsTrigger value="upload" disabled>
                  Upload
                </TabsTrigger>
              </TabsList>

              <TabsContent value="youtube" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="youtube-url">URL do Vídeo *</Label>
                  <Input
                    id="youtube-url"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    disabled={analyzeReferenceMutation.isPending}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="creator-name">Nome do Criador (Opcional)</Label>
                    <Input
                      id="creator-name"
                      placeholder="Ex: Felipe Neto"
                      value={creatorName}
                      onChange={(e) => setCreatorName(e.target.value)}
                      disabled={analyzeReferenceMutation.isPending}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="niche">Nicho (Opcional)</Label>
                    <Input
                      id="niche"
                      placeholder="Ex: Entretenimento"
                      value={niche}
                      onChange={(e) => setNiche(e.target.value)}
                      disabled={analyzeReferenceMutation.isPending}
                    />
                  </div>
                </div>

                <Button
                  onClick={handleAnalyze}
                  disabled={analyzeReferenceMutation.isPending || !videoUrl.trim()}
                  className="w-full sm:w-auto"
                >
                  {analyzeReferenceMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analisando...
                    </>
                  ) : (
                    "Analisar"
                  )}
                </Button>
              </TabsContent>

              <TabsContent value="shorts" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="shorts-url">URL do Short/Reel *</Label>
                  <Input
                    id="shorts-url"
                    placeholder="https://www.youtube.com/shorts/..."
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    disabled={analyzeReferenceMutation.isPending}
                  />
                </div>

                <Button
                  onClick={handleAnalyze}
                  disabled={analyzeReferenceMutation.isPending || !videoUrl.trim()}
                  className="w-full sm:w-auto"
                >
                  {analyzeReferenceMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analisando...
                    </>
                  ) : (
                    "Analisar"
                  )}
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* References Library */}
        <div>
          <h3 className="text-2xl font-display font-bold mb-4">Biblioteca de Referências</h3>
          
          {!references || references.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <Video className="w-16 h-16 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhuma referência ainda</h3>
                <p className="text-muted-foreground max-w-sm">
                  Adicione vídeos de criadores para começar a construir sua biblioteca de referências.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {references.map((ref) => (
                <Card key={ref.id} className="soft-card border-0 bg-white hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Thumbnail */}
                      <div className="w-full sm:w-48 h-32 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                        <Video className="w-8 h-8 text-muted-foreground" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            {ref.creatorName && (
                              <h4 className="font-semibold text-lg">{ref.creatorName}</h4>
                            )}
                            {ref.niche && (
                              <Badge variant="secondary" className="mt-1">
                                {ref.niche}
                              </Badge>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              asChild
                            >
                              <a href={ref.videoUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(ref.id)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {ref.analysis}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="text-xs text-muted-foreground">
                            Adicionado em {new Date(ref.createdAt).toLocaleDateString("pt-BR")}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/project/${projectId}/reference/${ref.id}`)}
                          >
                            Ver Análise Completa
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProjectLayout>
  );
}
