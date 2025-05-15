"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  Filter,
  Heart,
  Lightbulb,
  MapPin,
  Search,
  Users,
  Briefcase,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  LayoutList,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { IndigenousThemeProvider, ThemeSelector } from "@/components/theme/indigenous-theme-provider"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useTasks } from "@/contexts/tasks-context"

// Define the roadmap phases based on the personas
const roadmapPhases = {
  aidan: [
    {
      id: "phase1",
      name: "Grounding & Visioning",
      description: "Connect with your purpose and community needs",
      color: "bg-blue-100 text-blue-700 border-blue-200",
    },
    {
      id: "phase2",
      name: "Mapping the Vision",
      description: "Translate deep intention into project structure",
      color: "bg-purple-100 text-purple-700 border-purple-200",
    },
    {
      id: "phase3",
      name: "Laying Foundations",
      description: "Bring in practical tools after spiritual clarity",
      color: "bg-amber-100 text-amber-700 border-amber-200",
    },
    {
      id: "phase4",
      name: "Community Engagement",
      description: "Build connections and accountability",
      color: "bg-green-100 text-green-700 border-green-200",
    },
    {
      id: "phase5",
      name: "Reflection & Expansion",
      description: "Reflect deeply and prepare for growth",
      color: "bg-red-100 text-red-700 border-red-200",
    },
  ],
  kiera: [
    {
      id: "phase1",
      name: "Creative Grounding",
      description: "Build confidence through creativity",
      color: "bg-pink-100 text-pink-700 border-pink-200",
    },
    {
      id: "phase2",
      name: "Idea to Identity",
      description: "Refine your concept with peer input",
      color: "bg-purple-100 text-purple-700 border-purple-200",
    },
    {
      id: "phase3",
      name: "Visual Planning",
      description: "Create practical steps through visuals",
      color: "bg-blue-100 text-blue-700 border-blue-200",
    },
    {
      id: "phase4",
      name: "Brave Action",
      description: "Move from planning to doing",
      color: "bg-green-100 text-green-700 border-green-200",
    },
    {
      id: "phase5",
      name: "Reflection & Reimagination",
      description: "Frame challenges as learning opportunities",
      color: "bg-amber-100 text-amber-700 border-amber-200",
    },
  ],
  jasmine: [
    {
      id: "phase1",
      name: "Foundation & Goal Setting",
      description: "Connect project to professional goals",
      color: "bg-indigo-100 text-indigo-700 border-indigo-200",
    },
    {
      id: "phase2",
      name: "Project Design & Tools",
      description: "Transform vision into concrete plans",
      color: "bg-cyan-100 text-cyan-700 border-cyan-200",
    },
    {
      id: "phase3",
      name: "Funding & Formalization",
      description: "Strengthen proposal with detailed planning",
      color: "bg-green-100 text-green-700 border-green-200",
    },
    {
      id: "phase4",
      name: "Delivery & Professional Growth",
      description: "Build confidence and establish concrete plans",
      color: "bg-amber-100 text-amber-700 border-amber-200",
    },
    {
      id: "phase5",
      name: "Reflection & Application",
      description: "Finalize documentation for future growth",
      color: "bg-red-100 text-red-700 border-red-200",
    },
  ],
}

// Map category names to icons
const categoryIcons: Record<string, React.ReactNode> = {
  personal: <Heart className="h-4 w-4" />,
  community: <Users className="h-4 w-4" />,
  project: <Lightbulb className="h-4 w-4" />,
  cultural: <MapPin className="h-4 w-4" />,
  business: <Briefcase className="h-4 w-4" />,
  mission: <Lightbulb className="h-4 w-4" />,
  operations: <Calendar className="h-4 w-4" />,
  finances: <Briefcase className="h-4 w-4" />,
  marketing: <Users className="h-4 w-4" />,
}

// Define time estimates for tasks
const timeEstimates = {
  short: "15-30 min",
  medium: "1-2 hours",
  long: "2-4 hours",
}

