"use client"

import React from "react"

import { useState } from "react"
import { Check, Clock, ChevronDown, Heart, Users, Lightbulb, MapPin, Briefcase, Lock } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

// Task type definition
interface Task {
  id: string
  title: string
  description: string
  category: "personal" | "community" | "project" | "cultural" | "business"
  phase: 1 | 2 | 3 | 4 | 5
  timeEstimate: number // in minutes
  completed: boolean
  locked: boolean
  prerequisiteTasks?: string[]
}

// Phase type definition
interface Phase {
  id: number
  title: string
  description: string
  progress: number
}

// Example data
const phases: Phase[] = [
  {
    id: 1,
    title: "Grounding & Visioning",
    description: "Connect with your purpose and community needs",
    progress: 75,
  },
  {
    id: 2,
    title: "Mapping the Vision",
    description: "Translate your vision into a project plan",
    progress: 50,
  },
  {
    id: 3,
    title: "Laying Foundations",
    description: "Build the practical elements of your project",
    progress: 25,
  },
  {
    id: 4,
    title: "Community Engagement",
    description: "Involve others and gather feedback",
    progress: 0,
  },
  {
    id: 5,
    title: "Reflection & Expansion",
    description: "Evaluate impact and plan for growth",
    progress: 0,
  },
]

// Example tasks
const exampleTasks: Task[] = [
  {
    id: "personal-why",
    title: "Personal Why",
    description: "Reflect on what this project means to you and why you feel connected to it",
    category: "personal",
    phase: 1,
    timeEstimate: 60,
    completed: true,
    locked: false,
  },
  {
    id: "personal-growth",
    title: "Personal Growth Goal",
    description: "Set a personal growth goal related to this project",
    category: "personal",
    phase: 1,
    timeEstimate: 45,
    completed: true,
    locked: false,
  },
  {
    id: "core-values",
    title: "Core Values",
    description: "Identify relevant personal, community, and cultural values",
    category: "personal",
    phase: 1,
    timeEstimate: 60,
    completed: false,
    locked: false,
  },
  {
    id: "community-need",
    title: "Community Need",
    description: "What problem is your idea solving? How does it speak to community needs?",
    category: "community",
    phase: 1,
    timeEstimate: 90,
    completed: false,
    locked: false,
  },
  {
    id: "project-purpose",
    title: "Project Purpose",
    description: "Clearly articulate the purpose of your project",
    category: "project",
    phase: 2,
    timeEstimate: 60,
    completed: false,
    locked: false,
    prerequisiteTasks: ["personal-why", "community-need"],
  },
  {
    id: "challenges",
    title: "Challenges & Opportunities",
    description: "Identify challenges your community is facing and opportunities for change",
    category: "community",
    phase: 2,
    timeEstimate: 120,
    completed: false,
    locked: true,
    prerequisiteTasks: ["community-need"],
  },
  {
    id: "successful-models",
    title: "Successful Models",
    description: "Research examples of successful projects in your community",
    category: "project",
    phase: 2,
    timeEstimate: 90,
    completed: false,
    locked: true,
  },
  {
    id: "task-list",
    title: "Task List",
    description: "Brainstorm all the tasks needed to complete your project",
    category: "project",
    phase: 3,
    timeEstimate: 60,
    completed: false,
    locked: true,
    prerequisiteTasks: ["project-purpose"],
  },
  {
    id: "timeline",
    title: "Timeline",
    description: "Develop a timeline with clear milestones and deadlines",
    category: "project",
    phase: 3,
    timeEstimate: 90,
    completed: false,
    locked: true,
    prerequisiteTasks: ["task-list"],
  },
  {
    id: "budget",
    title: "Budget",
    description: "Identify all costs involved in your project",
    category: "business",
    phase: 3,
    timeEstimate: 120,
    completed: false,
    locked: true,
  },
]

// Category icons and colors
const categoryConfig = {
  personal: { icon: Heart, color: "text-rose-500 bg-rose-100" },
  community: { icon: Users, color: "text-blue-500 bg-blue-100" },
  project: { icon: Lightbulb, color: "text-amber-500 bg-amber-100" },
  cultural: { icon: MapPin, color: "text-green-500 bg-green-100" },
  business: { icon: Briefcase, color: "text-purple-500 bg-purple-100" },
}

