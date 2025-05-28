"use client"

import type React from "react"

import { createContext, useContext, useState, useCallback, useEffect } from "react"
import type { AICompanionMessage } from "@/types/ai-companion"

type AICompanionMode = "assistant" | "coach" | "educator" | "reflector" | "systems_thinker"
type AICompanionTone = "formal" | "casual" | "encouraging" | "neutral"
type AICompanionState = "idle" | "thinking" | "responding" | "listening"
type AICompanionFramework = "individual" | "system" | "integrated"

interface AICompanionContextType {
  isOpen: boolean
  openCompanion: () => void
  closeCompanion: () => void
  messages: AICompanionMessage[]
  addMessage: (message: AICompanionMessage) => void
  clearMessages: () => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  mode: AICompanionMode
  setMode: (mode: AICompanionMode) => void
  tone: AICompanionTone
  setTone: (tone: AICompanionTone) => void
  state: AICompanionState
  setState: (state: AICompanionState) => void
  currentFlow: string | null
  setCurrentFlow: (flow: string | null) => void
  currentFramework: AICompanionFramework
  setCurrentFramework: (framework: AICompanionFramework) => void
  activeFlow: string | null
  setActiveFlow: (flow: string | null) => void
}

const AICompanionContext = createContext<AICompanionContextType | undefined>(undefined)

export function AICompanionProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<AICompanionMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [mode, setMode] = useState<AICompanionMode>("assistant")
  const [tone, setTone] = useState<AICompanionTone>("encouraging")
  const [state, setState] = useState<AICompanionState>("idle")
  const [currentFlow, setCurrentFlow] = useState<string | null>(null)
  const [currentFramework, setCurrentFramework] = useState<AICompanionFramework>("integrated")
  const [activeFlow, setActiveFlow] = useState<string | null>(null)

  const openCompanion = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeCompanion = useCallback(() => {
    setIsOpen(false)
  }, [])

  const addMessage = useCallback((message: AICompanionMessage) => {
    setMessages((prev) => [...prev, message])
  }, [])

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  // Load saved settings from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("aiCompanionMode")
    const savedTone = localStorage.getItem("aiCompanionTone")
    const savedFramework = localStorage.getItem("aiCompanionFramework")

    if (savedMode) setMode(savedMode as AICompanionMode)
    if (savedTone) setTone(savedTone as AICompanionTone)
    if (savedFramework) setCurrentFramework(savedFramework as AICompanionFramework)
  }, [])

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem("aiCompanionMode", mode)
    localStorage.setItem("aiCompanionTone", tone)
    localStorage.setItem("aiCompanionFramework", currentFramework)
  }, [mode, tone, currentFramework])

  return (
    <AICompanionContext.Provider
      value={{
        isOpen,
        openCompanion,
        closeCompanion,
        messages,
        addMessage,
        clearMessages,
        isLoading,
        setIsLoading,
        mode,
        setMode,
        tone,
        setTone,
        state,
        setState,
        currentFlow,
        setCurrentFlow,
        currentFramework,
        setCurrentFramework,
        activeFlow,
        setActiveFlow,
      }}
    >
      {children}
    </AICompanionContext.Provider>
  )
}

export function useAICompanion() {
  const context = useContext(AICompanionContext)
  if (context === undefined) {
    throw new Error("useAICompanion must be used within an AICompanionProvider")
  }
  return context
}
