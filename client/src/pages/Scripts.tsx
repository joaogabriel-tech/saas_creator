import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Zap, Copy, Download, Share2, RefreshCw, Edit3, MonitorPlay, X, Play, Pause, Settings2, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function Scripts() {
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScript, setGeneratedScript] = useState<string | null>(null);
  
  // Teleprompter states
  const [isTeleprompterOpen, setIsTeleprompterOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState([2]);
  const [fontSize, setFontSize] = useState([48]);
  const teleprompterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && teleprompterRef.current) {
      interval = setInterval(() => {
        if (teleprompterRef.current) {
          teleprompterRef.current.scrollTop += scrollSpeed[0];
        }
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying, scrollSpeed]);

  const handleGenerate = () => {
    if (!topic) return;
    setIsGenerating(true);
    
    setTimeout(() => {
      setGeneratedScript(`
# TÍTULO: ${topic}
## FORMATO: Vídeo Longo (YouTube) • TOM: Didático e Direto

[00:00 - 00:30] GANCHO
(Câmera próxima, contato visual direto)
"Você já sentiu que, não importa o quanto trabalhe, o dinheiro nunca sobra no final do mês? A culpa não é do seu salário, é do seu 'sistema operacional financeiro'. Hoje, vou te mostrar como reescrever esse código em 3 passos simples."

[00:30 - 01:30] INTRODUÇÃO
(Corta para B-Roll de escritório ou gráficos simples)
A maioria das pessoas trata dinheiro como um recurso finito que precisa ser 'guardado'. Mas os maiores investidores que analisei tratam dinheiro como uma ferramenta que precisa ser 'alocada'.
(Volta para Talking Head)
A diferença é sutil, mas muda tudo. Vamos para o passo 1.

[01:30 - 04:00] PASSO 1: A REGRA DOS 50/30/20 (COM UM TWIST)
Não vou te falar o básico que todo mundo fala. O segredo aqui não é a porcentagem, é a automação.
(Gráfico na tela mostrando fluxo de dinheiro automático)
Se você precisa 'decidir' economizar todo mês, você já perdeu. A decisão tem que ser tomada uma única vez. Configure transferências automáticas no dia que o salário cai.

[04:00 - 06:30] PASSO 2: O CUSTO DE OPORTUNIDADE INVISÍVEL
Muitas vezes focamos em cortar o cafezinho, mas ignoramos as taxas de administração do fundo de investimento que comem 2% do seu patrimônio todo ano.
(Gráfico comparativo de juros compostos)
Vou te mostrar a matemática real por trás disso.

[06:30 - 08:00] CONCLUSÃO
O dinheiro é um jogo de longo prazo jogado por pessoas impacientes. Seja o paciente.
Comenta aqui embaixo: qual é o seu maior gargalo financeiro hoje?
`);
      setIsGenerating(false);
    }, 2500);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-4xl font-display font-bold tracking-tight text-foreground">Gerador de Roteiros</h2>
          <p className="text-muted-foreground font-sans text-lg mt-2">Crie conteúdo alinhado à sua persona em segundos.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 h-full">
        {/* Left Panel: Controls */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <Card className="border-border/50 shadow-sm rounded-3xl flex-1 flex flex-col overflow-hidden bg-card">
            <CardHeader className="pb-4 border-b border-border/40">
              <CardTitle className="font-display text-xl text-foreground flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-primary" />
                Configuração
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 flex-1 pt-6">
              <div className="space-y-3">
                <label className="text-sm font-bold text-foreground uppercase tracking-wider">Sobre o que é o vídeo?</label>
                <Textarea 
                  placeholder="Ex: Como começar a investir com pouco dinheiro em 2026..." 
                  className="bg-background border-border rounded-xl min-h-[120px] resize-none focus-visible:ring-primary/50 text-foreground placeholder:text-muted-foreground p-4"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-foreground uppercase tracking-wider">Formato</label>
                  <Select defaultValue="youtube">
                    <SelectTrigger className="bg-background border-border rounded-xl text-foreground h-12">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border text-foreground">
                      <SelectItem value="youtube">YouTube (Longo)</SelectItem>
                      <SelectItem value="shorts">Shorts/Reels</SelectItem>
                      <SelectItem value="linkedin">LinkedIn Post</SelectItem>
                      <SelectItem value="newsletter">Newsletter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-foreground uppercase tracking-wider">Objetivo</label>
                  <Select defaultValue="educate">
                    <SelectTrigger className="bg-background border-border rounded-xl text-foreground h-12">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border text-foreground">
                      <SelectItem value="educate">Educar</SelectItem>
                      <SelectItem value="entertain">Entreter</SelectItem>
                      <SelectItem value="sell">Vender</SelectItem>
                      <SelectItem value="inspire">Inspirar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-foreground uppercase tracking-wider">Persona Ativa</label>
                <div className="p-4 bg-secondary/30 border border-border rounded-xl text-sm flex items-center justify-between group hover:border-primary/30 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-xs">PR</div>
                    <span className="font-display font-bold text-foreground">Primo Rico + Minimalismo</span>
                  </div>
                  <Button variant="link" size="sm" className="h-auto p-0 text-primary opacity-0 group-hover:opacity-100 transition-opacity">Alterar</Button>
                </div>
              </div>

              <div className="pt-4 mt-auto">
                <Button 
                  className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-lg font-display font-bold tracking-wide shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
                  onClick={handleGenerate}
                  disabled={isGenerating || !topic}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                      GERANDO...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 mr-2" />
                      GERAR ROTEIRO
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel: Output */}
        <div className="lg:col-span-8 h-full">
          <Card className="border-border/50 shadow-sm rounded-3xl h-full flex flex-col overflow-hidden relative bg-card">
            <div className="border-b border-border/40 p-3 flex items-center justify-between bg-secondary/20 backdrop-blur-md z-10">
              <Tabs defaultValue="script" className="w-auto">
                <TabsList className="bg-transparent p-0 h-auto gap-6">
                  <TabsTrigger value="script" className="rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary px-2 py-2 font-display font-bold transition-all text-muted-foreground">Roteiro</TabsTrigger>
                  <TabsTrigger value="structure" className="rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary px-2 py-2 font-display font-bold transition-all text-muted-foreground">Estrutura</TabsTrigger>
                  <TabsTrigger value="seo" className="rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary px-2 py-2 font-display font-bold transition-all text-muted-foreground">SEO & Tags</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="flex gap-2">
                {generatedScript && (
                  <Dialog open={isTeleprompterOpen} onOpenChange={setIsTeleprompterOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="rounded-full border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground gap-2 transition-all">
                        <MonitorPlay className="w-4 h-4" />
                        Teleprompter
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[100vw] h-[100vh] p-0 border-0 bg-black z-50 flex flex-col">
                      {/* Teleprompter UI */}
                      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center bg-gradient-to-b from-black to-transparent z-50">
                        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/10">
                          <Button size="icon" variant="ghost" className="rounded-full text-white hover:bg-white/20" onClick={() => setIsPlaying(!isPlaying)}>
                            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                          </Button>
                          <div className="flex items-center gap-2 px-2">
                            <span className="text-xs font-mono text-white/70">SPEED</span>
                            <Slider value={scrollSpeed} onValueChange={setScrollSpeed} max={10} step={1} className="w-24" />
                          </div>
                          <div className="flex items-center gap-2 px-2 border-l border-white/10">
                            <span className="text-xs font-mono text-white/70">SIZE</span>
                            <Slider value={fontSize} onValueChange={setFontSize} min={24} max={96} step={4} className="w-24" />
                          </div>
                        </div>
                        <Button size="icon" variant="ghost" className="rounded-full text-white hover:bg-white/20" onClick={() => setIsTeleprompterOpen(false)}>
                          <X className="w-8 h-8" />
                        </Button>
                      </div>
                      
                      <div 
                        ref={teleprompterRef}
                        className="flex-1 overflow-y-auto px-[15%] py-[40vh] text-center font-bold leading-tight text-white scroll-smooth no-scrollbar"
                        style={{ fontSize: `${fontSize[0]}px` }}
                      >
                        {/* Flip horizontally for mirror reflection if needed, currently standard */}
                        {generatedScript.split('\n').map((line, i) => (
                          <p key={i} className="mb-8 opacity-90">{line}</p>
                        ))}
                      </div>
                      
                      {/* Guide line */}
                      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-primary/30 z-40 pointer-events-none">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full bg-primary text-black text-xs font-bold px-2 py-1 rounded-r">READ HERE</div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
                
                <div className="h-8 w-[1px] bg-border mx-1"></div>
                
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground" disabled={!generatedScript}>
                  <Copy className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground" disabled={!generatedScript}>
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground" disabled={!generatedScript}>
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <CardContent className="flex-1 p-0 relative overflow-hidden bg-background">
              {generatedScript ? (
                <div className="h-full overflow-auto p-10 font-mono text-base leading-relaxed whitespace-pre-wrap text-foreground selection:bg-primary/20">
                  {generatedScript}
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
                  <div className="w-32 h-32 mb-8 opacity-50 relative">
                    <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full animate-pulse"></div>
                    <Sparkles className="w-full h-full text-primary/20" />
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-3 text-foreground">Pronto para criar?</h3>
                  <p className="max-w-md mx-auto text-lg font-sans text-muted-foreground">Defina o tópico ao lado e deixe a IA estruturar seu próximo vídeo viral.</p>
                </div>
              )}
            </CardContent>
            
            {generatedScript && (
              <div className="border-t border-border/40 p-4 bg-secondary/20 backdrop-blur-md flex justify-between items-center">
                <span className="text-xs text-muted-foreground font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  ~450 palavras • Est. 5 min de leitura
                </span>
                <Button variant="ghost" size="sm" className="rounded-full gap-2 text-muted-foreground hover:text-foreground hover:bg-secondary">
                  <Edit3 className="w-3 h-3" />
                  Editar Manualmente
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
