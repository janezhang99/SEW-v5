import { redirect } from "next/navigation"

// This is a placeholder for your actual authentication check
function isAuthenticated() {
  // In a real app, this would check session/auth state
  return false // Change to true to test the authenticated dashboard
}

// This is a placeholder for your actual assessment completion check
function hasCompletedAssessment() {
  // In a real app, this would check if the user has completed the assessment
  return false // Change to true to test the full personalized dashboard
}

export function middleware(request) {
  // Public routes that don't require authentication
  const publicRoutes = ["/", "/about", "/explore", "/register", "/login", "/case-studies"]

  // Check if the current path is the root path
  if (request.nextUrl.pathname === "/") {
    // If authenticated, redirect to dashboard
    if (isAuthenticated()) {
      return redirect("/dashboard")
    }
    // Otherwise, show the public landing page
    return
  }

  // Check if the current path is the dashboard
  if (request.nextUrl.pathname === "/dashboard") {
    // If not authenticated, redirect to login
    if (!isAuthenticated()) {
      return redirect("/login")
    }

    // If authenticated but hasn't completed assessment, redirect to assessment
    if (!hasCompletedAssessment()) {
      return redirect("/assessment")
    }

    // Otherwise, show the dashboard
    return
  }

  // For all other routes, check if authentication is required
  if (!publicRoutes.includes(request.nextUrl.pathname) && !isAuthenticated()) {
    return redirect("/login")
  }
}
