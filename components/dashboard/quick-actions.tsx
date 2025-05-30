"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, DollarSign, ShoppingBag, Users, Award, ArrowRight } from "lucide-react"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTasks } from "@/contexts/tasks-context"

interface QuickAction {
  title: string
  description: string
  icon: React.ElementType
  href: string
  color: string
  priority: number
}

export function QuickActions() {
  const { tasks } = useTasks()
  const [showAll, setShowAll] = useState(false)

  // Get incomplete tasks
  const incompleteTasks = tasks.filter((task) => !task.completed)

  // Dynamic quick actions based on user state
  const quickActions: QuickAction[] = [
    // Always show if there are incomplete tasks
    ...(incompleteTasks.length > 0
      ? [
          {
            title: "Continue Learning",
            description: `You have ${incompleteTasks.length} incomplete tasks`,
            icon: BookOpen,
            href: `/dashboard/learning/${incompleteTasks[0]?.category}/${incompleteTasks[0]?.id}`,
            color: "bg-purple-100 text-purple-700",
            priority: 1,
          },
        ]
      : []),

    // Financial actions
    {
      title: "Track Expenses",
      description: "Record your latest project expenses",
      icon: DollarSign,
      href: "/dashboard/finances",
      color: "bg-green-100 text-green-700",
      priority: 2,
    },

    // Initiative actions
    {
      title: "Create Initiative",
      description: "Start a new community initiative",
      icon: Award,
      href: "/dashboard/initiatives/new",
      color: "bg-amber-100 text-amber-700",
      priority: 3,
    },

    // Marketplace actions
    {
      title: "Offer Your Skills",
      description: "Create a service in the marketplace",
      icon: ShoppingBag,
      href: "/dashboard/marketplace/new",
      color: "bg-blue-100 text-blue-700",
      priority: 4,
    },

    // Community actions
    {
      title: "Join Community",
      description: "Connect with other entrepreneurs",
      icon: Users,
      href: "/dashboard/community",
      color: "bg-pink-100 text-pink-700",
      priority: 5,
    },
  ]

  // Sort by priority
  const sortedActions = quickActions.sort((a, b) => a.priority - b.priority)

  // Show only top 3 actions unless "show all" is clicked
  const visibleActions = showAll ? sortedActions : sortedActions.slice(0, 3)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Quick Actions</h2>
        <Button variant="ghost" size="sm" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "Show All"}
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {visibleActions.map((action, index) => (
          <Card key={index} className="transition-all hover:shadow-md">
            <CardHeader className="pb-2">
              <div className={`w-10 h-10 rounded-full ${action.color} flex items-center justify-center mb-2`}>
                <action.icon className="h-5 w-5" />
              </div>
              <CardTitle className="text-base">{action.title}</CardTitle>
              <CardDescription>{action.description}</CardDescription>
            </CardHeader>
            <CardFooter className="pt-2">
              <Button asChild variant="ghost" className="w-full justify-between">
                <Link href={action.href}>
                  Take Action <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
