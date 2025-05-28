"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"

// Define the types for project context
export interface ProjectContext {
  projectId: string
  projectName: string
  projectType: string
  projectPhase: string
  lastUpdated: Date
}

// Define the types for the bridge context
interface AIBridgeContextType {
  // Current active AI system
  activeSystem: "companion" | "project-assistant" | null
  setActiveSystem: (system: "companion" | "project-assistant" | null) => void

  // Project context for the AI systems
  currentProject: ProjectContext | null
  setCurrentProject: (project: ProjectContext | null) => void

  // Handoff functions
  handoffToCompanion: (message?: string, flow?: string) => void
  handoffToProjectAssistant: (message?: string, tool?: string) => void

  // Shared state
  sharedHistory: Array<{
    timestamp: Date
    system: "companion" | "project-assistant"
    action: string
    context?: any
  }>
  addToSharedHistory: (entry: { system: "companion" | "project-assistant"; action: string; context?: any }) => void

  // Suggestions
  suggestProjectAssistant: boolean
  setSuggestProjectAssistant: (suggest: boolean) => void

  // Last interaction
  lastInteraction: Date | null
  updateLastInteraction: () => void
}

// Create the context
const AIBridgeContext = createContext<AIBridgeContextType | undefined>(undefined)

// Hook for using the AI bridge
export function useAIBridge() {
  const context = useContext(AIBridgeContext)
  if (context === undefined) {
    throw new Error("useAIBridge must be used within an AIBridgeProvider")
  }
  return context
}

// Provider component
export function AIBridgeProvider({ children }: { children: React.ReactNode }) {
  // State for the bridge
  const [activeSystem, setActiveSystem] = useState<"companion" | "project-assistant" | null>(null)
  const [currentProject, setCurrentProject] = useState<ProjectContext | null>(null)
  const [sharedHistory, setSharedHistory] = useState<AIBridgeContextType["sharedHistory"]>([])
  const [suggestProjectAssistant, setSuggestProjectAssistant] = useState(false)
  const [lastInteraction, setLastInteraction] = useState<Date | null>(null)

  // Function to hand off to the AI Companion
  const handoffToCompanion = (message?: string, flow?: string) => {
    // Set the active system
    setActiveSystem("companion")

    // Add to shared history
    addToSharedHistory({
      system: "companion",
      action: "handoff-received",
      context: { message, flow },
    })

    // Note: The actual handoff to the Companion will be handled by the component
    // that uses this context, as we don't have direct access to its methods here
  }

  // Function to hand off to the Project Assistant
  const handoffToProjectAssistant = (message?: string, tool?: string) => {
    // Set the active system
    setActiveSystem("project-assistant")

    // Add to shared history
    addToSharedHistory({
      system: "project-assistant",
      action: "handoff-received",
      context: { message, tool },
    })

    // Note: The actual handoff to the Project Assistant will be handled by the component
    // that uses this context, as we don't have direct access to its methods here
  }

  // Function to add to shared history
  const addToSharedHistory = (entry: { system: "companion" | "project-assistant"; action: string; context?: any }) => {
    setSharedHistory((prev) => [
      ...prev,
      {
        timestamp: new Date(),
        ...entry,
      },
    ])
  }

  // Function to update last interaction
  const updateLastInteraction = () => {
    setLastInteraction(new Date())
  }

  // Provide the context
  return (
    <AIBridgeContext.Provider
      value={{
        activeSystem,
        setActiveSystem,
        currentProject,
        setCurrentProject,
        handoffToCompanion,
        handoffToProjectAssistant,
        sharedHistory,
        addToSharedHistory,
        suggestProjectAssistant,
        setSuggestProjectAssistant,
        lastInteraction,
        updateLastInteraction,
      }}
    >
      {children}
    </AIBridgeContext.Provider>
  )
}
