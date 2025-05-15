"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { cn } from "@/lib/utils"

// Define the theme types
export type ThemeKey = "northern" | "woodland" | "plains" | "coastal" | "urban" | "default"

export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
  muted: string
  border: string
  gradientPrimary: string
  gradientSecondary: string
  gradientAccent: string
}

export interface ThemePatterns {
  header: string
  card: string
  divider: string
}

export interface ThemeImages {
  backgroundImage: string
  iconSet: string
}

export interface Theme {
  name: string
  description: string
  colors: ThemeColors
  patterns: ThemePatterns
  images: ThemeImages
  fontFamily: string
}

// Define the themes
export const themes: Record<ThemeKey, Theme> = {
  northern: {
    name: "Aurora Borealis",
    description: "Inspired by the mesmerizing Northern Lights",
    colors: {
      primary: "text-[#0B3D91]", // Deep Teal
      secondary: "text-[#00FF9D]", // Vibrant Green
      accent: "text-[#A259FF]", // Soft Purple
      background: "bg-[#1A1A2E]", // Midnight Blue
      text: "text-[#E5E5E5]", // Icy White
      muted: "text-[#8896B0]", // Muted blend
      border: "border-[#2D3748]",
      gradientPrimary: "from-[#0B3D91] to-[#1A1A2E]", // Deep Teal to Midnight Blue
      gradientSecondary: "from-[#00FF9D] to-[#0B3D91]", // Vibrant Green to Deep Teal
      gradientAccent: "from-[#A259FF] to-[#00FF9D]", // Soft Purple to Vibrant Green
    },
    patterns: {
      header: "bg-[url('/patterns/northern-header.svg')]",
      card: "bg-[url('/patterns/northern-card.svg')]",
      divider: "bg-[url('/patterns/northern-divider.svg')]",
    },
    images: {
      backgroundImage: "/placeholder-vj1kw.png",
      iconSet: "northern",
    },
    fontFamily: "font-sans",
  },
  woodland: {
    name: "Woodland",
    description: "Reflecting the forests and woodland Indigenous artistic traditions",
    colors: {
      primary: "text-green-700",
      secondary: "text-amber-600",
      accent: "text-red-600",
      background: "bg-stone-50",
      text: "text-stone-900",
      muted: "text-stone-500",
      border: "border-stone-200",
      gradientPrimary: "from-green-500 to-emerald-600",
      gradientSecondary: "from-amber-400 to-yellow-500",
      gradientAccent: "from-red-500 to-rose-500",
    },
    patterns: {
      header: "bg-[url('/patterns/woodland-header.svg')]",
      card: "bg-[url('/patterns/woodland-card.svg')]",
      divider: "bg-[url('/patterns/woodland-divider.svg')]",
    },
    images: {
      backgroundImage: "/placeholder-vj1kw.png",
      iconSet: "woodland",
    },
    fontFamily: "font-serif",
  },
  plains: {
    name: "Plains",
    description: "Honoring the artistic traditions of Plains Indigenous communities",
    colors: {
      primary: "text-amber-700",
      secondary: "text-sky-600",
      accent: "text-red-600",
      background: "bg-orange-50",
      text: "text-orange-900",
      muted: "text-orange-700",
      border: "border-orange-200",
      gradientPrimary: "from-amber-500 to-orange-600",
      gradientSecondary: "from-sky-400 to-blue-500",
      gradientAccent: "from-red-500 to-rose-500",
    },
    patterns: {
      header: "bg-[url('/patterns/plains-header.svg')]",
      card: "bg-[url('/patterns/plains-card.svg')]",
      divider: "bg-[url('/patterns/plains-divider.svg')]",
    },
    images: {
      backgroundImage: "/placeholder-vj1kw.png",
      iconSet: "plains",
    },
    fontFamily: "font-sans",
  },
  coastal: {
    name: "Coastal",
    description: "Inspired by the artistic traditions of Coastal Indigenous communities",
    colors: {
      primary: "text-cyan-700",
      secondary: "text-emerald-600",
      accent: "text-red-600",
      background: "bg-blue-50",
      text: "text-blue-900",
      muted: "text-blue-700",
      border: "border-blue-200",
      gradientPrimary: "from-cyan-500 to-blue-600",
      gradientSecondary: "from-emerald-400 to-green-500",
      gradientAccent: "from-red-500 to-rose-500",
    },
    patterns: {
      header: "bg-[url('/patterns/coastal-header.svg')]",
      card: "bg-[url('/patterns/coastal-card.svg')]",
      divider: "bg-[url('/patterns/coastal-divider.svg')]",
    },
    images: {
      backgroundImage: "/placeholder-vj1kw.png",
      iconSet: "coastal",
    },
    fontFamily: "font-sans",
  },
  urban: {
    name: "Urban Indigenous",
    description: "Contemporary design reflecting urban Indigenous experiences",
    colors: {
      primary: "text-violet-700",
      secondary: "text-pink-600",
      accent: "text-amber-600",
      background: "bg-zinc-50",
      text: "text-zinc-900",
      muted: "text-zinc-500",
      border: "border-zinc-200",
      gradientPrimary: "from-violet-500 to-purple-600",
      gradientSecondary: "from-pink-400 to-rose-500",
      gradientAccent: "from-amber-500 to-orange-500",
    },
    patterns: {
      header: "bg-[url('/patterns/urban-header.svg')]",
      card: "bg-[url('/patterns/urban-card.svg')]",
      divider: "bg-[url('/patterns/urban-divider.svg')]",
    },
    images: {
      backgroundImage: "/placeholder-vj1kw.png",
      iconSet: "urban",
    },
    fontFamily: "font-sans",
  },
  default: {
    name: "Default",
    description: "Standard design system",
    colors: {
      primary: "text-blue-700",
      secondary: "text-green-600",
      accent: "text-amber-600",
      background: "bg-white",
      text: "text-gray-900",
      muted: "text-gray-500",
      border: "border-gray-200",
      gradientPrimary: "from-blue-500 to-indigo-600",
      gradientSecondary: "from-green-400 to-emerald-500",
      gradientAccent: "from-amber-500 to-orange-500",
    },
    patterns: {
      header: "",
      card: "",
      divider: "",
    },
    images: {
      backgroundImage: "",
      iconSet: "default",
    },
    fontFamily: "font-sans",
  },
}

