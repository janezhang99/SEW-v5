"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAICompanion } from "../ai-companion-provider"
import { CompassIcon, CheckIcon, XIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ValuesCheckInCardProps {
  title?: string
  task: string
  suggestedValues: string[]
  onAlign?: (aligned: boolean, selectedValues: string[]) => void
  className?: string
}

export function ValuesCheckInCard({
  title = "Values Alignment",
  task,
  suggestedValues,
  onAlign,
  className,
}: ValuesCheckInCardProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const [isAligned, setIsAligned] = useState<boolean | null>(null)
  const { updateIndicator } = useAICompanion()

  const handleValueToggle = (value: string) => {
    setSelectedValues((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]))
  }

  const handleAlignment = (aligned: boolean) => {
    setIsAligned(aligned)

    // Update meaning indicator based on alignment
    updateIndicator("meaning", aligned ? Math.min(10, Math.random() * 2 + 7) : Math.max(3, Math.random() * 2 + 3))

    // Call the onAlign callback if provided
    if (onAlign) {
      onAlign(aligned, selectedValues)
    }
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-100 dark:bg-indigo-900 p-1.5 rounded-md">
            <CompassIcon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription>Does this task align with your values?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-1">Current Task:</p>
          <p className="text-sm break-words">{task}</p>
        </div>

        {isAligned === null ? (
          <>
            <div>
              <p className="text-sm font-medium mb-2">Select values this connects to:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedValues.map((value) => (
                  <Badge
                    key={value}
                    variant={selectedValues.includes(value) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleValueToggle(value)}
                  >
                    {value}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="pt-2 flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => handleAlignment(false)}>
                <XIcon className="h-4 w-4 mr-2" />
                Not Aligned
              </Button>
              <Button
                variant="default"
                className="flex-1"
                onClick={() => handleAlignment(true)}
                disabled={selectedValues.length === 0}
              >
                <CheckIcon className="h-4 w-4 mr-2" />
                Aligned
              </Button>
            </div>
          </>
        ) : (
          <div className="bg-muted p-3 rounded-md">
            <p className="text-sm font-medium mb-1">
              {isAligned ? "This task aligns with your values:" : "This task doesn't strongly align with your values."}
            </p>
            {isAligned && selectedValues.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {selectedValues.map((value) => (
                  <Badge key={value} variant="secondary" className="text-xs">
                    {value}
                  </Badge>
                ))}
              </div>
            )}
            <p className="text-sm mt-2 break-words">
              {isAligned
                ? "When our work aligns with our values, it feels more meaningful and energizing."
                : "Consider if you can reframe this task to connect more with your values, or balance it with more aligned activities."}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
