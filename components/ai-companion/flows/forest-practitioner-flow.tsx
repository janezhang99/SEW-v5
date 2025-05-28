"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useAICompanion } from "../ai-companion-provider"
import { ResilienceBoostCard } from "../cards/resilience-boost-card"
import { Badge } from "@/components/ui/badge"
import { TreePine, Share2, MessageSquare, Award } from "lucide-react"

interface ForestPractitionerFlowProps {
  className?: string
}

export function ForestPractitionerFlow({ className }: ForestPractitionerFlowProps) {
  const [step, setStep] = useState(1)
  const [planShared, setPlanShared] = useState(false)
  const [reflection, setReflection] = useState("")
  const [showResilienceCard, setShowResilienceCard] = useState(false)
  const { addMilestone } = useAICompanion()

  const handleSharePlan = () => {
    setPlanShared(true)
    setStep(2)
  }

  const handleSubmitReflection = () => {
    if (!reflection.trim()) return

    // Show resilience card after reflection
    setShowResilienceCard(true)

    // Add milestone for completing the reflection
    addMilestone(
      "Forest Adaptation Reflection",
      "You reflected on your forest sector adaptation plan and shared insights with the community.",
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {step === 1 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="bg-emerald-100 dark:bg-emerald-900 p-1.5 rounded-md">
                <TreePine className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <CardTitle>Forest Sector Adaptation Plan</CardTitle>
                <CardDescription>Share your draft plan with the community</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium">Climate-Resilient Forest Management</h3>
                <Badge variant="outline">Draft Plan</Badge>
              </div>
              <p className="text-sm">
                This adaptation plan focuses on increasing forest resilience to climate impacts through species
                diversification, modified harvesting practices, and enhanced monitoring systems.
              </p>
              <div className="bg-muted p-3 rounded-md">
                <p className="text-sm font-medium mb-1">Key Components:</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Climate vulnerability assessment of forest ecosystems</li>
                  <li>Assisted migration of climate-adapted tree species</li>
                  <li>Modified silvicultural practices for increased resilience</li>
                  <li>Enhanced early warning systems for pests and diseases</li>
                  <li>Community engagement and knowledge sharing</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSharePlan} className="w-full">
              <Share2 className="h-4 w-4 mr-2" />
              Share Plan with Community
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="bg-blue-100 dark:bg-blue-900 p-1.5 rounded-md">
                <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle>Reflection Prompt</CardTitle>
                <CardDescription>AI Companion Question</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-3 rounded-md">
              <p className="text-sm italic">
                "What did you learn from putting this adaptation plan out into the community? What insights or
                perspectives emerged that you hadn't considered before?"
              </p>
            </div>
            {!showResilienceCard ? (
              <Textarea
                placeholder="Share your reflections..."
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                className="min-h-[120px]"
              />
            ) : (
              <div className="bg-muted p-3 rounded-md">
                <p className="text-sm italic">"{reflection}"</p>
              </div>
            )}
          </CardContent>
          {!showResilienceCard ? (
            <CardFooter>
              <Button onClick={handleSubmitReflection} disabled={!reflection.trim()} className="w-full">
                Submit Reflection
              </Button>
            </CardFooter>
          ) : null}
        </Card>
      )}

      {showResilienceCard && (
        <ResilienceBoostCard
          title="Resilience Insight"
          message="Your willingness to share your plan and reflect on feedback shows great openness and adaptability - key strengths in climate work."
          suggestion="Consider documenting these community insights as part of your adaptive management process. This creates a valuable record of how your thinking evolved."
        />
      )}

      {showResilienceCard && (
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
              <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-medium">New Badge: Collaborative Adapter</h3>
              <p className="text-sm text-muted-foreground">
                Earned by sharing adaptation plans and incorporating community feedback
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
