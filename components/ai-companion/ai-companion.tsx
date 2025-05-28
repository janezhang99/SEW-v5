"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Bot,
  X,
  Send,
  Sparkles,
  BookOpen,
  Lightbulb,
  Zap,
  ArrowLeft,
  ExternalLink,
  Minimize2,
  Maximize2,
} from "lucide-react"
import { useAICompanion } from "./ai-companion-provider"
import type { AICompanionMessage } from "@/types/ai-companion"
import { cn } from "@/lib/utils"
import { AICompanionFlowSelector } from "./ai-companion-flow-selector"
import { AICompanionSettings } from "./ai-companion-settings"
import { AICompanionCards } from "./ai-companion-cards"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAIBridge, AIBridgeProvider } from "@/components/ai-bridge/ai-systems-bridge"
import { AnimatePresence, motion } from "framer-motion"

interface AICompanionProps {
  isPinned?: boolean
}

// Create a wrapper component that provides AIBridgeProvider if needed
function AICompanionWithBridge(props: AICompanionProps) {
  const [hasBridge, setHasBridge] = useState(false)
  const [aiBridge, setAiBridge] = useState<ReturnType<typeof useAIBridge> | null>(null)

  useEffect(() => {
    try {
      // Try to use the AIBridge context
      const bridge = useAIBridge()
      // If we get here, we have a bridge context
      setAiBridge(bridge)
      setHasBridge(true)
    } catch (e) {
      // If we get an error, we need to wrap it in an AIBridgeProvider
      setHasBridge(false)
      setAiBridge(null)
    }
  }, [])

  if (hasBridge === null) {
    // Still determining if we have a bridge
    return null // Or a loading indicator
  }

  if (hasBridge) {
    return <AICompanionInner {...props} aiBridge={aiBridge} />
  } else {
    return (
      <AIBridgeProvider>
        <AICompanionInner {...props} aiBridge={null} />
      </AIBridgeProvider>
    )
  }
}

