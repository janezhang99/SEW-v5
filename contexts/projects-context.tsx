"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type ProjectStatus = "planning" | "in-progress" | "on-hold" | "completed"

export type ProjectPriority = "low" | "medium" | "high" | "urgent"

export interface Task {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "completed"
  priority: ProjectPriority
  dueDate: string | null
  assignedTo: string | null
  createdAt: string
}

export interface Milestone {
  id: string
  title: string
  description: string
  dueDate: string
  completed: boolean
}

export interface Collaborator {
  id: string
  name: string
  email: string
  role: string
  avatar: string | null
}

export interface Project {
  id: string
  title: string
  description: string
  status: ProjectStatus
  priority: ProjectPriority
  startDate: string
  endDate: string | null
  budget: number | null
  tasks: Task[]
  milestones: Milestone[]
  collaborators: Collaborator[]
  createdAt: string
  updatedAt: string
}

interface ProjectsContextType {
  projects: Project[]
  loading: boolean
  error: string | null
  addProject: (project: Omit<Project, "id" | "createdAt" | "updatedAt">) => void
  updateProject: (id: string, project: Partial<Project>) => void
  deleteProject: (id: string) => void
  getProject: (id: string) => Project | undefined
  addTask: (projectId: string, task: Omit<Task, "id" | "createdAt">) => void
  updateTask: (projectId: string, taskId: string, task: Partial<Task>) => void
  deleteTask: (projectId: string, taskId: string) => void
  addMilestone: (projectId: string, milestone: Omit<Milestone, "id">) => void
  updateMilestone: (projectId: string, milestoneId: string, milestone: Partial<Milestone>) => void
  deleteMilestone: (projectId: string, milestoneId: string) => void
  addCollaborator: (projectId: string, collaborator: Omit<Collaborator, "id">) => void
  removeCollaborator: (projectId: string, collaboratorId: string) => void
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined)

// Sample data for demonstration
const sampleProjects: Project[] = [
  {
    id: "1",
    title: "Community Garden Initiative",
    description: "Establish a community garden to promote sustainable food practices and community engagement.",
    status: "in-progress",
    priority: "high",
    startDate: "2023-06-15",
    endDate: "2023-12-31",
    budget: 5000,
    tasks: [
      {
        id: "task-1",
        title: "Secure location",
        description: "Find and secure a suitable location for the community garden",
        status: "completed",
        priority: "high",
        dueDate: "2023-07-01",
        assignedTo: "user-1",
        createdAt: "2023-06-15",
      },
      {
        id: "task-2",
        title: "Purchase supplies",
        description: "Purchase seeds, tools, and other necessary supplies",
        status: "in-progress",
        priority: "medium",
        dueDate: "2023-07-15",
        assignedTo: "user-2",
        createdAt: "2023-06-20",
      },
      {
        id: "task-3",
        title: "Recruit volunteers",
        description: "Recruit community members to help with the garden",
        status: "todo",
        priority: "medium",
        dueDate: "2023-08-01",
        assignedTo: null,
        createdAt: "2023-06-25",
      },
    ],
    milestones: [
      {
        id: "milestone-1",
        title: "Garden location secured",
        description: "Finalize the location for the community garden",
        dueDate: "2023-07-01",
        completed: true,
      },
      {
        id: "milestone-2",
        title: "First planting day",
        description: "Complete the first community planting day",
        dueDate: "2023-08-15",
        completed: false,
      },
    ],
    collaborators: [
      {
        id: "user-1",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "Project Lead",
        avatar: null,
      },
      {
        id: "user-2",
        name: "John Doe",
        email: "john@example.com",
        role: "Volunteer Coordinator",
        avatar: null,
      },
    ],
    createdAt: "2023-06-10",
    updatedAt: "2023-07-05",
  },
  {
    id: "2",
    title: "Youth Entrepreneurship Workshop",
    description: "Organize a workshop series to teach entrepreneurship skills to local youth.",
    status: "planning",
    priority: "medium",
    startDate: "2023-09-01",
    endDate: "2023-11-30",
    budget: 3000,
    tasks: [
      {
        id: "task-4",
        title: "Develop curriculum",
        description: "Create workshop curriculum and materials",
        status: "in-progress",
        priority: "high",
        dueDate: "2023-08-15",
        assignedTo: "user-3",
        createdAt: "2023-07-01",
      },
      {
        id: "task-5",
        title: "Secure venue",
        description: "Find and book a suitable venue for the workshops",
        status: "todo",
        priority: "medium",
        dueDate: "2023-08-20",
        assignedTo: null,
        createdAt: "2023-07-05",
      },
    ],
    milestones: [
      {
        id: "milestone-3",
        title: "Curriculum finalized",
        description: "Complete the workshop curriculum and materials",
        dueDate: "2023-08-15",
        completed: false,
      },
      {
        id: "milestone-4",
        title: "First workshop",
        description: "Successfully conduct the first workshop",
        dueDate: "2023-09-15",
        completed: false,
      },
    ],
    collaborators: [
      {
        id: "user-3",
        name: "Emily Johnson",
        email: "emily@example.com",
        role: "Curriculum Developer",
        avatar: null,
      },
    ],
    createdAt: "2023-06-25",
    updatedAt: "2023-07-10",
  },
  {
    id: "3",
    title: "Local Artisan Market",
    description: "Organize a monthly market for local artisans to showcase and sell their products.",
    status: "planning",
    priority: "low",
    startDate: "2023-10-01",
    endDate: null,
    budget: 2000,
    tasks: [
      {
        id: "task-6",
        title: "Vendor outreach",
        description: "Contact local artisans to gauge interest",
        status: "todo",
        priority: "high",
        dueDate: "2023-08-30",
        assignedTo: null,
        createdAt: "2023-07-15",
      },
    ],
    milestones: [
      {
        id: "milestone-5",
        title: "Vendor list finalized",
        description: "Complete the list of participating vendors",
        dueDate: "2023-09-15",
        completed: false,
      },
    ],
    collaborators: [],
    createdAt: "2023-07-15",
    updatedAt: "2023-07-15",
  },
]

