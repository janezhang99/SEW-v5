"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, CheckCircle2 } from "lucide-react"

// This would typically come from your API or context
const upcomingItems = [
  {
    id: 1,
    title: "Complete Business Model Canvas",
    type: "task",
    dueDate: "2025-06-02",
    category: "learning",
  },
  {
    id: 2,
    title: "Submit Monthly Expense Report",
    type: "finance",
    dueDate: "2025-06-05",
    category: "finance",
  },
  {
    id: 3,
    title: "Community Workshop: Marketing Basics",
    type: "event",
    dueDate: "2025-06-10",
    category: "community",
  },
]

export function UpcomingItems() {
  // Calculate days remaining
  const getDaysRemaining = (dateString: string) => {
    const today = new Date()
    const dueDate = new Date(dateString)
    const diffTime = dueDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Coming Up</CardTitle>
        <CardDescription>Tasks and events due soon</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingItems.map((item) => {
            const daysRemaining = getDaysRemaining(item.dueDate)

            return (
              <div key={item.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                <div
                  className={`mt-0.5 p-1.5 rounded-full 
                  ${
                    item.category === "learning"
                      ? "bg-purple-100 text-purple-700"
                      : item.category === "finance"
                        ? "bg-green-100 text-green-700"
                        : "bg-pink-100 text-pink-700"
                  }`}
                >
                  {item.category === "learning" ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : item.category === "finance" ? (
                    <Calendar className="h-4 w-4" />
                  ) : (
                    <Clock className="h-4 w-4" />
                  )}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{item.title}</p>
                    <Badge variant={daysRemaining <= 3 ? "destructive" : "outline"} className="text-xs">
                      {formatDate(item.dueDate)}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {daysRemaining === 0
                      ? "Due today"
                      : daysRemaining < 0
                        ? `Overdue by ${Math.abs(daysRemaining)} days`
                        : `Due in ${daysRemaining} days`}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
