import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, MessageCircle, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Mentorship | Small Economy Works",
  description: "Connect with mentors who can guide you on your journey.",
}

// Mock data for mentors
const mentors = [
  {
    id: "1",
    name: "Sarah Johnson",
    title: "Community Development Specialist",
    image: "/short-haired-woman-portrait.png",
    bio: "10+ years experience in community-led initiatives and grant writing",
    expertise: ["Grant Writing", "Community Organizing", "Project Management"],
    availability: "Available for 2 sessions this week",
    rating: 4.9,
    reviews: 27,
  },
  {
    id: "2",
    name: "Michael Redfeather",
    title: "Indigenous Business Advisor",
    image: "/placeholder-zmmhy.png",
    bio: "Helping Indigenous entrepreneurs build sustainable businesses",
    expertise: ["Business Planning", "Cultural Enterprise", "Funding"],
    availability: "Available for 3 sessions this week",
    rating: 4.8,
    reviews: 19,
  },
  {
    id: "3",
    name: "Jasmine Lee",
    title: "Youth Program Coordinator",
    image: "/young-asian-woman-portrait.png",
    bio: "Specializing in youth-led initiatives and digital storytelling",
    expertise: ["Youth Engagement", "Digital Media", "Program Design"],
    availability: "Available for 1 session this week",
    rating: 4.7,
    reviews: 15,
  },
  {
    id: "4",
    name: "David Blackfeather",
    title: "Traditional Knowledge Keeper",
    image: "/placeholder-pqb8p.png",
    bio: "Sharing traditional ecological knowledge and cultural practices",
    expertise: ["Traditional Knowledge", "Land-based Learning", "Cultural Protocols"],
    availability: "Available for 2 sessions this week",
    rating: 5.0,
    reviews: 32,
  },
]

// Mock data for upcoming sessions
const upcomingSessions = [
  {
    id: "1",
    mentorName: "Sarah Johnson",
    mentorImage: "/short-haired-woman-portrait.png",
    date: "May 18, 2025",
    time: "3:00 PM - 4:00 PM",
    topic: "Grant Application Review",
  },
]

export default function MentorshipPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-sew-midnight-blue">Mentorship</h1>
        <p className="text-muted-foreground">
          Connect with mentors who can guide you on your journey to building a successful small economy project.
        </p>
      </div>

      <Tabs defaultValue="find-mentors" className="space-y-4">
        <TabsList className="bg-sew-warm-gray/10">
          <TabsTrigger
            value="find-mentors"
            className="data-[state=active]:bg-sew-midnight-blue data-[state=active]:text-white"
          >
            Find Mentors
          </TabsTrigger>
          <TabsTrigger
            value="my-sessions"
            className="data-[state=active]:bg-sew-midnight-blue data-[state=active]:text-white"
          >
            My Sessions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="find-mentors" className="space-y-6">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search by name, expertise, or keywords..." className="pl-8" />
            </div>
            <Button
              variant="outline"
              className="border-sew-midnight-blue text-sew-midnight-blue hover:bg-sew-midnight-blue/10"
            >
              Filter
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map((mentor) => (
              <Card
                key={mentor.id}
                className="overflow-hidden border-sew-warm-gray/20 hover:border-sew-midnight-blue/30 transition-colors"
              >
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full bg-muted">
                    <Image src={mentor.image || "/placeholder.svg"} alt={mentor.name} fill className="object-cover" />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <CardTitle className="text-sew-midnight-blue">{mentor.name}</CardTitle>
                    <p className="text-sm font-medium text-muted-foreground">{mentor.title}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {mentor.expertise.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="bg-sew-sky-blue/10 text-sew-sky-blue hover:bg-sew-sky-blue/20 border-sew-sky-blue/20"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm mt-4">{mentor.bio}</p>
                    <div className="flex items-center text-sm text-muted-foreground mt-2">
                      <span className="flex items-center text-sew-sunset-orange">
                        ★ {mentor.rating} ({mentor.reviews} reviews)
                      </span>
                      <Separator orientation="vertical" className="mx-2 h-4" />
                      <span>{mentor.availability}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between p-6 pt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-sew-moss-green text-sew-moss-green hover:bg-sew-moss-green/10"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                  <Button size="sm" className="bg-sew-midnight-blue hover:bg-sew-midnight-blue/90" asChild>
                    <Link href={`/dashboard/mentorship/${mentor.id}`}>
                      View Profile
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-sessions" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-sew-midnight-blue">Upcoming Sessions</h2>
            <Button className="bg-sew-midnight-blue hover:bg-sew-midnight-blue/90">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule New Session
            </Button>
          </div>

          {upcomingSessions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingSessions.map((session) => (
                <Card key={session.id} className="border-sew-warm-gray/20">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative h-16 w-16 rounded-full overflow-hidden border border-sew-warm-gray/20">
                        <Image
                          src={session.mentorImage || "/placeholder.svg"}
                          alt={session.mentorName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-sew-midnight-blue">{session.topic}</h3>
                        <p className="text-sm text-muted-foreground">with {session.mentorName}</p>
                        <div className="flex items-center mt-1 text-sm text-sew-moss-green">
                          <Calendar className="mr-2 h-4 w-4" />
                          {session.date}, {session.time}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end p-6 pt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-2 border-sew-warm-gray text-sew-warm-gray hover:bg-sew-warm-gray/10"
                    >
                      Reschedule
                    </Button>
                    <Button size="sm" className="bg-sew-midnight-blue hover:bg-sew-midnight-blue/90">
                      Join Meeting
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-sew-warm-gray/20">
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground mb-4">You don't have any upcoming mentorship sessions.</p>
                <Button className="bg-sew-midnight-blue hover:bg-sew-midnight-blue/90">
                  Schedule Your First Session
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-sew-midnight-blue">Past Sessions</h2>
            <Card className="border-sew-warm-gray/20">
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">Your past mentorship sessions will appear here.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
