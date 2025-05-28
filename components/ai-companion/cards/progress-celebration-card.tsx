"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAICompanion } from "../ai-companion-provider"
import { TrophyIcon, ShareIcon, CheckCircleIcon } from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface ProgressCelebrationCardProps {
  title?: string
  achievement: string
  description: string
  progress?: number
  badgeLabel?: string
  onShare?: () => void
  className?: string
}

export function ProgressCelebrationCard({
  title = "Achievement Unlocked",
  achievement,
  description,
  progress,
  badgeLabel,
  onShare,
  className,
}: ProgressCelebrationCardProps) {
  const [shared, setShared] = useState(false)
  const { addMilestone, updateIndicator } = useAICompanion()

  const handleShare = () => {
    // Mark as shared
    setShared(true)

    // Add milestone if not already added
    addMilestone(achievement, description)

    // Increase accomplishment indicator
    updateIndicator("accomplishment", Math.min(10, Math.random() * 2 + 8))

    // Call the onShare callback if provided
    if (onShare) {
      onShare()
    }
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="bg-green-100 dark:bg-green-900 p-1.5 rounded-md">
            <TrophyIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription>Congratulations on your progress!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold break-words">{achievement}</h3>
          {badgeLabel && (
            <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
              {badgeLabel}
            </Badge>
          )}
        </div>
        <p className="text-sm break-words">{description}</p>
        {typeof progress === "number" && (
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0" />
          <span>Added to your achievements</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={handleShare} disabled={shared}>
          <ShareIcon className="h-4 w-4 mr-2" />
          {shared ? "Shared with Community" : "Share Achievement"}
        </Button>
      </CardFooter>
    </Card>
  )
}
