import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Youtube, Upload, Trash2, CheckCircle2, Loader2, BarChart3, Sparkles, PlayCircle } from "lucide-react";

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
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-4xl font-display font-bold tracking-tight text-white">Referências</h2>
          <p className="text-muted-foreground font-sans text-lg mt-2">Alimente a AURA com o DNA dos seus criadores favoritos.</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="glass-panel border-0 rounded-3xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-50"></div>
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-xl text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Nova Análise
              </CardTitle>
              <CardDescription className="text-muted-foreground">Cole um link do YouTube ou faça upload para extrair o DNA criativo.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Tabs defaultValue="youtube" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-black/40 p-1 rounded-xl border border-white/5">
                  <TabsTrigger value="youtube" className="rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-white text-muted-foreground transition-all">YouTube URL</TabsTrigger>
                  <TabsTrigger value="upload" className="rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-white text-muted-foreground transition-all">Upload Arquivo</TabsTrigger>
                </TabsList>
                
                <TabsContent value="youtube" className="space-y-6">
                  <div className="flex gap-3">
                    <div className="relative flex-1 group">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative bg-black/50 border border-white/10 rounded-xl flex items-center px-4 h-14 focus-within:border-primary/50 transition-colors">
                        <Youtube className="w-5 h-5 text-red-500 mr-3" />
                        <Input 
                          placeholder="https://youtube.com/watch?v=..." 
                          className="border-0 bg-transparent focus-visible:ring-0 text-white placeholder:text-muted-foreground/50 h-full p-0"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                        />
                      </div>
                    </div>
                    <Button 
                      className="h-14 px-8 rounded-xl bg-white text-black hover:bg-white/90 font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all hover:scale-105"
                      onClick={handleAnalyze}
                      disabled={isAnalyzing || !url}
                    >
                      {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : "Analisar"}
                    </Button>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>Transcrição</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>Tom de Voz</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>Ritmo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>Estrutura</span>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="upload">
                  <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 text-center hover:bg-white/5 hover:border-primary/30 transition-all cursor-pointer group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform border border-white/10 shadow-lg">
                      <Upload className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-white mb-2">Arraste seu vídeo aqui</h3>
                    <p className="text-sm text-muted-foreground mb-6">MP4, MOV ou AVI até 500MB</p>
                    <Button variant="outline" className="rounded-full border-white/20 hover:bg-white hover:text-black transition-all">Selecionar Arquivo</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* List of References */}
          <div className="space-y-6">
            <h3 className="font-display font-bold text-xl text-white pl-2 border-l-4 border-primary">Biblioteca de Referências</h3>
            <div className="grid gap-4">
              {references.map((ref) => (
                <div key={ref.id} className="group flex items-center gap-5 p-4 bg-card/50 backdrop-blur-sm border border-white/5 rounded-2xl hover:border-primary/30 transition-all hover:bg-white/5 hover:shadow-lg hover:translate-x-1">
                  <div className="w-40 aspect-video bg-black/50 rounded-xl relative overflow-hidden border border-white/5 group-hover:border-primary/20 transition-colors">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle className="w-10 h-10 text-white/20 group-hover:text-primary transition-colors" />
                    </div>
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60"></div>
                  </div>
                  
                  <div className="flex-1 min-w-0 py-2">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-display font-bold text-lg text-white truncate group-hover:text-primary transition-colors">{ref.title}</h4>
                      {ref.status === "analyzed" && (
                        <Badge variant="secondary" className="rounded-full text-[10px] bg-primary/10 text-primary border border-primary/20 px-2">
                          ANALISADO
                        </Badge>
                      )}
                      {ref.status === "processing" && (
                        <Badge variant="secondary" className="rounded-full text-[10px] bg-accent/10 text-accent border border-accent/20 px-2 animate-pulse">
                          PROCESSANDO
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-sans">
                      <span className="flex items-center gap-1"><Youtube className="w-3 h-3" /> {ref.channel}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20"></span>
                      <span>{ref.duration}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20"></span>
                      <span>{ref.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all px-2">
                    <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full text-muted-foreground hover:text-white hover:bg-white/10">
                      <BarChart3 className="w-5 h-5" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DNA Analysis Sidebar */}
        <div className="space-y-6">
          <Card className="glass-panel border-0 rounded-3xl sticky top-28 overflow-hidden">
            <div className="h-32 bg-black relative overflow-hidden">
              <img src="/images/aura-analysis.png" alt="AI Analysis" className="w-full h-full object-cover opacity-60 mix-blend-screen" />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent"></div>
              <div className="absolute bottom-4 left-6">
                <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  DNA da Persona
                </h3>
              </div>
            </div>
            <CardContent className="space-y-8 pt-6">
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Tom de Voz</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="rounded-full bg-white/5 border-white/10 text-white hover:bg-primary/20 hover:border-primary/30 transition-colors px-3 py-1">Didático</Badge>
                  <Badge variant="outline" className="rounded-full bg-white/5 border-white/10 text-white hover:bg-primary/20 hover:border-primary/30 transition-colors px-3 py-1">Entusiasta</Badge>
                  <Badge variant="outline" className="rounded-full bg-white/5 border-white/10 text-white hover:bg-primary/20 hover:border-primary/30 transition-colors px-3 py-1">Direto</Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed font-sans border-l-2 border-white/10 pl-3 italic">
                  "Sua persona tende a começar vídeos com uma pergunta provocativa e usa analogias simples para explicar conceitos complexos."
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Estrutura Típica</h4>
                <div className="space-y-1 relative">
                  <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-white/10"></div>
                  {[
                    { time: "0-30s", label: "Gancho + Promessa", color: "bg-primary" },
                    { time: "30s-2m", label: "Contexto / Problema", color: "bg-white" },
                    { time: "2m-8m", label: "3 Passos Práticos", color: "bg-white" },
                    { time: "End", label: "CTA para Comentários", color: "bg-accent" },
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-4 relative z-10 group">
                      <div className={`w-8 h-8 rounded-full bg-black border border-white/10 flex items-center justify-center text-[10px] font-mono text-muted-foreground group-hover:border-primary/50 group-hover:text-primary transition-colors shadow-lg`}>
                        {i + 1}
                      </div>
                      <div className="flex-1 p-3 bg-white/5 border border-white/5 rounded-xl text-xs text-white group-hover:bg-white/10 transition-colors flex justify-between items-center">
                        <span>{step.label}</span>
                        <span className="text-[10px] text-muted-foreground font-mono">{step.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
