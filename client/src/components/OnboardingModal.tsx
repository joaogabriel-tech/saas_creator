import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FolderPlus, Video, FileText, ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";
import confetti from "canvas-confetti";

interface OnboardingModalProps {
  open: boolean;
  onComplete: () => void;
}

const steps = [
  {
    id: 1,
    icon: FolderPlus,
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    title: "Crie seu Primeiro Projeto",
    description:
      "Projetos são como personas ou nichos de conteúdo. Crie um projeto para cada tipo de conteúdo que você produz (ex: 'Canal de Culinária', 'Expert em Marketing').",
    tips: [
      "Dê um nome descritivo ao projeto",
      "Escolha uma cor para identificação visual",
      "Adicione uma descrição do nicho",
    ],
  },
  {
    id: 2,
    icon: Video,
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-500/10",
    title: "Adicione Referências",
    description:
      "Analise vídeos dos seus criadores favoritos. Nossa IA extrai padrões de fala, estrutura e tom para entender o DNA criativo deles.",
    tips: [
      "Cole o link de um vídeo do YouTube",
      "A análise leva cerca de 1-2 minutos",
      "Adicione múltiplas referências para melhor resultado",
    ],
  },
  {
    id: 3,
    icon: FileText,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-500/10",
    title: "Gere Roteiros com IA",
    description:
      "Com base nas referências analisadas, gere roteiros personalizados que combinam com sua voz única. Escolha o tema, tom e duração.",
    tips: [
      "Selecione uma referência como base",
      "Defina o tema do roteiro",
      "Escolha o tom (informal, formal, humorístico)",
    ],
  },
];

export default function OnboardingModal({ open, onComplete }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const step = steps[currentStep];
  const Icon = step.icon;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      // Fire confetti animation
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Primary color confetti
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#a855f7', '#8b5cf6', '#7c3aed'], // primary shades
        });
        
        // Indigo color confetti
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#6366f1', '#4f46e5', '#4338ca'], // indigo shades
        });
      }, 250);

      // Complete onboarding after a short delay
      setTimeout(() => {
        onComplete();
      }, 1000);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        className="max-w-2xl p-0 gap-0 overflow-hidden"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        {/* Header with Progress */}
        <div className="relative bg-gradient-to-r from-primary/10 via-indigo-500/10 to-emerald-500/10 p-8 pb-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 relative flex items-center justify-center">
              <img
                src="/images/kryo-luxury-logo.png"
                alt="KRYO Logo"
                className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(168,85,247,0.4)]"
              />
            </div>
            <h2 className="font-display font-bold text-2xl text-foreground">
              Bem-vindo à <span className="text-primary">KRYO</span>
            </h2>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center gap-2">
            {steps.map((s, index) => (
              <div
                key={s.id}
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  index <= currentStep ? "bg-primary" : "bg-border/30"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2 font-medium">
            Passo {currentStep + 1} de {steps.length}
          </p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className={`w-20 h-20 rounded-2xl ${step.iconBg} flex items-center justify-center`}>
              <Icon className={`w-10 h-10 ${step.iconColor}`} />
            </div>
          </div>

          {/* Title & Description */}
          <div className="text-center space-y-3">
            <h3 className="font-display font-bold text-2xl text-foreground">{step.title}</h3>
            <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
              {step.description}
            </p>
          </div>

          {/* Tips */}
          <div className="bg-secondary/30 rounded-2xl p-6 space-y-3">
            <p className="text-sm font-semibold text-foreground mb-3">💡 Dicas:</p>
            {step.tips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <p className="text-sm text-muted-foreground">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer with Navigation */}
        <div className="p-6 bg-secondary/20 border-t border-border/30 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handlePrevious}
            disabled={isFirstStep}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Anterior
          </Button>

          <Button
            onClick={handleNext}
            size="lg"
            className="gap-2 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 shadow-lg shadow-primary/25"
          >
            {isLastStep ? "Começar" : "Próximo"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