// Create the context
interface IndigenousThemeContextType {
  theme: Theme
  themeKey: ThemeKey
  setTheme: (theme: ThemeKey) => void
}

const IndigenousThemeContext = createContext<IndigenousThemeContextType | undefined>(undefined)

// Create the provider
interface IndigenousThemeProviderProps {
  children: ReactNode
  defaultTheme?: ThemeKey
}

export function IndigenousThemeProvider({ children, defaultTheme = "northern" }: IndigenousThemeProviderProps) {
  const [themeKey, setThemeKey] = useState<ThemeKey>(defaultTheme)

  // Load theme from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("indigenousTheme") as ThemeKey | null
      if (savedTheme && themes[savedTheme]) {
        setThemeKey(savedTheme)
      }
    }
  }, [])

  // Save theme to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("indigenousTheme", themeKey)
    }
  }, [themeKey])

  // Ensure we always have a valid theme
  const theme = themes[themeKey] || themes.default

  const setTheme = (newTheme: ThemeKey) => {
    if (themes[newTheme]) {
      setThemeKey(newTheme)
    }
  }

  return (
    <IndigenousThemeContext.Provider value={{ theme, themeKey, setTheme }}>
      <div className={cn(theme.fontFamily, theme.colors.background, theme.colors.text)}>{children}</div>
    </IndigenousThemeContext.Provider>
  )
}

// Create a hook to use the theme
export function useIndigenousTheme() {
  const context = useContext(IndigenousThemeContext)
  if (context === undefined) {
    throw new Error("useIndigenousTheme must be used within an IndigenousThemeProvider")
  }
  return context
}

