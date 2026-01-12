import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PartyPopper, ArrowRight } from "lucide-react";

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Show popup if mouse leaves the window towards the top and hasn't been shown yet
      if (e.clientY <= 0 && !hasShown) {
        // Check if we already showed it in this session via sessionStorage
        const sessionShown = sessionStorage.getItem('exitIntentShown');
        if (!sessionShown) {
          setIsOpen(true);
          setHasShown(true);
          sessionStorage.setItem('exitIntentShown', 'true');
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md border-0 rounded-3xl overflow-hidden p-0 gap-0">
        <div className="bg-primary p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg animate-bounce">
              <PartyPopper className="w-8 h-8 text-primary" />
            </div>
            <DialogTitle className="text-white font-display text-3xl font-bold mb-2">
              Espere! Não vá ainda
            </DialogTitle>
            <DialogDescription className="text-white/90 font-sans text-lg">
              Temos um presente especial para você começar sua jornada.
            </DialogDescription>
          </div>
        </div>
        
        <div className="p-8 bg-white text-center space-y-6">
          <div className="space-y-2">
            <p className="text-muted-foreground font-medium">Use o cupom abaixo e ganhe</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-5xl font-display font-bold text-primary">15%</span>
              <div className="text-left leading-tight">
                <span className="block font-bold text-foreground text-lg">OFF</span>
                <span className="block text-xs text-muted-foreground uppercase tracking-wider">No 1º Mês</span>
              </div>
            </div>
          </div>

          <div className="bg-secondary/50 border border-dashed border-primary/30 p-4 rounded-xl flex items-center justify-between group cursor-pointer hover:bg-secondary transition-colors" onClick={() => {navigator.clipboard.writeText('KRYO15'); alert('Cupom copiado!')}}>
            <code className="font-mono font-bold text-xl text-primary tracking-widest">KRYO15</code>
            <Badge variant="secondary" className="bg-white text-xs font-bold shadow-sm group-hover:scale-105 transition-transform">
              COPIAR
            </Badge>
          </div>

          <DialogFooter className="flex-col sm:flex-col gap-3">
            <Button className="w-full h-12 rounded-xl font-bold text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all" onClick={() => setIsOpen(false)}>
              Resgatar Meu Desconto <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground text-sm" onClick={() => setIsOpen(false)}>
              Não, obrigado. Prefiro pagar o preço total.
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
