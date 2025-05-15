import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Add this new function
export function isDashboardRoute(pathname: string): boolean {
  return pathname.startsWith("/dashboard")
}
