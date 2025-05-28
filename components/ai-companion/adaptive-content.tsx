"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BookOpen, MessageSquare, ImageIcon, FileText, Video, Headphones, Clock, CheckCircle } from "lucide-react"

export function AdaptiveContent() {
  const [contentType, setContentType] = useState<string>("all")

  const contentItems = [
    {
      title: "Personal Why Reflection Guide",
      description: "A guided reflection to help you connect with your project's purpose",
      type: "text",
      icon: <FileText className="h-4 w-4" />,
      timeEstimate: "15 min read",
      tags: ["reflection", "personal"],
      completed: false,
    },
    {
      title: "Visual Project Planning",
      description: "Learn to create visual roadmaps and mood boards for your project",
      type: "video",
      icon: <Video className="h-4 w-4" />,
      timeEstimate: "12 min video",
      tags: ["visual", "planning"],
      completed: true,
    },
    {
      title: "Community Needs Assessment",
      description: "Interactive guide to identifying community needs and opportunities",
      type: "interactive",
      icon: <MessageSquare className="h-4 w-4" />,
      timeEstimate: "30 min activity",
      tags: ["community", "practical"],
      completed: false,
    },
    {
      title: "Cultural Project Examples",
      description: "Gallery of successful cultural revitalization projects",
      type: "visual",
      icon: <ImageIcon className="h-4 w-4" />,
      timeEstimate: "10 min browse",
      tags: ["cultural", "examples"],
      completed: false,
    },
    {
      title: "Elder Stories Podcast",
      description: "Listen to Elders share wisdom about community projects",
      type: "audio",
      icon: <Headphones className="h-4 w-4" />,
      timeEstimate: "25 min listen",
      tags: ["cultural", "stories"],
      completed: false,
    },
  ]

  const filteredContent =
    contentType === "all" ? contentItems : contentItems.filter((item) => item.type === contentType)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Learning Resources
        </CardTitle>
        <CardDescription>Content adapted to different learning styles and preferences</CardDescription>

        <Tabs defaultValue="all" onValueChange={setContentType} className="mt-2">
          <TabsList className="grid grid-cols-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="text">Text</TabsTrigger>
            <TabsTrigger value="visual">Visual</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="interactive">Interactive</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {filteredContent.map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-md border">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  item.completed ? "bg-green-100 text-green-700" : "bg-primary/10 text-primary"
                }`}
              >
                {item.completed ? <CheckCircle className="h-4 w-4" /> : item.icon}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm">{item.title}</h3>
                  <span className="text-xs text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {item.timeEstimate}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground mt-1">{item.description}</p>

                <div className="flex gap-1 mt-2">
                  {item.tags.map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
