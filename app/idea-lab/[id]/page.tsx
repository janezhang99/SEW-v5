import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  MessageSquare,
  Users,
  ThumbsUp,
  Bell,
  ArrowLeft,
  Send,
  SproutIcon as Seedling,
  Lightbulb,
  UserPlus,
  Share2,
} from "lucide-react"
import { format } from "date-fns"
import { OptimizedImage } from "@/components/ui/optimized-image"

// This would normally come from a database
const getIdeaById = (id: string) => {
  // Sample idea data
  return {
    id,
    title: "Indigenous knowledge integration framework",
    author: {
      name: "Sarah Redbird",
      avatar: "/diverse-group-meeting.png",
      role: "Indigenous Knowledge Keeper",
    },
    description:
      "Developing a respectful framework for integrating traditional ecological knowledge with scientific climate data for holistic adaptation planning.",
    problem:
      "Climate adaptation efforts often fail to meaningfully incorporate Indigenous knowledge systems, resulting in incomplete understanding of local ecosystems and missed opportunities for effective, culturally appropriate solutions.",
    supportNeeded: ["Research", "Collaboration", "Funding guidance"],
    tags: ["indigenous", "knowledge", "integration", "planning"],
    stage: "Gathering input",
    region: "Northwest Territories",
    comments: [
      {
        id: "comment-1",
        author: {
          name: "Michael Chen",
          avatar: "/diverse-group-conversation.png",
          role: "Adaptation Specialist",
        },
        content:
          "This is a critical gap in our current adaptation frameworks. I'd be interested in collaborating on this, especially around creating protocols for respectful knowledge sharing.",
        createdAt: "2023-05-13T10:30:00Z",
        likes: 5,
      },
      {
        id: "comment-2",
        author: {
          name: "Elena Rodriguez",
          avatar: "/diverse-group-five.png",
          role: "Urban Planner",
        },
        content:
          "Have you looked at the work being done in Australia with Aboriginal communities? There might be some transferable approaches there.",
        createdAt: "2023-05-14T14:15:00Z",
        likes: 3,
      },
    ],
    followers: 15,
    resonates: 32,
    createdAt: "2023-05-12T11:45:00Z",
    image: "/indigenous-knowledge.png",
    challenges:
      "Ensuring that knowledge sharing is reciprocal and benefits Indigenous communities; developing protocols that respect cultural ownership of knowledge; finding ways to translate between different knowledge systems without losing nuance.",
    suggestedConnections: [
      {
        name: "Traditional Ecological Knowledge Network",
        type: "Group",
        match: "95% match",
      },
      {
        name: "Dr. James Wilson",
        type: "Person",
        role: "Indigenous Studies Professor",
        match: "90% match",
      },
      {
        name: "Community-based monitoring systems",
        type: "Related Idea",
        author: "Robert Greenfield",
        match: "85% match",
      },
    ],
  }
}

export default function IdeaDetailPage({ params }: { params: { id: string } }) {
  const idea = getIdeaById(params.id)

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Link href="/idea-lab" className="flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Idea Lab
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Idea Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300 flex items-center gap-1">
                <Seedling className="h-4 w-4" /> {idea.stage}
              </Badge>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Bell className="h-4 w-4" />
                  Follow
                </Button>
              </div>
            </div>

            <h1 className="text-3xl font-bold">{idea.title}</h1>

            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={idea.author.avatar || "/placeholder.svg"} alt={idea.author.name} />
                <AvatarFallback>{idea.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{idea.author.name}</p>
                <p className="text-sm text-muted-foreground">{idea.author.role}</p>
              </div>
              <div className="text-sm text-muted-foreground ml-auto">
                Posted on {format(new Date(idea.createdAt), "MMMM d, yyyy")}
              </div>
            </div>

            {idea.image && (
              <div className="relative h-64 w-full rounded-lg overflow-hidden">
                <OptimizedImage src={idea.image} alt={idea.title} fill className="object-cover" />
              </div>
            )}
          </div>

          {/* Idea Content */}
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-muted-foreground">{idea.description}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Problem Statement</h2>
                <p className="text-muted-foreground">{idea.problem}</p>
              </div>

              {idea.challenges && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Open Questions & Challenges</h2>
                  <p className="text-muted-foreground">{idea.challenges}</p>
                </div>
              )}

              <div>
                <h2 className="text-xl font-semibold mb-2">Support Needed</h2>
                <div className="flex flex-wrap gap-2">
                  {idea.supportNeeded.map((support) => (
                    <Badge key={support} variant="outline">
                      {support}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {idea.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      #{tag}
                    </Badge>
                  ))}
                  <Badge variant="outline">{idea.region}</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex gap-4">
                  <Button variant="outline" size="sm" className="gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    Resonates ({idea.resonates})
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <UserPlus className="h-4 w-4" />
                    I'm Interested
                  </Button>
                </div>

                {idea.stage === "Ready to turn into a project" && (
                  <Button className="gap-1">
                    <Lightbulb className="h-4 w-4" />
                    Grow into Project
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Discussion ({idea.comments.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Comment input */}
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <Textarea placeholder="Share your thoughts, questions, or feedback..." />
                  <div className="flex justify-end">
                    <Button className="gap-1">
                      <Send className="h-4 w-4" />
                      Comment
                    </Button>
                  </div>
                </div>
              </div>

              {/* Comments list */}
              <div className="space-y-6 pt-4">
                {idea.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                      <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium">{comment.author.name}</span>
                          <span className="text-sm text-muted-foreground ml-2">{comment.author.role}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(comment.createdAt), "MMM d, yyyy")}
                        </span>
                      </div>
                      <p>{comment.content}</p>
                      <div className="flex items-center gap-4 pt-1">
                        <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
                          <ThumbsUp className="mr-1 h-4 w-4" />
                          {comment.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Engagement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-5 w-5 text-muted-foreground" />
                  <span>Resonates</span>
                </div>
                <Badge variant="outline">{idea.resonates}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span>Followers</span>
                </div>
                <Badge variant="outline">{idea.followers}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-muted-foreground" />
                  <span>Comments</span>
                </div>
                <Badge variant="outline">{idea.comments.length}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Suggested Connections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {idea.suggestedConnections.map((connection, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{connection.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {connection.type} {connection.role && `• ${connection.role}`}
                    </p>
                  </div>
                  <Badge className="bg-primary/20 text-primary border-primary/20">{connection.match}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Ready to Collaborate?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                This idea has gained significant interest. Consider growing it into a full project to attract more
                collaborators and resources.
              </p>
              <Button className="w-full">Grow into Project</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
