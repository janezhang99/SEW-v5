"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Award, Clock, Settings, Edit, BookOpen, TrendingUp } from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { AICompanionProvider } from "@/components/ai-companion/ai-companion-provider"
import { FlourishingDashboardWrapper } from "@/components/profile/flourishing-dashboard-wrapper"

export default function ProfilePage() {
  return (
    <AICompanionProvider>
      <div className="space-y-6">
        <PageHeader title="User Profile" description="Manage your profile and learning journey">
          <div className="flex justify-center mt-4 gap-4">
            <Button variant="outline" className="bg-black/20 hover:bg-black/30 border-white/20">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
            <Button variant="outline" className="bg-black/20 hover:bg-black/30 border-white/20" asChild>
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
          </div>
        </PageHeader>

        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/diverse-group.png" alt="Profile" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-xl font-bold">Jane Doe</h2>
                      <p className="text-muted-foreground">Climate Adaptation Specialist</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="outline">Risk Assessment</Badge>
                        <Badge variant="outline">Monitoring</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Skills Overview</h3>
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Risk Assessment</span>
                            <span>Intermediate</span>
                          </div>
                          <Progress value={60} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Monitoring & Evaluation</span>
                            <span>Advanced</span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-full bg-amber-100 dark:bg-amber-900">
                          <Award className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        </div>
                        <span className="text-sm">2 Badges Earned</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        View All
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-full bg-green-100 dark:bg-green-900">
                          <BookOpen className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-sm">3 Courses Completed</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        View All
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-full bg-blue-100 dark:bg-blue-900">
                          <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-sm">42% Overall Progress</span>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/assessment">Retake Assessment</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:w-2/3">
              <Tabs defaultValue="learning-path" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="learning-path">Learning Path</TabsTrigger>
                  <TabsTrigger value="contributions">Contributions</TabsTrigger>
                  <TabsTrigger value="flourishing">Flourishing</TabsTrigger>
                </TabsList>

                <TabsContent value="learning-path" className="mt-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Your Learning Path</CardTitle>
                          <CardDescription>Personalized learning journey based on your assessment</CardDescription>
                        </div>
                        <Button variant="outline" size="sm">
                          View Full Plan
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Current Course */}
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          Currently Learning
                        </h3>
                        <Card>
                          <CardHeader className="p-4 pb-2">
                            <div className="flex justify-between">
                              <CardTitle className="text-base">Nature-based Solutions for Climate Adaptation</CardTitle>
                              <Badge>75% Complete</Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <Progress value={75} className="h-2 mb-2" />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Module 3 of 4</span>
                              <span>6 hours total</span>
                            </div>
                          </CardContent>
                          <CardFooter className="p-4 pt-0">
                            <Button className="w-full">Continue Learning</Button>
                          </CardFooter>
                        </Card>
                      </div>

                      {/* Next Steps */}
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          Recommended Next Steps
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card>
                            <div className="p-4">
                              <h4 className="font-medium">Advanced Vulnerability Mapping</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                Master techniques for detailed vulnerability mapping.
                              </p>
                              <Button variant="outline" size="sm" className="mt-3 w-full">
                                Enroll
                              </Button>
                            </div>
                          </Card>
                          <Card>
                            <div className="p-4">
                              <h4 className="font-medium">Climate Risk Assessment Conference</h4>
                              <p className="text-sm text-muted-foreground mt-1">June 10-12, 2023 • Toronto, Canada</p>
                              <Button variant="outline" size="sm" className="mt-3 w-full">
                                Register
                              </Button>
                            </div>
                          </Card>
                        </div>
                      </div>

                      {/* AI Insight */}
                      <Card className="bg-primary/5 border-primary/20">
                        <CardContent className="p-4">
                          <div className="flex gap-3">
                            <div className="bg-primary/10 p-1.5 h-fit rounded-md">
                              <TrendingUp className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <h3 className="text-sm font-medium">Learning Insight</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                Based on your progress, focusing on vulnerability mapping will help you advance in risk
                                assessment. At your current pace, you'll earn the "Risk Assessment Expert" badge in
                                approximately 3 weeks.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="contributions" className="mt-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Your Contributions</CardTitle>
                          <CardDescription>
                            Case studies and discussions you've shared with the community
                          </CardDescription>
                        </div>
                        <Button>Share a New Story</Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Card>
                        <div className="p-4">
                          <div className="flex justify-between mb-2">
                            <h4 className="font-medium">Municipal Flood Adaptation Plan</h4>
                            <Badge variant="outline">Case Study</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            A case study on developing and implementing a municipal flood adaptation plan in a coastal
                            community.
                          </p>
                          <div className="flex flex-wrap gap-1 mt-3">
                            <Badge variant="secondary" className="text-xs">
                              #riskmapping
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              #planning
                            </Badge>
                          </div>
                        </div>
                      </Card>

                      <Card>
                        <div className="p-4">
                          <div className="flex justify-between mb-2">
                            <h4 className="font-medium">
                              Best practices for community engagement in adaptation planning
                            </h4>
                            <span className="text-xs text-muted-foreground">2 days ago</span>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            I've found that starting with small focus groups before larger town halls helps build
                            momentum and identify key concerns...
                          </p>
                          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                            <span>3 replies</span>
                            <span>•</span>
                            <span>5 likes</span>
                          </div>
                        </div>
                      </Card>

                      <div className="flex justify-center">
                        <Button variant="outline" asChild>
                          <Link href="/discussions">View All Discussions</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="flourishing" className="mt-6">
                  <FlourishingDashboardWrapper />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </AICompanionProvider>
  )
}
