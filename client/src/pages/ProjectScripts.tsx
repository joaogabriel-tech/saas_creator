import { useState } from "react";
import { useRoute, useLocation, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, FileText, Trash2, Eye, ArrowLeft } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import ProjectLayout from "@/components/ProjectLayout";
import { InsufficientCreditsDialog } from "@/components/InsufficientCreditsDialog";

export default function ProjectScripts() {
  const [, params] = useRoute("/project/:id/scripts");
  const [, navigate] = useLocation();
  const projectId = params?.id;

  const [theme, setTheme] = useState("");
  const [tone, setTone] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [selectedReferenceId, setSelectedReferenceId] = useState<string>("");
  const [showInsufficientCreditsDialog, setShowInsufficientCreditsDialog] = useState(false);

  if (!projectId) {
    return <div>Projeto não encontrado</div>;
  }

  const { data: project } = trpc.projects.getById.useQuery({ id: parseInt(projectId) });
  const { data: scripts, refetch: refetchScripts } = trpc.scripts.list.useQuery({
    projectId: parseInt(projectId),
  });
  const { data: references } = trpc.references.list.useQuery({
    projectId: parseInt(projectId),
  });
  const { data: creditBalance } = trpc.credits.getBalance.useQuery();

  const utils = trpc.useUtils();

  const generateScriptMutation = trpc.manus.generateScript.useMutation({
    onSuccess: async (data) => {
      toast.success(`Roteiro gerado! Créditos Krio gastos: ${data.krioCredits}`, {
        description: `Novo saldo: ${data.newBalance} créditos`,
      });

      // Save to database
      await createScriptMutation.mutateAsync({
        projectId: parseInt(projectId),
        title: theme,
        content: data.script,
        format: duration,
        tone: tone || undefined,
        referenceId: selectedReferenceId ? parseInt(selectedReferenceId) : undefined,
      });

      setTheme("");
      setTone("");
      setDuration("");
      setSelectedReferenceId("");
      refetchScripts();
      utils.credits.getBalance.invalidate();
      utils.projects.getStats.invalidate({ projectId: parseInt(projectId) });
    },
    onError: (error) => {
      toast.error(`Erro na geração: ${error.message}`);
    },
  });

  const createScriptMutation = trpc.scripts.create.useMutation();

  const deleteScriptMutation = trpc.scripts.delete.useMutation({
    onSuccess: () => {
      toast.success("Roteiro deletado!");
      refetchScripts();
      utils.projects.getStats.invalidate({ projectId: parseInt(projectId) });
    },
    onError: (error) => {
      toast.error(`Erro ao deletar: ${error.message}`);
    },
  });

  const handleGenerate = async () => {
    if (!theme.trim()) {
      toast.error("Por favor, insira um tema para o roteiro");
      return;
    }

    // Validação de créditos antes de iniciar geração
    const ESTIMATED_COST = 150; // Custo estimado para geração de roteiro
    if (creditBalance && creditBalance.currentBalance < ESTIMATED_COST) {
      setShowInsufficientCreditsDialog(true);
      return;
    }

    // Buscar análise da referência selecionada (se houver)
    let referenceAnalysis = undefined;
    if (selectedReferenceId && references) {
      const selectedRef = references.find(r => r.id === parseInt(selectedReferenceId));
      if (selectedRef) {
        referenceAnalysis = selectedRef.analysis || undefined;
      }
    }

    try {
      await generateScriptMutation.mutateAsync({
        theme,
        referenceAnalysis,
        duration: duration as "short" | "medium" | "long" | undefined,
      });
    } catch (error) {
      // Error already handled in onError
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja deletar este roteiro?")) {
      deleteScriptMutation.mutate({ id });
    }
  };

  return (
    <ProjectLayout projectId={projectId}>
      <div className="space-y-8">
        {/* Back Button */}
        <Link href={`/project/${projectId}/dashboard`}>
          <Button variant="ghost" className="-ml-2 hover:bg-secondary/50">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </Link>
        {/* Header */}
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-foreground mb-3">
            Roteiros
          </h2>
          <p className="text-muted-foreground font-sans text-base sm:text-lg max-w-2xl leading-relaxed">
            Gere roteiros personalizados baseados nas análises de referências para <span className="font-semibold text-foreground">{project?.persona}</span>.
          </p>
        </div>

        {/* Generate Script Form */}
        <Card className="soft-card border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-display font-bold">Gerar Novo Roteiro</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme">Tema do Vídeo *</Label>
              <Input
                id="theme"
                placeholder="Ex: Como criar conteúdo viral no TikTok"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                disabled={generateScriptMutation.isPending}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reference">Referência (Opcional)</Label>
                <Select
                  value={selectedReferenceId}
                  onValueChange={setSelectedReferenceId}
                  disabled={generateScriptMutation.isPending || !references || references.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={references && references.length > 0 ? "Selecione uma referência" : "Nenhuma referência disponível"} />
                  </SelectTrigger>
                  <SelectContent>
                    {references?.map((ref) => (
                      <SelectItem key={ref.id} value={ref.id.toString()}>
                        {ref.creatorName || `Referência ${ref.id}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tone">Tom (Opcional)</Label>
                <Select
                  value={tone}
                  onValueChange={setTone}
                  disabled={generateScriptMutation.isPending}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tom" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="informal">Informal</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="humorístico">Humorístico</SelectItem>
                    <SelectItem value="inspirador">Inspirador</SelectItem>
                    <SelectItem value="educativo">Educativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duração (Opcional)</Label>
              <Select
                value={duration}
                onValueChange={setDuration}
                disabled={generateScriptMutation.isPending}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a duração" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Curto (30-60s - Shorts/Reels)</SelectItem>
                  <SelectItem value="medium">Médio (3-5 min - YouTube)</SelectItem>
                  <SelectItem value="long">Longo (10-15 min - Aprofundado)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={generateScriptMutation.isPending || !theme.trim() || (creditBalance && creditBalance.currentBalance < 150)}
              className="w-full sm:w-auto"
            >
              {generateScriptMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Gerando...
                </>
              ) : (
                "Gerar Roteiro"
              )}
            </Button>
            {creditBalance && creditBalance.currentBalance < 150 && (
              <p className="text-sm text-destructive mt-2">
                Créditos insuficientes. Você precisa de pelo menos 150 créditos para gerar um roteiro.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Scripts Library */}
        <div>
          <h3 className="text-2xl font-display font-bold mb-4">Biblioteca de Roteiros</h3>

          {!scripts || scripts.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <FileText className="w-16 h-16 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhum roteiro ainda</h3>
                <p className="text-muted-foreground max-w-sm">
                  Gere seu primeiro roteiro baseado nas análises de referências.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {scripts.map((script) => (
                <Card key={script.id} className="soft-card border-0 bg-white hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Icon */}
                      <div className="w-full sm:w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-8 h-8 text-primary" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg mb-1">{script.title}</h4>
                            <div className="flex flex-wrap gap-2">
                              {script.tone && (
                                <Badge variant="secondary" className="text-xs">
                                  {script.tone}
                                </Badge>
                              )}
                              {script.format && (
                                <Badge variant="outline" className="text-xs">
                                  {script.format === "short" ? "Curto" : script.format === "medium" ? "Médio" : "Longo"}
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(script.id)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {script.content.substring(0, 200)}...
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="text-xs text-muted-foreground">
                            Criado em {new Date(script.createdAt).toLocaleDateString("pt-BR")}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/project/${projectId}/script/${script.id}`)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Roteiro
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

      {/* Insufficient Credits Dialog */}
      <InsufficientCreditsDialog
        open={showInsufficientCreditsDialog}
        onOpenChange={setShowInsufficientCreditsDialog}
        currentBalance={creditBalance?.currentBalance ?? 0}
        estimatedCost={150}
        operationName="a geração de roteiro"
      />
    </ProjectLayout>
  );
}
