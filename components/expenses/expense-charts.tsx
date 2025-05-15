"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, PieChart, Bar, Pie, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

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

export function ExpenseCharts({ expenses }) {
  // Prepare data for category breakdown chart
  const categoryData = expenses.reduce((acc, expense) => {
    const category = expense.category
    const existingCategory = acc.find((item) => item.name === category)

    if (existingCategory) {
      existingCategory.value += expense.amount
    } else {
      acc.push({
        name: category,
        value: expense.amount,
        label: getCategoryLabel(category),
      })
    }

    return acc
  }, [])

  // Sort by value (descending)
  categoryData.sort((a, b) => b.value - a.value)

  // Prepare data for monthly expenses chart
  const monthlyData = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date)
    const month = date.toLocaleString("default", { month: "short" })
    const existingMonth = acc.find((item) => item.month === month)

    if (existingMonth) {
      existingMonth.amount += expense.amount
    } else {
      acc.push({
        month,
        amount: expense.amount,
      })
    }

    return acc
  }, [])

  // Sort by month
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  monthlyData.sort((a, b) => months.indexOf(a.month) - months.indexOf(b.month))

  // Prepare data for status breakdown chart
  const statusData = expenses.reduce((acc, expense) => {
    const status = expense.status
    const existingStatus = acc.find((item) => item.name === status)

    if (existingStatus) {
      existingStatus.value += expense.amount
    } else {
      acc.push({
        name: status,
        value: expense.amount,
        label: status.charAt(0).toUpperCase() + status.slice(1),
      })
    }

    return acc
  }, [])

  // Colors for the charts
  const COLORS = ["#2A4B6A", "#F26D3D", "#5A9E74", "#4A90E2", "#9B59B6", "#F1C40F", "#E74C3C", "#95A5A6"]
  const STATUS_COLORS = {
    approved: "#5A9E74",
    pending: "#F26D3D",
    rejected: "#E74C3C",
  }

  return (
    <Card className="col-span-2 md:col-span-1">
      <CardHeader>
        <CardTitle>Expense Analytics</CardTitle>
        <CardDescription>Visual breakdown of your expenses</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="category">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="category">By Category</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="status">By Status</TabsTrigger>
          </TabsList>

          <TabsContent value="category" className="h-[300px]">
            <ChartContainer
              config={categoryData.reduce((acc, item, index) => {
                acc[item.name] = {
                  label: item.label,
                  color: COLORS[index % COLORS.length],
                }
                return acc
              }, {})}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="label"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>

          <TabsContent value="monthly" className="h-[300px]">
            <ChartContainer
              config={{
                amount: {
                  label: "Amount ($)",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="amount" fill="var(--color-amount)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>

          <TabsContent value="status" className="h-[300px]">
            <ChartContainer
              config={statusData.reduce((acc, item) => {
                acc[item.name] = {
                  label: item.label,
                  color: STATUS_COLORS[item.name] || "#95A5A6",
                }
                return acc
              }, {})}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="label"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusData.map((entry) => (
                      <Cell key={`cell-${entry.name}`} fill={STATUS_COLORS[entry.name] || "#95A5A6"} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
