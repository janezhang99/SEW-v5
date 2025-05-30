"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BookOpen,
  Calendar,
  DollarSign,
  FileText,
  Users,
  AlertTriangle,
  Trophy,
  ArrowRight,
  Video,
  Clock,
} from "lucide-react"
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
  const [meetingDialogOpen, setMeetingDialogOpen] = useState(false)
  const [meetingReason, setMeetingReason] = useState("")
  const [meetingType, setMeetingType] = useState("")
  const [meetingDescription, setMeetingDescription] = useState("")

  // Mock leaderboard data
  const leaderboardData = [
    { id: 1, name: "Sarah J.", avatar: "SJ", amount: 2500, project: "Community Garden" },
    { id: 2, name: "Michael T.", avatar: "MT", amount: 2100, project: "Youth Workshop" },
    { id: 3, name: "Aisha K.", avatar: "AK", amount: 1900, project: "Cultural Festival" },
    { id: 4, name: "David W.", avatar: "DW", amount: 1750, project: "Tech Mentorship" },
    { id: 5, name: "Emma C.", avatar: "EC", amount: 1600, project: "Environmental Club" },
  ]

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

  const handleMeetingRequest = () => {
    // Handle meeting request submission
    console.log("Meeting request:", { meetingReason, meetingType, meetingDescription })
    setMeetingDialogOpen(false)
    setMeetingReason("")
    setMeetingType("")
    setMeetingDescription("")
    // Show success message or redirect
  }

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
        {/* 1. Funding Card - Primary focus, shows current status */}
        <Card className="md:col-span-2 border-2 border-sew-midnight-blue/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-sew-midnight-blue" />
              Funding
            </CardTitle>
            <CardDescription>Your funding status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center justify-between py-4">
              <div className="flex flex-col items-center md:items-start text-center md:text-left mb-4 md:mb-0">
                <p className="text-3xl font-bold text-sew-midnight-blue">{formatCurrency(1750)}</p>
                <p className="text-sm text-muted-foreground">Total funding banked</p>

                <div className="mt-4 flex flex-col gap-1">
                  <Badge className="bg-sew-moss-green/20 text-sew-moss-green hover:bg-sew-moss-green/30 border-0">
                    7 tasks completed
                  </Badge>
                  <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-0">3 tasks in progress</Badge>
                </div>
              </div>

              <div className="w-full md:w-1/2 space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Funding progress</span>
                    <span className="font-medium">70%</span>
                  </div>
                  <Progress value={70} className="h-2 bg-gray-100" indicatorClassName="bg-sew-sunset-orange" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Next milestone</span>
                    <span className="font-medium">{formatCurrency(500)}</span>
                  </div>
                  <Progress value={60} className="h-2 bg-gray-100" indicatorClassName="bg-sew-sky-blue" />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="default" className="w-full bg-sew-midnight-blue hover:bg-sew-midnight-blue/90">
              <Link href="/dashboard/finances">
                <DollarSign className="mr-2 h-4 w-4" />
                View Finances
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* 2. Deadlines Card - What's urgent/coming up next */}
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

        {/* 3. Learning Card - What to work on next */}
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

        {/* 4. Program Manager Card - Get help when needed */}
        <Card className="border-2 border-sew-sky-blue/20">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Video className="h-5 w-5 mr-2 text-sew-sky-blue" />
              Program Manager
            </CardTitle>
            <CardDescription>Connect with your program manager</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-4 text-center">
              <div className="rounded-full bg-sew-sky-blue/10 p-3 mb-3">
                <div className="h-12 w-12 rounded-full bg-sew-sky-blue/20 flex items-center justify-center text-sew-sky-blue font-medium">
                  PM
                </div>
              </div>
              <p className="text-sm font-medium mb-1">Alex Thompson</p>
              <p className="text-xs text-muted-foreground mb-3">Your Program Manager</p>

              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                <Clock className="h-3 w-3" />
                <span>Last meeting: Nov 15, 2024</span>
              </div>

              <div className="w-full space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span>Next check-in</span>
                  <span className="font-medium">Dec 1, 2024</span>
                </div>
                <div className="text-xs text-muted-foreground">Regular monthly check-in scheduled</div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Dialog open={meetingDialogOpen} onOpenChange={setMeetingDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full border-sew-sky-blue text-sew-sky-blue hover:bg-sew-sky-blue/10"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Request Meeting
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Request Meeting with Program Manager</DialogTitle>
                  <DialogDescription>
                    Schedule a meeting with Alex Thompson to discuss your project progress and get support.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="meeting-reason">Reason for Meeting</Label>
                    <Select value={meetingReason} onValueChange={setMeetingReason}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="project-guidance">Project Guidance</SelectItem>
                        <SelectItem value="funding-questions">Funding Questions</SelectItem>
                        <SelectItem value="task-support">Task Support</SelectItem>
                        <SelectItem value="technical-help">Technical Help</SelectItem>
                        <SelectItem value="general-checkin">General Check-in</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="meeting-type">Meeting Type</Label>
                    <Select value={meetingType} onValueChange={setMeetingType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select meeting type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="video-call">Video Call</SelectItem>
                        <SelectItem value="phone-call">Phone Call</SelectItem>
                        <SelectItem value="in-person">In-Person</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide any additional details about what you'd like to discuss..."
                      value={meetingDescription}
                      onChange={(e) => setMeetingDescription(e.target.value)}
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setMeetingDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleMeetingRequest}
                    disabled={!meetingReason || !meetingType}
                    className="bg-sew-sky-blue hover:bg-sew-sky-blue/90"
                  >
                    Send Request
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>

        {/* 5. Expenses Card - Track spending once funding is available */}
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

        {/* 6. Community Card - Connect with others */}
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

        {/* 7. Leaderboard Card - Motivational/competitive element */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-amber-500" />
              Funding Leaderboard
            </CardTitle>
            <CardDescription>Top performing projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaderboardData.map((leader, index) => (
                <div key={leader.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-6 font-semibold text-sm text-muted-foreground">
                      {index + 1}
                    </div>
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-medium
                      ${index === 0 ? "bg-amber-500" : index === 1 ? "bg-slate-400" : index === 2 ? "bg-amber-700" : "bg-slate-300"}`}
                    >
                      {leader.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{leader.name}</p>
                      <p className="text-xs text-muted-foreground">{leader.project}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{formatCurrency(leader.amount)}</p>
                    <Progress
                      value={(leader.amount / 2500) * 100}
                      className="h-1.5 w-24"
                      indicatorClassName={
                        index === 0
                          ? "bg-amber-500"
                          : index === 1
                            ? "bg-slate-400"
                            : index === 2
                              ? "bg-amber-700"
                              : "bg-slate-300"
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost" className="w-full text-muted-foreground">
              <Link href="/dashboard/initiatives" className="flex items-center justify-center">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardShell>
  )
}
