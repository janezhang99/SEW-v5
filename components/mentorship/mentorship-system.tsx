"use client"

import { useState } from "react"
import { Calendar, Clock, Users, MapPin, Phone, VideoIcon, CalendarIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

interface Mentor {
  id: string
  name: string
  role: string
  expertise: string[]
  location: string
  bio: string
  availability: string[]
  avatarUrl: string
  languages: string[]
  isIndigenous?: boolean
}

interface MentorshipSystemProps {
  mentors: Mentor[]
  currentMentorId?: string
  onSelectMentor?: (mentorId: string) => void
}

export function MentorshipSystem({ mentors, currentMentorId, onSelectMentor }: MentorshipSystemProps) {
  const [selectedMentorId, setSelectedMentorId] = useState<string>(currentMentorId || "")
  const [activeTab, setActiveTab] = useState<string>("find")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [messageText, setMessageText] = useState<string>("")
  const [meetingType, setMeetingType] = useState<string>("video")

  const selectedMentor = mentors.find((mentor) => mentor.id === selectedMentorId)

  const handleSelectMentor = (mentorId: string) => {
    setSelectedMentorId(mentorId)
    if (onSelectMentor) {
      onSelectMentor(mentorId)
    }
    setActiveTab("schedule")
  }

  const handleScheduleMeeting = () => {
    // In a real app, this would send the meeting request to the backend
    alert(`Meeting scheduled with ${selectedMentor?.name} on ${date ? format(date, "PPP") : "No date selected"}`)
    setActiveTab("messages")
  }

  const handleSendMessage = () => {
    if (!messageText.trim()) return
    // In a real app, this would send the message to the backend
    alert(`Message sent to ${selectedMentor?.name}: ${messageText}`)
    setMessageText("")
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Mentorship Connection</CardTitle>
        <CardDescription>Connect with mentors who can guide you through your learning journey</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="find">Find Mentors</TabsTrigger>
            <TabsTrigger value="schedule" disabled={!selectedMentorId}>
              Schedule
            </TabsTrigger>
            <TabsTrigger value="messages" disabled={!selectedMentorId}>
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="find" className="space-y-4">
            <div className="flex flex-col space-y-4">
              {mentors.map((mentor) => (
                <Card
                  key={mentor.id}
                  className={`cursor-pointer transition-all ${selectedMentorId === mentor.id ? "ring-2 ring-primary" : ""}`}
                  onClick={() => handleSelectMentor(mentor.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={mentor.avatarUrl || "/placeholder.svg"} alt={mentor.name} />
                        <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{mentor.name}</h3>
                            <p className="text-sm text-muted-foreground">{mentor.role}</p>
                          </div>
                          <div className="flex gap-1">
                            {mentor.isIndigenous && (
                              <Badge variant="outline" className="text-xs">
                                Indigenous
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm">{mentor.bio}</p>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1">
                          {mentor.expertise.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-3 flex items-center text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{mentor.location}</span>
                          <span className="mx-2">•</span>
                          <span>{mentor.languages.join(", ")}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="schedule">
            {selectedMentor && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={selectedMentor.avatarUrl || "/placeholder.svg"} alt={selectedMentor.name} />
                    <AvatarFallback>{selectedMentor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedMentor.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedMentor.role}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="mb-2 block">Select a date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>

                    <div className="mt-4">
                      <Label className="mb-2 block">Available times</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedMentor.availability.map((time, index) => (
                          <Button key={index} variant="outline" className="justify-start">
                            <Clock className="mr-2 h-4 w-4" />
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="mb-2 block">Meeting type</Label>
                    <Select value={meetingType} onValueChange={setMeetingType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select meeting type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="video">
                          <div className="flex items-center">
                            <VideoIcon className="mr-2 h-4 w-4" />
                            <span>Video call</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="phone">
                          <div className="flex items-center">
                            <Phone className="mr-2 h-4 w-4" />
                            <span>Phone call</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="inperson">
                          <div className="flex items-center">
                            <Users className="mr-2 h-4 w-4" />
                            <span>In-person</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="mt-4">
                      <Label className="mb-2 block">What would you like to discuss?</Label>
                      <Textarea
                        placeholder="Briefly describe what you'd like to talk about in this meeting..."
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-4" onClick={handleScheduleMeeting} disabled={!date}>
                  Schedule Meeting
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="messages">
            {selectedMentor && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={selectedMentor.avatarUrl || "/placeholder.svg"} alt={selectedMentor.name} />
                    <AvatarFallback>{selectedMentor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedMentor.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      <Badge variant="outline" className="mr-2">
                        Online
                      </Badge>
                      Usually responds within 24 hours
                    </p>
                  </div>
                </div>

                <div className="border rounded-md p-4 min-h-[300px] bg-muted/30 flex flex-col justify-end">
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <Badge variant="outline" className="text-xs">
                        Today
                      </Badge>
                    </div>

                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={selectedMentor.avatarUrl || "/placeholder.svg"} alt={selectedMentor.name} />
                        <AvatarFallback>{selectedMentor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">
                          Hi there! I'm looking forward to our meeting. Feel free to message me if you have any
                          questions before then.
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">10:30 AM</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage}>Send</Button>
                </div>

                <div className="mt-6">
                  <h4 className="font-medium mb-2">Upcoming Meetings</h4>
                  <Card>
                    <CardContent className="p-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Friday, May 17, 2024</span>
                          <span className="mx-1">•</span>
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>3:00 PM</span>
                        </div>
                        <Badge>Upcoming</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

// Example usage component
export function MentorshipSystemExample() {
  const exampleMentors: Mentor[] = [
    {
      id: "mentor-1",
      name: "Sarah Redfeather",
      role: "Cultural Mentor",
      expertise: ["Traditional Knowledge", "Healing Practices", "Community Building"],
      location: "Whitehorse, Yukon",
      bio: "Elder with 30+ years experience in traditional healing and community development. Passionate about helping youth reconnect with their cultural identity.",
      availability: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"],
      avatarUrl: "/placeholder-vj1kw.png",
      languages: ["English", "Southern Tutchone"],
      isIndigenous: true,
    },
    {
      id: "mentor-2",
      name: "Michael Chen",
      role: "Project Development Coach",
      expertise: ["Grant Writing", "Project Management", "Digital Skills"],
      location: "Vancouver, BC",
      bio: "Experienced project manager who has helped over 50 community initiatives secure funding and implement successful programs.",
      availability: ["10:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"],
      avatarUrl: "/asian-professional-glasses.png",
      languages: ["English", "Mandarin"],
    },
    {
      id: "mentor-3",
      name: "Leanne Moosehide",
      role: "Youth Advocate",
      expertise: ["Youth Engagement", "Arts Programs", "Cultural Revitalization"],
      location: "Yellowknife, NT",
      bio: "Former youth program coordinator who specializes in arts-based approaches to community development and cultural expression.",
      availability: ["11:00 AM", "1:00 PM", "3:00 PM", "6:00 PM"],
      avatarUrl: "/placeholder-55u3s.png",
      languages: ["English", "Tłı̨chǫ"],
      isIndigenous: true,
    },
  ]

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Connect with a Mentor</h1>
      <MentorshipSystem mentors={exampleMentors} />
    </div>
  )
}
