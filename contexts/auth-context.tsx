"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type UserRole = "project-lead" | "team-member" | "mentor" | "alumni" | "public-viewer"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  age: number
  avatar?: string
  projectId?: string
  isActive: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  hasPermission: (section: string, action?: string) => boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading user from storage/API
    const mockUser: User = {
      id: "1",
      name: "Maya Thompson",
      email: "maya@example.com",
      role: "project-lead",
      age: 17,
      avatar: "/young-asian-woman-portrait.png",
      projectId: "project-1",
      isActive: true,
    }
    setUser(mockUser)
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Implement login logic
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
  }

  const hasPermission = (section: string, action = "view"): boolean => {
    if (!user) return false

    const permissions = {
      dashboard: {
        view: ["project-lead", "team-member", "mentor"],
      },
      learning: {
        view: ["project-lead", "team-member", "mentor", "alumni"],
        submit: ["project-lead"],
        review: ["mentor"],
      },
      projects: {
        view: ["project-lead", "team-member", "mentor", "alumni", "public-viewer"],
        edit: ["project-lead", "mentor"],
      },
      funding: {
        view: ["project-lead", "team-member", "mentor"],
      },
      expenses: {
        view: ["project-lead", "mentor"],
        edit: ["project-lead", "mentor"],
      },
      marketplace: {
        view: ["project-lead", "team-member", "mentor"],
      },
      community: {
        view: ["project-lead", "team-member", "mentor", "alumni"],
      },
    }

    return permissions[section]?.[action]?.includes(user.role) || false
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, hasPermission, isLoading }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    // Return a default state instead of throwing an error during development
    return {
      user: null,
      login: async () => {},
      logout: () => {},
      hasPermission: () => true, // Allow all permissions by default
      isLoading: false,
    }
  }
  return context
}
