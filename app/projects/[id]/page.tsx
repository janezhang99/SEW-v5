"use client"

import { useState, useCallback } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectHeader } from "@/components/projects/project-header"
import { ProjectTimeline } from "@/components/projects/project-timeline"
import { ProjectTeam } from "@/components/projects/project-team"
import { ProjectResources } from "@/components/projects/project-resources"
import { ProjectMetrics } from "@/components/projects/project-metrics"
import { ProjectStakeholders } from "@/components/projects/project-stakeholders"
import { ProjectImpacts } from "@/components/projects/project-impacts"
import { ProjectRisks } from "@/components/projects/project-risks"
import { ProjectFunding } from "@/components/projects/project-funding"
import { ProjectDocuments } from "@/components/projects/project-documents"
import { ProjectActivity } from "@/components/projects/project-activity"
import { ProjectComments } from "@/components/projects/project-comments"
import { ProjectActions } from "@/components/projects/project-actions"
import { ProjectSidebar } from "@/components/projects/project-sidebar"
import { ProjectMap } from "@/components/projects/project-map"
import { ProjectGallery } from "@/components/projects/project-gallery"
import { ProjectDiscussions } from "@/components/projects/project-discussions"
import { ProjectUpdates } from "@/components/projects/project-updates"
import { ProjectPublicView } from "@/components/projects/project-public-view"
import { ProjectViewToggle } from "@/components/projects/project-view-toggle"
import { AICompanionEmbedded } from "@/components/ai-companion/ai-companion-embedded"

// Define project data outside the component to prevent recreation on each render
const projectData = {
  name: "Urban Heat Island Mitigation Project",
  description:
    "A community-led initiative to reduce the impact of urban heat islands in vulnerable neighborhoods through green infrastructure, tree planting, and community cooling centers.",
  goal: "Reduce average summer temperatures by 5°F in target areas by 2025.",
  timeline: "36 months (January 2023 - December 2025)",
  stage: "implementation",
}

export default function ProjectDetailPage() {
  const { id } = useParams()
  const [view, setView] = useState<"public" | "private">("public")

  // Create a stable project object that doesn't change on re-renders
  const project = {
    id: id,
    ...projectData,
  }

  // Memoize the view change handler to prevent recreation on each render
  const handleViewChange = useCallback((newView: "public" | "private") => {
    setView(newView)
  }, [])

  // Render the public view if selected
  if (view === "public") {
    return (
      <>
        <div className="container mx-auto pt-6">
          <ProjectViewToggle view={view} onChange={handleViewChange} />
        </div>
        <ProjectPublicView project={project} />
      </>
    )
  }

  // Otherwise render the private/team view
  return (
    <div className="container mx-auto py-6">
      <ProjectViewToggle view={view} onChange={handleViewChange} />
      <ProjectHeader project={project} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <Tabs defaultValue="updates" className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-6">
              <TabsTrigger value="updates">Updates</TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
            </TabsList>
            <TabsContent value="updates" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Project Updates</CardTitle>
                  <CardDescription>Latest news and announcements about the project</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProjectUpdates projectId={id as string} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="overview" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Project Summary</CardTitle>
                  <CardDescription>High-level overview of the project</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{project.description}</p>
                  <ProjectMetrics />
                  <ProjectStakeholders />
                  <ProjectImpacts />
                  <ProjectRisks />
                  <ProjectFunding />
                  <ProjectDocuments />
                  <ProjectActivity />
                  <ProjectComments />
                  <ProjectActions />
                  <ProjectMap />
                  <ProjectGallery />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="timeline" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Project Timeline</CardTitle>
                  <CardDescription>Key milestones and project progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProjectTimeline />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="team" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Project Team</CardTitle>
                  <CardDescription>Key personnel involved in the project</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProjectTeam />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="resources" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Project Resources</CardTitle>
                  <CardDescription>Documents, links, and other resources</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProjectResources />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="discussions" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Project Discussions</CardTitle>
                  <CardDescription>Team conversations and topic discussions</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProjectDiscussions />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div className="md:col-span-1">
          <ProjectSidebar />
          <AICompanionEmbedded
            title="Project Assistant"
            description="Get AI-powered assistance for this project"
            flowId="project-insights"
          />
        </div>
      </div>
    </div>
  )
}
