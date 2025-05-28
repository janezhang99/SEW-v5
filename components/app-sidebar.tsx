"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useView } from "@/components/view-toggle"
import {
  BarChart3,
  BookOpen,
  Calendar,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
  Compass,
  FileText,
  Lightbulb,
  Map,
} from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AppSidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const { viewMode } = useView()

  // Don't render the sidebar on the landing page
  if (pathname === "/") {
    return null
  }

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Navigation</h2>
          <div className="space-y-1">
            <Button
              variant={pathname === "/dashboard" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link href="/dashboard">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button
              variant={pathname === "/domains" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link href="/domains">
                <Compass className="mr-2 h-4 w-4" />
                Knowledge Domains
              </Link>
            </Button>
            <Button
              variant={pathname.startsWith("/courses") ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link href="/courses">
                <BookOpen className="mr-2 h-4 w-4" />
                Courses
              </Link>
            </Button>
            <Button
              variant={pathname.startsWith("/projects") ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link href="/projects">
                <FolderKanban className="mr-2 h-4 w-4" />
                Projects
              </Link>
            </Button>
            <Button
              variant={pathname.startsWith("/events") ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link href="/events">
                <Calendar className="mr-2 h-4 w-4" />
                Events
              </Link>
            </Button>
            <Button
              variant={pathname.startsWith("/resources") ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link href="/resources">
                <FileText className="mr-2 h-4 w-4" />
                Resources
              </Link>
            </Button>
            <Button
              variant={pathname.startsWith("/discussions") ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link href="/discussions">
                <MessageSquare className="mr-2 h-4 w-4" />
                Discussions
              </Link>
            </Button>
            <Button
              variant={pathname.startsWith("/connect") ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link href="/connect">
                <Users className="mr-2 h-4 w-4" />
                Connect
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <ScrollArea className="flex-1">
        {viewMode === "authenticated" && (
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Personal</h2>
            <div className="space-y-1">
              <Button
                variant={pathname.startsWith("/learning-path") ? "secondary" : "ghost"}
                size="sm"
                className="w-full justify-start"
                asChild
              >
                <Link href="/learning-path">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Learning Path
                </Link>
              </Button>
              <Button
                variant={pathname.startsWith("/profile") ? "secondary" : "ghost"}
                size="sm"
                className="w-full justify-start"
                asChild
              >
                <Link href="/profile">
                  <Users className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </Button>
              <Button
                variant={pathname.startsWith("/settings") ? "secondary" : "ghost"}
                size="sm"
                className="w-full justify-start"
                asChild
              >
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </Button>
              <Button
                variant={pathname.startsWith("/tools/system-scan") ? "secondary" : "ghost"}
                size="sm"
                className="w-full justify-start"
                asChild
              >
                <Link href="/tools/system-scan">
                  <Map className="mr-2 h-4 w-4" />
                  System Scan
                </Link>
              </Button>
            </div>
          </div>
        )}
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Domains</h2>
          <div className="space-y-1">
            <Button
              variant={pathname.startsWith("/domains/risk") ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link href="/domains/risk">
                <BarChart3 className="mr-2 h-4 w-4" />
                Climate Risk Assessment
              </Link>
            </Button>
            <Button
              variant={pathname.startsWith("/domains/options") ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link href="/domains/options">
                <Lightbulb className="mr-2 h-4 w-4" />
                Adaptation Options
              </Link>
            </Button>
            <Button
              variant={pathname.startsWith("/domains/monitoring") ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link href="/domains/monitoring">
                <Map className="mr-2 h-4 w-4" />
                Monitoring & Learning
              </Link>
            </Button>
          </div>
        </div>
        {viewMode === "authenticated" && (
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Tools</h2>
            <div className="space-y-1">
              <Button
                variant={pathname.startsWith("/tools/image-compression") ? "secondary" : "ghost"}
                size="sm"
                className="w-full justify-start"
                asChild
              >
                <Link href="/tools/image-compression">
                  <FileText className="mr-2 h-4 w-4" />
                  Image Compression
                </Link>
              </Button>
            </div>
          </div>
        )}
        {viewMode === "authenticated" && (
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Admin</h2>
            <div className="space-y-1">
              <Button
                variant={pathname.startsWith("/admin") ? "secondary" : "ghost"}
                size="sm"
                className="w-full justify-start"
                asChild
              >
                <Link href="/admin">
                  <Settings className="mr-2 h-4 w-4" />
                  Admin Panel
                </Link>
              </Button>
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
