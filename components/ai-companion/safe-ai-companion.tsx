"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Minimize, Maximize, Bot, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { AICompanionProvider } from "./ai-companion-provider"

// This is a safer version of the AI companion that doesn't rely on the context initially
export function SafeAICompanion() {
  return (
    <AICompanionProvider>
      <SafeAICompanionInner />
    </AICompanionProvider>
  )
}

function SafeAICompanionInner() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // Simple state instead of using the context directly
  const [mode, setMode] = useState("assistant")

  useEffect(() => {
    // Example: auto-open on first visit (using localStorage)
    const hasSeenCompanion = localStorage.getItem("hasSeenCompanion")
    if (!hasSeenCompanion) {
      setIsOpen(true)
      localStorage.setItem("hasSeenCompanion", "true")
    }
  }, [])

  // If there was an error, show a simplified error state
  if (error) {
    return (
      <Button
        onClick={() => setError(null)}
        className="fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full shadow-lg bg-red-500 text-white hover:bg-red-600"
        size="icon"
      >
        <AlertCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <>
      {/* Floating button when closed */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90"
          size="icon"
        >
          <Bot className="h-6 w-6" />
        </Button>
      )}

      {/* Companion panel when open */}
      {isOpen && (
        <Card
          className={cn(
            "fixed z-50 shadow-lg transition-all duration-200 ease-in-out",
            isMinimized ? "bottom-4 right-4 h-14 w-64" : "bottom-4 right-4 w-80 md:w-96 max-h-[600px]",
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b p-3">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <h3 className="font-medium">AI Companion</h3>
              {!isMinimized && (
                <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                  {mode === "coach" ? "Coach" : mode === "educator" ? "Educator" : "Assistant"}
                </span>
              )}
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsMinimized(!isMinimized)}>
                {isMinimized ? <Maximize className="h-4 w-4" /> : <Minimize className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          {!isMinimized && (
            <CardContent className="p-0 max-h-[calc(600px-48px)] overflow-auto">
              <div className="p-4">
                <p className="text-sm text-muted-foreground">
                  I'm your AI companion. How can I help you with climate adaptation today?
                </p>
                <div className="mt-4 space-y-2">
                  <Button variant="outline" className="w-full justify-start text-left" size="sm">
                    Help me understand climate risks
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-left" size="sm">
                    Suggest adaptation strategies
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-left" size="sm">
                    Guide me through the assessment process
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      )}
    </>
  )
}
