import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { GlobalSearch } from "@/components/global-search"
import { Suspense } from "react"
import { AICompanionProvider } from "@/components/ai-companion/ai-companion-context"
import { TasksProvider } from "@/contexts/tasks-context"
import { ProjectsProvider } from "@/contexts/projects-context"
import { ExpensesProvider } from "@/contexts/expenses-context"

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ProjectsProvider>
            <ExpensesProvider>
              <TasksProvider>
                <AICompanionProvider>
                  <div className="relative flex min-h-screen flex-col">
                    <header className="sticky top-0 z-40 border-b bg-background">
                      <div className="container flex h-14 items-center">
                        <div className="mr-4 flex">
                          <a href="/" className="mr-6 flex items-center space-x-2">
                            <span className="font-bold">Small Economy Works</span>
                          </a>
                        </div>
                        <div className="flex flex-1 items-center justify-end space-x-2">
                          <nav className="flex items-center space-x-2">
                            <Suspense>
                              <GlobalSearch />
                            </Suspense>
                          </nav>
                        </div>
                      </div>
                    </header>
                    <div className="flex-1">{children}</div>
                  </div>
                </AICompanionProvider>
              </TasksProvider>
            </ExpensesProvider>
          </ProjectsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
