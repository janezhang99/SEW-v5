"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
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
  Lightbulb,
  Heart,
  MapPin,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
  color: string
  description?: string
}

export function SimplifiedNavigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Main navigation items
  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
      color: "text-blue-500",
      description: "Your project overview and progress",
    },
    {
      title: "Learning",
      href: "/dashboard/learning",
      icon: BookOpen,
      color: "text-purple-500",
      description: "Learning modules and resources",
    },
    {
      title: "Projects",
      href: "/dashboard/projects",
      icon: Briefcase,
      color: "text-amber-500",
      description: "Manage your community projects",
    },
    {
      title: "Funding",
      href: "/dashboard/funding",
      icon: DollarSign,
      color: "text-green-500",
      description: "Funding opportunities and grants",
    },
    {
      title: "Expenses",
      href: "/dashboard/expenses",
      icon: Receipt,
      color: "text-rose-500",
      description: "Track and manage your expenses",
    },
    {
      title: "Mentorship",
      href: "/dashboard/mentorship",
      icon: MessageSquare,
      color: "text-cyan-500",
      description: "Connect with mentors and guides",
    },
    {
      title: "Community",
      href: "/dashboard/community",
      icon: Users,
      color: "text-indigo-500",
      description: "Connect with your community",
    },
    {
      title: "Events",
      href: "/dashboard/events",
      icon: Calendar,
      color: "text-orange-500",
      description: "Upcoming events and activities",
    },
  ]

  // Learning path categories
  const learningCategories: NavItem[] = [
    {
      title: "Personal",
      href: "/dashboard/learning/personal",
      icon: Heart,
      color: "text-rose-500",
    },
    {
      title: "Community",
      href: "/dashboard/learning/community",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Project",
      href: "/dashboard/learning/project",
      icon: Lightbulb,
      color: "text-amber-500",
    },
    {
      title: "Cultural",
      href: "/dashboard/learning/cultural",
      icon: MapPin,
      color: "text-green-500",
    },
  ]

  // Calculate overall progress (in a real app, this would come from your context)
  const overallProgress = 35

  return (
    <>
      {/* Mobile Navigation Toggle */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile Navigation Drawer */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 transform bg-white shadow-lg transition-transform duration-300 ease-in-out md:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="/placeholder-ukgjx.png" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Welcome back</p>
                <p className="text-sm text-muted-foreground">Your journey continues</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <ScrollArea className="flex-1 px-3 py-4">
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between px-2">
                <p className="text-sm font-medium">Your Progress</p>
                <p className="text-sm text-muted-foreground">{overallProgress}%</p>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors",
                    pathname === item.href ? "bg-muted font-medium" : "hover:bg-muted/50",
                  )}
                >
                  <item.icon className={cn("h-5 w-5", item.color)} />
                  <span>{item.title}</span>
                </Link>
              ))}
            </nav>

            {pathname.includes("/dashboard/learning") && (
              <div className="mt-6">
                <p className="mb-2 px-3 text-sm font-medium">Learning Paths</p>
                <div className="space-y-1">
                  {learningCategories.map((category) => (
                    <Link
                      key={category.href}
                      href={category.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors",
                        pathname === category.href ? "bg-muted font-medium" : "hover:bg-muted/50",
                      )}
                    >
                      <category.icon className={cn("h-5 w-5", category.color)} />
                      <span>{category.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </ScrollArea>

          <div className="border-t p-4">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/dashboard/personalized">
                <Sparkles className="mr-2 h-4 w-4 text-purple-500" />
                Personalized Learning
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden border-r md:block">
        <TooltipProvider>
          <div className="flex h-screen flex-col">
            <div className="flex flex-col items-center border-b py-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder-ukgjx.png" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="mt-2 text-center">
                <p className="text-xs font-medium">Your Progress</p>
                <Progress value={overallProgress} className="mt-1 h-1.5 w-16" />
              </div>
            </div>

            <ScrollArea className="flex-1 py-4">
              <nav className="flex flex-col items-center space-y-2 px-2">
                {navItems.map((item) => (
                  <Tooltip key={item.href} delayDuration={300}>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                          pathname === item.href ? "bg-muted" : "hover:bg-muted/50",
                        )}
                      >
                        <item.icon className={cn("h-5 w-5", item.color)} />
                        <span className="sr-only">{item.title}</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="flex items-center gap-2">
                      {item.title}
                      <ChevronRight className="h-3 w-3 text-muted-foreground" />
                    </TooltipContent>
                  </Tooltip>
                ))}
              </nav>

              {pathname.includes("/dashboard/learning") && (
                <div className="mt-6 px-2">
                  <div className="mb-2 flex justify-center">
                    <div className="h-px w-8 bg-muted" />
                  </div>
                  <nav className="flex flex-col items-center space-y-2">
                    {learningCategories.map((category) => (
                      <Tooltip key={category.href} delayDuration={300}>
                        <TooltipTrigger asChild>
                          <Link
                            href={category.href}
                            className={cn(
                              "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                              pathname === category.href ? "bg-muted" : "hover:bg-muted/50",
                            )}
                          >
                            <category.icon className={cn("h-5 w-5", category.color)} />
                            <span className="sr-only">{category.title}</span>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">{category.title}</TooltipContent>
                      </Tooltip>
                    ))}
                  </nav>
                </div>
              )}
            </ScrollArea>

            <div className="border-t p-4">
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Link
                    href="/dashboard/personalized"
                    className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-muted/50"
                  >
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    <span className="sr-only">Personalized Learning</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Personalized Learning</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </TooltipProvider>
      </div>
    </>
  )
}
