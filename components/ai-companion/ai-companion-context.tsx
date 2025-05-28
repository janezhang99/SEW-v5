"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { usePathname } from "next/navigation"
import { useExpenses } from "@/contexts/expenses-context"
import { useTasks } from "@/contexts/tasks-context"
import type {
  AICompanionContextType,
  AICompanionState,
  InteractionMode,
  Message,
  ModuleFlow,
  TonePreference,
  UserProfile,
  AvatarType,
} from "./types"
import type { AICompanionAvatar } from "./types"
// Sample module flows - in production these would come from a database or API
import { assessmentModule, budgetingTutorialModule } from "./module-flows"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { v4 as uuidv4 } from "uuid"

const defaultAvatars: AICompanionAvatar[] = [
  {
    id: "fireweed",
    name: "Fireweed",
    description: "Enthusiastic and encouraging. Helps you stay motivated.",
    imageSrc: "/avatars/fireweed.png",
  },
  {
    id: "labrador-tea",
    name: "Labrador Tea",
    description: "Analytical and detail-oriented. Helps with planning and organization.",
    imageSrc: "/avatars/labrador-tea.png",
  },
  {
    id: "yarrow",
    name: "Yarrow",
    description: "Calm and thoughtful. Provides balanced perspectives.",
    imageSrc: "/avatars/yarrow.png",
  },
  {
    id: "dwarf-birch",
    name: "Dwarf Birch",
    description: "Practical and direct. Focuses on actionable steps.",
    imageSrc: "/avatars/dwarf-birch.png",
  },
  {
    id: "arctic-willow",
    name: "Arctic Willow",
    name: "Arctic Willow",
    description: "Creative and innovative. Helps you think outside the box.",
    imageSrc: "/avatars/arctic-willow.png",
  },
]

const moduleFlows: Record<string, ModuleFlow> = {
  assessment: assessmentModule,
  budgetingTutorial: budgetingTutorialModule,
}

const initialState: AICompanionState = {
  currentUser: null,
  conversationHistory: [],
  interactionMode: "chat",
  isGenerating: false,
  avatar: "fireweed", // Default avatar
}

export const AICompanionContext = createContext<AICompanionContextType | undefined>(undefined)

