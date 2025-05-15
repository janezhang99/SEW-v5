"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { format, parseISO } from "date-fns"
import {
  ArrowLeft,
  Calendar,
  Check,
  Clock,
  Edit,
  ExternalLink,
  Globe,
  MapPin,
  Share,
  Trash2,
  Users,
  Video,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EventsProvider, useEvents } from "@/contexts/events-context"
import { EventCard } from "@/components/events/event-card"

function EventDetailContent() {
  const params = useParams<{ eventId: string }>()
  const router = useRouter()
  const { events, getEventById, rsvpToEvent, deleteEvent } = useEvents()
  const [isRsvpDialogOpen, setIsRsvpDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [rsvpStatus, setRsvpStatus] = useState<"going" | "maybe" | "not-going">("going")

  const event = getEventById(params.eventId)

  if (!event) {
    return (
      <>
        <DashboardHeader heading="Event Not Found" text="The event you're looking for doesn't exist">
          <Button variant="outline" asChild>
            <Link href="/dashboard/events">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Link>
          </Button>
        </DashboardHeader>
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-2xl font-bold">Event Not Found</h2>
          <p className="text-muted-foreground mt-2">The event you're looking for doesn't exist or has been removed.</p>
          <Button asChild className="mt-6">
            <Link href="/dashboard/events">View All Events</Link>
          </Button>
        </div>
      </>
    )
  }

  const startDate = parseISO(event.startDate)
  const endDate = parseISO(event.endDate)

  const formatDate = (date: Date) => {
    return format(date, "EEEE, MMMM d, yyyy")
  }

  const formatTime = (date: Date) => {
    return format(date, "h:mm a")
  }

  const handleRsvp = () => {
    rsvpToEvent(event.id, {
      id: "current-user", // In a real app, this would be the current user's ID
      name: "Current User", // In a real app, this would be the current user's name
      rsvpStatus,
    })
    setIsRsvpDialogOpen(false)
  }

  const handleDelete = () => {
    deleteEvent(event.id)
    router.push("/dashboard/events")
  }

  // Get similar events (same category, excluding current event)
  const similarEvents = events.filter((e) => e.id !== event.id && e.category === event.category).slice(0, 3)

  return (
    <>
      <DashboardHeader heading={event.title} text={`${formatDate(startDate)} at ${formatTime(startDate)}`}>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/events">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(window.location.href)}>
                Copy Link
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Share on Facebook</DropdownMenuItem>
              <DropdownMenuItem>Share on Twitter</DropdownMenuItem>
              <DropdownMenuItem>Share via Email</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <span className="sr-only">Actions</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/events/${event.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Event
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Event
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </DashboardHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Event Image */}
          <div className="relative aspect-video rounded-lg overflow-hidden border">
            {event.image ? (
              <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <Calendar className="h-16 w-16 text-muted-foreground" />
              </div>
            )}
            <div className="absolute top-2 right-2">
              <Badge
                variant={
                  event.status === "upcoming"
                    ? "outline"
                    : event.status === "ongoing"
                      ? "secondary"
                      : event.status === "canceled"
                        ? "destructive"
                        : "outline"
                }
                className="text-sm"
              >
                {event.status === "upcoming"
                  ? "Upcoming"
                  : event.status === "ongoing"
                    ? "Happening Now"
                    : event.status === "canceled"
                      ? "Canceled"
                      : "Past"}
              </Badge>
            </div>
          </div>

          {/* Event Details */}
          <Tabs defaultValue="details" className="space-y-4">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="attendees">Attendees</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6">
              <div className="prose max-w-none">
                <p>{event.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Date & Time</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{formatDate(startDate)}</p>
                        {formatDate(startDate) !== formatDate(endDate) && (
                          <p className="font-medium">to {formatDate(endDate)}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                      <div>
                        <p>
                          {formatTime(startDate)} - {formatTime(endDate)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Location</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {(event.format === "in-person" || event.format === "hybrid") && (
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{event.location.name}</p>
                          {event.location.address && <p>{event.location.address}</p>}
                          {(event.location.city || event.location.region) && (
                            <p>
                              {event.location.city}
                              {event.location.city && event.location.region && ", "}
                              {event.location.region} {event.location.postalCode}
                            </p>
                          )}
                          {event.location.country && <p>{event.location.country}</p>}
                        </div>
                      </div>
                    )}

                    {(event.format === "virtual" || event.format === "hybrid") && (
                      <div className="flex items-start">
                        <Video className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Virtual Event</p>
                          {event.location.virtualLink && (
                            <a
                              href={event.location.virtualLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary flex items-center hover:underline"
                            >
                              Join Meeting <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          )}
                          {event.location.joinInfo && <p className="mt-1">{event.location.joinInfo}</p>}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {event.tags.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-lg font-medium mb-2">Organizers</h3>
                <div className="space-y-3">
                  {event.organizers.map((organizer) => (
                    <div key={organizer.id} className="flex items-center p-3 rounded-md border">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mr-3">
                        <Users className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{organizer.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {organizer.role}
                          {organizer.organization && ` · ${organizer.organization}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="attendees">
              <Card>
                <CardHeader>
                  <CardTitle>Attendees</CardTitle>
                  <CardDescription>
                    {event.maxAttendees
                      ? `${event.attendees.length} of ${event.maxAttendees} spots filled`
                      : `${event.attendees.length} people attending`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {event.attendees.length > 0 ? (
                    <div className="space-y-3">
                      {event.attendees.map((attendee) => (
                        <div key={attendee.id} className="flex items-center p-3 rounded-md border">
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mr-3">
                            <Users className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div className="flex-grow">
                            <p className="font-medium">{attendee.name}</p>
                            <p className="text-sm text-muted-foreground">
                              RSVP'd {format(parseISO(attendee.rsvpDate), "MMM d, yyyy")}
                            </p>
                          </div>
                          <Badge
                            variant={
                              attendee.rsvpStatus === "going"
                                ? "default"
                                : attendee.rsvpStatus === "maybe"
                                  ? "outline"
                                  : "secondary"
                            }
                          >
                            {attendee.rsvpStatus === "going"
                              ? "Going"
                              : attendee.rsvpStatus === "maybe"
                                ? "Maybe"
                                : "Not Going"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Users className="h-12 w-12 mx-auto text-muted-foreground" />
                      <h3 className="mt-2 text-lg font-medium">No attendees yet</h3>
                      <p className="text-muted-foreground mt-1">Be the first to RSVP to this event</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources">
              <Card>
                <CardHeader>
                  <CardTitle>Resources</CardTitle>
                  <CardDescription>Additional materials for this event</CardDescription>
                </CardHeader>
                <CardContent>
                  {event.resources.length > 0 ? (
                    <div className="space-y-3">
                      {event.resources.map((resource) => (
                        <div key={resource.id} className="flex items-center p-3 rounded-md border">
                          <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center mr-3">
                            {resource.type === "link" ? (
                              <Globe className="h-5 w-5 text-muted-foreground" />
                            ) : resource.type === "document" ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-muted-foreground"
                              >
                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                <polyline points="14 2 14 8 20 8" />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-muted-foreground"
                              >
                                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                                <circle cx="9" cy="9" r="2" />
                                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                              </svg>
                            )}
                          </div>
                          <div className="flex-grow">
                            <p className="font-medium">{resource.title}</p>
                            {resource.description && (
                              <p className="text-sm text-muted-foreground">{resource.description}</p>
                            )}
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href={resource.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Open
                            </a>
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mx-auto text-muted-foreground"
                      >
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" x2="8" y1="13" y2="13" />
                        <line x1="16" x2="8" y1="17" y2="17" />
                        <line x1="10" x2="8" y1="9" y2="9" />
                      </svg>
                      <h3 className="mt-2 text-lg font-medium">No resources available</h3>
                      <p className="text-muted-foreground mt-1">Resources will appear here when added</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          {/* RSVP Card */}
          <Card>
            <CardHeader>
              <CardTitle>RSVP to this event</CardTitle>
              <CardDescription>
                {event.maxAttendees
                  ? `${event.attendees.length} of ${event.maxAttendees} spots filled`
                  : `${event.attendees.length} people attending`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {event.status === "upcoming" ? (
                <Button className="w-full" onClick={() => setIsRsvpDialogOpen(true)}>
                  RSVP Now
                </Button>
              ) : event.status === "ongoing" ? (
                <Button className="w-full">Join Now</Button>
              ) : (
                <Button className="w-full" disabled>
                  Event Ended
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Event Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Event Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Category</p>
                <Badge variant="outline" className="mt-1">
                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium">Format</p>
                <Badge variant="outline" className="mt-1">
                  {event.format === "in-person" ? "In-Person" : event.format === "virtual" ? "Virtual" : "Hybrid"}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium">Visibility</p>
                <Badge variant="outline" className="mt-1">
                  {event.visibility === "public"
                    ? "Public"
                    : event.visibility === "community"
                      ? "Community"
                      : "Private"}
                </Badge>
              </div>
              {event.maxAttendees && (
                <div>
                  <p className="text-sm font-medium">Capacity</p>
                  <p className="mt-1">
                    {event.attendees.length}/{event.maxAttendees} spots filled
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Similar Events */}
          {similarEvents.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Similar Events</h3>
              <div className="space-y-3">
                {similarEvents.map((similarEvent) => (
                  <EventCard key={similarEvent.id} event={similarEvent} variant="compact" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RSVP Dialog */}
      <Dialog open={isRsvpDialogOpen} onOpenChange={setIsRsvpDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>RSVP to {event.title}</DialogTitle>
            <DialogDescription>Let the organizers know if you plan to attend this event.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div
              className={`flex items-center p-3 rounded-md border cursor-pointer ${
                rsvpStatus === "going" ? "border-primary bg-primary/5" : ""
              }`}
              onClick={() => setRsvpStatus("going")}
            >
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mr-3">
                {rsvpStatus === "going" ? (
                  <Check className="h-5 w-5 text-primary" />
                ) : (
                  <Check className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div className="flex-grow">
                <p className="font-medium">Yes, I'll be there</p>
                <p className="text-sm text-muted-foreground">I plan to attend this event</p>
              </div>
            </div>
            <div
              className={`flex items-center p-3 rounded-md border cursor-pointer ${
                rsvpStatus === "maybe" ? "border-primary bg-primary/5" : ""
              }`}
              onClick={() => setRsvpStatus("maybe")}
            >
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mr-3">
                {rsvpStatus === "maybe" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                    <path d="M8.5 8.5v.01" />
                    <path d="M16 15.5v.01" />
                    <path d="M12 12v.01" />
                    <path d="M11 17v.01" />
                    <path d="M7 14v.01" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted-foreground"
                  >
                    <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                    <path d="M8.5 8.5v.01" />
                    <path d="M16 15.5v.01" />
                    <path d="M12 12v.01" />
                    <path d="M11 17v.01" />
                    <path d="M7 14v.01" />
                  </svg>
                )}
              </div>
              <div className="flex-grow">
                <p className="font-medium">Maybe</p>
                <p className="text-sm text-muted-foreground">I might attend this event</p>
              </div>
            </div>
            <div
              className={`flex items-center p-3 rounded-md border cursor-pointer ${
                rsvpStatus === "not-going" ? "border-primary bg-primary/5" : ""
              }`}
              onClick={() => setRsvpStatus("not-going")}
            >
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mr-3">
                {rsvpStatus === "not-going" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="m18 6-12 12" />
                    <path d="m6 6 12 12" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted-foreground"
                  >
                    <path d="m18 6-12 12" />
                    <path d="m6 6 12 12" />
                  </svg>
                )}
              </div>
              <div className="flex-grow">
                <p className="font-medium">No, I can't make it</p>
                <p className="text-sm text-muted-foreground">I won't be attending this event</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRsvpDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRsvp}>Confirm RSVP</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this event? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default function EventDetailPage() {
  return (
    <EventsProvider>
      <DashboardShell>
        <EventDetailContent />
      </DashboardShell>
    </EventsProvider>
  )
}
