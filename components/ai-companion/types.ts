// Core types for the enhanced AI Companion

export type LearningStyle = "reflective" | "visual" | "practical" | "collaborative" | "independent"
export type CommunicationPreference = "detailed" | "concise" | "visual" | "metaphorical" | "straightforward"
export type SkillLevel = "beginner" | "intermediate" | "advanced"
export type BusinessStage = "idea" | "startup" | "growth"
export type TonePreference = "coaching" | "cheerleading" | "inquiry" | "directive" | "adaptive"
export type InteractionMode = "chat" | "guided" | "assessment" | "tutorial"
export type AvatarType = "fireweed" | "labrador-tea" | "yarrow" | "dwarf-birch" | "arctic-willow"

export interface UserProfile {
  id: string
  name: string
  skillLevel: SkillLevel
  businessStage: BusinessStage
  learningStyle: LearningStyle
  communicationPreference: CommunicationPreference
  tonePreference: TonePreference
  interests: string[]
  communityType: string
  projectType: string
  strengths: string[]
  areasForGrowth: string[]
  assessmentComplete: boolean
  cognitiveProfile?: CognitiveProfile
  preferredAvatar?: AvatarType
}

export interface CognitiveProfile {
  abstractionLevel: number // 1-10 scale of concrete to abstract thinking
  detailOrientation: number // 1-10 scale of big picture to detail focus
  riskTolerance: number // 1-10 scale of risk-averse to risk-seeking
  decisionSpeed: number // 1-10 scale of deliberate to quick
  feedbackReceptivity: number // 1-10 scale of defensive to receptive
  learningPace: number // 1-10 scale of methodical to rapid
  lastUpdated: Date
}

export interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
  metadata?: {
    tone?: TonePreference
    interactionType?: "question" | "statement" | "reflection" | "request"
    emotionalState?: "confused" | "frustrated" | "excited" | "neutral" | "uncertain"
    followUpPrompts?: string[]
    resourceLinks?: { title: string; url: string }[]
  }
}

export interface ModuleFlow {
  id: string
  name: string
  description: string
  category: "assessment" | "tutorial" | "reflection" | "planning" | "feedback"
  steps: FlowStep[]
  prerequisites?: string[] // IDs of modules that should be completed first
  skillLevel: SkillLevel | "all"
  estimatedTimeMinutes: number
}

export interface FlowStep {
  id: string
  type: "prompt" | "question" | "information" | "exercise" | "reflection" | "decision"
  content: string
  options?: {
    text: string
    nextStepId: string
    metadata?: Record<string, any>
  }[]
  nextStepId?: string
  metadata?: {
    tone?: TonePreference
    resourceLinks?: { title: string; url: string }[]
    examples?: string[]
    visualAid?: string // URL or component reference
  }
}

export interface AICompanionState {
  currentUser: UserProfile | null
  conversationHistory: Message[]
  activeModule?: ModuleFlow
  currentStepId?: string
  interactionMode: InteractionMode
  isGenerating: boolean
  error?: string
  avatar: AvatarType
}

export interface AICompanionContextType {
  state: AICompanionState
  sendMessage: (content: string, isAssistant?: boolean) => Promise<void>
  startModule: (moduleId: string) => void
  updateUserProfile: (updates: Partial<UserProfile>) => void
  setInteractionMode: (mode: InteractionMode) => void
  generateResponse: (prompt: string, options?: { tone?: TonePreference }) => Promise<string>
  setAvatar: (avatar: AvatarType) => void
}
