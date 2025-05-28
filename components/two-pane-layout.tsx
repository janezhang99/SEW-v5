"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { usePathname } from "next/navigation"
import { useMobile } from "@/hooks/use-mobile"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { AppSidebar } from "@/components/app-sidebar"
import { useView } from "@/components/view-toggle"
// Import the SafeAICompanion instead of AICompanionFloating
import { SafeAICompanion } from "@/components/ai-companion/safe-ai-companion"

interface TwoPaneLayoutProps {
  children: React.ReactNode
}

export function TwoPaneLayout({ children }: TwoPaneLayoutProps) {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isCompanionCollapsed, setIsCompanionCollapsed] = useState(false)
  const [defaultLayout, setDefaultLayout] = useState([75, 25])
  const [isLayoutInitialized, setIsLayoutInitialized] = useState(false)
  const { viewMode } = useView()

  // Don't show the sidebar on the landing page
  const showSidebar = pathname !== "/"

  // Adjust layout based on screen size - only on initial mount
  useEffect(() => {
    if (isMobile) {
      setIsCompanionCollapsed(true)
    }

    // Load saved layout from localStorage
    const savedLayout = localStorage.getItem("companionLayout")
    if (savedLayout) {
      try {
        const parsed = JSON.parse(savedLayout)
        setDefaultLayout(parsed)
        setIsCompanionCollapsed(parsed[1] < 5)
      } catch (e) {
        console.error("Error parsing saved layout", e)
      }
    }

    setIsLayoutInitialized(true)
  }, [isMobile])

  // Memoize the layout change handler to prevent recreating it on every render
  const handleLayoutChange = useCallback(
    (sizes: number[]) => {
      // Only save if the layout is already initialized to prevent unnecessary updates
      if (isLayoutInitialized) {
        localStorage.setItem("companionLayout", JSON.stringify(sizes))
        setIsCompanionCollapsed(sizes[1] < 5)
      }
    },
    [isLayoutInitialized],
  )

  // Toggle companion visibility
  const toggleCompanion = useCallback(
    (collapsed: boolean) => {
      setIsCompanionCollapsed(collapsed)
      if (collapsed) {
        handleLayoutChange([100, 0])
      } else {
        handleLayoutChange([75, 25])
      }
    },
    [handleLayoutChange],
  )

  // Pages where we don't want to show the companion
  const excludedPaths = ["/admin/ai-companion", "/admin/ai-project-assistant", "/projects/create"]
  const showCompanion = !excludedPaths.some((path) => pathname.startsWith(path))

  return (
    <div className="flex min-h-screen flex-col">
      {/* Horizontal Menu (Header) */}
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4">
          <MainNav />
          <div className="flex items-center gap-4">
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Vertical Menu (Sidebar) */}
        {showSidebar && (
          <div className="hidden border-r md:block md:w-64">
            <AppSidebar />
          </div>
        )}

        {/* Main Content Area with AI Companion */}
        <main className="flex-1">{children}</main>
      </div>

      {/* Use the SafeAICompanion component instead */}
      {viewMode === "authenticated" && <SafeAICompanion />}
    </div>
  )
}
