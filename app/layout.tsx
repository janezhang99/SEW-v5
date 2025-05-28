import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ViewProvider, ViewToggle } from "@/components/view-toggle"
import { ThreePaneLayout } from "@/components/three-pane-layout"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "CanAdapt Platform",
  description: "Climate adaptation knowledge and tools for Canadian practitioners",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ViewProvider>
            <ViewToggle />
            <ThreePaneLayout>{children}</ThreePaneLayout>
          </ViewProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
