"use client"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Clock,
  DollarSign,
  ArrowRight,
  CheckCircle,
  BarChart3,
  Calendar,
  Award,
  Lightbulb,
  Users,
  Heart,
  BookOpen,
  Briefcase,
  MapPin,
  Bell,
  Zap,
} from "lucide-react"
import { useTasks } from "@/contexts/tasks-context"

export default function DashboardPage() {
  const {
    tasks,
    loading,
    completedTaskIds,
    getCompletedTasks,
    getPendingTasks,
    getTotalPotentialFunding,
    getUnlockedFunding,
    getTasksByCategory,
  } = useTasks()

  const completedTasks = getCompletedTasks()
  const pendingTasks = getPendingTasks()
  const totalTasks = tasks.length
  const progress = Math.round((completedTasks.length / totalTasks) * 100) || 0

  const totalPotentialFunding = getTotalPotentialFunding()
  const unlockedFunding = getUnlockedFunding()
  const fundingProgress = Math.round((unlockedFunding / totalPotentialFunding) * 100) || 0

  // Get the next task to highlight
  const nextTask = pendingTasks[0]

  // Get tasks by category for the category breakdown
  const personalTasks = getTasksByCategory("personal")
  const communityTasks = getTasksByCategory("community")
  const projectTasks = getTasksByCategory("project")
  const culturalTasks = getTasksByCategory("cultural")
  const businessTasks = getTasksByCategory("business")

  // Calculate completion by category
  const getCategoryCompletion = (categoryTasks) => {
    if (!categoryTasks.length) return 0
    const completedCount = categoryTasks.filter((task) => completedTaskIds.includes(task.id)).length
    return Math.round((completedCount / categoryTasks.length) * 100)
  }

  const personalProgress = getCategoryCompletion(personalTasks)
  const communityProgress = getCategoryCompletion(communityTasks)
  const projectProgress = getCategoryCompletion(projectTasks)
  const culturalProgress = getCategoryCompletion(culturalTasks)
  const businessProgress = getCategoryCompletion(businessTasks)

  // Recent activity (mock data)
  const recentActivity = [
    {
      type: "task_completed",
      title: "Personal Why",
      date: "Today",
      icon: <CheckCircle className="h-4 w-4 text-green-500" />,
    },
    {
      type: "funding_unlocked",
      title: "$100 Funding Unlocked",
      date: "Today",
      icon: <DollarSign className="h-4 w-4 text-amber-500" />,
    },
    {
      type: "milestone",
      title: "Started Learning Journey",
      date: "Yesterday",
      icon: <Award className="h-4 w-4 text-purple-500" />,
    },
    {
      type: "task_started",
      title: "Community Needs",
      date: "Yesterday",
      icon: <Clock className="h-4 w-4 text-blue-500" />,
    },
  ]

  // Upcoming deadlines (mock data)
  const upcomingDeadlines = [
    { title: "Complete Project Vision", date: "In 3 days", icon: <Calendar className="h-4 w-4 text-red-500" /> },
    { title: "Funding Milestone 1", date: "In 5 days", icon: <DollarSign className="h-4 w-4 text-amber-500" /> },
  ]

  if (loading) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Welcome to Small Economy Works" text="Loading your dashboard..." />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your tasks and funding data...</p>
          </div>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Your Dashboard" text="Track your progress, funding, and next steps">
        <Button size="sm" className="gap-2">
          <Bell className="h-4 w-4" />
          Notifications
        </Button>
      </DashboardHeader>

      {/* Top Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Learning Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1 text-blue-700">{progress}%</div>
            <Progress value={progress} className="h-2 mb-2 bg-blue-100">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${progress}%` }}></div>
            </Progress>
            <p className="text-xs text-blue-600">
              {completedTasks.length} of {totalTasks} tasks completed
            </p>
          </CardContent>
        </Card>

        <Card className="border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-amber-700">Funding Unlocked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1 text-amber-700">${unlockedFunding}</div>
            <Progress value={fundingProgress} className="h-2 mb-2 bg-amber-100">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: `${fundingProgress}%` }}></div>
            </Progress>
            <p className="text-xs text-amber-600">
              {fundingProgress}% of ${totalPotentialFunding} potential
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Next Milestone</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1 text-green-700">3 Tasks</div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <Award className="h-3 w-3" />
              <span>Complete 3 more tasks to unlock $250</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Time Invested</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1 text-purple-700">4.5 hrs</div>
            <div className="flex items-center gap-1 text-xs text-purple-600">
              <Clock className="h-3 w-3" />
              <span>This week (estimated)</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid gap-6 md:grid-cols-7 mt-6">
        {/* Left Column */}
        <div className="md:col-span-4 space-y-6">
          {/* Priority Task */}
          {nextTask && (
            <Card className="border-l-4 border-l-primary">
              <CardHeader className="pb-2 bg-blue-50/50">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg text-blue-700">Your Priority Task</CardTitle>
                  <Badge variant="outline" className="flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200">
                    <DollarSign className="h-3 w-3" />
                    <span>${nextTask.fundingAmount}</span>
                  </Badge>
                </div>
                <CardDescription>Complete this task to make progress and unlock funding</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex items-center gap-4 mb-3">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    {nextTask.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{nextTask.name}</h3>
                    <p className="text-sm text-muted-foreground">{nextTask.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{nextTask.timeEstimate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="h-4 w-4 text-amber-500" />
                    <span className="text-amber-500 font-medium">Recommended next step</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-blue-50/50">
                <Button className="w-full" asChild>
                  <Link href={`/dashboard/learning/${nextTask.category}/${nextTask.id}`}>
                    Start This Task
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Category Progress */}
          <Card>
            <CardHeader className="bg-slate-50 border-b">
              <CardTitle>Learning Categories</CardTitle>
              <CardDescription>Your progress across different skill areas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                      <Heart className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium text-red-700">Personal Growth</div>
                      <div className="text-xs text-muted-foreground">Connect your project to your values</div>
                    </div>
                  </div>
                  <Badge
                    variant={personalProgress > 0 ? "default" : "outline"}
                    className={personalProgress > 0 ? "bg-red-100 text-red-700 hover:bg-red-100 border-red-200" : ""}
                  >
                    {personalProgress}%
                  </Badge>
                </div>
                <Progress value={personalProgress} className="h-2 bg-red-100">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: `${personalProgress}%` }}></div>
                </Progress>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium text-blue-700">Community Connection</div>
                      <div className="text-xs text-muted-foreground">Address community needs</div>
                    </div>
                  </div>
                  <Badge
                    variant={communityProgress > 0 ? "default" : "outline"}
                    className={
                      communityProgress > 0 ? "bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200" : ""
                    }
                  >
                    {communityProgress}%
                  </Badge>
                </div>
                <Progress value={communityProgress} className="h-2 bg-blue-100">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${communityProgress}%` }}></div>
                </Progress>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                      <Lightbulb className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium text-amber-700">Project Development</div>
                      <div className="text-xs text-muted-foreground">Design your project</div>
                    </div>
                  </div>
                  <Badge
                    variant={projectProgress > 0 ? "default" : "outline"}
                    className={
                      projectProgress > 0 ? "bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200" : ""
                    }
                  >
                    {projectProgress}%
                  </Badge>
                </div>
                <Progress value={projectProgress} className="h-2 bg-amber-100">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${projectProgress}%` }}></div>
                </Progress>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium text-green-700">Cultural Connection</div>
                      <div className="text-xs text-muted-foreground">Honor cultural knowledge</div>
                    </div>
                  </div>
                  <Badge
                    variant={culturalProgress > 0 ? "default" : "outline"}
                    className={
                      culturalProgress > 0 ? "bg-green-100 text-green-700 hover:bg-green-100 border-green-200" : ""
                    }
                  >
                    {culturalProgress}%
                  </Badge>
                </div>
                <Progress value={culturalProgress} className="h-2 bg-green-100">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${culturalProgress}%` }}></div>
                </Progress>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      <Briefcase className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium text-purple-700">Business Skills</div>
                      <div className="text-xs text-muted-foreground">Build practical skills</div>
                    </div>
                  </div>
                  <Badge
                    variant={businessProgress > 0 ? "default" : "outline"}
                    className={
                      businessProgress > 0 ? "bg-purple-100 text-purple-700 hover:bg-purple-100 border-purple-200" : ""
                    }
                  >
                    {businessProgress}%
                  </Badge>
                </div>
                <Progress value={businessProgress} className="h-2 bg-purple-100">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: `${businessProgress}%` }}></div>
                </Progress>
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50 border-t">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/learning">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Go to Learning Journey
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Right Column */}
        <div className="md:col-span-3 space-y-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader className="bg-slate-50 border-b">
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest actions and achievements</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 hover:bg-slate-50/50 transition-colors">
                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader className="bg-slate-50 border-b">
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CardDescription>Tasks and milestones to keep in mind</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 hover:bg-slate-50/50 transition-colors">
                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                      {deadline.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{deadline.title}</p>
                      <p className="text-xs text-muted-foreground">{deadline.date}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Funding Summary */}
          <Card>
            <CardHeader className="pb-2 bg-slate-50 border-b">
              <CardTitle>Funding Summary</CardTitle>
              <CardDescription>Your micro-grant progress</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <DollarSign className="h-5 w-5" />
                    </div>
                    <span className="text-2xl font-bold text-green-700">${unlockedFunding}</span>
                  </div>
                  <Badge variant="outline" className="text-sm bg-green-50 text-green-700 border-green-200">
                    of ${totalPotentialFunding} potential
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-700">Funding Progress</span>
                    <span className="font-medium text-green-700">{fundingProgress}%</span>
                  </div>
                  <Progress value={fundingProgress} className="h-2 bg-green-100">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${fundingProgress}%` }}></div>
                  </Progress>
                </div>

                <div className="rounded-md border border-green-200 p-3 bg-green-50/50">
                  <h4 className="text-sm font-medium mb-1 text-green-700">Next Milestone</h4>
                  <p className="text-xs text-green-600 mb-2">Complete 3 more tasks to unlock $250 in funding</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-green-700">$250</span>
                    <Badge variant="outline" className="text-xs bg-white text-green-700 border-green-200">
                      <Clock className="mr-1 h-3 w-3" />
                      In progress
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50 border-t">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/funding">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Funding Details
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}