// The inner component that uses the AIBridge
function AICompanionInner({
  isPinned = false,
  aiBridge,
}: AICompanionProps & { aiBridge: ReturnType<typeof useAIBridge> | null }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [hasInitialized, setHasInitialized] = useState(false)

  const {
    isOpen,
    openCompanion,
    closeCompanion,
    messages,
    addMessage,
    isLoading,
    setIsLoading,
    currentFlow,
    mode,
    tone,
    currentFramework,
    activeFlow,
    setActiveFlow,
  } = useAICompanion()

  // If pinned, ensure the companion is open - but only after initial render
  useEffect(() => {
    if (isPinned && !isOpen && hasInitialized) {
      openCompanion()
    }
    // Set initialization flag after first render
    setHasInitialized(true)
  }, [isPinned, isOpen, openCompanion, hasInitialized])

  const [input, setInput] = useState("")
  const [activeView, setActiveView] = useState<"chat" | "cards" | "flows" | "settings">("chat")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [suggestProjectAssistant, setSuggestProjectAssistant] = useState(false)
  const [currentProject, setCurrentProjectLocal] = useState<any>(null)

  // Scroll to bottom when messages change
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messagesEndRef])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  // Update last interaction when the component is opened
  useEffect(() => {
    if (isOpen && aiBridge?.updateLastInteraction) {
      aiBridge.updateLastInteraction()
    }
  }, [isOpen, aiBridge])

  // Get project context from AI Bridge if available
  useEffect(() => {
    if (aiBridge?.currentProject) {
      setCurrentProjectLocal(aiBridge.currentProject)
    }
  }, [aiBridge])

  const handleSendMessage = useCallback(async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: AICompanionMessage = {
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    }

    addMessage(userMessage)
    setInput("")
    setIsLoading(true)

    // Add to shared history if AI Bridge is available
    if (aiBridge?.addToSharedHistory) {
      aiBridge.addToSharedHistory({
        system: "companion",
        action: "message-sent",
        context: { content: input },
      })
    }

    try {
      // In a real implementation, this would call an API endpoint
      // For now, we'll simulate a response
      setTimeout(() => {
        const assistantMessage: AICompanionMessage = {
          role: "assistant",
          content: generateMockResponse(input, currentFlow, tone),
          timestamp: new Date().toISOString(),
        }

        addMessage(assistantMessage)
        setIsLoading(false)

        // Check if the message contains project-related content
        const projectKeywords = ["project", "timeline", "stakeholder", "risk", "implementation"]
        if (
          projectKeywords.some((keyword) => input.toLowerCase().includes(keyword)) &&
          currentProject &&
          !suggestProjectAssistant
        ) {
          setSuggestProjectAssistant(true)
        }
      }, 1000)
    } catch (error) {
      console.error("Error sending message:", error)
      setIsLoading(false)
    }
  }, [input, addMessage, setIsLoading, aiBridge, currentFlow, tone, currentProject, suggestProjectAssistant])

  const handleProjectAssistantHandoff = useCallback(() => {
    // Close the companion
    closeCompanion()

    // Hand off to the project assistant if AI Bridge is available
    if (aiBridge?.handoffToProjectAssistant) {
      aiBridge.handoffToProjectAssistant(
        `The user was discussing the ${currentProject?.projectName} project. They might need specialized assistance.`,
      )
    }

    // Reset the suggestion flag
    setSuggestProjectAssistant(false)
  }, [aiBridge, currentProject, closeCompanion])

  // If pinned in sidebar, use a different UI
  if (isPinned) {
    // Don't try to open the companion during render
    // We'll handle this in the useEffect
    if (!isOpen && hasInitialized) {
      return null
    }

    return (
      <div className="flex h-full flex-col">
        <div className="flex-1">{renderView()}</div>
      </div>
    )
  }

  if (isMinimized) {
    return (
      <Button
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg bg-primary text-primary-foreground"
        onClick={() => setIsMinimized(false)}
      >
        <Bot className="h-6 w-6" />
      </Button>
    )
  }

  if (!isOpen) return null

  // Render the appropriate view based on activeView state
  function renderView() {
    switch (activeView) {
      case "chat":
        return (
          <>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center p-4">
                    <Bot className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">How can I help you today?</h3>
                    <p className="text-muted-foreground mt-2">
                      I can assist with course recommendations, grant applications, or help you explore climate
                      adaptation topics.
                    </p>
                    <div className="grid grid-cols-1 gap-2 mt-6 w-full">
                      <Button
                        variant="outline"
                        className="justify-start text-left"
                        onClick={() => setInput("Help me find courses on climate risk assessment")}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Find relevant courses
                      </Button>
                      <Button
                        variant="outline"
                        className="justify-start text-left"
                        onClick={() => setInput("What grants are available for municipal adaptation projects?")}
                      >
                        <Lightbulb className="h-4 w-4 mr-2" />
                        Explore funding opportunities
                      </Button>
                      <Button
                        variant="outline"
                        className="justify-start text-left"
                        onClick={() => setInput("I need help with my community's flood adaptation plan")}
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        Get project assistance
                      </Button>
                    </div>
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <div key={index} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                      <div
                        className={cn(
                          "max-w-[80%] rounded-lg p-3",
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                        )}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))
                )}

                {/* Project Assistant Suggestion */}
                {suggestProjectAssistant && currentProject && (
                  <Alert className="bg-primary/10 border-primary/20">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <AlertTitle>Project Assistant Available</AlertTitle>
                    <AlertDescription>
                      I notice you're discussing the {currentProject.projectName} project. Would you like to use the
                      specialized Project Assistant?
                      <div className="mt-2">
                        <Button size="sm" onClick={handleProjectAssistantHandoff} className="mr-2">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Switch to Project Assistant
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setSuggestProjectAssistant(false)}>
                          Continue here
                        </Button>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <CardFooter className={cn("p-4 pt-2 border-t", isPinned ? "mt-auto" : "")}>
              <div className="flex w-full items-center space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  disabled={isLoading}
                />
                <Button size="icon" onClick={handleSendMessage} disabled={isLoading}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </>
        )
      case "cards":
        return (
          <div className="flex flex-col h-full">
            <div className="p-4 border-b flex items-center">
              <Button variant="ghost" size="icon" onClick={() => setActiveView("chat")} className="mr-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-lg font-medium">AI Companion Cards</h2>
            </div>
            <ScrollArea className="flex-1 p-4">
              <AICompanionCards />
            </ScrollArea>
          </div>
        )
      case "flows":
        return (
          <div className="flex flex-col h-full">
            <div className="p-4 border-b flex items-center">
              <Button variant="ghost" size="icon" onClick={() => setActiveView("chat")} className="mr-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-lg font-medium">AI Companion Flows</h2>
            </div>
            <AICompanionFlowSelector />
          </div>
        )
      case "settings":
        return (
          <div className="flex flex-col h-full">
            <div className="p-4 border-b flex items-center">
              <Button variant="ghost" size="icon" onClick={() => setActiveView("chat")} className="mr-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-lg font-medium">AI Companion Settings</h2>
            </div>
            <AICompanionSettings />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={`fixed bottom-4 right-4 ${isExpanded ? "w-[400px] h-[600px]" : "w-[350px] h-[450px]"}`}
      >
        <Card className="h-full overflow-hidden shadow-xl border-primary/20 flex flex-col z-50">
          <CardHeader className="bg-primary/5 py-2 px-4 flex flex-row items-center justify-between space-y-0 border-b">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              CanAdapt AI Companion
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsMinimized(true)}>
                <X className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={closeCompanion}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 h-[calc(100%-48px)] flex-1 flex flex-col overflow-hidden">
            {/* AI Companion content here */}
            {renderView()}
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}

