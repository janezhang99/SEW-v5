import type React from "react"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description?: string
  className?: string
  children?: React.ReactNode
}

export function PageHeader({ title, description, className, children }: PageHeaderProps) {
  return (
    <div className="w-full bg-black/90 text-white py-10 mb-6 shadow-md">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center">{title}</h1>
        {description && <p className="text-center text-muted-foreground mt-2">{description}</p>}
        {children && <div className={cn("mt-4", className)}>{children}</div>}
      </div>
    </div>
  )
}
