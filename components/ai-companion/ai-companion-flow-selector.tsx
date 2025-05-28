"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { AICompanionFlow } from "@/types/ai-companion"
import { useAICompanion } from "./ai-companion-provider"
import { BookOpen, FileText, HelpCircle, Lightbulb, Sparkles, Target, Zap } from "lucide-react"

// Flow definitions with icons and descriptions
const flows = [
  {
    id: "grant_readiness" as AICompanionFlow,
    name: "Grant Readiness Coach",
    description: "Get guidance on preparing for climate adaptation grant applications",
    icon: Target,
  },
  {
    id: "course_recommendation" as AICompanionFlow,
    name: "Course Recommender",
    description: "Discover courses tailored to your interests and skill level",
    icon: BookOpen,
  },
  {
    id: "socratic_dialogue" as AICompanionFlow,
    name: "Socratic Dialogue",
    description: "Explore climate adaptation topics through guided questioning",
    icon: HelpCircle,
  },
  {
    id: "onboarding" as AICompanionFlow,
    name: "Platform Onboarding",
    description: "Learn how to get the most out of the CanAdapt platform",
    icon: Sparkles,
  },
  {
    id: "story_support" as AICompanionFlow,
    name: "Story Support",
    description: "Get help crafting and sharing your climate adaptation stories",
    icon: FileText,
  },
  {
    id: "problem_solving" as AICompanionFlow,
    name: "Problem Solver",
    description: "Work through adaptation challenges with structured guidance",
    icon: Lightbulb,
  },
  {
    id: "knowledge_check" as AICompanionFlow,
    name: "Knowledge Check",
    description: "Test your understanding of climate adaptation concepts",
    icon: Zap,
  },
]

export function AICompanionFlowSelector() {
  const { startFlow } = useAICompanion()

  return (
    <ScrollArea className="h-full">
      <div className="p-4">
        <h3 className="text-lg font-medium mb-4">Select an AI Companion Flow</h3>
        <p className="text-muted-foreground mb-6">
          Choose a guided experience to help with specific tasks or learning goals
        </p>

        <div className="grid gap-4">
          {flows.map((flow) => (
            <Card
              key={flow.id}
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => startFlow(flow.id)}
            >
              <CardHeader className="p-4 pb-2 flex flex-row items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-md">
                  <flow.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">{flow.name}</CardTitle>
                  <CardDescription>{flow.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </ScrollArea>
  )
}
