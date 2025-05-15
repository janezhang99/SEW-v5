"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ProjectList } from "@/components/projects/project-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { ProjectsProvider } from "@/contexts/projects-context"

export default function ProjectsPage() {
  return (
    <ProjectsProvider>
      <DashboardShell>
        <DashboardHeader heading="Projects" text="Manage your projects, tasks, and collaborators">
          <Button asChild>
            <Link href="/dashboard/projects/new">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Link>
          </Button>
        </DashboardHeader>
        <ProjectList />
      </DashboardShell>
    </ProjectsProvider>
  )
}
