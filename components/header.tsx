"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { MainNav } from "@/components/main-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/user-nav"
import { useView } from "@/components/view-toggle"

export function Header() {
  const pathname = usePathname()
  const { viewMode } = useView()

  // Don't show the header on the landing page
  if (pathname === "/" && viewMode === "public") {
    return null
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/canadapt-logo.png" alt="CanAdapt Logo" width={32} height={32} />
          <span className="hidden font-bold sm:inline-block">CanAdapt</span>
        </Link>
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          {viewMode === "public" ? (
            <Button size="sm" asChild>
              <Link href="/register">Sign Up</Link>
            </Button>
          ) : (
            <UserNav />
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
