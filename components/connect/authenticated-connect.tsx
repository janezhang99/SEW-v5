import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MessageSquare, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

export default function AuthenticatedConnectPage() {
  return (
    <div className="container mx-auto max-w-7xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Connect with the Community</h1>
        <p className="text-xl text-muted-foreground">
          Join discussions, find events, and connect with adaptation practitioners across Canada
        </p>
      </div>

      {/* Search and filters */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search discussions, groups, and events" className="pl-9" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
        <Button>
          <MessageSquare className="mr-2 h-4 w-4" />
          New Discussion
        </Button>
      </div>

      {/* Main content tabs */}
      <Tabs defaultValue="foryou" className="space-y-6">
        <TabsList>
          <TabsTrigger value="foryou">For You</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="network">Your Network</TabsTrigger>
        </TabsList>

        <TabsContent value="foryou" className="space-y-8">
          {/* Personalized recommendations */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold tracking-tight">Recommended for You</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <RecommendationCard
                type="Discussion"
                title="Integrating climate projections into municipal planning"
                reason="Based on your role as Municipal Planner"
                image="/placeholder.svg?height=100&width=100&query=climate projections planning"
              />
              <RecommendationCard
                type="Group"
                title="Urban Heat Island Practitioners"
                reason="Matches your interest in Urban Heat"
                image="/placeholder.svg?height=100&width=100&query=urban heat island group"
              />
              <RecommendationCard
                type="Event"
                title="Climate-Resilient Infrastructure Workshop"
                reason="Related to your Infrastructure project"
                image="/placeholder.svg?height=100&width=100&query=climate infrastructure workshop"
              />
            </div>
          </section>

          {/* Your groups activity */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold tracking-tight">Your Groups Activity</h2>
              <Button variant="outline" asChild>
                <Link href="/connect/groups">
                  View All Groups <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="space-y-4">
              <ActivityCard
                group="Urban Planners Network"
                action="New discussion"
                content="Strategies for engaging community stakeholders in adaptation planning"
                time="2 hours ago"
                image="/placeholder.svg?key=i2gzp"
              />
              <ActivityCard
                group="Municipal Adaptation Forum"
                action="Upcoming event"
                content="Webinar: Securing funding for adaptation projects"
                time="Tomorrow, 1:00 PM EDT"
                image="/placeholder.svg?height=50&width=50&query=municipal forum group"
              />
              <ActivityCard
                group="Climate Risk Assessment Group"
                action="New resource shared"
                content="Updated risk assessment framework for Canadian municipalities"
                time="Yesterday"
                image="/placeholder.svg?height=50&width=50&query=climate risk assessment group"
              />
            </div>
          </section>

          {/* Upcoming events */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold tracking-tight">Upcoming Events</h2>
              <Button variant="outline" asChild>
                <Link href="/connect/events">
                  View Calendar <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <EventCardAuthenticated
                title="Climate-Resilient Infrastructure Workshop"
                date="May 20, 2024"
                location="Virtual"
                organizer="Infrastructure Canada"
                attendees={42}
                image="/placeholder.svg?height=200&width=300&query=climate infrastructure workshop"
                registered={true}
              />
              <EventCardAuthenticated
                title="National Adaptation Forum 2024"
                date="June 5-7, 2024"
                location="Toronto, ON"
                organizer="Environment Canada"
                attendees={150}
                image="/placeholder.svg?height=200&width=300&query=climate adaptation conference"
                registered={false}
              />
              <EventCardAuthenticated
                title="Urban Heat Island Mitigation Strategies"
                date="June 15, 2024"
                location="Virtual"
                organizer="Canadian Urban Institute"
                attendees={68}
                image="/placeholder.svg?height=200&width=300&query=urban heat island mitigation"
                registered={false}
              />
            </div>
          </section>
        </TabsContent>

        <TabsContent value="discussions">
          <p className="text-muted-foreground">Full discussions content would appear here</p>
        </TabsContent>

        <TabsContent value="groups">
          <p className="text-muted-foreground">Full groups content would appear here</p>
        </TabsContent>

        <TabsContent value="events">
          <p className="text-muted-foreground">Full events content would appear here</p>
        </TabsContent>

        <TabsContent value="network">
          <p className="text-muted-foreground">Your network content would appear here</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function RecommendationCard({ type, title, reason, image }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Badge className="w-fit mb-1">{type}</Badge>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 rounded-md overflow-hidden">
            <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
          </div>
          <p className="text-sm text-muted-foreground">{reason}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View {type}
        </Button>
      </CardFooter>
    </Card>
  )
}

function ActivityCard({ group, action, content, time, image }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="relative h-10 w-10 rounded-full overflow-hidden">
            <Image src={image || "/placeholder.svg"} alt={group} fill className="object-cover" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-medium">{group}</p>
              <Badge variant="outline" className="text-xs">
                {action}
              </Badge>
            </div>
            <p className="mt-1 text-sm">{content}</p>
            <p className="mt-1 text-xs text-muted-foreground">{time}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function EventCardAuthenticated({ title, date, location, organizer, attendees, image, registered }) {
  return (
    <Card>
      <div className="relative h-40">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        {registered && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-green-500 hover:bg-green-500/90">Registered</Badge>
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>
          {date} • {location}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground">Hosted by {organizer}</p>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex -space-x-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="inline-block h-6 w-6 rounded-full bg-muted ring-2 ring-background" />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">{attendees} attending</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant={registered ? "outline" : "default"} className="w-full">
          {registered ? "View Details" : "Register"}
        </Button>
      </CardFooter>
    </Card>
  )
}
