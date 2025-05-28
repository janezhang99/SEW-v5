import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, FileText, Users, ArrowRight, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { AICompanionEmbedded } from "@/components/ai-companion/ai-companion-embedded"

export default function MonitoringLearningPage() {
  return (
    <>
      <PageHeader title="Monitoring & Learning (MEL)" description="Tracking progress and incorporating lessons learned">
        <div className="flex justify-center mt-6">
          <div className="bg-white/90 text-black rounded-full px-4 py-1 text-sm flex items-center">
            <LineChart className="h-4 w-4 mr-2 text-primary" />
            <span>Competency Domain 5</span>
          </div>
        </div>
      </PageHeader>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Domain Overview</CardTitle>
                <CardDescription>Understanding monitoring, evaluation, and learning in adaptation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Monitoring & Learning (MEL) focuses on tracking the implementation and outcomes of adaptation
                  initiatives, evaluating their effectiveness, and using this information to improve future actions.
                  This domain is essential for adaptive management and continuous improvement in climate adaptation.
                </p>

                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=800&query=monitoring evaluation dashboard climate data visualization"
                    alt="Monitoring and Evaluation Dashboard"
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="text-lg font-medium mt-4">Key Components</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base">Monitoring</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">
                        The systematic collection of data on specified indicators to track progress of adaptation
                        initiatives and assess the achievement of objectives.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base">Evaluation</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">
                        The systematic assessment of an adaptation initiative's design, implementation, and results to
                        determine relevance, effectiveness, efficiency, impact, and sustainability.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base">Learning</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">
                        The process of reflecting on monitoring and evaluation findings to generate insights, adjust
                        approaches, and improve future adaptation actions.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base">Adaptive Management</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">
                        A structured, iterative process of decision-making that uses monitoring and evaluation results
                        to adjust strategies and actions in the face of uncertainty.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <h3 className="text-lg font-medium mt-4">Challenges and Considerations</h3>
                <p>Monitoring and evaluating climate adaptation presents unique challenges:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Long time horizons for observing adaptation outcomes</li>
                  <li>Attribution challenges in complex systems</li>
                  <li>Shifting baselines due to changing climate conditions</li>
                  <li>Balancing process and outcome indicators</li>
                  <li>Integrating quantitative and qualitative approaches</li>
                  <li>Addressing equity considerations in monitoring and evaluation</li>
                  <li>Developing appropriate indicators for adaptation success</li>
                </ul>
              </CardContent>
            </Card>

            <Tabs defaultValue="courses">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="courses">Related Courses</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="tools">Tools & Methods</TabsTrigger>
              </TabsList>

              <TabsContent value="courses" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <div className="aspect-video relative">
                      <Image
                        src="/monitoring-systems.png"
                        alt="Designing Effective Monitoring Systems"
                        fill
                        className="object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-2 right-2">Intermediate</Badge>
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base">Designing Effective Monitoring Systems</CardTitle>
                      <CardDescription>Learn to develop robust monitoring frameworks for adaptation</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <FileText className="mr-1 h-4 w-4" />
                        <span>5 modules</span>
                        <span className="mx-2">•</span>
                        <span>6 hours</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full">Enroll Now</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <div className="aspect-video relative">
                      <Image
                        src="/placeholder.svg?height=200&width=400&query=indicators climate adaptation success metrics"
                        alt="Developing Adaptation Indicators"
                        fill
                        className="object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-2 right-2">Intermediate</Badge>
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base">Developing Adaptation Indicators</CardTitle>
                      <CardDescription>Learn to create meaningful indicators for adaptation success</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <FileText className="mr-1 h-4 w-4" />
                        <span>4 modules</span>
                        <span className="mx-2">•</span>
                        <span>5 hours</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full">Enroll Now</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <div className="aspect-video relative">
                      <Image
                        src="/placeholder.svg?height=200&width=400&query=adaptive management climate change decision making"
                        alt="Adaptive Management Principles"
                        fill
                        className="object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-2 right-2">Advanced</Badge>
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base">Adaptive Management Principles</CardTitle>
                      <CardDescription>
                        Master the principles of adaptive management for climate adaptation
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <FileText className="mr-1 h-4 w-4" />
                        <span>6 modules</span>
                        <span className="mx-2">•</span>
                        <span>8 hours</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full">Enroll Now</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <div className="aspect-video relative">
                      <Image
                        src="/placeholder.svg?height=200&width=400&query=participatory monitoring evaluation community engagement"
                        alt="Participatory Monitoring & Evaluation"
                        fill
                        className="object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-2 right-2">Intermediate</Badge>
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base">Participatory Monitoring & Evaluation</CardTitle>
                      <CardDescription>Engage communities in monitoring adaptation initiatives</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <FileText className="mr-1 h-4 w-4" />
                        <span>5 modules</span>
                        <span className="mx-2">•</span>
                        <span>7 hours</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full">Enroll Now</Button>
                    </CardFooter>
                  </Card>
                </div>

                <div className="flex justify-center mt-6">
                  <Button variant="outline" asChild>
                    <Link href="/courses?domain=Monitoring%20%26%20Learning">
                      View All Monitoring & Learning Courses
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="resources" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base">Adaptation Monitoring & Evaluation Toolkit</CardTitle>
                        <Badge variant="outline">PDF</Badge>
                      </div>
                      <CardDescription>Comprehensive guide to monitoring adaptation initiatives</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground mb-4">
                        A toolkit providing frameworks, methods, and tools for designing and implementing monitoring and
                        evaluation systems for climate adaptation initiatives.
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <FileText className="mr-1 h-4 w-4" />
                        <span>52 pages</span>
                        <span className="mx-2">•</span>
                        <span>215 downloads</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full">Download</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base">Adaptation Indicators Database</CardTitle>
                        <Badge variant="outline">Web Tool</Badge>
                      </div>
                      <CardDescription>Searchable database of adaptation indicators</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground mb-4">
                        Access a comprehensive database of indicators for monitoring and evaluating climate adaptation
                        initiatives across different sectors and scales.
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="mr-1 h-4 w-4" />
                        <span>168 active users</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full">Access Database</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base">MEL Case Studies Collection</CardTitle>
                        <Badge variant="outline">PDF Collection</Badge>
                      </div>
                      <CardDescription>Real-world examples of monitoring and evaluation</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground mb-4">
                        A collection of case studies showcasing effective monitoring, evaluation, and learning
                        approaches in climate adaptation initiatives, with lessons learned and best practices.
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <FileText className="mr-1 h-4 w-4" />
                        <span>15 case studies</span>
                        <span className="mx-2">•</span>
                        <span>178 downloads</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full">Download</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base">Adaptation Learning Webinar Series</CardTitle>
                        <Badge variant="outline">Video</Badge>
                      </div>
                      <CardDescription>Expert presentations on monitoring and learning</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground mb-4">
                        A series of recorded webinars featuring experts discussing various aspects of monitoring,
                        evaluation, and learning in climate adaptation.
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <FileText className="mr-1 h-4 w-4" />
                        <span>7 videos</span>
                        <span className="mx-2">•</span>
                        <span>9 hours total</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full">Watch Series</Button>
                    </CardFooter>
                  </Card>
                </div>

                <div className="flex justify-center mt-6">
                  <Button variant="outline" asChild>
                    <Link href="/resources?domain=Monitoring%20%26%20Learning">
                      View All Monitoring & Learning Resources
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="tools" className="mt-6">
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Monitoring & Evaluation Frameworks</CardTitle>
                      <CardDescription>Common frameworks for adaptation MEL</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-base font-medium">Results-Based Management (RBM)</h3>
                        <p className="text-sm text-muted-foreground">
                          A management strategy that focuses on performance and achievement of outputs, outcomes, and
                          impacts. RBM provides a structured approach to monitoring and evaluating adaptation
                          initiatives based on a clear results chain.
                        </p>
                        <div className="flex items-center mt-2">
                          <Button variant="outline" size="sm">
                            Download RBM Guide
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2 pt-2">
                        <h3 className="text-base font-medium">Developmental Evaluation</h3>
                        <p className="text-sm text-muted-foreground">
                          An evaluation approach suited for complex, dynamic environments where innovation and
                          adaptation are ongoing. It provides real-time feedback to inform adaptive management in
                          uncertain contexts.
                        </p>
                        <div className="flex items-center mt-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href="#" target="_blank" rel="noopener noreferrer">
                              Learn More
                              <ExternalLink className="ml-2 h-3 w-3" />
                            </Link>
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2 pt-2">
                        <h3 className="text-base font-medium">Contribution Analysis</h3>
                        <p className="text-sm text-muted-foreground">
                          An approach for assessing causal questions and inferring causality in real-life program
                          evaluations when experimental designs are not possible. It's particularly useful for
                          adaptation initiatives where attribution is challenging.
                        </p>
                        <div className="flex items-center mt-2">
                          <Button variant="outline" size="sm">
                            Download Guide
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Practical Tools</CardTitle>
                      <CardDescription>Tools for monitoring, evaluation, and learning</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-base">Indicator Development Tool</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm text-muted-foreground">
                            A tool for developing SMART (Specific, Measurable, Achievable, Relevant, Time-bound)
                            indicators for adaptation initiatives at different scales.
                          </p>
                          <div className="flex items-center mt-3">
                            <Button variant="outline" size="sm">
                              Download Tool
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-base">Monitoring System Template</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm text-muted-foreground">
                            A template for designing comprehensive monitoring systems for adaptation initiatives,
                            including data collection methods, frequency, responsibilities, and analysis approaches.
                          </p>
                          <div className="flex items-center mt-3">
                            <Button variant="outline" size="sm">
                              Download Template
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-base">Learning Workshop Toolkit</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm text-muted-foreground">
                            A toolkit for facilitating learning workshops to reflect on monitoring and evaluation
                            findings and generate insights for improving adaptation initiatives.
                          </p>
                          <div className="flex items-center mt-3">
                            <Button variant="outline" size="sm">
                              Download Toolkit
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-base">Adaptation Tracking Database</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm text-muted-foreground">
                            A database template for tracking adaptation actions, outcomes, and lessons learned over
                            time, designed to support adaptive management.
                          </p>
                          <div className="flex items-center mt-3">
                            <Button variant="outline" size="sm">
                              Download Template
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <AICompanionEmbedded
              title="MEL Assistant"
              description="Get help with monitoring, evaluation, and learning"
              contextualPrompt="What aspects of monitoring and evaluation are you working on?"
            />

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Competencies</CardTitle>
                <CardDescription>Skills developed in this domain</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Indicator Development</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Developing SMART indicators</li>
                    <li>• Balancing process and outcome indicators</li>
                    <li>• Creating indicator frameworks</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Monitoring System Design</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Designing data collection methods</li>
                    <li>• Establishing monitoring protocols</li>
                    <li>• Creating data management systems</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Evaluation</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Designing evaluation frameworks</li>
                    <li>• Conducting evaluations</li>
                    <li>• Analyzing and interpreting results</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Learning & Adaptive Management</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Facilitating learning processes</li>
                    <li>• Applying insights to improve actions</li>
                    <li>• Managing adaptively under uncertainty</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/assessment">Take Self-Assessment</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Peer Circle</CardTitle>
                <CardDescription>Connect with practitioners in this domain</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                    <LineChart className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Monitoring & Evaluation Circle</h3>
                    <p className="text-sm text-muted-foreground">18 members</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  Join discussions with practitioners focused on monitoring, evaluation, and learning approaches for
                  climate adaptation initiatives.
                </p>

                <div className="flex -space-x-2 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Avatar key={i} className="border-2 border-background">
                      <AvatarImage src={`/diverse-group.png?height=32&width=32&query=person${i + 1}`} />
                      <AvatarFallback>{`P${i + 1}`}</AvatarFallback>
                    </Avatar>
                  ))}
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-xs font-medium">
                    +13
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/groups/monitoring-evaluation">Join Circle</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Events</CardTitle>
                <CardDescription>Events related to this domain</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">Monitoring & Evaluation Webinar</CardTitle>
                    <CardDescription>May 22, 2023 • Virtual</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">
                      Learn practical approaches to monitoring and evaluating climate adaptation initiatives.
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
                    <CardTitle className="text-base">Adaptive Management Workshop</CardTitle>
                    <CardDescription>June 15, 2023 • Virtual</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">
                      A hands-on workshop on applying adaptive management principles to climate adaptation initiatives.
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button variant="outline" className="w-full">
                      Register
                    </Button>
                  </CardFooter>
                </Card>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/events?domain=Monitoring%20%26%20Learning">View All Events</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
