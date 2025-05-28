"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Send, BookOpen, Lightbulb, Zap, Settings, MessageSquare, Layers } from "lucide-react"
import { useAICompanion } from "./ai-companion-provider"
import type { AICompanionMessage } from "@/types/ai-companion"
import { cn } from "@/lib/utils"
import { AICompanionFlowSelector } from "./ai-companion-flow-selector"
import { AICompanionSettings } from "./ai-companion-settings"
import { AICompanionCards } from "./ai-companion-cards"

export function AICompanionPane() {
  // Use a try-catch to handle potential context errors
  try {
    return <AICompanionPaneInner />
  } catch (error) {
    console.error("Error rendering AI Companion Pane:", error)
    return <AICompanionPaneFallback />
  }
}

function AICompanionPaneInner() {
  const { messages, addMessage, isLoading, setIsLoading, currentFlow, mode, tone } = useAICompanion()

  const [input, setInput] = useState("")
  const [activeView, setActiveView] = useState<"chat" | "cards" | "flows" | "settings">("chat")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messagesEndRef])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

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
      }, 1000)
    } catch (error) {
      console.error("Error sending message:", error)
      setIsLoading(false)
    }
  }, [input, addMessage, setIsLoading, currentFlow, tone])

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
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <CardFooter className="p-4 pt-2 border-t">
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
        return <AICompanionCards />
      case "flows":
        return <AICompanionFlowSelector />
      case "settings":
        return <AICompanionSettings />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col h-full">
      <CardHeader className="bg-primary/5 py-3 px-4 flex flex-row items-center justify-between space-y-0 border-b">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          CanAdapt AI Companion
        </CardTitle>
      </CardHeader>

      <div className="flex-1 overflow-hidden flex flex-col">{renderView()}</div>

      <div className="border-t p-2">
        <div className="flex justify-around">
          <Button
            variant={activeView === "chat" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveView("chat")}
            className="flex-1"
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            Chat
          </Button>
          <Button
            variant={activeView === "cards" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveView("cards")}
            className="flex-1"
          >
            <Layers className="h-4 w-4 mr-1" />
            Cards
          </Button>
          <Button
            variant={activeView === "flows" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveView("flows")}
            className="flex-1"
          >
            <Zap className="h-4 w-4 mr-1" />
            Flows
          </Button>
          <Button
            variant={activeView === "settings" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveView("settings")}
            className="flex-1"
          >
            <Settings className="h-4 w-4 mr-1" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  )
}

// Fallback component in case the main component fails
function AICompanionPaneFallback() {
  return (
    <div className="flex flex-col h-full">
      <CardHeader className="bg-primary/5 py-3 px-4 flex flex-row items-center justify-between space-y-0 border-b">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          CanAdapt AI Companion
        </CardTitle>
      </CardHeader>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center">
          <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">AI Companion</h3>
          <p className="text-muted-foreground mt-2">
            The AI companion is currently unavailable. Please try again later.
          </p>
          <Button className="mt-4" variant="outline">
            Retry
          </Button>
        </div>
      </div>
    </div>
  )
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

  // Default response
  return "That's an interesting point. Could you tell me more about what you're looking to accomplish? I'm here to help with course recommendations, grant applications, project planning, or exploring climate adaptation topics."
}
