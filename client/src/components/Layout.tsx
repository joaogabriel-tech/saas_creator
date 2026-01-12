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
  CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Video, label: "Referências", href: "/references" },
    { icon: FileText, label: "Roteiros", href: "/scripts" },
    { icon: CreditCard, label: "Planos", href: "/pricing" },
    { icon: Settings, label: "Configurações", href: "/settings" },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.5)]">
          <Sparkles className="w-5 h-5 text-black" />
        </div>
        <span className="font-display font-bold text-2xl tracking-widest text-gradient-gold">AURA</span>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <a className={cn(
              "flex items-center gap-4 px-6 py-4 text-sm font-medium transition-all duration-300 rounded-xl group",
              location === item.href 
                ? "bg-white/10 text-primary shadow-[0_0_20px_rgba(0,0,0,0.3)] border border-white/5" 
                : "text-muted-foreground hover:text-foreground hover:bg-white/5"
            )}>
              <item.icon className={cn("w-5 h-5 transition-colors", location === item.href ? "text-primary" : "group-hover:text-primary")} />
              {item.label}
            </a>
          </Link>
        ))}
      </nav>

      <div className="p-6 mt-auto">
        <div className="glass-panel p-5 rounded-2xl mb-6 border border-white/5 bg-black/20">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-display font-bold text-sm text-primary">AURA PRO</h4>
            <span className="text-[10px] font-mono bg-primary/20 text-primary px-2 py-0.5 rounded-full">ACTIVE</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3 font-sans">50/100 créditos usados</p>
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-gradient-to-r from-primary to-accent shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
          </div>
        </div>
        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl h-12">
          <LogOut className="w-5 h-5" />
          Sair
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-background font-sans text-foreground selection:bg-primary/30">
      {/* Desktop Sidebar */}
      <aside className="w-80 fixed h-full z-20 hidden lg:block">
        <div className="h-full m-4 ml-6 glass-panel rounded-3xl overflow-hidden">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 h-16 glass-panel border-b border-white/10 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="font-display font-bold text-xl text-gradient-gold">AURA</span>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0 bg-background/95 backdrop-blur-xl border-r border-white/10">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:ml-80 min-h-screen flex flex-col relative">
        {/* Top Bar */}
        <header className="h-24 flex items-center justify-end px-8 lg:px-12 gap-6 pt-4">
          <Button className="hidden md:flex gap-2 bg-primary text-black hover:bg-primary/90 rounded-full px-6 font-bold shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all hover:scale-105">
            <Plus className="w-4 h-4" />
            Novo Projeto
          </Button>
          <div className="flex items-center gap-3 pl-6 border-l border-white/10">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-foreground">João Silva</p>
              <p className="text-xs text-muted-foreground">Creator Plan</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-800 to-gray-600 border border-white/20 flex items-center justify-center font-display text-sm shadow-lg">
              JS
            </div>
          </div>
        </header>

        <div className="flex-1 px-6 lg:px-12 pb-12 max-w-[1600px] mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
          {children}
        </div>
      </main>
    </div>
  );
}
