import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  Plus,
  Menu,
  CreditCard,
  Folder,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NewProjectDialog } from "@/components/NewProjectDialog";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { UserAvatar } from "./UserAvatar";
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

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const { data: recentProjects, isLoading: loadingProjects } = trpc.projects.getRecent.useQuery();
  const { user } = useAuth();
  const { data: userPlan, isLoading: loadingPlan } = trpc.users.getCurrentPlan.useQuery();
  const { data: creditBalance, isLoading: loadingCredits } = trpc.credits.getBalance.useQuery();
  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      setLocation("/login");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
    setIsLogoutDialogOpen(false);
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Folder, label: "Projetos", href: "/projects" },
    { icon: CreditCard, label: "Planos", href: "/pricing" },
    { icon: Settings, label: "Configurações", href: "/settings" },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full py-8 px-6">
      <div className="flex items-center gap-3 mb-12 px-2">
        <span className="font-display font-bold text-2xl tracking-tight text-foreground">KRIO</span>
      </div>

      <div className="space-y-8 flex-1">
        <Button 
          onClick={() => setIsNewProjectDialogOpen(true)}
          className="w-full justify-start gap-3 rounded-xl h-12 font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          Novo Projeto
        </Button>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <div key={item.href}>
                <Link href={item.href}>
                  <div
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer group",
                      isActive 
                        ? "bg-primary/10 text-primary font-semibold" 
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5 transition-colors", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                    <span>{item.label}</span>
                  </div>
                </Link>
                
                {/* Recent Projects List (shown below "Projetos" item) */}
                {item.href === "/projects" && recentProjects && recentProjects.length > 0 && (
                  <div className="mt-2 ml-4 space-y-1">
                    {recentProjects.map((project) => {
                      const projectPath = `/project/${project.id}/dashboard`;
                      const isProjectActive = location.startsWith(`/project/${project.id}`);
                      return (
                        <Link key={project.id} href={projectPath}>
                          <div
                            className={cn(
                              "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer group text-sm",
                              isProjectActive
                                ? "bg-primary/5 text-primary font-medium"
                                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                            )}
                          >
                            <div 
                              className={cn(
                                "w-2 h-2 rounded-full flex-shrink-0",
                                isProjectActive ? "bg-primary" : "bg-muted-foreground/30"
                              )}
                            />
                            <span className="flex-1 truncate">{project.name}</span>
                            <ChevronRight className={cn(
                              "w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0",
                              isProjectActive && "opacity-100"
                            )} />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
                
                {/* Loading skeleton for projects */}
                {item.href === "/projects" && loadingProjects && (
                  <div className="mt-2 ml-4 space-y-1">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-2">
                        <div className="w-2 h-2 rounded-full bg-muted-foreground/20 animate-pulse" />
                        <div className="h-3 bg-muted-foreground/10 rounded flex-1 animate-pulse" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto pt-8 border-t border-border/50">
        <div className="bg-secondary/50 rounded-2xl p-5 mb-6 border border-border/50">
          {loadingPlan || loadingCredits ? (
            <div className="space-y-3 animate-pulse">
              <div className="h-4 bg-muted rounded w-2/3" />
              <div className="h-2 bg-muted rounded" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  Plano {userPlan?.planName || "Free"}
                </span>
                <span className={cn(
                  "text-[10px] px-2 py-0.5 rounded-full border font-medium",
                  userPlan?.status === "active" 
                    ? "bg-green-50 text-green-700 border-green-200" 
                    : "bg-red-50 text-red-700 border-red-200"
                )}>
                  {userPlan?.status === "active" ? "Ativo" : "Expirado"}
                </span>
              </div>
              <div className="w-full bg-white h-2 rounded-full overflow-hidden mb-2 border border-border/50">
                <div 
                  className="bg-primary h-full rounded-full transition-all duration-500" 
                  style={{ 
                    width: `${Math.min(100, ((creditBalance?.totalUsed || 0) / (userPlan?.monthlyCredits || 1000)) * 100)}%` 
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {creditBalance?.totalUsed || 0}/{userPlan?.monthlyCredits || 1000} créditos usados
              </p>
            </>
          )}
        </div>

        <button 
          onClick={() => setIsLogoutDialogOpen(true)}
          disabled={logoutMutation.isPending}
          className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-destructive transition-colors w-full rounded-xl hover:bg-destructive/5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">
            {logoutMutation.isPending ? "Saindo..." : "Sair"}
          </span>
        </button>
      </div>
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
          <span className="font-display font-bold text-xl">KRIO</span>
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
          <header className="flex justify-end items-center mb-12 gap-4">
            <div className="flex items-center gap-3 pl-4 border-l border-border/50">
              {loadingPlan ? (
                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block space-y-1">
                    <div className="h-4 bg-muted rounded w-24 animate-pulse" />
                    <div className="h-3 bg-muted rounded w-16 animate-pulse" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
                </div>
              ) : (
                <>
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-foreground">{user?.name || "Usuário"}</p>
                    <p className="text-xs text-muted-foreground">{userPlan?.planName || "Free"} Plan</p>
                  </div>
                  <UserAvatar name={user?.name || undefined} size="md" />
                </>
              )}
            </div>
          </header>
          {children}
        </div>
      </main>
      
      {/* New Project Dialog */}
      <NewProjectDialog 
        open={isNewProjectDialogOpen} 
        onOpenChange={setIsNewProjectDialogOpen} 
      />

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja sair? Você precisará fazer login novamente para acessar sua conta.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              className="bg-destructive hover:bg-destructive/90"
            >
              {logoutMutation.isPending ? "Saindo..." : "Sair"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
