"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle, ExternalLink, DollarSign, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useTasks } from "@/contexts/tasks-context"

export default function TaskPage() {
  const router = useRouter()
  const params = useParams()
  const { category, taskId } = params as { category: string; taskId: string }

  const { getTaskById, completeTask, completedTaskIds } = useTasks()
  const task = getTaskById(taskId)

  const [reflection, setReflection] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [fundingUnlocked, setFundingUnlocked] = useState(false)
  const [progress, setProgress] = useState(0)

  // Check if task is already completed
  useEffect(() => {
    if (completedTaskIds.includes(taskId)) {
      setIsComplete(true)
      setFundingUnlocked(true)
    }
  }, [completedTaskIds, taskId])

  // If task doesn't exist, show error
  if (!task) {
    return (
      <DashboardShell>
        <div className="flex items-center gap-2 mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/learning">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Learning Journey
            </Link>
          </Button>
        </div>

        <Card>
          <CardContent className="py-8 text-center">
            <h2 className="text-xl font-bold mb-4">Task Not Found</h2>
            <p className="text-muted-foreground mb-4">
              Sorry, we couldn't find the task you're looking for. It may have been removed or the URL might be
              incorrect.
            </p>
            <Button asChild>
              <Link href="/dashboard/learning">Return to Learning Journey</Link>
            </Button>
          </CardContent>
        </Card>
      </DashboardShell>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate submission with progress updates
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 20
      setProgress(currentProgress)

      if (currentProgress >= 100) {
        clearInterval(interval)
        setIsSubmitting(false)
        setIsComplete(true)
        setFundingUnlocked(true)
        completeTask(taskId)
      }
    }, 500)
  }

  // Generate guiding questions based on task category
  const getGuidingQuestions = () => {
    const questionsByCategory: Record<string, string[]> = {
      personal: [
        "What inspired you to start this project?",
        "How does this project connect to your personal experiences or background?",
        "What values or principles are most important to you in this work?",
        "How might this project contribute to your community's wellbeing?",
        "What change do you hope to see as a result of your project?",
      ],
      community: [
        "What specific needs exist in your community that your project addresses?",
        "Who are the stakeholders that would benefit from your project?",
        "What existing community resources could support your project?",
        "What barriers might exist to implementing your project in the community?",
        "How will you measure the community impact of your project?",
      ],
      project: [
        "What are the main goals of your project?",
        "What steps will you need to take to implement your project?",
        "What resources (people, materials, funding) will you need?",
        "What timeline do you envision for your project?",
        "How will you know if your project is successful?",
      ],
      cultural: [
        "How does your project incorporate cultural knowledge or practices?",
        "How might traditional knowledge inform your approach?",
        "How will your project respect and honor cultural protocols?",
        "How might your project strengthen cultural connections?",
        "How will you ensure cultural appropriateness in your work?",
      ],
      business: [
        "Who are your potential customers or users?",
        "What similar initiatives exist, and how is yours different?",
        "What costs will you need to consider for your project?",
        "How might you generate revenue or sustain your project?",
        "What partnerships might strengthen your business model?",
      ],
    }

    return (
      questionsByCategory[task.category] || [
        "What are your goals for this task?",
        "What challenges do you anticipate?",
        "What resources will you need?",
        "How will you measure success?",
        "What's your timeline for completion?",
      ]
    )
  }

  // Generate task importance description based on category
  const getTaskImportance = () => {
    const importanceByCategory: Record<string, string> = {
      personal:
        "Understanding your personal connection to your project helps you stay motivated during challenges and communicate your passion to others. It also ensures your project aligns with your values and the needs of your community.",
      community:
        "Understanding community needs ensures your project addresses real challenges and has meaningful impact. It helps you build support, identify resources, and create something that truly benefits the people you aim to serve.",
      project:
        "A clear project vision helps you stay focused, communicate your ideas effectively, and make decisions that align with your goals. It provides a foundation for all your planning and implementation work.",
      cultural:
        "Connecting your project to cultural values ensures it's relevant, respectful, and meaningful. It helps strengthen cultural identity and ensures your work honors and builds upon traditional knowledge.",
      business:
        "Strong business skills help you create a sustainable project that can grow and thrive. Understanding finances, marketing, and operations ensures you can turn your vision into reality and measure your success.",
    }

    return (
      importanceByCategory[task.category] ||
      "This task is an important step in developing your project and unlocking micro-grant funding. Completing it thoughtfully will help you build skills and move your idea forward."
    )
  }

  return (
    <DashboardShell>
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/learning">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Learning Journey
          </Link>
        </Button>
      </div>

      <DashboardHeader
        heading={
          <div className="flex items-center gap-2">
            {task.icon}
            {task.name}
          </div>
        }
        text={task.description}
      >
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            <span>Funding: ${task.fundingAmount}</span>
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>Est. Time: {task.timeEstimate}</span>
          </Badge>
        </div>
      </DashboardHeader>

      {fundingUnlocked && (
        <Card className="mb-6 bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <DollarSign className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium text-green-800">Funding Unlocked: ${task.fundingAmount}</h3>
                <p className="text-sm text-green-700">
                  Congratulations! You've unlocked funding for your project. This amount has been added to your grant
                  total.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t border-green-200 bg-green-50/50">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/funding">View Your Funding Status</Link>
            </Button>
          </CardFooter>
        </Card>
      )}

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Understanding {task.name}</CardTitle>
          <CardDescription>{task.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <h3 className="font-medium mb-2">Why This Matters</h3>
            <p className="text-sm text-muted-foreground">{getTaskImportance()}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Guiding Questions</h3>
            <ul className="text-sm text-muted-foreground space-y-2 ml-4 list-disc">
              {getGuidingQuestions().map((question, index) => (
                <li key={index}>{question}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2 text-sm text-primary">
            <ExternalLink className="h-4 w-4" />
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:underline">
              View Additional Resources
            </a>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Your Reflection</CardTitle>
            <CardDescription>Take some time to reflect on this task and document your thoughts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reflection">{task.name} Reflection</Label>
                <Textarea
                  id="reflection"
                  placeholder={`Share your thoughts about ${task.name.toLowerCase()}...`}
                  rows={8}
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  disabled={isComplete}
                  className="resize-none"
                />
              </div>

              {isSubmitting && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Submitting...</span>
                    <span className="font-medium">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}

              <div className="rounded-md border p-3 bg-amber-50 border-amber-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-800">Funding Information</h4>
                    <p className="text-sm text-amber-700">
                      Completing this task will unlock ${task.fundingAmount} in micro-grant funding for your project.
                      Your reflection should be at least 200 words to qualify.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-6">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Save Draft
            </Button>
            {isComplete ? (
              <Button variant="default" className="bg-green-600 hover:bg-green-700" disabled>
                <CheckCircle className="mr-2 h-4 w-4" />
                Completed
              </Button>
            ) : (
              <Button type="submit" disabled={!reflection.trim() || reflection.split(" ").length < 50 || isSubmitting}>
                {isSubmitting ? "Submitting..." : "Complete & Unlock Funding"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </form>
    </DashboardShell>
  )
}
