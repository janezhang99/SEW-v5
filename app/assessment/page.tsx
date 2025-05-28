"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const domains = [
  {
    id: "risk-assessment",
    title: "Climate Risk Assessment",
    description: "Identifying and evaluating climate-related risks and vulnerabilities",
    questions: [
      {
        id: "risk-1",
        text: "How comfortable are you with identifying climate hazards relevant to your region?",
      },
      {
        id: "risk-2",
        text: "How experienced are you with vulnerability mapping techniques?",
      },
      {
        id: "risk-3",
        text: "How confident are you in communicating climate risks to stakeholders?",
      },
    ],
  },
  {
    id: "planning",
    title: "Strategic Adaptation Planning",
    description: "Developing plans to address identified climate risks",
    questions: [
      {
        id: "planning-1",
        text: "How experienced are you with setting SMART adaptation goals?",
      },
      {
        id: "planning-2",
        text: "How confident are you in prioritizing adaptation actions?",
      },
      {
        id: "planning-3",
        text: "How familiar are you with adaptation planning frameworks?",
      },
    ],
  },
  {
    id: "options",
    title: "Adaptation Options",
    description: "Identifying and evaluating potential adaptation measures",
    questions: [
      {
        id: "options-1",
        text: "How knowledgeable are you about nature-based solutions?",
      },
      {
        id: "options-2",
        text: "How experienced are you with cost-benefit analysis for adaptation options?",
      },
      {
        id: "options-3",
        text: "How confident are you in selecting appropriate adaptation measures for specific contexts?",
      },
    ],
  },
  {
    id: "implementation",
    title: "Implementation & Operations",
    description: "Putting adaptation plans into action",
    questions: [
      {
        id: "implementation-1",
        text: "How experienced are you with project management for adaptation initiatives?",
      },
      {
        id: "implementation-2",
        text: "How confident are you in securing funding for adaptation projects?",
      },
      {
        id: "implementation-3",
        text: "How familiar are you with stakeholder engagement techniques?",
      },
    ],
  },
  {
    id: "monitoring",
    title: "Monitoring & Learning (MEL)",
    description: "Tracking progress and incorporating lessons learned",
    questions: [
      {
        id: "monitoring-1",
        text: "How experienced are you with developing indicators for adaptation success?",
      },
      {
        id: "monitoring-2",
        text: "How confident are you in designing monitoring systems?",
      },
      {
        id: "monitoring-3",
        text: "How familiar are you with adaptive management principles?",
      },
    ],
  },
  {
    id: "cross-cutting",
    title: "Cross-Cutting Skills",
    description: "Skills that apply across multiple adaptation domains",
    questions: [
      {
        id: "cross-1",
        text: "How experienced are you with integrating equity considerations into adaptation work?",
      },
      {
        id: "cross-2",
        text: "How confident are you in working with indigenous knowledge systems?",
      },
      {
        id: "cross-3",
        text: "How familiar are you with adaptive governance approaches?",
      },
    ],
  },
]

export default function SelfAssessment() {
  const [currentDomain, setCurrentDomain] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [completed, setCompleted] = useState(false)

  const domain = domains[currentDomain]
  const progress = (currentDomain / domains.length) * 100

  const handleNext = () => {
    if (currentDomain < domains.length - 1) {
      setCurrentDomain(currentDomain + 1)
    } else {
      setCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentDomain > 0) {
      setCurrentDomain(currentDomain - 1)
    }
  }

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    })
  }

  const isCurrentDomainComplete = domain?.questions.every((q) => answers[q.id])

  if (completed) {
    return (
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <CardTitle className="text-center text-2xl">Assessment Complete!</CardTitle>
            <CardDescription className="text-center">
              Based on your responses, we've created personalized recommendations for you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">Your Competency Profile</h3>

              {domains.map((domain) => {
                // Calculate average score for domain (1-5)
                const domainQuestions = domain.questions.map((q) => q.id)
                const domainAnswers = domainQuestions.map((id) => Number.parseInt(answers[id] || "0"))
                const avgScore = domainAnswers.reduce((sum, score) => sum + score, 0) / domainQuestions.length

                // Determine level based on average score
                let level = "Beginner"
                if (avgScore >= 4) level = "Advanced"
                else if (avgScore >= 2.5) level = "Intermediate"

                return (
                  <div key={domain.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{domain.title}</span>
                      <Badge
                        variant={level === "Beginner" ? "outline" : level === "Intermediate" ? "secondary" : "default"}
                      >
                        {level}
                      </Badge>
                    </div>
                    <Progress value={avgScore * 20} className="h-2" />
                  </div>
                )
              })}
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Recommended Learning Path</h3>
              <div className="grid gap-4">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">Climate Risk Assessment Fundamentals</CardTitle>
                    <CardDescription>Beginner course - 4 modules</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">Nature-based Solutions Peer Circle</CardTitle>
                    <CardDescription>Join 24 other practitioners</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">Monitoring & Evaluation Workshop</CardTitle>
                    <CardDescription>Virtual event - May 15, 2023</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
            <Button asChild>
              <Link href="/courses">View All Courses</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Self-Assessment</CardTitle>
          <CardDescription>
            Rate your proficiency in each competency area to receive personalized recommendations
          </CardDescription>
          <div className="mt-2">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-1 text-xs text-muted-foreground">
              <span>
                Domain {currentDomain + 1} of {domains.length}
              </span>
              <span>{Math.round(progress)}% complete</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">{domain.title}</h2>
            <p className="text-muted-foreground">{domain.description}</p>
          </div>

          <Separator />

          <div className="space-y-6">
            {domain.questions.map((question) => (
              <div key={question.id} className="space-y-3">
                <Label>{question.text}</Label>
                <RadioGroup
                  value={answers[question.id]}
                  onValueChange={(value) => handleAnswerChange(question.id, value)}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id={`${question.id}-1`} />
                      <Label htmlFor={`${question.id}-1`} className="font-normal">
                        Novice
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id={`${question.id}-2`} />
                      <Label htmlFor={`${question.id}-2`} className="font-normal">
                        Basic
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3" id={`${question.id}-3`} />
                      <Label htmlFor={`${question.id}-3`} className="font-normal">
                        Competent
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4" id={`${question.id}-4`} />
                      <Label htmlFor={`${question.id}-4`} className="font-normal">
                        Proficient
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="5" id={`${question.id}-5`} />
                      <Label htmlFor={`${question.id}-5`} className="font-normal">
                        Expert
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentDomain === 0}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button onClick={handleNext} disabled={!isCurrentDomainComplete}>
            {currentDomain < domains.length - 1 ? (
              <>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              "Complete Assessment"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
