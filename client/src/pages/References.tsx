import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Youtube, Upload, Trash2, CheckCircle2, Loader2, BarChart3, Sparkles, PlayCircle, Smartphone, Video, AlertCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface Reference {
  id: number;
  title: string;
  channel: string;
  duration: string;
  type: "youtube" | "shorts" | "upload";
  status: "analyzed" | "processing" | "error";
  date: string;
  analysis?: string;
  videoUrl?: string;
}

export default function References() {
  const [url, setUrl] = useState("");
  const [niche, setNiche] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [references, setReferences] = useState<Reference[]>([
    { id: 1, title: "Como organizar sua vida financeira", channel: "Primo Rico", duration: "12:45", type: "youtube", status: "analyzed", date: "10 Jan 2026", analysis: "Análise disponível" },
    { id: 2, title: "3 Dicas Rápidas de Foco", channel: "Eslen Delanogare", duration: "00:59", type: "shorts", status: "analyzed", date: "11 Jan 2026" },
  ]);

  const utils = trpc.useUtils();
  const analyzeReferenceMutation = trpc.manus.analyzeReference.useMutation({
    onSuccess: () => {
      // Invalidar query de créditos para atualizar saldo
      utils.credits.getBalance.invalidate();
    },
  });

  const handleAnalyze = async () => {
    if (!url) {
      toast.error("Por favor, insira a URL do vídeo para análise.");
      return;
    }

    try {
      // Adicionar referência com status "processing"
      const newRef: Reference = {
        id: Date.now(),
        title: "Analisando...",
        channel: creatorName || "Criador",
        duration: "...",
        type: url.includes("shorts") || url.includes("reels") || url.includes("tiktok") ? "shorts" : "youtube",
        status: "processing",
        date: "Agora",
        videoUrl: url,
      };

      setReferences([newRef, ...references]);
      setUrl("");

      // Chamar API Manus via tRPC
      const result = await analyzeReferenceMutation.mutateAsync({
        videoUrl: url,
        niche: niche || undefined,
        creatorName: creatorName || undefined,
      });

      // Atualizar referência com resultado
      setReferences(prev =>
        prev.map(ref =>
          ref.id === newRef.id
            ? {
                ...ref,
                title: `Análise de ${creatorName || "Criador"}`,
                status: "analyzed" as const,
                analysis: result.analysis,
              }
            : ref
        )
      );

      toast.success(`✅ Análise concluída! Créditos usados: ${result.creditUsage}. Novo saldo: ${result.newBalance}`);

      // Limpar campos opcionais
      setNiche("");
      setCreatorName("");
    } catch (error: any) {
      // Marcar como erro
      setReferences(prev =>
        prev.map(ref =>
          ref.id === Date.now()
            ? { ...ref, status: "error" as const, title: "Erro na análise" }
            : ref
        )
      );

      const errorMessage = error.message || "Não foi possível analisar o vídeo. Tente novamente.";
      
      // Verificar se é erro de créditos insuficientes
      if (errorMessage.includes("Créditos insuficientes")) {
        toast.error(errorMessage, {
          duration: 5000,
          action: {
            label: "Ver Planos",
            onClick: () => window.location.href = "/planos",
          },
        });
      } else {
        toast.error(errorMessage);
      }
    }
  };

  const handleDelete = (id: number) => {
    setReferences(prev => prev.filter(ref => ref.id !== id));
    toast.success("Referência removida da biblioteca.");
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-4xl font-display font-bold tracking-tight text-foreground">Referências</h2>
          <p className="text-muted-foreground font-sans text-lg mt-2">Alimente a KRYO com o DNA dos seus criadores favoritos.</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-0 bg-white overflow-hidden relative shadow-lg">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-indigo-400 to-primary opacity-50"></div>
            <CardHeader className="pb-2 pt-8 px-8">
              <CardTitle className="font-display text-xl text-foreground flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Nova Análise
              </CardTitle>
              <CardDescription className="text-muted-foreground font-sans">Escolha a fonte do conteúdo para extrair o DNA criativo.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 px-8 pb-8">
              <Tabs defaultValue="youtube" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8 bg-secondary/50 p-1.5 rounded-xl">
                  <TabsTrigger value="shorts" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm text-muted-foreground font-medium transition-all gap-2">
                    <Smartphone className="w-4 h-4" /> Shorts/Reels
                  </TabsTrigger>
                  <TabsTrigger value="youtube" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm text-muted-foreground font-medium transition-all gap-2">
                    <Youtube className="w-4 h-4" /> YouTube
                  </TabsTrigger>
                  <TabsTrigger value="upload" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm text-muted-foreground font-medium transition-all gap-2">
                    <Upload className="w-4 h-4" /> Upload
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="shorts" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="relative flex-1 group">
                        <div className="relative bg-secondary/30 border border-border rounded-xl flex items-center px-4 h-14 focus-within:border-primary/50 focus-within:bg-white focus-within:shadow-md transition-all duration-300">
                          <Smartphone className="w-5 h-5 text-pink-500 mr-3" />
                          <Input 
                            placeholder="Cole o link do Reels, TikTok ou Shorts..." 
                            className="border-0 bg-transparent focus-visible:ring-0 text-foreground placeholder:text-muted-foreground h-full p-0 font-sans"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                          />
                        </div>
                      </div>
                      <Button 
                        className="h-14 px-8 rounded-xl bg-primary text-white hover:bg-primary/90 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:shadow-primary/30"
                        onClick={handleAnalyze}
                        disabled={analyzeReferenceMutation.isPending || !url}
                      >
                        {analyzeReferenceMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Analisar"}
                      </Button>
                    </div>
                    
                    {/* Campos opcionais */}
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        placeholder="Nome do criador (opcional)"
                        value={creatorName}
                        onChange={(e) => setCreatorName(e.target.value)}
                        className="h-12 rounded-xl border-border bg-secondary/20"
                      />
                      <Input
                        placeholder="Nicho (opcional)"
                        value={niche}
                        onChange={(e) => setNiche(e.target.value)}
                        className="h-12 rounded-xl border-border bg-secondary/20"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground text-center font-medium">
                    Suporta Instagram Reels, TikTok e YouTube Shorts. Análise focada em retenção e ganchos rápidos.
                  </p>
                </TabsContent>

                <TabsContent value="youtube" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="relative flex-1 group">
                        <div className="relative bg-secondary/30 border border-border rounded-xl flex items-center px-4 h-14 focus-within:border-primary/50 focus-within:bg-white focus-within:shadow-md transition-all duration-300">
                          <Youtube className="w-5 h-5 text-red-500 mr-3" />
                          <Input 
                            placeholder="https://youtube.com/watch?v=..." 
                            className="border-0 bg-transparent focus-visible:ring-0 text-foreground placeholder:text-muted-foreground h-full p-0 font-sans"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                          />
                        </div>
                      </div>
                      <Button 
                        className="h-14 px-8 rounded-xl bg-primary text-white hover:bg-primary/90 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:shadow-primary/30"
                        onClick={handleAnalyze}
                        disabled={analyzeReferenceMutation.isPending || !url}
                      >
                        {analyzeReferenceMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Analisar"}
                      </Button>
                    </div>

                    {/* Campos opcionais */}
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        placeholder="Nome do criador (opcional)"
                        value={creatorName}
                        onChange={(e) => setCreatorName(e.target.value)}
                        className="h-12 rounded-xl border-border bg-secondary/20"
                      />
                      <Input
                        placeholder="Nicho (opcional)"
                        value={niche}
                        onChange={(e) => setNiche(e.target.value)}
                        className="h-12 rounded-xl border-border bg-secondary/20"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground bg-secondary/30 p-4 rounded-xl border border-border/50">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="font-medium">Transcrição</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="font-medium">Tom de Voz</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="font-medium">Ritmo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="font-medium">Estrutura</span>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="upload" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="border-2 border-dashed border-border rounded-2xl p-12 text-center hover:bg-secondary/30 hover:border-primary/50 transition-all cursor-pointer group relative overflow-hidden bg-secondary/10">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-sm border border-border">
                      <Upload className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-foreground mb-2">Arraste seu vídeo aqui</h3>
                    <p className="text-sm text-muted-foreground mb-6 font-sans">MP4, MOV ou AVI até 500MB</p>
                    <Button variant="outline" className="rounded-full border-border bg-white hover:bg-secondary text-foreground font-medium shadow-sm">Selecionar Arquivo</Button>
                    <p className="text-xs text-amber-600 mt-4 font-medium">⚠️ Upload em desenvolvimento</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* List of References */}
          <div className="space-y-6">
            <h3 className="font-display font-bold text-xl text-foreground pl-3 border-l-4 border-primary">Biblioteca de Referências</h3>
            <div className="grid gap-4">
              {references.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="font-sans">Nenhuma referência ainda. Adicione sua primeira análise!</p>
                </div>
              ) : (
                references.map((ref) => (
                  <div key={ref.id} className="group flex items-center gap-5 p-4 bg-white border border-border/50 rounded-2xl hover:border-primary/30 transition-all hover:shadow-lg hover:-translate-y-0.5">
                    <div className="w-40 aspect-video bg-secondary rounded-xl relative overflow-hidden border border-border/50 group-hover:border-primary/20 transition-colors">
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm group-hover:scale-110 transition-transform">
                          {ref.type === 'shorts' ? <Smartphone className="w-5 h-5 text-pink-500" /> : 
                           ref.type === 'upload' ? <Video className="w-5 h-5 text-blue-500" /> :
                           <PlayCircle className="w-5 h-5 text-red-500" />}
                        </div>
                      </div>
                      {/* Placeholder Thumbnail Gradient */}
                      <div className={`absolute inset-0 opacity-80 ${
                        ref.type === 'shorts' ? 'bg-gradient-to-br from-pink-100 to-purple-100' : 
                        ref.type === 'upload' ? 'bg-gradient-to-br from-blue-100 to-cyan-100' :
                        'bg-gradient-to-br from-red-50 to-orange-50'
                      }`}></div>
                    </div>
                    
                    <div className="flex-1 min-w-0 py-2">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-display font-bold text-lg text-foreground truncate group-hover:text-primary transition-colors">{ref.title}</h4>
                        {ref.status === "analyzed" && (
                          <Badge variant="secondary" className="rounded-full text-[10px] bg-emerald-100 text-emerald-700 border-0 px-2 font-bold">
                            ANALISADO
                          </Badge>
                        )}
                        {ref.status === "processing" && (
                          <Badge variant="secondary" className="rounded-full text-[10px] bg-amber-100 text-amber-700 border-0 px-2 font-bold animate-pulse">
                            PROCESSANDO
                          </Badge>
                        )}
                        {ref.status === "error" && (
                          <Badge variant="secondary" className="rounded-full text-[10px] bg-red-100 text-red-700 border-0 px-2 font-bold">
                            ERRO
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground font-sans font-medium">
                        <span className="flex items-center gap-1.5">
                          {ref.type === 'shorts' ? <Smartphone className="w-3 h-3" /> : 
                           ref.type === 'upload' ? <Upload className="w-3 h-3" /> :
                           <Youtube className="w-3 h-3" />} 
                          {ref.channel}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-border"></span>
                        <span>{ref.duration}</span>
                        <span className="w-1 h-1 rounded-full bg-border"></span>
                        <span>{ref.date}</span>
                      </div>
                      {ref.analysis && (
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{ref.analysis.substring(0, 150)}...</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {ref.status === "analyzed" && ref.analysis && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="rounded-full hover:bg-primary/10 hover:text-primary"
                          onClick={() => {
                            toast.info(ref.analysis || "Análise não disponível");
                          }}
                        >
                          <BarChart3 className="w-4 h-4 mr-1" /> Ver Análise
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="rounded-full hover:bg-red-50 hover:text-red-600"
                        onClick={() => handleDelete(ref.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-6">
          <Card className="border-0 bg-gradient-to-br from-primary/5 to-indigo-50 shadow-lg">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Estatísticas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground font-sans">Total de Referências</span>
                <span className="font-display font-bold text-2xl text-primary">{references.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground font-sans">Analisadas</span>
                <span className="font-display font-bold text-2xl text-emerald-600">{references.filter(r => r.status === "analyzed").length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground font-sans">Processando</span>
                <span className="font-display font-bold text-2xl text-amber-600">{references.filter(r => r.status === "processing").length}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Dica Pro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                Para melhores resultados, analise pelo menos 3-5 vídeos do mesmo criador. Isso permite que a IA identifique padrões consistentes no estilo de comunicação.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
