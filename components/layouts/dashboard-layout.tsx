"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { BookOpen, DollarSign, Home, Menu, Settings, Users, Award, ShoppingBag, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AICompanionProvider } from "@/components/ai-companion/ai-companion-context"
import { AICompanion } from "@/components/ai-companion/ai-companion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useTasks } from "@/contexts/tasks-context"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Learning", href: "/dashboard/learning", icon: BookOpen },
  { name: "Finances", href: "/dashboard/finances", icon: DollarSign },
  { name: "Marketplace", href: "/dashboard/marketplace", icon: ShoppingBag },
  { name: "Community", href: "/dashboard/community", icon: Users },
  { name: "Initiatives", href: "/dashboard/initiatives", icon: Award },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()
  const { tasks } = useTasks()

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const completedTasks = tasks.filter((task) => task.completed).length
  const totalTasks = tasks.length
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  return (
    <AICompanionProvider>
      <TooltipProvider>
        <div className="h-screen flex overflow-hidden bg-gray-100">
          {/* Mobile sidebar */}
          {isMobile && sidebarOpen && (
            <div className="fixed inset-0 flex z-40 md:hidden">
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <X className="h-6 w-6 text-white" />
                  </Button>
                </div>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <div className="flex-shrink-0 flex items-center px-4">
                    <h1 className="text-xl font-bold text-sew-midnight-blue">Small Economy Works</h1>
                  </div>
                  <nav className="mt-5 px-2 space-y-1">
                    {navigation.map((item) => {
                      const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                            isActive
                              ? "bg-sew-midnight-blue text-white"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                          onClick={() => setSidebarOpen(false)}
                        >
                          <item.icon className="mr-4 h-6 w-6" />
                          {item.name}
                        </Link>
                      )
                    })}
                  </nav>
                </div>
              </div>
            </div>
          )}

          {/* Desktop sidebar */}
          <div className="hidden md:flex md:flex-shrink-0">
            <div className="flex flex-col w-64">
              <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
                <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                  <div className="flex items-center flex-shrink-0 px-4">
                    <h1 className="text-xl font-bold text-sew-midnight-blue">Small Economy Works</h1>
                  </div>
                  <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
                    {navigation.map((item) => {
                      const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                      return (
                        <Tooltip key={item.name}>
                          <TooltipTrigger asChild>
                            <Link
                              href={item.href}
                              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                                isActive
                                  ? "bg-sew-midnight-blue text-white"
                                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                              }`}
                            >
                              <item.icon className="mr-3 h-6 w-6" />
                              {item.name}
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            <p>{item.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      )
                    })}
                  </nav>
                </div>
                <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                  <div className="w-full">
                    <div className="text-xs font-medium text-gray-500 mb-2">Learning Progress</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-sew-moss-green h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {completedTasks} of {totalTasks} tasks completed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-0 flex-1 overflow-hidden">
            <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
              <Button
                variant="ghost"
                size="sm"
                className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>

            <div className="flex flex-1 overflow-hidden">
              {/* Main content area - takes up most of the space */}
              <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
                <div className="py-6">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{children}</div>
                </div>
              </main>

              {/* AI Assistant panel - fixed width, doesn't take up too much space */}
              <div className="hidden lg:flex lg:flex-shrink-0">
                <div className="flex flex-col w-80 border-l border-gray-200 bg-white">
                  <div className="h-full p-4">
                    <AICompanion />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </AICompanionProvider>
  )
}
