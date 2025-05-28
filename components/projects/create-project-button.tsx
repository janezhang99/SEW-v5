"use client"

import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface CreateProjectButtonProps {
  className?: string
}

export function CreateProjectButton({ className }: CreateProjectButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push("/projects/create")
  }

  return (
    <Button onClick={handleClick} className={className} size="sm">
      <PlusCircle className="mr-2 h-4 w-4" />
      Create Project
    </Button>
  )
}
