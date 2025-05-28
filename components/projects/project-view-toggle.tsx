"use client"

import { Button } from "@/components/ui/button"
import { Eye, Users } from "lucide-react"

interface ProjectViewToggleProps {
  view: "public" | "private"
  onChange: (view: "public" | "private") => void
}

export function ProjectViewToggle({ view, onChange }: ProjectViewToggleProps) {
  return (
    <div className="flex items-center justify-end mb-4">
      <div className="flex items-center bg-muted rounded-lg p-1">
        <Button
          variant={view === "public" ? "default" : "ghost"}
          size="sm"
          className="flex items-center gap-1"
          onClick={() => onChange("public")}
        >
          <Eye className="h-4 w-4" />
          <span>Public View</span>
        </Button>
        <Button
          variant={view === "private" ? "default" : "ghost"}
          size="sm"
          className="flex items-center gap-1"
          onClick={() => onChange("private")}
        >
          <Users className="h-4 w-4" />
          <span>Team View</span>
        </Button>
      </div>
    </div>
  )
}
