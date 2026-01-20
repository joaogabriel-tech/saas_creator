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
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/references" component={References} />
        <Route path="/scripts" component={Scripts} />
        <Route path="/ideas" component={Ideas} />
        <Route path="/projects" component={Projects} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/settings" component={() => <div className="p-8 text-center text-muted-foreground font-mono">Configurações (Em Breve)</div>} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
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
