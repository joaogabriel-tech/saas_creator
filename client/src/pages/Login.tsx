import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { ArrowRight, Sparkles, Video, Lightbulb, FileText } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Login() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, loading } = useAuth();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (!loading && isAuthenticated) {
      setLocation("/");
    }
  }, [isAuthenticated, loading, setLocation]);

  const handleLogin = () => {
    window.location.href = getLoginUrl();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 relative flex items-center justify-center text-5xl font-display font-bold text-primary animate-pulse">
            K
          </div>
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 text-foreground font-sans relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Primary gradient blob */}
        <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-gradient-to-br from-primary/20 to-indigo-500/10 rounded-full blur-3xl opacity-60 animate-pulse-slow" />
        {/* Secondary gradient blob */}
        <div className="absolute bottom-[15%] right-[10%] w-[600px] h-[600px] bg-gradient-to-tl from-secondary/15 to-primary/5 rounded-full blur-3xl opacity-50 animate-pulse-slow animation-delay-1000" />
        {/* Accent blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-radial from-primary/5 to-transparent rounded-full blur-2xl" />
      </div>

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Side - Branding & Info */}
        <div className="hidden lg:flex flex-col gap-8 animate-fade-in">
          {/* Logo & Title */}
          <div className="space-y-6">
            <div>
              <h1 className="font-display font-bold text-5xl md:text-6xl tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                Bem-vindo à <span className="text-primary">KRIO</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                A plataforma de criação de conteúdo que analisa seu DNA criativo e gera roteiros personalizados com IA.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid gap-4">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/30 hover:border-primary/30 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Video className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Análise de Referências</h3>
                <p className="text-sm text-muted-foreground">
                  Extraia padrões dos seus criadores favoritos
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/30 hover:border-primary/30 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Geração de Ideias</h3>
                <p className="text-sm text-muted-foreground">
                  Ideias ilimitadas baseadas no seu nicho
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/30 hover:border-primary/30 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Roteiros Personalizados</h3>
                <p className="text-sm text-muted-foreground">
                  Scripts com sua voz única e autêntica
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Card */}
        <div className="w-full animate-fade-in-up animation-delay-200">
          <div className="bg-card/90 backdrop-blur-2xl border border-border/50 rounded-3xl p-8 md:p-10 shadow-2xl shadow-primary/5">
            {/* Mobile Logo */}
            <div className="flex lg:hidden flex-col items-center mb-8">
              <h1 className="font-display font-bold text-3xl tracking-tight text-center">
                Bem-vindo à <span className="text-primary">KRIO</span>
              </h1>
              <p className="text-muted-foreground text-center mt-2">
                Descubra o seu DNA criativo
              </p>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 mx-auto flex justify-center w-fit">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">
                Powered by AI
              </span>
            </div>

            {/* Title for Desktop */}
            <div className="hidden lg:block mb-8">
              <h2 className="font-display font-bold text-3xl tracking-tight mb-2">
                Entrar na Plataforma
              </h2>
              <p className="text-muted-foreground">
                Faça login para começar a criar
              </p>
            </div>

            {/* Login Button */}
            <Button
              onClick={handleLogin}
              size="lg"
              className="w-full h-14 rounded-full text-lg font-bold bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 shadow-xl shadow-primary/30 transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/40 mb-6 group"
            >
              Entrar com Manus
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-3 text-muted-foreground font-medium">
                  O QUE VOCÊ VAI TER
                </span>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Análise ilimitada de referências
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Geração de roteiros com IA
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Teleprompter integrado
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Score de consistência em tempo real
                </p>
              </div>
            </div>

            {/* Footer Links */}
            <p className="text-center text-xs text-muted-foreground mt-8 pt-6 border-t border-border/30">
              Ao continuar, você concorda com nossos{" "}
              <a href="#" className="text-primary hover:underline font-medium">
                Termos de Uso
              </a>{" "}
              e{" "}
              <a href="#" className="text-primary hover:underline font-medium">
                Política de Privacidade
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
