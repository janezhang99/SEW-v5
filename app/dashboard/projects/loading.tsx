import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProjectsLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Projects" text="Manage your projects, tasks, and collaborators">
        <Skeleton className="h-10 w-[120px]" />
      </DashboardHeader>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-20" />
              </div>
              <Skeleton className="mt-3 h-6 w-3/4" />
              <Skeleton className="mt-2 h-4 w-full" />
              <div className="mt-6 space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-2 w-full" />
                <div className="flex flex-wrap gap-2 pt-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
            <div className="border-t p-4">
              <Skeleton className="h-9 w-full" />
            </div>
          </Card>
        ))}
      </div>
    </DashboardShell>
  )
}
