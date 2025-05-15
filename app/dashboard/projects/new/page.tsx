"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ProjectForm } from "@/components/projects/project-form"
import { ProjectsProvider } from "@/contexts/projects-context"

export default function NewProjectPage() {
  return (
    <ProjectsProvider>
      <DashboardShell>
        <DashboardHeader heading="Create New Project" text="Fill in the details below to create a new project." />
        <ProjectForm />
      </DashboardShell>
    </ProjectsProvider>
  )
}
