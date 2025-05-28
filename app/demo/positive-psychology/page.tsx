"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AICompanionProvider } from "@/components/ai-companion/ai-companion-provider"
import { ReflectionPromptCard } from "@/components/ai-companion/cards/reflection-prompt-card"
import { ResilienceBoostCard } from "@/components/ai-companion/cards/resilience-boost-card"
import { StrengthsHighlightCard } from "@/components/ai-companion/cards/strengths-highlight-card"
import { ProgressCelebrationCard } from "@/components/ai-companion/cards/progress-celebration-card"
import { FlowCheckInCard } from "@/components/ai-companion/cards/flow-check-in-card"
import { ValuesCheckInCard } from "@/components/ai-companion/cards/values-check-in-card"
import { FlourishingDashboard } from "@/components/ai-companion/flourishing-dashboard"
import { ForestPractitionerFlow } from "@/components/ai-companion/flows/forest-practitioner-flow"

export default function PositivePsychologyDemo() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <AICompanionProvider>
      <div className="container py-6 space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold">AI Companion with Positive Psychology</h1>
          <p className="text-muted-foreground">
            Exploring how positive psychology principles enhance the AI Companion experience
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="cards">Companion Cards</TabsTrigger>
            <TabsTrigger value="flourishing">Flourishing Dashboard</TabsTrigger>
            <TabsTrigger value="journey">Sample Journey</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Positive Psychology in the AI Companion</CardTitle>
                <CardDescription>How we've integrated well-being principles into the CanAdapt platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Key Principles</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Strengths-Based Approach</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          Rather than focusing on deficits, our AI Companion identifies and builds upon user strengths,
                          helping practitioners recognize and leverage their unique capabilities.
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Meaning and Purpose</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          The companion helps users connect their climate adaptation work to their deeper values and
                          sense of purpose, enhancing motivation and resilience.
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Growth Mindset</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          Challenges are framed as opportunities for learning and development, encouraging users to
                          embrace difficulties as part of the adaptation journey.
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Positive Relationships</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          The companion encourages meaningful connections within the community, recognizing that social
                          support is crucial for both well-being and effective climate action.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">PERMA-V Model Integration</h3>
                  <p className="text-sm mb-4">
                    Our approach is based on the PERMA-V model of well-being, which includes:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="bg-rose-50 dark:bg-rose-900/20 p-3 rounded-lg">
                      <h4 className="font-medium">Positive Emotion</h4>
                      <p className="text-sm text-muted-foreground">Celebrating progress and reframing challenges</p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                      <h4 className="font-medium">Engagement</h4>
                      <p className="text-sm text-muted-foreground">Supporting flow states and deep focus</p>
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg">
                      <h4 className="font-medium">Relationships</h4>
                      <p className="text-sm text-muted-foreground">Fostering meaningful community connections</p>
                    </div>
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg">
                      <h4 className="font-medium">Meaning</h4>
                      <p className="text-sm text-muted-foreground">Connecting work to values and purpose</p>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                      <h4 className="font-medium">Accomplishment</h4>
                      <p className="text-sm text-muted-foreground">Recognizing progress and achievements</p>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
                      <h4 className="font-medium">Vitality</h4>
                      <p className="text-sm text-muted-foreground">Supporting energy and sustainable engagement</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Competency Framework Alignment</CardTitle>
                <CardDescription>How positive psychology enhances competency development</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm">
                    The AI Companion's positive psychology approach is aligned with and enhances the CanAdapt Competency
                    Framework in several ways:
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Strengths-Based Learning</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          By identifying user strengths, the companion can recommend competency development pathways
                          that leverage existing capabilities while addressing growth areas.
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Resilience as Meta-Competency</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          Psychological resilience is treated as a meta-competency that enhances all other adaptation
                          competencies, especially in the face of climate challenges.
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Reflective Practice</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          Reflection prompts encourage deeper integration of competencies and help users connect
                          theoretical knowledge with practical application.
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Motivation Enhancement</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          By connecting competency development to personal values and meaning, the companion increases
                          intrinsic motivation for continuous learning.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cards" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <ReflectionPromptCard
                title="Reflection Prompt"
                prompt="What aspects of your climate adaptation work bring you the most meaning or satisfaction?"
                description="Values-based reflection"
              />

              <ResilienceBoostCard
                title="Resilience Boost"
                message="You've made consistent progress on your learning path despite a busy schedule. This persistence is a key strength in climate adaptation work."
                suggestion="Consider sharing one key insight from your recent learning with a colleague or community member to reinforce your understanding."
              />

              <StrengthsHighlightCard
                title="Strength Spotlight"
                strength="curiosity"
                category="wisdom"
                description="Your curiosity drives you to explore diverse perspectives and approaches to climate adaptation. This helps you discover innovative solutions and build a broader knowledge base."
                example="You've explored courses across multiple domains and asked thoughtful questions in discussion forums."
              />

              <ProgressCelebrationCard
                title="Achievement Unlocked"
                achievement="Climate Risk Assessment Certification"
                description="You've completed all modules and assessments for the Climate Risk Assessment certification."
                progress={100}
                badgeLabel="Certification"
              />

              <FlowCheckInCard
                title="Flow Check-In"
                description="How engaged are you feeling with your current work?"
              />

              <ValuesCheckInCard
                title="Values Alignment"
                task="Developing a community vulnerability assessment"
                suggestedValues={["Community", "Equity", "Knowledge", "Resilience", "Sustainability"]}
              />
            </div>
          </TabsContent>

          <TabsContent value="flourishing" className="space-y-4">
            <FlourishingDashboard />

            <Card>
              <CardHeader>
                <CardTitle>About the Flourishing Dashboard</CardTitle>
                <CardDescription>Understanding the well-being indicators and how they're measured</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  The Flourishing Dashboard provides a visual representation of your well-being and growth journey
                  within the CanAdapt platform. It's designed to help you track not just what you're learning, but how
                  you're experiencing your climate adaptation work.
                </p>

                <div>
                  <h3 className="text-base font-medium mb-2">Dashboard Components</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span className="font-medium">Well-being Indicators:</span> Based on the PERMA-V model, these
                      metrics are derived from your interactions, reflections, and self-assessments.
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium">Strengths Profile:</span> Character strengths identified through
                      your activities and reflections, categorized according to the VIA framework.
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium">Reflections Library:</span> A collection of your responses to
                      reflection prompts, helping you track insights and growth over time.
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium">Flourishing Status:</span> A summary indicator of your current
                      well-being state, with visual cues to represent different states.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-base font-medium mb-2">How It's Measured</h3>
                  <p className="text-sm mb-2">
                    The dashboard uses several data sources to generate insights about your well-being:
                  </p>
                  <ul className="space-y-1 text-sm list-disc pl-5">
                    <li>Responses to reflection prompts and check-ins</li>
                    <li>Patterns in your learning activities and content engagement</li>
                    <li>Community interactions and contributions</li>
                    <li>Self-assessments and explicit feedback</li>
                    <li>Progress and achievement patterns</li>
                  </ul>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h3 className="text-base font-medium mb-1">Privacy Note</h3>
                  <p className="text-sm">
                    All flourishing data is private to you by default. You can choose to share specific insights or
                    strengths with the community if you wish, but this is always opt-in.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="journey" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Forest Sector Practitioner Journey</CardTitle>
                <CardDescription>
                  A sample user journey showing positive psychology principles in action
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  This sample journey demonstrates how the AI Companion uses positive psychology principles to support a
                  forest sector practitioner in developing and sharing an adaptation plan.
                </p>

                <ForestPractitionerFlow />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Journey Analysis</CardTitle>
                <CardDescription>How positive psychology principles enhance this user journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-base font-medium mb-2">Principles in Action</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Meaningful Reflection</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          The AI Companion prompts reflection on the community sharing experience, helping the user
                          extract deeper meaning and learning from the process.
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Strengths Recognition</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          The resilience boost card highlights the user's openness and adaptability as strengths,
                          reinforcing positive self-perception and confidence.
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Progress Celebration</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          The journey includes recognition through a badge, celebrating the milestone of sharing work
                          and incorporating feedback.
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Community Connection</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          The journey emphasizes the value of community feedback and collaboration, reinforcing the
                          importance of relationships in adaptation work.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-medium mb-2">Competency Development</h3>
                  <p className="text-sm mb-2">
                    This journey supports the development of several key competencies in the framework:
                  </p>
                  <ul className="space-y-1 text-sm list-disc pl-5">
                    <li>Stakeholder engagement and communication</li>
                    <li>Adaptive management and learning</li>
                    <li>Collaborative leadership</li>
                    <li>Reflective practice</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AICompanionProvider>
  )
}
