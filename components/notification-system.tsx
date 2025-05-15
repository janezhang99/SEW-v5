"use client"

import { useState, useEffect } from "react"
import { AlertCircle, Bell, CheckCircle2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useProjects } from "@/contexts/projects-context"
import { format, isToday, isYesterday, isBefore, addDays } from "date-fns"
import { cn } from "@/lib/utils"

type Notification = {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "success" | "error"
  timestamp: Date
  read: boolean
  link?: string
}

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const { projects } = useProjects()

  // Generate notifications based on project data
  useEffect(() => {
    if (!projects.length) return

    const newNotifications: Notification[] = []

    // Check for upcoming deadlines
    projects.forEach((project) => {
      // Check tasks
      project.tasks.forEach((task) => {
        if (task.status !== "completed" && task.dueDate) {
          const dueDate = new Date(task.dueDate)

          // If due date is within 2 days
          if (isBefore(new Date(), dueDate) && isBefore(dueDate, addDays(new Date(), 2))) {
            newNotifications.push({
              id: `task-${task.id}`,
              title: "Upcoming Task Deadline",
              message: `"${task.title}" is due soon for project "${project.title}"`,
              type: "warning",
              timestamp: new Date(),
              read: false,
              link: `/dashboard/projects/${project.id}`,
            })
          }

          // If overdue
          if (isBefore(dueDate, new Date())) {
            newNotifications.push({
              id: `task-overdue-${task.id}`,
              title: "Overdue Task",
              message: `"${task.title}" is overdue for project "${project.title}"`,
              type: "error",
              timestamp: new Date(),
              read: false,
              link: `/dashboard/projects/${project.id}`,
            })
          }
        }
      })

      // Check milestones
      project.milestones.forEach((milestone) => {
        if (!milestone.completed && milestone.dueDate) {
          const dueDate = new Date(milestone.dueDate)

          // If due date is within 3 days
          if (isBefore(new Date(), dueDate) && isBefore(dueDate, addDays(new Date(), 3))) {
            newNotifications.push({
              id: `milestone-${milestone.id}`,
              title: "Upcoming Milestone",
              message: `"${milestone.title}" milestone is approaching for project "${project.title}"`,
              type: "info",
              timestamp: new Date(),
              read: false,
              link: `/dashboard/projects/${project.id}`,
            })
          }
        }
      })

      // Project progress notifications
      const completedTasks = project.tasks.filter((t) => t.status === "completed").length
      const totalTasks = project.tasks.length

      if (totalTasks > 0) {
        const progress = Math.round((completedTasks / totalTasks) * 100)

        if (progress >= 50 && progress < 75) {
          newNotifications.push({
            id: `progress-50-${project.id}`,
            title: "Project Milestone",
            message: `"${project.title}" is 50% complete! Keep up the good work.`,
            type: "success",
            timestamp: new Date(),
            read: false,
            link: `/dashboard/projects/${project.id}`,
          })
        } else if (progress >= 75 && progress < 100) {
          newNotifications.push({
            id: `progress-75-${project.id}`,
            title: "Project Milestone",
            message: `"${project.title}" is 75% complete! You're almost there.`,
            type: "success",
            timestamp: new Date(),
            read: false,
            link: `/dashboard/projects/${project.id}`,
          })
        } else if (progress === 100) {
          newNotifications.push({
            id: `progress-100-${project.id}`,
            title: "Project Complete",
            message: `Congratulations! "${project.title}" is 100% complete.`,
            type: "success",
            timestamp: new Date(),
            read: false,
            link: `/dashboard/projects/${project.id}`,
          })
        }
      }
    })

    // Add some sample notifications
    newNotifications.push({
      id: "mentor-1",
      title: "New Mentor Available",
      message: "Sarah Johnson is now available for mentorship in project management.",
      type: "info",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      read: false,
      link: "/dashboard/mentorship",
    })

    newNotifications.push({
      id: "community-1",
      title: "Community Event",
      message: "Join us for the monthly Small Economy Works virtual meetup this Friday.",
      type: "info",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
      link: "/dashboard/community",
    })

    // Sort by timestamp (newest first) and limit to 10
    const sortedNotifications = newNotifications
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 10)

    setNotifications(sortedNotifications)
    setUnreadCount(sortedNotifications.filter((n) => !n.read).length)
  }, [projects])

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
    setUnreadCount(0)
  }

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return <Bell className="h-4 w-4" />
      case "warning":
        return <Clock className="h-4 w-4" />
      case "success":
        return <CheckCircle2 className="h-4 w-4" />
      case "error":
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return "bg-sew-sky-blue/10 text-sew-sky-blue"
      case "warning":
        return "bg-amber-100 text-amber-800"
      case "success":
        return "bg-sew-moss-green/10 text-sew-moss-green"
      case "error":
        return "bg-red-100 text-red-800"
    }
  }

  const formatTimestamp = (date: Date) => {
    if (isToday(date)) {
      return `Today, ${format(date, "h:mm a")}`
    } else if (isYesterday(date)) {
      return `Yesterday, ${format(date, "h:mm a")}`
    } else {
      return format(date, "MMM d, h:mm a")
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-sew-sunset-orange text-[10px] font-medium text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-auto py-0 px-2 text-xs">
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="py-4 text-center text-sm text-muted-foreground">No notifications</div>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className={cn("flex flex-col items-start p-3 focus:bg-muted", !notification.read && "bg-muted/50")}
              onSelect={(e) => {
                e.preventDefault()
                markAsRead(notification.id)
              }}
            >
              <div className="flex w-full items-start gap-2">
                <div className={cn("mt-0.5 rounded-full p-1", getNotificationColor(notification.type))}>
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium leading-none">{notification.title}</p>
                    {!notification.read && (
                      <Badge
                        variant="outline"
                        className="ml-auto bg-sew-sunset-orange/10 text-sew-sunset-orange border-sew-sunset-orange/20"
                      >
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">{formatTimestamp(notification.timestamp)}</p>
                </div>
              </div>
            </DropdownMenuItem>
          ))
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center" asChild>
          <a href="/dashboard/notifications">View all notifications</a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
