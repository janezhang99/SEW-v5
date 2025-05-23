"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, CheckCircle, Clock, ArrowRight, Download, FileText } from "lucide-react"
import Link from "next/link"
import { useTasks } from "@/contexts/tasks-context"

export default function FundingPage() {
  const {
    tasks,
    loading,
    error,
    completedTaskIds,
    getCompletedTasks,
    getPendingTasks,
    getTotalPotentialFunding,
    getUnlockedFunding,
  } = useTasks()

  const [nextMilestoneDescription, setNextMilestoneDescription] = useState(
    "Complete 3 tasks to unlock your first funding milestone",
  )

  // Calculate progress percentage
  const totalPotentialFunding = getTotalPotentialFunding()
  const unlockedFunding = getUnlockedFunding()
  const fundingProgress = Math.round((unlockedFunding / totalPotentialFunding) * 100) || 0

  const completedTasks = getCompletedTasks()
  const pendingTasks = getPendingTasks()
  const totalTasks = tasks.length
  const taskProgress = Math.round((completedTasks.length / totalTasks) * 100) || 0

  // Funding milestones
  const milestones = [
    {
      amount: 250,
      description: "Initial planning phase funding",
      tasksRequired: 3,
      unlocked: completedTasks.length >= 3,
    },
    {
      amount: 500,
      description: "Project development phase funding",
      tasksRequired: 6,
      unlocked: completedTasks.length >= 6,
    },
    {
      amount: 1000,
      description: "Full project implementation funding",
      tasksRequired: 10,
      unlocked: completedTasks.length >= 10,
    },
  ]

  // Find next milestone
  const nextMilestone = milestones.find((milestone) => !milestone.unlocked)?.amount || totalPotentialFunding

  if (loading) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Your Funding Status" text="Loading your funding data...">
          <Button variant="outline" className="gap-2" disabled>
            <Download className="h-4 w-4" />
            Export Funding Report
          </Button>
        </DashboardHeader>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your tasks and funding data...</p>
          </div>
        </div>
      </DashboardShell>
    )
  }

  if (error) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Your Funding Status" text="There was an error loading your funding data">
          <Button variant="outline" className="gap-2" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </DashboardHeader>
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Retry Loading Data</Button>
          </CardContent>
        </Card>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Your Funding Status" text="Track your progress towards unlocking micro-grant funding">
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Funding Report
        </Button>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Funding Progress</CardTitle>
            <CardDescription>Track your unlocked micro-grant funding</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold">${unlockedFunding}</span>
                </div>
                <Badge variant="outline" className="text-sm">
                  of ${totalPotentialFunding} potential
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Funding Progress</span>
                  <span className="font-medium">{fundingProgress}%</span>
                </div>
                <Progress value={fundingProgress} className="h-2" />
              </div>

              <div className="rounded-md border p-3 bg-muted/50">
                <h4 className="text-sm font-medium mb-1">Next Milestone</h4>
                <p className="text-xs text-muted-foreground mb-2">{nextMilestoneDescription}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">${nextMilestone}</span>
                  <Badge variant="outline" className="text-xs">
                    <Clock className="mr-1 h-3 w-3" />
                    In progress
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/learning">
                Complete More Tasks
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Task Completion</CardTitle>
            <CardDescription>Your progress through learning tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold">{completedTasks.length}</span>
                </div>
                <Badge variant="outline" className="text-sm">
                  of {totalTasks} tasks
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Task Progress</span>
                  <span className="font-medium">{taskProgress}%</span>
                </div>
                <Progress value={taskProgress} className="h-2" />
              </div>

              <div className="rounded-md border p-3 bg-muted/50">
                <h4 className="text-sm font-medium mb-1">Recently Completed</h4>
                {completedTasks.length > 0 ? (
                  <div className="space-y-2">
                    {completedTasks.slice(0, 3).map((task) => (
                      <div key={task.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            {task.icon}
                          </div>
                          <span>{task.name}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          <DollarSign className="mr-1 h-3 w-3" />${task.fundingAmount}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">No tasks completed yet</p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/learning">
                View All Tasks
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Funding Milestones</CardTitle>
            <CardDescription>Key funding stages for your project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-center gap-4 rounded-md border p-3">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      milestone.unlocked ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {milestone.unlocked ? <CheckCircle className="h-4 w-4" /> : index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">${milestone.amount}</h4>
                      <Badge variant={milestone.unlocked ? "default" : "outline"} className="text-xs">
                        {milestone.unlocked ? "Unlocked" : `${milestone.tasksRequired} tasks needed`}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming" className="mt-6">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Tasks</TabsTrigger>
          <TabsTrigger value="completed">Completed Tasks</TabsTrigger>
          <TabsTrigger value="funding-details">Funding Details</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4 mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pendingTasks.map((task) => (
              <Card key={task.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {task.icon}
                      </div>
                      {task.name}
                    </CardTitle>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
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
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/dashboard/learning/${task.category}/${task.id}`}>Start Task</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          {completedTasks.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {completedTasks.map((task) => (
                <Card key={task.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        {task.name}
                      </CardTitle>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        <span>${task.fundingAmount}</span>
                      </Badge>
                    </div>
                    <CardDescription>{task.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span>Completed - Funding Unlocked</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/dashboard/learning/${task.category}/${task.id}`}>Review Task</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">
                  You haven't completed any tasks yet. Complete tasks to unlock funding.
                </p>
                <Button className="mt-4" asChild>
                  <Link href="/dashboard/learning">Start Learning Journey</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="funding-details" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Funding Details</CardTitle>
              <CardDescription>How your micro-grant funding works</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <h3 className="font-medium mb-2">How Funding Works</h3>
                <p className="text-sm text-muted-foreground">
                  Small Economy Works uses a task-based funding model. As you complete learning tasks, you unlock
                  portions of your micro-grant. This approach ensures you develop the skills needed for your project
                  while accessing the funding to make it happen.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Funding Rules</h3>
                <ul className="text-sm text-muted-foreground space-y-2 ml-4 list-disc">
                  <li>Each completed task unlocks a specific amount of funding</li>
                  <li>Funding is released at key milestones (after completing 3, 6, and 10 tasks)</li>
                  <li>You must complete all required tasks to access the full grant amount</li>
                  <li>Funds can only be used for purposes outlined in your project plan</li>
                  <li>You'll need to provide documentation of how funds are used</li>
                </ul>
              </div>

              <div className="rounded-md border p-4">
                <h3 className="font-medium mb-2">Accessing Your Funds</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Once you've unlocked funding milestones, you can request disbursement of funds for your project
                  expenses.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/funding/request">
                    <FileText className="mr-2 h-4 w-4" />
                    Request Fund Disbursement
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
