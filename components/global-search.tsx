"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useTasks } from "@/contexts/tasks-context"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function GlobalSearch() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const tasksContext = useTasks()

  let tasks = []
  let tasksLoading = true

  try {
    tasks = tasksContext?.tasks || []
    tasksLoading = tasksContext?.loading || false
  } catch (error) {
    // Context not available, use empty array
    tasks = []
    tasksLoading = false
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 xl:mr-2" aria-hidden="true" />
        <span className="hidden xl:inline-flex">Search...</span>
        <span className="sr-only">Search</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {!tasksLoading && tasks.length > 0 && (
            <CommandGroup heading="Learning">
              {tasks.slice(0, 3).map((task) => (
                <CommandItem
                  key={task.id}
                  onSelect={() => runCommand(() => router.push(`/dashboard/learning/${task.category}/${task.id}`))}
                >
                  <span>{task.title}</span>
                </CommandItem>
              ))}
              <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/learning"))}>
                View all learning tasks...
              </CommandItem>
            </CommandGroup>
          )}

          <CommandSeparator />

          <CommandGroup heading="Pages">
            <CommandItem onSelect={() => runCommand(() => router.push("/dashboard"))}>Dashboard</CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/learning"))}>Learning</CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/funding"))}>Funding</CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/expenses"))}>Expenses</CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/community"))}>Community</CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/mentorship"))}>
              Mentorship
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
