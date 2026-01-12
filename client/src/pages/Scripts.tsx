import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Zap, Copy, Download, Share2, RefreshCw, Edit3, MonitorPlay, X, Play, Pause, Settings2 } from "lucide-react";
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
          <h2 className="text-4xl font-display font-bold tracking-tight text-white">Gerador de Roteiros</h2>
          <p className="text-muted-foreground font-sans text-lg mt-2">Crie conteúdo alinhado à sua persona em segundos.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 h-full">
        {/* Left Panel: Controls */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <Card className="glass-panel border-0 rounded-3xl flex-1 flex flex-col overflow-hidden">
            <CardHeader className="pb-4 border-b border-white/5">
              <CardTitle className="font-display text-xl text-white flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-primary" />
                Configuração
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 flex-1 pt-6">
              <div className="space-y-3">
                <label className="text-sm font-bold text-white uppercase tracking-wider">Sobre o que é o vídeo?</label>
                <Textarea 
                  placeholder="Ex: Como começar a investir com pouco dinheiro em 2026..." 
                  className="bg-black/20 border-white/10 rounded-xl min-h-[120px] resize-none focus-visible:ring-primary/50 text-white placeholder:text-muted-foreground/50 p-4"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-white uppercase tracking-wider">Formato</label>
                  <Select defaultValue="youtube">
                    <SelectTrigger className="bg-black/20 border-white/10 rounded-xl text-white h-12">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-white/10 text-white backdrop-blur-xl">
                      <SelectItem value="youtube">YouTube (Longo)</SelectItem>
                      <SelectItem value="shorts">Shorts/Reels</SelectItem>
                      <SelectItem value="linkedin">LinkedIn Post</SelectItem>
                      <SelectItem value="newsletter">Newsletter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-white uppercase tracking-wider">Objetivo</label>
                  <Select defaultValue="educate">
                    <SelectTrigger className="bg-black/20 border-white/10 rounded-xl text-white h-12">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-white/10 text-white backdrop-blur-xl">
                      <SelectItem value="educate">Educar</SelectItem>
                      <SelectItem value="entertain">Entreter</SelectItem>
                      <SelectItem value="sell">Vender</SelectItem>
                      <SelectItem value="inspire">Inspirar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-white uppercase tracking-wider">Persona Ativa</label>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-sm flex items-center justify-between group hover:border-primary/30 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-black font-bold text-xs">PR</div>
                    <span className="font-display font-bold text-white">Primo Rico + Minimalismo</span>
                  </div>
                  <Button variant="link" size="sm" className="h-auto p-0 text-primary opacity-0 group-hover:opacity-100 transition-opacity">Alterar</Button>
                </div>
              </div>

              <div className="pt-4 mt-auto">
                <Button 
                  className="w-full rounded-xl bg-gradient-to-r from-primary to-[#F2D06B] text-black hover:opacity-90 h-14 text-lg font-display font-bold tracking-wide shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all hover:scale-[1.02]"
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
          <Card className="glass-panel border-0 rounded-3xl h-full flex flex-col overflow-hidden relative">
            <div className="border-b border-white/5 p-3 flex items-center justify-between bg-black/20 backdrop-blur-md z-10">
              <Tabs defaultValue="script" className="w-auto">
                <TabsList className="bg-transparent p-0 h-auto gap-6">
                  <TabsTrigger value="script" className="rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary px-2 py-2 font-display font-bold transition-all">Roteiro</TabsTrigger>
                  <TabsTrigger value="structure" className="rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary px-2 py-2 font-display font-bold transition-all">Estrutura</TabsTrigger>
                  <TabsTrigger value="seo" className="rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary px-2 py-2 font-display font-bold transition-all">SEO & Tags</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="flex gap-2">
                {generatedScript && (
                  <Dialog open={isTeleprompterOpen} onOpenChange={setIsTeleprompterOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="rounded-full border-primary/50 text-primary hover:bg-primary hover:text-black gap-2 transition-all">
                        <MonitorPlay className="w-4 h-4" />
                        Teleprompter
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[100vw] h-[100vh] p-0 border-0 bg-black z-50 flex flex-col">
                      {/* Teleprompter UI */}
                      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center bg-gradient-to-b from-black to-transparent z-50">
                        <div className="flex items-center gap-4 bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/10">
                          <Button size="icon" variant="ghost" className="rounded-full text-white hover:bg-white/20" onClick={() => setIsPlaying(!isPlaying)}>
                            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                          </Button>
                          <div className="flex items-center gap-2 px-2">
                            <span className="text-xs font-mono text-muted-foreground">SPEED</span>
                            <Slider value={scrollSpeed} onValueChange={setScrollSpeed} max={10} step={1} className="w-24" />
                          </div>
                          <div className="flex items-center gap-2 px-2 border-l border-white/10">
                            <span className="text-xs font-mono text-muted-foreground">SIZE</span>
                            <Slider value={fontSize} onValueChange={setFontSize} min={24} max={96} step={4} className="w-24" />
                          </div>
                        </div>
                        <Button size="icon" variant="ghost" className="rounded-full text-white hover:bg-white/20" onClick={() => setIsTeleprompterOpen(false)}>
                          <X className="w-8 h-8" />
                        </Button>
                      </div>
                      
                      <div 
                        ref={teleprompterRef}
                        className="flex-1 overflow-y-auto px-[20%] py-[50vh] text-center text-white font-sans font-bold leading-tight no-scrollbar"
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
                
                <div className="h-8 w-[1px] bg-white/10 mx-1"></div>
                
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-white/10 text-muted-foreground hover:text-white" disabled={!generatedScript}>
                  <Copy className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-white/10 text-muted-foreground hover:text-white" disabled={!generatedScript}>
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-white/10 text-muted-foreground hover:text-white" disabled={!generatedScript}>
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <CardContent className="flex-1 p-0 relative overflow-hidden bg-black/20">
              {generatedScript ? (
                <div className="h-full overflow-auto p-10 font-mono text-sm leading-relaxed whitespace-pre-wrap text-white/90 selection:bg-primary/30">
                  {generatedScript}
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
                  <div className="w-32 h-32 mb-8 opacity-40 relative">
                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse"></div>
                    <img src="/images/aura-script.png" alt="Script Placeholder" className="w-full h-full object-contain relative z-10" />
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-3 text-white">Pronto para criar?</h3>
                  <p className="max-w-md mx-auto text-lg font-sans">Defina o tópico ao lado e deixe a AURA estruturar seu próximo vídeo viral.</p>
                </div>
              )}
            </CardContent>
            
            {generatedScript && (
              <div className="border-t border-white/5 p-4 bg-black/40 backdrop-blur-md flex justify-between items-center">
                <span className="text-xs text-muted-foreground font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  ~450 palavras • Est. 5 min de leitura
                </span>
                <Button variant="ghost" size="sm" className="rounded-full gap-2 text-muted-foreground hover:text-white hover:bg-white/10">
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
