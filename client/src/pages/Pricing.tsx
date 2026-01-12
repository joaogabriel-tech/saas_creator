import { Check, Sparkles, Zap, Crown, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";

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
      cta: "Quero Viralizar Mais",
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
      <ExitIntentPopup />
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <Badge variant="outline" className="px-4 py-1.5 rounded-full border-primary/20 bg-primary/5 text-primary font-medium tracking-wide mb-4">
          <ShieldCheck className="w-3.5 h-3.5 mr-2" />
          Garantia de 7 dias ou seu dinheiro de volta
        </Badge>
        <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-foreground leading-[1.1]">
          Invista na sua <span className="text-primary relative inline-block">
            Aura Digital
            <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/20" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
            </svg>
          </span>
        </h2>
        <p className="text-muted-foreground font-sans text-xl leading-relaxed max-w-2xl mx-auto">
          Escolha o plano que se adapta ao seu ritmo de produção. Sem contratos longos, cancele quando quiser.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 items-center">
        {plans.map((plan, i) => (
          <Card 
            key={i} 
            className={`border-0 rounded-[2rem] relative flex flex-col transition-all duration-500 ${
              plan.popular 
                ? 'bg-white shadow-2xl shadow-primary/15 ring-1 ring-primary/20 z-10 scale-105 md:-mt-4 md:-mb-4' 
                : 'bg-white/60 hover:bg-white shadow-lg hover:shadow-xl hover:-translate-y-1'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-full text-center">
                <Badge className="bg-gradient-to-r from-primary to-purple-600 text-white border-0 px-6 py-2 rounded-full font-bold tracking-wide shadow-lg shadow-primary/30 text-sm uppercase">
                  Melhor Custo-Benefício
                </Badge>
              </div>
            )}

            <CardHeader className={`pb-8 pt-10 px-8 ${plan.popular ? 'bg-gradient-to-b from-primary/5 to-transparent' : ''}`}>
              <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${plan.popular ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-secondary text-muted-foreground'}`}>
                  <plan.icon className="w-7 h-7" />
                </div>
                {plan.popular && (
                  <div className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    ECONOMIZE 20%
                  </div>
                )}
              </div>
              <CardTitle className="font-display text-3xl text-foreground mb-3 font-bold">{plan.name}</CardTitle>
              <CardDescription className="text-muted-foreground font-sans text-base leading-relaxed h-12">{plan.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1 space-y-8 px-8">
              <div className="flex items-baseline">
                <span className="text-5xl font-bold text-foreground font-display tracking-tight">{plan.price}</span>
                <span className="text-muted-foreground ml-2 font-medium font-sans">{plan.period}</span>
              </div>

              <div className="h-px w-full bg-border/50"></div>

              <ul className="space-y-5">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-foreground/80 font-medium font-sans group">
                    <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${plan.popular ? 'bg-primary/20 text-primary group-hover:bg-primary group-hover:text-white' : 'bg-secondary text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'}`}>
                      <Check className="w-3 h-3" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="pt-4 pb-10 px-8">
              <Button 
                className={`w-full h-14 rounded-xl font-bold tracking-wide text-base transition-all group ${
                  plan.popular 
                    ? 'bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1' 
                    : 'bg-white hover:bg-secondary text-foreground border-2 border-secondary hover:border-secondary-foreground/10'
                }`}
              >
                {plan.cta}
                {plan.popular && <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />}
              </Button>
              {plan.popular && (
                <p className="text-xs text-center text-muted-foreground mt-4 font-medium">
                  Renova em 30 dias. Cancele a qualquer momento.
                </p>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center pt-12 pb-8 bg-gradient-to-br from-secondary/50 to-background border border-border/50 rounded-[2rem] mx-4 md:mx-auto max-w-4xl p-10 shadow-sm">
        <h3 className="font-display font-bold text-2xl mb-4">Dúvidas sobre qual escolher?</h3>
        <p className="text-muted-foreground text-lg font-medium font-sans mb-6">
          Nossa equipe de especialistas em creators pode te ajudar a montar a estratégia perfeita.
        </p>
        <Button variant="link" className="text-primary font-bold text-lg hover:underline p-0 h-auto">
          Falar com um especialista <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
