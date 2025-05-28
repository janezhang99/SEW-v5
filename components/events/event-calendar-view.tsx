"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { format, isSameDay, isWithinInterval, parseISO } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useEvents, type Event } from "@/contexts/events-context"
import { EventCard } from "@/components/events/event-card"

interface CalendarDayProps {
  date: Date
  events: Event[]
  disabled?: boolean
  selected?: boolean
  today?: boolean
}

function CalendarDay({ date, events, disabled, selected, today }: CalendarDayProps) {
  const eventsOnDay = events.filter((event) => {
    const startDate = parseISO(event.startDate)
    const endDate = parseISO(event.endDate)

    return (
      isSameDay(date, startDate) ||
      isSameDay(date, endDate) ||
      isWithinInterval(date, { start: startDate, end: endDate })
    )
  })

  return (
    <div
      className={cn(
        "h-full w-full p-2 flex flex-col relative",
        disabled && "text-muted-foreground opacity-50",
        selected && "bg-muted/50 rounded-md",
        today && "border-primary",
      )}
    >
      <span className={cn("text-center", today && "font-bold text-primary")}>{format(date, "d")}</span>

      {eventsOnDay.length > 0 && (
        <div className="mt-1 space-y-1">
          {eventsOnDay.slice(0, 2).map((event) => (
            <div
              key={event.id}
              className={cn(
                "text-xs px-1 py-0.5 rounded truncate",
                event.status === "ongoing" && "bg-secondary text-secondary-foreground",
                event.status === "upcoming" && "bg-primary/10 text-primary",
                event.status === "past" && "bg-muted text-muted-foreground",
                event.status === "canceled" && "bg-destructive/10 text-destructive line-through",
              )}
            >
              {event.title}
            </div>
          ))}

          {eventsOnDay.length > 2 && (
            <div className="text-xs text-center text-muted-foreground">+{eventsOnDay.length - 2} more</div>
          )}
        </div>
      )}
    </div>
  )
}

export function EventCalendarView() {
  const { events } = useEvents()
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date())
  const [month, setMonth] = React.useState<Date>(new Date())

  const eventsOnSelectedDate = React.useMemo(() => {
    if (!selectedDate) return []

    return events.filter((event) => {
      const startDate = parseISO(event.startDate)
      const endDate = parseISO(event.endDate)

      return (
        isSameDay(selectedDate, startDate) ||
        isSameDay(selectedDate, endDate) ||
        isWithinInterval(selectedDate, { start: startDate, end: endDate })
      )
    })
  }, [events, selectedDate])

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
      <div className="md:col-span-5">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{format(month, "MMMM yyyy")}</h2>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  const newMonth = new Date(month)
                  newMonth.setMonth(newMonth.getMonth() - 1)
                  setMonth(newMonth)
                }}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous month</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  const newMonth = new Date(month)
                  newMonth.setMonth(newMonth.getMonth() + 1)
                  setMonth(newMonth)
                }}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next month</span>
              </Button>
            </div>
          </div>

          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            month={month}
            onMonthChange={setMonth}
            showOutsideDays
            fixedWeeks
            components={{
              Day: ({ date, displayMonth, selected, disabled }) => (
                <CalendarDay
                  date={date}
                  events={events}
                  disabled={disabled || date.getMonth() !== displayMonth.getMonth()}
                  selected={selected}
                  today={isSameDay(date, new Date())}
                />
              ),
            }}
            className="w-full"
          />
        </Card>
      </div>

      <div className="md:col-span-2">
        <Card className="p-4 h-full">
          <h2 className="text-lg font-semibold mb-4">
            {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
          </h2>

          {eventsOnSelectedDate.length > 0 ? (
            <div className="space-y-4">
              {eventsOnSelectedDate.map((event) => (
                <EventCard key={event.id} event={event} variant="compact" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[calc(100%-2rem)] text-center text-muted-foreground">
              <p>No events scheduled for this day</p>
              <Button variant="link" asChild className="mt-2">
                <a href="/dashboard/events/new">Create an event</a>
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
