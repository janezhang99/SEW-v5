"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"

// Define expense categories that align with project goals
export const EXPENSE_CATEGORIES = [
  { id: "materials", name: "Materials & Supplies", icon: "Package" },
  { id: "equipment", name: "Equipment", icon: "Laptop" },
  { id: "services", name: "Professional Services", icon: "Users" },
  { id: "travel", name: "Travel & Transportation", icon: "Map" },
  { id: "venue", name: "Venue & Space Rental", icon: "Home" },
  { id: "marketing", name: "Marketing & Promotion", icon: "Megaphone" },
  { id: "training", name: "Training & Education", icon: "GraduationCap" },
  { id: "community", name: "Community Engagement", icon: "Heart" },
  { id: "other", name: "Other Expenses", icon: "MoreHorizontal" },
]

// Define expense status options
export const EXPENSE_STATUS = [
  { id: "planned", name: "Planned", color: "bg-sew-sky-blue text-white" },
  { id: "pending", name: "Pending Approval", color: "bg-sew-sunset-orange text-white" },
  { id: "approved", name: "Approved", color: "bg-sew-moss-green text-white" },
  { id: "rejected", name: "Rejected", color: "bg-red-500 text-white" },
  { id: "paid", name: "Paid", color: "bg-sew-midnight-blue text-white" },
]

// Define the Expense type
export interface Expense {
  id: string
  description: string
  amount: number
  category: string
  date: string
  status: string
  notes?: string
  receiptUrl?: string
  createdAt: string
  updatedAt: string
}

// Define the context type
interface ExpensesContextType {
  expenses: Expense[]
  loading: boolean
  error: string | null
  addExpense: (expense: Omit<Expense, "id" | "createdAt" | "updatedAt">) => void
  updateExpense: (id: string, expense: Partial<Expense>) => void
  deleteExpense: (id: string) => void
  getExpenseById: (id: string) => Expense | undefined
  getExpensesByCategory: (category: string) => Expense[]
  getExpensesByStatus: (status: string) => Expense[]
  getTotalExpenses: () => number
  getPlannedExpenses: () => number
  getApprovedExpenses: () => number
  getPaidExpenses: () => number
  getCategoryTotals: () => { category: string; total: number }[]
  getMonthlyExpenses: () => { month: string; total: number }[]
}

// Create the context
const ExpensesContext = createContext<ExpensesContextType | undefined>(undefined)

// Sample expense data for demonstration
const sampleExpenses: Expense[] = [
  {
    id: uuidv4(),
    description: "Laptop for project management",
    amount: 899.99,
    category: "equipment",
    date: "2023-05-15",
    status: "paid",
    notes: "Essential for project coordination and online meetings",
    receiptUrl: "/receipts/laptop-receipt.pdf",
    createdAt: new Date(2023, 4, 15).toISOString(),
    updatedAt: new Date(2023, 4, 15).toISOString(),
  },
  {
    id: uuidv4(),
    description: "Community workshop supplies",
    amount: 245.5,
    category: "materials",
    date: "2023-06-02",
    status: "paid",
    notes: "Art supplies for youth engagement workshop",
    receiptUrl: "/receipts/art-supplies.pdf",
    createdAt: new Date(2023, 5, 2).toISOString(),
    updatedAt: new Date(2023, 5, 2).toISOString(),
  },
  {
    id: uuidv4(),
    description: "Local consultant fee",
    amount: 500.0,
    category: "services",
    date: "2023-06-15",
    status: "approved",
    notes: "Cultural advisor for project implementation",
    createdAt: new Date(2023, 5, 15).toISOString(),
    updatedAt: new Date(2023, 5, 15).toISOString(),
  },
  {
    id: uuidv4(),
    description: "Travel to remote community",
    amount: 350.75,
    category: "travel",
    date: "2023-07-10",
    status: "pending",
    notes: "Site visit for needs assessment",
    createdAt: new Date(2023, 6, 10).toISOString(),
    updatedAt: new Date(2023, 6, 10).toISOString(),
  },
  {
    id: uuidv4(),
    description: "Marketing materials",
    amount: 175.25,
    category: "marketing",
    date: "2023-07-20",
    status: "planned",
    notes: "Flyers and posters for community outreach",
    createdAt: new Date(2023, 6, 20).toISOString(),
    updatedAt: new Date(2023, 6, 20).toISOString(),
  },
  {
    id: uuidv4(),
    description: "Community center rental",
    amount: 300.0,
    category: "venue",
    date: "2023-08-05",
    status: "planned",
    notes: "For project launch event",
    createdAt: new Date(2023, 7, 5).toISOString(),
    updatedAt: new Date(2023, 7, 5).toISOString(),
  },
  {
    id: uuidv4(),
    description: "Online course subscription",
    amount: 199.0,
    category: "training",
    date: "2023-05-20",
    status: "paid",
    notes: "Digital marketing skills development",
    receiptUrl: "/receipts/course-receipt.pdf",
    createdAt: new Date(2023, 4, 20).toISOString(),
    updatedAt: new Date(2023, 4, 20).toISOString(),
  },
]

