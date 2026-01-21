import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Zap } from "lucide-react";
import { Link } from "wouter";

interface InsufficientCreditsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentBalance: number;
  estimatedCost: number;
  operationName?: string;
}

export function InsufficientCreditsDialog({
  open,
  onOpenChange,
  currentBalance,
  estimatedCost,
  operationName = "esta operação",
}: InsufficientCreditsDialogProps) {
  const deficit = estimatedCost - currentBalance;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <DialogTitle className="text-xl">Créditos Insuficientes</DialogTitle>
          </div>
          <DialogDescription className="text-base leading-relaxed pt-2">
            Você não possui créditos suficientes para realizar {operationName}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Seu Saldo</p>
              <p className="text-2xl font-bold text-foreground">
                {currentBalance.toLocaleString("pt-BR")}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Custo Estimado</p>
              <p className="text-2xl font-bold text-primary">
                {estimatedCost.toLocaleString("pt-BR")}
              </p>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-primary" />
              <p className="text-sm font-medium">Você precisa de mais créditos</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Faltam <span className="font-semibold text-foreground">{deficit.toLocaleString("pt-BR")} créditos</span> para completar esta operação.
            </p>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            Cancelar
          </Button>
          <Link href="/planos">
            <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90">
              <Zap className="w-4 h-4 mr-2" />
              Ver Planos
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
