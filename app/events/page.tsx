import { Suspense } from "react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, MapPinIcon, UsersIcon, FilterIcon, SearchIcon, ClockIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { format, isSameMonth, parseISO, startOfMonth, endOfMonth, isSameDay } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Link from "next/link"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { Skeleton } from "@/components/ui/skeleton"
import { AICompanionEmbedded } from "@/components/ai-companion/ai-companion-embedded"

// Sample events data
const events = [
  {
    id: "event-1",
    title: "Nature-based Solutions Workshop",
    description: "A hands-on workshop exploring successful nature-based adaptation projects from around the world.",
    date: "2023-05-15",
    time: "10:00 AM - 12:00 PM EDT",
    location: "Virtual",
    attendees: 42,
    domain: "Adaptation Options",
    image: "/nature-based-workshop.png",
    tags: ["nature-based solutions", "workshop", "virtual"],
    type: "Workshop",
    featured: true,
  },
  {
    id: "event-2",
    title: "Climate Risk Assessment Conference",
    description:
      "Annual conference bringing together experts in climate risk assessment to share latest methodologies and case studies.",
    date: "2023-06-10",
    endDate: "2023-06-12",
    time: "All Day",
    location: "Toronto, Canada",
    attendees: 156,
    domain: "Climate Risk Assessment",
    image: "/risk-assessment-conference.png",
    tags: ["risk mapping", "conference", "in-person"],
    type: "Conference",
    featured: true,
  },
  {
    id: "event-3",
    title: "Monitoring & Evaluation Webinar",
    description: "Learn practical approaches to monitoring and evaluating climate adaptation initiatives.",
    date: "2023-05-22",
    time: "2:00 PM - 3:30 PM EDT",
    location: "Virtual",
    attendees: 78,
    domain: "Monitoring & Learning",
    image: "/monitoring-webinar.png",
    tags: ["monitoring", "evaluation", "webinar"],
    type: "Webinar",
    featured: false,
  },
  {
    id: "event-4",
    title: "Equity in Adaptation Planning",
    description: "A workshop focused on integrating equity considerations into adaptation planning processes.",
    date: "2023-05-30",
    time: "1:00 PM - 4:00 PM EDT",
    location: "Virtual",
    attendees: 65,
    domain: "Cross-Cutting Skills",
    image: "/equity-workshop.png",
    tags: ["equity", "justice", "planning"],
    type: "Workshop",
    featured: false,
  },
  {
    id: "event-5",
    title: "Climate Finance Symposium",
    description: "Explore funding mechanisms and financial strategies for climate adaptation projects.",
    date: "2023-06-15",
    time: "9:00 AM - 5:00 PM EDT",
    location: "Montreal, Canada",
    attendees: 112,
    domain: "Implementation & Operations",
    image: "/climate-finance-symposium.png",
    tags: ["finance", "funding", "symposium"],
    type: "Symposium",
    featured: true,
  },
  {
    id: "event-6",
    title: "Indigenous Knowledge in Adaptation",
    description: "A panel discussion on integrating indigenous knowledge into climate adaptation strategies.",
    date: "2023-06-22",
    time: "1:00 PM - 3:00 PM EDT",
    location: "Virtual",
    attendees: 89,
    domain: "Cross-Cutting Skills",
    image: "/indigenous-knowledge-panel.png",
    tags: ["indigenous knowledge", "panel", "virtual"],
    type: "Panel Discussion",
    featured: false,
  },
  {
    id: "event-7",
    title: "Urban Resilience Planning Workshop",
    description: "Practical workshop on developing resilience plans for urban environments.",
    date: "2023-07-05",
    time: "10:00 AM - 4:00 PM EDT",
    location: "Vancouver, Canada",
    attendees: 45,
    domain: "Strategic Adaptation Planning",
    image: "/urban-resilience-workshop.png",
    tags: ["urban", "resilience", "planning"],
    type: "Workshop",
    featured: false,
  },
  {
    id: "event-8",
    title: "Climate Data Visualization Masterclass",
    description: "Learn advanced techniques for visualizing and communicating climate data effectively.",
    date: "2023-07-12",
    time: "1:00 PM - 4:00 PM EDT",
    location: "Virtual",
    attendees: 67,
    domain: "Climate Risk Assessment",
    image: "/data-visualization-masterclass.png",
    tags: ["data", "visualization", "masterclass"],
    type: "Workshop",
    featured: false,
  },
]

