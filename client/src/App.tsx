import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ProjectProvider } from "./contexts/ProjectContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";

import Pricing from "./pages/Pricing";
import Projects from "./pages/Projects";
import ProjectDashboard from "./pages/ProjectDashboard";
import ProjectReferences from "./pages/ProjectReferences";
import ReferenceDetail from "./pages/ReferenceDetail";
import ProjectScripts from "./pages/ProjectScripts";
import ScriptDetail from "./pages/ScriptDetail";
import Login from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/login" component={Login} />
      
      {/* Protected Project Routes (without Layout) */}
      <Route path="/project/:id/dashboard">
        <ProtectedRoute>
          <ProjectDashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/project/:id/references">
        <ProtectedRoute>
          <ProjectReferences />
        </ProtectedRoute>
      </Route>
      <Route path="/project/:id/reference/:refId">
        <ProtectedRoute>
          <ReferenceDetail />
        </ProtectedRoute>
      </Route>
      <Route path="/project/:id/ideas">
        <ProtectedRoute>
          <div className="p-8 text-center">Ideias do Projeto (Em Breve)</div>
        </ProtectedRoute>
      </Route>
      <Route path="/project/:id/scripts">
        <ProtectedRoute>
          <ProjectScripts />
        </ProtectedRoute>
      </Route>
      <Route path="/project/:id/script/:scriptId">
        <ProtectedRoute>
          <ScriptDetail />
        </ProtectedRoute>
      </Route>
      
      {/* Protected Main Routes (with Layout) */}
      <Route path="/">
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      </Route>
      <Route path="/projects">
        <ProtectedRoute>
          <Layout>
            <Projects />
          </Layout>
        </ProtectedRoute>
      </Route>
      <Route path="/pricing">
        <ProtectedRoute>
          <Layout>
            <Pricing />
          </Layout>
        </ProtectedRoute>
      </Route>
      <Route path="/settings">
        <ProtectedRoute>
          <Layout>
            <div className="p-8 text-center text-muted-foreground font-mono">Configurações (Em Breve)</div>
          </Layout>
        </ProtectedRoute>
      </Route>
      
      {/* 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <ProjectProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ProjectProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
