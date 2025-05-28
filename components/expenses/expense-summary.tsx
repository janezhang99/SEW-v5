"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format, parseISO } from "date-fns"

// Helper function to get category label
const getCategoryLabel = (category) => {
  const categories = {
    materials: "Materials & Supplies",
    equipment: "Equipment",
    services: "Professional Services",
    travel: "Travel & Transportation",
    food: "Food & Refreshments",
    venue: "Venue & Space Rental",
    marketing: "Marketing & Promotion",
    other: "Other Expenses",
  }
  return categories[category] || category
}

export function ExpenseSummary({ expenses }) {
  // Calculate totals
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const approvedExpenses = expenses
    .filter((expense) => expense.status === "approved")
    .reduce((sum, expense) => sum + expense.amount, 0)
  const pendingExpenses = expenses
    .filter((expense) => expense.status === "pending")
    .reduce((sum, expense) => sum + expense.amount, 0)

  // Group expenses by category
  const expensesByCategory = expenses.reduce((acc, expense) => {
    const category = expense.category
    if (!acc[category]) {
      acc[category] = {
        total: 0,
        count: 0,
      }
    }
    acc[category].total += expense.amount
    acc[category].count += 1
    return acc
  }, {})

  // Sort categories by total amount (descending)
  const sortedCategories = Object.entries(expensesByCategory).sort(([, a], [, b]) => b.total - a.total)

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-sew-moss-green/20 text-sew-moss-green border-sew-moss-green/20">Approved</Badge>
      case "pending":
        return (
          <Badge className="bg-sew-sunset-orange/20 text-sew-sunset-orange border-sew-sunset-orange/20">Pending</Badge>
        )
      case "rejected":
        return <Badge className="bg-red-100 text-red-600 border-red-200">Rejected</Badge>
      default:
        return null
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Expense Summary</CardTitle>
          <CardDescription>Overview of your project expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Expenses</p>
                <p className="text-2xl font-bold">${totalExpenses.toFixed(2)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold text-sew-moss-green">${approvedExpenses.toFixed(2)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-sew-sunset-orange">${pendingExpenses.toFixed(2)}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Expenses by Category</h3>
              <div className="space-y-3">
                {sortedCategories.map(([category, data]) => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-sew-midnight-blue"></div>
                      <span className="text-sm">{getCategoryLabel(category)}</span>
                    </div>
                    <div className="text-sm font-medium">
                      ${data.total.toFixed(2)}
                      <span className="text-xs text-muted-foreground ml-1">({data.count})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest expense entries</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.slice(0, 5).map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{format(parseISO(expense.date), "MMM d, yyyy")}</TableCell>
                  <TableCell>${expense.amount.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(expense.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
