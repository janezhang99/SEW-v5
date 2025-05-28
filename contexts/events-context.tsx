"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { useToast } from "@/components/ui/use-toast"

// Event types
export type EventCategory =
  | "workshop"
  | "webinar"
  | "networking"
  | "community"
  | "funding"
  | "cultural"
  | "training"
  | "celebration"
  | "other"

export type EventFormat = "in-person" | "virtual" | "hybrid"

export type EventVisibility = "public" | "community" | "private"

export type EventStatus = "upcoming" | "ongoing" | "past" | "canceled"

export interface EventOrganizer {
  id: string
  name: string
  role?: string
  organization?: string
}

export interface EventAttendee {
  id: string
  name: string
  rsvpStatus: "going" | "maybe" | "not-going"
  rsvpDate: string
}

export interface EventResource {
  id: string
  title: string
  type: "link" | "document" | "image" | "video" | "other"
  url: string
  description?: string
}

export interface EventLocation {
  name: string
  address?: string
  city?: string
  region?: string
  country?: string
  postalCode?: string
  virtualLink?: string
  joinInfo?: string
}

export interface Event {
  id: string
  title: string
  description: string
  category: EventCategory
  format: EventFormat
  visibility: EventVisibility
  startDate: string
  endDate: string
  location: EventLocation
  image?: string
  maxAttendees?: number
  tags: string[]
  isFeatured: boolean
  status: EventStatus
  organizers: EventOrganizer[]
  attendees: EventAttendee[]
  resources: EventResource[]
  createdAt: string
  updatedAt: string
}

// Context type
type EventsContextType = {
  events: Event[]
  featuredEvents: Event[]
  upcomingEvents: Event[]
  pastEvents: Event[]
  userEvents: Event[]
  isLoading: boolean
  error: string | null
  addEvent: (event: Omit<Event, "id" | "status" | "createdAt" | "updatedAt">) => void
  updateEvent: (id: string, event: Partial<Event>) => void
  deleteEvent: (id: string) => void
  getEventById: (id: string) => Event | undefined
  rsvpToEvent: (eventId: string, attendee: Omit<EventAttendee, "rsvpDate">) => void
  filterEventsByCategory: (category: EventCategory) => Event[]
  filterEventsByDate: (startDate: Date, endDate?: Date) => Event[]
  searchEvents: (query: string) => Event[]
  addEventResource: (eventId: string, resource: Omit<EventResource, "id">) => void
  removeEventResource: (eventId: string, resourceId: string) => void
}

const EventsContext = createContext<EventsContextType | undefined>(undefined)

// Sample events data
const sampleEvents: Event[] = [
  {
    id: "1",
    title: "Community Garden Workshop",
    description: "Learn how to start and maintain a community garden in your neighborhood.",
    category: "workshop",
    format: "in-person",
    visibility: "public",
    startDate: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    endDate: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(), // 2 hours later
    location: {
      name: "Community Center",
      address: "123 Main Street",
      city: "Whitehorse",
      region: "Yukon",
      country: "Canada",
      postalCode: "Y1A 1A1",
    },
    image: "/community-garden.png",
    tags: ["gardening", "community", "sustainability"],
    isFeatured: true,
    status: "upcoming",
    organizers: [
      {
        id: "org1",
        name: "Sarah Johnson",
        role: "Community Coordinator",
        organization: "Small Economy Works",
      },
    ],
    attendees: [],
    resources: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Grant Writing Webinar",
    description: "Learn effective strategies for writing successful grant applications.",
    category: "webinar",
    format: "virtual",
    visibility: "community",
    startDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    endDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000 + 1.5 * 60 * 60 * 1000).toISOString(), // 1.5 hours later
    location: {
      name: "Zoom Webinar",
      virtualLink: "https://zoom.us/j/123456789",
      joinInfo: "Meeting ID: 123 456 789, Passcode: grant2023",
    },
    tags: ["funding", "grants", "writing"],
    isFeatured: false,
    status: "upcoming",
    organizers: [
      {
        id: "org2",
        name: "Michael Chen",
        role: "Funding Specialist",
        organization: "Small Economy Works",
      },
    ],
    attendees: [],
    resources: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Cultural Celebration Day",
    description: "Join us for a day of celebrating diverse cultural traditions in our community.",
    category: "cultural",
    format: "in-person",
    visibility: "public",
    startDate: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
    endDate: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000).toISOString(), // 8 hours later
    location: {
      name: "Community Park",
      address: "456 Park Avenue",
      city: "Whitehorse",
      region: "Yukon",
      country: "Canada",
      postalCode: "Y1A 2B2",
    },
    image: "/placeholder-yduhz.png",
    maxAttendees: 200,
    tags: ["culture", "celebration", "community", "diversity"],
    isFeatured: true,
    status: "upcoming",
    organizers: [
      {
        id: "org3",
        name: "Anika Patel",
        role: "Event Coordinator",
        organization: "Small Economy Works",
      },
      {
        id: "org4",
        name: "David Wilson",
        role: "Community Liaison",
        organization: "Cultural Association",
      },
    ],
    attendees: [],
    resources: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Provider component
