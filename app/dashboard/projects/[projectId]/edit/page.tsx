"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ProjectForm } from "@/components/projects/project-form"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { ProjectsProvider } from "@/contexts/projects-context"

interface EditProjectPageProps {
  params: {
    projectId: string
  }
}

export default function EditProjectPage({ params }: EditProjectPageProps) {
  return (
    <ProjectsProvider>
      <DashboardShell>
        <DashboardHeader heading="Edit Project">
          <Button asChild variant="outline" size="sm">
            <Link href={`/dashboard/projects/${params.projectId}`}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Project
            </Link>
          </Button>
        </DashboardHeader>
        <ProjectForm projectId={params.projectId} />
      </DashboardShell>
    </ProjectsProvider>
  )
}
