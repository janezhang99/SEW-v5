"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Network, RefreshCw } from "lucide-react"

// Dynamically import components that use AICompanionProvider context
// with ssr: false to prevent them from being rendered during build time
const SystemScanCard = dynamic(
  () => import("@/components/ai-companion/cards/system-scan-card").then((mod) => mod.SystemScanCard),
  { ssr: false },
)

const ProjectPlanningCard = dynamic(
  () => import("@/components/ai-companion/cards/project-planning-card").then((mod) => mod.ProjectPlanningCard),
  { ssr: false },
)

const ReflectionPromptCard = dynamic(
  () => import("@/components/ai-companion/cards/reflection-prompt-card").then((mod) => mod.ReflectionPromptCard),
  { ssr: false },
)

const ResilienceBoostCard = dynamic(
  () => import("@/components/ai-companion/cards/resilience-boost-card").then((mod) => mod.ResilienceBoostCard),
  { ssr: false },
)

const AICompanionButton = dynamic(
  () => import("@/components/ai-companion/ai-companion-button").then((mod) => mod.AICompanionButton),
  { ssr: false },
)

export default function DualFrameworkDemo() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto py-6">
      <PageHeader
        heading="Dual Framework AI Companion"
        description="Explore how the AI Companion integrates individual wellbeing and system-level resilience"
      />

      <div className="mt-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="individual">Individual</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Dual Framework Integration</CardTitle>
                <CardDescription>
                  The AI Companion now integrates two complementary frameworks to support climate adaptation work
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Individual Framework</CardTitle>
                      </div>
                      <CardDescription>Positive Psychology (PERMA, VIA, ACT)</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="ml-6 list-disc space-y-2 text-sm">
                        <li>Supports practitioner wellbeing and flourishing</li>
                        <li>Focuses on strengths, values, and meaning-making</li>
                        <li>Helps prevent burnout and sustain engagement</li>
                        <li>Encourages reflection and personal growth</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Network className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">System Framework</CardTitle>
                      </div>
                      <CardDescription>Ecological & Community Resilience</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="ml-6 list-disc space-y-2 text-sm">
                        <li>Supports project planning and systems thinking</li>
                        <li>Focuses on feedback loops, scales, and connections</li>
                        <li>Helps identify vulnerabilities and build adaptive capacity</li>
                        <li>Encourages holistic and long-term approaches</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="rounded-lg border bg-muted/40 p-4">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-medium">Integration Benefits</h3>
                  </div>
                  <p className="mt-2 text-sm">
                    By integrating these frameworks, the AI Companion can support both the practitioner and their work,
                    recognizing that effective climate adaptation requires attention to both human and system
                    dimensions.
                  </p>
                  <div className="mt-4 flex justify-center">
                    <AICompanionButton />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="individual" className="space-y-6 pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <ReflectionPromptCard />
              <ResilienceBoostCard />
            </div>
            <p className="text-center text-sm text-muted-foreground">
              These cards focus on individual wellbeing, drawing from positive psychology principles.
            </p>
          </TabsContent>

          <TabsContent value="system" className="space-y-6 pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <SystemScanCard />
              <ProjectPlanningCard />
            </div>
            <p className="text-center text-sm text-muted-foreground">
              These cards focus on system-level resilience, drawing from ecological and community resilience frameworks.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
