"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Minimize, Maximize, Bot } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAICompanion } from "./ai-companion-provider"
import { AICompanionFlowSelector } from "./ai-companion-flow-selector"

export function AICompanionFloating() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const { state, mode } = useAICompanion()

  // Pulse animation when AI has something to suggest
  const shouldPulse = state === "idle" && !isOpen

  // Auto-open on certain pages or states if needed
  useEffect(() => {
    // Example: auto-open on first visit (using localStorage)
    const hasSeenCompanion = localStorage.getItem("hasSeenCompanion")
    if (!hasSeenCompanion) {
      setIsOpen(true)
      localStorage.setItem("hasSeenCompanion", "true")
    }
  }, [])

  return (
    <>
      {/* Floating button when closed */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className={cn(
            "fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full shadow-lg",
            "bg-primary text-primary-foreground hover:bg-primary/90",
            shouldPulse && "animate-pulse",
          )}
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
                <AICompanionFlowSelector />
              </div>
            </CardContent>
          )}
        </Card>
      )}
    </>
  )
}