// Export the wrapper component
export function AICompanion(props: AICompanionProps) {
  return <AICompanionWithBridge {...props} />
}

// Helper function to generate mock responses
function generateMockResponse(input: string, currentFlow: string | null, tone: string): string {
  // Simple keyword-based responses
  const inputLower = input.toLowerCase()

  if (currentFlow === "grant_readiness") {
    if (inputLower.includes("eligibility")) {
      return "To determine eligibility for most climate adaptation grants, you'll need to check: 1) Organization type (government, non-profit, etc.), 2) Geographic focus, 3) Project alignment with grant priorities, and 4) Capacity to implement and report. Would you like me to help you assess your eligibility for a specific grant?"
    }
    if (inputLower.includes("budget")) {
      return "Creating a strong grant budget involves: 1) Aligning costs with project activities, 2) Including both direct and indirect costs, 3) Providing clear justifications, and 4) Showing any matching funds or in-kind contributions. Would you like guidance on a specific budget item?"
    }
  }

  if (currentFlow === "course_recommendation") {
    if (inputLower.includes("risk assessment")) {
      return "Based on your interest in climate risk assessment, I recommend starting with 'Climate Risk Assessment Fundamentals' which covers the basics of identifying and evaluating climate-related risks. For more advanced content, 'Advanced Vulnerability Mapping' would be an excellent follow-up course."
    }
    if (inputLower.includes("nature") || inputLower.includes("solutions")) {
      return "For nature-based solutions, I recommend the 'Nature-based Solutions for Climate Adaptation' course. It explores how natural systems can be leveraged to build resilience to climate impacts. The course includes case studies from urban and rural contexts."
    }
  }

  if (currentFlow === "reflection") {
    if (inputLower.includes("challenge") || inputLower.includes("difficult")) {
      return "Thank you for sharing that challenge. It takes courage to reflect on difficulties. What strengths did you draw on to navigate this situation? Recognizing our inner resources helps build resilience for future challenges."
    }
    if (inputLower.includes("learn") || inputLower.includes("discover")) {
      return "Your commitment to learning is a strength in itself. How might this new knowledge or insight shape your approach to climate adaptation work going forward?"
    }
  }

  if (currentFlow === "resilience_boost") {
    if (inputLower.includes("stuck") || inputLower.includes("frustrated")) {
      return "It's natural to feel stuck sometimes, especially with complex challenges like climate adaptation. Remember that your persistence in showing up and engaging with these issues is already making a difference. What small step could you take today that would feel manageable and meaningful?"
    }
    if (inputLower.includes("overwhelm") || inputLower.includes("too much")) {
      return "The scale of climate challenges can feel overwhelming. Many successful practitioners have felt this way too. Consider focusing on your sphere of influence - the specific areas where your skills and position allow you to make tangible impacts. What's one area where you feel you can make progress right now?"
    }
  }

  // Project-related responses
  if (inputLower.includes("project") || inputLower.includes("timeline") || inputLower.includes("stakeholder")) {
    return "I notice you're asking about project management. For detailed project assistance, you might want to try our specialized AI Project Assistant, which has tools for timeline optimization, stakeholder analysis, and risk assessment. Would you like me to connect you with the Project Assistant?"
  }

  // General responses
  if (inputLower.includes("hello") || inputLower.includes("hi")) {
    return "Hello! I'm your CanAdapt AI companion. How can I assist you with your climate adaptation journey today?"
  }

  if (inputLower.includes("course") || inputLower.includes("learn")) {
    return "I can help you find courses that match your interests and skill level. What specific climate adaptation topics are you interested in learning more about?"
  }

  if (inputLower.includes("grant") || inputLower.includes("funding")) {
    return "I can help you navigate grant opportunities and prepare strong applications. Are you looking for information about specific grants, or would you like guidance on the application process?"
  }

  if (inputLower.includes("strength") || inputLower.includes("good at")) {
    return "Recognizing your strengths is important for effective climate adaptation work. From our interactions, I notice you have strong analytical skills and a collaborative approach. Would you like to explore how to leverage these strengths in your current projects?"
  }

  if (inputLower.includes("value") || inputLower.includes("important to me")) {
    return "Your values provide a foundation for meaningful climate adaptation work. Would you like to reflect on how your current activities align with what matters most to you? This alignment often leads to more sustainable engagement and impact."
  }

  // Default response
  return "That's an interesting point. Could you tell me more about what you're looking to accomplish? I'm here to help with course recommendations, grant applications, project planning, or exploring climate adaptation topics."
}
