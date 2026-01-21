import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
import { useAuth } from "@/_core/hooks/useAuth";
import { UserAvatar } from "@/components/UserAvatar";
import { LogOut, User, Bell, Info } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";

export default function Settings() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      setLocation("/login");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-foreground mb-2">
          Configurações
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg">
          Gerencie suas preferências e informações da conta
        </p>
      </div>

      {/* Account Section */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Informações da Conta</CardTitle>
              <CardDescription>Seus dados pessoais e de acesso</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* User Info */}
          <div className="flex items-center gap-4">
            <UserAvatar name={user?.name || undefined} avatarUrl={undefined} size="lg" />
            <div className="flex-1">
              <p className="font-semibold text-lg text-foreground">{user?.name || "Usuário"}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          <Separator />

          {/* Account Details */}
          <div className="grid gap-4">
            <div className="grid grid-cols-[140px_1fr] gap-2 items-center">
              <span className="text-sm font-medium text-muted-foreground">Nome:</span>
              <span className="text-sm text-foreground">{user?.name || "—"}</span>
            </div>
            <div className="grid grid-cols-[140px_1fr] gap-2 items-center">
              <span className="text-sm font-medium text-muted-foreground">Email:</span>
              <span className="text-sm text-foreground">{user?.email || "—"}</span>
            </div>
            <div className="grid grid-cols-[140px_1fr] gap-2 items-center">
              <span className="text-sm font-medium text-muted-foreground">Membro desde:</span>
              <span className="text-sm text-foreground">
                {user?.createdAt ? formatDate(user.createdAt) : "—"}
              </span>
            </div>
            <div className="grid grid-cols-[140px_1fr] gap-2 items-center">
              <span className="text-sm font-medium text-muted-foreground">Último acesso:</span>
              <span className="text-sm text-foreground">
                {user?.lastSignedIn ? formatDate(user.lastSignedIn) : "—"}
              </span>
            </div>
          </div>

          <Separator />

          {/* Logout Button */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-sm font-medium text-foreground">Sair da conta</p>
              <p className="text-xs text-muted-foreground">
                Você será redirecionado para a página de login
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowLogoutDialog(true)}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preferences Section */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <CardTitle className="text-xl">Preferências</CardTitle>
              <CardDescription>Personalize sua experiência</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center">
            <p className="text-sm text-muted-foreground">
              Configurações de preferências estarão disponíveis em breve
            </p>
          </div>
        </CardContent>
      </Card>

      {/* About Section */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <Info className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <CardTitle className="text-xl">Sobre</CardTitle>
              <CardDescription>Informações do sistema</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            <div className="grid grid-cols-[140px_1fr] gap-2 items-center">
              <span className="text-sm font-medium text-muted-foreground">Versão:</span>
              <span className="text-sm text-foreground">1.0.0</span>
            </div>
            <div className="grid grid-cols-[140px_1fr] gap-2 items-center">
              <span className="text-sm font-medium text-muted-foreground">Plataforma:</span>
              <span className="text-sm text-foreground">KRYO</span>
            </div>
          </div>
          <Separator />
          <div className="flex gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Suporte
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja sair da sua conta? Você precisará fazer login novamente para
              acessar a plataforma.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={logoutMutation.isPending}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {logoutMutation.isPending ? "Saindo..." : "Sair"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
