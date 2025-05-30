"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type EventType = "workshop" | "meetup" | "presentation" | "showcase" | "fundraiser" | "community"

export interface EventAttendee {
  id: string
  name: string
  avatar?: string
  role?: string
}

export interface EventFeedback {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  comment: string
  rating?: number
  createdAt: Date
}

export interface EventFunding {
  totalFunded: number
  fundingGoal?: number
  fundingSource: string
  fundingCategory: string
}

export interface EventImpact {
  communityBenefit: string
  peopleReached: number
  outcomes: string[]
  testimonials?: EventFeedback[]
}

export interface Event {
  id: string
  title: string
  description: string
  type: EventType
  date: Date
  location: string
  image?: string
  organizer: {
    id: string
    name: string
    avatar?: string
  }
  attendees: EventAttendee[]
  isVirtual: boolean
  virtualLink?: string
  tags: string[]
  isInitiative: boolean
  funding?: EventFunding
  impact?: EventImpact
  progress?: number
  milestones?: {
    title: string
    completed: boolean
    date?: Date
  }[]
  gallery?: string[]
}

interface EventsContextType {
  events: Event[]
  addEvent: (event: Omit<Event, "id">) => void
  updateEvent: (id: string, event: Partial<Event>) => void
  deleteEvent: (id: string) => void
  getEvent: (id: string) => Event | undefined
  addAttendee: (eventId: string, attendee: Omit<EventAttendee, "id">) => void
  removeAttendee: (eventId: string, attendeeId: string) => void
  addFeedback: (eventId: string, feedback: Omit<EventFeedback, "id" | "createdAt">) => void
  getUpcomingEvents: () => Event[]
  getInitiatives: () => Event[]
  loading: boolean
}

const EventsContext = createContext<EventsContextType | undefined>(undefined)