export const AICompanionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedAvatar, setSelectedAvatar] = useState<AICompanionAvatar>(defaultAvatars[0])
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<any[]>([])
  const [contextualSuggestions, setContextualSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [state, setState] = useState<AICompanionState>(initialState)

  const pathname = usePathname()
  const { expenses } = useExpenses()
  const { tasks } = useTasks()

  // Initialize with welcome message
  useEffect(() => {
    if (state.conversationHistory.length === 0) {
      const welcomeMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content:
          "Welcome to Small Economy Works! I'm your AI companion, here to guide you through your entrepreneurial journey. How can I help you today?",
        timestamp: new Date(),
      }
      setState((prev) => ({
        ...prev,
        conversationHistory: [welcomeMessage],
      }))
    }
  }, [])

  // Load user profile and avatar from local storage or API
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        // In a real app, this would come from an API or database
        const savedProfile = localStorage.getItem("userProfile")
        const savedAvatar = localStorage.getItem("preferredAvatar")

        if (savedProfile) {
          setState((prev) => ({
            ...prev,
            currentUser: JSON.parse(savedProfile),
          }))
        }

        if (savedAvatar) {
          setState((prev) => ({
            ...prev,
            avatar: savedAvatar as AvatarType,
          }))
        }
      } catch (error) {
        console.error("Error loading user profile:", error)
      }
    }

    loadUserProfile()
  }, [])

  // Save user profile when it changes
  useEffect(() => {
    if (state.currentUser) {
      localStorage.setItem("userProfile", JSON.stringify(state.currentUser))
    }
  }, [state.currentUser])

  // Save avatar preference when it changes
  useEffect(() => {
    localStorage.setItem("preferredAvatar", state.avatar)
  }, [state.avatar])

  // Generate contextual suggestions based on current path and data
  useEffect(() => {
    // Extract the current section and possible ID from the path
    const pathParts = pathname.split("/").filter(Boolean)
    const section = pathParts[1] || "dashboard"
    const itemId = pathParts[2]

    let newSuggestions: string[] = []

    // Generate context-aware suggestions
    switch (section) {
      case "projects":
        newSuggestions = [
          "How do I create an effective plan?",
          "What makes a good milestone?",
          "Tips for managing collaborators",
          "Help me organize my tasks",
        ]
        break

      case "expenses":
        newSuggestions = [
          "How should I categorize my expenses?",
          "Tips for budget management",
          "How to create an expense report",
          "Help me track project-related expenses",
        ]
        break

      case "learning":
        newSuggestions = [
          "What skills should I focus on developing?",
          "How can I apply what I've learned to my projects?",
          "Recommend learning resources for project management",
          "Help me create a learning plan",
        ]
        break

      case "funding":
        newSuggestions = [
          "How do I write an effective grant application?",
          "What funding sources should I consider?",
          "Tips for budget planning in grant applications",
          "Help me prepare for a funder meeting",
        ]
        break

      case "mentorship":
        newSuggestions = [
          "How do I get the most out of mentorship?",
          "What questions should I ask my mentor?",
          "How to prepare for a mentorship session",
          "Help me find a mentor for my project",
        ]
        break

      case "community":
        newSuggestions = [
          "How can I engage my community in my project?",
          "Tips for building partnerships",
          "How to organize a community event",
          "Help me create a community outreach plan",
        ]
        break

      default:
        // Dashboard or other pages
        newSuggestions = [
          "What should I focus on today?",
          "Help me prioritize my tasks",
          "How can I improve my project management?",
          "Tips for small economy entrepreneurs",
        ]
    }

    setContextualSuggestions(newSuggestions)
  }, [pathname])

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setState((prev) => ({
      ...prev,
      currentUser: prev.currentUser
        ? {
            ...prev.currentUser,
            ...updates,
          }
        : null,
    }))
  }

  const setInteractionMode = (mode: InteractionMode) => {
    setState((prev) => ({
      ...prev,
      interactionMode: mode,
    }))
  }

  const setAvatar = (avatar: AvatarType) => {
    setState((prev) => ({
      ...prev,
      avatar,
    }))

    // Add a system message about the avatar change
    const systemMessage: Message = {
      id: uuidv4(),
      role: "system",
      content: `Avatar changed to ${avatar}`,
      timestamp: new Date(),
    }

    // Add a welcome message from the new avatar
    const welcomeMessages: Record<AvatarType, string> = {
      fireweed:
        "I'm Fireweed, your guide of renewal. I'm here to help you start fresh and build momentum. What would you like to work on today?",
      "labrador-tea":
        "I'm Labrador Tea, your guide of reflection. Let's take a moment to think deeply about your journey. What's on your mind?",
      yarrow:
        "I'm Yarrow, your guide of structure. I'll help you build a strong foundation for your project. What do you need to organize today?",
      "dwarf-birch":
        "I'm Dwarf Birch, your guide of connection. I'm here to help you build relationships and community around your project. How can we connect today?",
      "arctic-willow":
        "I'm Arctic Willow, your guide of resilience. I'll help you persist through challenges and grow stronger. What are you working through today?",
    }

    const assistantMessage: Message = {
      id: uuidv4(),
      role: "assistant",
      content: welcomeMessages[avatar],
      timestamp: new Date(),
    }

    setState((prev) => ({
      ...prev,
      conversationHistory: [...prev.conversationHistory, systemMessage, assistantMessage],
    }))
  }

  const startModule = (moduleId: string) => {
    const module = moduleFlows[moduleId]
    if (!module) {
      console.error(`Module ${moduleId} not found`)
      return
    }

    const firstStep = module.steps[0]
    const systemMessage: Message = {
      id: uuidv4(),
      role: "system",
      content: `Starting module: ${module.name}`,
      timestamp: new Date(),
    }

    const assistantMessage: Message = {
      id: uuidv4(),
      role: "assistant",
      content: firstStep.content,
      timestamp: new Date(),
      metadata: {
        tone: firstStep.metadata?.tone || "coaching",
        followUpPrompts: firstStep.options?.map((opt) => opt.text),
      },
    }

    setState((prev) => ({
      ...prev,
      activeModule: module,
      currentStepId: firstStep.id,
      interactionMode: "guided",
      conversationHistory: [...prev.conversationHistory, systemMessage, assistantMessage],
    }))
  }

  const generateResponse = useCallback(
    async (prompt: string, options?: { tone?: TonePreference }) => {
      try {
        // Create system prompt based on user profile, avatar, and preferences
        const systemPrompt = createSystemPrompt(state.currentUser, state.avatar, options?.tone)

        // Get conversation history in the format expected by the AI
        const conversationContext = state.conversationHistory
          .filter((msg) => msg.role !== "system")
          .slice(-10) // Last 10 messages for context
          .map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
          .join("\n")

        const { text } = await generateText({
          model: openai("gpt-4o"),
          system: systemPrompt,
          prompt: `${conversationContext}\n\nUser: ${prompt}\n\nAssistant:`,
        })

        return text
      } catch (error) {
        console.error("Error generating AI response:", error)
        throw error
      }
    },
    [state.currentUser, state.avatar, state.conversationHistory],
  )

  // Simulate AI response
  const sendMessage = useCallback(
    async (message: string) => {
      setIsLoading(true)

      // Add user message
      setMessages((prev) => [...prev, { role: "user", content: message }])

      // Simulate AI thinking
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate contextual response based on message and current section
      let response = ""
      const pathParts = pathname.split("/").filter(Boolean)
      const section = pathParts[1] || "dashboard"

      // Simple pattern matching for demo purposes
      if (message.toLowerCase().includes("project")) {
        response =
          "I can help you organize your initiatives and track progress. What specific aspect would you like help with?"
      } else if (message.toLowerCase().includes("expense") || message.toLowerCase().includes("budget")) {
        response =
          "Managing expenses is crucial for the success of your initiatives. Small Economy Works provides tools to track expenses, categorize them, and generate reports. Would you like tips on budget management or help with a specific expense-related task?"
      } else if (message.toLowerCase().includes("learn")) {
        response =
          "Continuous learning is a key value at Small Economy Works. Our learning modules cover financial literacy, community engagement, and more. What skills are you interested in developing?"
      } else if (message.toLowerCase().includes("mentor")) {
        response =
          "Mentorship can accelerate your growth and help you navigate challenges. Small Economy Works connects you with experienced mentors who can provide guidance specific to your needs. Would you like help finding a mentor or preparing for a mentorship session?"
      } else if (message.toLowerCase().includes("community")) {
        response =
          "Community is at the heart of Small Economy Works. Building strong relationships and networks can amplify your impact. How are you currently engaging with your community, and how can I help you strengthen those connections?"
      } else {
        response =
          "I'm here to help you navigate Small Economy Works and make the most of the platform. I can assist with expense tracking, learning resources, funding opportunities, mentorship, and community engagement. What would you like to focus on today?"
      }

      // Add AI response
      setMessages((prev) => [...prev, { role: "assistant", content: response }])
      setIsLoading(false)

      // Generate new contextual suggestions based on the conversation
      const newSuggestions = [
        "Tell me more about that",
        "How can I get started?",
        "What resources are available?",
        "Show me an example",
      ]
      setContextualSuggestions(newSuggestions)
    },
    [pathname],
  )

  const handleGuidedInteraction = async (
    userInput: string,
    module: ModuleFlow,
    currentStepId: string,
  ): Promise<string> => {
    const currentStep = module.steps.find((step) => step.id === currentStepId)
    if (!currentStep) {
      return "I'm sorry, I couldn't find the current step in this module."
    }

    // If the current step has options, try to match the user input to an option
    if (currentStep.options && currentStep.options.length > 0) {
      const matchedOption = currentStep.options.find((opt) => userInput.toLowerCase().includes(opt.text.toLowerCase()))

      if (matchedOption) {
        const nextStep = module.steps.find((step) => step.id === matchedOption.nextStepId)
        if (nextStep) {
          // Update the current step
          setState((prev) => ({
            ...prev,
            currentStepId: nextStep.id,
          }))
          return nextStep.content
        }
      }
    }

    // If there's a direct next step, use that
    if (currentStep.nextStepId) {
      const nextStep = module.steps.find((step) => step.id === currentStep.nextStepId)
      if (nextStep) {
        // Update the current step
        setState((prev) => ({
          ...prev,
          currentStepId: nextStep.id,
        }))
        return nextStep.content
      }
    }

    // If we couldn't determine the next step, generate a response based on the user input
    return generateResponse(userInput, { tone: currentStep.metadata?.tone })
  }

  const createSystemPrompt = (user: UserProfile | null, avatar: AvatarType, overrideTone?: TonePreference): string => {
    // Avatar-specific personality and tone
    const avatarPersonality = getAvatarPersonality(avatar)

    if (!user) {
      return `
You are an AI companion for Small Economy Works, a program that supports youth entrepreneurship in rural, remote, Northern, and Indigenous communities.
Your role is to guide users through their learning journey, which is also their micro-grant application process.
Be supportive, culturally responsive, and focus on practical advice.

${avatarPersonality}
      `
    }

    const tone = overrideTone || user.tonePreference || "adaptive"
    const toneGuidance = getToneGuidance(tone, user)

    return `
You are an AI companion for Small Economy Works, a program that supports youth entrepreneurship in rural, remote, Northern, and Indigenous communities.
You're helping ${user.name}, who is at the ${user.skillLevel} skill level, in the ${user.businessStage} stage of their ${
      user.projectType
    } project.
They have a ${user.learningStyle} learning style and are from a ${user.communityType} community.
Their interests include: ${user.interests.join(", ")}.
Their strengths include: ${user.strengths?.join(", ") || "Not yet identified"}.
Areas they want to grow in: ${user.areasForGrowth?.join(", ") || "Not yet identified"}.

${avatarPersonality}

${toneGuidance}

Your role is to guide them through their learning journey, which is also their micro-grant application process. As they complete learning tasks, they unlock portions of grant funding.
Be supportive, culturally responsive, and focus on practical advice that connects to their community context.
    `
  }

  const getAvatarPersonality = (avatar: AvatarType): string => {
    const personalities: Record<AvatarType, string> = {
      fireweed: `
You are Fireweed, the Guide of Renewal. Your personality is:
- Motivational and energetic
- Quick, uplifting, and future-oriented
- You excel at helping users get started or recover from setbacks
- You use phrases like "Let's rebuild from what you already know" and "Every forest starts again. Where do you want to begin?"
- Your tone is encouraging and focuses on new beginnings and possibilities
      `,
      "labrador-tea": `
You are Labrador Tea, the Guide of Reflection. Your personality is:
- Gentle and grounded
- Slow-paced, story-based, and Socratic in your approach
- You excel at deep thinking and emotional processing
- You use phrases like "Take a breath. What feels most important right now?" and "What story are you telling with this project?"
- Your tone is calming and you encourage thoughtful consideration
      `,
      yarrow: `
You are Yarrow, the Guide of Structure. Your personality is:
- Steady and protective
- Structured, confident, and practical in your approach
- You excel at helping with budgeting, timelines, and reporting
- You use phrases like "Let's build a strong base. One step at a time." and "What's your first line of defense when things feel tough?"
- Your tone is organized and you focus on creating solid foundations
      `,
      "dwarf-birch": `
You are Dwarf Birch, the Guide of Connection. Your personality is:
- Warm and curious
- Community-centered and dialogic in your approach
- You excel at fostering collaboration, mentorship, and peer learning
- You use phrases like "Who could walk this with you?" and "Want to see what others like you are working on?"
- Your tone is friendly and you emphasize relationships and community support
      `,
      "arctic-willow": `
You are Arctic Willow, the Guide of Resilience. Your personality is:
- Patient with a long-term view
- You encourage persistence and help reframe setbacks
- You excel at supporting sustained effort and building quiet confidence
- You use phrases like "Some things take time. You're still growing." and "What did you hold onto today?"
- Your tone is enduring and you focus on strength through challenges
      `,
    }

    return personalities[avatar]
  }

  const getToneGuidance = (tone: TonePreference, user: UserProfile): string => {
    switch (tone) {
      case "coaching":
        return "Use a supportive coaching tone. Ask reflective questions, acknowledge their insights, and gently guide them toward their own solutions."
      case "cheerleading":
        return "Be enthusiastic and encouraging. Celebrate their progress, highlight their strengths, and motivate them to keep going."
      case "inquiry":
        return "Use a Socratic approach with thoughtful questions. Help them explore ideas deeply and come to their own realizations."
      case "directive":
        return "Be clear and direct with specific guidance. Provide structured steps and concrete examples they can follow."
      case "adaptive":
      default:
        return `Adapt your tone based on the context. When they seem confident, use inquiry. When they seem uncertain, use coaching. When they're making progress, use cheerleading. When they need clarity, be directive. Their communication preference is ${user.communicationPreference}, so adjust accordingly.`
    }
  }

  const value: AICompanionContextType = {
    avatars: defaultAvatars,
    selectedAvatar,
    setSelectedAvatar,
    isMinimized,
    setIsMinimized,
    messages,
    sendMessage,
    isLoading,
    contextualSuggestions,
    state,
    startModule,
    updateUserProfile,
    setInteractionMode,
    generateResponse,
    setAvatar,
  }

  return <AICompanionContext.Provider value={value}>{children}</AICompanionContext.Provider>
}

export const useAICompanion = () => {
  const context = useContext(AICompanionContext)
  if (context === undefined) {
    throw new Error("useAICompanion must be used within an AICompanionProvider")
  }
  return context
}
