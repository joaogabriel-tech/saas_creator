import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Play, FileText, Activity, Zap, Sparkles } from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white mb-2">
            Bem-vindo, <span className="text-gradient-gold">João</span>
          </h2>
          <p className="text-muted-foreground font-sans text-lg max-w-xl">
            Sua aura digital está radiante hoje. O índice de consistência da sua persona subiu para 94%.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/references">
            <Button variant="outline" className="glass-button rounded-full px-6 h-12 border-white/10 text-white hover:text-primary hover:border-primary/50">
              Adicionar Referência
            </Button>
          </Link>
          <Link href="/scripts">
            <Button className="rounded-full bg-primary text-black hover:bg-primary/90 h-12 px-8 font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all hover:scale-105">
              <Sparkles className="w-4 h-4 mr-2" />
              Gerar Roteiro
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total de Projetos", value: "12", sub: "+2 essa semana", icon: FileText },
          { title: "Referências Analisadas", value: "48", sub: "15h processadas", icon: Play },
          { title: "Score de Consistência", value: "94%", sub: "Alta fidelidade", icon: Activity, highlight: true },
          { title: "Créditos AURA", value: "850", sub: "Renova em 12 dias", icon: Zap, gold: true },
        ].map((stat, i) => (
          <Card key={i} className={`glass-panel border-0 rounded-2xl overflow-hidden relative group transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] ${stat.gold ? 'bg-gradient-to-br from-primary/20 to-black/40 border-primary/20' : ''}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-muted-foreground font-sans uppercase tracking-wider">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.gold ? 'text-primary' : 'text-muted-foreground'}`} />
            </CardHeader>
            <CardContent className="relative z-10">
              <div className={`text-4xl font-display font-bold ${stat.highlight || stat.gold ? 'text-gradient-gold' : 'text-white'}`}>{stat.value}</div>
              <p className={`text-xs mt-2 ${stat.gold ? 'text-primary/80' : 'text-muted-foreground'}`}>{stat.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid gap-8 md:grid-cols-7">
        {/* Hero Image / Insight */}
        <div className="md:col-span-4 space-y-6">
          <div className="aspect-[16/9] w-full rounded-3xl relative overflow-hidden group shadow-2xl border border-white/5">
            <img 
              src="/images/aura-hero.png" 
              alt="AURA Intelligence" 
              className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-8">
              <div className="transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold mb-3 backdrop-blur-md border border-primary/20">INSIGHT DIÁRIO</span>
                <h3 className="text-white font-display font-bold text-2xl md:text-3xl mb-2">Tendência de Produtividade</h3>
                <p className="text-white/80 text-sm md:text-base max-w-md font-sans leading-relaxed">
                  Sua persona está perfeitamente alinhada com a nova onda de "Slow Productivity". Recomendamos um vídeo sobre "Fazer menos para conseguir mais".
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-all cursor-pointer group relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all"></div>
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-white/10">
                <Play className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold font-display text-lg text-white group-hover:text-primary transition-colors">Nova Análise</h3>
              <p className="text-sm text-muted-foreground mt-1">Importar do YouTube</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-all cursor-pointer group relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all"></div>
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-white/10">
                <FileText className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-bold font-display text-lg text-white group-hover:text-accent transition-colors">Novo Roteiro</h3>
              <p className="text-sm text-muted-foreground mt-1">Criar a partir do DNA</p>
            </div>
          </div>
        </div>

        {/* Recent Scripts List */}
        <div className="md:col-span-3">
          <Card className="glass-panel border-0 rounded-3xl h-full flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="font-display text-xl flex items-center justify-between">
                Roteiros Recentes
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-white">Ver todos</Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-1">
              <div className="divide-y divide-white/5">
                {[
                  { title: "Como investir em 2026", date: "Hoje, 10:23", status: "Pronto", color: "text-primary" },
                  { title: "5 Dicas de Produtividade", date: "Ontem, 14:45", status: "Rascunho", color: "text-muted-foreground" },
                  { title: "Review: iPhone 18", date: "10 Jan, 09:12", status: "Publicado", color: "text-green-400" },
                  { title: "Minha rotina matinal", date: "08 Jan, 16:30", status: "Pronto", color: "text-primary" },
                  { title: "Vlog de Viagem: Japão", date: "05 Jan, 11:00", status: "Arquivado", color: "text-muted-foreground" },
                ].map((item, i) => (
                  <div key={i} className="p-5 hover:bg-white/5 transition-colors flex items-center justify-between group cursor-pointer">
                    <div>
                      <h4 className="font-medium text-base text-white group-hover:text-primary transition-colors font-display">{item.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1 font-sans">{item.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-[10px] uppercase font-bold tracking-wider ${item.color}`}>
                        {item.status}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                        <ArrowUpRight className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
