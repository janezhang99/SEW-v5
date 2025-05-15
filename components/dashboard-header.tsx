"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NotificationSystem } from "@/components/notification-system"

interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
}

export function DashboardHeader({ heading, text, children }: DashboardHeaderProps) {
  const pathname = usePathname()

  const handleToggleAssistant = () => {
    // Dispatch a custom event to toggle the AI assistant
    const event = new Event("toggleAssistant")
    window.dispatchEvent(event)
  }

  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="font-heading text-3xl md:text-4xl text-gray-900 dark:text-gray-50">{heading}</h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      <div className="flex items-center gap-2">
        <NotificationSystem />
        <Button variant="ghost" size="icon" className="md:hidden" onClick={handleToggleAssistant}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle AI Assistant</span>
        </Button>
        {children}
      </div>
    </div>
  )
}
