"use client"

import { FlourishingDashboard } from "@/components/ai-companion/flourishing-dashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAICompanion } from "@/components/ai-companion/ai-companion-provider"
import { TrendingUp } from "lucide-react"

export function FlourishingDashboardWrapper() {
  const { flourishingData } = useAICompanion() || {
    flourishingData: {
      status: "growing",
      indicators: {
        positive_emotion: 7,
        engagement: 8,
        relationships: 6,
        meaning: 7,
        accomplishment: 8,
        vitality: 6,
      },
      strengths: [
        {
          strength: "curiosity",
          category: "wisdom",
          level: 4,
          examples: ["Always asking thoughtful questions about adaptation strategies"],
        },
        {
          strength: "perseverance",
          category: "courage",
          level: 3,
          examples: ["Consistently follows through on learning commitments"],
        },
        {
          strength: "teamwork",
          category: "justice",
          level: 4,
          examples: ["Contributes effectively in group discussions"],
        },
      ],
      reflections: [
        {
          prompt: "What aspect of your work gives you the most meaning?",
          response: "Helping communities prepare for climate impacts in ways that promote equity and resilience.",
          timestamp: "2023-04-15T14:30:00Z",
        },
      ],
      streaks: [
        {
          type: "learning",
          count: 12,
          lastUpdated: "2023-05-14T09:15:00Z",
        },
      ],
      milestones: [
        {
          id: "ms-001",
          title: "Completed Risk Assessment Course",
          description: "Finished all modules with distinction",
          achievedAt: "2023-04-10T16:20:00Z",
        },
        {
          id: "ms-002",
          title: "First Community Contribution",
          description: "Shared first case study with the community",
          achievedAt: "2023-03-22T11:45:00Z",
        },
      ],
    },
  }

  if (!flourishingData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Flourishing Dashboard</CardTitle>
          <CardDescription>Track your well-being and growth journey</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-10 space-y-4">
          <div className="bg-muted/30 p-4 rounded-full">
            <TrendingUp className="h-10 w-10 text-muted-foreground" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="font-medium">Flourishing data not available</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Complete your assessment to unlock your personalized flourishing dashboard
            </p>
          </div>
          <Button>Take Assessment</Button>
        </CardContent>
      </Card>
    )
  }

  return <FlourishingDashboard />
}
