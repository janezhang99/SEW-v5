"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Send, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function ProjectDiscussions() {
  const [newComment, setNewComment] = useState("")

  // Mock discussions data
  const discussions = [
    {
      id: "1",
      title: "Tree Species Selection",
      description: "Which tree species are most suitable for our urban environment?",
      author: {
        name: "Alex Johnson",
        avatar: "/diverse-person-portrait.png",
        role: "Project Lead",
      },
      date: "2023-11-10T14:30:00Z",
      comments: [
        {
          id: "1",
          author: {
            name: "Taylor Kim",
            avatar: "/diverse-group-conversation.png",
            role: "Environmental Scientist",
          },
          content:
            "Based on our climate projections, I recommend focusing on native species that are drought-resistant and have high heat tolerance. Specifically, I'd suggest Bur Oak, Hackberry, and Kentucky Coffeetree.",
          date: "2023-11-10T15:45:00Z",
        },
        {
          id: "2",
          author: {
            name: "Jordan Smith",
            avatar: "/diverse-group-meeting.png",
            role: "Community Liaison",
          },
          content:
            "The community has expressed interest in fruit-bearing trees as well. Could we incorporate some fruit trees that meet our climate resilience criteria?",
          date: "2023-11-11T09:30:00Z",
        },
        {
          id: "3",
          author: {
            name: "Sam Rivera",
            avatar: "/diverse-group-five.png",
            role: "Urban Planner",
          },
          content:
            "We should also consider the mature size of these trees in relation to our urban infrastructure. We need to ensure they won't interfere with power lines or building foundations in the long term.",
          date: "2023-11-12T11:15:00Z",
        },
      ],
      tags: ["Planning", "Urban Forestry", "Community Input"],
    },
    {
      id: "2",
      title: "Community Feedback on Cooling Centers",
      description: "Summary of feedback from the community consultation on cooling center locations",
      author: {
        name: "Jordan Smith",
        avatar: "/diverse-group-meeting.png",
        role: "Community Liaison",
      },
      date: "2023-11-12T09:45:00Z",
      comments: [
        {
          id: "1",
          author: {
            name: "Jordan Smith",
            avatar: "/diverse-group-meeting.png",
            role: "Community Liaison",
          },
          content:
            "After our community consultation sessions, residents have identified three priority locations for cooling centers: the community center on Oak Street, the public library, and the senior center. The main concerns were accessibility via public transit and extended hours during heat waves.",
          date: "2023-11-12T09:45:00Z",
        },
      ],
      tags: ["Community Engagement", "Cooling Centers", "Public Feedback"],
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " at " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit the comment to the backend
    console.log("Submitting comment:", newComment)
    setNewComment("")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Project Discussions</h2>
          <p className="text-muted-foreground">Team conversations and topic discussions</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Discussion
        </Button>
      </div>

      {discussions.map((discussion) => (
        <Card key={discussion.id} className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{discussion.title}</CardTitle>
                <CardDescription className="mt-1">{discussion.description}</CardDescription>
              </div>
              <div className="flex flex-wrap gap-2">
                {discussion.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={discussion.author.avatar || "/placeholder.svg"} alt={discussion.author.name} />
                <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm">
                {discussion.author.name} • {formatDate(discussion.date)}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {discussion.comments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                    <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{comment.author.name}</span>
                      <span className="text-xs text-muted-foreground">{comment.author.role}</span>
                      <span className="text-xs text-muted-foreground">• {formatDate(comment.date)}</span>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <form onSubmit={handleSubmitComment} className="w-full">
              <div className="flex gap-4 w-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 flex gap-2">
                  <Textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1 min-h-[80px]"
                  />
                  <Button type="submit" size="sm" className="self-end">
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </div>
              </div>
            </form>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
