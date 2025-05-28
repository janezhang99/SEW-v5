import { CalendarDays, CheckCircle2, Clock, AlertCircle } from "lucide-react"

export function ProjectTimeline() {
  // Mock timeline data
  const timelineEvents = [
    {
      id: "1",
      date: "January 2023",
      title: "Project Kickoff",
      description: "Initial team meeting and project planning",
      status: "completed",
    },
    {
      id: "2",
      date: "March 2023",
      title: "Community Consultation",
      description: "Gathering input from local residents and businesses",
      status: "completed",
    },
    {
      id: "3",
      date: "June 2023",
      title: "Draft Plan Completion",
      description: "Finalization of implementation strategy",
      status: "completed",
    },
    {
      id: "4",
      date: "September 2023",
      title: "Implementation Begins",
      description: "Start of green infrastructure installation",
      status: "in-progress",
    },
    {
      id: "5",
      date: "February 2024",
      title: "Mid-project Review",
      description: "Assessment of progress and adjustments",
      status: "upcoming",
    },
    {
      id: "6",
      date: "December 2025",
      title: "Project Completion",
      description: "Final evaluation and reporting",
      status: "upcoming",
    },
  ]

  // Function to get the appropriate icon based on status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "upcoming":
        return <CalendarDays className="h-5 w-5 text-gray-400" />
      case "delayed":
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      default:
        return <CalendarDays className="h-5 w-5 text-gray-400" />
    }
  }

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>
      <div className="space-y-8">
        {timelineEvents.map((event) => (
          <div key={event.id} className="relative pl-10">
            <div className="absolute left-0 top-1 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background border">
              {getStatusIcon(event.status)}
            </div>
            <div>
              <div className="text-sm text-muted-foreground">{event.date}</div>
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-muted-foreground">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
