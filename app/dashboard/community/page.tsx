import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, MapPin, MessageCircle, Plus, Search, ThumbsUp, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const metadata: Metadata = {
  title: "Community | Small Economy Works",
  description: "Connect with other members of the Small Economy Works community.",
}

// Mock data for discussions
const discussions = [
  {
    id: "1",
    title: "Tips for writing a successful grant application",
    author: {
      name: "Jamie Thompson",
      avatar: "/placeholder-bfhj3.png",
    },
    category: "Grant Writing",
    replies: 24,
    views: 156,
    likes: 37,
    lastActivity: "2 hours ago",
    excerpt:
      "I'm working on my first major grant application and would love to hear advice from those who have been successful in the past. What are some key things to focus on?",
    tags: ["Grants", "Funding", "Tips"],
  },
  {
    id: "2",
    title: "Youth-led initiatives in rural communities",
    author: {
      name: "Alex Redfeather",
      avatar: "/placeholder-q00l8.png",
    },
    category: "Project Ideas",
    replies: 18,
    views: 92,
    likes: 29,
    lastActivity: "Yesterday",
    excerpt:
      "I'm looking to start a youth-led initiative in my rural community. What kinds of projects have worked well in similar settings? Especially interested in ideas that connect traditional knowledge with new opportunities.",
    tags: ["Youth", "Rural", "Traditional Knowledge"],
  },
  {
    id: "3",
    title: "Collaborative funding models for community projects",
    author: {
      name: "Sam Wilson",
      avatar: "/placeholder-hzvjo.png",
    },
    category: "Funding",
    replies: 31,
    views: 203,
    likes: 45,
    lastActivity: "3 days ago",
    excerpt:
      "Has anyone experimented with collaborative funding models where multiple community groups pool resources? I'd love to hear about successes and challenges.",
    tags: ["Collaboration", "Funding", "Community"],
  },
  {
    id: "4",
    title: "Digital storytelling tools for cultural preservation",
    author: {
      name: "Jordan Lee",
      avatar: "/placeholder-vy2eb.png",
    },
    category: "Digital Tools",
    replies: 15,
    views: 87,
    likes: 22,
    lastActivity: "5 days ago",
    excerpt:
      "I'm working on a project to help elders share traditional stories using digital tools. What platforms or approaches have worked well for others?",
    tags: ["Digital", "Storytelling", "Culture"],
  },
]

// Mock data for communities
const communities = [
  {
    id: "1",
    name: "Grant Writers Circle",
    description: "Support and resources for writing successful grant applications",
    members: 128,
    image: "/placeholder-3tthb.png",
    topics: ["Funding", "Applications", "Resources"],
  },
  {
    id: "2",
    name: "Indigenous Entrepreneurs",
    description: "Connecting Indigenous business owners and aspiring entrepreneurs",
    members: 95,
    image: "/placeholder-oasym.png",
    topics: ["Business", "Traditional Knowledge", "Marketing"],
  },
  {
    id: "3",
    name: "Youth Leaders Network",
    description: "For young people leading community initiatives and projects",
    members: 156,
    image: "/placeholder-yze5z.png",
    topics: ["Leadership", "Projects", "Mentorship"],
  },
  {
    id: "4",
    name: "Land-Based Learning",
    description: "Sharing approaches to education connected to the land",
    members: 87,
    image: "/placeholder-416kf.png",
    topics: ["Education", "Traditional Skills", "Environment"],
  },
]

// Mock data for upcoming events
const events = [
  {
    id: "1",
    title: "Grant Writing Workshop",
    date: "May 20, 2025",
    time: "1:00 PM - 3:00 PM",
    location: "Online",
    attendees: 45,
  },
  {
    id: "2",
    title: "Community Project Showcase",
    date: "June 5, 2025",
    time: "5:00 PM - 7:00 PM",
    location: "Community Center",
    attendees: 32,
  },
]