export const useEvents = () => {
  const context = useContext(EventsContext)
  if (!context) {
    throw new Error("useEvents must be used within an EventsProvider")
  }
  return context
}

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching events from an API
    const fetchEvents = async () => {
      try {
        // In a real app, this would be an API call
        const mockEvents: Event[] = [
          {
            id: "1",
            title: "Community Garden Initiative",
            description:
              "A youth-led project to create a sustainable community garden that provides fresh produce for local food banks.",
            type: "showcase",
            date: new Date(2025, 5, 15, 14, 0),
            location: "Community Center",
            image: "/community-garden.png",
            organizer: {
              id: "user1",
              name: "Jordan Smith",
              avatar: "/placeholder-ukgjx.png",
            },
            attendees: [
              { id: "att1", name: "Alex Johnson" },
              { id: "att2", name: "Taylor Williams" },
            ],
            isVirtual: false,
            tags: ["sustainability", "agriculture", "community service"],
            isInitiative: true,
            funding: {
              totalFunded: 2500,
              fundingGoal: 3000,
              fundingSource: "Small Economy Works Grant",
              fundingCategory: "Environmental",
            },
            impact: {
              communityBenefit: "Provides fresh produce to local food banks and teaches sustainable farming practices",
              peopleReached: 150,
              outcomes: [
                "Produced 500lbs of vegetables in first season",
                "Engaged 25 youth volunteers",
                "Donated to 3 local food banks",
              ],
              testimonials: [
                {
                  id: "test1",
                  userId: "user5",
                  userName: "Community Food Bank",
                  comment: "The fresh produce has been a wonderful addition to our offerings.",
                  rating: 5,
                  createdAt: new Date(2025, 4, 20),
                },
              ],
            },
            progress: 75,
            milestones: [
              { title: "Land secured", completed: true, date: new Date(2025, 2, 10) },
              { title: "Garden beds built", completed: true, date: new Date(2025, 3, 15) },
              { title: "First harvest", completed: true, date: new Date(2025, 4, 30) },
              { title: "Winter preparation", completed: false },
            ],
            gallery: ["/placeholder-zmmhy.png", "/placeholder-pqb8p.png", "/placeholder-bfhj3.png"],
          },
          {
            id: "2",
            title: "Youth Tech Workshop Series",
            description:
              "A series of workshops teaching coding and digital skills to underserved youth in our community.",
            type: "workshop",
            date: new Date(2025, 6, 5, 10, 0),
            location: "Digital Learning Center",
            image: "/youth-workshop.png",
            organizer: {
              id: "user2",
              name: "Sam Rivera",
              avatar: "/placeholder-o4loo.png",
            },
            attendees: [
              { id: "att3", name: "Casey Lee" },
              { id: "att4", name: "Morgan Chen" },
            ],
            isVirtual: true,
            virtualLink: "https://meet.example.com/tech-workshop",
            tags: ["education", "technology", "digital literacy"],
            isInitiative: true,
            funding: {
              totalFunded: 5000,
              fundingGoal: 5000,
              fundingSource: "Small Economy Works Grant",
              fundingCategory: "Education",
            },
            impact: {
              communityBenefit: "Increases digital literacy and career opportunities for underserved youth",
              peopleReached: 75,
              outcomes: [
                "Trained 75 youth in basic coding",
                "Helped 12 participants secure tech internships",
                "Created 15 community websites for local businesses",
              ],
            },
            progress: 100,
            milestones: [
              { title: "Curriculum development", completed: true, date: new Date(2025, 3, 20) },
              { title: "Equipment purchased", completed: true, date: new Date(2025, 4, 5) },
              { title: "First workshop", completed: true, date: new Date(2025, 5, 1) },
              { title: "Final showcase", completed: true, date: new Date(2025, 6, 1) },
            ],
          },
          {
            id: "3",
            title: "Indigenous Art Market",
            description:
              "A marketplace for young Indigenous artists to showcase and sell their artwork to the community.",
            type: "showcase",
            date: new Date(2025, 7, 12, 11, 0),
            location: "Cultural Center Plaza",
            image: "/abstract-ec.png",
            organizer: {
              id: "user3",
              name: "River Johnson",
              avatar: "/placeholder-vj1kw.png",
            },
            attendees: [
              { id: "att5", name: "Sky Williams" },
              { id: "att6", name: "Dawn Martinez" },
            ],
            isVirtual: false,
            tags: ["art", "indigenous", "entrepreneurship"],
            isInitiative: true,
            funding: {
              totalFunded: 3500,
              fundingGoal: 4000,
              fundingSource: "Small Economy Works Grant",
              fundingCategory: "Cultural",
            },
            impact: {
              communityBenefit:
                "Preserves cultural traditions and provides economic opportunities for Indigenous youth",
              peopleReached: 300,
              outcomes: [
                "Showcased work from 25 Indigenous artists",
                "Generated $7,500 in art sales",
                "Created ongoing mentorship program with 5 established artists",
              ],
            },
            progress: 85,
            milestones: [
              { title: "Artist recruitment", completed: true, date: new Date(2025, 5, 15) },
              { title: "Venue secured", completed: true, date: new Date(2025, 6, 1) },
              { title: "Marketing campaign", completed: true, date: new Date(2025, 6, 20) },
              { title: "Event day", completed: false, date: new Date(2025, 7, 12) },
            ],
            gallery: ["/placeholder-q00l8.png", "/placeholder-hzvjo.png", "/placeholder-vy2eb.png"],
          },
          {
            id: "4",
            title: "Monthly Community Meeting",
            description: "Regular meeting to discuss community initiatives and updates.",
            type: "meetup",
            date: new Date(2025, 5, 28, 18, 0),
            location: "Community Hall",
            organizer: {
              id: "admin1",
              name: "Admin",
            },
            attendees: [],
            isVirtual: false,
            tags: ["community", "planning"],
            isInitiative: false,
          },
        ]

        setEvents(mockEvents)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching events:", error)
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const addEvent = (event: Omit<Event, "id">) => {
    const newEvent = {
      ...event,
      id: `event-${Date.now()}`,
    }
    setEvents((prevEvents) => [...prevEvents, newEvent])
  }

  const updateEvent = (id: string, eventUpdate: Partial<Event>) => {
    setEvents((prevEvents) => prevEvents.map((event) => (event.id === id ? { ...event, ...eventUpdate } : event)))
  }

  const deleteEvent = (id: string) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id))
  }

  const getEvent = (id: string) => {
    return events.find((event) => event.id === id)
  }

  const addAttendee = (eventId: string, attendee: Omit<EventAttendee, "id">) => {
    const newAttendee = {
      ...attendee,
      id: `attendee-${Date.now()}`,
    }
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId ? { ...event, attendees: [...event.attendees, newAttendee] } : event,
      ),
    )
  }

  const removeAttendee = (eventId: string, attendeeId: string) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId
          ? {
              ...event,
              attendees: event.attendees.filter((a) => a.id !== attendeeId),
            }
          : event,
      ),
    )
  }

  const addFeedback = (eventId: string, feedback: Omit<EventFeedback, "id" | "createdAt">) => {
    const newFeedback = {
      ...feedback,
      id: `feedback-${Date.now()}`,
      createdAt: new Date(),
    }

    setEvents((prevEvents) =>
      prevEvents.map((event) => {
        if (event.id === eventId) {
          const updatedImpact = event.impact
            ? {
                ...event.impact,
                testimonials: [...(event.impact.testimonials || []), newFeedback],
              }
            : {
                communityBenefit: "",
                peopleReached: 0,
                outcomes: [],
                testimonials: [newFeedback],
              }

          return { ...event, impact: updatedImpact }
        }
        return event
      }),
    )
  }

  const getUpcomingEvents = () => {
    const now = new Date()
    return events
      .filter((event) => new Date(event.date) > now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }

  const getInitiatives = () => {
    return events
      .filter((event) => event.isInitiative)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }

  return (
    <EventsContext.Provider
      value={{
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        getEvent,
        addAttendee,
        removeAttendee,
        addFeedback,
        getUpcomingEvents,
        getInitiatives,
        loading,
      }}
    >
      {children}
    </EventsContext.Provider>
  )
}
