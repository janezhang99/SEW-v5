import type React from "react"

export type InteractionMode = "chat" | "guided"

export type TonePreference = "coaching" | "cheerleading" | "inquiry" | "directive" | "adaptive"

export type Message = {
  id: string
  role: "user" | "assistant" | "system"
  content: React.ReactNode
  timestamp: Date
  metadata?: {
    tone?: TonePreference
    visualAid?: string
    followUpPrompts?: string[]
  }
}

export type SkillLevel = "beginner" | "intermediate" | "advanced"
export type BusinessStage = "idea" | "startup" | "growth"
export type LearningStyle = "reflective" | "visual" | "practical"

export interface UserProfile {
  name: string
  skillLevel: SkillLevel
  businessStage: BusinessStage
  learningStyle: LearningStyle
  interests: string[]
  communityType: string
  projectType: string
  assessmentComplete: boolean
  tonePreference?: TonePreference
  strengths?: string[]
  areasForGrowth?: string[]
}

export type AvatarType = "fireweed" | "labrador-tea" | "yarrow" | "dwarf-birch" | "arctic-willow"

export interface AICompanionAvatar {
  id: AvatarType
  name: string
  description: string
  imageSrc: string
}

export interface ModuleFlow {
  id: string
  name: string
  description: string
  category: string
  skillLevel: string
  estimatedTimeMinutes: number
  steps: ModuleStep[]
}

export interface ModuleStep {
  id: string
  type: "prompt" | "question" | "information" | "exercise" | "reflection"
  content: string
  nextStepId?: string
  options?: ModuleOption[]
  metadata?: {
    tone?: TonePreference
    visualAid?: string
  }
}

export interface ModuleOption {
  text: string
  nextStepId: string
  metadata?: Record<string, any>
}

export interface AICompanionState {
  currentUser: UserProfile | null
  conversationHistory: Message[]
  interactionMode: InteractionMode
  isGenerating: boolean
  avatar: AvatarType
  activeModule?: ModuleFlow
  currentStepId?: string
}

export interface AICompanionContextType {
  avatars: AICompanionAvatar[]
  selectedAvatar: AICompanionAvatar
  setSelectedAvatar: (avatar: AICompanionAvatar) => void
  isMinimized: boolean
  setIsMinimized: (minimized: boolean) => void
  messages: any[]
  sendMessage: (message: string, isSystemMessage?: boolean) => Promise<void>
  isLoading: boolean
  contextualSuggestions: string[]
  state: AICompanionState
  startModule: (moduleId: string) => void
  updateUserProfile: (updates: Partial<UserProfile>) => void
  setInteractionMode: (mode: InteractionMode) => void
  generateResponse: (prompt: string, options?: { tone?: TonePreference }) => Promise<string>
  setAvatar: (avatar: AvatarType) => void
}
