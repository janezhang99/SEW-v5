"use client"

import { useProjects, type Project, type ProjectStatus, type ProjectPriority } from "@/contexts/projects-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, DollarSign, Edit, Users } from "lucide-react"
import { TaskList } from "./task-list"
import { ProjectTimeline } from "./project-timeline"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

const statusColors: Record<ProjectStatus, string> = {
  planning: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  "in-progress": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "on-hold": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  completed: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
}

const priorityColors: Record<ProjectPriority, string> = {
  low: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  medium: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  high: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  urgent: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
}

interface ProjectDetailProps {
  projectId: string
}

export function ProjectDetail({ projectId }: ProjectDetailProps) {
  const { getProject } = useProjects()
  const project = getProject(projectId)

  if (!project) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <h3 className="text-lg font-medium">Project not found</h3>
          <p className="text-sm text-muted-foreground">The project you're looking for doesn't exist.</p>
          <Button asChild className="mt-4">
            <Link href="/dashboard/projects">Back to Projects</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  const calculateProgress = (project: Project) => {
    if (project.tasks.length === 0) return 0
    const completedTasks = project.tasks.filter((task) => task.status === "completed").length
    return Math.round((completedTasks / project.tasks.length) * 100)
  }

  const progress = calculateProgress(project)

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">{project.title}</h2>
            <Badge className={statusColors[project.status]}>{project.status}</Badge>
            <Badge className={priorityColors[project.priority]}>{project.priority}</Badge>
          </div>
          <p className="text-muted-foreground">{project.description}</p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href={`/dashboard/projects/${projectId}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Project
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Project Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <span className="font-medium">Start:</span> {new Date(project.startDate).toLocaleDateString()}
              </div>
            </div>
            {project.endDate && (
              <div className="flex items-center mt-1">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <div className="text-sm">
                  <span className="font-medium">End:</span> {new Date(project.endDate).toLocaleDateString()}
                </div>
              </div>
            )}
            <div className="flex items-center mt-1">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <span className="font-medium">Last updated:</span>{" "}
                {formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true })}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Task Completion</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <div>
                  <span className="font-medium">{project.tasks.filter((t) => t.status === "completed").length}</span>{" "}
                  completed
                </div>
                <div>
                  <span className="font-medium">{project.tasks.filter((t) => t.status !== "completed").length}</span>{" "}
                  remaining
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Team & Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <span className="font-medium">Team:</span> {project.collaborators.length} members
              </div>
            </div>
            {project.budget && (
              <div className="flex items-center mt-1">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                <div className="text-sm">
                  <span className="font-medium">Budget:</span> ${project.budget.toLocaleString()}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tasks">
        <TabsList>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>
        <TabsContent value="tasks" className="mt-4">
          <TaskList projectId={projectId} />
        </TabsContent>
        <TabsContent value="timeline" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Timeline</CardTitle>
              <CardDescription>View the timeline of tasks and milestones for this project.</CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectTimeline projectId={projectId} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="team" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage the team members working on this project.</CardDescription>
            </CardHeader>
            <CardContent>
              {project.collaborators.length > 0 ? (
                <div className="space-y-4">
                  {project.collaborators.map((collaborator) => (
                    <div key={collaborator.id} className="flex items-center justify-between rounded-md border p-3">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                          {collaborator.avatar ? (
                            <img
                              src={collaborator.avatar || "/placeholder.svg"}
                              alt={collaborator.name}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-lg font-medium">{collaborator.name.charAt(0).toUpperCase()}</span>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{collaborator.name}</p>
                          <p className="text-sm text-muted-foreground">{collaborator.role}</p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{collaborator.email}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No team members added to this project yet.</p>
                  <Button className="mt-2">Add Team Member</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
