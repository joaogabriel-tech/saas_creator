import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Video, 
  FileText, 
  Settings, 
  LogOut, 
  Plus,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Video, label: "Referências", href: "/references" },
    { icon: FileText, label: "Roteiros", href: "/scripts" },
    { icon: Settings, label: "Configurações", href: "/settings" },
  ];

  return (
    <div className="min-h-screen flex bg-background font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-sidebar fixed h-full z-10 hidden md:flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl tracking-tighter">CREATOR.AI</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors border border-transparent hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                location === item.href 
                  ? "bg-sidebar-accent text-sidebar-accent-foreground border-border shadow-sm" 
                  : "text-muted-foreground"
              )}>
                <item.icon className="w-4 h-4" />
                {item.label}
              </a>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="bg-sidebar-accent/50 p-4 border border-border mb-4">
            <h4 className="font-display font-bold text-sm mb-1">Plano Pro</h4>
            <p className="text-xs text-muted-foreground mb-3">50/100 créditos usados</p>
            <div className="h-1 w-full bg-background border border-border">
              <div className="h-full w-1/2 bg-primary"></div>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground">
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 min-h-screen flex flex-col">
        <header className="h-16 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-20 px-6 flex items-center justify-between">
          <h1 className="font-display font-bold text-lg md:hidden">CREATOR.AI</h1>
          <div className="flex items-center gap-4 ml-auto">
            <Button size="sm" className="hidden md:flex gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-none border-2 border-transparent hover:border-primary-foreground/20">
              <Plus className="w-4 h-4" />
              Novo Projeto
            </Button>
            <div className="w-8 h-8 bg-secondary border border-border flex items-center justify-center font-mono text-xs">
              JD
            </div>
          </div>
        </header>
        <div className="p-6 md:p-8 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}
