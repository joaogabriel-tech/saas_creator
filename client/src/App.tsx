import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ProjectProvider } from "./contexts/ProjectContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import References from "./pages/References";
import Scripts from "@/pages/Scripts";
import Ideas from "@/pages/Ideas";
import Pricing from "./pages/Pricing";
import Projects from "./pages/Projects";
import ProjectDashboard from "./pages/ProjectDashboard";
import ProjectReferences from "./pages/ProjectReferences";
import ReferenceDetail from "./pages/ReferenceDetail";
import ProjectScripts from "./pages/ProjectScripts";
import ScriptDetail from "./pages/ScriptDetail";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      {/* Project Routes (without Layout) */}
      <Route path="/project/:id/dashboard" component={ProjectDashboard} />
      <Route path="/project/:id/references" component={ProjectReferences} />
      <Route path="/project/:id/reference/:refId" component={ReferenceDetail} />
      <Route path="/project/:id/ideas" component={() => <div className="p-8 text-center">Ideias do Projeto (Em Breve)</div>} />
      <Route path="/project/:id/scripts" component={ProjectScripts} />
      <Route path="/project/:id/script/:scriptId" component={ScriptDetail} />
      
      {/* Main Routes (with Layout) */}
      <Layout>
        <Route path="/" component={Dashboard} />
        <Route path="/references" component={References} />
        <Route path="/scripts" component={Scripts} />
        <Route path="/ideas" component={Ideas} />
        <Route path="/projects" component={Projects} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/settings" component={() => <div className="p-8 text-center text-muted-foreground font-mono">Configurações (Em Breve)</div>} />
        <Route component={NotFound} />
      </Layout>
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
