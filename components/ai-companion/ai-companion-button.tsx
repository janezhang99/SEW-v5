"use client"

import { Button } from "@/components/ui/button"
import { Bot } from "lucide-react"
import { useAICompanion } from "./ai-companion-provider"

interface AICompanionButtonProps {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function AICompanionButton({ variant = "default", size = "default", className }: AICompanionButtonProps) {
  const { toggleCompanion } = useAICompanion()

  return (
    <Button variant={variant} size={size} onClick={toggleCompanion} className={className}>
      <Bot className="mr-2 h-4 w-4" />
      AI Companion
    </Button>
  )
}
