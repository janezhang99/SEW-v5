"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExpenseForm } from "@/components/expenses/expense-form"
import { ExpenseList } from "@/components/expenses/expense-list"
import { ExpenseCharts } from "@/components/expenses/expense-charts"
import { ExpenseReport } from "@/components/expenses/expense-report"
import { Button } from "@/components/ui/button"
import { PlusCircle, FileText, Download, ArrowRight, CheckCircle, Clock, DollarSign } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useTasks } from "@/contexts/tasks-context"
import { useExpenses } from "@/contexts/expenses-context"

export default function ExpensesPage() {
  const [isAddingExpense, setIsAddingExpense] = useState(false)
  const {
    expenses,
    loading: expensesLoading,
    error: expensesError,
    addExpense,
    updateExpense,
    deleteExpense,
    getTotalExpenses,
    getApprovedExpenses,
    getPaidExpenses,
    getPlannedExpenses,
  } = useExpenses()

  const {
    tasks,
    loading: tasksLoading,
    error: tasksError,
    completedTaskIds,
    getCompletedTasks,
    getPendingTasks,
    getTotalPotentialFunding,
    getUnlockedFunding,
  } = useTasks()

  const [nextMilestoneDescription, setNextMilestoneDescription] = useState(
    "Complete 3 tasks to unlock your first funding milestone",
  )

  // Calculate funding progress percentage
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

  // Calculate expense totals
  const totalExpenses = getTotalExpenses()
  const approvedExpenses = getApprovedExpenses()
  const pendingExpenses = getPlannedExpenses()
  const remainingBudget = unlockedFunding - totalExpenses > 0 ? unlockedFunding - totalExpenses : 0

  const handleAddExpense = (expense) => {
    addExpense({
      ...expense,
      status: "pending",
    })
    setIsAddingExpense(false)
  }

  if (expensesLoading || tasksLoading) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Funding & Expenses" text="Loading your financial data...">
          <Button variant="outline" className="gap-2" disabled>
            <Download className="h-4 w-4" />
            Export Financial Report
          </Button>
        </DashboardHeader>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your financial data...</p>
          </div>
        </div>
      </DashboardShell>
    )
  }

  if (expensesError || tasksError) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Funding & Expenses" text="There was an error loading your financial data">
          <Button variant="outline" className="gap-2" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </DashboardHeader>
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground mb-4">{expensesError || tasksError}</p>
            <Button onClick={() => window.location.reload()}>Retry Loading Data</Button>
          </CardContent>
        </Card>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Funding & Expenses" text="Track your funding progress and manage project expenses">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1 text-sew-midnight-blue border-sew-midnight-blue hover:bg-sew-midnight-blue/10"
          >
            <FileText className="h-4 w-4" />
            Export Report
          </Button>
          <Button
            size="sm"
            className="gap-1 bg-sew-moss-green hover:bg-sew-moss-green/90"
            onClick={() => setIsAddingExpense(true)}
          >
            <PlusCircle className="h-4 w-4" />
            Add Expense
          </Button>
        </div>
      </DashboardHeader>

      {/* Funding Overview Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Funds Banked</CardTitle>
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

      {/* Expense Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card className="border-sew-moss-green/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-sew-moss-green">Available Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sew-moss-green">${remainingBudget.toFixed(2)}</div>
            <p className="text-xs text-sew-moss-green/80">From ${unlockedFunding.toFixed(2)} unlocked funding</p>
          </CardContent>
        </Card>

        <Card className="border-sew-sunset-orange/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-sew-sunset-orange">Pending Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sew-sunset-orange">${pendingExpenses.toFixed(2)}</div>
            <p className="text-xs text-sew-sunset-orange/80">
              {expenses.filter((e) => e.status === "pending").length} expenses pending approval
            </p>
          </CardContent>
        </Card>

        <Card className="border-sew-midnight-blue/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-sew-midnight-blue">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sew-midnight-blue">${approvedExpenses.toFixed(2)}</div>
            <p className="text-xs text-sew-midnight-blue/80">
              {expenses.filter((e) => e.status === "approved" || e.status === "paid").length} approved expenses
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Expense Management Section */}
      <Tabs defaultValue="expenses" className="mt-6">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="funding-details">Funding Details</TabsTrigger>
        </TabsList>

        <TabsContent value="expenses" className="space-y-4">
          {isAddingExpense ? (
            <Card>
              <CardHeader>
                <CardTitle>Add New Expense</CardTitle>
                <CardDescription>Enter the details of your expense</CardDescription>
              </CardHeader>
              <CardContent>
                <ExpenseForm onSubmit={handleAddExpense} onCancel={() => setIsAddingExpense(false)} />
              </CardContent>
            </Card>
          ) : null}

          <ExpenseList expenses={expenses} onDelete={deleteExpense} onUpdate={updateExpense} />
        </TabsContent>

        <TabsContent value="reports">
          <div className="grid gap-4 md:grid-cols-2">
            <ExpenseCharts expenses={expenses} />
            <ExpenseReport expenses={expenses} />
          </div>
        </TabsContent>

        <TabsContent value="funding-details">
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
                  <Link href="/dashboard/expenses/request">
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
