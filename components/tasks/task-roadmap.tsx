"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Calendar,
  CheckCircle2,
  Clock,
  Heart,
  Users,
  Lightbulb,
  MapPin,
  Briefcase,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { useTasks } from "@/contexts/tasks-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

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

export function TaskRoadmap() {
  const { tasks, completedTaskIds, completeTask, resetTask, getTasksByCategory } = useTasks()
  const [activePersona, setActivePersona] = useState<string>("aidan")
  const [viewMode, setViewMode] = useState<string>("phase")
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({})
  const router = useRouter()

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

  // Get all categories
  const categories = Array.from(new Set(tasks.map((task) => task.category)))

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Your Learning Roadmap</h1>
          <p className="text-gray-500">Personalized path based on your learning style and goals</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={activePersona} onValueChange={setActivePersona}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select persona" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="aidan">Aidan (Reflective)</SelectItem>
              <SelectItem value="kiera">Kiera (Visual)</SelectItem>
              <SelectItem value="jasmine">Jasmine (Practical)</SelectItem>
            </SelectContent>
          </Select>

          <Select value={viewMode} onValueChange={setViewMode}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="View mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="phase">View by Phase</SelectItem>
              <SelectItem value="category">View by Category</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {viewMode === "phase" ? (
        <div className="space-y-6">
          {phases.map((phase, index) => (
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
                  <div className="space-y-3">
                    {tasksByPhase[phase.id].length > 0 ? (
                      tasksByPhase[phase.id].map((task) => (
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
                                  completedTaskIds.includes(task.id) ? "text-gray-500 line-through" : "text-gray-900",
                                )}
                              >
                                {task.name}
                              </h3>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="font-normal flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {task.timeEstimate}
                                </Badge>
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
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">No tasks in this phase yet.</p>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
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

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getTasksByCategory(category).map((task) => (
                  <Card key={task.id} className="overflow-hidden">
                    <div
                      className={cn(
                        "h-2",
                        category === "personal"
                          ? "bg-red-500"
                          : category === "community"
                            ? "bg-blue-500"
                            : category === "project"
                              ? "bg-green-500"
                              : category === "cultural"
                                ? "bg-purple-500"
                                : category === "business"
                                  ? "bg-amber-500"
                                  : category === "mission"
                                    ? "bg-indigo-500"
                                    : category === "operations"
                                      ? "bg-cyan-500"
                                      : category === "finances"
                                        ? "bg-emerald-500"
                                        : category === "marketing"
                                          ? "bg-pink-500"
                                          : "bg-gray-500",
                      )}
                    />

                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle
                          className={cn(completedTaskIds.includes(task.id) ? "text-gray-500 line-through" : "")}
                        >
                          {task.name}
                        </CardTitle>
                        {completedTaskIds.includes(task.id) && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                      </div>
                      <CardDescription className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        {task.timeEstimate || timeEstimates.medium}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <p
                        className={cn(
                          "text-sm",
                          completedTaskIds.includes(task.id) ? "text-gray-400" : "text-gray-600",
                        )}
                      >
                        {task.description}
                      </p>
                    </CardContent>

                    <CardFooter className="flex justify-between pt-2">
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
                        className="gap-1"
                        onClick={() => router.push(`/dashboard/learning/${task.category}/${task.id}`)}
                      >
                        Start Task
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  )
}
