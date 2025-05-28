"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { Heart, Users, Lightbulb, MapPin, Briefcase } from "lucide-react"

// Define the Task type
export interface Task {
  id: string
  name: string
  description: string
  category: string
  icon: React.ReactNode
  fundingAmount: number
  timeEstimate: string
  completed?: boolean
}

// Define the context type
interface TasksContextType {
  tasks: Task[]
  loading: boolean
  error: string | null
  completedTaskIds: string[]
  completeTask: (taskId: string) => void
  resetTask: (taskId: string) => void
  getTasksByCategory: (category: string) => Task[]
  getTaskById: (taskId: string) => Task | undefined
  getCompletedTasks: () => Task[]
  getPendingTasks: () => Task[]
  getTotalPotentialFunding: () => number
  getUnlockedFunding: () => number
}

// Create the context
const TasksContext = createContext<TasksContextType | undefined>(undefined)

// Map category names to icons
const categoryIcons: Record<string, React.ReactNode> = {
  personal: <Heart className="h-4 w-4" />,
  community: <Users className="h-4 w-4" />,
  project: <Lightbulb className="h-4 w-4" />,
  cultural: <MapPin className="h-4 w-4" />,
  business: <Briefcase className="h-4 w-4" />,
}

// Update the transformCSVToTasks function to better handle categories
const transformCSVToTasks = (csvData: any[]): Task[] => {
  if (!csvData || !Array.isArray(csvData)) return []

  return csvData
    .filter((item) => item && item["Card Name"] && item["List Name"]) // Filter out invalid entries
    .map((item) => {
      // Extract time estimate from description if available
      const description = item["Card Description"] || ""
      const timeEstimateMatch = description.match(/(\d+-\d+)\s+hours?/i)
      const timeEstimate = timeEstimateMatch ? timeEstimateMatch[0] : "1-2 hours"

      // Extract funding amount from description if available
      const fundingMatch = description.match(/\$(\d+)/i)
      const fundingAmount = fundingMatch ? Number.parseInt(fundingMatch[1]) : Math.floor(Math.random() * 200) + 100

      // Map list name to category
      let category = item["List Name"]?.toLowerCase() || "other"

      // Normalize category names for URL-friendly paths
      if (category.includes("personal")) category = "personal"
      else if (category.includes("community")) category = "community"
      else if (category.includes("project")) category = "project"
      else if (category.includes("cultural")) category = "cultural"
      else if (category.includes("business")) category = "business"
      else category = "other"

      return {
        id: item["Card ID"] || uuidv4(),
        name: item["Card Name"],
        description: description || `Complete the ${item["Card Name"]} task to unlock funding`,
        category,
        icon: categoryIcons[category] || <Lightbulb className="h-4 w-4" />,
        fundingAmount,
        timeEstimate,
      }
    })
}

// Create the provider component
export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([])

  // Load tasks from CSV data
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true)
        // Fetch the CSV data
        const response = await fetch(
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/XFAiwPkR%20-%20micro-grants-template-board%20%282%29-HIPqBWXiWVl7JyXr10adshBv5GMC3q.csv",
        )
        const csvText = await response.text()

        // Simple CSV parser
        function parseCSV(text: string) {
          const lines = text.split("\n")
          const headers = lines[0].split(",").map((header) => header.replace(/"/g, "").trim())

          const results = []
          for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue

            // Handle commas within quoted fields
            const row = []
            let inQuotes = false
            let currentValue = ""

            for (const char of lines[i]) {
              if (char === '"') {
                inQuotes = !inQuotes
              } else if (char === "," && !inQuotes) {
                row.push(currentValue.replace(/"/g, "").trim())
                currentValue = ""
              } else {
                currentValue += char
              }
            }
            row.push(currentValue.replace(/"/g, "").trim())

            const obj: Record<string, string> = {}
            for (let j = 0; j < headers.length; j++) {
              obj[headers[j]] = row[j] || null
            }
            results.push(obj)
          }

          return results
        }

        const data = parseCSV(csvText)
        const transformedTasks = transformCSVToTasks(data)

        // Load completed tasks from localStorage
        const savedCompletedTasks = localStorage.getItem("completedTasks")
        if (savedCompletedTasks) {
          setCompletedTaskIds(JSON.parse(savedCompletedTasks))
        }

        setTasks(transformedTasks)
      } catch (err) {
        console.error("Error loading tasks:", err)
        setError("Failed to load tasks. Please try again later.")

        // Fallback to default tasks if there's an error
        setTasks([
          {
            id: "personal-why",
            name: "Personal Why",
            description: "Reflect on what this project means to you and why you feel connected to it",
            category: "personal",
            icon: <Heart className="h-4 w-4" />,
            fundingAmount: 100,
            timeEstimate: "1-2 hours",
          },
          {
            id: "community-need",
            name: "Community Need",
            description: "Identify a specific need in your community that your project will address",
            category: "community",
            icon: <Users className="h-4 w-4" />,
            fundingAmount: 150,
            timeEstimate: "2-3 hours",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  // Save completed tasks to localStorage when they change
  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify(completedTaskIds))
  }, [completedTaskIds])

  // Complete a task
  const completeTask = (taskId: string) => {
    if (!completedTaskIds.includes(taskId)) {
      setCompletedTaskIds((prev) => [...prev, taskId])
    }
  }

  // Reset a task
  const resetTask = (taskId: string) => {
    setCompletedTaskIds((prev) => prev.filter((id) => id !== taskId))
  }

  // Get tasks by category
  const getTasksByCategory = (category: string) => {
    return tasks.filter((task) => task.category === category)
  }

  // Get task by ID
  const getTaskById = (taskId: string) => {
    return tasks.find((task) => task.id === taskId)
  }

  // Get completed tasks
  const getCompletedTasks = () => {
    return tasks.filter((task) => completedTaskIds.includes(task.id))
  }

  // Get pending tasks
  const getPendingTasks = () => {
    return tasks.filter((task) => !completedTaskIds.includes(task.id))
  }

  // Get total potential funding
  const getTotalPotentialFunding = () => {
    return tasks.reduce((total, task) => total + task.fundingAmount, 0)
  }

  // Get unlocked funding
  const getUnlockedFunding = () => {
    return getCompletedTasks().reduce((total, task) => total + task.fundingAmount, 0)
  }

  const value = {
    tasks,
    loading,
    error,
    completedTaskIds,
    completeTask,
    resetTask,
    getTasksByCategory,
    getTaskById,
    getCompletedTasks,
    getPendingTasks,
    getTotalPotentialFunding,
    getUnlockedFunding,
  }

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
}

// Create a hook to use the tasks context
export const useTasks = () => {
  const context = useContext(TasksContext)
  if (context === undefined) {
    throw new Error("useTasks must be used within a TasksProvider")
  }
  return context
}
