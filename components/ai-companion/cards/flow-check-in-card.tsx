"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAICompanion } from "../ai-companion-provider"
import { ActivityIcon, ZapIcon, BrainIcon } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface FlowCheckInCardProps {
  title?: string
  description?: string
  onComplete?: (level: number, feedback: string) => void
  className?: string
}

export function FlowCheckInCard({
  title = "Flow Check-In",
  description = "How engaged are you feeling with your current work?",
  onComplete,
  className,
}: FlowCheckInCardProps) {
  const [engagementLevel, setEngagementLevel] = useState<number | null>(null)
  const [suggestion, setSuggestion] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { updateIndicator } = useAICompanion()

  const handleSubmit = () => {
    if (engagementLevel === null) return

    // Update engagement indicator
    updateIndicator("engagement", engagementLevel * 2)

    // Generate a suggestion based on engagement level
    const newSuggestion = getEngagementSuggestion(engagementLevel)
    setSuggestion(newSuggestion)

    // Mark as submitted
    setIsSubmitted(true)

    // Call the onComplete callback if provided
    if (onComplete) {
      onComplete(engagementLevel, newSuggestion)
    }
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 dark:bg-blue-900 p-1.5 rounded-md">
            <ActivityIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {!isSubmitted ? (
          <RadioGroup
            value={engagementLevel?.toString() || ""}
            onValueChange={(value) => setEngagementLevel(Number.parseInt(value))}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="5" id="flow-5" />
              <Label htmlFor="flow-5" className="flex-1">
                Fully engaged and energized (flow state)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="4" id="flow-4" />
              <Label htmlFor="flow-4" className="flex-1">
                Focused and interested
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="3" id="flow-3" />
              <Label htmlFor="flow-3" className="flex-1">
                Moderately engaged
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2" id="flow-2" />
              <Label htmlFor="flow-2" className="flex-1">
                Somewhat distracted
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="flow-1" />
              <Label htmlFor="flow-1" className="flex-1">
                Struggling to focus
              </Label>
            </div>
          </RadioGroup>
        ) : suggestion ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <ZapIcon className="h-5 w-5 text-blue-500 flex-shrink-0" />
              <h3 className="font-medium">Engagement Suggestion</h3>
            </div>
            <p className="text-sm break-words">{suggestion}</p>
          </div>
        ) : null}
      </CardContent>
      {!isSubmitted && (
        <CardFooter>
          <Button onClick={handleSubmit} disabled={engagementLevel === null} className="w-full">
            <BrainIcon className="h-4 w-4 mr-2" />
            Submit
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

function getEngagementSuggestion(level: number): string {
  switch (level) {
    case 5:
      return "You're in a flow state! This is the optimal state for learning and creativity. Consider setting a timer to maintain awareness of time passing, as flow states can make hours feel like minutes."
    case 4:
      return "You're highly engaged. To maintain this state, consider breaking your work into focused 25-minute sessions with short breaks in between (the Pomodoro Technique)."
    case 3:
      return "You're moderately engaged. Try setting a clear, achievable goal for the next hour to increase your focus and motivation."
    case 2:
      return "You seem somewhat distracted. Consider changing your environment, putting away digital distractions, or taking a short break to reset your attention."
    case 1:
      return "You're finding it difficult to focus. This might be a good time for a proper break - try a 10-minute walk, some stretching, or a brief meditation to refresh your mind."
    default:
      return "Consider what factors help you engage most deeply with your work, and try to incorporate more of those elements."
  }
}