// Create themed component variants
export function ThemedCard({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { theme } = useIndigenousTheme()

  return (
    <div className={cn("rounded-lg border p-4", theme.colors.background, theme.colors.border, className)} {...props}>
      {children}
    </div>
  )
}

export function ThemedButton({
  children,
  className,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "accent" | "outline"
}) {
  const { theme } = useIndigenousTheme()

  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md font-medium transition-colors",
        variant === "primary" && `bg-gradient-to-r ${theme.colors.gradientPrimary} text-white`,
        variant === "secondary" && `bg-gradient-to-r ${theme.colors.gradientSecondary} text-white`,
        variant === "accent" && `bg-gradient-to-r ${theme.colors.gradientAccent} text-white`,
        variant === "outline" && `border ${theme.colors.border} ${theme.colors.text} hover:bg-gray-50`,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function ThemedHeading({
  children,
  className,
  level = 2,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & {
  level?: 1 | 2 | 3 | 4 | 5 | 6
}) {
  const { theme } = useIndigenousTheme()
  const Tag = `h${level}` as keyof JSX.IntrinsicElements

  return (
    <Tag
      className={cn(
        theme.colors.text,
        level === 1 && "text-3xl font-bold",
        level === 2 && "text-2xl font-bold",
        level === 3 && "text-xl font-semibold",
        level === 4 && "text-lg font-semibold",
        level === 5 && "text-base font-medium",
        level === 6 && "text-sm font-medium",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

export function ThemedText({
  children,
  className,
  muted = false,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & {
  muted?: boolean
}) {
  const { theme } = useIndigenousTheme()

  return (
    <p className={cn(muted ? theme.colors.muted : theme.colors.text, className)} {...props}>
      {children}
    </p>
  )
}

export function ThemedDivider({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) {
  const { theme } = useIndigenousTheme()

  return <hr className={cn("my-4", theme.colors.border, className)} {...props} />
}

export function ThemedBadge({
  children,
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "primary" | "secondary" | "accent"
}) {
  const { theme } = useIndigenousTheme()

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variant === "default" && `bg-gray-100 ${theme.colors.text}`,
        variant === "primary" && `bg-gradient-to-r ${theme.colors.gradientPrimary} text-white`,
        variant === "secondary" && `bg-gradient-to-r ${theme.colors.gradientSecondary} text-white`,
        variant === "accent" && `bg-gradient-to-r ${theme.colors.gradientAccent} text-white`,
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

// Theme selector component
export function ThemeSelector() {
  const { themeKey, setTheme } = useIndigenousTheme()

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-medium mb-3">Cultural Theme</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {(Object.keys(themes) as ThemeKey[])
          .filter((key) => key !== "default")
          .map((key) => {
            // Safely access the theme
            const theme = themes[key]
            if (!theme) return null

            return (
              <button
                key={key}
                onClick={() => setTheme(key)}
                className={cn(
                  "p-3 rounded-lg border transition-all text-left",
                  themeKey === key ? "ring-2 ring-blue-500" : "",
                )}
              >
                <div className="flex gap-1 mb-2">
                  <div
                    className="h-2 w-full rounded-l"
                    style={{
                      backgroundColor: theme.colors.primary.includes("[")
                        ? theme.colors.primary.split("[")[1].split("]")[0]
                        : "#6366f1",
                    }}
                  />
                  <div
                    className="h-2 w-full"
                    style={{
                      backgroundColor: theme.colors.secondary.includes("[")
                        ? theme.colors.secondary.split("[")[1].split("]")[0]
                        : "#10b981",
                    }}
                  />
                  <div
                    className="h-2 w-full rounded-r"
                    style={{
                      backgroundColor: theme.colors.accent.includes("[")
                        ? theme.colors.accent.split("[")[1].split("]")[0]
                        : "#f59e0b",
                    }}
                  />
                </div>
                <div className="font-medium">{theme.name}</div>
              </button>
            )
          })}
      </div>
    </div>
  )
}
