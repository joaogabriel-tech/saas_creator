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
      highlightColor: "bg-primary"
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
    <div className="space-y-16 py-8">
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-foreground">
          Invista na sua <span className="text-primary">Aura Digital</span>
        </h2>
        <p className="text-muted-foreground font-sans text-xl leading-relaxed">
          Escolha o plano que se adapta ao seu ritmo de produção. Sem contratos longos, cancele quando quiser.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {plans.map((plan, i) => (
          <Card 
            key={i} 
            className={`border-0 rounded-3xl relative flex flex-col transition-all duration-500 hover:-translate-y-2 ${
              plan.popular 
                ? 'bg-white shadow-2xl shadow-primary/10 ring-1 ring-primary/20 z-10 scale-105' 
                : 'bg-white/60 hover:bg-white shadow-lg hover:shadow-xl'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary hover:bg-primary text-white border-0 px-4 py-1.5 rounded-full font-bold tracking-wide shadow-lg shadow-primary/30">
                  MAIS POPULAR
                </Badge>
              </div>
            )}

            <CardHeader className="pb-8 pt-8 px-8">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${plan.popular ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'}`}>
                <plan.icon className="w-7 h-7" />
              </div>
              <CardTitle className="font-display text-2xl text-foreground mb-3 font-bold">{plan.name}</CardTitle>
              <CardDescription className="text-muted-foreground font-sans text-base leading-relaxed h-12">{plan.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1 space-y-8 px-8">
              <div className="flex items-baseline">
                <span className="text-5xl font-bold text-foreground font-display tracking-tight">{plan.price}</span>
                <span className="text-muted-foreground ml-2 font-medium font-sans">{plan.period}</span>
              </div>

              <ul className="space-y-5">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-foreground/80 font-medium font-sans">
                    <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.popular ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground'}`}>
                      <Check className="w-3 h-3" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="pt-8 pb-8 px-8">
              <Button 
                className={`w-full h-14 rounded-xl font-bold tracking-wide text-base transition-all ${
                  plan.popular 
                    ? 'bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5' 
                    : 'bg-white hover:bg-secondary text-foreground border-2 border-secondary hover:border-secondary-foreground/10'
                }`}
              >
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center pt-12 pb-8 bg-secondary/30 rounded-3xl mx-4 md:mx-auto max-w-4xl p-8">
        <p className="text-muted-foreground text-base font-medium font-sans">
          Precisa de uma solução personalizada para sua agência? <a href="#" className="text-primary font-bold hover:underline">Entre em contato</a> para planos Enterprise.
        </p>
      </div>
    </div>
  );
}
