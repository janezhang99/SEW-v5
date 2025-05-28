"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAICompanion } from "./ai-companion-provider"
import { HeartIcon, BrainIcon, UsersIcon, CompassIcon, TrophyIcon, ZapIcon } from "lucide-react"
import type { FlourishingIndicator, FlourishingStatus } from "@/types/ai-companion"
import { PermaBloomVisualization } from "./perma-bloom-visualization"

interface FlourishingDashboardProps {
  className?: string
}

export function FlourishingDashboard({ className }: FlourishingDashboardProps) {
  const { flourishingData } = useAICompanion()

  const statusIcons: Record<FlourishingStatus, React.ReactNode> = {
    growing: <span className="text-2xl">🌱</span>,
    flowing: <span className="text-2xl">🌀</span>,
    thriving: <span className="text-2xl">🔥</span>,
    challenged: <span className="text-2xl">🌧️</span>,
    renewing: <span className="text-2xl">🌈</span>,
  }

  const statusDescriptions: Record<FlourishingStatus, string> = {
    growing: "You're developing new skills and perspectives",
    flowing: "You're engaged and in your element",
    thriving: "You're making meaningful progress and contributions",
    challenged: "You're facing obstacles but building resilience",
    renewing: "You're taking time to reflect and recharge",
  }

  const indicatorIcons: Record<FlourishingIndicator, React.ReactNode> = {
    positive_emotion: <HeartIcon className="h-4 w-4 text-rose-500" />,
    engagement: <BrainIcon className="h-4 w-4 text-blue-500" />,
    relationships: <UsersIcon className="h-4 w-4 text-emerald-500" />,
    meaning: <CompassIcon className="h-4 w-4 text-indigo-500" />,
    accomplishment: <TrophyIcon className="h-4 w-4 text-amber-500" />,
    vitality: <ZapIcon className="h-4 w-4 text-orange-500" />,
  }

  const indicatorLabels: Record<FlourishingIndicator, string> = {
    positive_emotion: "Positive Emotion",
    engagement: "Engagement",
    relationships: "Relationships",
    meaning: "Meaning",
    accomplishment: "Accomplishment",
    vitality: "Vitality",
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Flourishing Dashboard</CardTitle>
            <CardDescription>Track your well-being and growth journey</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {statusIcons[flourishingData.status]}
            <Badge variant="outline">
              {flourishingData.status.charAt(0).toUpperCase() + flourishingData.status.slice(1)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{statusDescriptions[flourishingData.status]}</p>

        <Tabs defaultValue="indicators">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="indicators">Well-being</TabsTrigger>
            <TabsTrigger value="strengths">Strengths</TabsTrigger>
            <TabsTrigger value="reflections">Reflections</TabsTrigger>
          </TabsList>

          <TabsContent value="indicators" className="space-y-4 pt-4">
            <PermaBloomVisualization indicators={flourishingData.indicators} />

            <div className="pt-2">
              <h4 className="text-sm font-medium mb-2">Recent Achievements</h4>
              <div className="space-y-2">
                {flourishingData.milestones.slice(0, 2).map((milestone) => (
                  <Card key={milestone.id} className="p-3">
                    <div className="flex items-start gap-2">
                      <TrophyIcon className="h-4 w-4 text-amber-500 mt-0.5" />
                      <div>
                        <h5 className="text-sm font-medium">{milestone.title}</h5>
                        <p className="text-xs text-muted-foreground">{milestone.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="strengths" className="pt-4">
            <div className="grid grid-cols-1 gap-3">
              {flourishingData.strengths.map((strength) => (
                <Card key={strength.strength} className="p-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">
                        {strength.strength
                          .split("_")
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")}
                      </h4>
                      <Badge variant="secondary" className="text-xs">
                        {strength.category.charAt(0).toUpperCase() + strength.category.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-6 h-1.5 rounded-full ${i < strength.level ? "bg-primary" : "bg-muted"}`}
                        />
                      ))}
                    </div>
                    {strength.examples && strength.examples.length > 0 && (
                      <p className="text-xs text-muted-foreground italic">"{strength.examples[0]}"</p>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reflections" className="pt-4">
            <div className="space-y-3">
              {flourishingData.reflections.map((reflection, index) => (
                <Card key={index} className="p-3">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{reflection.prompt}</p>
                    <p className="text-sm italic">"{reflection.response}"</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(reflection.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
