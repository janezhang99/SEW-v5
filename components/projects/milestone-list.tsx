"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical, Calendar, ListTodo, Edit, Trash2, CheckCircle } from "lucide-react"
import { useProjects, type Milestone } from "@/contexts/projects-context"
import { format } from "date-fns"

interface MilestoneListProps {
  projectId: string
}

export function MilestoneList({ projectId }: MilestoneListProps) {
  const { getProjectById, updateMilestone, deleteMilestone } = useProjects()
  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "upcoming">("all")

  const project = getProjectById(projectId)
  if (!project) return null

  // Filter milestones by status
  const filteredMilestones = project.milestones.filter((milestone) => {
    if (statusFilter === "all") return true
    if (statusFilter === "completed") return !!milestone.completedAt
    if (statusFilter === "upcoming") return !milestone.completedAt
    return true
  })

  // Handle milestone completion toggle
  const handleMilestoneToggle = (milestoneId: string, isCompleted: boolean) => {
    updateMilestone(projectId, milestoneId, {
      completedAt: isCompleted ? new Date() : undefined,
    })
  }

  // Handle milestone deletion
  const handleDeleteMilestone = (milestoneId: string) => {
    if (window.confirm("Are you sure you want to delete this milestone? This action cannot be undone.")) {
      deleteMilestone(projectId, milestoneId)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Status: {statusFilter === "all" ? "All" : statusFilter === "completed" ? "Completed" : "Upcoming"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setStatusFilter("all")}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("completed")}>Completed</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("upcoming")}>Upcoming</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {filteredMilestones.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground mb-4">
              No milestones found. Try adjusting your filter or create a new milestone.
            </p>
            <Button asChild>
              <Link href={`/dashboard/projects/${projectId}/milestones/new`}>Create New Milestone</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Milestones ({filteredMilestones.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredMilestones.map((milestone) => (
                <MilestoneItem
                  key={milestone.id}
                  milestone={milestone}
                  projectId={projectId}
                  project={project}
                  onToggle={(isCompleted) => handleMilestoneToggle(milestone.id, isCompleted)}
                  onDelete={() => handleDeleteMilestone(milestone.id)}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

interface MilestoneItemProps {
  milestone: Milestone
  projectId: string
  project: any
  onToggle: (isCompleted: boolean) => void
  onDelete: () => void
}

function MilestoneItem({ milestone, projectId, project, onToggle, onDelete }: MilestoneItemProps) {
  const isCompleted = !!milestone.completedAt

  // Calculate task completion for this milestone
  const milestoneTasks = project.tasks.filter((task) => milestone.tasks.includes(task.id))
  const completedTasks = milestoneTasks.filter((task) => task.status === "completed").length
  const taskProgress = milestoneTasks.length > 0 ? Math.round((completedTasks / milestoneTasks.length) * 100) : 0

  return (
    <div className="flex items-start gap-3 p-4 hover:bg-muted/5 transition-colors">
      <div className="pt-1">
        <Checkbox
          checked={isCompleted}
          onCheckedChange={(checked) => onToggle(!!checked)}
          className={isCompleted ? "border-sew-moss-green text-sew-moss-green" : ""}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div>
            <p className={`font-medium ${isCompleted ? "line-through text-muted-foreground" : ""}`}>
              {milestone.title}
            </p>
            <p className="text-sm text-muted-foreground line-clamp-2">{milestone.description}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/projects/${projectId}/milestones/${milestone.id}`}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/projects/${projectId}/milestones/${milestone.id}/edit`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Milestone
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600" onClick={onDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Milestone
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {milestoneTasks.length > 0 && (
          <div className="mt-2 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Tasks</span>
              <span className="font-medium">
                {completedTasks}/{milestoneTasks.length}
              </span>
            </div>
            <Progress value={taskProgress} className="h-1">
              <div className="h-full bg-sew-midnight-blue rounded-full" style={{ width: `${taskProgress}%` }}></div>
            </Progress>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 mt-2">
          <Badge
            variant="outline"
            className={
              isCompleted
                ? "bg-sew-moss-green/10 text-sew-moss-green border-sew-moss-green/20"
                : "bg-sew-sunset-orange/10 text-sew-sunset-orange border-sew-sunset-orange/20"
            }
          >
            {isCompleted ? "Completed" : "Upcoming"}
          </Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            Due: {format(new Date(milestone.dueDate), "MMM d, yyyy")}
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <ListTodo className="h-3 w-3" />
            {milestoneTasks.length} tasks
          </span>
          {isCompleted && (
            <span className="text-xs text-muted-foreground">
              Completed: {format(new Date(milestone.completedAt!), "MMM d, yyyy")}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
