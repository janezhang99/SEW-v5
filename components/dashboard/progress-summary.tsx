"use client"

import { useTasks } from "@/contexts/tasks-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function ProgressSummary() {
  const { tasks } = useTasks()

  // Calculate progress metrics
  const completedTasks = tasks.filter((task) => task.completed).length
  const totalTasks = tasks.length
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  // Group tasks by category
  const tasksByCategory = tasks.reduce(
    (acc, task) => {
      if (!acc[task.category]) {
        acc[task.category] = { total: 0, completed: 0 }
      }
      acc[task.category].total += 1
      if (task.completed) {
        acc[task.category].completed += 1
      }
      return acc
    },
    {} as Record<string, { total: number; completed: number }>,
  )

  // Calculate category percentages
  const categoryProgress = Object.entries(tasksByCategory).map(([category, data]) => ({
    category,
    percentage: Math.round((data.completed / data.total) * 100),
    completed: data.completed,
    total: data.total,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning Progress</CardTitle>
        <CardDescription>Your journey to entrepreneurship</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm font-medium">{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {completedTasks} of {totalTasks} tasks completed
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">By Category</h4>
            {categoryProgress.map((category) => (
              <div key={category.category} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs capitalize">{category.category}</span>
                  <span className="text-xs">{category.percentage}%</span>
                </div>
                <Progress value={category.percentage} className="h-1.5" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
