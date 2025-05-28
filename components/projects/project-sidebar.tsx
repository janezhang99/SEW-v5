"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Calendar, Users, FileText, MessageSquare, Bell, Plus } from "lucide-react"

export function ProjectSidebar() {
  // Use static data instead of state that might change frequently
  const teamMembers = [
    { id: "1", name: "Alex Johnson", role: "Project Lead", avatar: "/diverse-person-portrait.png" },
    { id: "2", name: "Sam Rivera", role: "Urban Planner", avatar: "/diverse-group-five.png" },
    { id: "3", name: "Taylor Kim", role: "Environmental Scientist", avatar: "/diverse-group-conversation.png" },
  ]

  const upcomingEvents = [
    {
      id: "1",
      title: "Community Planting Day",
      date: "May 15, 2023",
      time: "9:00 AM - 1:00 PM",
      location: "Central Park",
    },
    {
      id: "2",
      title: "Stakeholder Meeting",
      date: "May 22, 2023",
      time: "2:00 PM - 4:00 PM",
      location: "City Hall",
    },
  ]

  const metrics = [
    { name: "Trees Planted", value: 35, target: 100 },
    { name: "Volunteer Hours", value: 120, target: 500 },
    { name: "Budget Used", value: 25000, target: 75000 },
  ]

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button className="w-full justify-start">
            <FileText className="mr-2 h-4 w-4" />
            Edit Project Details
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" />
            Invite Team Members
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <MessageSquare className="mr-2 h-4 w-4" />
            Start Discussion
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Event
          </Button>
        </CardContent>
      </Card>

      {/* Team Members */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Team</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                <AvatarImage src={member.avatar || "/placeholder.svg"} />
              </Avatar>
              <div>
                <div className="font-medium text-sm">{member.name}</div>
                <div className="text-xs text-muted-foreground">{member.role}</div>
              </div>
            </div>
          ))}
          <Button variant="ghost" size="sm" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Team Member
          </Button>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="space-y-1">
              <div className="font-medium text-sm">{event.title}</div>
              <div className="text-xs text-muted-foreground flex items-center">
                <Calendar className="mr-1 h-3 w-3" />
                {event.date}, {event.time}
              </div>
              <div className="text-xs text-muted-foreground">{event.location}</div>
            </div>
          ))}
          <Button variant="ghost" size="sm" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </CardContent>
      </Card>

      {/* Project Metrics */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Project Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm">{metric.name}</span>
                <span className="text-sm font-medium">
                  {metric.value} / {metric.target}
                </span>
              </div>
              <Progress value={(metric.value / metric.target) * 100} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full justify-start">
            <Bell className="mr-2 h-4 w-4" />
            Manage Notifications
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
