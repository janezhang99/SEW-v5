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
import { PlusCircle, FileText, Download, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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

  const handleAddExpense = (expense) => {
    addExpense({
      ...expense,
      status: "pending",
    })
    setIsAddingExpense(false)
  }

  // Calculate expense totals
  const totalExpenses = getTotalExpenses()
  const approvedExpenses = getApprovedExpenses()
  const pendingExpenses = getPlannedExpenses()

  const budgetUsedPercentage = Math.round((totalExpenses / approvedExpenses) * 100) || 0

  if (expensesLoading) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Finances" text="Loading your financial data...">
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

  if (expensesError) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Finances" text="There was an error loading your financial data">
          <Button variant="outline" className="gap-2" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </DashboardHeader>
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground mb-4">{expensesError}</p>
            <Button onClick={() => window.location.reload()}>Retry Loading Data</Button>
          </CardContent>
        </Card>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Finances" text="Track and manage your project expenses">
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

      {/* Expense Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card className="border-sew-midnight-blue/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-sew-midnight-blue">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sew-midnight-blue">${totalExpenses.toFixed(2)}</div>
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

        <Card className="border-sew-moss-green/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-sew-moss-green">Approved Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sew-moss-green">${approvedExpenses.toFixed(2)}</div>
            <div className="flex items-center text-xs text-sew-moss-green/80">
              {budgetUsedPercentage > 50 ? (
                <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1 text-red-500" />
              )}
              {expenses.filter((e) => e.status === "approved" || e.status === "paid").length} approved expenses (
              {budgetUsedPercentage}%)
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expense Management Section */}
      <Tabs defaultValue="expenses" className="mt-6">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="reports">Analytics & Reports</TabsTrigger>
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
      </Tabs>
    </DashboardShell>
  )
}

const CardBody = ({ className, ...props }) => {
  return <div className={`p-4 ${className}`} {...props} />
}
