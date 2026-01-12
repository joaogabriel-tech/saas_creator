import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Youtube, Upload, Trash2, CheckCircle2, Loader2, BarChart3, Sparkles, PlayCircle, Smartphone, Video } from "lucide-react";

export default function References() {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [references, setReferences] = useState([
    { id: 1, title: "Como organizar sua vida financeira", channel: "Primo Rico", duration: "12:45", type: "youtube", status: "analyzed", date: "10 Jan 2026" },
    { id: 2, title: "3 Dicas Rápidas de Foco", channel: "Eslen Delanogare", duration: "00:59", type: "shorts", status: "analyzed", date: "11 Jan 2026" },
    { id: 3, title: "Arquivo_Bruto_Vlog.mp4", channel: "Upload Local", duration: "15:10", type: "upload", status: "processing", date: "Hoje" },
  ]);

  const handleAnalyze = () => {
    if (!url) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setReferences([
        { id: Date.now(), title: "Novo Conteúdo Analisado", channel: "Canal Exemplo", duration: "10:00", type: "youtube", status: "analyzed", date: "Hoje" },
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
          <h2 className="text-4xl font-display font-bold tracking-tight text-foreground">Referências</h2>
          <p className="text-muted-foreground font-sans text-lg mt-2">Alimente a AURA com o DNA dos seus criadores favoritos.</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="soft-card border-0 bg-white overflow-hidden relative">
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
                      disabled={isAnalyzing || !url}
                    >
                      {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : "Analisar"}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground text-center font-medium">
                    Suporta Instagram Reels, TikTok e YouTube Shorts. Análise focada em retenção e ganchos rápidos.
                  </p>
                </TabsContent>

                <TabsContent value="youtube" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
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
                      disabled={isAnalyzing || !url}
                    >
                      {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : "Analisar"}
                    </Button>
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
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* List of References */}
          <div className="space-y-6">
            <h3 className="font-display font-bold text-xl text-foreground pl-3 border-l-4 border-primary">Biblioteca de Referências</h3>
            <div className="grid gap-4">
              {references.map((ref) => (
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
                  </div>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all px-2">
                    <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10">
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
          <Card className="soft-card border-0 bg-white sticky top-28 overflow-hidden shadow-xl shadow-indigo-900/5">
            <div className="h-32 bg-gradient-to-br from-primary to-indigo-600 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/images/aura-analysis.png')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
              <div className="absolute bottom-6 left-8">
                <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-white/80" />
                  DNA da Persona
                </h3>
              </div>
            </div>
            <CardContent className="space-y-8 pt-8 px-8 pb-8">
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Tom de Voz</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="rounded-full bg-secondary/50 border-border text-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-colors px-3 py-1.5 font-medium">Didático</Badge>
                  <Badge variant="outline" className="rounded-full bg-secondary/50 border-border text-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-colors px-3 py-1.5 font-medium">Entusiasta</Badge>
                  <Badge variant="outline" className="rounded-full bg-secondary/50 border-border text-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-colors px-3 py-1.5 font-medium">Direto</Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed font-sans border-l-2 border-primary/30 pl-4 italic bg-secondary/20 p-3 rounded-r-lg">
                  "Sua persona tende a começar vídeos com uma pergunta provocativa e usa analogias simples para explicar conceitos complexos."
                </p>
              </div>

              <div className="space-y-5">
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Estrutura Típica</h4>
                <div className="space-y-1 relative pl-2">
                  <div className="absolute left-[23px] top-3 bottom-3 w-0.5 bg-border"></div>
                  {[
                    { time: "0-30s", label: "Gancho + Promessa", color: "bg-primary text-white" },
                    { time: "30s-2m", label: "Contexto / Problema", color: "bg-white border border-border text-foreground" },
                    { time: "2m-8m", label: "3 Passos Práticos", color: "bg-white border border-border text-foreground" },
                    { time: "End", label: "CTA para Comentários", color: "bg-indigo-100 text-indigo-700 border border-indigo-200" },
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-4 relative z-10 group">
                      <div className={`w-8 h-8 rounded-full bg-white border-2 border-border flex items-center justify-center text-xs font-bold text-muted-foreground group-hover:border-primary group-hover:text-primary transition-colors shadow-sm`}>
                        {i + 1}
                      </div>
                      <div className={`flex-1 p-3 rounded-xl text-xs font-bold transition-all flex justify-between items-center shadow-sm ${step.color}`}>
                        <span>{step.label}</span>
                        <span className="text-[10px] opacity-70 font-mono">{step.time}</span>
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
