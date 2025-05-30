"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { BookOpen, Calendar, DollarSign, FileText, Users, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useExpenses } from "@/contexts/expenses-context"
import { useTasks } from "@/contexts/tasks-context"
import { IntegrationService } from "@/lib/integration-service"
import { formatCurrency } from "@/lib/format-currency"
import { format, isAfter, isBefore, addDays } from "date-fns"

export default function DashboardPage() {
  const { expenses } = useExpenses()
  const { tasks } = useTasks()
  const [deadlines, setDeadlines] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeadlines(IntegrationService.getUpcomingDeadlines([]))
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const urgentDeadlines = deadlines.filter(
    (deadline) =>
      isBefore(new Date(deadline.dueDate), addDays(new Date(), 3)) && isAfter(new Date(deadline.dueDate), new Date()),
  )

  if (isLoading) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Dashboard" text="Welcome to Small Economy Works" />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-32" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-4">
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <Skeleton className="mt-4 h-6 w-16" />
                  <Skeleton className="mt-2 h-4 w-24" />
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-9 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Welcome to Small Economy Works" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Learning Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Learning</CardTitle>
            <CardDescription>Your learning progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-4 text-center">
              <div className="relative h-16 w-16">
                <svg className="h-16 w-16" viewBox="0 0 100 100">
                  <circle
                    className="text-muted-foreground/20"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-sew-moss-green"
                    strokeWidth="8"
                    strokeDasharray={250}
                    strokeDashoffset={250 * (1 - 0.65)}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold">65%</span>
                </div>
              </div>
              <p className="mt-2 text-sm font-medium">Learning Progress</p>
              <p className="text-xs text-muted-foreground">13 of 20 modules completed</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/learning">
                <BookOpen className="mr-2 h-4 w-4" />
                Continue Learning
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Funding Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Funding</CardTitle>
            <CardDescription>Your funding status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-4 text-center">
              <div className="rounded-full bg-sew-midnight-blue/10 p-3">
                <DollarSign className="h-8 w-8 text-sew-midnight-blue" />
              </div>
              <p className="mt-2 text-2xl font-bold">{formatCurrency(1750)}</p>
              <p className="text-xs text-muted-foreground">Total funding unlocked</p>
              <div className="mt-4 w-full space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span>Budget utilized</span>
                  <span>45%</span>
                </div>
                <Progress value={45} className="h-1" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/finances">
                <DollarSign className="mr-2 h-4 w-4" />
                View Finances
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Community Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Community</CardTitle>
            <CardDescription>Your network</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-4 text-center">
              <div className="flex -space-x-2">
                <div className="h-10 w-10 rounded-full bg-sew-sunset-orange/20 flex items-center justify-center text-sew-sunset-orange font-medium">
                  JD
                </div>
                <div className="h-10 w-10 rounded-full bg-sew-moss-green/20 flex items-center justify-center text-sew-moss-green font-medium">
                  AS
                </div>
                <div className="h-10 w-10 rounded-full bg-sew-sky-blue/20 flex items-center justify-center text-sew-sky-blue font-medium">
                  MT
                </div>
                <div className="h-10 w-10 rounded-full bg-sew-midnight-blue/20 flex items-center justify-center text-sew-midnight-blue font-medium">
                  +3
                </div>
              </div>
              <p className="mt-4 text-sm font-medium">7 Active Connections</p>
              <div className="mt-2 flex items-center justify-center gap-2">
                <Badge variant="outline" className="bg-sew-sky-blue/10 text-sew-sky-blue border-sew-sky-blue/20">
                  3 Mentors
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-sew-sunset-orange/10 text-sew-sunset-orange border-sew-sunset-orange/20"
                >
                  4 Peers
                </Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/community">
                <Users className="mr-2 h-4 w-4" />
                View Community
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Deadlines Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Deadlines</CardTitle>
            <CardDescription>Upcoming tasks & milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-4 text-center">
              <div
                className={`rounded-full p-3 ${urgentDeadlines.length > 0 ? "bg-amber-100" : "bg-sew-sunset-orange/10"}`}
              >
                {urgentDeadlines.length > 0 ? (
                  <AlertTriangle className="h-8 w-8 text-amber-600" />
                ) : (
                  <Calendar className="h-8 w-8 text-sew-sunset-orange" />
                )}
              </div>
              <p className="mt-2 text-2xl font-bold">{deadlines.length}</p>
              <p className="text-xs text-muted-foreground">
                {urgentDeadlines.length > 0 ? `${urgentDeadlines.length} urgent deadlines` : "No urgent deadlines"}
              </p>
              {deadlines.length > 0 && (
                <div className="mt-4 w-full">
                  <p className="text-xs text-muted-foreground mb-1">Next deadline:</p>
                  <p className="text-xs font-medium">{deadlines[0]?.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(deadlines[0]?.dueDate), "MMM d, yyyy")}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/initiatives">
                <Calendar className="mr-2 h-4 w-4" />
                View Projects
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Expenses Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Expenses</CardTitle>
            <CardDescription>Your spending overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-4 text-center">
              <div className="rounded-full bg-sew-moss-green/10 p-3">
                <FileText className="h-8 w-8 text-sew-moss-green" />
              </div>
              <p className="mt-2 text-2xl font-bold">{formatCurrency(787.5)}</p>
              <p className="text-xs text-muted-foreground">This month's expenses</p>
              <div className="mt-4 w-full space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span>Budget remaining</span>
                  <span>55%</span>
                </div>
                <Progress value={55} className="h-1" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/finances">
                <FileText className="mr-2 h-4 w-4" />
                View Finances
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardShell>
  )
}
