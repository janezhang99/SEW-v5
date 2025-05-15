"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExpenseForm } from "@/components/expenses/expense-form"
import { ExpenseList } from "@/components/expenses/expense-list"
import { ExpenseSummary } from "@/components/expenses/expense-summary"
import { ExpenseCharts } from "@/components/expenses/expense-charts"
import { ExpenseReport } from "@/components/expenses/expense-report"
import { Button } from "@/components/ui/button"
import { PlusCircle, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for expenses
const mockExpenses = [
  {
    id: "1",
    date: "2023-05-15",
    amount: 125.5,
    category: "materials",
    description: "Art supplies for community workshop",
    receipt: "/receipts/receipt-1.pdf",
    status: "approved",
  },
  {
    id: "2",
    date: "2023-05-20",
    amount: 75.25,
    category: "travel",
    description: "Gas for community outreach trip",
    receipt: "/receipts/receipt-2.pdf",
    status: "pending",
  },
  {
    id: "3",
    date: "2023-05-25",
    amount: 200.0,
    category: "services",
    description: "Website hosting for project",
    receipt: "/receipts/receipt-3.pdf",
    status: "approved",
  },
  {
    id: "4",
    date: "2023-06-01",
    amount: 50.0,
    category: "food",
    description: "Refreshments for team meeting",
    receipt: "/receipts/receipt-4.pdf",
    status: "approved",
  },
  {
    id: "5",
    date: "2023-06-10",
    amount: 300.0,
    category: "equipment",
    description: "Portable projector for presentations",
    receipt: "/receipts/receipt-5.pdf",
    status: "pending",
  },
]

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState(mockExpenses)
  const [isAddingExpense, setIsAddingExpense] = useState(false)

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: (expenses.length + 1).toString(),
      status: "pending",
    }
    setExpenses([...expenses, newExpense])
    setIsAddingExpense(false)
  }

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id))
  }

  const updateExpense = (updatedExpense) => {
    setExpenses(expenses.map((expense) => (expense.id === updatedExpense.id ? updatedExpense : expense)))
  }

  // Calculate total approved expenses
  const totalApproved = expenses
    .filter((expense) => expense.status === "approved")
    .reduce((sum, expense) => sum + expense.amount, 0)

  // Calculate total pending expenses
  const totalPending = expenses
    .filter((expense) => expense.status === "pending")
    .reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <DashboardShell>
      <DashboardHeader heading="Expense Tracking" text="Track and manage your project expenses">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1 text-sew-midnight-blue border-sew-midnight-blue hover:bg-sew-midnight-blue/10"
          >
            <FileText className="h-4 w-4" />
            Export
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

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-sew-moss-green/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-sew-moss-green">Total Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sew-moss-green">${totalApproved.toFixed(2)}</div>
            <p className="text-xs text-sew-moss-green/80">
              {expenses.filter((e) => e.status === "approved").length} expenses approved
            </p>
          </CardContent>
        </Card>

        <Card className="border-sew-sunset-orange/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-sew-sunset-orange">Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sew-sunset-orange">${totalPending.toFixed(2)}</div>
            <p className="text-xs text-sew-sunset-orange/80">
              {expenses.filter((e) => e.status === "pending").length} expenses pending
            </p>
          </CardContent>
        </Card>

        <Card className="border-sew-midnight-blue/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-sew-midnight-blue">Remaining Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sew-midnight-blue">$750.00</div>
            <p className="text-xs text-sew-midnight-blue/80">From $1,500.00 total budget</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="expenses" className="mt-6">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="expenses" className="space-y-4">
          {isAddingExpense ? (
            <Card>
              <CardHeader>
                <CardTitle>Add New Expense</CardTitle>
                <CardDescription>Enter the details of your expense</CardDescription>
              </CardHeader>
              <CardContent>
                <ExpenseForm onSubmit={addExpense} onCancel={() => setIsAddingExpense(false)} />
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

        <TabsContent value="summary">
          <ExpenseSummary expenses={expenses} />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