export const ProjectsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(sampleProjects)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const addProject = (project: Omit<Project, "id" | "createdAt" | "updatedAt">) => {
    const now = new Date().toISOString()
    const newProject: Project = {
      ...project,
      id: `project-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    }
    setProjects([...projects, newProject])
  }

  const updateProject = (id: string, updatedFields: Partial<Project>) => {
    setProjects(
      projects.map((project) =>
        project.id === id
          ? {
              ...project,
              ...updatedFields,
              updatedAt: new Date().toISOString(),
            }
          : project,
      ),
    )
  }

  const deleteProject = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id))
  }

  const getProject = (id: string) => {
    return projects.find((project) => project.id === id)
  }

  const addTask = (projectId: string, task: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: [...project.tasks, newTask],
              updatedAt: new Date().toISOString(),
            }
          : project,
      ),
    )
  }

  const updateTask = (projectId: string, taskId: string, updatedFields: Partial<Task>) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.map((task) =>
                task.id === taskId
                  ? {
                      ...task,
                      ...updatedFields,
                    }
                  : task,
              ),
              updatedAt: new Date().toISOString(),
            }
          : project,
      ),
    )
  }

  const deleteTask = (projectId: string, taskId: string) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.filter((task) => task.id !== taskId),
              updatedAt: new Date().toISOString(),
            }
          : project,
      ),
    )
  }

  const addMilestone = (projectId: string, milestone: Omit<Milestone, "id">) => {
    const newMilestone: Milestone = {
      ...milestone,
      id: `milestone-${Date.now()}`,
    }
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              milestones: [...project.milestones, newMilestone],
              updatedAt: new Date().toISOString(),
            }
          : project,
      ),
    )
  }

  const updateMilestone = (projectId: string, milestoneId: string, updatedFields: Partial<Milestone>) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              milestones: project.milestones.map((milestone) =>
                milestone.id === milestoneId
                  ? {
                      ...milestone,
                      ...updatedFields,
                    }
                  : milestone,
              ),
              updatedAt: new Date().toISOString(),
            }
          : project,
      ),
    )
  }

  const deleteMilestone = (projectId: string, milestoneId: string) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              milestones: project.milestones.filter((milestone) => milestone.id !== milestoneId),
              updatedAt: new Date().toISOString(),
            }
          : project,
      ),
    )
  }

  const addCollaborator = (projectId: string, collaborator: Omit<Collaborator, "id">) => {
    const newCollaborator: Collaborator = {
      ...collaborator,
      id: `user-${Date.now()}`,
    }
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              collaborators: [...project.collaborators, newCollaborator],
              updatedAt: new Date().toISOString(),
            }
          : project,
      ),
    )
  }

  const removeCollaborator = (projectId: string, collaboratorId: string) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              collaborators: project.collaborators.filter((collaborator) => collaborator.id !== collaboratorId),
              updatedAt: new Date().toISOString(),
            }
          : project,
      ),
    )
  }

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        loading,
        error,
        addProject,
        updateProject,
        deleteProject,
        getProject,
        addTask,
        updateTask,
        deleteTask,
        addMilestone,
        updateMilestone,
        deleteMilestone,
        addCollaborator,
        removeCollaborator,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  )
}

export const useProjects = () => {
  const context = useContext(ProjectsContext)
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectsProvider")
  }
  return context
}
