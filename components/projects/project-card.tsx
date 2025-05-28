"use client"

import { useState } from "react"
import Link from "next/link"
import {
  MoreHorizontal,
  Users,
  Calendar,
  Lightbulb,
  ClipboardList,
  FlaskRoundIcon as Flask,
  Wrench,
  Rocket,
  CheckCircle2,
  HelpCircle,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { getPlaceholderImage } from "@/lib/image-utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ProjectCardProps {
  project: {
    id: string
    title: string
    description: string
    domain: string
    stage: string
    progress: number
    collaborators: number
    image: string
    updatedAt: string
  }
  className?: string
}

// Map of project stages to their corresponding icons
const stageIcons = {
  Ideation: <Lightbulb className="h-4 w-4" />,
  Planning: <ClipboardList className="h-4 w-4" />,
  Development: <Flask className="h-4 w-4" />,
  Implementation: <Wrench className="h-4 w-4" />,
  Deployment: <Rocket className="h-4 w-4" />,
  Completed: <CheckCircle2 className="h-4 w-4" />,
  default: <HelpCircle className="h-4 w-4" />,
}

// Map of stage colors
const stageColors = {
  Ideation: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  Planning: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  Development: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  Implementation: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
  Deployment: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  Completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  default: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
}

// Map of stage ribbon colors (more subtle versions for the ribbon)
const stageRibbonColors = {
  Ideation: "bg-amber-500/10 border-l-4 border-amber-500",
  Planning: "bg-blue-500/10 border-l-4 border-blue-500",
  Development: "bg-purple-500/10 border-l-4 border-purple-500",
  Implementation: "bg-emerald-500/10 border-l-4 border-emerald-500",
  Deployment: "bg-orange-500/10 border-l-4 border-orange-500",
  Completed: "bg-green-500/10 border-l-4 border-green-500",
  default: "bg-gray-500/10 border-l-4 border-gray-500",
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Get the appropriate icon for the stage, or use default if not found
  const stageIcon = stageIcons[project.stage as keyof typeof stageIcons] || stageIcons.default

  // Get the appropriate color for the stage, or use default if not found
  const stageColor = stageColors[project.stage as keyof typeof stageColors] || stageColors.default

  // Get the appropriate ribbon color for the stage, or use default if not found
  const ribbonColor = stageRibbonColors[project.stage as keyof typeof stageRibbonColors] || stageRibbonColors.default

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow transition-all hover:shadow-md",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <OptimizedImage
          src={project.image || getPlaceholderImage(600, 400, project.title)}
          alt={project.title}
          aspectRatio="video"
          className={cn("transition-transform duration-300", isHovered ? "scale-105" : "scale-100")}
          priority={false}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex gap-2 mb-2">
                <div className="bg-primary/80 text-primary-foreground px-2 py-0.5 rounded text-xs">
                  {project.domain}
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className={`${stageColor} w-6 h-6 flex items-center justify-center rounded-full`}>
                        {stageIcon}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{project.stage}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <h3 className="text-lg font-semibold text-white">{project.title}</h3>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuItem>Archive</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className={`p-4 ${ribbonColor}`}>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{project.description}</p>

        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-xs font-medium">Progress</span>
            <span className="text-xs">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-1.5" />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            <span>{project.collaborators} collaborators</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>

        <Link href={`/projects/${project.id}`} className="absolute inset-0">
          <span className="sr-only">View project</span>
        </Link>
      </div>
    </div>
  )
}
