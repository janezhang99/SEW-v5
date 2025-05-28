"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAICompanion } from "../ai-companion-provider"
import { StarIcon, PlusIcon, CheckIcon } from "lucide-react"
import { useState } from "react"
import type { VIAStrength, StrengthCategory } from "@/types/ai-companion"

interface StrengthsHighlightCardProps {
  title?: string
  strength: VIAStrength
  category?: StrengthCategory
  description: string
  example?: string
  onAcknowledge?: () => void
  className?: string
}

export function StrengthsHighlightCard({
  title = "Strength Spotlight",
  strength,
  category,
  description,
  example,
  onAcknowledge,
  className,
}: StrengthsHighlightCardProps) {
  const [acknowledged, setAcknowledged] = useState(false)
  const { addStrength } = useAICompanion()

  const strengthNames: Record<VIAStrength, string> = {
    creativity: "Creativity",
    curiosity: "Curiosity",
    judgment: "Critical Thinking",
    love_of_learning: "Love of Learning",
    perspective: "Perspective",
    bravery: "Bravery",
    perseverance: "Perseverance",
    honesty: "Honesty",
    zest: "Zest",
    love: "Love",
    kindness: "Kindness",
    social_intelligence: "Social Intelligence",
    teamwork: "Teamwork",
    fairness: "Fairness",
    leadership: "Leadership",
    forgiveness: "Forgiveness",
    humility: "Humility",
    prudence: "Prudence",
    self_regulation: "Self-Regulation",
    appreciation: "Appreciation of Beauty",
    gratitude: "Gratitude",
    hope: "Hope",
    humor: "Humor",
    spirituality: "Spirituality",
  }

  const categoryColors: Record<StrengthCategory, string> = {
    wisdom: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    courage: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
    humanity: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300",
    justice: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
    temperance: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    transcendence: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  }

  const handleAcknowledge = () => {
    // Add or update the strength
    addStrength({
      strength,
      category: category || "wisdom", // Default to wisdom if category is undefined
      level: 4, // Default level
      examples: example ? [example] : undefined,
      lastObserved: new Date().toISOString(),
    })

    setAcknowledged(true)

    // Call the onAcknowledge callback if provided
    if (onAcknowledge) {
      onAcknowledge()
    }
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="bg-yellow-100 dark:bg-yellow-900 p-1.5 rounded-md">
            <StarIcon className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Badge
            className={
              category ? categoryColors[category] : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
            }
            variant="secondary"
          >
            {category ? category.charAt(0).toUpperCase() + category.slice(1) : "Uncategorized"}
          </Badge>
          <CardDescription>Character Strength</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">{strengthNames[strength]}</h3>
        </div>
        <p className="text-sm break-words">{description}</p>
        {example && (
          <div className="bg-muted p-3 rounded-md">
            <p className="text-sm font-medium mb-1">Example from your work:</p>
            <p className="text-sm italic break-words">{example}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {acknowledged ? (
          <Button variant="outline" className="w-full" disabled>
            <CheckIcon className="h-4 w-4 mr-2" />
            Added to Your Strengths
          </Button>
        ) : (
          <Button variant="default" className="w-full" onClick={handleAcknowledge}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Add to My Strengths
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
