"use client"

import React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

interface DashboardCardProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
  isCollapsible?: boolean
}

export function DashboardCard({ title, description, children, className, isCollapsible = false }: DashboardCardProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false)

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {isCollapsible && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-muted-foreground hover:text-foreground"
            >
              {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            </button>
          )}
        </div>
      </CardHeader>
      {!isCollapsed && <CardContent>{children}</CardContent>}
    </Card>
  )
}
