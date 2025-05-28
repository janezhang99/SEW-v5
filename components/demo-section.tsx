import { Network, Flower2, Lightbulb, BarChart4 } from "lucide-react"
import { DemoButton } from "@/components/demo-button"

interface DemoSectionProps {
  showTitle?: boolean
}

export function DemoSection({ showTitle = true }: DemoSectionProps) {
  return (
    <div className="space-y-4">
      {showTitle && (
        <>
          <h2 className="text-2xl font-bold tracking-tight">Demo Tools</h2>
          <p className="text-muted-foreground">
            Explore these interactive tools to enhance your climate adaptation work
          </p>
        </>
      )}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DemoButton
          href="/tools/system-scan"
          icon={Network}
          label="System Scan Tool"
          description="Analyze and map climate adaptation systems"
          className="border-blue-200 bg-blue-50 hover:bg-blue-100/50 dark:border-blue-900/50 dark:bg-blue-900/20 dark:hover:bg-blue-900/30"
        />
        <DemoButton
          href="/demo/perma-visualization"
          icon={Flower2}
          label="PERMA-V Visualization"
          description="Interactive flourishing dashboard"
          className="border-green-200 bg-green-50 hover:bg-green-100/50 dark:border-green-900/50 dark:bg-green-900/20 dark:hover:bg-green-900/30"
        />
        <DemoButton
          href="/demo/dual-framework"
          icon={Lightbulb}
          label="Dual Framework Demo"
          description="Explore individual and system frameworks"
          className="border-amber-200 bg-amber-50 hover:bg-amber-100/50 dark:border-amber-900/50 dark:bg-amber-900/20 dark:hover:bg-amber-900/30"
        />
        <DemoButton
          href="/admin/analytics"
          icon={BarChart4}
          label="Analytics Dashboard"
          description="Platform usage and engagement metrics"
          className="border-purple-200 bg-purple-50 hover:bg-purple-100/50 dark:border-purple-900/50 dark:bg-purple-900/20 dark:hover:bg-purple-900/30"
        />
      </div>
    </div>
  )
}
