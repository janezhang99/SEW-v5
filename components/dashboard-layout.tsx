import type React from "react"
import { AICompanionProvider } from "@/components/ai-companion/ai-companion-provider"
import { AICompanion } from "@/components/ai-companion/ai-companion"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { SidebarProvider, Sidebar, SidebarContent, SidebarInset } from "@/components/ui/sidebar"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        {/* Simplified header with fewer items */}
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="container flex h-16 items-center justify-between px-4">
            <MainNav />
            <div className="flex items-center gap-4">
              <ModeToggle />
              <UserNav />
            </div>
          </div>
        </header>

        <div className="flex flex-1">
          <Sidebar variant="inset" collapsible="icon">
            <SidebarContent>{/* Sidebar content here */}</SidebarContent>
          </Sidebar>

          <SidebarInset>
            <div className="container relative px-4 py-6 md:px-6 lg:px-8">
              {/* Main content area with increased spacing */}
              <div className="grid gap-8">{children}</div>

              {/* Persistent AI Companion in a fixed position */}
              <AICompanionProvider>
                <div className="fixed bottom-6 right-6 z-50">
                  <AICompanion />
                </div>
              </AICompanionProvider>
            </div>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  )
}
