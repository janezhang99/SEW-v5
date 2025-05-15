"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Lightbulb, Clock, Paintbrush, BookOpen, Briefcase, ArrowRight } from "lucide-react"

// Define persona types
type PersonaType = "reflective" | "visual" | "practical"
type LearningCapacity = "low" | "moderate" | "high"

export function PersonaBasedGuidance() {
  const [selectedPersona, setSelectedPersona] = useState<PersonaType>("reflective")
  const [learningCapacity, setLearningCapacity] = useState<LearningCapacity>("moderate")

  // Content tailored to different personas
  const personaContent = {
    reflective: {
      title: "Reflective Learning Path",
      description: "A journey focused on deep reflection, cultural connection, and spiritual growth",
      icon: <Heart className="h-5 w-5 text-rose-500" />,
      color: "bg-rose-50 border-rose-200",
      textColor: "text-rose-700",
      badgeColor: "bg-rose-100 text-rose-800",
      tasks: [
        {
          name: "Personal Why",
          description: "Reflect on what this project means to you and why you feel connected to it",
          category: "personal",
          icon: <Heart className="h-4 w-4" />,
          timeEstimate: "1-2 hours",
        },
        {
          name: "Core Values",
          description: "Identify relevant personal, community, and cultural values that will shape your project",
          category: "mission",
          icon: <Lightbulb className="h-4 w-4" />,
          timeEstimate: "1-2 hours",
        },
        {
          name: "Community Need",
          description: "Explore how your project addresses specific community needs and challenges",
          category: "community",
          icon: <Users className="h-4 w-4" />,
          timeEstimate: "2-3 hours",
        },
      ],
    },
    visual: {
      title: "Visual & Creative Learning Path",
      description: "A journey that emphasizes creative expression, visual learning, and hands-on activities",
      icon: <Paintbrush className="h-5 w-5 text-purple-500" />,
      color: "bg-purple-50 border-purple-200",
      textColor: "text-purple-700",
      badgeColor: "bg-purple-100 text-purple-800",
      tasks: [
        {
          name: "Creative Why",
          description: "Create a visual reflection about why this project matters to you",
          category: "personal",
          icon: <Heart className="h-4 w-4" />,
          timeEstimate: "1 hour",
        },
        {
          name: "Mood Board",
          description: "Collect images and visuals that represent your project vision",
          category: "mission",
          icon: <Paintbrush className="h-4 w-4" />,
          timeEstimate: "1-2 hours",
        },
        {
          name: "Project Vibes",
          description: "Choose words or feelings that describe the energy of your project",
          category: "mission",
          icon: <Lightbulb className="h-4 w-4" />,
          timeEstimate: "30 minutes",
        },
      ],
    },
    practical: {
      title: "Practical & Efficient Learning Path",
      description: "A journey focused on practical skills, efficient planning, and real-world application",
      icon: <Briefcase className="h-5 w-5 text-blue-500" />,
      color: "bg-blue-50 border-blue-200",
      textColor: "text-blue-700",
      badgeColor: "bg-blue-100 text-blue-800",
      tasks: [
        {
          name: "Project Purpose",
          description: "Define the purpose of your project and who it serves",
          category: "mission",
          icon: <Lightbulb className="h-4 w-4" />,
          timeEstimate: "1 hour",
        },
        {
          name: "Program Snapshot",
          description: "Create a one-pager outlining your current offerings and growth areas",
          category: "operations",
          icon: <BookOpen className="h-4 w-4" />,
          timeEstimate: "1-2 hours",
        },
        {
          name: "Timeline",
          description: "Create a timeline of tasks to break your project into manageable steps",
          category: "operations",
          icon: <Clock className="h-4 w-4" />,
          timeEstimate: "2 hours",
        },
      ],
    },
  }

  const content = personaContent[selectedPersona]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Personalized Learning Journey
        </CardTitle>
        <CardDescription>Choose a learning path that matches your style and capacity</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">How do you prefer to learn?</h3>
          <Tabs defaultValue={selectedPersona} onValueChange={(v) => setSelectedPersona(v as PersonaType)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="reflective" className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>Reflective</span>
              </TabsTrigger>
              <TabsTrigger value="visual" className="flex items-center gap-1">
                <Paintbrush className="h-4 w-4" />
                <span>Visual</span>
              </TabsTrigger>
              <TabsTrigger value="practical" className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                <span>Practical</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">How much time can you commit?</h3>
          <Tabs defaultValue={learningCapacity} onValueChange={(v) => setLearningCapacity(v as LearningCapacity)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="low">
                <span>Limited</span>
              </TabsTrigger>
              <TabsTrigger value="moderate">
                <span>Moderate</span>
              </TabsTrigger>
              <TabsTrigger value="high">
                <span>Substantial</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className={`rounded-lg p-4 ${content.color}`}>
          <div className="flex items-start gap-3">
            <div className={`h-10 w-10 rounded-full bg-white flex items-center justify-center ${content.textColor}`}>
              {content.icon}
            </div>
            <div>
              <h3 className={`font-medium ${content.textColor}`}>{content.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{content.description}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">Recommended Starting Tasks</h3>
          {content.tasks.map((task, index) => (
            <div key={index} className="flex items-center justify-between rounded-md border p-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {task.icon}
                </div>
                <div>
                  <p className="text-sm font-medium">{task.name}</p>
                  <p className="text-xs text-muted-foreground">{task.description}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge variant="outline" className={content.badgeColor}>
                  {task.category}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {task.timeEstimate}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full">
          Start Your Learning Journey
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
