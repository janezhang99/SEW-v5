"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AICompanionProvider } from "@/components/ai-companion/ai-companion-context"
import { AICompanion } from "@/components/ai-companion/ai-companion"
import { cn } from "@/lib/utils"

interface OnboardingLayoutProps {
  children: React.ReactNode
  className?: string
  currentStep?: string
}

export function OnboardingLayout({ children, className, currentStep }: OnboardingLayoutProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [showAssistant, setShowAssistant] = useState(true)

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setShowAssistant(false)
      }
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              SEW
            </div>
            <span className="ml-2 text-xl font-bold">Small Economy Works</span>
          </div>
          {isMobile && (
            <button
              className="ml-auto flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted"
              onClick={() => setShowAssistant(!showAssistant)}
            >
              {showAssistant ? "Hide Assistant" : "Show Assistant"}
            </button>
          )}
        </div>
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        {/* Main content area */}
        <div className={cn("flex-1 px-4 py-6 sm:px-6 lg:px-8", isMobile && showAssistant ? "hidden" : "block")}>
          {children}
        </div>

        {/* AI Assistant panel */}
        <div
          className={cn(
            "border-l md:w-[400px] lg:w-[450px]",
            isMobile && !showAssistant ? "hidden" : "block",
            isMobile ? "h-[calc(100vh-64px)]" : "",
          )}
        >
          <div className="h-full p-4">
            <AICompanionProvider>
              <AICompanion currentStep={currentStep} />
            </AICompanionProvider>
          </div>
        </div>
      </div>
    </div>
  )
}
