import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  ClockIcon,
  Share2Icon,
  CalendarPlusIcon,
  ArrowLeftIcon,
} from "lucide-react"
import { format, parseISO } from "date-fns"
import Link from "next/link"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { AICompanionEmbedded } from "@/components/ai-companion/ai-companion-embedded"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample events data (same as in the events page)
const events = [
  {
    id: "event-1",
    title: "Nature-based Solutions Workshop",
    description: "A hands-on workshop exploring successful nature-based adaptation projects from around the world.",
    longDescription: `
      Join us for an interactive workshop focused on nature-based solutions for climate adaptation. This workshop will showcase successful projects from around the world and provide practical guidance on implementing similar solutions in your community.
      
      You'll learn about:
      - Key principles of nature-based solutions
      - Case studies from urban and rural contexts
      - Implementation challenges and how to overcome them
      - Funding mechanisms for nature-based projects
      - Monitoring and evaluating success
      
      This workshop is ideal for municipal planners, environmental professionals, community organizers, and anyone interested in sustainable approaches to climate adaptation.
    `,
    date: "2023-05-15",
    time: "10:00 AM - 12:00 PM EDT",
    location: "Virtual",
    platform: "Zoom",
    attendees: 42,
    domain: "Adaptation Options",
    image: "/nature-based-workshop.png",
    tags: ["nature-based solutions", "workshop", "virtual"],
    type: "Workshop",
    featured: true,
    speakers: [
      {
        name: "Dr. Sarah Chen",
        title: "Environmental Scientist, Green Infrastructure Institute",
        avatar: "/avatars/sarah-chen.png",
      },
      {
        name: "Miguel Rodriguez",
        title: "Urban Planner, City of Barcelona",
        avatar: "/avatars/miguel-rodriguez.png",
      },
    ],
    agenda: [
      {
        time: "10:00 AM - 10:15 AM",
        title: "Welcome and Introduction",
        description: "Overview of the workshop and introduction to nature-based solutions",
      },
      {
        time: "10:15 AM - 10:45 AM",
        title: "Case Studies: Urban Green Infrastructure",
        description: "Successful examples from cities around the world",
      },
      {
        time: "10:45 AM - 11:15 AM",
        title: "Case Studies: Rural and Coastal Solutions",
        description: "Examples from rural and coastal communities",
      },
      {
        time: "11:15 AM - 11:45 AM",
        title: "Implementation Strategies",
        description: "Practical guidance on planning, funding, and implementing nature-based solutions",
      },
      {
        time: "11:45 AM - 12:00 PM",
        title: "Q&A and Closing",
        description: "Open discussion and next steps",
      },
    ],
    relatedResources: [
      {
        title: "Nature-based Solutions for Climate Adaptation Guidebook",
        type: "PDF",
        url: "/resources/nature-based-solutions-guidebook",
      },
      {
        title: "Green Infrastructure Planning Toolkit",
        type: "Toolkit",
        url: "/resources/green-infrastructure-toolkit",
      },
      {
        title: "Funding Nature-based Solutions Course",
        type: "Course",
        url: "/courses/funding-nature-based-solutions",
      },
    ],
  },
  // Other events would be defined here
]

