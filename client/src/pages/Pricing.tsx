import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "R$ 19,90",
      period: "/mês",
      description: "Para quem está começando a descobrir sua voz digital.",
      icon: Sparkles,
      features: [
        "1 Persona (DNA de Conteúdo)",
        "2 Roteiros gerados por mês",
        "Análise básica de estilo",
        "Editor de texto simples"
      ],
      cta: "Começar Agora",
      variant: "outline",
      popular: false
    },
    {
      name: "Creator",
      price: "R$ 97,00",
      period: "/mês",
      description: "A escolha ideal para quem produz conteúdo toda semana.",
      icon: Zap,
      features: [
        "3 Personas (ex: Sério, Vlog, Reels)",
        "15 Roteiros gerados por mês",
        "Acesso ao Teleprompter AURA",
        "Análise profunda de engajamento",
        "Suporte por email"
      ],
      cta: "Assinar Creator",
      variant: "default",
      popular: true,
      highlightColor: "#a600ff" // Purple neon
    },
    {
      name: "Authority",
      price: "R$ 297,00",
      period: "/mês",
      description: "Potência máxima para agências e produtores em escala.",
      icon: Crown,
      features: [
        "Personas Ilimitadas",
        "Roteiros Ilimitados (Uso Justo)",
        "Exportação PDF/Word",
        "Modo Director's Cut (Em breve)",
        "Suporte Prioritário 24/7",
        "Acesso antecipado a novas features"
      ],
      cta: "Falar com Consultor",
      variant: "outline",
      popular: false
    }
  ];

  return (
    <div className="space-y-12 py-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white">
          Invista na sua <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a600ff] to-[#c800ff]">Aura Digital</span>
        </h2>
        <p className="text-muted-foreground font-sans text-lg max-w-2xl mx-auto">
          Escolha o plano que se adapta ao seu ritmo de produção. Cancele a qualquer momento.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, i) => (
          <Card 
            key={i} 
            className={`glass-panel border-0 rounded-3xl relative flex flex-col transition-all duration-500 hover:-translate-y-2 ${plan.popular ? 'shadow-[0_0_40px_-10px_rgba(166,0,255,0.3)] border-t border-[#a600ff]/50' : 'hover:bg-white/5'}`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-[#a600ff] hover:bg-[#a600ff] text-white border-0 px-4 py-1 rounded-full font-bold tracking-wide shadow-[0_0_20px_rgba(166,0,255,0.5)]">
                  MAIS POPULAR
                </Badge>
              </div>
            )}

            <CardHeader className="pb-8">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${plan.popular ? 'bg-[#a600ff]/20 text-[#a600ff]' : 'bg-white/5 text-muted-foreground'}`}>
                <plan.icon className="w-6 h-6" />
              </div>
              <CardTitle className="font-display text-2xl text-white mb-2">{plan.name}</CardTitle>
              <CardDescription className="text-muted-foreground font-sans h-10">{plan.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1 space-y-8">
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-white font-display">{plan.price}</span>
                <span className="text-muted-foreground ml-2 font-sans">{plan.period}</span>
              </div>

              <ul className="space-y-4">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-white/80 font-sans">
                    <Check className={`w-5 h-5 shrink-0 ${plan.popular ? 'text-[#a600ff]' : 'text-muted-foreground'}`} />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="pt-8">
              <Button 
                className={`w-full h-12 rounded-xl font-bold tracking-wide transition-all ${
                  plan.popular 
                    ? 'bg-[#a600ff] hover:bg-[#a600ff]/90 text-white shadow-[0_0_20px_rgba(166,0,255,0.3)] hover:scale-[1.02]' 
                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                }`}
              >
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center pt-12 pb-8">
        <p className="text-muted-foreground text-sm font-sans">
          Precisa de uma solução personalizada para sua agência? <a href="#" className="text-[#a600ff] hover:underline">Entre em contato</a> para planos Enterprise.
        </p>
      </div>
    </div>
  );
}
