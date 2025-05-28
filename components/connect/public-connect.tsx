import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PublicConnectPage() {
  return (
    <div className="container mx-auto max-w-7xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Connect with the Community</h1>
        <p className="text-xl text-muted-foreground">
          Join discussions, find events, and connect with adaptation practitioners across Canada
        </p>
      </div>

      {/* Featured Discussions (Public Preview) */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Featured Discussions</h2>
          <Button variant="outline" asChild>
            <Link href="/connect/discussions">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <DiscussionCard
            title="Integrating climate projections into municipal planning"
            group="Urban Planners Network"
            replies={24}
            views={142}
            lastActive="2 days ago"
            locked={false}
          />
          <DiscussionCard
            title="Nature-based solutions for coastal erosion"
            group="Coastal Communities Network"
            replies={18}
            views={97}
            lastActive="3 days ago"
            locked={false}
          />
          <DiscussionCard
            title="Funding opportunities for small municipalities"
            group="Municipal Adaptation Forum"
            replies={32}
            views={215}
            lastActive="1 day ago"
            locked={true}
          />
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-dashed flex items-center justify-between">
          <div>
            <h3 className="font-medium">Join the conversation</h3>
            <p className="text-sm text-muted-foreground">Create an account to participate in discussions</p>
          </div>
          <Button asChild>
            <Link href="/register">Register Now</Link>
          </Button>
        </div>
      </section>

      {/* Featured Groups (Public Preview) */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Community Groups</h2>
          <Button variant="outline" asChild>
            <Link href="/connect/groups">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <GroupCard
            name="Urban Planners Network"
            members={124}
            description="Municipal planners sharing climate adaptation strategies for urban areas"
            image="/placeholder.svg?key=o2gxk"
          />
          <GroupCard
            name="Coastal Communities Network"
            members={87}
            description="Practitioners focused on coastal adaptation challenges and solutions"
            image="/placeholder.svg?key=gxqmz"
          />
          <GroupCard
            name="Indigenous Knowledge Sharing"
            members={56}
            description="Integrating traditional ecological knowledge in climate adaptation"
            image="/placeholder.svg?height=100&width=100&query=indigenous knowledge group"
            locked={true}
          />
        </div>
      </section>

      {/* Upcoming Events (Public Preview) */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Upcoming Events</h2>
          <Button variant="outline" asChild>
            <Link href="/connect/events">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <EventCard
            title="Climate-Resilient Infrastructure Workshop"
            date="May 20, 2024"
            location="Virtual"
            organizer="Infrastructure Canada"
            attendees={42}
            image="/placeholder.svg?height=200&width=300&query=climate infrastructure workshop"
          />
          <EventCard
            title="National Adaptation Forum 2024"
            date="June 5-7, 2024"
            location="Toronto, ON"
            organizer="Environment Canada"
            attendees={150}
            image="/placeholder.svg?height=200&width=300&query=climate adaptation conference"
          />
          <EventCard
            title="Urban Heat Island Mitigation Strategies"
            date="June 15, 2024"
            location="Virtual"
            organizer="Canadian Urban Institute"
            attendees={68}
            image="/placeholder.svg?height=200&width=300&query=urban heat island mitigation"
            locked={true}
          />
        </div>
      </section>

      {/* Registration CTA */}
      <section className="bg-primary text-primary-foreground p-8 rounded-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Ready to connect with the community?</h2>
            <p className="text-lg opacity-90">
              Join CanAdapt to participate in discussions, join groups, and attend events.
            </p>
          </div>
          <Button size="lg" variant="secondary" className="md:self-center" asChild>
            <Link href="/register">
              Create Free Account <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

function DiscussionCard({ title, group, replies, views, lastActive, locked = false }) {
  return (
    <Card className={locked ? "border-dashed opacity-90" : ""}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{group}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>{replies}</span>
          </div>
          <div>
            <span>{views} views</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-xs text-muted-foreground">Last active: {lastActive}</span>
        {locked && <Badge variant="outline">Login Required</Badge>}
      </CardFooter>
    </Card>
  )
}

function GroupCard({ name, members, description, image, locked = false }) {
  return (
    <Card className={locked ? "border-dashed opacity-90" : ""}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 rounded-full overflow-hidden">
            <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
          </div>
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription>{members} members</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" disabled={locked}>
          {locked ? "Login to View" : "View Group"}
        </Button>
      </CardFooter>
    </Card>
  )
}

function EventCard({ title, date, location, organizer, attendees, image, locked = false }) {
  return (
    <Card className={locked ? "border-dashed opacity-90" : ""}>
      <div className="relative h-40">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        {locked && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <Badge variant="outline" className="text-sm">
              Login Required
            </Badge>
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
        <Button variant="outline" className="w-full" disabled={locked}>
          {locked ? "Login to Register" : "View Event"}
        </Button>
      </CardFooter>
    </Card>
  )
}
