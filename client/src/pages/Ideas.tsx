import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, TrendingUp, Globe, Zap, ArrowUpRight, Flame, RefreshCw, Filter } from "lucide-react";
import { Link } from "wouter";

export default function Ideas() {
  const [activeTab, setActiveTab] = useState("foryou");

  const trendingIdeas = [
    {
      id: 1,
      title: "O Fim da Produtividade Tóxica",
      category: "Mindset",
      viralScore: 98,
      source: "Alta demanda no TikTok (últimas 4h)",
      description: "Contraponha a cultura do 'hustle' com o movimento 'Slow Living'. Mostre como fazer menos gera mais resultados.",
      format: "Reels / TikTok (60s)",
      tags: ["#SlowLife", "#Produtividade", "#SaudeMental"],
      difficulty: "Fácil"
    },
    {
      id: 2,
      title: "React 19: O que muda pra valer?",
      category: "Tech",
      viralScore: 94,
      source: "Trending no Twitter/X Dev Community",
      description: "Explique as Server Actions de forma simples para iniciantes. Use analogias do dia a dia (ex: garçom vs cozinha).",
      format: "Carrossel / LinkedIn",
      tags: ["#ReactJS", "#WebDev", "#Coding"],
      difficulty: "Médio"
    },
    {
      id: 3,
      title: "Bastidores: Setup Minimalista 2026",
      category: "Lifestyle",
      viralScore: 89,
      source: "Crescimento de 200% em buscas no Pinterest",
      description: "Tour pelo seu escritório focado em itens essenciais. As pessoas amam ver organização e estética clean.",
      format: "YouTube Shorts",
      tags: ["#SetupWars", "#Minimalism", "#DeskTour"],
      difficulty: "Fácil"
    }
  ];

  const newsIdeas = [
    {
      id: 4,
      title: "Nova IA da OpenAI lançada hoje",
      category: "Notícias",
      viralScore: 99,
      source: "Breaking News (TechCrunch)",
      description: "Reaja ao lançamento do modelo 'Sora 2.0'. Mostre exemplos visuais e dê sua opinião sincera sobre o impacto.",
      format: "Vídeo Longo (YouTube)",
      tags: ["#AI", "#TechNews", "#Inovacao"],
      difficulty: "Médio"
    },
    {
      id: 5,
      title: "Queda do Bitcoin: Oportunidade ou Cilada?",
      category: "Finanças",
      viralScore: 92,
      source: "Manchetes Financeiras Globais",
      description: "Analise a queda recente de 5% e explique se é hora de comprar ou vender, baseado em dados históricos.",
      format: "Stories (Enquete)",
      tags: ["#Crypto", "#Investimentos", "#Bitcoin"],
      difficulty: "Difícil"
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3 h-3 mr-1.5 fill-primary" />
              Radar de Tendências
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-foreground">
            Ideias <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Virais</span>
          </h2>
          <p className="text-muted-foreground font-sans text-lg max-w-2xl leading-relaxed">
            Nossa IA monitorou <span className="font-bold text-foreground">14.500+ fontes</span> hoje para encontrar o que vai explodir no seu nicho.
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl h-12 border-border bg-white hover:bg-secondary text-foreground font-medium shadow-sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtrar Nicho
          </Button>
          <Button variant="outline" className="rounded-xl h-12 border-border bg-white hover:bg-secondary text-foreground font-medium shadow-sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar Feed
          </Button>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="foryou" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="bg-transparent p-0 mb-8 border-b border-border/50 w-full justify-start h-auto rounded-none gap-8">
          <TabsTrigger 
            value="foryou" 
            className="rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary px-0 py-3 font-display font-bold text-lg transition-all text-muted-foreground hover:text-foreground"
          >
            Para Você
          </TabsTrigger>
          <TabsTrigger 
            value="news" 
            className="rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary px-0 py-3 font-display font-bold text-lg transition-all text-muted-foreground hover:text-foreground"
          >
            Notícias do Dia
          </TabsTrigger>
          <TabsTrigger 
            value="evergreen" 
            className="rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary px-0 py-3 font-display font-bold text-lg transition-all text-muted-foreground hover:text-foreground"
          >
            Conteúdo Evergreen
          </TabsTrigger>
        </TabsList>

        <TabsContent value="foryou" className="space-y-6 mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trendingIdeas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="news" className="space-y-6 mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {newsIdeas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="evergreen" className="mt-0">
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white/50 rounded-3xl border border-dashed border-border">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <Globe className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-display font-bold text-xl mb-2">Biblioteca Evergreen</h3>
            <p className="text-muted-foreground max-w-md">
              Ideias atemporais que funcionam o ano todo. Estamos curando as melhores estratégias para o seu perfil.
            </p>
            <Button className="mt-6" variant="outline">Explorar Arquivo</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function IdeaCard({ idea }: { idea: any }) {
  return (
    <Card className="border-0 rounded-[2rem] bg-white shadow-lg shadow-indigo-900/5 hover:shadow-xl hover:shadow-indigo-900/10 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full overflow-hidden group">
      <CardHeader className="pb-4 pt-6 px-6 relative">
        <div className="flex justify-between items-start mb-4">
          <Badge variant="secondary" className="bg-secondary text-foreground font-bold hover:bg-secondary/80">
            {idea.category}
          </Badge>
          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-bold border border-emerald-100">
            <Flame className="w-3.5 h-3.5 fill-emerald-700" />
            {idea.viralScore}/100
          </div>
        </div>
        <CardTitle className="font-display text-2xl leading-tight group-hover:text-primary transition-colors">
          {idea.title}
        </CardTitle>
        <div className="flex items-center gap-2 mt-3 text-xs font-medium text-muted-foreground bg-secondary/50 p-2 rounded-lg">
          <TrendingUp className="w-3.5 h-3.5 text-primary" />
          {idea.source}
        </div>
      </CardHeader>
      
      <CardContent className="px-6 pb-6 flex-1">
        <p className="text-muted-foreground font-sans leading-relaxed text-sm mb-4">
          {idea.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {idea.tags.map((tag: string, i: number) => (
            <span key={i} className="text-xs font-medium text-primary/80 bg-primary/5 px-2 py-1 rounded-md">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs font-medium text-muted-foreground border-t border-border/50 pt-4">
          <span>Formato: {idea.format}</span>
          <span>Dificuldade: {idea.difficulty}</span>
        </div>
      </CardContent>
      
      <CardFooter className="px-6 pb-6 pt-0">
        <Link href="/scripts">
          <Button className="w-full rounded-xl font-bold shadow-md shadow-primary/20 group-hover:shadow-primary/40 transition-all bg-primary text-white hover:bg-primary/90">
            <Sparkles className="w-4 h-4 mr-2" />
            Gerar Roteiro Agora
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
