"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import {
  BookOpen,
  Briefcase,
  Calendar,
  ChevronRight,
  Clock,
  DollarSign,
  FileText,
  Users,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react"
import Link from "next/link"
import { ProjectsProvider, useProjects } from "@/contexts/projects-context"
import { ExpensesProvider, useExpenses } from "@/contexts/expenses-context"
import { useTasks } from "@/contexts/tasks-context"
import { IntegrationService } from "@/lib/integration-service"
import { formatCurrency } from "@/lib/format-currency"
import { format, isAfter, isBefore, addDays } from "date-fns"

function DashboardContent() {
  const { projects, loading } = useProjects()
  const { expenses } = useExpenses()
  const { tasks } = useTasks()
  const [deadlines, setDeadlines] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data from multiple sources
    const timer = setTimeout(() => {
      if (!loading) {
        // Now we pass projects to the service instead of letting it call useProjects()
        setDeadlines(IntegrationService.getUpcomingDeadlines(projects))
        setIsLoading(false)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [loading, projects])

  // Calculate overall progress across all projects
  const calculateOverallProgress = () => {
    if (projects.length === 0) return 0

    const totalTasks = projects.reduce((sum, project) => sum + project.tasks.length, 0)
    if (totalTasks === 0) return 0

    const completedTasks = projects.reduce(
      (sum, project) => sum + project.tasks.filter((task) => task.status === "completed").length,
      0,
    )

    return Math.round((completedTasks / totalTasks) * 100)
  }

  // Get active projects (not completed)
  const activeProjects = projects.filter((project) => project.status !== "completed")

  // Get urgent deadlines (due within 3 days)
  const urgentDeadlines = deadlines.filter(
    (deadline) =>
      isBefore(new Date(deadline.dueDate), addDays(new Date(), 3)) && isAfter(new Date(deadline.dueDate), new Date()),
  )

  return (
    <>
      <DashboardHeader heading="Dashboard" text="Welcome to Small Economy Works">
        <Button asChild>
          <Link href="/dashboard/projects/new">
            <Briefcase className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </DashboardHeader>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="mt-2 h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-sew-midnight-blue/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <Briefcase className="h-4 w-4 text-sew-midnight-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeProjects.length}</div>
              <p className="text-xs text-muted-foreground">
                {activeProjects.length === 0
                  ? "No active projects"
                  : `${projects.filter((p) => p.status === "in-progress").length} in progress`}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-sew-sunset-orange/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
              <Calendar className="h-4 w-4 text-sew-sunset-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{deadlines.length}</div>
              <p className="text-xs text-muted-foreground">
                {urgentDeadlines.length > 0 ? `${urgentDeadlines.length} urgent deadlines` : "No urgent deadlines"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-sew-moss-green/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              <FileText className="h-4 w-4 text-sew-moss-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{calculateOverallProgress()}%</div>
              <Progress value={calculateOverallProgress()} className="h-2 mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-sew-sky-blue/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Community</CardTitle>
              <Users className="h-4 w-4 text-sew-sky-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {projects.reduce((sum, project) => sum + project.collaborators.length, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Team members across all projects</p>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="overview" className="mt-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="deadlines">Deadlines</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Projects</CardTitle>
                <CardDescription>Your most recently updated projects</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[200px]" />
                          <Skeleton className="h-4 w-[160px]" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : projects.length > 0 ? (
                  <div className="space-y-4">
                    {projects
                      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                      .slice(0, 3)
                      .map((project) => (
                        <div key={project.id} className="flex items-start space-x-4">
                          <div
                            className={`mt-0.5 rounded-full p-2 
                            ${
                              project.status === "completed"
                                ? "bg-sew-moss-green/10 text-sew-moss-green"
                                : project.status === "in-progress"
                                  ? "bg-sew-sunset-orange/10 text-sew-sunset-orange"
                                  : "bg-sew-sky-blue/10 text-sew-sky-blue"
                            }`}
                          >
                            <Briefcase className="h-4 w-4" />
                          </div>
                          <div className="space-y-1">
                            <p className="font-medium leading-none">{project.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {project.tasks.length} tasks ·
                              {project.tasks.filter((t) => t.status === "completed").length} completed
                            </p>
                            <div className="flex items-center pt-1">
                              <Badge variant="outline" className="mr-2">
                                {project.status}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                Updated {format(new Date(project.updatedAt), "MMM d, yyyy")}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    <Button asChild variant="outline" className="w-full mt-2">
                      <Link href="/dashboard/projects">
                        View all projects
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Briefcase className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground mb-4">No projects found</p>
                    <Button asChild>
                      <Link href="/dashboard/projects/new">Create your first project</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
                <CardDescription>Tasks and milestones due soon</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[200px]" />
                          <Skeleton className="h-4 w-[160px]" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : deadlines.length > 0 ? (
                  <div className="space-y-4">
                    {deadlines.slice(0, 3).map((deadline) => {
                      const isUrgent = isBefore(new Date(deadline.dueDate), addDays(new Date(), 3))
                      const isPast = isBefore(new Date(deadline.dueDate), new Date())

                      return (
                        <div key={`${deadline.type}-${deadline.id}`} className="flex items-start space-x-4">
                          <div
                            className={`mt-0.5 rounded-full p-2 
                            ${
                              isPast
                                ? "bg-red-100 text-red-800"
                                : isUrgent
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-sew-sky-blue/10 text-sew-sky-blue"
                            }`}
                          >
                            {isPast ? (
                              <AlertTriangle className="h-4 w-4" />
                            ) : isUrgent ? (
                              <Clock className="h-4 w-4" />
                            ) : (
                              <Calendar className="h-4 w-4" />
                            )}
                          </div>
                          <div className="space-y-1">
                            <p className="font-medium leading-none">{deadline.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {deadline.projectTitle} · {deadline.type}
                            </p>
                            <div className="flex items-center pt-1">
                              <Badge
                                variant="outline"
                                className={`mr-2 ${
                                  isPast
                                    ? "bg-red-100 text-red-800 border-red-200"
                                    : isUrgent
                                      ? "bg-amber-100 text-amber-800 border-amber-200"
                                      : ""
                                }`}
                              >
                                {isPast ? "Overdue" : isUrgent ? "Urgent" : "Upcoming"}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                Due {format(new Date(deadline.dueDate), "MMM d, yyyy")}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    <Button asChild variant="outline" className="w-full mt-2">
                      <Link href="/dashboard/projects">
                        View all deadlines
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Calendar className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No upcoming deadlines</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Learning</CardTitle>
                <CardDescription>Your learning progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-4 text-center">
                  <div className="relative h-24 w-24">
                    <svg className="h-24 w-24" viewBox="0 0 100 100">
                      <circle
                        className="text-muted-foreground/20"
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className="text-sew-moss-green"
                        strokeWidth="8"
                        strokeDasharray={250}
                        strokeDashoffset={250 * (1 - 0.65)}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold">65%</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm font-medium">Learning Progress</p>
                  <p className="text-xs text-muted-foreground">13 of 20 modules completed</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/dashboard/learning">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Continue Learning
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Funding</CardTitle>
                <CardDescription>Your funding status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-4 text-center">
                  <div className="rounded-full bg-sew-midnight-blue/10 p-3">
                    <DollarSign className="h-8 w-8 text-sew-midnight-blue" />
                  </div>
                  <p className="mt-2 text-2xl font-bold">{formatCurrency(10000)}</p>
                  <p className="text-xs text-muted-foreground">Total funding received</p>
                  <div className="mt-4 w-full space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span>Budget utilized</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="h-1" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/dashboard/funding">
                    <DollarSign className="mr-2 h-4 w-4" />
                    View Funding
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Community</CardTitle>
                <CardDescription>Your network</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-4 text-center">
                  <div className="flex -space-x-2">
                    <div className="h-10 w-10 rounded-full bg-sew-sunset-orange/20 flex items-center justify-center text-sew-sunset-orange font-medium">
                      JD
                    </div>
                    <div className="h-10 w-10 rounded-full bg-sew-moss-green/20 flex items-center justify-center text-sew-moss-green font-medium">
                      AS
                    </div>
                    <div className="h-10 w-10 rounded-full bg-sew-sky-blue/20 flex items-center justify-center text-sew-sky-blue font-medium">
                      MT
                    </div>
                    <div className="h-10 w-10 rounded-full bg-sew-midnight-blue/20 flex items-center justify-center text-sew-midnight-blue font-medium">
                      +3
                    </div>
                  </div>
                  <p className="mt-4 text-sm font-medium">7 Active Connections</p>
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <Badge variant="outline" className="bg-sew-sky-blue/10 text-sew-sky-blue border-sew-sky-blue/20">
                      3 Mentors
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-sew-sunset-orange/10 text-sew-sunset-orange border-sew-sunset-orange/20"
                    >
                      4 Peers
                    </Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/dashboard/community">
                    <Users className="mr-2 h-4 w-4" />
                    View Community
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
              <CardDescription>Status of all your projects</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-5 w-[200px]" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-2 w-full" />
                    </div>
                  ))}
                </div>
              ) : projects.length > 0 ? (
                <div className="space-y-6">
                  {projects.map((project) => {
                    const progress =
                      project.tasks.length > 0
                        ? Math.round(
                            (project.tasks.filter((t) => t.status === "completed").length / project.tasks.length) * 100,
                          )
                        : 0

                    return (
                      <div key={project.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <h3 className="font-medium">{project.title}</h3>
                            <Badge className="ml-2" variant="outline">
                              {project.status}
                            </Badge>
                          </div>
                          <Button asChild variant="ghost" size="sm">
                            <Link href={`/dashboard/projects/${project.id}`}>
                              <span className="sr-only">View project</span>
                              <ArrowUpRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span>Progress</span>
                            <span>{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            <span>
                              {format(new Date(project.startDate), "MMM d, yyyy")}
                              {project.endDate ? ` - ${format(new Date(project.endDate), "MMM d, yyyy")}` : ""}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <FileText className="mr-1 h-3 w-3" />
                            <span>
                              {project.tasks.filter((t) => t.status === "completed").length}/{project.tasks.length}{" "}
                              tasks
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Users className="mr-1 h-3 w-3" />
                            <span>{project.collaborators.length} team members</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Briefcase className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground mb-4">No projects found</p>
                  <Button asChild>
                    <Link href="/dashboard/projects/new">Create your first project</Link>
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/dashboard/projects">View All Projects</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="deadlines" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CardDescription>Tasks and milestones due soon</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-[160px]" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : deadlines.length > 0 ? (
                <div className="space-y-4">
                  {deadlines.map((deadline) => {
                    const isUrgent = isBefore(new Date(deadline.dueDate), addDays(new Date(), 3))
                    const isPast = isBefore(new Date(deadline.dueDate), new Date())

                    return (
                      <div key={`${deadline.type}-${deadline.id}`} className="flex items-start space-x-4">
                        <div
                          className={`mt-0.5 rounded-full p-2 
                          ${
                            isPast
                              ? "bg-red-100 text-red-800"
                              : isUrgent
                                ? "bg-amber-100 text-amber-800"
                                : "bg-sew-sky-blue/10 text-sew-sky-blue"
                          }`}
                        >
                          {isPast ? (
                            <AlertTriangle className="h-4 w-4" />
                          ) : isUrgent ? (
                            <Clock className="h-4 w-4" />
                          ) : (
                            <Calendar className="h-4 w-4" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium leading-none">{deadline.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {deadline.projectTitle} · {deadline.type}
                          </p>
                          <div className="flex items-center pt-1">
                            <Badge
                              variant="outline"
                              className={`mr-2 ${
                                isPast
                                  ? "bg-red-100 text-red-800 border-red-200"
                                  : isUrgent
                                    ? "bg-amber-100 text-amber-800 border-amber-200"
                                    : ""
                              }`}
                            >
                              {isPast ? "Overdue" : isUrgent ? "Urgent" : "Upcoming"}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              Due {format(new Date(deadline.dueDate), "MMM d, yyyy")}
                            </span>
                          </div>
                        </div>
                        <Button asChild variant="ghost" size="sm" className="ml-auto">
                          <Link href={`/dashboard/projects/${deadline.projectId}`}>
                            <span className="sr-only">View</span>
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <CheckCircle2 className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No upcoming deadlines</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="learning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Learning Modules</CardTitle>
              <CardDescription>Your learning journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Project Management Fundamentals</h3>
                    <Badge
                      variant="outline"
                      className="bg-sew-moss-green/10 text-sew-moss-green border-sew-moss-green/20"
                    >
                      Completed
                    </Badge>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Financial Management</h3>
                    <Badge
                      variant="outline"
                      className="bg-sew-sunset-orange/10 text-sew-sunset-orange border-sew-sunset-orange/20"
                    >
                      In Progress
                    </Badge>
                  </div>
                  <Progress value={65} className="h-2" />
                  <p className="text-xs text-muted-foreground">4 of 6 lessons completed</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Community Engagement</h3>
                    <Badge variant="outline" className="bg-sew-sky-blue/10 text-sew-sky-blue border-sew-sky-blue/20">
                      In Progress
                    </Badge>
                  </div>
                  <Progress value={30} className="h-2" />
                  <p className="text-xs text-muted-foreground">2 of 5 lessons completed</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Grant Writing</h3>
                    <Badge variant="outline">Not Started</Badge>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/dashboard/learning">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Continue Learning
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}

export default function DashboardPage() {
  return (
    <DashboardShell>
      <ProjectsProvider>
        <ExpensesProvider>
          <DashboardContent />
        </ExpensesProvider>
      </ProjectsProvider>
    </DashboardShell>
  )
}
