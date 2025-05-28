"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAICompanion } from "../ai-companion-provider"
import { HeartIcon, ThumbsUpIcon, BookmarkIcon } from "lucide-react"

interface ResilienceBoostCardProps {
  title?: string
  message: string
  description?: string
  suggestion?: string
  onSave?: () => void
  className?: string
}

export function ResilienceBoostCard({
  title = "Resilience Boost",
  message,
  description,
  suggestion,
  onSave,
  className,
}: ResilienceBoostCardProps) {
  const { updateIndicator } = useAICompanion()

  const handleSave = () => {
    // Increase positive emotion indicator
    updateIndicator("positive_emotion", Math.min(10, Math.random() * 2 + 7))

    // Call the onSave callback if provided
    if (onSave) {
      onSave()
    }
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="bg-rose-100 dark:bg-rose-900 p-1.5 rounded-md">
            <HeartIcon className="h-4 w-4 text-rose-600 dark:text-rose-400" />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm break-words">{message}</p>
        {suggestion && (
          <div className="bg-muted p-3 rounded-md">
            <p className="text-sm font-medium mb-1">Suggestion:</p>
            <p className="text-sm break-words">{suggestion}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm">
          <ThumbsUpIcon className="h-4 w-4 mr-2" />
          Helpful
        </Button>
        <Button variant="outline" size="sm" onClick={handleSave}>
          <BookmarkIcon className="h-4 w-4 mr-2" />
          Save
        </Button>
      </CardFooter>
    </Card>
  )
}
