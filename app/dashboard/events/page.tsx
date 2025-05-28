"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarDays, Filter, Grid3X3, List, Plus, Search } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EventsProvider, useEvents } from "@/contexts/events-context"
import { EventCard } from "@/components/events/event-card"
import { EventCalendarView } from "@/components/events/event-calendar-view"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function EventsContent() {
  const { events, featuredEvents } = useEvents()
  const [view, setView] = useState<"grid" | "list" | "calendar">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    categories: [] as string[],
    formats: [] as string[],
  })

  // Filter events based on search query and filters
  const filteredEvents = events.filter((event) => {
    // Search filter
    if (
      searchQuery &&
      !event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !event.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !event.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false
    }

    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(event.category)) {
      return false
    }

    // Format filter
    if (filters.formats.length > 0 && !filters.formats.includes(event.format)) {
      return false
    }

    return true
  })

  // Toggle category filter
  const toggleCategoryFilter = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }))
  }

  // Toggle format filter
  const toggleFormatFilter = (format: string) => {
    setFilters((prev) => ({
      ...prev,
      formats: prev.formats.includes(format) ? prev.formats.filter((f) => f !== format) : [...prev.formats, format],
    }))
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      categories: [],
      formats: [],
    })
    setSearchQuery("")
  }

  return (
    <>
      <DashboardHeader heading="Events" text="Discover and manage community events">
        <Button asChild>
          <Link href="/dashboard/events/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Link>
        </Button>
      </DashboardHeader>

      <div className="flex flex-col space-y-6">
        {/* Featured Events */}
        {featuredEvents.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Featured Events</h2>
              <Button variant="link" asChild>
                <Link href="/dashboard/events?featured=true">View all</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.slice(0, 3).map((event) => (
                <EventCard key={event.id} event={event} variant="featured" />
              ))}
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                  {(filters.categories.length > 0 || filters.formats.length > 0) && (
                    <Badge variant="secondary" className="ml-1 px-1 py-0 text-xs">
                      {filters.categories.length + filters.formats.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="p-2">
                  <h4 className="mb-2 text-sm font-medium">Categories</h4>
                  <DropdownMenuCheckboxItem
                    checked={filters.categories.includes("workshop")}
                    onCheckedChange={() => toggleCategoryFilter("workshop")}
                  >
                    Workshop
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.categories.includes("webinar")}
                    onCheckedChange={() => toggleCategoryFilter("webinar")}
                  >
                    Webinar
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.categories.includes("networking")}
                    onCheckedChange={() => toggleCategoryFilter("networking")}
                  >
                    Networking
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.categories.includes("cultural")}
                    onCheckedChange={() => toggleCategoryFilter("cultural")}
                  >
                    Cultural
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.categories.includes("funding")}
                    onCheckedChange={() => toggleCategoryFilter("funding")}
                  >
                    Funding
                  </DropdownMenuCheckboxItem>
                </div>
                <div className="p-2 pt-0">
                  <h4 className="mb-2 text-sm font-medium">Format</h4>
                  <DropdownMenuCheckboxItem
                    checked={filters.formats.includes("in-person")}
                    onCheckedChange={() => toggleFormatFilter("in-person")}
                  >
                    In-Person
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.formats.includes("virtual")}
                    onCheckedChange={() => toggleFormatFilter("virtual")}
                  >
                    Virtual
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.formats.includes("hybrid")}
                    onCheckedChange={() => toggleFormatFilter("hybrid")}
                  >
                    Hybrid
                  </DropdownMenuCheckboxItem>
                </div>
                {(filters.categories.length > 0 || filters.formats.length > 0) && (
                  <div className="border-t p-2">
                    <Button variant="ghost" size="sm" className="w-full" onClick={clearFilters}>
                      Clear Filters
                    </Button>
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex border rounded-md overflow-hidden">
              <Button
                variant={view === "grid" ? "default" : "ghost"}
                size="icon"
                className="rounded-none border-0"
                onClick={() => setView("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
                <span className="sr-only">Grid view</span>
              </Button>
              <Button
                variant={view === "list" ? "default" : "ghost"}
                size="icon"
                className="rounded-none border-0"
                onClick={() => setView("list")}
              >
                <List className="h-4 w-4" />
                <span className="sr-only">List view</span>
              </Button>
              <Button
                variant={view === "calendar" ? "default" : "ghost"}
                size="icon"
                className="rounded-none border-0"
                onClick={() => setView("calendar")}
              >
                <CalendarDays className="h-4 w-4" />
                <span className="sr-only">Calendar view</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Applied Filters */}
        {(filters.categories.length > 0 || filters.formats.length > 0) && (
          <div className="flex flex-wrap gap-2">
            {filters.categories.map((category) => (
              <Badge key={category} variant="secondary" className="flex items-center gap-1">
                {category}
                <button
                  onClick={() => toggleCategoryFilter(category)}
                  className="ml-1 rounded-full hover:bg-muted p-0.5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                  <span className="sr-only">Remove {category} filter</span>
                </button>
              </Badge>
            ))}
            {filters.formats.map((format) => (
              <Badge key={format} variant="secondary" className="flex items-center gap-1">
                {format}
                <button onClick={() => toggleFormatFilter(format)} className="ml-1 rounded-full hover:bg-muted p-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                  <span className="sr-only">Remove {format} filter</span>
                </button>
              </Badge>
            ))}
            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-6 px-2 text-xs">
              Clear all
            </Button>
          </div>
        )}

        {/* Events Display */}
        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="all">All Events</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {view === "calendar" ? (
              <EventCalendarView />
            ) : view === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents
                  .filter((event) => event.status === "upcoming" || event.status === "ongoing")
                  .map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEvents
                  .filter((event) => event.status === "upcoming" || event.status === "ongoing")
                  .map((event) => (
                    <EventCard key={event.id} event={event} className="flex flex-col md:flex-row" />
                  ))}
              </div>
            )}

            {filteredEvents.filter((event) => event.status === "upcoming" || event.status === "ongoing").length ===
              0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No upcoming events found</h3>
                <p className="text-muted-foreground mt-1">
                  {searchQuery || filters.categories.length > 0 || filters.formats.length > 0
                    ? "Try adjusting your filters"
                    : "Create a new event to get started"}
                </p>
                <Button className="mt-4" asChild>
                  <Link href="/dashboard/events/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Event
                  </Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {view === "calendar" ? (
              <EventCalendarView />
            ) : view === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents
                  .filter((event) => event.status === "past")
                  .map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEvents
                  .filter((event) => event.status === "past")
                  .map((event) => (
                    <EventCard key={event.id} event={event} className="flex flex-col md:flex-row" />
                  ))}
              </div>
            )}

            {filteredEvents.filter((event) => event.status === "past").length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No past events found</h3>
                <p className="text-muted-foreground mt-1">
                  {searchQuery || filters.categories.length > 0 || filters.formats.length > 0
                    ? "Try adjusting your filters"
                    : "Past events will appear here"}
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            {view === "calendar" ? (
              <EventCalendarView />
            ) : view === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} className="flex flex-col md:flex-row" />
                ))}
              </div>
            )}

            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No events found</h3>
                <p className="text-muted-foreground mt-1">
                  {searchQuery || filters.categories.length > 0 || filters.formats.length > 0
                    ? "Try adjusting your filters"
                    : "Create a new event to get started"}
                </p>
                <Button className="mt-4" asChild>
                  <Link href="/dashboard/events/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Event
                  </Link>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default function EventsPage() {
  return (
    <EventsProvider>
      <DashboardShell>
        <EventsContent />
      </DashboardShell>
    </EventsProvider>
  )
}