export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>(sampleEvents)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Derived state
  const featuredEvents = events.filter((event) => event.isFeatured)
  const upcomingEvents = events.filter((event) => event.status === "upcoming")
  const pastEvents = events.filter((event) => event.status === "past")

  // Update event statuses based on dates
  useEffect(() => {
    const now = new Date().toISOString()

    const updatedEvents = events.map((event) => {
      if (event.status === "canceled") {
        return event
      }

      if (event.startDate > now && event.endDate > now) {
        return { ...event, status: "upcoming" }
      } else if (event.startDate <= now && event.endDate > now) {
        return { ...event, status: "ongoing" }
      } else {
        return { ...event, status: "past" }
      }
    })

    if (JSON.stringify(updatedEvents) !== JSON.stringify(events)) {
      setEvents(updatedEvents)
    }
  }, [events])

  // Get event by ID
  const getEventById = (id: string) => {
    return events.find((event) => event.id === id)
  }

  // Add new event
  const addEvent = (event: Omit<Event, "id" | "status" | "createdAt" | "updatedAt">) => {
    const now = new Date().toISOString()
    const status = event.startDate > now ? "upcoming" : event.endDate > now ? "ongoing" : "past"

    const newEvent: Event = {
      ...event,
      id: uuidv4(),
      status,
      createdAt: now,
      updatedAt: now,
    }

    setEvents((prevEvents) => [...prevEvents, newEvent])
  }

  // Update event
  const updateEvent = (id: string, updatedFields: Partial<Event>) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id ? { ...event, ...updatedFields, updatedAt: new Date().toISOString() } : event,
      ),
    )
  }

  // Delete event
  const deleteEvent = (id: string) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id))
  }

  // RSVP to event
  const rsvpToEvent = (eventId: string, attendee: Omit<EventAttendee, "rsvpDate">) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) => {
        if (event.id !== eventId) return event

        // Check if attendee already exists
        const existingAttendeeIndex = event.attendees.findIndex((a) => a.id === attendee.id)

        const updatedAttendees = [...event.attendees]

        if (existingAttendeeIndex >= 0) {
          // Update existing attendee
          updatedAttendees[existingAttendeeIndex] = {
            ...updatedAttendees[existingAttendeeIndex],
            ...attendee,
            rsvpDate: new Date().toISOString(),
          }
        } else {
          // Add new attendee
          updatedAttendees.push({
            ...attendee,
            rsvpDate: new Date().toISOString(),
          })
        }

        return {
          ...event,
          attendees: updatedAttendees,
          updatedAt: new Date().toISOString(),
        }
      }),
    )
  }

  // Add event resource
  const addEventResource = (eventId: string, resource: Omit<EventResource, "id">) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) => {
        if (event.id !== eventId) return event

        return {
          ...event,
          resources: [
            ...event.resources,
            {
              ...resource,
              id: uuidv4(),
            },
          ],
          updatedAt: new Date().toISOString(),
        }
      }),
    )
  }

  // Remove event resource
  const removeEventResource = (eventId: string, resourceId: string) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) => {
        if (event.id !== eventId) return event

        return {
          ...event,
          resources: event.resources.filter((resource) => resource.id !== resourceId),
          updatedAt: new Date().toISOString(),
        }
      }),
    )
  }

  const filterEventsByCategory = (category: EventCategory) => {
    return events.filter((event) => event.category === category)
  }

  const filterEventsByDate = (startDate: Date, endDate?: Date) => {
    return events.filter((event) => {
      const eventStart = new Date(event.startDate)
      if (endDate) {
        const eventEnd = new Date(event.endDate)
        return eventStart >= startDate && eventEnd <= endDate
      }
      return eventStart.toDateString() === startDate.toDateString()
    })
  }

  const searchEvents = (query: string) => {
    const lowercaseQuery = query.toLowerCase()
    return events.filter(
      (event) =>
        event.title.toLowerCase().includes(lowercaseQuery) ||
        event.description.toLowerCase().includes(lowercaseQuery) ||
        event.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
    )
  }

  return (
    <EventsContext.Provider
      value={{
        events,
        featuredEvents,
        upcomingEvents,
        pastEvents,
        userEvents: [],
        isLoading: false,
        error: null,
        addEvent,
        updateEvent,
        deleteEvent,
        getEventById,
        rsvpToEvent,
        filterEventsByCategory,
        filterEventsByDate,
        searchEvents,
        addEventResource,
        removeEventResource,
      }}
    >
      {children}
    </EventsContext.Provider>
  )
}

// Custom hook to use the events context
export const useEvents = () => {
  const context = useContext(EventsContext)

  if (context === undefined) {
    throw new Error("useEvents must be used within an EventsProvider")
  }

  return context
}