export function FlexibleTaskStructure() {
  const [tasks, setTasks] = useState<Task[]>(exampleTasks)
  const [activePhase, setActivePhase] = useState<number>(1)
  const [viewMode, setViewMode] = useState<"phase" | "category">("phase")

  // Complete a task
  const completeTask = (taskId: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: true } : task)))

    // Unlock any tasks that had this as a prerequisite
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.prerequisiteTasks?.includes(taskId)) {
          // Check if all prerequisites are now completed
          const allPrereqsCompleted = task.prerequisiteTasks.every((prereqId) => {
            const prereqTask = prevTasks.find((t) => t.id === prereqId)
            return prereqTask?.completed
          })

          if (allPrereqsCompleted) {
            return { ...task, locked: false }
          }
        }
        return task
      }),
    )
  }

  // Reset a task
  const resetTask = (taskId: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: false } : task)))

    // Lock any tasks that had this as a prerequisite
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.prerequisiteTasks?.includes(taskId)) {
          return { ...task, locked: true }
        }
        return task
      }),
    )
  }

  // Get tasks for the current phase
  const getTasksByPhase = (phaseId: number) => {
    return tasks.filter((task) => task.phase === phaseId)
  }

  // Get tasks by category
  const getTasksByCategory = (category: string) => {
    return tasks.filter((task) => task.category === category)
  }

  // Calculate phase progress
  const calculatePhaseProgress = (phaseId: number) => {
    const phaseTasks = getTasksByPhase(phaseId)
    if (phaseTasks.length === 0) return 0

    const completedTasks = phaseTasks.filter((task) => task.completed).length
    return Math.round((completedTasks / phaseTasks.length) * 100)
  }

  // Get all unique categories
  const categories = Array.from(new Set(tasks.map((task) => task.category)))

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Your Learning Journey</h2>
          <p className="text-muted-foreground">Complete tasks at your own pace to unlock funding</p>
        </div>

        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "phase" | "category")}>
          <TabsList>
            <TabsTrigger value="phase">View by Phase</TabsTrigger>
            <TabsTrigger value="category">View by Category</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {viewMode === "phase" && (
        <div className="space-y-6">
          {/* Phase Progress */}
          <div className="grid gap-4 md:grid-cols-5">
            {phases.map((phase) => (
              <Card
                key={phase.id}
                className={cn("cursor-pointer transition-all", activePhase === phase.id ? "ring-2 ring-primary" : "")}
                onClick={() => setActivePhase(phase.id)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Phase {phase.id}</CardTitle>
                  <CardDescription className="line-clamp-1">{phase.title}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>{calculatePhaseProgress(phase.id)}%</span>
                    </div>
                    <Progress value={calculatePhaseProgress(phase.id)} className="h-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Active Phase Tasks */}
          <div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">
                Phase {activePhase}: {phases.find((p) => p.id === activePhase)?.title}
              </h3>
              <p className="text-muted-foreground">{phases.find((p) => p.id === activePhase)?.description}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {getTasksByPhase(activePhase).map((task) => (
                <TaskCard key={task.id} task={task} onComplete={completeTask} onReset={resetTask} />
              ))}
            </div>
          </div>
        </div>
      )}

      {viewMode === "category" && (
        <div className="space-y-6">
          {categories.map((category) => (
            <Collapsible key={category} className="w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {categoryConfig[category as keyof typeof categoryConfig].icon && (
                    <div
                      className={`p-1.5 rounded-full ${categoryConfig[category as keyof typeof categoryConfig].color.split(" ")[1]}`}
                    >
                      {React.createElement(categoryConfig[category as keyof typeof categoryConfig].icon, {
                        className: `h-4 w-4 ${categoryConfig[category as keyof typeof categoryConfig].color.split(" ")[0]}`,
                      })}
                    </div>
                  )}
                  <h3 className="text-lg font-semibold capitalize">{category} Tasks</h3>
                </div>

                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <ChevronDown className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent className="mt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {getTasksByCategory(category).map((task) => (
                    <TaskCard key={task.id} task={task} onComplete={completeTask} onReset={resetTask} />
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      )}
    </div>
  )
}

// Task Card Component
interface TaskCardProps {
  task: Task
  onComplete: (taskId: string) => void
  onReset: (taskId: string) => void
}

function TaskCard({ task, onComplete, onReset }: TaskCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  const CategoryIcon = categoryConfig[task.category].icon
  const categoryColor = categoryConfig[task.category].color.split(" ")

  return (
    <Card className={cn("transition-all", task.locked ? "opacity-70" : "", task.completed ? "bg-muted/50" : "")}>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <Badge variant="outline" className={cn("flex items-center gap-1", categoryColor[0], categoryColor[1])}>
            <CategoryIcon className="h-3 w-3" />
            <span className="capitalize">{task.category}</span>
          </Badge>

          <Badge variant={task.completed ? "default" : "outline"}>{task.completed ? "Completed" : "To Do"}</Badge>
        </div>
        <CardTitle className="text-base">{task.title}</CardTitle>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Clock className="h-4 w-4" />
          <span>{task.timeEstimate} min</span>

          {task.locked && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1 ml-auto">
                    <Lock className="h-4 w-4" />
                    <span>Locked</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Complete prerequisite tasks to unlock</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        <p className={cn("text-sm line-clamp-2", task.completed ? "line-through opacity-70" : "")}>
          {task.description}
        </p>

        <Button
          variant="ghost"
          size="sm"
          className="mt-2 h-auto p-0 text-xs text-muted-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Show less" : "Show more"}
          <ChevronDown className={cn("h-3 w-3 ml-1 transition-transform", isOpen ? "rotate-180" : "")} />
        </Button>

        {isOpen && (
          <div className="mt-2 space-y-2 text-sm">
            <div>
              <p className="font-medium">Phase:</p>
              <p className="text-muted-foreground">Phase {task.phase}</p>
            </div>

            {task.prerequisiteTasks && task.prerequisiteTasks.length > 0 && (
              <div>
                <p className="font-medium">Prerequisites:</p>
                <ul className="list-disc list-inside text-muted-foreground">
                  {task.prerequisiteTasks.map((prereqId) => {
                    const prereqTask = exampleTasks.find((t) => t.id === prereqId)
                    return (
                      <li key={prereqId} className={cn(prereqTask?.completed ? "line-through" : "")}>
                        {prereqTask?.title || prereqId}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter>
        {task.completed ? (
          <Button variant="outline" className="w-full" onClick={() => onReset(task.id)}>
            Mark as Incomplete
          </Button>
        ) : (
          <Button className="w-full" disabled={task.locked} onClick={() => onComplete(task.id)}>
            {task.locked ? (
              <>
                <Lock className="mr-2 h-4 w-4" />
                Locked
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Mark as Complete
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

// Example usage component
export function FlexibleTaskStructureExample() {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <FlexibleTaskStructure />
    </div>
  )
}
