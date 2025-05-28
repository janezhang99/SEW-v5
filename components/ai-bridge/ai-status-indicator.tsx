"use client"

import { useAIBridge } from "./ai-systems-bridge"
import { Badge } from "@/components/ui/badge"
import { Bot, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAICompanion } from "@/components/ai-companion/ai-companion-provider"

export function AIStatusIndicator() {
  const { activeSystem, currentProject, handoffToCompanion, handoffToProjectAssistant } = useAIBridge()
  const companion = useAICompanion()

  if (!activeSystem) return null

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Badge variant="outline" className="bg-background shadow-md flex items-center gap-2 py-1.5 px-3">
        <Bot className="h-4 w-4 text-primary" />
        <span>{activeSystem === "companion" ? "AI Companion Active" : "Project Assistant Active"}</span>
        {activeSystem === "companion" && currentProject && (
          <Button variant="ghost" size="sm" className="h-6 ml-2 text-xs" onClick={() => handoffToProjectAssistant()}>
            <ExternalLink className="h-3 w-3 mr-1" />
            Switch to Project
          </Button>
        )}
        {activeSystem === "project-assistant" && !companion.isOpen && (
          <Button variant="ghost" size="sm" className="h-6 ml-2 text-xs" onClick={() => handoffToCompanion()}>
            <ExternalLink className="h-3 w-3 mr-1" />
            Open Companion
          </Button>
        )}
      </Badge>
    </div>
  )
}
