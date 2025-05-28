"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, CheckCircle2, Clock, Award, FileText, Calendar } from "lucide-react"
import { AICompanionProgressInsights } from "@/components/ai-companion/ai-companion-progress-insights"
import { AICompanionEmbedded } from "@/components/ai-companion/ai-companion-embedded"

export default function LearningPathPage() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Learning Path</h1>
        <p className="text-muted-foreground">Personalized learning journey based on your goals and interests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="path" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="path">Learning Path</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            <TabsContent value="path" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Personalized Learning Path</CardTitle>
                  <CardDescription>
                    Based on your self-assessment and interests, we've created a customized learning journey for you
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <span className="font-medium">1</span>
                      </div>
                      <h3 className="font-medium">Build Your Foundation</h3>
                    </div>

                    <Card className="border-green-200 dark:border-green-800">
                      <CardHeader className="p-4 pb-2">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-base">Climate Risk Assessment Fundamentals</CardTitle>
                          <Badge
                            variant="outline"
                            className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                          >
                            Completed
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground">
                          Learn the basics of identifying and evaluating climate-related risks and vulnerabilities.
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                        <span className="font-medium">2</span>
                      </div>
                      <h3 className="font-medium">Develop Specialized Skills</h3>
                    </div>

                    <Card className="border-amber-200 dark:border-amber-800">
                      <CardHeader className="p-4 pb-2">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-base">Nature-based Solutions for Climate Adaptation</CardTitle>
                          <Badge
                            variant="outline"
                            className="bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                          >
                            In Progress
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground">
                          Explore how natural systems can be leveraged to build resilience to climate impacts.
                        </p>
                        <div className="mt-4">
                          <Progress value={75} className="h-2 mb-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Module 3 of 4</span>
                            <span>75% Complete</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button className="w-full">Continue Learning</Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-base">Advanced Vulnerability Mapping</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground">
                          Master techniques for detailed vulnerability mapping across different sectors and regions.
                        </p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button variant="outline" className="w-full">
                          Enroll
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <span className="font-medium">3</span>
                      </div>
                      <h3 className="font-medium">Apply Your Knowledge</h3>
                    </div>

                    <Card>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-base">Adaptation Project Management</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground">
                          Learn effective project management techniques specific to climate adaptation initiatives.
                        </p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button variant="outline" className="w-full">
                          Enroll
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="progress" className="mt-6 space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Learning Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Overall Progress</h3>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Climate Adaptation Competency</span>
                          <span>Intermediate (Level 2)</span>
                        </div>
                        <Progress value={62} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          You're making good progress! Complete 2 more courses to reach Advanced level.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Domain Progress</h3>
                      <div className="grid gap-3">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Climate Risk Assessment</span>
                            <span>65%</span>
                          </div>
                          <Progress value={65} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Strategic Adaptation Planning</span>
                            <span>42%</span>
                          </div>
                          <Progress value={42} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Adaptation Options</span>
                            <span>75%</span>
                          </div>
                          <Progress value={75} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Implementation & Operations</span>
                            <span>28%</span>
                          </div>
                          <Progress value={28} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Monitoring & Evaluation</span>
                            <span>88%</span>
                          </div>
                          <Progress value={88} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Cross-Cutting Skills</span>
                            <span>50%</span>
                          </div>
                          <Progress value={50} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Current Courses</h3>
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-base">Nature-based Solutions for Climate Adaptation</CardTitle>
                      <Badge>75% Complete</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <Progress value={75} className="h-2 mb-4" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>6 hours total</span>
                      </div>
                      <div>Module 3 of 4</div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full">Continue Learning</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-base">Equity in Climate Adaptation</CardTitle>
                      <Badge>25% Complete</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <Progress value={25} className="h-2 mb-4" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>3 hours total</span>
                      </div>
                      <div>Module 1 of 4</div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full">Continue Learning</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Achievements</CardTitle>
                  <CardDescription>Badges, certificates, and milestones you've earned</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Badges Earned</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                          <Award className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                        </div>
                        <span className="text-sm mt-2">MEL Pro</span>
                        <span className="text-xs text-muted-foreground">Earned Apr 2023</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                          <FileText className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <span className="text-sm mt-2">Planner</span>
                        <span className="text-xs text-muted-foreground">Earned Mar 2023</span>
                      </div>
                      <div className="flex flex-col items-center opacity-40">
                        <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-sm mt-2">Risk Analyst</span>
                        <span className="text-xs text-muted-foreground">75% Complete</span>
                      </div>
                      <div className="flex flex-col items-center opacity-40">
                        <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                          <Calendar className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                        </div>
                        <span className="text-sm mt-2">Networker</span>
                        <span className="text-xs text-muted-foreground">50% Complete</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Certificates</h3>
                    <div className="space-y-2">
                      <Card>
                        <div className="p-4 flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            <div>
                              <h4 className="font-medium">Climate Risk Assessment Fundamentals</h4>
                              <p className="text-sm text-muted-foreground">Completed on April 15, 2023</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>
                      </Card>

                      <Card>
                        <div className="p-4 flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            <div>
                              <h4 className="font-medium">Designing Effective Monitoring Systems</h4>
                              <p className="text-sm text-muted-foreground">Completed on March 2, 2023</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>
                      </Card>

                      <Card>
                        <div className="p-4 flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            <div>
                              <h4 className="font-medium">Setting SMART Adaptation Goals</h4>
                              <p className="text-sm text-muted-foreground">Completed on January 20, 2023</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>
                      </Card>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Milestones</h3>
                    <div className="space-y-2">
                      <Card>
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-1">
                            <Award className="h-4 w-4 text-amber-500" />
                            <h4 className="font-medium">Joined the CanAdapt Community</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">January 10, 2023</p>
                        </div>
                      </Card>

                      <Card>
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-1">
                            <Award className="h-4 w-4 text-amber-500" />
                            <h4 className="font-medium">Completed First Course</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">January 20, 2023</p>
                        </div>
                      </Card>

                      <Card>
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-1">
                            <Award className="h-4 w-4 text-amber-500" />
                            <h4 className="font-medium">Shared First Community Story</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">March 10, 2023</p>
                        </div>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <AICompanionProgressInsights />

          <AICompanionEmbedded
            title="Learning Path Assistant"
            description="Get personalized guidance for your learning journey"
            flow="course_recommendation"
            contextualPrompt="What skills would you like to develop next?"
          />

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recommended Events</CardTitle>
              <CardDescription>Upcoming events aligned with your learning path</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">Nature-based Solutions Workshop</CardTitle>
                  <CardDescription>May 15, 2023 • Virtual</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground">
                    A hands-on workshop exploring successful nature-based adaptation projects.
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button variant="outline" className="w-full">
                    Register
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">Climate Risk Assessment Conference</CardTitle>
                  <CardDescription>June 10-12, 2023 • Toronto, Canada</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground">
                    Annual conference bringing together experts in climate risk assessment.
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button variant="outline" className="w-full">
                    Register
                  </Button>
                </CardFooter>
              </Card>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
