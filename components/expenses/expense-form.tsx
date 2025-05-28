"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Upload } from "lucide-react"
import { cn } from "@/lib/utils"

const expenseCategories = [
  { value: "materials", label: "Materials & Supplies" },
  { value: "equipment", label: "Equipment" },
  { value: "services", label: "Professional Services" },
  { value: "travel", label: "Travel & Transportation" },
  { value: "food", label: "Food & Refreshments" },
  { value: "venue", label: "Venue & Space Rental" },
  { value: "marketing", label: "Marketing & Promotion" },
  { value: "other", label: "Other Expenses" },
]

export function ExpenseForm({ expense, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    date: expense?.date ? new Date(expense.date) : new Date(),
    amount: expense?.amount || "",
    category: expense?.category || "",
    description: expense?.description || "",
    receipt: expense?.receipt || null,
  })

  const [errors, setErrors] = useState({})

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
    // Clear error when field is updated
    if (errors[field]) {
      setErrors({ ...errors, [field]: null })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form
    const newErrors = {}
    if (!formData.amount) newErrors.amount = "Amount is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.description) newErrors.description = "Description is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Format date to YYYY-MM-DD
    const formattedDate = format(formData.date, "yyyy-MM-dd")

    onSubmit({
      ...formData,
      date: formattedDate,
      amount: Number.parseFloat(formData.amount),
      id: expense?.id,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !formData.date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.date}
                onSelect={(date) => handleChange("date", date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount ($)</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={formData.amount}
            onChange={(e) => handleChange("amount", e.target.value)}
            className={errors.amount ? "border-red-500" : ""}
          />
          {errors.amount && <p className="text-red-500 text-xs">{errors.amount}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
          <SelectTrigger className={errors.category ? "border-red-500" : ""}>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {expenseCategories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && <p className="text-red-500 text-xs">{errors.category}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe what this expense was for"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className={errors.description ? "border-red-500" : ""}
        />
        {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="receipt">Receipt (optional)</Label>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => document.getElementById("receipt-upload").click()}
          >
            <Upload className="mr-2 h-4 w-4" />
            {formData.receipt ? "Change Receipt" : "Upload Receipt"}
          </Button>
          <input
            id="receipt-upload"
            type="file"
            accept="image/*,.pdf"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleChange("receipt", URL.createObjectURL(e.target.files[0]))
              }
            }}
          />
          {formData.receipt && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleChange("receipt", null)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </Button>
          )}
        </div>
        {formData.receipt && <p className="text-xs text-muted-foreground">Receipt uploaded</p>}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-sew-moss-green hover:bg-sew-moss-green/90">
          {expense ? "Update Expense" : "Add Expense"}
        </Button>
      </div>
    </form>
  )
}
