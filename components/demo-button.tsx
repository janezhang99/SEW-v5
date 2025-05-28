import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface DemoButtonProps {
  href: string
  icon: LucideIcon
  label: string
  description?: string
  className?: string
}

export function DemoButton({ href, icon: Icon, label, description, className }: DemoButtonProps) {
  return (
    <Link href={href} className="block no-underline">
      <Button
        variant="outline"
        className={cn("h-auto w-full justify-start gap-4 border-2 p-4 text-left hover:bg-muted/50", className)}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-base font-medium">{label}</span>
          {description && <span className="text-sm text-muted-foreground">{description}</span>}
        </div>
      </Button>
    </Link>
  )
}