// Map tasks to phases based on the roadmap
const mapTasksToPhases = (tasks: any[], persona: string) => {
  // This would ideally come from a database mapping
  // For now, we'll use a simple algorithm based on task categories

  const phases = roadmapPhases[persona as keyof typeof roadmapPhases] || roadmapPhases.aidan
  const result: Record<string, any[]> = {}

  // Initialize phases
  phases.forEach((phase) => {
    result[phase.id] = []
  })

  // Map tasks to phases based on category and complexity
  tasks.forEach((task) => {
    if (task.category === "personal" || task.category === "community") {
      result.phase1.push({ ...task, timeEstimate: task.timeEstimate || timeEstimates.medium })
    } else if (task.category === "mission" || task.category === "project") {
      result.phase2.push({ ...task, timeEstimate: task.timeEstimate || timeEstimates.medium })
    } else if (task.category === "operations" || task.category === "finances") {
      result.phase3.push({ ...task, timeEstimate: task.timeEstimate || timeEstimates.long })
    } else if (task.category === "community" || task.category === "marketing") {
      result.phase4.push({ ...task, timeEstimate: task.timeEstimate || timeEstimates.medium })
    } else {
      result.phase5.push({ ...task, timeEstimate: task.timeEstimate || timeEstimates.short })
    }
  })

  return result
}

