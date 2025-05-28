import type React from "react"
import { cn } from "@/lib/utils"

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardShell({ children, className, ...props }: DashboardShellProps) {
  return (
    <div className={cn("grid items-start gap-8 p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-950", className)} {...props}>
      {children}
    </div>
  )
}
