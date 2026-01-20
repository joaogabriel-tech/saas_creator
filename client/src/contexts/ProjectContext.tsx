import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { trpc } from "@/lib/trpc";

export type Project = {
  id: number;
  userId: number;
  name: string;
  persona: string;
  description: string | null;
  avatar: string | null;
  color: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type ProjectContextType = {
  activeProject: Project | null;
  setActiveProject: (project: Project | null) => void;
  projects: Project[];
  isLoading: boolean;
  refetchProjects: () => void;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [activeProject, setActiveProjectState] = useState<Project | null>(null);
  
  // Fetch all projects
  const { data: projects = [], isLoading, refetch } = trpc.projects.list.useQuery();

  // Load active project from localStorage on mount
  useEffect(() => {
    const savedProjectId = localStorage.getItem("activeProjectId");
    if (savedProjectId && projects.length > 0) {
      const project = projects.find(p => p.id === parseInt(savedProjectId));
      if (project) {
        setActiveProjectState(project);
      } else {
        // If saved project not found, select first project
        setActiveProjectState(projects[0]);
        localStorage.setItem("activeProjectId", projects[0].id.toString());
      }
    } else if (projects.length > 0 && !activeProject) {
      // No saved project, select first one
      setActiveProjectState(projects[0]);
      localStorage.setItem("activeProjectId", projects[0].id.toString());
    }
  }, [projects]);

  // Save active project to localStorage when it changes
  const setActiveProject = (project: Project | null) => {
    setActiveProjectState(project);
    if (project) {
      localStorage.setItem("activeProjectId", project.id.toString());
    } else {
      localStorage.removeItem("activeProjectId");
    }
  };

  const refetchProjects = () => {
    refetch();
  };

  return (
    <ProjectContext.Provider
      value={{
        activeProject,
        setActiveProject,
        projects,
        isLoading,
        refetchProjects,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
}
