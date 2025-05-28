"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format, parseISO, isWithinInterval, subMonths } from "date-fns"
import { Download, FileText, CalendarIcon, Filter } from "lucide-react"
import { cn } from "@/lib/utils"

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

export function ExpenseReport({ expenses }) {
  const [dateRange, setDateRange] = useState({
    from: subMonths(new Date(), 1),
    to: new Date(),
  })
  const [reportType, setReportType] = useState("summary")

  // Filter expenses by date range
  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = parseISO(expense.date)
    return isWithinInterval(expenseDate, { start: dateRange.from, end: dateRange.to })
  })

  // Calculate totals
  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)
  const approvedAmount = filteredExpenses
    .filter((expense) => expense.status === "approved")
    .reduce((sum, expense) => sum + expense.amount, 0)

  // Group expenses by category
  const expensesByCategory = filteredExpenses.reduce((acc, expense) => {
    const category = expense.category
    if (!acc[category]) {
      acc[category] = 0
    }
    acc[category] += expense.amount
    return acc
  }, {})

  // Sort categories by amount (descending)
  const sortedCategories = Object.entries(expensesByCategory).sort(([, a], [, b]) => b - a)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Report</CardTitle>
        <CardDescription>Create expense reports for your records</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Date Range</label>
            <div className="grid grid-cols-2 gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("justify-start text-left font-normal", !dateRange.from && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? format(dateRange.from, "MMM d, yyyy") : <span>Start date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateRange.from}
                    onSelect={(date) => setDateRange({ ...dateRange, from: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("justify-start text-left font-normal", !dateRange.to && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.to ? format(dateRange.to, "MMM d, yyyy") : <span>End date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateRange.to}
                    onSelect={(date) => setDateRange({ ...dateRange, to: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Report Type</label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Select report type" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="summary">Summary Report</SelectItem>
                <SelectItem value="detailed">Detailed Report</SelectItem>
                <SelectItem value="category">Category Breakdown</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="text-sm font-medium mb-2">Report Preview</h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Expense Report</h4>
                <p className="text-sm text-muted-foreground">
                  {format(dateRange.from, "MMM d, yyyy")} - {format(dateRange.to, "MMM d, yyyy")}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">Total: ${totalAmount.toFixed(2)}</p>
                <p className="text-sm text-sew-moss-green">Approved: ${approvedAmount.toFixed(2)}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Category Breakdown</h4>
              <div className="space-y-1">
                {sortedCategories.map(([category, amount]) => (
                  <div key={category} className="flex justify-between text-sm">
                    <span>{getCategoryLabel(category)}</span>
                    <span className="font-medium">${amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              {filteredExpenses.length} expense entries included in this report
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" className="gap-2">
          <FileText className="h-4 w-4" />
          Preview Full Report
        </Button>
        <Button className="gap-2 bg-sew-midnight-blue hover:bg-sew-midnight-blue/90">
          <Download className="h-4 w-4" />
          Download Report
        </Button>
      </CardFooter>
    </Card>
  )
}
