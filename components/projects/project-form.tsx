"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useProjects, type Project, type ProjectStatus, type ProjectPriority } from "@/contexts/projects-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface ProjectFormProps {
  projectId?: string
}

export function ProjectForm({ projectId }: ProjectFormProps) {
  const router = useRouter()
  const { getProject, addProject, updateProject } = useProjects()

  const existingProject = projectId ? getProject(projectId) : undefined

  const [startDate, setStartDate] = useState<Date | undefined>(
    existingProject?.startDate ? new Date(existingProject.startDate) : undefined,
  )
  const [endDate, setEndDate] = useState<Date | undefined>(
    existingProject?.endDate ? new Date(existingProject.endDate) : undefined,
  )

  const [formData, setFormData] = useState<Partial<Project>>({
    title: existingProject?.title || "",
    description: existingProject?.description || "",
    status: existingProject?.status || "planning",
    priority: existingProject?.priority || "medium",
    budget: existingProject?.budget || null,
    tasks: existingProject?.tasks || [],
    milestones: existingProject?.milestones || [],
    collaborators: existingProject?.collaborators || [],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!startDate) {
      alert("Start date is required")
      return
    }

    if (projectId && existingProject) {
      updateProject(projectId, {
        ...formData,
        startDate: startDate.toISOString(),
        endDate: endDate ? endDate.toISOString() : null,
      })
      router.push(`/dashboard/projects/${projectId}`)
    } else {
      addProject({
        ...(formData as Omit<Project, "id" | "createdAt" | "updatedAt">),
        startDate: startDate.toISOString(),
        endDate: endDate ? endDate.toISOString() : null,
        tasks: [],
        milestones: [],
        collaborators: [],
      })
      router.push("/dashboard/projects")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{projectId ? "Edit Project" : "Create New Project"}</CardTitle>
          <CardDescription>
            {projectId ? "Update your project details below." : "Fill in the details below to create a new project."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value as ProjectStatus })}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value as ProjectPriority })}
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
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endDate">End Date (Optional)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="budget">Budget (Optional)</Label>
            <Input
              id="budget"
              type="number"
              value={formData.budget || ""}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value ? Number(e.target.value) : null })}
              placeholder="Enter budget amount"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(projectId ? `/dashboard/projects/${projectId}` : "/dashboard/projects")}
          >
            Cancel
          </Button>
          <Button type="submit">{projectId ? "Update Project" : "Create Project"}</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
