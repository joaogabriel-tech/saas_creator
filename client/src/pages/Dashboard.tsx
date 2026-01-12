import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Play, FileText, Activity, Zap, Sparkles } from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-foreground mb-3">
            Olá, <span className="text-primary">João Gabriel</span>
          </h2>
          <p className="text-muted-foreground font-sans text-lg max-w-xl leading-relaxed">
            Sua consistência está excelente. O DNA da sua persona atingiu <span className="font-semibold text-foreground">94% de fidelidade</span>.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/references">
            <Button variant="outline" className="rounded-xl px-6 h-12 border-border bg-white hover:bg-secondary text-foreground font-medium shadow-sm hover:shadow-md transition-all">
              Adicionar Referência
            </Button>
          </Link>
          <Link href="/scripts">
            <Button className="rounded-xl bg-primary text-white hover:bg-primary/90 h-12 px-8 font-bold shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-primary/40">
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
          <Card key={i} className="soft-card border-0 bg-white relative overflow-hidden group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-bold text-muted-foreground font-sans uppercase tracking-wider">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.gold ? 'bg-amber-100 text-amber-600' : stat.highlight ? 'bg-emerald-100 text-emerald-600' : 'bg-secondary text-foreground'}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-4xl font-display font-bold mt-2 ${stat.highlight ? 'text-emerald-600' : stat.gold ? 'text-amber-600' : 'text-foreground'}`}>{stat.value}</div>
              <p className="text-sm mt-2 text-muted-foreground font-medium">{stat.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid gap-8 md:grid-cols-7">
        {/* Hero Insight */}
        <div className="md:col-span-4 space-y-6">
          <div className="aspect-[16/9] w-full rounded-3xl relative overflow-hidden group shadow-xl shadow-indigo-900/5">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-indigo-600 mix-blend-multiply opacity-90 transition-opacity group-hover:opacity-100"></div>
            <img 
              src="/images/artificial-brain.png" 
              alt="AURA Intelligence" 
              className="object-cover w-full h-full mix-blend-overlay opacity-50 animate-pulse-slow"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-10">
              <div className="transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-4 backdrop-blur-md border border-white/20">INSIGHT DIÁRIO</span>
                <h3 className="text-white font-display font-bold text-3xl mb-3 leading-tight">Tendência: Slow Productivity</h3>
                <p className="text-white/90 text-base max-w-md font-sans leading-relaxed">
                  Sua persona está alinhada com a nova onda de produtividade consciente. Recomendamos criar conteúdo sobre "Fazer menos, mas melhor".
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-3xl soft-shadow border border-border/50 hover:border-primary/30 transition-all cursor-pointer group hover:-translate-y-1">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-primary">
                <Play className="w-7 h-7" />
              </div>
              <h3 className="font-bold font-display text-xl text-foreground group-hover:text-primary transition-colors">Nova Análise</h3>
              <p className="text-sm text-muted-foreground mt-2 font-medium">Importar do YouTube</p>
            </div>
            <div className="bg-white p-8 rounded-3xl soft-shadow border border-border/50 hover:border-primary/30 transition-all cursor-pointer group hover:-translate-y-1">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-emerald-600">
                <FileText className="w-7 h-7" />
              </div>
              <h3 className="font-bold font-display text-xl text-foreground group-hover:text-emerald-600 transition-colors">Novo Roteiro</h3>
              <p className="text-sm text-muted-foreground mt-2 font-medium">Criar a partir do DNA</p>
            </div>
          </div>
        </div>

        {/* Recent Scripts List */}
        <div className="md:col-span-3">
          <Card className="soft-card border-0 bg-white h-full flex flex-col shadow-xl shadow-indigo-900/5">
            <CardHeader className="pb-6 pt-8 px-8">
              <CardTitle className="font-display text-xl flex items-center justify-between text-foreground">
                Roteiros Recentes
                <Button variant="ghost" size="sm" className="text-xs font-bold text-primary hover:bg-primary/10 hover:text-primary">VER TODOS</Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-1">
              <div className="divide-y divide-border/50">
                {[
                  { title: "Como investir em 2026", date: "Hoje, 10:23", status: "Pronto", color: "bg-emerald-100 text-emerald-700" },
                  { title: "5 Dicas de Produtividade", date: "Ontem, 14:45", status: "Rascunho", color: "bg-secondary text-muted-foreground" },
                  { title: "Review: iPhone 18", date: "10 Jan, 09:12", status: "Publicado", color: "bg-blue-100 text-blue-700" },
                  { title: "Minha rotina matinal", date: "08 Jan, 16:30", status: "Pronto", color: "bg-emerald-100 text-emerald-700" },
                  { title: "Vlog de Viagem: Japão", date: "05 Jan, 11:00", status: "Arquivado", color: "bg-secondary text-muted-foreground" },
                ].map((item, i) => (
                  <div key={i} className="p-6 hover:bg-secondary/30 transition-colors flex items-center justify-between group cursor-pointer">
                    <div>
                      <h4 className="font-bold text-base text-foreground group-hover:text-primary transition-colors font-display">{item.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1.5 font-medium">{item.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full ${item.color}`}>
                        {item.status}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
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