export default function EventDetailPage({ params }: { params: { id: string } }) {
  // Find the event by ID
  const event = events.find((e) => e.id === params.id)

  // If event not found, show error
  if (!event) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
        <p className="mb-6">The event you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/events">
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Events
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="sm" asChild className="mr-2">
              <Link href="/events">
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Back to Events
              </Link>
            </Button>
            <Badge variant="outline">{event.domain}</Badge>
            <Badge className="ml-2">{event.type}</Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold mb-4">{event.title}</h1>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-5 w-5 text-primary" />
                  <span>
                    {event.endDate
                      ? `${format(parseISO(event.date), "MMM d")} - ${format(parseISO(event.endDate), "MMM d, yyyy")}`
                      : format(parseISO(event.date), "MMM d, yyyy")}
                  </span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="mr-2 h-5 w-5 text-primary" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="mr-2 h-5 w-5 text-primary" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center">
                  <UsersIcon className="mr-2 h-5 w-5 text-primary" />
                  <span>{event.attendees} attending</span>
                </div>
              </div>

              <div className="relative h-[300px] mb-6 rounded-lg overflow-hidden">
                <OptimizedImage
                  src={event.image || `/placeholder.svg?height=600&width=1200&query=${encodeURIComponent(event.title)}`}
                  alt={event.title}
                  priority
                  className="rounded-lg"
                />
              </div>

              <Tabs defaultValue="overview" className="mb-8">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="agenda">Agenda</TabsTrigger>
                  <TabsTrigger value="speakers">Speakers</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <div className="prose max-w-none">
                    <p className="text-lg mb-4">{event.description}</p>
                    {event.longDescription && <div className="mt-4 whitespace-pre-line">{event.longDescription}</div>}

                    <div className="flex flex-wrap gap-2 mt-6">
                      {event.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="agenda">
                  {event.agenda ? (
                    <div className="space-y-4">
                      {event.agenda.map((item, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                              <h3 className="font-semibold">{item.title}</h3>
                              <span className="text-sm text-muted-foreground">{item.time}</span>
                            </div>
                            <p className="text-sm">{item.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p>No agenda information available for this event.</p>
                  )}
                </TabsContent>

                <TabsContent value="speakers">
                  {event.speakers ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {event.speakers.map((speaker, index) => (
                        <Card key={index}>
                          <CardContent className="p-4 flex items-center">
                            <Avatar className="h-16 w-16 mr-4">
                              <AvatarImage src={speaker.avatar || "/placeholder.svg"} alt={speaker.name} />
                              <AvatarFallback>
                                {speaker.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">{speaker.name}</h3>
                              <p className="text-sm text-muted-foreground">{speaker.title}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p>No speaker information available for this event.</p>
                  )}
                </TabsContent>

                <TabsContent value="resources">
                  {event.relatedResources ? (
                    <div className="space-y-4">
                      {event.relatedResources.map((resource, index) => (
                        <Card key={index}>
                          <CardContent className="p-4 flex justify-between items-center">
                            <div>
                              <h3 className="font-semibold">{resource.title}</h3>
                              <p className="text-sm text-muted-foreground">{resource.type}</p>
                            </div>
                            <Button asChild>
                              <Link href={resource.url}>View</Link>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p>No related resources available for this event.</p>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Registration</CardTitle>
                  <CardDescription>Secure your spot for this event</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {event.platform && (
                      <div className="p-3 bg-muted rounded-lg">
                        <h3 className="font-medium text-sm mb-1">Platform</h3>
                        <p className="text-sm">{event.platform}</p>
                      </div>
                    )}

                    <Button className="w-full">Register Now</Button>

                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <CalendarPlusIcon className="mr-2 h-4 w-4" />
                        Add to Calendar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2Icon className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AI Companion</CardTitle>
                  <CardDescription>Get personalized insights about this event</CardDescription>
                </CardHeader>
                <CardContent>
                  <AICompanionEmbedded
                    flowId="event-insights"
                    prompt={`Tell me how this event (${event.title}) relates to my learning goals and interests`}
                    buttonText="Get Insights"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Similar Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {events
                    .filter(
                      (e) =>
                        e.id !== event.id &&
                        (e.domain === event.domain || e.tags.some((tag) => event.tags.includes(tag))),
                    )
                    .slice(0, 3)
                    .map((similarEvent) => (
                      <div
                        key={similarEvent.id}
                        className="flex items-start space-x-3 pb-3 last:pb-0 last:border-0 border-b"
                      >
                        <div className="relative h-12 w-12 flex-shrink-0 rounded overflow-hidden">
                          <OptimizedImage
                            src={
                              similarEvent.image ||
                              `/placeholder.svg?height=100&width=100&query=${encodeURIComponent(similarEvent.title)}`
                            }
                            alt={similarEvent.title}
                            aspectRatio="square"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-sm line-clamp-2">
                            <Link href={`/events/${similarEvent.id}`} className="hover:underline">
                              {similarEvent.title}
                            </Link>
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {format(parseISO(similarEvent.date), "MMM d, yyyy")}
                          </p>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
