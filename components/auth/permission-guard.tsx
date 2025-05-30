"use client"

import { useAuth } from "@/contexts/auth-context"
import type { ReactNode } from "react"

interface PermissionGuardProps {
  section: string
  action?: string
  children: ReactNode
  fallback?: ReactNode
}

export function PermissionGuard({ section, action = "view", children, fallback = null }: PermissionGuardProps) {
  const { hasPermission } = useAuth()

  if (!hasPermission(section, action)) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
