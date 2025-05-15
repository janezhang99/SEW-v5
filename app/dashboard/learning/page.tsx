"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Clock, DollarSign, CheckCircle, Search } from "lucide-react"
import Link from "next/link"
import { useTasks } from "@/contexts/tasks-context"

export default function LearningPage() {
  const { tasks, loading, error, completedTaskIds, getTasksByCategory } = useTasks()
  const [searchQuery, setSearchQuery] = useState("")

  // Calculate progress
  const totalTasks = tasks.length
  const completedCount = completedTaskIds.length
  const progress = Math.round((completedCount / totalTasks) * 100) || 0

  // Get unique categories
  const categories = [...new Set(tasks.map((task) => task.category))]

  // Filter tasks by search query
  const filterTasks = (tasks: any[]) => {
    if (!searchQuery.trim()) return tasks

    const query = searchQuery.toLowerCase()
    return tasks.filter(
      (task) => task.name.toLowerCase().includes(query) || task.description.toLowerCase().includes(query),
    )
  }

  if (loading) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Learning Journey" text="Loading your learning tasks...">
          <div className="h-10"></div>
        </DashboardHeader>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your tasks...</p>
          </div>
        </div>
      </DashboardShell>
    )
  }

  if (error) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Learning Journey" text="There was an error loading your tasks">
          <Button variant="outline" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </DashboardHeader>
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Retry Loading Tasks</Button>
          </CardContent>
        </Card>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Learning Journey" text="Complete tasks to build skills and unlock funding">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tasks..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </DashboardHeader>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Your Progress</CardTitle>
          <CardDescription>Track your learning journey and funding</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Task Completion</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  <CheckCircle className="inline-block mr-1 h-4 w-4" />
                  {completedCount} of {totalTasks} tasks completed
                </span>
                <span>
                  <DollarSign className="inline-block mr-1 h-4 w-4" />
                  Funding unlocked: $
                  {completedTaskIds.reduce((total, id) => {
                    const task = tasks.find((t) => t.id === id)
                    return total + (task?.fundingAmount || 0)
                  }, 0)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue={categories[0] || "all"} className="mt-6">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="capitalize">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filterTasks(tasks).map((task) => {
              const isCompleted = completedTaskIds.includes(task.id)
              return (
                <Card key={task.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        <div
                          className={`h-6 w-6 rounded-full flex items-center justify-center ${
                            isCompleted ? "bg-green-100 text-green-700" : "bg-primary/10 text-primary"
                          }`}
                        >
                          {isCompleted ? <CheckCircle className="h-4 w-4" /> : task.icon}
                        </div>
                        {task.name}
                      </CardTitle>
                      <Badge
                        variant={isCompleted ? "default" : "outline"}
                        className={isCompleted ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                      >
                        <DollarSign className="mr-1 h-3 w-3" />
                        <span>${task.fundingAmount}</span>
                      </Badge>
                    </div>
                    <CardDescription>{task.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Estimated time: {task.timeEstimate}</span>
                    </div>
                    <div className="mt-1">
                      <Badge variant="outline" className="capitalize">
                        {task.category}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant={isCompleted ? "outline" : "default"} className={isCompleted ? "" : ""} asChild>
                      <Link href={`/dashboard/learning/${task.category}/${task.id}`}>
                        {isCompleted ? "Review" : "Start Task"}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>

          {filterTasks(tasks).length === 0 && (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">No tasks match your search. Try a different search term.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filterTasks(getTasksByCategory(category)).map((task) => {
                const isCompleted = completedTaskIds.includes(task.id)
                return (
                  <Card key={task.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base flex items-center gap-2">
                          <div
                            className={`h-6 w-6 rounded-full flex items-center justify-center ${
                              isCompleted ? "bg-green-100 text-green-700" : "bg-primary/10 text-primary"
                            }`}
                          >
                            {isCompleted ? <CheckCircle className="h-4 w-4" /> : task.icon}
                          </div>
                          {task.name}
                        </CardTitle>
                        <Badge
                          variant={isCompleted ? "default" : "outline"}
                          className={isCompleted ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                        >
                          <DollarSign className="mr-1 h-3 w-3" />
                          <span>${task.fundingAmount}</span>
                        </Badge>
                      </div>
                      <CardDescription>{task.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Estimated time: {task.timeEstimate}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant={isCompleted ? "outline" : "default"} className={isCompleted ? "" : ""} asChild>
                        <Link href={`/dashboard/learning/${task.category}/${task.id}`}>
                          {isCompleted ? "Review" : "Start Task"}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>

            {filterTasks(getTasksByCategory(category)).length === 0 && (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">No tasks match your search in this category.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </DashboardShell>
  )
}
