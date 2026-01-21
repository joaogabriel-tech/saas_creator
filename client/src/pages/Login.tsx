import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { ArrowRight, Sparkles } from "lucide-react";
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative overflow-hidden flex items-center justify-center">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-3xl opacity-50" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-card/80 backdrop-blur-xl border border-border/40 rounded-3xl p-10 shadow-2xl animate-fade-in-up">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 relative flex items-center justify-center mb-4">
              <img 
                src="/images/kryo-luxury-logo.png" 
                alt="KRYO Logo" 
                className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(168,85,247,0.4)]" 
              />
            </div>
            <h1 className="font-display font-bold text-3xl tracking-tight text-center">
              Bem-vindo à KRYO
            </h1>
            <p className="text-muted-foreground text-center mt-2">
              Descubra o seu DNA criativo
            </p>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 mb-6 mx-auto flex justify-center w-fit">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Crie roteiros personalizados com IA
            </span>
          </div>

          {/* Login Button */}
          <Button
            onClick={handleLogin}
            size="lg"
            className="w-full h-14 rounded-full text-lg bg-primary hover:bg-primary/90 shadow-xl shadow-primary/25 transition-all hover:scale-105 mb-6"
          >
            Entrar com Manus
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          {/* Features List */}
          <div className="space-y-3 pt-6 border-t border-border/40">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Analise seus criadores favoritos e extraia padrões
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Gere roteiros ilimitados com sua voz única
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Use o teleprompter integrado para gravar
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Ao continuar, você concorda com nossos{" "}
          <a href="#" className="text-primary hover:underline">
            Termos de Uso
          </a>{" "}
          e{" "}
          <a href="#" className="text-primary hover:underline">
            Política de Privacidade
          </a>
        </p>
      </div>
    </div>
  );
}
