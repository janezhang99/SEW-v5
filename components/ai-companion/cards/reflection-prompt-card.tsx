"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useAICompanion } from "../ai-companion-provider"
import { LightbulbIcon } from "lucide-react"

interface ReflectionPromptCardProps {
  title?: string
  prompt: string
  description?: string
  onComplete?: (response: string) => void
  className?: string
}

export function ReflectionPromptCard({
  title = "Reflection Prompt",
  prompt,
  description,
  onComplete,
  className,
}: ReflectionPromptCardProps) {
  const [response, setResponse] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { addReflection, incrementStreak } = useAICompanion()

  const handleSubmit = () => {
    if (!response.trim()) return

    // Save the reflection
    addReflection(prompt, response)

    // Increment reflection streak
    incrementStreak("reflection")

    // Mark as submitted
    setIsSubmitted(true)

    // Call the onComplete callback if provided
    if (onComplete) {
      onComplete(response)
    }
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="bg-amber-100 dark:bg-amber-900 p-1.5 rounded-md">
            <LightbulbIcon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <p className="text-sm font-medium mb-3 break-words">{prompt}</p>
        {isSubmitted ? (
          <div className="bg-muted p-3 rounded-md text-sm italic break-words">{response}</div>
        ) : (
          <Textarea
            placeholder="Share your thoughts..."
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            className="min-h-[100px] w-full"
          />
        )}
      </CardContent>
      {!isSubmitted && (
        <CardFooter>
          <Button onClick={handleSubmit} disabled={!response.trim()}>
            Submit Reflection
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
