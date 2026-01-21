import { useRoute, useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Download, Play } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Streamdown } from "streamdown";
import ProjectLayout from "@/components/ProjectLayout";

export default function ScriptDetail() {
  const [, params] = useRoute("/project/:id/script/:scriptId");
  const [, navigate] = useLocation();
  const projectId = params?.id;
  const scriptId = params?.scriptId;

  if (!projectId || !scriptId) {
    return <div>Roteiro não encontrado</div>;
  }

  const { data: script, isLoading, error } = trpc.scripts.getById.useQuery({
    id: parseInt(scriptId),
  });

  if (isLoading) {
    return (
      <ProjectLayout projectId={projectId}>
        <div className="space-y-4">
          <div className="h-8 w-48 bg-muted animate-pulse rounded" />
          <div className="h-64 bg-muted animate-pulse rounded" />
        </div>
      </ProjectLayout>
    );
  }

  if (error || !script) {
    return (
      <ProjectLayout projectId={projectId}>
        <div className="text-center py-16">
          <h3 className="text-lg font-semibold mb-2">Roteiro não encontrado</h3>
          <p className="text-muted-foreground mb-4">
            {error?.message || "Este roteiro não existe ou você não tem permissão para acessá-lo."}
          </p>
          <Button onClick={() => navigate(`/project/${projectId}/scripts`)}>
            Voltar para Roteiros
          </Button>
        </div>
      </ProjectLayout>
    );
  }

  const handleDownload = () => {
    const blob = new Blob([script.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${script.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <ProjectLayout projectId={projectId}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/project/${projectId}/scripts`)}
              className="mb-2 -ml-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para Roteiros
            </Button>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-foreground">
              {script.title}
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled
            >
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Button>
            <Button
              size="sm"
              disabled
            >
              <Play className="w-4 h-4 mr-2" />
              Teleprompter
            </Button>
          </div>
        </div>

        {/* Metadata Card */}
        <Card className="soft-card border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Criado em: </span>
                <span className="font-medium">
                  {new Date(script.createdAt).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              {script.tone && (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Tom: </span>
                  <Badge variant="secondary">{script.tone}</Badge>
                </div>
              )}
              {script.format && (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Formato: </span>
                  <Badge variant="outline">
                    {script.format === "short" ? "Curto (30-60s)" : script.format === "medium" ? "Médio (3-5 min)" : "Longo (10-15 min)"}
                  </Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Script Content */}
        <Card className="soft-card border-0 bg-white">
          <CardContent className="p-6 sm:p-8">
            <div className="prose prose-slate max-w-none">
              <Streamdown>{script.content}</Streamdown>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProjectLayout>
  );
}
