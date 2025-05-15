"use client"

import { useProjects } from "@/contexts/projects-context"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CheckCircle2, Circle } from "lucide-react"

interface ProjectTimelineProps {
  projectId: string
}

export function ProjectTimeline({ projectId }: ProjectTimelineProps) {
  const { getProject } = useProjects()
  const project = getProject(projectId)

  if (!project) return null

  // Combine tasks and milestones into a single timeline
  const timelineItems = [
    ...project.tasks.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      date: task.dueDate,
      type: "task" as const,
      status: task.status,
    })),
    ...project.milestones.map((milestone) => ({
      id: milestone.id,
      title: milestone.title,
      description: milestone.description,
      date: milestone.dueDate,
      type: "milestone" as const,
      status: milestone.completed ? "completed" : "todo",
    })),
  ]
    .filter((item) => item.date) // Only include items with dates
    .sort((a, b) => {
      if (!a.date) return 1
      if (!b.date) return -1
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })

  if (timelineItems.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">No timeline items available.</p>
        <p className="text-sm text-muted-foreground">Add tasks or milestones with due dates to see them here.</p>
      </Card>
    )
  }

  return (
    <div className="relative space-y-4 pl-6 before:absolute before:inset-y-0 before:left-2 before:w-px before:bg-border">
      {timelineItems.map((item, index) => (
        <div key={`${item.type}-${item.id}`} className="relative">
          <div
            className={cn(
              "absolute left-[-24px] flex h-6 w-6 items-center justify-center rounded-full border bg-background",
              item.status === "completed" ? "text-primary" : "text-muted-foreground",
            )}
          >
            {item.status === "completed" ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <p className={cn("font-medium", item.status === "completed" && "line-through opacity-70")}>
                {item.title}
              </p>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
                {item.type === "milestone" ? "Milestone" : "Task"}
              </span>
            </div>
            <p
              className={cn("text-sm text-muted-foreground", item.status === "completed" && "line-through opacity-70")}
            >
              {item.description}
            </p>
            {item.date && (
              <p className="text-xs text-muted-foreground">Due: {new Date(item.date).toLocaleDateString()}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
