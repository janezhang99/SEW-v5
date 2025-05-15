"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AICompanionProvider } from "@/components/ai-companion/ai-companion-context"
import { AICompanion } from "@/components/ai-companion/ai-companion"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  BookOpen,
  DollarSign,
  Users,
  Settings,
  Menu,
  X,
  LogOut,
  Home,
  ChevronRight,
  Bell,
} from "lucide-react"
import { usePathname } from "next/navigation"

interface DashboardLayoutProps {
  children: React.ReactNode
  className?: string
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  const currentPath = usePathname()
  const [isMobile, setIsMobile] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)
  const [showAssistant, setShowAssistant] = useState(true)

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setShowSidebar(false)
        setShowAssistant(false)
      } else {
        setShowSidebar(true)
        setShowAssistant(true)
      }
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { href: "/dashboard/learning", label: "Learning", icon: <BookOpen className="h-5 w-5" /> },
    { href: "/dashboard/funding", label: "Funding", icon: <DollarSign className="h-5 w-5" /> },
    { href: "/dashboard/community", label: "Community", icon: <Users className="h-5 w-5" /> },
    { href: "/dashboard/settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
          {isMobile && (
            <button
              className="mr-2 flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              {showSidebar ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          )}
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              SEW
            </div>
            <span className="ml-2 text-xl font-bold">Small Economy Works</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>

            {isMobile && (
              <button
                className="flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted"
                onClick={() => setShowAssistant(!showAssistant)}
              >
                {showAssistant ? "Hide Guide" : "Show Guide"}
              </button>
            )}
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <Home className="h-5 w-5 mr-1" />
                Home
              </Link>
            </Button>
            <Button variant="ghost" size="sm">
              <LogOut className="h-5 w-5 mr-1" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar navigation */}
        <aside
          className={cn(
            "w-64 border-r bg-white transition-all duration-200 ease-in-out",
            isMobile ? "fixed inset-y-0 left-0 z-40 pt-16" : "relative",
            isMobile && !showSidebar ? "-translate-x-full" : "translate-x-0",
          )}
        >
          <div className="flex flex-col gap-2 p-4">
            <div className="mb-6">
              <div className="px-4 py-2">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mx-auto mb-2">
                  JD
                </div>
                <h3 className="text-center font-medium">Jane Doe</h3>
                <p className="text-center text-xs text-muted-foreground">Entrepreneur</p>
              </div>
              <div className="mt-2 px-4">
                <div className="flex justify-between text-xs mb-1">
                  <span>Learning Progress</span>
                  <span>45%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full bg-primary w-[45%] rounded-full"></div>
                </div>
              </div>
            </div>

            {navItems.map((item) => (
              <Button
                key={item.href}
                variant={currentPath === item.href ? "default" : "ghost"}
                className={cn("justify-start", currentPath === item.href && "text-white")}
                asChild
              >
                <Link href={item.href} className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </div>
                  {currentPath === item.href && <ChevronRight className="h-4 w-4" />}
                </Link>
              </Button>
            ))}

            <div className="mt-auto pt-6">
              <div className="rounded-lg bg-slate-100 p-4">
                <h4 className="font-medium text-sm mb-2">Need Help?</h4>
                <p className="text-xs text-muted-foreground mb-3">Ask your AI guide or contact our support team</p>
                <Button size="sm" className="w-full">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content area */}
        <div
          className={cn(
            "flex flex-1 overflow-auto",
            isMobile && showSidebar ? "opacity-50 pointer-events-none" : "opacity-100",
          )}
        >
          <div className={cn("flex-1 overflow-auto p-4 sm:p-6 lg:p-8", isMobile && showAssistant ? "hidden" : "block")}>
            {children}
          </div>

          {/* AI Assistant panel */}
          <div
            className={cn(
              "border-l w-[400px] overflow-auto bg-white",
              isMobile && !showAssistant ? "hidden" : "block",
              isMobile ? "fixed inset-y-0 right-0 z-40 pt-16 w-full sm:w-[350px]" : "",
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
  )
}
