"use client"

import { useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, Users } from "lucide-react"

export function UpcomingEvents() {
  // Use a stable array of events that doesn't change on re-renders
  const events = [
    {
      id: "1",
      title: "Climate Finance Symposium",
      date: "May 15, 2025",
      time: "9:00 AM - 4:00 PM",
      location: "Virtual",
      image: "/climate-finance-symposium.png",
      attendees: 120,
    },
    {
      id: "2",
      title: "Indigenous Knowledge Panel",
      date: "May 22, 2025",
      time: "1:00 PM - 3:00 PM",
      location: "Community Center",
      image: "/indigenous-knowledge-panel.png",
      attendees: 45,
    },
    {
      id: "3",
      title: "Urban Resilience Workshop",
      date: "June 5, 2025",
      time: "10:00 AM - 3:00 PM",
      location: "City Hall",
      image: "/urban-resilience-workshop.png",
      attendees: 75,
    },
  ]

  // Memoize the view all handler to prevent recreation on each render
  const handleViewAll = useCallback(() => {
    // Navigate to events page
    window.location.href = "/events"
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
        <CardDescription>Connect with the adaptation community</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.map((event) => (
          <Link href={`/events/${event.id}`} key={event.id} className="block">
            <div className="flex items-start space-x-4 hover:bg-muted p-2 rounded-md transition-colors">
              <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="text-sm font-medium">{event.title}</h4>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{event.location}</span>
                </div>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Users className="h-3 w-3 mr-1" />
                <span>{event.attendees}</span>
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/events">View All Events</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
