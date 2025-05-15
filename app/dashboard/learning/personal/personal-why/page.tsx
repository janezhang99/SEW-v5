"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Heart, ArrowLeft, CheckCircle, ExternalLink, DollarSign, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function PersonalWhyPage() {
  const router = useRouter()
  const [reflection, setReflection] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [fundingUnlocked, setFundingUnlocked] = useState(false)
  const [progress, setProgress] = useState(0)

  const fundingAmount = 100 // Amount in dollars for this task

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
      }
    }, 500)
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
            <Heart className="h-6 w-6 text-primary" />
            Personal Why
          </div>
        }
        text="Reflect on what this project means to you and why you feel connected to it"
      >
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            <span>Funding: ${fundingAmount}</span>
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>Est. Time: 1-2 hours</span>
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
                <h3 className="font-medium text-green-800">Funding Unlocked: ${fundingAmount}</h3>
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
          <CardTitle>Understanding Your Personal Why</CardTitle>
          <CardDescription>
            Connecting your project to your personal values and motivations helps create meaningful and sustainable
            initiatives
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <h3 className="font-medium mb-2">Why This Matters</h3>
            <p className="text-sm text-muted-foreground">
              Understanding your personal connection to your project helps you stay motivated during challenges and
              communicate your passion to others. It also ensures your project aligns with your values and the needs of
              your community.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Guiding Questions</h3>
            <ul className="text-sm text-muted-foreground space-y-2 ml-4 list-disc">
              <li>What inspired you to start this project?</li>
              <li>How does this project connect to your personal experiences or background?</li>
              <li>What values or principles are most important to you in this work?</li>
              <li>How might this project contribute to your community's wellbeing?</li>
              <li>What change do you hope to see as a result of your project?</li>
            </ul>
          </div>

          <div className="flex items-center gap-2 text-sm text-primary">
            <ExternalLink className="h-4 w-4" />
            <a
              href="https://docs.google.com/document/d/1F5GQmfBeC2Rk4RwEZtd8rOx97VW3fLBtkl20-R67mAE/edit?tab=t.0"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              View Additional Resources
            </a>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Your Reflection</CardTitle>
            <CardDescription>Take some time to reflect on your personal connection to this project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reflection">My Personal Why</Label>
                <Textarea
                  id="reflection"
                  placeholder="Write about what this project means to you personally and why you feel connected to it..."
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
                      Completing this task will unlock ${fundingAmount} in micro-grant funding for your project. Your
                      reflection should be at least 200 words to qualify.
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
