"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bot, Send } from "lucide-react"

interface AICompanionEmbeddedProps {
  title?: string
  description?: string
  flowId?: string
  contextualPrompt?: string
  className?: string
}

export function AICompanionEmbedded({
  title = "AI Companion",
  description = "Ask me anything about climate adaptation",
  flowId,
  contextualPrompt,
  className,
}: AICompanionEmbeddedProps) {
  const [input, setInput] = useState(contextualPrompt || "")
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Use a ref to track if the component is mounted
  const isMounted = useRef(true)

  // Set isMounted to false when the component unmounts
  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  // Scroll to bottom when messages change, but only if the component is mounted
  useEffect(() => {
    if (messagesEndRef.current && isMounted.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      // Only update state if the component is still mounted
      if (isMounted.current) {
        const assistantMessage = {
          role: "assistant" as const,
          content: generateResponse(input, flowId),
        }
        setMessages((prev) => [...prev, assistantMessage])
        setIsLoading(false)
      }
    }, 1000)
  }

  return (
    <Card className={`mt-6 ${className || ""}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-1.5 rounded-md">
            <Bot className="h-4 w-4 text-primary" />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {messages.length === 0 ? (
          <div className="px-6 py-4">
            <p className="text-sm text-muted-foreground">
              {contextualPrompt
                ? "Type your message to get started, or use the suggested prompt."
                : "Type your message to get started."}
            </p>
          </div>
        ) : (
          <div className="h-[200px] px-6 py-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 text-sm ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        <div className="flex w-full items-center space-x-2">
          <Input
            placeholder="Ask a question..."
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
    </Card>
  )
}

// Helper function to generate responses based on the flow
function generateResponse(input: string, flowId?: string): string {
  const inputLower = input.toLowerCase()

  if (flowId === "project-insights") {
    if (inputLower.includes("risk") || inputLower.includes("challenge")) {
      return "Based on similar projects, key risks to monitor include: weather disruptions, supply chain issues, contractor coordination, community resistance, and maintenance challenges. I recommend developing contingency plans for each."
    }
    if (inputLower.includes("stakeholder") || inputLower.includes("community")) {
      return "For effective stakeholder engagement, consider mapping key groups: local residents, municipal departments, environmental organizations, businesses, and educational institutions. Each has different interests and influence levels."
    }
    if (inputLower.includes("metric") || inputLower.includes("measure") || inputLower.includes("impact")) {
      return "To measure project impact, track: temperature reduction in target areas, increased tree canopy coverage, stormwater retention volumes, community usage rates, and maintenance costs. Establishing baseline measurements is crucial."
    }
  }

  // Default responses
  if (inputLower.includes("hello") || inputLower.includes("hi")) {
    return "Hello! I'm here to help with your project. What specific aspect would you like assistance with?"
  }

  if (inputLower.includes("help") || inputLower.includes("what can you")) {
    return "I can help with project planning, risk assessment, stakeholder engagement strategies, impact measurement, and finding relevant resources. What are you working on today?"
  }

  // Climate adaptation plan response
  if (inputLower.includes("climate adaptation plan") || inputLower.includes("adaptation plan")) {
    return "A comprehensive climate adaptation plan typically includes: 1) Climate risk and vulnerability assessment, 2) Adaptation goals and objectives, 3) Adaptation strategies and actions, 4) Implementation timeline and responsibilities, 5) Monitoring and evaluation framework, and 6) Stakeholder engagement process. Would you like more details on any of these components?"
  }

  // Generic response
  return "That's an interesting question. To provide more specific guidance, could you share more details about what you're trying to accomplish?"
}
