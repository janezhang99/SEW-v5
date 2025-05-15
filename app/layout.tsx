import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AICompanionProvider } from "@/components/ai-companion/ai-companion-context"
import { TasksProvider } from "@/contexts/tasks-context"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <TasksProvider>
            <AICompanionProvider>{children}</AICompanionProvider>
          </TasksProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
