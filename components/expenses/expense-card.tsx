"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Calendar, MoreVertical, Edit, Trash2, FileText, ExternalLink } from "lucide-react"
import { format } from "date-fns"
import { type Expense, EXPENSE_CATEGORIES, EXPENSE_STATUS } from "@/contexts/expenses-context"
import { formatCurrency } from "@/lib/format-currency"
import { getIcon } from "@/lib/get-icon"
import { ExpenseForm } from "./expense-form"

interface ExpenseCardProps {
  expense: Expense
  onUpdate: (id: string, expense: Partial<Expense>) => void
  onDelete: (id: string) => void
}

export function ExpenseCard({ expense, onUpdate, onDelete }: ExpenseCardProps) {
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  // Find category and status details
  const category = EXPENSE_CATEGORIES.find((c) => c.id === expense.category)
  const status = EXPENSE_STATUS.find((s) => s.id === expense.status)

  // Get the icon component
  const CategoryIcon = category ? getIcon(category.icon) : getIcon("MoreHorizontal")

  // Format the date
  const formattedDate = format(new Date(expense.date), "MMM d, yyyy")

  // Handle form submission
  const handleFormSubmit = (values: any) => {
    onUpdate(expense.id, values)
    setShowEditDialog(false)
  }

  // Handle delete confirmation
  const handleDelete = () => {
    onDelete(expense.id)
    setShowDeleteDialog(false)
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-sew-midnight-blue/10 flex items-center justify-center text-sew-midnight-blue">
              <CategoryIcon className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-base">{expense.description}</CardTitle>
              <CardDescription>{category?.name || "Uncategorized"}</CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Edit Expense</DialogTitle>
                    <DialogDescription>Make changes to this expense record.</DialogDescription>
                  </DialogHeader>
                  <ExpenseForm
                    expense={expense}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setShowEditDialog(false)}
                  />
                </DialogContent>
              </Dialog>

              <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete this expense record from your account.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {expense.receiptUrl && (
                <DropdownMenuItem asChild>
                  <a href={expense.receiptUrl} target="_blank" rel="noopener noreferrer">
                    <FileText className="mr-2 h-4 w-4" />
                    <span>View Receipt</span>
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </a>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-sew-midnight-blue">{formatCurrency(expense.amount)}</span>
            {status && <Badge className={status.color}>{status.name}</Badge>}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-1 h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          {expense.notes && <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{expense.notes}</p>}
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Last updated: {format(new Date(expense.updatedAt), "MMM d, yyyy")}
      </CardFooter>
    </Card>
  )
}
