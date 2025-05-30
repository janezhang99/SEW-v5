import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AICompanionProvider } from "@/components/ai-companion/ai-companion-context"
import { TasksProvider } from "@/contexts/tasks-context"
import { ExpensesProvider } from "@/contexts/expenses-context"
import { AuthProvider } from "@/contexts/auth-context"
import { NotificationSystem } from "@/components/notification-system"
import { GlobalSearch } from "@/components/global-search"
import { Suspense } from "react"

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <ExpensesProvider>
              <TasksProvider>
                <AICompanionProvider>
                  <NotificationSystem />
                  <Suspense>
                    <GlobalSearch />
                  </Suspense>
                  <div className="relative flex min-h-screen flex-col">{children}</div>
                </AICompanionProvider>
              </TasksProvider>
            </ExpensesProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
