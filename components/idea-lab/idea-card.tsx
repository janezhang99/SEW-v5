"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, Users, ThumbsUp, SproutIcon as Seedling } from "lucide-react"
import { format } from "date-fns"
import { OptimizedImage } from "@/components/ui/optimized-image"

// Map of idea stages to their corresponding icons and colors
const stageConfig = {
  "Just a hunch": {
    icon: <Seedling className="h-4 w-4" />,
    color: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  },
  "Exploring the problem": {
    icon: <Seedling className="h-4 w-4" />,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  },
  "Gathering input": {
    icon: <Seedling className="h-4 w-4" />,
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  },
  "Looking for collaborators": {
    icon: <Seedling className="h-4 w-4" />,
    color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
  },
  "Ready to turn into a project": {
    icon: <Seedling className="h-4 w-4" />,
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
}

interface IdeaCardProps {
  idea: {
    id: string
    title: string
    author: {
      name: string
      avatar: string
      role: string
    }
    description: string
    tags: string[]
    stage: string
    region: string
    comments: number
    followers: number
    resonates: number
    createdAt: string
    image?: string
    featured?: boolean
  }
}

export function IdeaCard({ idea }: IdeaCardProps) {
  const stageInfo = stageConfig[idea.stage as keyof typeof stageConfig] || {
    icon: <Seedling className="h-4 w-4" />,
    color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  }

  return (
    <Card className={idea.featured ? "border-2 border-primary/20" : ""}>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={idea.author.avatar || "/placeholder.svg"} alt={idea.author.name} />
            <AvatarFallback>{idea.author.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div className="flex justify-between">
              <div>
                <Link href={`/idea-lab/${idea.id}`} className="font-medium hover:underline text-lg">
                  {idea.title}
                </Link>
                {idea.featured && <Badge className="ml-2 bg-primary/20 text-primary border-primary/20">Featured</Badge>}
              </div>
              <Badge className={`${stageInfo.color} flex items-center gap-1`}>
                {stageInfo.icon} {idea.stage}
              </Badge>
            </div>

            <p className="text-muted-foreground line-clamp-2">{idea.description}</p>

            {idea.image && (
              <div className="relative h-40 w-full rounded-md overflow-hidden my-2">
                <OptimizedImage src={idea.image} alt={idea.title} fill className="object-cover" />
              </div>
            )}

            <div className="flex flex-wrap gap-1 pt-1">
              {idea.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
              <Badge variant="outline" className="text-xs">
                {idea.region}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground pt-2">
              <div className="flex items-center gap-1">
                <span className="font-medium">{idea.author.name}</span>
                <span>• {idea.author.role}</span>
              </div>
              <div>{format(new Date(idea.createdAt), "MMM d, yyyy")}</div>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <MessageSquare className="mr-1 h-4 w-4" />
                  <span>{idea.comments}</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-1 h-4 w-4" />
                  <span>{idea.followers}</span>
                </div>
                <div className="flex items-center">
                  <ThumbsUp className="mr-1 h-4 w-4" />
                  <span>{idea.resonates}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
