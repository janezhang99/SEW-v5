"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useView } from "@/components/view-toggle"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  const { viewMode } = useView()

  // Define navigation items
  const navItems = [
    {
      name: "Home",
      href: "/",
      active: pathname === "/",
    },
    {
      name: "Dashboard",
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      name: "Domains",
      href: "/domains",
      active: pathname.startsWith("/domains"),
    },
    {
      name: "Courses",
      href: "/courses",
      active: pathname.startsWith("/courses"),
    },
    {
      name: "Projects",
      href: "/projects",
      active: pathname.startsWith("/projects"),
    },
    {
      name: "Idea Lab",
      href: "/idea-lab",
      active: pathname.startsWith("/idea-lab"),
    },
    {
      name: "Events",
      href: "/events",
      active: pathname.startsWith("/events"),
    },
    {
      name: "Resources",
      href: "/resources",
      active: pathname.startsWith("/resources"),
    },
    {
      name: "Connect",
      href: "/connect",
      active: pathname.startsWith("/connect"),
    },
  ]

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      {navItems.map((item) => (
        <Button
          key={item.name}
          variant="ghost"
          size="sm"
          asChild
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            item.active ? "text-primary" : "text-muted-foreground",
          )}
        >
          <Link href={item.href}>{item.name}</Link>
        </Button>
      ))}
    </nav>
  )
}