// Create the provider component
export function ExpensesProvider({ children }: { children: React.ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load expenses from localStorage on initial render
  useEffect(() => {
    const loadExpenses = () => {
      try {
        setLoading(true)
        const savedExpenses = localStorage.getItem("expenses")

        if (savedExpenses) {
          setExpenses(JSON.parse(savedExpenses))
        } else {
          // Use sample data if no saved expenses exist
          setExpenses(sampleExpenses)
          localStorage.setItem("expenses", JSON.stringify(sampleExpenses))
        }
      } catch (err) {
        console.error("Error loading expenses:", err)
        setError("Failed to load expenses. Please try again later.")
        setExpenses(sampleExpenses)
      } finally {
        setLoading(false)
      }
    }

    loadExpenses()
  }, [])

  // Save expenses to localStorage when they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("expenses", JSON.stringify(expenses))
    }
  }, [expenses, loading])

  // Add a new expense
  const addExpense = (expense: Omit<Expense, "id" | "createdAt" | "updatedAt">) => {
    const now = new Date().toISOString()
    const newExpense: Expense = {
      ...expense,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
    }
    setExpenses((prev) => [...prev, newExpense])
  }

  // Update an existing expense
  const updateExpense = (id: string, expenseUpdate: Partial<Expense>) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id ? { ...expense, ...expenseUpdate, updatedAt: new Date().toISOString() } : expense,
      ),
    )
  }

  // Delete an expense
  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id))
  }

  // Get expense by ID
  const getExpenseById = (id: string) => {
    return expenses.find((expense) => expense.id === id)
  }

  // Get expenses by category
  const getExpensesByCategory = (category: string) => {
    return expenses.filter((expense) => expense.category === category)
  }

  // Get expenses by status
  const getExpensesByStatus = (status: string) => {
    return expenses.filter((expense) => expense.status === status)
  }

  // Get total expenses
  const getTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0)
  }

  // Get planned expenses total
  const getPlannedExpenses = () => {
    return expenses
      .filter((expense) => expense.status === "planned")
      .reduce((total, expense) => total + expense.amount, 0)
  }

  // Get approved expenses total
  const getApprovedExpenses = () => {
    return expenses
      .filter((expense) => expense.status === "approved")
      .reduce((total, expense) => total + expense.amount, 0)
  }

  // Get paid expenses total
  const getPaidExpenses = () => {
    return expenses.filter((expense) => expense.status === "paid").reduce((total, expense) => total + expense.amount, 0)
  }

  // Get category totals for reporting
  const getCategoryTotals = () => {
    const categoryTotals: Record<string, number> = {}

    expenses.forEach((expense) => {
      if (!categoryTotals[expense.category]) {
        categoryTotals[expense.category] = 0
      }
      categoryTotals[expense.category] += expense.amount
    })

    return Object.entries(categoryTotals).map(([category, total]) => ({
      category,
      total,
    }))
  }

  // Get monthly expenses for reporting
  const getMonthlyExpenses = () => {
    const monthlyTotals: Record<string, number> = {}

    expenses.forEach((expense) => {
      const month = expense.date.substring(0, 7) // Format: YYYY-MM
      if (!monthlyTotals[month]) {
        monthlyTotals[month] = 0
      }
      monthlyTotals[month] += expense.amount
    })

    return Object.entries(monthlyTotals)
      .map(([month, total]) => ({
        month,
        total,
      }))
      .sort((a, b) => a.month.localeCompare(b.month))
  }

  const value = {
    expenses,
    loading,
    error,
    addExpense,
    updateExpense,
    deleteExpense,
    getExpenseById,
    getExpensesByCategory,
    getExpensesByStatus,
    getTotalExpenses,
    getPlannedExpenses,
    getApprovedExpenses,
    getPaidExpenses,
    getCategoryTotals,
    getMonthlyExpenses,
  }

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

// Create a hook to use the expenses context
export const useExpenses = () => {
  const context = useContext(ExpensesContext)
  if (context === undefined) {
    throw new Error("useExpenses must be used within an ExpensesProvider")
  }
  return context
}
