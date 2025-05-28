import Link from "next/link"
import Image from "next/image"
import { format, isPast, isSameDay } from "date-fns"
import { Calendar, Clock, MapPin, Users, Video } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Event } from "@/contexts/events-context"

interface EventCardProps {
  event: Event
  variant?: "default" | "compact" | "featured"
  className?: string
}

export function EventCard({ event, variant = "default", className }: EventCardProps) {
  const startDate = new Date(event.startDate)
  const endDate = new Date(event.endDate)
  const isPastEvent = isPast(endDate)
  const isOnSameDay = isSameDay(startDate, endDate)

  const formatDate = (date: Date) => {
    return format(date, "MMM d, yyyy")
  }

  const formatTime = (date: Date) => {
    return format(date, "h:mm a")
  }

  const getStatusBadge = () => {
    switch (event.status) {
      case "upcoming":
        return <Badge variant="outline">Upcoming</Badge>
      case "ongoing":
        return <Badge variant="secondary">Happening Now</Badge>
      case "past":
        return (
          <Badge variant="outline" className="text-muted-foreground">
            Past
          </Badge>
        )
      case "canceled":
        return <Badge variant="destructive">Canceled</Badge>
    }
  }

  const getLocationIcon = () => {
    return event.format === "virtual" ? <Video className="h-4 w-4 mr-1" /> : <MapPin className="h-4 w-4 mr-1" />
  }

  const getLocationText = () => {
    if (event.format === "virtual") {
      return "Virtual Event"
    } else if (event.format === "hybrid") {
      return `${event.location.name} & Virtual`
    } else {
      return event.location.name
    }
  }

  if (variant === "compact") {
    return (
      <Card className={cn("h-full overflow-hidden transition-all hover:border-primary", className)}>
        <Link href={`/dashboard/events/${event.id}`} className="block h-full">
          <CardHeader className="p-3">
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-medium text-sm line-clamp-2">{event.title}</h3>
              {getStatusBadge()}
            </div>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="flex items-center text-xs text-muted-foreground mb-1">
              <Calendar className="h-3 w-3 mr-1" />
              <span>
                {formatDate(startDate)} • {formatTime(startDate)}
              </span>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              {getLocationIcon()}
              <span className="truncate">{getLocationText()}</span>
            </div>
          </CardContent>
        </Link>
      </Card>
    )
  }

  if (variant === "featured") {
    return (
      <Card className={cn("overflow-hidden group", className)}>
        <Link href={`/dashboard/events/${event.id}`} className="block h-full">
          <div className="relative h-48">
            {event.image ? (
              <Image
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <Calendar className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
            <div className="absolute top-2 right-2">{getStatusBadge()}</div>
          </div>
          <CardHeader>
            <div className="space-y-1">
              <h3 className="font-semibold text-xl">{event.title}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                <span>
                  {formatDate(startDate)} • {formatTime(startDate)}
                </span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                {getLocationIcon()}
                <span>{getLocationText()}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground line-clamp-2">{event.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex flex-wrap gap-1">
              {event.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {event.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{event.tags.length - 3}
                </Badge>
              )}
            </div>
            {event.maxAttendees && (
              <div className="flex items-center text-xs text-muted-foreground">
                <Users className="h-3 w-3 mr-1" />
                <span>
                  {event.attendees.length}/{event.maxAttendees}
                </span>
              </div>
            )}
          </CardFooter>
        </Link>
      </Card>
    )
  }

  // Default variant
  return (
    <Card className={cn("overflow-hidden h-full", className)}>
      <div className="flex flex-col h-full">
        <div className="relative h-40">
          {event.image ? (
            <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <Calendar className="h-10 w-10 text-muted-foreground" />
            </div>
          )}
          <div className="absolute top-2 right-2">{getStatusBadge()}</div>
        </div>
        <CardHeader>
          <div className="space-y-1">
            <h3 className="font-semibold text-lg line-clamp-2">{event.title}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              <span>
                {formatDate(startDate)}
                {isOnSameDay ? "" : ` - ${formatDate(endDate)}`}
              </span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span>
                {formatTime(startDate)} - {formatTime(endDate)}
              </span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              {getLocationIcon()}
              <span className="truncate">{getLocationText()}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground line-clamp-3">{event.description}</p>
          {event.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {event.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {event.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{event.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-0">
          <Button asChild className="w-full">
            <Link href={`/dashboard/events/${event.id}`}>{isPastEvent ? "View Details" : "View & RSVP"}</Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  )
}
