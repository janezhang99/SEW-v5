import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AICompanionProvider } from "@/components/ai-companion/ai-companion-context"
import { TasksProvider } from "@/contexts/tasks-context"
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
          <ExpensesProvider>
            <TasksProvider>
              <AICompanionProvider>
                <div className="relative flex min-h-screen flex-col">{children}</div>
              </AICompanionProvider>
            </TasksProvider>
          </ExpensesProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
