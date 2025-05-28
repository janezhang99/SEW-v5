import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface ProjectHeaderProps {
  project: {
    id: string | string[]
    name: string
    description: string
    goal: string
    timeline: string
    stage: string
  }
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  // Calculate a random progress value between 10-90% for demo purposes
  const progress = Math.floor(Math.random() * 80) + 10

  // Map stage to badge color
  const stageBadgeVariant =
    {
      planning: "secondary",
      implementation: "primary",
      monitoring: "warning",
      evaluation: "success",
      completed: "default",
    }[project.stage] || "default"

  return (
    <div className="mb-8">
      <div className="mb-4">
        <Link href="/projects">
          <Button variant="ghost" className="pl-0">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </Link>
      </div>

      <div className="relative h-48 w-full overflow-hidden rounded-lg mb-6">
        <Image src="/urban-green-infrastructure.png" alt={project.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <Badge variant={stageBadgeVariant as any} className="mb-2">
            {project.stage.charAt(0).toUpperCase() + project.stage.slice(1)}
          </Badge>
          <h1 className="text-3xl font-bold">{project.name}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="col-span-2">
          <h2 className="text-xl font-semibold mb-2">Project Goal</h2>
          <p className="text-muted-foreground mb-4">{project.goal}</p>

          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-muted-foreground">{project.description}</p>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-1">Timeline</h3>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{project.timeline}</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-1">Last Updated</h3>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>
    </div>
  )
}
