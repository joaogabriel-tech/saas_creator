import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Play, FileText, Activity, Zap } from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground font-mono text-sm mt-1">Bem-vindo de volta, João. Seu DNA criativo está ativo.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/references">
            <Button variant="outline" className="rounded-none border-2 border-border hover:bg-accent hover:text-accent-foreground">
              Adicionar Referência
            </Button>
          </Link>
          <Link href="/scripts">
            <Button className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 border-2 border-transparent">
              <Zap className="w-4 h-4 mr-2" />
              Gerar Roteiro
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-none border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-mono">Total de Projetos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-display">12</div>
            <p className="text-xs text-muted-foreground mt-1">+2 desde a semana passada</p>
          </CardContent>
        </Card>
        <Card className="rounded-none border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-mono">Referências Analisadas</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-display">48</div>
            <p className="text-xs text-muted-foreground mt-1">15h de conteúdo processado</p>
          </CardContent>
        </Card>
        <Card className="rounded-none border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-mono">Score de Consistência</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-display text-primary">94%</div>
            <p className="text-xs text-muted-foreground mt-1">Alta fidelidade à persona</p>
          </CardContent>
        </Card>
        <Card className="rounded-none border-border shadow-sm bg-primary text-primary-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-mono text-primary-foreground/80">Créditos Restantes</CardTitle>
            <Zap className="h-4 w-4 text-primary-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-display">850</div>
            <p className="text-xs text-primary-foreground/60 mt-1">Renova em 12 dias</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid gap-8 md:grid-cols-7">
        {/* Recent Activity / Hero Image */}
        <div className="md:col-span-4 space-y-4">
          <div className="aspect-video w-full bg-card border border-border relative overflow-hidden group">
            <img 
              src="/images/hero-dashboard.png" 
              alt="Analytics Dashboard" 
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
              <div>
                <h3 className="text-white font-display font-bold text-xl">Análise de Tendências</h3>
                <p className="text-white/70 text-sm mt-1">Sua persona está alinhada com as trends atuais de produtividade.</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Card className="rounded-none border-border hover:border-primary transition-colors cursor-pointer group">
              <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                <div className="w-12 h-12 bg-secondary flex items-center justify-center rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Play className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold font-display">Nova Análise</h3>
                  <p className="text-xs text-muted-foreground mt-1">Importar vídeo do YouTube</p>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-none border-border hover:border-primary transition-colors cursor-pointer group">
              <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                <div className="w-12 h-12 bg-secondary flex items-center justify-center rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold font-display">Novo Roteiro</h3>
                  <p className="text-xs text-muted-foreground mt-1">Criar a partir do DNA</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Scripts List */}
        <div className="md:col-span-3">
          <Card className="rounded-none border-border h-full">
            <CardHeader>
              <CardTitle className="font-display">Roteiros Recentes</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {[
                  { title: "Como investir em 2026", date: "Hoje, 10:23", status: "Pronto" },
                  { title: "5 Dicas de Produtividade", date: "Ontem, 14:45", status: "Rascunho" },
                  { title: "Review: iPhone 18", date: "10 Jan, 09:12", status: "Publicado" },
                  { title: "Minha rotina matinal", date: "08 Jan, 16:30", status: "Pronto" },
                  { title: "Vlog de Viagem: Japão", date: "05 Jan, 11:00", status: "Arquivado" },
                ].map((item, i) => (
                  <div key={i} className="p-4 hover:bg-secondary/50 transition-colors flex items-center justify-between group cursor-pointer">
                    <div>
                      <h4 className="font-medium text-sm group-hover:text-primary transition-colors">{item.title}</h4>
                      <p className="text-xs text-muted-foreground font-mono mt-1">{item.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        "text-[10px] uppercase font-bold px-2 py-0.5 border",
                        item.status === "Pronto" ? "bg-primary/10 text-primary border-primary/20" :
                        item.status === "Rascunho" ? "bg-secondary text-muted-foreground border-border" :
                        "bg-green-500/10 text-green-600 border-green-500/20"
                      )}>
                        {item.status}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-border">
                <Button variant="ghost" className="w-full text-xs font-mono text-muted-foreground hover:text-foreground">
                  VER TODOS OS PROJETOS
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Helper for conditional classes
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}
