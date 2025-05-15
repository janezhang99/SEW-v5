"use client"

import { useState } from "react"
import { useProjects, type Task, type ProjectPriority } from "@/contexts/projects-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Plus } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const priorityColors: Record<ProjectPriority, string> = {
  low: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  medium: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  high: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  urgent: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
}

interface TaskListProps {
  projectId: string
}

export function TaskList({ projectId }: TaskListProps) {
  const { getProject, addTask, updateTask } = useProjects()
  const project = getProject(projectId)
  const [open, setOpen] = useState(false)
  const [newTask, setNewTask] = useState<Omit<Task, "id" | "createdAt">>({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    dueDate: null,
    assignedTo: null,
  })
  const [date, setDate] = useState<Date | undefined>()

  if (!project) return null

  const handleAddTask = () => {
    addTask(projectId, {
      ...newTask,
      dueDate: date ? date.toISOString() : null,
    })
    setNewTask({
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      dueDate: null,
      assignedTo: null,
    })
    setDate(undefined)
    setOpen(false)
  }

  const handleTaskStatusChange = (taskId: string, checked: boolean) => {
    updateTask(projectId, taskId, {
      status: checked ? "completed" : "todo",
    })
  }

  const todoTasks = project.tasks.filter((task) => task.status === "todo")
  const inProgressTasks = project.tasks.filter((task) => task.status === "in-progress")
  const completedTasks = project.tasks.filter((task) => task.status === "completed")

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Tasks</h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-1 h-4 w-4" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>Create a new task for this project.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newTask.status}
                    onValueChange={(value) => setNewTask({ ...newTask, status: value as Task["status"] })}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value) => setNewTask({ ...newTask, priority: value as ProjectPriority })}
                  >
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="assignedTo">Assigned To</Label>
                <Select
                  value={newTask.assignedTo || ""}
                  onValueChange={(value) => setNewTask({ ...newTask, assignedTo: value || null })}
                >
                  <SelectTrigger id="assignedTo">
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                    {project.collaborators.map((collaborator) => (
                      <SelectItem key={collaborator.id} value={collaborator.id}>
                        {collaborator.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddTask} disabled={!newTask.title}>
                Add Task
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">To Do ({todoTasks.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {todoTasks.map((task) => (
                <div key={task.id} className="flex items-start space-x-2 rounded-md border p-2 text-sm">
                  <Checkbox
                    checked={task.status === "completed"}
                    onCheckedChange={(checked) => handleTaskStatusChange(task.id, checked as boolean)}
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{task.title}</p>
                      <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>
                    {task.dueDate && (
                      <p className="text-xs text-muted-foreground">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    )}
                    {task.assignedTo && (
                      <p className="text-xs text-muted-foreground">
                        Assigned to: {project.collaborators.find((c) => c.id === task.assignedTo)?.name || "Unknown"}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              {todoTasks.length === 0 && (
                <p className="text-center text-sm text-muted-foreground py-4">No tasks to do</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress ({inProgressTasks.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {inProgressTasks.map((task) => (
                <div key={task.id} className="flex items-start space-x-2 rounded-md border p-2 text-sm">
                  <Checkbox
                    checked={task.status === "completed"}
                    onCheckedChange={(checked) => handleTaskStatusChange(task.id, checked as boolean)}
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{task.title}</p>
                      <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>
                    {task.dueDate && (
                      <p className="text-xs text-muted-foreground">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    )}
                    {task.assignedTo && (
                      <p className="text-xs text-muted-foreground">
                        Assigned to: {project.collaborators.find((c) => c.id === task.assignedTo)?.name || "Unknown"}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              {inProgressTasks.length === 0 && (
                <p className="text-center text-sm text-muted-foreground py-4">No tasks in progress</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed ({completedTasks.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {completedTasks.map((task) => (
                <div key={task.id} className="flex items-start space-x-2 rounded-md border p-2 text-sm">
                  <Checkbox
                    checked={task.status === "completed"}
                    onCheckedChange={(checked) => handleTaskStatusChange(task.id, checked as boolean)}
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium line-through opacity-70">{task.title}</p>
                      <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 opacity-70">{task.description}</p>
                    {task.dueDate && (
                      <p className="text-xs text-muted-foreground opacity-70">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    )}
                    {task.assignedTo && (
                      <p className="text-xs text-muted-foreground opacity-70">
                        Assigned to: {project.collaborators.find((c) => c.id === task.assignedTo)?.name || "Unknown"}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              {completedTasks.length === 0 && (
                <p className="text-center text-sm text-muted-foreground py-4">No completed tasks</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