// Event Card Component
function EventCard({ event }: { event: any }) {
  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48">
        <OptimizedImage
          src={event.image || `/placeholder.svg?height=300&width=500&query=${encodeURIComponent(event.title)}`}
          alt={event.title}
          aspectRatio="video"
          fallbackSrc="/community-event.png"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={event.featured}
          className="rounded-t-lg"
        />
        {event.featured && (
          <div className="absolute top-2 right-2">
            <Badge variant="default" className="bg-primary text-primary-foreground">
              Featured
            </Badge>
          </div>
        )}
      </div>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start gap-2 mb-2">
          <Badge variant="outline">{event.domain}</Badge>
          <Badge variant="secondary">{event.type}</Badge>
        </div>
        <CardTitle className="text-lg line-clamp-2">{event.title}</CardTitle>
        <CardDescription className="line-clamp-2">{event.description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>
              {event.endDate
                ? `${format(parseISO(event.date), "MMM d")} - ${format(parseISO(event.endDate), "MMM d, yyyy")}`
                : format(parseISO(event.date), "MMM d, yyyy")}
            </span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="mr-2 h-4 w-4" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="mr-2 h-4 w-4" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center">
            <UsersIcon className="mr-2 h-4 w-4" />
            <span>{event.attendees} attending</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mt-3">
          {event.tags.map((tag: string) => (
            <Badge key={tag} variant="outline" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/events/${event.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

// Event Card Skeleton for loading state
function EventCardSkeleton() {
  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <div className="relative h-48">
        <Skeleton className="h-full w-full rounded-t-lg" />
      </div>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start gap-2 mb-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-20" />
        </div>
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4 mt-1" />
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="flex gap-1 mt-3">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Skeleton className="h-9 w-full" />
      </CardFooter>
    </Card>
  )
}

// Calendar Day Component
function CalendarDay({ day, events }: { day: Date; events: any[] }) {
  const dayEvents = events.filter((event) => {
    const eventDate = parseISO(event.date)
    const eventEndDate = event.endDate ? parseISO(event.endDate) : null

    if (eventEndDate) {
      return (eventDate <= day && eventEndDate >= day) || isSameDay(eventDate, day) || isSameDay(eventEndDate, day)
    }

    return isSameDay(eventDate, day)
  })

  return (
    <div className={`p-1 h-24 border border-border ${dayEvents.length > 0 ? "bg-muted/30" : ""}`}>
      <div className="text-xs font-medium">{format(day, "d")}</div>
      {dayEvents.length > 0 && (
        <div className="mt-1">
          {dayEvents.slice(0, 2).map((event) => (
            <div key={event.id} className="text-xs truncate p-0.5 bg-primary/10 rounded mb-0.5">
              {event.title}
            </div>
          ))}
          {dayEvents.length > 2 && <div className="text-xs text-muted-foreground">+{dayEvents.length - 2} more</div>}
        </div>
      )}
    </div>
  )
}

// Month Calendar Component
function MonthCalendar({ month, year, events }: { month: number; year: number; events: any[] }) {
  const firstDay = startOfMonth(new Date(year, month))
  const lastDay = endOfMonth(new Date(year, month))

  // Get days of the week
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  // Get all days in the month
  const days = []
  let currentDay = firstDay
  while (currentDay <= lastDay) {
    days.push(currentDay)
    currentDay = new Date(currentDay.getTime() + 24 * 60 * 60 * 1000)
  }

  // Add padding days at the beginning
  const paddingDaysBefore = firstDay.getDay()
  for (let i = 0; i < paddingDaysBefore; i++) {
    days.unshift(new Date(firstDay.getTime() - (i + 1) * 24 * 60 * 60 * 1000))
  }

  // Add padding days at the end to make complete weeks
  const remainingDays = (7 - (days.length % 7)) % 7
  for (let i = 0; i < remainingDays; i++) {
    days.push(new Date(lastDay.getTime() + (i + 1) * 24 * 60 * 60 * 1000))
  }

  // Group days into weeks
  const weeks = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="grid grid-cols-7 bg-muted">
        {daysOfWeek.map((day) => (
          <div key={day} className="p-2 text-center text-sm font-medium">
            {day}
          </div>
        ))}
      </div>
      <div>
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7">
            {week.map((day) => (
              <CalendarDay
                key={day.toISOString()}
                day={day}
                events={events.filter((event) => {
                  // Only show events for the current month
                  return isSameMonth(parseISO(event.date), new Date(year, month))
                })}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// Main Events Page Component
export default function EventsPage() {
  // Get current month and year
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  return (
    <>
      <PageHeader
        title="Events"
        description="Connect with peers and experts at upcoming events and learning opportunities"
      >
        <div className="flex flex-col sm:flex-row gap-2 max-w-3xl mx-auto mt-6">
          <div className="relative flex-grow">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search events..." className="h-10 pl-9 bg-white/90 text-black" />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="justify-start text-left font-normal bg-white/90 text-black sm:w-[180px]"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span>Pick a date</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" initialFocus />
            </PopoverContent>
          </Popover>
        </div>
      </PageHeader>

      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Featured Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Suspense
              fallback={
                <>
                  <EventCardSkeleton />
                  <EventCardSkeleton />
                  <EventCardSkeleton />
                </>
              }
            >
              {events
                .filter((event) => event.featured)
                .slice(0, 3)
                .map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
            </Suspense>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/4 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <FilterIcon className="h-4 w-4 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Domain</h3>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="All domains" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All domains</SelectItem>
                      <SelectItem value="risk">Climate Risk Assessment</SelectItem>
                      <SelectItem value="planning">Strategic Adaptation Planning</SelectItem>
                      <SelectItem value="options">Adaptation Options</SelectItem>
                      <SelectItem value="implementation">Implementation & Operations</SelectItem>
                      <SelectItem value="monitoring">Monitoring & Learning</SelectItem>
                      <SelectItem value="cross-cutting">Cross-Cutting Skills</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Event Type</h3>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All types</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="conference">Conference</SelectItem>
                      <SelectItem value="webinar">Webinar</SelectItem>
                      <SelectItem value="panel">Panel Discussion</SelectItem>
                      <SelectItem value="symposium">Symposium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Location</h3>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="All locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All locations</SelectItem>
                      <SelectItem value="virtual">Virtual</SelectItem>
                      <SelectItem value="in-person">In-Person</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Date Range</h3>
                  <div className="flex flex-col gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          <span>Start date</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" initialFocus />
                      </PopoverContent>
                    </Popover>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          <span>End date</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="pt-2">
                  <Button variant="outline" className="w-full">
                    Clear Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">AI Companion</CardTitle>
                <CardDescription>Get personalized event recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <AICompanionEmbedded
                  flowId="event-recommendations"
                  prompt="Suggest events based on my interests and learning goals"
                  buttonText="Get Recommendations"
                />
              </CardContent>
            </Card>
          </div>

          <div className="lg:w-3/4">
            <Tabs defaultValue="list" className="w-full">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-muted-foreground">
                  {events.length} {events.length === 1 ? "event" : "events"} found
                </div>
                <TabsList>
                  <TabsTrigger value="list">List</TabsTrigger>
                  <TabsTrigger value="grid">Grid</TabsTrigger>
                  <TabsTrigger value="calendar">Calendar</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="list" className="mt-6 space-y-4">
                <Suspense
                  fallback={
                    <>
                      {[...Array(5)].map((_, i) => (
                        <Card key={i} className="mb-4">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/4">
                              <Skeleton className="h-full min-h-[150px] rounded-l-lg" />
                            </div>
                            <div className="flex-1 p-4">
                              <Skeleton className="h-6 w-3/4 mb-2" />
                              <Skeleton className="h-4 w-full mb-1" />
                              <Skeleton className="h-4 w-5/6 mb-4" />
                              <div className="space-y-2">
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-4 w-1/3" />
                                <Skeleton className="h-4 w-1/4" />
                              </div>
                              <div className="mt-4">
                                <Skeleton className="h-9 w-32" />
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </>
                  }
                >
                  {events.map((event) => (
                    <Card key={event.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 relative">
                          <OptimizedImage
                            src={
                              event.image ||
                              `/placeholder.svg?height=300&width=500&query=${encodeURIComponent(event.title)}`
                            }
                            alt={event.title}
                            aspectRatio="video"
                            fallbackSrc="/community-event.png"
                            sizes="(max-width: 768px) 100vw, 25vw"
                            containerClassName="md:h-full"
                          />
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex justify-between items-start gap-2 mb-2">
                            <Badge variant="outline">{event.domain}</Badge>
                            <Badge>{event.type}</Badge>
                          </div>
                          <h3 className="text-lg font-semibold">{event.title}</h3>
                          <p className="text-muted-foreground mt-1">{event.description}</p>

                          <div className="flex flex-col space-y-1 mt-3 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              <span>
                                {event.endDate
                                  ? `${format(parseISO(event.date), "MMM d")} - ${format(parseISO(event.endDate), "MMM d, yyyy")}`
                                  : format(parseISO(event.date), "MMM d, yyyy")}{" "}
                                • {event.time}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <MapPinIcon className="mr-2 h-4 w-4" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center">
                              <UsersIcon className="mr-2 h-4 w-4" />
                              <span>{event.attendees} attending</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1 mt-3">
                            {event.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="mt-4">
                            <Button asChild>
                              <Link href={`/events/${event.id}`}>View Details</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </Suspense>
              </TabsContent>

              <TabsContent value="grid" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Suspense
                    fallback={
                      <>
                        {[...Array(6)].map((_, i) => (
                          <EventCardSkeleton key={i} />
                        ))}
                      </>
                    }
                  >
                    {events.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </Suspense>
                </div>
              </TabsContent>

              <TabsContent value="calendar" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">
                      {format(new Date(currentYear, currentMonth), "MMMM yyyy")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MonthCalendar month={currentMonth} year={currentYear} events={events} />

                    <div className="mt-6 space-y-4">
                      <h3 className="font-medium">Upcoming Events</h3>
                      {events
                        .filter((event) => parseISO(event.date) >= new Date())
                        .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime())
                        .slice(0, 3)
                        .map((event) => (
                          <Card key={event.id} className="overflow-hidden">
                            <div className="flex items-center p-3">
                              <div className="bg-primary/10 rounded-lg p-2 mr-3">
                                <CalendarIcon className="h-5 w-5 text-primary" />
                              </div>
                              <div className="flex-grow">
                                <h4 className="font-medium text-sm">{event.title}</h4>
                                <p className="text-xs text-muted-foreground">
                                  {format(parseISO(event.date), "MMM d, yyyy")} • {event.time}
                                </p>
                              </div>
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/events/${event.id}`}>View</Link>
                              </Button>
                            </div>
                          </Card>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  )
}
