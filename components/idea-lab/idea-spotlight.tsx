import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, ThumbsUp, Users, ArrowRight } from "lucide-react"
import { OptimizedImage } from "@/components/ui/optimized-image"

interface IdeaSpotlightProps {
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
    image?: string
  }
}

export function IdeaSpotlight({ idea }: IdeaSpotlightProps) {
  return (
    <Card className="border-2 border-primary/20 overflow-hidden">
      <CardHeader className="bg-primary/10 pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Idea Spotlight</span>
          <Badge variant="outline">Featured</Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {idea.image && (
          <div className="relative h-48 w-full rounded-md overflow-hidden">
            <OptimizedImage src={idea.image} alt={idea.title} fill className="object-cover" />
          </div>
        )}

        <div>
          <Link href={`/idea-lab/${idea.id}`} className="text-xl font-semibold hover:underline">
            {idea.title}
          </Link>
          <p className="text-muted-foreground mt-2">{idea.description}</p>
        </div>

        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={idea.author.avatar || "/placeholder.svg"} alt={idea.author.name} />
            <AvatarFallback>{idea.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{idea.author.name}</p>
            <p className="text-xs text-muted-foreground">{idea.author.role}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {idea.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>

        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex gap-3">
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

          <Button variant="ghost" size="sm" asChild>
            <Link href={`/idea-lab/${idea.id}`}>
              View Details <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="pt-2 border-t">
          <h4 className="font-medium text-sm mb-2">Community Feedback Highlights</h4>
          <div className="text-sm italic text-muted-foreground">
            "This could be transformative for coastal communities facing erosion challenges."
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
