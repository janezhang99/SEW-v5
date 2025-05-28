"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Users, MessageSquare, CalendarIcon, Clock, Video, Phone } from "lucide-react"

export function MentorConnection() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [activeTab, setActiveTab] = useState("mentors")

  const mentors = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Cultural Mentor",
      expertise: ["Traditional Knowledge", "Healing Practices"],
      image: "/short-haired-woman-portrait.png",
      availability: "Weekly check-ins",
      bio: "Elder with 30+ years experience in cultural revitalization projects",
    },
    {
      id: "2",
      name: "Michael Redfeather",
      role: "Project Coach",
      expertise: ["Grant Writing", "Community Engagement"],
      image: "/placeholder-pqb8p.png",
      availability: "Bi-weekly sessions",
      bio: "Former grant recipient who now helps youth develop their own projects",
    },
    {
      id: "3",
      name: "Lisa Wong",
      role: "Youth Advocate",
      expertise: ["Arts Programs", "Digital Media"],
      image: "/young-asian-woman-portrait.png",
      availability: "Flexible scheduling",
      bio: "Runs successful youth arts programs in multiple communities",
    },
  ]

  const upcomingMeetings = [
    {
      id: "m1",
      mentor: "Sarah Johnson",
      date: "May 18, 2025",
      time: "3:00 PM",
      type: "video",
      topic: "Project Vision Discussion",
    },
    {
      id: "m2",
      mentor: "Michael Redfeather",
      date: "May 22, 2025",
      time: "1:30 PM",
      type: "phone",
      topic: "Grant Application Review",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Mentor Connection
        </CardTitle>
        <CardDescription>Connect with mentors who can support your learning journey</CardDescription>
      </CardHeader>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="mentors" className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>Available Mentors</span>
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" />
            <span>Schedule</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mentors">
          <CardContent className="space-y-4">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="flex items-start gap-3 p-3 rounded-md border">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={mentor.image || "/placeholder.svg"} alt={mentor.name} />
                  <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{mentor.name}</h3>
                    <Badge variant="outline">{mentor.role}</Badge>
                  </div>

                  <p className="text-xs text-muted-foreground mt-1">{mentor.bio}</p>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {mentor.expertise.map((skill, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {mentor.availability}
                    </span>

                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Connect
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </TabsContent>

        <TabsContent value="schedule">
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <h3 className="text-sm font-medium mb-2">Select a Date</h3>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="border rounded-md"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-sm font-medium mb-2">Upcoming Meetings</h3>
                <div className="space-y-3">
                  {upcomingMeetings.map((meeting) => (
                    <div key={meeting.id} className="p-3 rounded-md border">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{meeting.mentor}</h4>
                        <Badge variant="outline" className="text-xs">
                          {meeting.type === "video" ? (
                            <Video className="h-3 w-3 mr-1 inline" />
                          ) : (
                            <Phone className="h-3 w-3 mr-1 inline" />
                          )}
                          {meeting.type}
                        </Badge>
                      </div>

                      <p className="text-xs text-muted-foreground mt-1">{meeting.topic}</p>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs">
                          <CalendarIcon className="h-3 w-3 inline mr-1" />
                          {meeting.date}, {meeting.time}
                        </span>

                        <Button size="sm" variant="outline" className="h-7 text-xs">
                          Join
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>

      <CardFooter className="flex justify-between">
        <Button variant="outline">
          <MessageSquare className="h-4 w-4 mr-1" />
          Message a Mentor
        </Button>

        <Button>
          <CalendarIcon className="h-4 w-4 mr-1" />
          Schedule Meeting
        </Button>
      </CardFooter>
    </Card>
  )
}
