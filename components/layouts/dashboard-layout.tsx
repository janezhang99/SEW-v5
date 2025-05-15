"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  Calendar,
  DollarSign,
  Home,
  MessageSquare,
  Users,
  Receipt,
  Briefcase,
  Menu,
  X,
  ChevronRight,
  Settings,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { AICompanionProvider } from "@/components/ai-companion/ai-companion-context"
import { AICompanion } from "@/components/ai-companion/ai-companion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useTasks } from "@/contexts/tasks-context"

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
  color: string
  description: string
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [showAssistant, setShowAssistant] = useState(true)
  const [isNavOpen, setIsNavOpen] = useState(false)
  const pathname = usePathname()
  const { getCompletedTasks, tasks } = useTasks()

  // Calculate overall progress
  const completedTasks = getCompletedTasks()
  const progressPercentage = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setShowAssistant(false)
        setIsNavOpen(false)
      }
    }

    const handleToggleAssistant = () => {
      setShowAssistant((prev) => !prev)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    window.addEventListener("toggleAssistant", handleToggleAssistant)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
      window.removeEventListener("toggleAssistant", handleToggleAssistant)
    }
  }, [])

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
      color: "bg-blue-100 text-blue-700",
      description: "Overview of your progress and activities",
    },
    {
      title: "Learning",
      href: "/dashboard/learning",
      icon: BookOpen,
      color: "bg-purple-100 text-purple-700",
      description: "Access learning modules and resources",
    },
    {
      title: "Projects",
      href: "/dashboard/projects",
      icon: Briefcase,
      color: "bg-amber-100 text-amber-700",
      description: "Manage your ongoing projects",
    },
    {
      title: "Funding",
      href: "/dashboard/funding",
      icon: DollarSign,
      color: "bg-green-100 text-green-700",
      description: "Track available funding and applications",
    },
    {
      title: "Expenses",
      href: "/dashboard/expenses",
      icon: Receipt,
      color: "bg-red-100 text-red-700",
      description: "Manage your project expenses",
    },
    {
      title: "Mentorship",
      href: "/dashboard/mentorship",
      icon: MessageSquare,
      color: "bg-indigo-100 text-indigo-700",
      description: "Connect with mentors and advisors",
    },
    {
      title: "Community",
      href: "/dashboard/community",
      icon: Users,
      color: "bg-pink-100 text-pink-700",
      description: "Engage with your community",
    },
    {
      title: "Events",
      href: "/dashboard/events",
      icon: Calendar,
      color: "bg-teal-100 text-teal-700",
      description: "View and manage upcoming events",
    },
  ]

  return (
    <TooltipProvider>
      <div className="flex min-h-screen flex-col">
        {/* Mobile navigation toggle */}
        {isMobile && (
          <div className="fixed top-4 left-4 z-50">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="rounded-full shadow-md"
            >
              {isNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        )}

        <div className="flex-1 items-start md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]">
          {/* Simplified Navigation Sidebar */}
          <aside
            className={cn(
              "fixed top-0 left-0 z-40 h-full w-[220px] lg:w-[240px] bg-white shadow-lg transition-transform duration-300 ease-in-out",
              isMobile ? (isNavOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0",
              "md:sticky md:top-14 md:h-[calc(100vh-3.5rem)] md:shadow-none md:translate-x-0",
            )}
          >
            <div className="flex flex-col h-full">
              {/* SEW Logo */}
              <div className="p-4 border-b flex items-center justify-center">
                <a href="/" className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-xl">SEW</span>
                  </div>
                  <span className="mt-2 text-sm font-medium text-gray-700">Small Economy Works</span>
                </a>
              </div>

              {/* Navigation items */}
              <nav className="flex-1 overflow-y-auto p-2">
                <div className="space-y-1">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

                    return (
                      <Tooltip key={item.href} delayDuration={300}>
                        <TooltipTrigger asChild>
                          <a
                            href={item.href}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                              isActive
                                ? "bg-gray-100 text-gray-900 font-medium"
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900",
                            )}
                          >
                            <div className={cn("p-1 rounded-md", item.color)}>
                              <item.icon className="h-5 w-5" />
                            </div>
                            <span className="flex-1">{item.title}</span>
                            {isActive && <ChevronRight className="h-4 w-4" />}
                          </a>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>{item.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    )
                  })}
                </div>
              </nav>

              {/* Bottom section with settings and help */}
              <div className="p-4 border-t space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2" asChild>
                  <a href="/dashboard/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Get Help</span>
                </Button>
              </div>
            </div>
          </aside>

          <div className="flex flex-1 flex-col md:flex-row">
            {/* Main content area */}
            <div className={cn("flex-1", isMobile && showAssistant ? "hidden" : "block")}>{children}</div>

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
                  <AICompanion />
                </AICompanionProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
