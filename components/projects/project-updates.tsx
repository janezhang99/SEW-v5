"use client"

import { useState, useEffect, useRef } from "react"
import { MessageSquare, Share2, Heart, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ImageIcon } from "lucide-react"

// Types for project updates
interface UpdateComment {
  id: string
  author: {
    name: string
    avatar?: string
    role?: string
  }
  content: string
  createdAt: string
  likes: number
  timestamp?: Date
}

interface ProjectUpdate {
  id: string
  author: {
    name: string
    avatar?: string
    role: string
  }
  content: string
  createdAt: string
  visibility: "public" | "team"
  likes: number
  comments: UpdateComment[]
  images?: string[]
  tags?: string[]
  timestamp?: Date
}

interface ProjectUpdatesProps {
  projectId: string
}

// Mock data for project updates
const mockUpdates = [
  {
    id: "1",
    author: {
      name: "Alex Johnson",
      role: "Project Lead",
      avatar: "/diverse-person-portrait.png",
    },
    content:
      "We've completed the initial site assessment for our urban heat island project. The data shows that the target neighborhoods experience temperatures 7-10°F higher than surrounding areas during summer months. This confirms our project focus areas.",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    visibility: "team",
    likes: 5,
    comments: [
      {
        id: "c1",
        author: {
          name: "Taylor Kim",
          role: "Environmental Scientist",
          avatar: "/diverse-group-conversation.png",
        },
        content: "Great work! Did you identify any specific hotspots we should prioritize?",
        timestamp: new Date(Date.now() - 1.9 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 1.9 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "c2",
        author: {
          name: "Alex Johnson",
          role: "Project Lead",
          avatar: "/diverse-person-portrait.png",
        },
        content:
          "Yes, the intersection of Main and Oak Streets showed the highest temperatures. We should focus our initial tree planting there.",
        timestamp: new Date(Date.now() - 1.8 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 1.8 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    tags: ["assessment", "data"],
    images: [],
  },
  {
    id: "2",
    author: {
      name: "Sam Rivera",
      role: "Urban Planner",
      avatar: "/diverse-group-five.png",
    },
    content:
      "Exciting news! The city council has approved our proposal for the community cooling center. Construction will begin next month and should be completed before the summer heat arrives.",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    visibility: "public",
    likes: 12,
    comments: [
      {
        id: "c3",
        author: {
          name: "Jordan Smith",
          role: "Community Liaison",
          avatar: "/diverse-group-meeting.png",
        },
        content:
          "This is fantastic news! The community members I've spoken with are very excited about this development.",
        timestamp: new Date(Date.now() - 4.8 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 4.8 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    tags: ["milestone", "cooling-center"],
    images: ["/urban-green-infrastructure.png"],
  },
  {
    id: "3",
    author: {
      name: "Taylor Kim",
      role: "Environmental Scientist",
      avatar: "/diverse-group-conversation.png",
    },
    content:
      "I've finalized the tree species selection for our planting events. We'll be using a mix of native species that are drought-tolerant and provide maximum shade. The nursery has confirmed they can supply all our needs for the spring planting.",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    visibility: "team",
    likes: 8,
    comments: [],
    tags: ["planning", "trees"],
    images: [],
  },
  {
    id: "4",
    author: {
      name: "Jordan Smith",
      role: "Community Liaison",
      avatar: "/diverse-group-meeting.png",
    },
    content:
      "We had an amazing turnout at yesterday's community workshop! Over 50 residents participated and provided valuable input on the project. Many have signed up to volunteer for our first planting event next month.",
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    visibility: "public",
    likes: 15,
    comments: [
      {
        id: "c4",
        author: {
          name: "Alex Johnson",
          role: "Project Lead",
          avatar: "/diverse-person-portrait.png",
        },
        content:
          "This is exactly the kind of community engagement we were hoping for. Great work organizing this, Jordan!",
        timestamp: new Date(Date.now() - 9.8 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 9.8 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    tags: ["community", "workshop"],
    images: ["/community-event.png"],
  },
]

export function ProjectUpdates({ projectId }: ProjectUpdatesProps) {
  const [filter, setFilter] = useState<"all" | "team" | "public">("all")
  const [newUpdate, setNewUpdate] = useState("")
  const [newUpdateVisibility, setNewUpdateVisibility] = useState<"team" | "public">("team")
  const [updates, setUpdates] = useState(mockUpdates)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Use a ref to track if the component is mounted
  const isMounted = useRef(true)

  // Set isMounted to false when the component unmounts
  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  // Filter updates based on the selected filter
  const filteredUpdates = updates.filter((update) => {
    if (filter === "all") return true
    return update.visibility === filter
  })

  const handlePostUpdate = () => {
    if (!newUpdate.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Only update state if the component is still mounted
      if (isMounted.current) {
        const newUpdateObj = {
          id: `new-${Date.now()}`,
          author: {
            name: "Alex Johnson",
            role: "Project Lead",
            avatar: "/diverse-person-portrait.png",
          },
          content: newUpdate,
          timestamp: new Date(),
          createdAt: new Date().toISOString(),
          visibility: newUpdateVisibility,
          likes: 0,
          comments: [],
          tags: [],
          images: [],
        }

        setUpdates((prev) => [newUpdateObj, ...prev])
        setNewUpdate("")
        setIsSubmitting(false)
      }
    }, 500)
  }

  const handleLike = (updateId: string) => {
    setUpdates((prev) =>
      prev.map((update) => {
        if (update.id === updateId) {
          return { ...update, likes: update.likes + 1 }
        }
        return update
      }),
    )
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return "Just now"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    return `${Math.floor(diffInSeconds / 86400)}d ago`
  }

  return (
    <div className="space-y-6">
      {/* New update form */}
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Avatar>
            <AvatarFallback>AJ</AvatarFallback>
            <AvatarImage src="/diverse-person-portrait.png" />
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Share a project update..."
              value={newUpdate}
              onChange={(e) => setNewUpdate(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <ImageIcon className="h-4 w-4 mr-1" />
                  Add Image
                </Button>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-muted-foreground">Visibility:</span>
                  <div className="flex">
                    <Button
                      variant={newUpdateVisibility === "team" ? "default" : "outline"}
                      size="sm"
                      className="rounded-r-none"
                      onClick={() => setNewUpdateVisibility("team")}
                    >
                      Team
                    </Button>
                    <Button
                      variant={newUpdateVisibility === "public" ? "default" : "outline"}
                      size="sm"
                      className="rounded-l-none"
                      onClick={() => setNewUpdateVisibility("public")}
                    >
                      Public
                    </Button>
                  </div>
                </div>
              </div>
              <Button onClick={handlePostUpdate} disabled={!newUpdate.trim() || isSubmitting}>
                {isSubmitting ? "Posting..." : "Post Update"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <Tabs value={filter} onValueChange={(value) => setFilter(value as "all" | "team" | "public")}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Updates</TabsTrigger>
          <TabsTrigger value="team">Team Only</TabsTrigger>
          <TabsTrigger value="public">Public</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Updates list */}
      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-6">
          {filteredUpdates.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No updates to display</p>
            </div>
          ) : (
            filteredUpdates.map((update) => (
              <Card key={update.id} className="p-4">
                <div className="space-y-4">
                  {/* Update header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback>{update.author.name.charAt(0)}</AvatarFallback>
                        <AvatarImage src={update.author.avatar || "/placeholder.svg"} />
                      </Avatar>
                      <div>
                        <div className="font-medium">{update.author.name}</div>
                        <div className="text-sm text-muted-foreground">{update.author.role}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(update.timestamp || new Date(update.createdAt))}
                        </div>
                      </div>
                    </div>
                    <Badge variant={update.visibility === "team" ? "outline" : "secondary"}>
                      {update.visibility === "team" ? "Team Only" : "Public"}
                    </Badge>
                  </div>

                  {/* Update content */}
                  <div>
                    <p className="text-sm">{update.content}</p>
                    {update.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {update.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Update images */}
                  {update.images.length > 0 && (
                    <div className="grid grid-cols-1 gap-2">
                      {update.images.map((image, index) => (
                        <div key={index} className="relative aspect-video rounded-md overflow-hidden">
                          <img
                            src={image || "/placeholder.svg"}
                            alt="Update image"
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Update actions */}
                  <div className="flex items-center gap-4 pt-2 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground"
                      onClick={() => handleLike(update.id)}
                    >
                      <Heart className="h-4 w-4 mr-1" />
                      {update.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {update.comments.length}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>

                  {/* Comments */}
                  {update.comments.length > 0 && (
                    <div className="space-y-3 pt-3 border-t">
                      {update.comments.map((comment) => (
                        <div key={comment.id} className="flex items-start gap-3">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                            <AvatarImage src={comment.author.avatar || "/placeholder.svg"} />
                          </Avatar>
                          <div className="flex-1">
                            <div className="bg-muted p-2 rounded-md">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium">{comment.author.name}</span>
                                <span className="text-xs text-muted-foreground">{comment.author.role}</span>
                              </div>
                              <p className="text-xs mt-1">{comment.content}</p>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {formatDate(comment.timestamp || new Date(comment.createdAt))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add comment */}
                  <div className="flex items-center gap-2 pt-3 border-t">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>AJ</AvatarFallback>
                      <AvatarImage src="/diverse-person-portrait.png" />
                    </Avatar>
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        className="flex-1 bg-muted px-3 py-1 text-sm rounded-full focus:outline-none"
                      />
                      <Button size="icon" variant="ghost" className="h-7 w-7">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
