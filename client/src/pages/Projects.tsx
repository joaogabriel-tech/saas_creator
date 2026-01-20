import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NewProjectDialog } from "@/components/NewProjectDialog";
import { useProject } from "@/contexts/ProjectContext";
import { Loader2, Plus, Folder, FileText, Lightbulb, FileCode, Trash2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Projects() {
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<number | null>(null);
  
  const { projects, isLoading, setActiveProject, refetchProjects } = useProject();
  const utils = trpc.useUtils();

  const deleteProjectMutation = trpc.projects.delete.useMutation({
    onSuccess: () => {
      toast.success("Projeto deletado com sucesso!");
      refetchProjects();
      utils.projects.list.invalidate();
      setProjectToDelete(null);
    },
    onError: (error) => {
      toast.error(`Erro ao deletar projeto: ${error.message}`);
    },
  });

  const handleDeleteProject = () => {
    if (projectToDelete) {
      deleteProjectMutation.mutate({ id: projectToDelete });
    }
  };

  const handleSelectProject = (project: typeof projects[0]) => {
    setActiveProject(project);
    toast.success(`Projeto "${project.name}" selecionado!`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">
            Meus Projetos
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mt-2">
            Organize suas personas e conteúdos por projeto
          </p>
        </div>
        <Button
          onClick={() => setIsNewProjectDialogOpen(true)}
          className="w-full sm:w-auto"
          size="lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Novo Projeto
        </Button>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Folder className="w-16 h-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum projeto ainda</h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Crie seu primeiro projeto para começar a organizar suas referências, ideias e roteiros.
            </p>
            <Button onClick={() => setIsNewProjectDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Criar Primeiro Projeto
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={() => handleSelectProject(project)}
              onDelete={() => setProjectToDelete(project.id)}
            />
          ))}
        </div>
      )}

      {/* Dialogs */}
      <NewProjectDialog
        open={isNewProjectDialogOpen}
        onOpenChange={setIsNewProjectDialogOpen}
      />

      <AlertDialog
        open={projectToDelete !== null}
        onOpenChange={(open) => !open && setProjectToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deletar Projeto?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Todas as referências, ideias e roteiros associados a este projeto serão permanentemente deletados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProject}
              className="bg-destructive hover:bg-destructive/90"
            >
              {deleteProjectMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deletando...
                </>
              ) : (
                "Deletar"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

type ProjectCardProps = {
  project: {
    id: number;
    name: string;
    persona: string;
    description: string | null;
    color: string | null;
  };
  onSelect: () => void;
  onDelete: () => void;
};

function ProjectCard({ project, onSelect, onDelete }: ProjectCardProps) {
  const { data: stats } = trpc.projects.getStats.useQuery({ projectId: project.id });

  return (
    <Card className="hover:shadow-lg transition-all group relative overflow-hidden">
      {/* Color Accent */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: project.color || "#3b82f6" }}
      />

      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl mb-1">{project.name}</CardTitle>
            <Badge variant="secondary" className="text-xs">
              {project.persona}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
        {project.description && (
          <CardDescription className="line-clamp-2 mt-2">
            {project.description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-secondary/50">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <span className="text-lg font-bold">{stats.referencesCount}</span>
              <span className="text-xs text-muted-foreground">Refs</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-secondary/50">
              <Lightbulb className="w-4 h-4 text-muted-foreground" />
              <span className="text-lg font-bold">{stats.ideasCount}</span>
              <span className="text-xs text-muted-foreground">Ideias</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-secondary/50">
              <FileCode className="w-4 h-4 text-muted-foreground" />
              <span className="text-lg font-bold">{stats.scriptsCount}</span>
              <span className="text-xs text-muted-foreground">Roteiros</span>
            </div>
          </div>
        )}

        <Button
          onClick={onSelect}
          className="w-full"
          variant="outline"
        >
          Selecionar Projeto
        </Button>
      </CardContent>
    </Card>
  );
}
