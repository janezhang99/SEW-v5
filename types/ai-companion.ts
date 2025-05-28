// AI Companion Modes
export type AICompanionMode =
  | "assistant" // General purpose assistant
  | "coach" // Focused on guiding and motivating
  | "educator" // Focused on teaching and explaining
  | "reflector" // Focused on prompting reflection and meaning-making
  | "systems_thinker" // Focused on ecological and community resilience

// AI Companion Tones
export type AICompanionTone =
  | "coach" // Encouraging, supportive
  | "instructor" // Formal, structured
  | "socratic" // Question-based, reflective
  | "strengths_based" // Positive, affirming, growth-oriented
  | "systems_oriented" // Ecological, interconnected, resilience-focused

// AI Companion States
export type AICompanionState =
  | "idle" // Not actively engaged
  | "in_flow" // In a specific conversation flow
  | "thinking" // Processing a response
  | "error" // Encountered an error
  | "reflecting" // Prompting user reflection
  | "celebrating" // Acknowledging progress or achievement
  | "analyzing" // Analyzing systems or relationships

// AI Companion Flows
export type AICompanionFlow =
  | "grant_readiness" // Help with grant applications
  | "course_recommendation" // Recommend courses based on interests
  | "socratic_dialogue" // Guided exploration of a topic
  | "onboarding" // Platform onboarding
  | "story_support" // Help with sharing adaptation stories
  | "knowledge_check" // Quiz or reflection
  | "problem_solving" // Structured problem-solving
  | "reflection" // Values-based reflection
  | "resilience_boost" // Encouragement and reframing
  | "strengths_highlight" // Identifying and affirming strengths
  | "progress_celebration" // Celebrating milestones
  | "flow_check" // Checking engagement and focus
  | "values_alignment" // Aligning tasks with values
  | "system_scan" // Analyzing system components and relationships
  | "project_planning" // Planning based on resilience indicators
  | "stakeholder_mapping" // Identifying and analyzing stakeholders
  | "feedback_loops" // Identifying feedback loops in systems
  | "adaptive_capacity" // Assessing adaptive capacity

// AI Companion Message
export interface AICompanionMessage {
  role: "user" | "assistant" | "system"
  content: string
  timestamp: string
  flowStep?: number
  metadata?: Record<string, any>
}

// AI Companion Flow Definition
export interface AICompanionFlowDefinition {
  id: AICompanionFlow
  name: string
  description: string
  steps: AICompanionFlowStep[]
  defaultTone: AICompanionTone
  framework: "individual" | "system" | "integrated" // New field for framework type
}

// AI Companion Flow Step
export interface AICompanionFlowStep {
  id: string
  type: "question" | "information" | "input" | "choice" | "reflection" | "analysis"
  content: string
  options?: string[]
  nextStep?: string | ((response: any) => string)
  validation?: (response: any) => boolean
}

// New types for positive psychology integration

export type StrengthCategory =
  | "wisdom" // Cognitive strengths
  | "courage" // Emotional strengths
  | "humanity" // Interpersonal strengths
  | "justice" // Civic strengths
  | "temperance" // Strengths that protect against excess
  | "transcendence" // Strengths that provide meaning

export type VIAStrength =
  | "creativity"
  | "curiosity"
  | "judgment"
  | "love_of_learning"
  | "perspective" // Wisdom
  | "bravery"
  | "perseverance"
  | "honesty"
  | "zest" // Courage
  | "love"
  | "kindness"
  | "social_intelligence" // Humanity
  | "teamwork"
  | "fairness"
  | "leadership" // Justice
  | "forgiveness"
  | "humility"
  | "prudence"
  | "self_regulation" // Temperance
  | "appreciation"
  | "gratitude"
  | "hope"
  | "humor"
  | "spirituality" // Transcendence

export type FlourishingIndicator =
  | "positive_emotion" // Feeling good
  | "engagement" // Flow state
  | "relationships" // Positive connections
  | "meaning" // Purpose
  | "accomplishment" // Achievement
  | "vitality" // Energy and aliveness

export type FlourishingStatus = "growing" | "flowing" | "thriving" | "challenged" | "renewing"

export interface UserStrength {
  strength: VIAStrength
  category: StrengthCategory
  level: number // 1-5
  lastObserved?: string // timestamp
  examples?: string[] // User-provided or observed examples
}

export interface FlourishingData {
  status: FlourishingStatus
  indicators: Partial<Record<FlourishingIndicator, number>> // 1-10 scale
  strengths: UserStrength[]
  reflections: {
    prompt: string
    response: string
    timestamp: string
  }[]
  streaks: {
    type: string
    count: number
    lastUpdated: string
  }[]
  milestones: {
    id: string
    title: string
    description: string
    achievedAt: string
  }[]
}

// New types for system-level framework

export type SystemDomain =
  | "ecological" // Natural systems
  | "social" // Social systems and networks
  | "economic" // Economic systems
  | "governance" // Governance and policy systems
  | "infrastructure" // Built environment and infrastructure
  | "knowledge" // Knowledge systems and learning

export type ResilienceIndicator =
  | "diversity" // Variety of components
  | "connectivity" // Connections between components
  | "feedback" // Information flow and response
  | "learning" // Capacity to learn and adapt
  | "self_organization" // Ability to reorganize
  | "redundancy" // Backup systems and functions
  | "inclusion" // Inclusion of diverse perspectives
  | "agency" // Ability to act and influence

export type SystemScale =
  | "individual" // Individual level
  | "household" // Household level
  | "community" // Community level
  | "municipal" // Municipal level
  | "regional" // Regional level
  | "national" // National level
  | "global" // Global level

export interface SystemComponent {
  name: string
  domain: SystemDomain
  description: string
  connections: string[] // Names of connected components
  vulnerabilities: string[]
  strengths: string[]
}

export interface FeedbackLoop {
  name: string
  type: "reinforcing" | "balancing"
  components: string[] // Names of components in the loop
  description: string
}

export interface Stakeholder {
  name: string
  type: "individual" | "group" | "organization" | "institution"
  interests: string[]
  influence: number // 1-5
  impact: number // 1-5 (how much they're impacted)
}

export interface SystemData {
  components: SystemComponent[]
  feedbackLoops: FeedbackLoop[]
  stakeholders: Stakeholder[]
  scales: SystemScale[]
  indicators: Partial<Record<ResilienceIndicator, number>> // 1-10 scale
}

// Card types for modular companion cards
export type CompanionCardType =
  | "reflection_prompt"
  | "resilience_boost"
  | "strengths_highlight"
  | "progress_celebration"
  | "flow_check"
  | "values_check"
  | "system_scan"
  | "project_planning"
  | "stakeholder_mapping"
  | "feedback_loops"
  | "adaptive_capacity"

export interface CompanionCard {
  type: CompanionCardType
  title: string
  content: string
  framework: "individual" | "system" | "integrated"
  actions?: {
    label: string
    action: string
  }[]
  metadata?: Record<string, any>
}

// Framework preference
export interface FrameworkPreference {
  individual: number // 1-10 scale
  system: number // 1-10 scale
  defaultFramework: "individual" | "system" | "integrated"
}
