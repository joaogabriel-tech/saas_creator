import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Loader2, Sparkles } from "lucide-react";
import { useProject } from "@/contexts/ProjectContext";

type NewProjectDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const PERSONA_COLORS = [
  "#3b82f6", // blue
  "#8b5cf6", // purple
  "#ec4899", // pink
  "#f59e0b", // amber
  "#10b981", // emerald
  "#ef4444", // red
  "#06b6d4", // cyan
  "#f97316", // orange
];

export function NewProjectDialog({ open, onOpenChange }: NewProjectDialogProps) {
  const [name, setName] = useState("");
  const [persona, setPersona] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState(PERSONA_COLORS[0]);
  
  const { refetchProjects } = useProject();
  const utils = trpc.useUtils();

  const createProjectMutation = trpc.projects.create.useMutation({
    onSuccess: () => {
      toast.success("Projeto criado com sucesso!");
      refetchProjects();
      utils.projects.list.invalidate();
      
      // Reset form
      setName("");
      setPersona("");
      setDescription("");
      setSelectedColor(PERSONA_COLORS[0]);
      
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(`Erro ao criar projeto: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error("Nome do projeto é obrigatório");
      return;
    }
    
    if (!persona.trim()) {
      toast.error("Persona é obrigatória");
      return;
    }

    createProjectMutation.mutate({
      name: name.trim(),
      persona: persona.trim(),
      description: description.trim() || undefined,
      color: selectedColor,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Novo Projeto
          </DialogTitle>
          <DialogDescription>
            Crie uma nova persona para organizar suas referências, ideias e roteiros.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Projeto</Label>
            <Input
              id="name"
              placeholder="Ex: Canal de Finanças"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={createProjectMutation.isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="persona">Persona / Nicho</Label>
            <Input
              id="persona"
              placeholder="Ex: Expert em Investimentos"
              value={persona}
              onChange={(e) => setPersona(e.target.value)}
              disabled={createProjectMutation.isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição (Opcional)</Label>
            <Textarea
              id="description"
              placeholder="Descreva o objetivo deste projeto..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={createProjectMutation.isPending}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Cor de Identificação</Label>
            <div className="flex gap-2">
              {PERSONA_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`w-8 h-8 rounded-full transition-all ${
                    selectedColor === color
                      ? "ring-2 ring-offset-2 ring-primary scale-110"
                      : "hover:scale-105"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                  disabled={createProjectMutation.isPending}
                />
              ))}
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={createProjectMutation.isPending}
              className="w-full sm:w-auto"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={createProjectMutation.isPending}
              className="w-full sm:w-auto"
            >
              {createProjectMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Criando...
                </>
              ) : (
                "Criar Projeto"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
