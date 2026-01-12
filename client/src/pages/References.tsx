import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Youtube, Upload, Trash2, CheckCircle2, Loader2, BarChart3 } from "lucide-react";

export default function References() {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [references, setReferences] = useState([
    { id: 1, title: "Como organizar sua vida financeira", channel: "Primo Rico", duration: "12:45", status: "analyzed", date: "10 Jan 2026" },
    { id: 2, title: "A verdade sobre produtividade", channel: "Eslen Delanogare", duration: "08:20", status: "analyzed", date: "11 Jan 2026" },
    { id: 3, title: "Minimalismo Digital", channel: "Matt D'Avella", duration: "15:10", status: "processing", date: "Hoje" },
  ]);

  const handleAnalyze = () => {
    if (!url) return;
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setReferences([
        { id: Date.now(), title: "Novo Vídeo Analisado", channel: "Canal Exemplo", duration: "10:00", status: "analyzed", date: "Hoje" },
        ...references
      ]);
      setIsAnalyzing(false);
      setUrl("");
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold tracking-tight">Referências</h2>
          <p className="text-muted-foreground font-mono text-sm mt-1">Gerencie o material fonte para o treinamento da sua IA.</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="rounded-none border-border shadow-sm">
            <CardHeader>
              <CardTitle className="font-display">Adicionar Nova Referência</CardTitle>
              <CardDescription>Cole um link do YouTube ou faça upload de um arquivo de vídeo.</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="youtube" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 rounded-none bg-secondary p-1">
                  <TabsTrigger value="youtube" className="rounded-none data-[state=active]:bg-background data-[state=active]:shadow-sm">YouTube URL</TabsTrigger>
                  <TabsTrigger value="upload" className="rounded-none data-[state=active]:bg-background data-[state=active]:shadow-sm">Upload Arquivo</TabsTrigger>
                </TabsList>
                
                <TabsContent value="youtube" className="space-y-4">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        placeholder="https://youtube.com/watch?v=..." 
                        className="pl-9 rounded-none border-border focus-visible:ring-primary"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                      />
                    </div>
                    <Button 
                      className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 min-w-[120px]"
                      onClick={handleAnalyze}
                      disabled={isAnalyzing || !url}
                    >
                      {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : "Analisar"}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    A IA irá extrair automaticamente: Transcrição, Tom de Voz, Ritmo de Fala e Estrutura de Roteiro.
                  </p>
                </TabsContent>
                
                <TabsContent value="upload">
                  <div className="border-2 border-dashed border-border p-8 text-center hover:bg-secondary/50 transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium mb-1">Arraste seu vídeo aqui</h3>
                    <p className="text-xs text-muted-foreground mb-4">MP4, MOV ou AVI até 500MB</p>
                    <Button variant="outline" className="rounded-none">Selecionar Arquivo</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* List of References */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg">Biblioteca de Referências</h3>
            <div className="grid gap-4">
              {references.map((ref) => (
                <div key={ref.id} className="group flex items-center gap-4 p-4 bg-card border border-border hover:border-primary transition-all hover:shadow-md">
                  <div className="w-32 aspect-video bg-secondary relative overflow-hidden">
                    {/* Placeholder thumbnail */}
                    <div className="absolute inset-0 flex items-center justify-center bg-muted">
                      <Youtube className="w-8 h-8 text-muted-foreground/50" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold truncate">{ref.title}</h4>
                      {ref.status === "analyzed" && (
                        <Badge variant="secondary" className="rounded-none text-[10px] bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20">
                          ANALISADO
                        </Badge>
                      )}
                      {ref.status === "processing" && (
                        <Badge variant="secondary" className="rounded-none text-[10px] bg-yellow-500/10 text-yellow-600 border-yellow-500/20 hover:bg-yellow-500/20">
                          PROCESSANDO
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
                      <span>{ref.channel}</span>
                      <span>•</span>
                      <span>{ref.duration}</span>
                      <span>•</span>
                      <span>{ref.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-primary">
                      <BarChart3 className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DNA Analysis Sidebar */}
        <div className="space-y-6">
          <Card className="rounded-none border-border shadow-sm bg-secondary/30 sticky top-24">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                DNA da Persona
              </CardTitle>
              <CardDescription>Padrões identificados nas suas referências.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Tom de Voz</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="rounded-none bg-background">Didático</Badge>
                  <Badge variant="outline" className="rounded-none bg-background">Entusiasta</Badge>
                  <Badge variant="outline" className="rounded-none bg-background">Direto</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  Sua persona tende a começar vídeos com uma pergunta provocativa ("gancho") e usa analogias simples para explicar conceitos complexos.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Estrutura Típica</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-12 font-mono text-xs text-muted-foreground">0-30s</div>
                    <div className="flex-1 p-2 bg-background border border-border text-xs">Gancho + Promessa</div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-12 font-mono text-xs text-muted-foreground">30s-2m</div>
                    <div className="flex-1 p-2 bg-background border border-border text-xs">Contexto / Problema</div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-12 font-mono text-xs text-muted-foreground">2m-8m</div>
                    <div className="flex-1 p-2 bg-background border border-border text-xs">3 Passos Práticos</div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-12 font-mono text-xs text-muted-foreground">End</div>
                    <div className="flex-1 p-2 bg-background border border-border text-xs">CTA para Comentários</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <img src="/images/feature-analysis.png" alt="AI Analysis" className="w-full h-32 object-contain opacity-80 mix-blend-multiply dark:mix-blend-screen" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
