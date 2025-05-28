"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { PermaBloomVisualization } from "@/components/ai-companion/perma-bloom-visualization"
import { Label } from "@/components/ui/label"
import type { FlourishingIndicator } from "@/types/ai-companion"

export default function PermaVisualizationDemo() {
  const [indicators, setIndicators] = useState<Record<FlourishingIndicator, number>>({
    positive_emotion: 7,
    engagement: 8,
    relationships: 6,
    meaning: 9,
    accomplishment: 7,
    vitality: 8,
  })

  const handleSliderChange = (indicator: FlourishingIndicator, value: number[]) => {
    setIndicators((prev) => ({
      ...prev,
      [indicator]: value[0],
    }))
  }

  const indicatorLabels: Record<FlourishingIndicator, string> = {
    positive_emotion: "Positive Emotion",
    engagement: "Engagement",
    relationships: "Relationships",
    meaning: "Meaning",
    accomplishment: "Accomplishment",
    vitality: "Vitality",
  }

  const indicatorDescriptions: Record<FlourishingIndicator, string> = {
    positive_emotion: "Experiencing positive feelings like joy, contentment, and hope",
    engagement: "Being absorbed in activities, experiencing flow and focus",
    relationships: "Having supportive, meaningful connections with others",
    meaning: "Feeling that your life and work have purpose and significance",
    accomplishment: "Achieving goals, making progress, and feeling competent",
    vitality: "Having energy, enthusiasm, and aliveness",
  }

  return (
    <div className="container py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">PERMA-V Bloom Visualization</h1>
      <p className="text-muted-foreground mb-8">
        An interactive visualization of the PERMA-V model of well-being, represented as a blooming flower.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Well-being Bloom</CardTitle>
            <CardDescription>Each petal represents one dimension of well-being in the PERMA-V model</CardDescription>
          </CardHeader>
          <CardContent>
            <PermaBloomVisualization indicators={indicators} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Adjust Your Dimensions</CardTitle>
            <CardDescription>Move the sliders to see how your well-being bloom changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(indicators).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor={key}>{indicatorLabels[key as FlourishingIndicator]}</Label>
                    <span className="text-sm text-muted-foreground">{value}/10</span>
                  </div>
                  <Slider
                    id={key}
                    min={1}
                    max={10}
                    step={1}
                    value={[value]}
                    onValueChange={(value) => handleSliderChange(key as FlourishingIndicator, value)}
                  />
                  <p className="text-xs text-muted-foreground">{indicatorDescriptions[key as FlourishingIndicator]}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>About the PERMA-V Model</CardTitle>
          <CardDescription>A framework for understanding and measuring well-being</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            The PERMA-V model, developed by Dr. Martin Seligman and extended with Vitality, identifies six essential
            elements that contribute to human flourishing:
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-4">
              <h3 className="font-medium mb-1">Positive Emotion (P)</h3>
              <p className="text-sm text-muted-foreground">
                Experiencing positive feelings like joy, gratitude, hope, and contentment.
              </p>
            </Card>

            <Card className="p-4">
              <h3 className="font-medium mb-1">Engagement (E)</h3>
              <p className="text-sm text-muted-foreground">
                Being absorbed in activities, experiencing flow, and using your strengths.
              </p>
            </Card>

            <Card className="p-4">
              <h3 className="font-medium mb-1">Relationships (R)</h3>
              <p className="text-sm text-muted-foreground">
                Having supportive, positive connections with others and feeling a sense of belonging.
              </p>
            </Card>

            <Card className="p-4">
              <h3 className="font-medium mb-1">Meaning (M)</h3>
              <p className="text-sm text-muted-foreground">
                Feeling that your life has purpose and that you're connected to something larger than yourself.
              </p>
            </Card>

            <Card className="p-4">
              <h3 className="font-medium mb-1">Accomplishment (A)</h3>
              <p className="text-sm text-muted-foreground">
                Pursuing and achieving goals, developing mastery, and feeling a sense of competence.
              </p>
            </Card>

            <Card className="p-4">
              <h3 className="font-medium mb-1">Vitality (V)</h3>
              <p className="text-sm text-muted-foreground">
                Having physical and mental energy, taking care of your health, and feeling alive.
              </p>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
