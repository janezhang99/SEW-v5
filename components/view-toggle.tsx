"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import { EyeIcon, UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Create context to manage view state across the application
type ViewMode = "public" | "authenticated" | "admin"
type ViewContextType = {
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  hasCompletedAssessment: boolean
  setHasCompletedAssessment: (completed: boolean) => void
}

const ViewContext = createContext<ViewContextType | undefined>(undefined)

export function ViewProvider({ children }: { children: React.ReactNode }) {
  // Default to public view
  const [viewMode, setViewMode] = useState<ViewMode>("public")
  // Track if the user has completed the assessment
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false)

  // Persist view mode in localStorage
  useEffect(() => {
    const storedViewMode = localStorage.getItem("viewMode") as ViewMode | null
    const storedAssessment = localStorage.getItem("hasCompletedAssessment")

    if (storedViewMode) {
      setViewMode(storedViewMode)
    }

    if (storedAssessment) {
      setHasCompletedAssessment(storedAssessment === "true")
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("viewMode", viewMode)
    localStorage.setItem("hasCompletedAssessment", String(hasCompletedAssessment))
  }, [viewMode, hasCompletedAssessment])

  return (
    <ViewContext.Provider value={{ viewMode, setViewMode, hasCompletedAssessment, setHasCompletedAssessment }}>
      {children}
    </ViewContext.Provider>
  )
}

export function useView() {
  const context = useContext(ViewContext)
  if (context === undefined) {
    throw new Error("useView must be used within a ViewProvider")
  }
  return context
}

// This component is now only used for floating toggle in development/testing
export function ViewToggle() {
  const { viewMode, setViewMode, hasCompletedAssessment, setHasCompletedAssessment } = useView()

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <Badge variant={viewMode === "public" ? "default" : "outline"} className="hidden sm:flex">
        {viewMode === "public" ? "Public View" : "Authenticated View"}
      </Badge>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            {viewMode === "public" ? <EyeIcon className="h-4 w-4" /> : <UserIcon className="h-4 w-4" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>View Mode</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setViewMode("public")} className={viewMode === "public" ? "bg-muted" : ""}>
            <EyeIcon className="mr-2 h-4 w-4" />
            Public View
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setViewMode("authenticated")}
            className={viewMode === "authenticated" ? "bg-muted" : ""}
          >
            <UserIcon className="mr-2 h-4 w-4" />
            Authenticated View
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Assessment Status</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => setHasCompletedAssessment(!hasCompletedAssessment)}
            className="flex items-center"
          >
            <input type="checkbox" checked={hasCompletedAssessment} onChange={() => {}} className="mr-2" />
            Completed Assessment
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
