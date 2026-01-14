import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, PlayCircle, Sparkles } from "lucide-react";

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/10 selection:text-primary">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 relative flex items-center justify-center">
               {/* Logo com efeito de brilho suave (drop-shadow) para realçar a estética de luxo */}
              <img 
                src="/images/kryo-luxury-logo.png" 
                alt="KRYO Logo" 
                className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]" 
              />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight">KRYO</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-primary transition-colors">Funcionalidades</a>
            <a href="#how-it-works" className="hover:text-primary transition-colors">Como Funciona</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Planos</a>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="font-medium">Entrar</Button>
            </Link>
            <Link href="/dashboard">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 rounded-full px-6">
                Começar Agora
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none z-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50 animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl opacity-50"></div>
        </div>

        <div className="container mx-auto relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 mb-8 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">A nova era da criação de conteúdo</span>
          </div>
          
          <h1 className="font-display font-bold text-5xl md:text-7xl leading-[1.1] tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 animate-fade-in-up animation-delay-100">
            Descubra o seu <br/>
            <span className="text-primary">DNA Criativo</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            A KRYO analisa seus criadores favoritos e gera roteiros personalizados que combinam com sua voz única. Tecnologia de ponta para criadores exigentes.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-300">
            <Link href="/dashboard">
              <Button size="lg" className="h-14 px-8 rounded-full text-lg bg-primary hover:bg-primary/90 shadow-xl shadow-primary/25 transition-all hover:scale-105">
                Criar meu Perfil <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="h-14 px-8 rounded-full text-lg border-border/50 hover:bg-secondary/50 backdrop-blur-sm">
              <PlayCircle className="mr-2 w-5 h-5" /> Ver Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-secondary/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">Por que escolher a KRYO?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Uma suíte completa de ferramentas desenhada para elevar a qualidade do seu conteúdo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Análise de DNA",
                desc: "Nossa IA disseca padrões de fala, tom e estrutura dos seus vídeos de referência.",
                icon: "🧬"
              },
              {
                title: "Roteiros Infinitos",
                desc: "Gere dezenas de ideias e roteiros prontos para gravar em segundos.",
                icon: "📝"
              },
              {
                title: "Teleprompter Inteligente",
                desc: "Grave diretamente na plataforma com nosso teleprompter integrado.",
                icon: "🎥"
              }
            ].map((feature, i) => (
              <div key={i} className="bg-background p-8 rounded-3xl border border-border/40 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-display font-bold text-xl mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Minimal Footer */}
      <footer className="py-12 border-t border-border/40 bg-background">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
            <div className="w-8 h-8 relative flex items-center justify-center">
              <img src="/images/kryo-luxury-logo.png" alt="KRYO Logo" className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all" />
            </div>
            <span className="font-display font-bold text-lg">KRYO</span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © 2024 KRYO Platform. Todos os direitos reservados.
          </div>
          
          <div className="flex gap-6 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-primary">Privacidade</a>
            <a href="#" className="hover:text-primary">Termos</a>
            <a href="#" className="hover:text-primary">Suporte</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
