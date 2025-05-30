"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface AuthContextProps {
  user: any | null // Replace 'any' with your user type
  login: (userData: any) => void // Replace 'any' with your user type
  logout: () => void
  hasPermission: (section: string) => boolean
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null) // Replace 'any' with your user type

  const login = (userData: any) => {
    // Replace 'any' with your user type
    setUser(userData)
    // Store user data in local storage or cookies for persistence
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    // Remove user data from local storage or cookies
    localStorage.removeItem("user")
  }

  const hasPermission = (section: string): boolean => {
    // For now, allow access to all sections for development
    // In production, this would check actual user permissions
    const allowedSections = [
      "dashboard",
      "learning",
      "funding",
      "marketplace",
      "community",
      "projects",
      "resources",
      "settings",
    ]
    return allowedSections.includes(section)
  }

  const value: AuthContextProps = {
    user,
    login,
    logout,
    hasPermission,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