export default function LearningPage() {
  const { tasks, loading, error, completedTaskIds, completeTask, resetTask, getTasksByCategory } = useTasks()
  const [searchQuery, setSearchQuery] = useState("")
  const [activePersona, setActivePersona] = useState<string>("aidan")
  const [viewMode, setViewMode] = useState<string>("phase")
  const [displayMode, setDisplayMode] = useState<string>("cards")
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({})
  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize from URL params if available
  useEffect(() => {
    const personaParam = searchParams.get("persona")
    const viewParam = searchParams.get("view")
    const displayParam = searchParams.get("display")

    if (personaParam && ["aidan", "kiera", "jasmine"].includes(personaParam)) {
      setActivePersona(personaParam)
    }

    if (viewParam && ["phase", "category"].includes(viewParam)) {
      setViewMode(viewParam)
    }

    if (displayParam && ["cards", "list"].includes(displayParam)) {
      setDisplayMode(displayParam)
    }
  }, [searchParams])

  // Calculate progress
  const totalTasks = tasks.length
  const completedCount = completedTaskIds.length
  const progress = Math.round((completedCount / totalTasks) * 100) || 0

  // Get unique categories
  const categories = [...new Set(tasks.map((task) => task.category))]

  // Map tasks to phases based on the selected persona
  const tasksByPhase = mapTasksToPhases(tasks, activePersona)

  // Get phases for the current persona
  const phases = roadmapPhases[activePersona as keyof typeof roadmapPhases] || roadmapPhases.aidan

  // Initialize expanded phases
  useEffect(() => {
    const initialExpanded: Record<string, boolean> = {}
    phases.forEach((phase) => {
      initialExpanded[phase.id] = true
    })
    setExpandedPhases(initialExpanded)
  }, [activePersona, phases])

  // Toggle phase expansion
  const togglePhase = (phaseId: string) => {
    setExpandedPhases((prev) => ({
      ...prev,
      [phaseId]: !prev[phaseId],
    }))
  }

  // Calculate progress for each phase
  const calculatePhaseProgress = (phaseTasks: any[]) => {
    if (phaseTasks.length === 0) return 0
    const completed = phaseTasks.filter((task) => completedTaskIds.includes(task.id)).length
    return (completed / phaseTasks.length) * 100
  }

  // Filter tasks by search query
  const filterTasks = (taskList: any[]) => {
    if (!searchQuery.trim()) return taskList

    const query = searchQuery.toLowerCase()
    return taskList.filter(
      (task) => task.name.toLowerCase().includes(query) || task.description.toLowerCase().includes(query),
    )
  }

  // Calculate total funding unlocked
  const fundingUnlocked = completedTaskIds.reduce((total, id) => {
    const task = tasks.find((t) => t.id === id)
    return total + (task?.fundingAmount || 0)
  }, 0)

  if (loading) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Learning Journey" text="Loading your learning tasks...">
          <div className="h-10"></div>
        </DashboardHeader>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your tasks...</p>
          </div>
        </div>
      </DashboardShell>
    )
  }

  if (error) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Learning Journey" text="There was an error loading your tasks">
          <Button variant="outline" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </DashboardHeader>
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Retry Loading Tasks</Button>
          </CardContent>
        </Card>
      </DashboardShell>
    )
  }

  return (
    <IndigenousThemeProvider defaultTheme="northern">
      <DashboardShell>
        <DashboardHeader heading="Learning Journey" text="Complete tasks to build skills and unlock funding">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tasks..."
                className="pl-8 w-full sm:w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">View Options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="p-2">
                  <p className="text-sm font-medium mb-2">Learning Style</p>
                  <Select value={activePersona} onValueChange={setActivePersona}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select persona" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aidan">Aidan (Reflective)</SelectItem>
                      <SelectItem value="kiera">Kiera (Visual)</SelectItem>
                      <SelectItem value="jasmine">Jasmine (Practical)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="p-2 pt-0">
                  <p className="text-sm font-medium mb-2">Organization</p>
                  <Select value={viewMode} onValueChange={setViewMode}>
                    <SelectTrigger>
                      <SelectValue placeholder="View mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phase">By Learning Phase</SelectItem>
                      <SelectItem value="category">By Category</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="p-2 pt-0">
                  <p className="text-sm font-medium mb-2">Display</p>
                  <div className="flex gap-2">
                    <Button
                      variant={displayMode === "cards" ? "default" : "outline"}
                      size="sm"
                      className="flex-1 gap-2"
                      onClick={() => setDisplayMode("cards")}
                    >
                      <LayoutGrid className="h-4 w-4" />
                      Cards
                    </Button>
                    <Button
                      variant={displayMode === "list" ? "default" : "outline"}
                      size="sm"
                      className="flex-1 gap-2"
                      onClick={() => setDisplayMode("list")}
                    >
                      <LayoutList className="h-4 w-4" />
                      List
                    </Button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </DashboardHeader>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Your Progress</CardTitle>
            <CardDescription>Track your learning journey and funding</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Task Completion</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm text-muted-foreground gap-2">
                  <span>
                    <CheckCircle2 className="inline-block mr-1 h-4 w-4" />
                    {completedCount} of {totalTasks} tasks completed
                  </span>
                  <span>
                    <DollarSign className="inline-block mr-1 h-4 w-4" />
                    Funding unlocked: ${fundingUnlocked}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6">
          {viewMode === "phase" ? (
            <div className="space-y-6">
              {phases.map((phase, index) => {
                const filteredTasks = filterTasks(tasksByPhase[phase.id])

                return (
                  <Card key={phase.id} className={cn("border-l-4", phase.color)}>
                    <CardHeader className="pb-2 cursor-pointer" onClick={() => togglePhase(phase.id)}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={cn("font-normal", phase.color)}>
                            Phase {index + 1}
                          </Badge>
                          <CardTitle className="text-lg">{phase.name}</CardTitle>
                        </div>
                        {expandedPhases[phase.id] ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      <CardDescription>{phase.description}</CardDescription>

                      <div className="mt-2">
                        <Progress value={calculatePhaseProgress(tasksByPhase[phase.id])} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">
                          {tasksByPhase[phase.id].filter((task) => completedTaskIds.includes(task.id)).length} of{" "}
                          {tasksByPhase[phase.id].length} tasks completed
                        </p>
                      </div>
                    </CardHeader>

                    {expandedPhases[phase.id] && (
                      <CardContent className="pt-4">
                        {filteredTasks.length > 0 ? (
                          displayMode === "list" ? (
                            <div className="space-y-3">
                              {filteredTasks.map((task) => (
                                <div
                                  key={task.id}
                                  className={cn(
                                    "p-3 rounded-lg border flex items-start gap-3 transition-all",
                                    completedTaskIds.includes(task.id)
                                      ? "bg-gray-50 border-gray-200"
                                      : "bg-white border-gray-200 hover:border-gray-300",
                                  )}
                                >
                                  <div
                                    className={cn(
                                      "p-2 rounded-md",
                                      task.category === "personal"
                                        ? "bg-red-100 text-red-700"
                                        : task.category === "community"
                                          ? "bg-blue-100 text-blue-700"
                                          : task.category === "project"
                                            ? "bg-green-100 text-green-700"
                                            : task.category === "cultural"
                                              ? "bg-purple-100 text-purple-700"
                                              : task.category === "business"
                                                ? "bg-amber-100 text-amber-700"
                                                : task.category === "mission"
                                                  ? "bg-indigo-100 text-indigo-700"
                                                  : task.category === "operations"
                                                    ? "bg-cyan-100 text-cyan-700"
                                                    : task.category === "finances"
                                                      ? "bg-emerald-100 text-emerald-700"
                                                      : task.category === "marketing"
                                                        ? "bg-pink-100 text-pink-700"
                                                        : "bg-gray-100 text-gray-700",
                                    )}
                                  >
                                    {categoryIcons[task.category] || <Lightbulb className="h-4 w-4" />}
                                  </div>

                                  <div className="flex-1">
                                    <div className="flex justify-between">
                                      <h3
                                        className={cn(
                                          "font-medium",
                                          completedTaskIds.includes(task.id)
                                            ? "text-gray-500 line-through"
                                            : "text-gray-900",
                                        )}
                                      >
                                        {task.name}
                                      </h3>
                                      <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="font-normal flex items-center gap-1">
                                          <Clock className="h-3 w-3" />
                                          {task.timeEstimate}
                                        </Badge>
                                        {task.fundingAmount > 0 && (
                                          <Badge
                                            variant={completedTaskIds.includes(task.id) ? "default" : "outline"}
                                            className={
                                              completedTaskIds.includes(task.id)
                                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                                : ""
                                            }
                                          >
                                            <DollarSign className="mr-1 h-3 w-3" />
                                            <span>${task.fundingAmount}</span>
                                          </Badge>
                                        )}
                                      </div>
                                    </div>

                                    <p
                                      className={cn(
                                        "text-sm mt-1",
                                        completedTaskIds.includes(task.id) ? "text-gray-400" : "text-gray-500",
                                      )}
                                    >
                                      {task.description}
                                    </p>

                                    <div className="flex justify-between items-center mt-3">
                                      <Badge variant="outline" className="font-normal">
                                        {task.category}
                                      </Badge>

                                      <div className="flex gap-2">
                                        {completedTaskIds.includes(task.id) ? (
                                          <Button variant="outline" size="sm" onClick={() => resetTask(task.id)}>
                                            Mark Incomplete
                                          </Button>
                                        ) : (
                                          <Button variant="outline" size="sm" onClick={() => completeTask(task.id)}>
                                            Mark Complete
                                          </Button>
                                        )}

                                        <Button
                                          size="sm"
                                          onClick={() => router.push(`/dashboard/learning/${task.category}/${task.id}`)}
                                        >
                                          Start Task
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                              {filteredTasks.map((task) => {
                                const isCompleted = completedTaskIds.includes(task.id)
                                return (
                                  <Card key={task.id}>
                                    <CardHeader className="pb-2">
                                      <div className="flex justify-between">
                                        <CardTitle className="text-base flex items-center gap-2">
                                          <div
                                            className={`h-6 w-6 rounded-full flex items-center justify-center ${
                                              isCompleted ? "bg-green-100 text-green-700" : "bg-primary/10 text-primary"
                                            }`}
                                          >
                                            {isCompleted ? (
                                              <CheckCircle2 className="h-4 w-4" />
                                            ) : (
                                              categoryIcons[task.category]
                                            )}
                                          </div>
                                          {task.name}
                                        </CardTitle>
                                        {task.fundingAmount > 0 && (
                                          <Badge
                                            variant={isCompleted ? "default" : "outline"}
                                            className={
                                              isCompleted ? "bg-green-100 text-green-800 hover:bg-green-100" : ""
                                            }
                                          >
                                            <DollarSign className="mr-1 h-3 w-3" />
                                            <span>${task.fundingAmount}</span>
                                          </Badge>
                                        )}
                                      </div>
                                      <CardDescription>{task.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="pb-2">
                                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Clock className="h-4 w-4" />
                                        <span>Estimated time: {task.timeEstimate}</span>
                                      </div>
                                      <div className="mt-1">
                                        <Badge variant="outline" className="capitalize">
                                          {task.category}
                                        </Badge>
                                      </div>
                                    </CardContent>
                                    <CardFooter>
                                      <Button
                                        variant={isCompleted ? "outline" : "default"}
                                        className={isCompleted ? "" : ""}
                                        asChild
                                      >
                                        <Link href={`/dashboard/learning/${task.category}/${task.id}`}>
                                          {isCompleted ? "Review" : "Start Task"}
                                        </Link>
                                      </Button>
                                    </CardFooter>
                                  </Card>
                                )
                              })}
                            </div>
                          )
                        ) : (
                          <p className="text-gray-500 text-center py-4">
                            {searchQuery ? "No tasks match your search in this phase." : "No tasks in this phase yet."}
                          </p>
                        )}
                      </CardContent>
                    )}
                  </Card>
                )
              })}
            </div>
          ) : (
            <Tabs defaultValue={categories[0] || "personal"}>
              <TabsList className="mb-4 flex flex-wrap">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category} className="flex items-center gap-2">
                    <div
                      className={cn(
                        "p-1 rounded-md",
                        category === "personal"
                          ? "bg-red-100 text-red-700"
                          : category === "community"
                            ? "bg-blue-100 text-blue-700"
                            : category === "project"
                              ? "bg-green-100 text-green-700"
                              : category === "cultural"
                                ? "bg-purple-100 text-purple-700"
                                : category === "business"
                                  ? "bg-amber-100 text-amber-700"
                                  : category === "mission"
                                    ? "bg-indigo-100 text-indigo-700"
                                    : category === "operations"
                                      ? "bg-cyan-100 text-cyan-700"
                                      : category === "finances"
                                        ? "bg-emerald-100 text-emerald-700"
                                        : category === "marketing"
                                          ? "bg-pink-100 text-pink-700"
                                          : "bg-gray-100 text-gray-700",
                      )}
                    >
                      {categoryIcons[category] || <Lightbulb className="h-4 w-4" />}
                    </div>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((category) => {
                const filteredTasks = filterTasks(getTasksByCategory(category))

                return (
                  <TabsContent key={category} value={category} className="space-y-4">
                    {filteredTasks.length > 0 ? (
                      displayMode === "list" ? (
                        <div className="space-y-3">
                          {filteredTasks.map((task) => (
                            <div
                              key={task.id}
                              className={cn(
                                "p-3 rounded-lg border flex items-start gap-3 transition-all",
                                completedTaskIds.includes(task.id)
                                  ? "bg-gray-50 border-gray-200"
                                  : "bg-white border-gray-200 hover:border-gray-300",
                              )}
                            >
                              <div
                                className={cn(
                                  "p-2 rounded-md",
                                  category === "personal"
                                    ? "bg-red-100 text-red-700"
                                    : category === "community"
                                      ? "bg-blue-100 text-blue-700"
                                      : category === "project"
                                        ? "bg-green-100 text-green-700"
                                        : category === "cultural"
                                          ? "bg-purple-100 text-purple-700"
                                          : category === "business"
                                            ? "bg-amber-100 text-amber-700"
                                            : category === "mission"
                                              ? "bg-indigo-100 text-indigo-700"
                                              : category === "operations"
                                                ? "bg-cyan-100 text-cyan-700"
                                                : category === "finances"
                                                  ? "bg-emerald-100 text-emerald-700"
                                                  : category === "marketing"
                                                    ? "bg-pink-100 text-pink-700"
                                                    : "bg-gray-100 text-gray-700",
                                )}
                              >
                                {categoryIcons[category] || <Lightbulb className="h-4 w-4" />}
                              </div>

                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <h3
                                    className={cn(
                                      "font-medium",
                                      completedTaskIds.includes(task.id)
                                        ? "text-gray-500 line-through"
                                        : "text-gray-900",
                                    )}
                                  >
                                    {task.name}
                                  </h3>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="font-normal flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      {task.timeEstimate || timeEstimates.medium}
                                    </Badge>
                                    {task.fundingAmount > 0 && (
                                      <Badge
                                        variant={completedTaskIds.includes(task.id) ? "default" : "outline"}
                                        className={
                                          completedTaskIds.includes(task.id)
                                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                                            : ""
                                        }
                                      >
                                        <DollarSign className="mr-1 h-3 w-3" />
                                        <span>${task.fundingAmount}</span>
                                      </Badge>
                                    )}
                                  </div>
                                </div>

                                <p
                                  className={cn(
                                    "text-sm mt-1",
                                    completedTaskIds.includes(task.id) ? "text-gray-400" : "text-gray-500",
                                  )}
                                >
                                  {task.description}
                                </p>

                                <div className="flex justify-between items-center mt-3">
                                  <Badge variant="outline" className="font-normal">
                                    {task.category}
                                  </Badge>

                                  <div className="flex gap-2">
                                    {completedTaskIds.includes(task.id) ? (
                                      <Button variant="outline" size="sm" onClick={() => resetTask(task.id)}>
                                        Mark Incomplete
                                      </Button>
                                    ) : (
                                      <Button variant="outline" size="sm" onClick={() => completeTask(task.id)}>
                                        Mark Complete
                                      </Button>
                                    )}

                                    <Button
                                      size="sm"
                                      onClick={() => router.push(`/dashboard/learning/${task.category}/${task.id}`)}
                                    >
                                      Start Task
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                          {filteredTasks.map((task) => {
                            const isCompleted = completedTaskIds.includes(task.id)
                            return (
                              <Card key={task.id}>
                                <CardHeader className="pb-2">
                                  <div className="flex justify-between">
                                    <CardTitle className="text-base flex items-center gap-2">
                                      <div
                                        className={`h-6 w-6 rounded-full flex items-center justify-center ${
                                          isCompleted ? "bg-green-100 text-green-700" : "bg-primary/10 text-primary"
                                        }`}
                                      >
                                        {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : categoryIcons[category]}
                                      </div>
                                      {task.name}
                                    </CardTitle>
                                    {task.fundingAmount > 0 && (
                                      <Badge
                                        variant={isCompleted ? "default" : "outline"}
                                        className={isCompleted ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                                      >
                                        <DollarSign className="mr-1 h-3 w-3" />
                                        <span>${task.fundingAmount}</span>
                                      </Badge>
                                    )}
                                  </div>
                                  <CardDescription>{task.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="pb-2">
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    <span>Estimated time: {task.timeEstimate || timeEstimates.medium}</span>
                                  </div>
                                </CardContent>
                                <CardFooter>
                                  <Button
                                    variant={isCompleted ? "outline" : "default"}
                                    className={isCompleted ? "" : ""}
                                    asChild
                                  >
                                    <Link href={`/dashboard/learning/${task.category}/${task.id}`}>
                                      {isCompleted ? "Review" : "Start Task"}
                                    </Link>
                                  </Button>
                                </CardFooter>
                              </Card>
                            )
                          })}
                        </div>
                      )
                    ) : (
                      <Card>
                        <CardContent className="py-8 text-center">
                          <p className="text-muted-foreground">
                            {searchQuery
                              ? "No tasks match your search in this category."
                              : "No tasks in this category yet."}
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                )
              })}
            </Tabs>
          )}
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Cultural Theme Settings</CardTitle>
              <CardDescription>Customize the appearance to reflect your cultural preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <ThemeSelector />
            </CardContent>
          </Card>
        </div>
      </DashboardShell>
    </IndigenousThemeProvider>
  )
}
