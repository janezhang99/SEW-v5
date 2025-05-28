"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAICompanion } from "./ai-companion-provider"
import { ReflectionPromptCard } from "./cards/reflection-prompt-card"
import { ResilienceBoostCard } from "./cards/resilience-boost-card"
import { StrengthsHighlightCard } from "./cards/strengths-highlight-card"
import { ProgressCelebrationCard } from "./cards/progress-celebration-card"
import { FlowCheckInCard } from "./cards/flow-check-in-card"
import { ValuesCheckInCard } from "./cards/values-check-in-card"
import { SystemScanCard } from "./cards/system-scan-card"
import { ProjectPlanningCard } from "./cards/project-planning-card"
import { Button } from "@/components/ui/button"
import { User, Network } from "lucide-react"
import type { CompanionCardType } from "@/types/ai-companion"

interface AICompanionCardsProps {
  className?: string
}

export function AICompanionCards({ className }: AICompanionCardsProps) {
  const { cards, removeCard, currentFramework, toggleFramework } = useAICompanion()
  const [activeTab, setActiveTab] = useState<"individual" | "system">(
    currentFramework === "system" ? "system" : "individual",
  )

  const handleTabChange = (value: string) => {
    setActiveTab(value as "individual" | "system")
    if (value === "individual" && currentFramework === "system") {
      toggleFramework()
    } else if (value === "system" && currentFramework === "individual") {
      toggleFramework()
    }
  }

  // Sample cards for demonstration
  const sampleCards = [
    {
      type: "reflection_prompt" as CompanionCardType,
      title: "Reflection Prompt",
      content: "What motivated you to work on climate adaptation?",
      framework: "individual" as const,
      metadata: {
        prompt: "What motivated you to work on climate adaptation?",
      },
    },
    {
      type: "resilience_boost" as CompanionCardType,
      title: "Resilience Boost",
      content: "You've shown great persistence in completing your learning modules despite a busy schedule.",
      framework: "individual" as const,
      metadata: {
        message: "You've shown great persistence in completing your learning modules despite a busy schedule.",
        suggestion: "Consider celebrating small wins by sharing your progress with peers in the community.",
      },
    },
    {
      type: "strengths_highlight" as CompanionCardType,
      title: "Strength Spotlight",
      content: "Your curiosity stands out in how you explore diverse adaptation approaches.",
      framework: "individual" as const,
      metadata: {
        strength: "curiosity",
        category: "wisdom",
        description:
          "Your curiosity drives you to explore diverse perspectives and approaches to climate adaptation. This helps you discover innovative solutions and build a broader knowledge base.",
        example: "You've explored courses across multiple domains and asked thoughtful questions in discussion forums.",
      },
    },
  ]

  // Combine real cards with sample cards for demonstration
  const allCards = [...cards, ...sampleCards]

  return (
    <div className={`space-y-4 w-full max-w-full ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Companion Cards</h3>
        <Button variant="outline" size="sm" onClick={toggleFramework}>
          {currentFramework === "individual" ? (
            <User className="mr-2 h-4 w-4" />
          ) : currentFramework === "system" ? (
            <Network className="mr-2 h-4 w-4" />
          ) : (
            <>
              <User className="mr-1 h-4 w-4" />
              <Network className="mr-2 h-4 w-4" />
            </>
          )}
          {currentFramework === "individual" ? "Individual" : currentFramework === "system" ? "System" : "Integrated"}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="individual" className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>Individual</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-1">
            <Network className="h-4 w-4" />
            <span>System</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="individual" className="space-y-4 pt-4">
          {allCards
            .filter((card) => card.framework === "individual" || card.framework === "integrated")
            .map((card, index) => {
              switch (card.type) {
                case "reflection_prompt":
                  return (
                    <ReflectionPromptCard
                      key={`reflection-${index}`}
                      title={card.title}
                      prompt={card.metadata?.prompt || card.content}
                      onComplete={() => removeCard(index)}
                      className="w-full max-w-full"
                    />
                  )
                case "resilience_boost":
                  return (
                    <ResilienceBoostCard
                      key={`resilience-${index}`}
                      title={card.title}
                      message={card.metadata?.message || card.content}
                      suggestion={card.metadata?.suggestion}
                      onSave={() => removeCard(index)}
                      className="w-full max-w-full"
                    />
                  )
                case "strengths_highlight":
                  return (
                    <StrengthsHighlightCard
                      key={`strength-${index}`}
                      title={card.title}
                      strength={card.metadata?.strength || "curiosity"}
                      category={card.metadata?.category}
                      description={card.metadata?.description || card.content}
                      example={card.metadata?.example}
                      onAcknowledge={() => removeCard(index)}
                      className="w-full max-w-full"
                    />
                  )
                case "progress_celebration":
                  return (
                    <ProgressCelebrationCard
                      key={`progress-${index}`}
                      title={card.title}
                      achievement={card.metadata?.achievement || "Milestone Reached"}
                      description={card.metadata?.description || card.content}
                      progress={card.metadata?.progress}
                      badgeLabel={card.metadata?.badgeLabel}
                      onShare={() => removeCard(index)}
                      className="w-full max-w-full"
                    />
                  )
                case "flow_check":
                  return (
                    <FlowCheckInCard
                      key={`flow-${index}`}
                      title={card.title}
                      description={card.metadata?.description || "How engaged are you feeling with your current work?"}
                      onComplete={() => removeCard(index)}
                      className="w-full max-w-full"
                    />
                  )
                case "values_check":
                  return (
                    <ValuesCheckInCard
                      key={`values-${index}`}
                      title={card.title}
                      task={card.metadata?.task || "Current task"}
                      suggestedValues={
                        card.metadata?.suggestedValues || [
                          "Community",
                          "Resilience",
                          "Innovation",
                          "Equity",
                          "Sustainability",
                        ]
                      }
                      onAlign={() => removeCard(index)}
                      className="w-full max-w-full"
                    />
                  )
                default:
                  return null
              }
            })}

          {/* Default cards when no cards are available */}
          {allCards.filter((card) => card.framework === "individual" || card.framework === "integrated").length ===
            0 && (
            <>
              <ReflectionPromptCard
                title="Reflection Prompt"
                prompt="What motivated you to work on climate adaptation?"
                className="w-full max-w-full"
              />
              <StrengthsHighlightCard
                title="Strength Spotlight"
                strength="curiosity"
                category="wisdom"
                description="Your curiosity drives you to explore diverse perspectives and approaches to climate adaptation. This helps you discover innovative solutions and build a broader knowledge base."
                example="You've explored courses across multiple domains and asked thoughtful questions in discussion forums."
                className="w-full max-w-full"
              />
            </>
          )}
        </TabsContent>

        <TabsContent value="system" className="space-y-4 pt-4">
          {allCards
            .filter((card) => card.framework === "system" || card.framework === "integrated")
            .map((card, index) => {
              // Render system cards here
              return null
            })}

          {/* Default system cards */}
          <SystemScanCard className="w-full max-w-full" />
          <ProjectPlanningCard className="w-full max-w-full" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
