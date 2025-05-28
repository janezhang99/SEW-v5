import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Users, Download, BookOpen, Calendar, FileText } from "lucide-react"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { getPlaceholderImage } from "@/lib/image-utils"

interface FeaturedContentProps {
  type?: "recommended" | "popular" | "new"
}

export function FeaturedContent({ type = "recommended" }: FeaturedContentProps) {
  // This would normally come from an API or database
  const recommendedContent = [
    {
      id: "course-1",
      title: "Climate Risk Assessment Fundamentals",
      description: "Learn the basics of identifying and evaluating climate-related risks and vulnerabilities.",
      image: "/climate-risk-assessment.png",
      domain: "Climate Risk Assessment",
      level: "Beginner",
      duration: "4 hours",
      enrollments: 156,
      contentType: "course",
      relevance: "Matches your interest in Risk Assessment",
    },
    {
      id: "resource-1",
      title: "Adaptation Planning Toolkit",
      description: "A comprehensive set of tools and templates for adaptation planning.",
      image: "/adaptation-planning-toolkit.png",
      domain: "Strategic Adaptation Planning",
      level: "Intermediate",
      downloads: 89,
      contentType: "resource",
      relevance: "Relevant to your Municipal Planning interest",
    },
    {
      id: "event-1",
      title: "Nature-based Solutions Workshop",
      description: "A hands-on workshop exploring successful nature-based adaptation projects.",
      image: "/nature-based-workshop.png",
      domain: "Adaptation Options",
      date: "May 15, 2023",
      location: "Virtual",
      attendees: 42,
      contentType: "event",
      relevance: "Aligns with your Nature-based Solutions interest",
    },
  ]

  const popularContent = [
    {
      id: "course-2",
      title: "Stakeholder Engagement Strategies",
      description: "Learn effective methods for engaging diverse stakeholders in adaptation planning.",
      image: "/diverse-group-meeting.png",
      domain: "Community Engagement",
      level: "Intermediate",
      duration: "6 hours",
      enrollments: 243,
      contentType: "course",
      popularity: "Most enrolled course this month",
    },
    {
      id: "resource-2",
      title: "Climate Data Visualization Guide",
      description: "Best practices for communicating climate data through effective visualizations.",
      image: "/climate-data-analysis.png",
      domain: "Climate Communication",
      level: "Intermediate",
      downloads: 178,
      contentType: "resource",
      popularity: "Top downloaded resource",
    },
    {
      id: "event-2",
      title: "Climate Risk Assessment Conference",
      description: "Annual conference bringing together experts in climate risk assessment.",
      image: "/risk-assessment-conference.png",
      domain: "Climate Risk Assessment",
      date: "June 10-12, 2023",
      location: "Toronto, Canada",
      attendees: 156,
      contentType: "event",
      popularity: "Flagship annual event",
    },
  ]

  const newContent = [
    {
      id: "course-3",
      title: "Urban Heat Island Mitigation",
      description: "Strategies for reducing urban heat island effects through design and planning.",
      image: "/urban-green-infrastructure.png",
      domain: "Urban Adaptation",
      level: "Advanced",
      duration: "5 hours",
      enrollments: 67,
      contentType: "course",
      added: "Added 3 days ago",
    },
    {
      id: "resource-3",
      title: "Cost-Benefit Analysis Templates",
      description: "Templates and guidance for conducting cost-benefit analyses of adaptation measures.",
      image: "/cost-benefit-climate-adaptation.png",
      domain: "Economic Analysis",
      level: "Advanced",
      downloads: 42,
      contentType: "resource",
      added: "Added 1 week ago",
    },
    {
      id: "event-3",
      title: "Equity in Climate Adaptation Workshop",
      description: "Workshop focusing on ensuring equitable outcomes in adaptation planning.",
      image: "/equity-workshop.png",
      domain: "Climate Justice",
      date: "May 28, 2023",
      location: "Virtual",
      attendees: 89,
      contentType: "event",
      added: "Added 2 days ago",
    },
  ]

  const content = type === "recommended" ? recommendedContent : type === "popular" ? popularContent : newContent

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {content.map((item) => (
        <Card key={item.id} className="overflow-hidden flex flex-col">
          <div className="aspect-video relative">
            <OptimizedImage
              src={item.image || getPlaceholderImage(400, 200, item.title)}
              alt={item.title}
              aspectRatio="video"
              priority={false}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {(item.relevance || item.popularity || item.added) && (
              <div className="absolute top-2 right-2">
                <Badge className="bg-primary/90 hover:bg-primary">
                  {item.relevance || item.popularity || item.added}
                </Badge>
              </div>
            )}
          </div>
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-start gap-2">
              <Badge variant="outline">{item.domain}</Badge>
              <Badge
                variant="secondary"
                className={`
                  ${item.contentType === "course" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" : ""}
                  ${item.contentType === "resource" ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300" : ""}
                  ${item.contentType === "event" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300" : ""}
                `}
              >
                {item.contentType === "course" && <BookOpen className="mr-1 h-3 w-3" />}
                {item.contentType === "resource" && <FileText className="mr-1 h-3 w-3" />}
                {item.contentType === "event" && <Calendar className="mr-1 h-3 w-3" />}
                {item.contentType}
              </Badge>
            </div>
            <CardTitle className="text-lg mt-2">{item.title}</CardTitle>
            <CardDescription className="line-clamp-2">{item.description}</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0 flex-grow">
            {item.contentType === "course" && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                <span>{(item as any).duration}</span>
                <Users className="ml-3 mr-1 h-4 w-4" />
                <span>{(item as any).enrollments} enrolled</span>
              </div>
            )}
            {item.contentType === "event" && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                <span>{(item as any).date}</span>
                <Users className="ml-3 mr-1 h-4 w-4" />
                <span>{(item as any).attendees} attending</span>
              </div>
            )}
            {item.contentType === "resource" && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Download className="mr-1 h-4 w-4" />
                <span>{(item as any).downloads} downloads</span>
              </div>
            )}
          </CardContent>
          <CardFooter className="p-4 pt-0 mt-auto">
            <Button className="w-full">
              {item.contentType === "course" ? "Enroll Now" : item.contentType === "event" ? "Register" : "Download"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
