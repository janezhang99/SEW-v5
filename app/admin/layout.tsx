import type { ReactNode } from "react"
import Link from "next/link"
import { LayoutDashboard, Users, FileText, Settings, BarChart3, Wrench, Bot, BrainCircuit } from "lucide-react"

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/content", label: "Content", icon: FileText },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/admin/tools", label: "Tools", icon: Wrench },
    { href: "/admin/ai-companion", label: "AI Companion", icon: Bot },
    { href: "/admin/ai-project-assistant", label: "AI Project Assistant", icon: BrainCircuit },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <aside className="w-64 border-r bg-muted/40">
          <nav className="flex flex-col gap-2 p-4">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </aside>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
}
