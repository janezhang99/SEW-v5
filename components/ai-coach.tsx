"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { Send, Loader2, ArrowRight, Clock, DollarSign } from "lucide-react"
import { useTasks } from "@/contexts/tasks-context"

// Types for the AI coach
type Message = {
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
}

type SkillLevel = "beginner" | "intermediate" | "advanced"
type BusinessStage = "idea" | "startup" | "growth"
type LearningStyle = "reflective" | "visual" | "practical"

type UserProfile = {
  name: string
  skillLevel: SkillLevel
  businessStage: BusinessStage
  learningStyle: LearningStyle
  interests: string[]
  communityType: string
  projectType: string
  assessmentComplete: boolean
}

export function AICoach() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "",
    skillLevel: "beginner",
    businessStage: "idea",
    learningStyle: "practical",
    interests: [],
    communityType: "",
    projectType: "",
    assessmentComplete: false,
  })
  const [currentAssessmentStep, setCurrentAssessmentStep] = useState(0)
  const [showTaskRecommendations, setShowTaskRecommendations] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Get tasks from context
  const { tasks, getPendingTasks, getTotalPotentialFunding } = useTasks()

  // Assessment questions to determine user profile
  const assessmentQuestions = [
    "Welcome to Small Economy Works! I'm your AI coach. What's your name?",
    "Hi {name}! What type of community are you from? (rural, remote, Northern, Indigenous, etc.)",
    "What kind of project or business are you interested in developing?",
    "Have you worked on business projects before? (never, a little, quite a bit)",
    "What stage is your business idea in? (just an idea, starting to plan, already started)",
    "How do you prefer to learn? (by reflecting, by seeing examples, by doing practical activities)",
    "What aspects of business are you most interested in learning about? (marketing, finance, community impact, etc.)",
  ]

  // Scroll to bottom of messages when new ones are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        role: "assistant",
        content: assessmentQuestions[0],
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }, [])

  // Process user input during assessment
  const processAssessmentInput = (userInput: string) => {
    // Update user profile based on current assessment step
    switch (currentAssessmentStep) {
      case 0: // Name
        setUserProfile((prev) => ({ ...prev, name: userInput }))
        break
      case 1: // Community type
        setUserProfile((prev) => ({ ...prev, communityType: userInput }))
        break
      case 2: // Project type
        setUserProfile((prev) => ({ ...prev, projectType: userInput }))
        break
      case 3: // Experience level
        // Determine skill level based on experience
        let skillLevel: SkillLevel = "beginner"
        if (userInput.toLowerCase().includes("never") || userInput.toLowerCase().includes("little")) {
          skillLevel = "beginner"
        } else if (userInput.toLowerCase().includes("quite") || userInput.toLowerCase().includes("some")) {
          skillLevel = "intermediate"
        } else if (userInput.toLowerCase().includes("lot") || userInput.toLowerCase().includes("experience")) {
          skillLevel = "advanced"
        }
        setUserProfile((prev) => ({ ...prev, skillLevel }))
        break
      case 4: // Business stage
        // Determine business stage
        let businessStage: BusinessStage = "idea"
        if (userInput.toLowerCase().includes("idea")) {
          businessStage = "idea"
        } else if (userInput.toLowerCase().includes("plan") || userInput.toLowerCase().includes("start")) {
          businessStage = "startup"
        } else if (userInput.toLowerCase().includes("already") || userInput.toLowerCase().includes("running")) {
          businessStage = "growth"
        }
        setUserProfile((prev) => ({ ...prev, businessStage }))
        break
      case 5: // Learning style
        // Determine learning style
        let learningStyle: LearningStyle = "practical"
        if (userInput.toLowerCase().includes("reflect")) {
          learningStyle = "reflective"
        } else if (
          userInput.toLowerCase().includes("see") ||
          userInput.toLowerCase().includes("example") ||
          userInput.toLowerCase().includes("visual")
        ) {
          learningStyle = "visual"
        } else {
          learningStyle = "practical"
        }
        setUserProfile((prev) => ({ ...prev, learningStyle }))
        break
      case 6: // Interests
        // Extract interests
        const interests = userInput.split(",").map((interest) => interest.trim())
        setUserProfile((prev) => ({ ...prev, interests, assessmentComplete: true }))
        setShowTaskRecommendations(true)
        break
    }

    // Move to next assessment step
    if (currentAssessmentStep < assessmentQuestions.length - 1) {
      const nextQuestion = assessmentQuestions[currentAssessmentStep + 1].replace("{name}", userProfile.name || "there")

      // Add AI response with next question
      const assistantMessage: Message = {
        role: "assistant",
        content: nextQuestion,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setCurrentAssessmentStep((prev) => prev + 1)
    } else {
      // Assessment complete, provide summary and next steps
      const summaryMessage = generateAssessmentSummary()
      const assistantMessage: Message = {
        role: "assistant",
        content: summaryMessage,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    }
  }

  // Generate assessment summary based on user profile
  const generateAssessmentSummary = () => {
    return `
Thanks for sharing that information, ${userProfile.name}! Based on what you've told me, I've put together a personalized learning journey for you.

**Your Profile:**
- Skill Level: ${
      userProfile.skillLevel === "beginner"
        ? "Beginner (We'll start with the basics)"
        : userProfile.skillLevel === "intermediate"
          ? "Intermediate (You have some experience)"
          : "Advanced (You're ready for more complex concepts)"
    }
- Business Stage: ${
      userProfile.businessStage === "idea"
        ? "Idea Stage (Exploring possibilities)"
        : userProfile.businessStage === "startup"
          ? "Startup Stage (Getting things going)"
          : "Growth Stage (Expanding your existing business)"
    }
- Learning Style: ${
      userProfile.learningStyle === "reflective"
        ? "Reflective (You learn through deep thinking)"
        : userProfile.learningStyle === "visual"
          ? "Visual (You learn by seeing examples)"
          : "Practical (You learn by doing)"
    }

I've created a customized learning journey for you that will help you develop your ${userProfile.projectType} project while accessing micro-grant funding. As you complete each task, you'll unlock portions of the grant to help bring your idea to life!

Let's get started with your first set of tasks. Each completed task will unlock funding to support your project.
    `
  }

  // Send message to AI coach
  const sendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // If still in assessment phase, process input accordingly
    if (!userProfile.assessmentComplete) {
      processAssessmentInput(input)
      return
    }

    // Otherwise, generate AI response
    setIsGenerating(true)

    try {
      // Create system prompt based on user profile
      const systemPrompt = `
You are an AI coach for Small Economy Works, a program that supports youth entrepreneurship in rural, remote, Northern, and Indigenous communities. 
You're helping ${userProfile.name}, who is at the ${userProfile.skillLevel} skill level, in the ${userProfile.businessStage} stage of their ${userProfile.projectType} project.
They have a ${userProfile.learningStyle} learning style and are from a ${userProfile.communityType} community.
Their interests include: ${userProfile.interests.join(", ")}.

Your role is to guide them through their learning journey, which is also their micro-grant application process. As they complete learning tasks, they unlock portions of grant funding.
Be supportive, culturally responsive, and focus on practical advice that connects to their community context.
      `

      const { text } = await generateText({
        model: openai("gpt-4o"),
        system: systemPrompt,
        prompt: input,
      })

      // Add AI response
      const assistantMessage: Message = {
        role: "assistant",
        content: text,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error generating AI response:", error)

      // Add error message
      const errorMessage: Message = {
        role: "assistant",
        content: "I'm sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsGenerating(false)
    }
  }

  // Get recommended tasks based on user profile
  const getRecommendedTasks = () => {
    // Filter tasks based on user profile
    const pendingTasks = getPendingTasks()

    // If we have a skill level, filter tasks that might be appropriate
    if (userProfile.skillLevel === "beginner") {
      // For beginners, recommend simpler tasks first
      return pendingTasks.slice(0, 4)
    } else if (userProfile.skillLevel === "intermediate") {
      // For intermediate users, mix of simple and more complex tasks
      return pendingTasks.slice(0, 5)
    } else {
      // For advanced users, more complex tasks
      return pendingTasks.slice(0, 6)
    }
  }

  // Calculate total potential funding
  const calculateTotalFunding = () => {
    return getRecommendedTasks().reduce((total, task) => total + task.fundingAmount, 0)
  }

  return (
    <div className="flex flex-col h-full">
      <Card className="flex flex-col h-full">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/ai-coach.png" alt="AI Coach" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">Small Economy Works AI Coach</CardTitle>
                <CardDescription className="text-xs">
                  Your guide to entrepreneurship and micro-grant funding
                </CardDescription>
              </div>
            </div>
            {userProfile.assessmentComplete && (
              <Badge variant="outline" className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                <span>Potential Funding: ${calculateTotalFunding()}</span>
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                <div className="whitespace-pre-line text-sm">{message.content}</div>
                <div className="text-xs opacity-70 mt-1 text-right">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </CardContent>

        {showTaskRecommendations && (
          <div className="border-t p-4">
            <h3 className="font-medium mb-2">Recommended Tasks & Funding</h3>
            <div className="space-y-3">
              {getRecommendedTasks().map((task, index) => (
                <div key={index} className="flex items-center justify-between rounded-md border p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {task.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{task.name}</p>
                      <p className="text-xs text-muted-foreground">{task.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      <span>${task.fundingAmount}</span>
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {task.timeEstimate}
                    </span>
                  </div>
                </div>
              ))}
              <Button className="w-full mt-2" asChild>
                <a href="/dashboard/learning">
                  Start Learning Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        )}

        <CardFooter className="border-t p-4 gap-2">
          <div className="flex flex-col w-full gap-2">
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="min-h-[60px] flex-1 resize-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                  }
                }}
              />
              <Button onClick={sendMessage} disabled={isGenerating || !input.trim()} className="self-end">
                {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
