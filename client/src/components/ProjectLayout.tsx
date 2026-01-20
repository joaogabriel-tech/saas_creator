import { Link, useLocation, useRoute } from "wouter";
import { 
  LayoutDashboard, 
  Video, 
  FileText, 
  Lightbulb,
  ArrowLeft,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { trpc } from "@/lib/trpc";

interface ProjectLayoutProps {
  children: React.ReactNode;
  projectId: string;
}

export default function ProjectLayout({ children, projectId }: ProjectLayoutProps) {
  const [location] = useLocation();
  const { data: project, isLoading } = trpc.projects.getById.useQuery({ id: parseInt(projectId) });

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: `/project/${projectId}/dashboard` },
    { icon: Video, label: "Referências", href: `/project/${projectId}/references` },
    { icon: Lightbulb, label: "Ideias", href: `/project/${projectId}/ideas` },
    { icon: FileText, label: "Roteiros", href: `/project/${projectId}/scripts` },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full py-8 px-6">
      {/* Back to Projects */}
      <Link href="/projects">
        <Button variant="ghost" className="w-full justify-start gap-3 mb-6 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" />
          Voltar para Projetos
        </Button>
      </Link>

      {/* Project Header */}
      {isLoading ? (
        <div className="mb-8 animate-pulse">
          <div className="h-6 bg-secondary rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-secondary rounded w-1/2"></div>
        </div>
      ) : project ? (
        <div className="mb-8 px-2">
          <div className="flex items-center gap-3 mb-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: project.color || '#3b82f6' }}
            ></div>
            <h2 className="font-display font-bold text-xl text-foreground truncate">
              {project.name}
            </h2>
          </div>
          <p className="text-sm text-muted-foreground truncate">{project.persona}</p>
        </div>
      ) : null}

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer group",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-primary-foreground" : "group-hover:scale-110 transition-transform")} />
                <span className="font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-80 border-r border-border/40 bg-card/50 backdrop-blur-xl fixed h-full z-50">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-b border-border/40 z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {project && (
            <>
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: project.color || '#3b82f6' }}
              ></div>
              <span className="font-display font-bold text-lg truncate max-w-[200px]">{project.name}</span>
            </>
          )}
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-80 border-r border-border/40">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:ml-80 min-h-screen p-6 lg:p-12 pt-24 lg:pt-12 transition-all duration-500">
        <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          {children}
        </div>
      </main>
    </div>
  );
}
