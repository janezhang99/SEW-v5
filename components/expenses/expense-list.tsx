"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ExpenseForm } from "./expense-form"
import { Edit, MoreVertical, Trash2, FileText, Download, Search, Filter } from "lucide-react"
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

export function ExpenseList({ expenses, onDelete, onUpdate }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [editingExpense, setEditingExpense] = useState(null)
  const [viewingReceipt, setViewingReceipt] = useState(null)

  // Filter expenses based on search term and filters
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getCategoryLabel(expense.category).toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter ? expense.category === categoryFilter : true
    const matchesStatus = statusFilter ? expense.status === statusFilter : true

    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleEdit = (expense) => {
    setEditingExpense(expense)
  }

  const handleUpdate = (updatedExpense) => {
    onUpdate(updatedExpense)
    setEditingExpense(null)
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      onDelete(id)
    }
  }

  const handleViewReceipt = (expense) => {
    setViewingReceipt(expense)
  }

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
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Expense Transactions</CardTitle>
              <CardDescription>View and manage your expense records</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search expenses..."
                  className="pl-8 w-full sm:w-[200px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="Category" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="materials">Materials & Supplies</SelectItem>
                    <SelectItem value="equipment">Equipment</SelectItem>
                    <SelectItem value="services">Professional Services</SelectItem>
                    <SelectItem value="travel">Travel & Transportation</SelectItem>
                    <SelectItem value="food">Food & Refreshments</SelectItem>
                    <SelectItem value="venue">Venue & Space Rental</SelectItem>
                    <SelectItem value="marketing">Marketing & Promotion</SelectItem>
                    <SelectItem value="other">Other Expenses</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[120px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredExpenses.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No expenses found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <h3 className="font-medium truncate">{expense.description}</h3>
                      {getStatusBadge(expense.status)}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <span className="font-medium">${expense.amount.toFixed(2)}</span>
                      </div>
                      <div>{getCategoryLabel(expense.category)}</div>
                      <div>{format(parseISO(expense.date), "MMM d, yyyy")}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3 sm:mt-0">
                    {expense.receipt && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-sew-midnight-blue"
                        onClick={() => handleViewReceipt(expense)}
                      >
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">View Receipt</span>
                      </Button>
                    )}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">More</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(expense)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(expense.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Expense Dialog */}
      {editingExpense && (
        <Dialog open={!!editingExpense} onOpenChange={(open) => !open && setEditingExpense(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Expense</DialogTitle>
            </DialogHeader>
            <ExpenseForm expense={editingExpense} onSubmit={handleUpdate} onCancel={() => setEditingExpense(null)} />
          </DialogContent>
        </Dialog>
      )}

      {/* View Receipt Dialog */}
      {viewingReceipt && (
        <Dialog open={!!viewingReceipt} onOpenChange={(open) => !open && setViewingReceipt(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Receipt</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center">
              <div className="bg-muted p-4 rounded-lg w-full text-center">
                <p className="mb-2">Receipt for: {viewingReceipt.description}</p>
                <p className="text-sm text-muted-foreground mb-4">
                  ${viewingReceipt.amount.toFixed(2)} - {format(parseISO(viewingReceipt.date), "MMM d, yyyy")}
                </p>
                <Button className="gap-2 bg-sew-midnight-blue hover:bg-sew-midnight-blue/90">
                  <Download className="h-4 w-4" />
                  Download Receipt
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
