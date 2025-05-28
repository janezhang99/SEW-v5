"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { useMobile } from "@/hooks/use-mobile"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { AppSidebar } from "@/components/app-sidebar"
import { useView } from "@/components/view-toggle"
import { AICompanionProvider } from "@/components/ai-companion/ai-companion-provider"
import { AICompanionPane } from "@/components/ai-companion/ai-companion-pane"

interface ThreePaneLayoutProps {
  children: React.ReactNode
}

export function ThreePaneLayout({ children }: ThreePaneLayoutProps) {
  const pathname = usePathname()
  const isMobile = useMobile()
  const { viewMode } = useView()

  // Don't show the sidebar on the landing page
  const showSidebar = pathname !== "/"

  // Pages where we don't want to show the companion
  const excludedPaths = ["/admin/ai-companion", "/admin/ai-project-assistant", "/projects/create"]
  const showCompanion = viewMode === "authenticated" && !excludedPaths.some((path) => pathname.startsWith(path))

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
        {/* Left Sidebar */}
        {showSidebar && (
          <div className="hidden border-r md:block md:w-64">
            <AppSidebar />
          </div>
        )}

        {/* Main Content Area */}
        <main className={`flex-1 ${showCompanion ? "md:border-r" : ""}`}>{children}</main>

        {/* Right AI Companion Pane */}
        {showCompanion && (
          <AICompanionProvider>
            <div className="hidden md:block md:w-80 border-l">
              <AICompanionPane />
            </div>
          </AICompanionProvider>
        )}
      </div>
    </div>
  )
}