export default function CommunityPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-sew-midnight-blue">Community</h1>
        <p className="text-muted-foreground">Connect with other members, join discussions, and share knowledge.</p>
      </div>

      <Tabs defaultValue="discussions" className="space-y-4">
        <TabsList className="bg-sew-warm-gray/10">
          <TabsTrigger
            value="discussions"
            className="data-[state=active]:bg-sew-midnight-blue data-[state=active]:text-white"
          >
            Discussions
          </TabsTrigger>
          <TabsTrigger
            value="communities"
            className="data-[state=active]:bg-sew-midnight-blue data-[state=active]:text-white"
          >
            Communities
          </TabsTrigger>
          <TabsTrigger
            value="events"
            className="data-[state=active]:bg-sew-midnight-blue data-[state=active]:text-white"
          >
            Events
          </TabsTrigger>
        </TabsList>

        <TabsContent value="discussions" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search discussions..." className="pl-8" />
            </div>
            <Button className="bg-sew-midnight-blue hover:bg-sew-midnight-blue/90">
              <Plus className="mr-2 h-4 w-4" />
              New Discussion
            </Button>
          </div>

          <div className="space-y-4">
            {discussions.map((discussion) => (
              <Card
                key={discussion.id}
                className="border-sew-warm-gray/20 hover:border-sew-midnight-blue/30 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10 border border-sew-warm-gray/20">
                      <AvatarImage src={discussion.author.avatar || "/placeholder.svg"} alt={discussion.author.name} />
                      <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-2">
                      <div>
                        <Link href={`/dashboard/community/discussions/${discussion.id}`} className="hover:underline">
                          <h3 className="font-semibold text-lg text-sew-midnight-blue">{discussion.title}</h3>
                        </Link>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span>{discussion.author.name}</span>
                          <span className="mx-1">•</span>
                          <span>{discussion.lastActivity}</span>
                          <Badge
                            variant="outline"
                            className="ml-2 bg-sew-sky-blue/10 text-sew-sky-blue border-sew-sky-blue/20"
                          >
                            {discussion.category}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-sm">{discussion.excerpt}</p>

                      <div className="flex flex-wrap gap-2">
                        {discussion.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs bg-sew-moss-green/10 text-sew-moss-green border-sew-moss-green/20"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center pt-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <MessageCircle className="mr-1 h-4 w-4 text-sew-midnight-blue" />
                          <span className="mr-4">{discussion.replies} replies</span>
                        </div>
                        <div className="flex items-center">
                          <ThumbsUp className="mr-1 h-4 w-4 text-sew-sunset-orange" />
                          <span className="mr-4">{discussion.likes} likes</span>
                        </div>
                        <div className="flex items-center">
                          <span>{discussion.views} views</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-sew-midnight-blue hover:bg-sew-midnight-blue/10"
                      asChild
                    >
                      <Link href={`/dashboard/community/discussions/${discussion.id}`}>
                        <ArrowRight className="h-4 w-4" />
                        <span className="sr-only">View discussion</span>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="communities" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search communities..." className="pl-8" />
            </div>
            <Button className="bg-sew-midnight-blue hover:bg-sew-midnight-blue/90">
              <Plus className="mr-2 h-4 w-4" />
              Create Community
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((community) => (
              <Card
                key={community.id}
                className="overflow-hidden border-sew-warm-gray/20 hover:border-sew-midnight-blue/30 transition-colors"
              >
                <CardHeader className="p-0">
                  <div className="relative h-32 w-full bg-muted">
                    <Image
                      src={community.image || "/placeholder.svg"}
                      alt={community.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="mb-2 text-sew-midnight-blue">{community.name}</CardTitle>
                  <CardDescription>{community.description}</CardDescription>

                  <div className="flex items-center mt-4 text-sm text-muted-foreground">
                    <Users className="mr-1 h-4 w-4 text-sew-sky-blue" />
                    <span>{community.members} members</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {community.topics.map((topic) => (
                      <Badge
                        key={topic}
                        variant="secondary"
                        className="bg-sew-sky-blue/10 text-sew-sky-blue border-sew-sky-blue/20"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button className="w-full bg-sew-midnight-blue hover:bg-sew-midnight-blue/90" asChild>
                    <Link href={`/dashboard/community/groups/${community.id}`}>Join Community</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-sew-midnight-blue">Upcoming Events</h2>
            <Button className="bg-sew-midnight-blue hover:bg-sew-midnight-blue/90">
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => (
              <Card
                key={event.id}
                className="border-sew-warm-gray/20 hover:border-sew-midnight-blue/30 transition-colors"
              >
                <CardContent className="p-6">
                  <CardTitle className="mb-2 text-sew-midnight-blue">{event.title}</CardTitle>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-sew-sunset-orange" />
                      <span>
                        {event.date}, {event.time}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-sew-moss-green" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-sew-sky-blue" />
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button
                    variant="outline"
                    className="mr-2 border-sew-midnight-blue text-sew-midnight-blue hover:bg-sew-midnight-blue/10"
                  >
                    Learn More
                  </Button>
                  <Button className="bg-sew-midnight-blue hover:bg-sew-midnight-blue/90">RSVP</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-sew-midnight-blue">Past Events</h2>
            <Card className="border-sew-warm-gray/20">
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">Past events will be displayed here.</p>
                <Button
                  variant="outline"
                  className="mt-4 border-sew-midnight-blue text-sew-midnight-blue hover:bg-sew-midnight-blue/10"
                >
                  View Archive
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
