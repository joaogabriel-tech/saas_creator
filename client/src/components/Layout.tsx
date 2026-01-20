import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Video, 
  FileText, 
  Settings, 
  LogOut, 
  Plus,
  Sparkles,
  Menu,
  CreditCard,
  Lightbulb
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NewProjectDialog } from "@/components/NewProjectDialog";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Video, label: "Referências", href: "/references" },
    { icon: Lightbulb, label: "Ideias", href: "/ideas" },
    { icon: FileText, label: "Roteiros", href: "/scripts" },
    { icon: CreditCard, label: "Planos", href: "/pricing" },
    { icon: Settings, label: "Configurações", href: "/settings" },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full py-8 px-6">
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="w-10 h-10 relative flex items-center justify-center">
          <img src="/images/kryo-luxury-logo.png" alt="KRYO Logo" className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]" />
        </div>
        <span className="font-display font-bold text-2xl tracking-tight text-foreground">KRYO</span>
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
              <Link key={item.href} href={item.href}>
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
            );
          })}
        </nav>
      </div>

      <div className="mt-auto pt-8 border-t border-border/50">
        <div className="bg-secondary/50 rounded-2xl p-5 mb-6 border border-border/50">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">Plano Pro</span>
            <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-border font-medium text-muted-foreground">Ativo</span>
          </div>
          <div className="w-full bg-white h-2 rounded-full overflow-hidden mb-2 border border-border/50">
            <div className="bg-primary h-full w-1/2 rounded-full" />
          </div>
          <p className="text-xs text-muted-foreground">50/100 créditos usados</p>
        </div>

        <button className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-destructive transition-colors w-full rounded-xl hover:bg-destructive/5">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sair</span>
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
          <div className="w-8 h-8 relative flex items-center justify-center">
            <img src="/images/kryo-luxury-logo.png" alt="KRYO Logo" className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]" />
          </div>
          <span className="font-display font-bold text-xl">KRYO</span>
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
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-foreground">João Gabriel</p>
                <p className="text-xs text-muted-foreground">Creator Plan</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center text-foreground font-bold shadow-sm">
                JG
              </div>
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
    </div>
  );
}
