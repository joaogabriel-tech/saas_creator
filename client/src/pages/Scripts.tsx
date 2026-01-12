import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Copy, Download, Share2, RefreshCw, Edit3 } from "lucide-react";

export default function Scripts() {
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScript, setGeneratedScript] = useState<string | null>(null);

  const handleGenerate = () => {
    if (!topic) return;
    setIsGenerating(true);
    
    // Simulate generation delay
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
...
      `);
      setIsGenerating(false);
    }, 2500);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-display font-bold tracking-tight">Gerador de Roteiros</h2>
          <p className="text-muted-foreground font-mono text-sm mt-1">Crie conteúdo alinhado à sua persona em segundos.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 h-full">
        {/* Left Panel: Controls */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <Card className="rounded-none border-border shadow-sm flex-1 flex flex-col">
            <CardHeader>
              <CardTitle className="font-display">Configuração</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 flex-1">
              <div className="space-y-2">
                <label className="text-sm font-medium">Sobre o que é o vídeo?</label>
                <Textarea 
                  placeholder="Ex: Como começar a investir com pouco dinheiro em 2026..." 
                  className="rounded-none border-border min-h-[100px] resize-none focus-visible:ring-primary"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Formato</label>
                  <Select defaultValue="youtube">
                    <SelectTrigger className="rounded-none border-border">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent className="rounded-none border-border">
                      <SelectItem value="youtube">YouTube (Longo)</SelectItem>
                      <SelectItem value="shorts">Shorts/Reels</SelectItem>
                      <SelectItem value="linkedin">LinkedIn Post</SelectItem>
                      <SelectItem value="newsletter">Newsletter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Objetivo</label>
                  <Select defaultValue="educate">
                    <SelectTrigger className="rounded-none border-border">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent className="rounded-none border-border">
                      <SelectItem value="educate">Educar</SelectItem>
                      <SelectItem value="entertain">Entreter</SelectItem>
                      <SelectItem value="sell">Vender</SelectItem>
                      <SelectItem value="inspire">Inspirar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Persona Ativa</label>
                <div className="p-3 bg-secondary border border-border text-sm flex items-center justify-between">
                  <span className="font-mono">Primo Rico + Minimalismo</span>
                  <Button variant="link" size="sm" className="h-auto p-0 text-primary">Alterar</Button>
                </div>
              </div>

              <div className="pt-4 mt-auto">
                <Button 
                  className="w-full rounded-none bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-lg font-display font-bold tracking-wide"
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
          <Card className="rounded-none border-border shadow-sm h-full flex flex-col bg-card">
            <div className="border-b border-border p-2 flex items-center justify-between bg-secondary/30">
              <Tabs defaultValue="script" className="w-auto">
                <TabsList className="bg-transparent p-0 h-auto gap-4">
                  <TabsTrigger value="script" className="rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary px-2 py-1">Roteiro</TabsTrigger>
                  <TabsTrigger value="structure" className="rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary px-2 py-1">Estrutura</TabsTrigger>
                  <TabsTrigger value="seo" className="rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary px-2 py-1">SEO & Tags</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none hover:bg-secondary" disabled={!generatedScript}>
                  <Copy className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none hover:bg-secondary" disabled={!generatedScript}>
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none hover:bg-secondary" disabled={!generatedScript}>
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <CardContent className="flex-1 p-0 relative overflow-hidden">
              {generatedScript ? (
                <div className="h-full overflow-auto p-8 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                  {generatedScript}
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
                  <div className="w-24 h-24 mb-6 opacity-20">
                    <img src="/images/feature-script.png" alt="Script Placeholder" className="w-full h-full object-contain" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-2">Pronto para criar?</h3>
                  <p className="max-w-md mx-auto">Defina o tópico ao lado e deixe a IA estruturar seu próximo vídeo viral baseado no DNA da sua persona.</p>
                </div>
              )}
            </CardContent>
            
            {generatedScript && (
              <div className="border-t border-border p-4 bg-secondary/10 flex justify-between items-center">
                <span className="text-xs text-muted-foreground font-mono">~450 palavras • Est. 5 min de leitura</span>
                <Button variant="outline" size="sm" className="rounded-none gap-2">
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
