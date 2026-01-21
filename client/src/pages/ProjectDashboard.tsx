import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Lightbulb, FileText, Plus, TrendingUp, ArrowLeft } from "lucide-react";
import { Link, useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import ProjectLayout from "@/components/ProjectLayout";

export default function ProjectDashboard() {
  const [, params] = useRoute("/project/:id/dashboard");
  const projectId = params?.id;

  if (!projectId) {
    return <div>Projeto não encontrado</div>;
  }

  const { data: project } = trpc.projects.getById.useQuery({ id: parseInt(projectId) });
  const { data: stats } = trpc.projects.getStats.useQuery({ projectId: parseInt(projectId) });

  return (
    <ProjectLayout projectId={projectId}>
      <div className="space-y-8">
        {/* Back Button */}
        <Link href="/projects">
          <Button variant="ghost" className="-ml-2 hover:bg-secondary/50">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </Link>

        {/* Header */}
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-foreground mb-3">
              Dashboard do Projeto
            </h2>
            <p className="text-muted-foreground font-sans text-base sm:text-lg max-w-2xl leading-relaxed">
              Gerencie suas referências, ideias e roteiros para <span className="font-semibold text-foreground">{project?.persona}</span>.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href={`/project/${projectId}/references`} className="flex-1 sm:flex-initial">
              <Button variant="outline" className="w-full sm:w-auto rounded-xl px-6 h-12 border-border bg-white hover:bg-secondary text-foreground font-medium shadow-sm hover:shadow-md transition-all">
                <Video className="w-4 h-4 mr-2" />
                Adicionar Referência
              </Button>
            </Link>
            <Link href={`/project/${projectId}/scripts`} className="flex-1 sm:flex-initial">
              <Button className="w-full sm:w-auto rounded-xl bg-primary text-white hover:bg-primary/90 h-12 px-8 font-bold shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-primary/40">
                <Plus className="w-4 h-4 mr-2" />
                Gerar Roteiro
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Link href={`/project/${projectId}/references`} className="block">
            <Card className="soft-card border-0 bg-white relative overflow-hidden group cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold text-muted-foreground font-sans uppercase tracking-wider">
                  Referências
                </CardTitle>
                <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                  <Video className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-display font-bold mt-2 text-foreground">
                  {stats?.referencesCount || 0}
                </div>
                <p className="text-sm mt-2 text-muted-foreground font-medium">
                  {stats?.referencesCount === 0 ? "Nenhuma referência ainda" : `${stats?.referencesCount} ${stats?.referencesCount === 1 ? 'referência' : 'referências'}`}
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href={`/project/${projectId}/ideas`} className="block">
            <Card className="soft-card border-0 bg-white relative overflow-hidden group cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold text-muted-foreground font-sans uppercase tracking-wider">
                  Ideias
                </CardTitle>
                <div className="p-2 rounded-lg bg-amber-100 text-amber-600">
                  <Lightbulb className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-display font-bold mt-2 text-foreground">
                  {stats?.ideasCount || 0}
                </div>
                <p className="text-sm mt-2 text-muted-foreground font-medium">
                  {stats?.ideasCount === 0 ? "Nenhuma ideia ainda" : `${stats?.ideasCount} ${stats?.ideasCount === 1 ? 'ideia' : 'ideias'}`}
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href={`/project/${projectId}/scripts`} className="block">
            <Card className="soft-card border-0 bg-white relative overflow-hidden group cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold text-muted-foreground font-sans uppercase tracking-wider">
                  Roteiros
                </CardTitle>
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600">
                  <FileText className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-display font-bold mt-2 text-foreground">
                  {stats?.scriptsCount || 0}
                </div>
                <p className="text-sm mt-2 text-muted-foreground font-medium">
                  {stats?.scriptsCount === 0 ? "Nenhum roteiro ainda" : `${stats?.scriptsCount} ${stats?.scriptsCount === 1 ? 'roteiro' : 'roteiros'}`}
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Activity Section */}
        <Card className="soft-card border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-display font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Atividade Recente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-sm">Nenhuma atividade recente</p>
              <p className="text-xs mt-2">Comece adicionando referências ou gerando roteiros</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProjectLayout>
  );
}
