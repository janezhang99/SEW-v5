"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ProjectDetail } from "@/components/projects/project-detail"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { ProjectsProvider } from "@/contexts/projects-context"

interface ProjectPageProps {
  params: {
    projectId: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    <ProjectsProvider>
      <DashboardShell>
        <DashboardHeader heading="">
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/projects">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </DashboardHeader>
        <ProjectDetail projectId={params.projectId} />
      </DashboardShell>
    </ProjectsProvider>
  )
}
