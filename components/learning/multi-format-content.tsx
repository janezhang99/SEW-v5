"use client"

import { useState } from "react"
import { Book, Video, Headphones, ImageIcon, MousePointer, Check, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ContentItem {
  id: string
  title: string
  description: string
  formats: {
    text?: string
    video?: string
    audio?: string
    visual?: string
    interactive?: string
  }
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: number // in minutes
  completed?: boolean
}

interface MultiFormatContentProps {
  content: ContentItem
  onComplete?: (contentId: string) => void
  userPreference?: "text" | "video" | "audio" | "visual" | "interactive"
}

export function MultiFormatContent({ content, onComplete, userPreference = "text" }: MultiFormatContentProps) {
  const [activeFormat, setActiveFormat] = useState<string>(userPreference)
  const [isCompleted, setIsCompleted] = useState<boolean>(content.completed || false)

  const formatIcons = {
    text: <Book className="h-4 w-4" />,
    video: <Video className="h-4 w-4" />,
    audio: <Headphones className="h-4 w-4" />,
    visual: <ImageIcon className="h-4 w-4" />,
    interactive: <MousePointer className="h-4 w-4" />,
  }

  const handleComplete = () => {
    setIsCompleted(true)
    if (onComplete) {
      onComplete(content.id)
    }
  }

  // Get available formats
  const availableFormats = Object.keys(content.formats).filter(
    (format) => !!content.formats[format as keyof typeof content.formats],
  )

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{content.title}</CardTitle>
            <CardDescription className="mt-2">{content.description}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={isCompleted ? "default" : "outline"}>
              {isCompleted ? "Completed" : `${content.duration} min`}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {content.difficulty}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeFormat} onValueChange={setActiveFormat} className="w-full">
          <TabsList className="grid" style={{ gridTemplateColumns: `repeat(${availableFormats.length}, 1fr)` }}>
            {availableFormats.map((format) => (
              <TabsTrigger key={format} value={format} className="flex items-center gap-2">
                {formatIcons[format as keyof typeof formatIcons]}
                <span className="capitalize">{format}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {availableFormats.map((format) => (
            <TabsContent key={format} value={format} className="mt-4">
              <Card>
                <CardContent className="p-4">
                  {format === "text" && content.formats.text && (
                    <div className="prose max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: content.formats.text }} />
                    </div>
                  )}

                  {format === "video" && content.formats.video && (
                    <div className="aspect-video bg-muted rounded-md overflow-hidden">
                      <iframe
                        src={content.formats.video}
                        className="w-full h-full"
                        allowFullScreen
                        title={`${content.title} video`}
                      />
                    </div>
                  )}

                  {format === "audio" && content.formats.audio && (
                    <div className="p-4 bg-muted rounded-md">
                      <audio controls src={content.formats.audio} className="w-full">
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}

                  {format === "visual" && content.formats.visual && (
                    <div className="flex justify-center">
                      <img
                        src={content.formats.visual || "/placeholder.svg"}
                        alt={content.title}
                        className="max-h-[500px] rounded-md"
                      />
                    </div>
                  )}

                  {format === "interactive" && content.formats.interactive && (
                    <div className="p-4 bg-muted rounded-md">
                      <p className="mb-4">This content has an interactive component:</p>
                      <Button variant="outline" asChild>
                        <a href={content.formats.interactive} target="_blank" rel="noopener noreferrer">
                          Open Interactive Activity
                        </a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Info className="h-4 w-4" />
                  Format Help
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>Choose the format that works best for you:</p>
              <ul className="mt-2 text-sm">
                <li className="flex items-center gap-2 mb-1">
                  <Book className="h-3 w-3" /> Text: Read at your own pace
                </li>
                <li className="flex items-center gap-2 mb-1">
                  <Video className="h-3 w-3" /> Video: Watch and learn visually
                </li>
                <li className="flex items-center gap-2 mb-1">
                  <Headphones className="h-3 w-3" /> Audio: Listen while doing other things
                </li>
                <li className="flex items-center gap-2 mb-1">
                  <ImageIcon className="h-3 w-3" /> Visual: Images and diagrams
                </li>
                <li className="flex items-center gap-2">
                  <MousePointer className="h-3 w-3" /> Interactive: Learn by doing
                </li>
              </ul>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button onClick={handleComplete} disabled={isCompleted} className="gap-2">
          {isCompleted ? (
            <>
              <Check className="h-4 w-4" />
              Completed
            </>
          ) : (
            "Mark as Completed"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

// Example usage component
export function MultiFormatContentExample() {
  const exampleContent: ContentItem = {
    id: "content-1",
    title: "Understanding Community Needs Assessment",
    description: "Learn how to identify and assess the needs of your community to create impactful projects.",
    formats: {
      text: "<h2>Community Needs Assessment</h2><p>A community needs assessment is a process of identifying and understanding the needs, challenges, and resources within a community. This process helps ensure that your project addresses real issues and has meaningful impact.</p><h3>Key Steps:</h3><ol><li>Identify your community</li><li>Gather information through surveys, interviews, and observation</li><li>Analyze the data to identify patterns and priorities</li><li>Validate findings with community members</li><li>Use insights to shape your project</li></ol>",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      audio: "https://example.com/audio-file.mp3",
      visual: "/placeholder-o4loo.png",
      interactive: "https://example.com/interactive-assessment",
    },
    difficulty: "beginner",
    duration: 15,
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Learning Module: Community Assessment</h1>
      <MultiFormatContent content={exampleContent} />
    </div>
  )
}
