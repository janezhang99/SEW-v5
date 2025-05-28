import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Thermometer, FileText, Users, ArrowRight, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { AICompanionEmbedded } from "@/components/ai-companion/ai-companion-embedded"

export default function ClimateRiskAssessmentPage() {
  return (
    <>
      <PageHeader
        title="Climate Risk Assessment"
        description="Identifying and evaluating climate-related risks and vulnerabilities"
      >
        <div className="flex justify-center mt-6">
          <div className="bg-white/90 text-black rounded-full px-4 py-1 text-sm flex items-center">
            <Thermometer className="h-4 w-4 mr-2 text-primary" />
            <span>Competency Domain 1</span>
          </div>
        </div>
      </PageHeader>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Domain Overview</CardTitle>
                <CardDescription>Understanding climate risk assessment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Climate Risk Assessment is the systematic process of identifying, analyzing, and evaluating
                  climate-related risks and vulnerabilities. It forms the foundation for effective adaptation planning
                  and decision-making.
                </p>

                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src="/climate-risk-map-flooding.png"
                    alt="Climate Risk Assessment Visualization"
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="text-lg font-medium mt-4">Key Components</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base">Hazard Identification</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">
                        Identifying climate hazards relevant to your region, such as flooding, extreme heat, drought,
                        sea level rise, and storms.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base">Vulnerability Assessment</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">
                        Evaluating the susceptibility of systems, communities, or assets to the adverse effects of
                        climate hazards.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base">Impact Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">
                        Assessing potential consequences of climate hazards on various sectors, including
                        infrastructure, health, ecosystems, and economy.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base">Risk Evaluation</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">
                        Determining the significance of identified risks based on likelihood, consequence, and adaptive
                        capacity.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <h3 className="text-lg font-medium mt-4">Frameworks and Approaches</h3>
                <p>
                  Several frameworks guide climate risk assessment processes, including the IPCC's risk framework, ISO
                  14090, and the UKCIP Adaptation Wizard. These frameworks typically involve:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Establishing the context and objectives</li>
                  <li>Identifying climate hazards and their trends</li>
                  <li>Assessing exposure and vulnerability</li>
                  <li>Evaluating risks and opportunities</li>
                  <li>Identifying adaptation options</li>
                  <li>Monitoring and evaluation</li>
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
                        src="/climate-risk-assessment.png"
                        alt="Climate Risk Assessment Fundamentals"
                        fill
                        className="object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-2 right-2">Beginner</Badge>
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base">Climate Risk Assessment Fundamentals</CardTitle>
                      <CardDescription>
                        Learn the basics of identifying and evaluating climate-related risks
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <FileText className="mr-1 h-4 w-4" />
                        <span>4 modules</span>
                        <span className="mx-2">•</span>
                        <span>4 hours</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full">Enroll Now</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <div className="aspect-video relative">
                      <Image
                        src="/vulnerability-mapping.png"
                        alt="Advanced Vulnerability Mapping"
                        fill
                        className="object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-2 right-2">Advanced</Badge>
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base">Advanced Vulnerability Mapping</CardTitle>
                      <CardDescription>
                        Master techniques for detailed vulnerability mapping across sectors
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
                        src="/climate-risk-communication.png"
                        alt="Climate Risk Communication"
                        fill
                        className="object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-2 right-2">Intermediate</Badge>
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base">Climate Risk Communication</CardTitle>
                      <CardDescription>Effectively communicate climate risks to diverse stakeholders</CardDescription>
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
                        src="/climate-data-analysis.png"
                        alt="Climate Data Analysis for Risk Assessment"
                        fill
                        className="object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-2 right-2">Intermediate</Badge>
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base">Climate Data Analysis for Risk Assessment</CardTitle>
                      <CardDescription>Learn to analyze and interpret climate data for risk assessment</CardDescription>
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
                </div>

                <div className="flex justify-center mt-6">
                  <Button variant="outline" asChild>
                    <Link href="/courses?domain=Climate%20Risk%20Assessment">
                      View All Climate Risk Assessment Courses
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
                        <CardTitle className="text-base">Climate Risk Assessment Toolkit</CardTitle>
                        <Badge variant="outline">PDF</Badge>
                      </div>
                      <CardDescription>A comprehensive set of tools and templates</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground mb-4">
                        This toolkit provides step-by-step guidance, worksheets, and templates for conducting climate
                        risk assessments at various scales.
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <FileText className="mr-1 h-4 w-4" />
                        <span>48 pages</span>
                        <span className="mx-2">•</span>
                        <span>256 downloads</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full">Download</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base">Climate Hazard Database</CardTitle>
                        <Badge variant="outline">Web Tool</Badge>
                      </div>
                      <CardDescription>Searchable database of climate hazards by region</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground mb-4">
                        Access data on historical and projected climate hazards for different regions across Canada,
                        including frequency, intensity, and trends.
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="mr-1 h-4 w-4" />
                        <span>178 active users</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full">Access Tool</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base">Case Studies: Municipal Risk Assessments</CardTitle>
                        <Badge variant="outline">PDF Collection</Badge>
                      </div>
                      <CardDescription>Real-world examples from Canadian municipalities</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground mb-4">
                        A collection of case studies showcasing how different municipalities have approached climate
                        risk assessment, including methodologies, challenges, and outcomes.
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <FileText className="mr-1 h-4 w-4" />
                        <span>12 case studies</span>
                        <span className="mx-2">•</span>
                        <span>142 downloads</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full">Download</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base">Climate Risk Assessment Webinar Series</CardTitle>
                        <Badge variant="outline">Video</Badge>
                      </div>
                      <CardDescription>Expert presentations on risk assessment approaches</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground mb-4">
                        A series of recorded webinars featuring experts discussing various aspects of climate risk
                        assessment, from theoretical frameworks to practical applications.
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <FileText className="mr-1 h-4 w-4" />
                        <span>6 videos</span>
                        <span className="mx-2">•</span>
                        <span>8 hours total</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full">Watch Series</Button>
                    </CardFooter>
                  </Card>
                </div>

                <div className="flex justify-center mt-6">
                  <Button variant="outline" asChild>
                    <Link href="/resources?domain=Climate%20Risk%20Assessment">
                      View All Climate Risk Assessment Resources
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="tools" className="mt-6">
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Risk Assessment Methodologies</CardTitle>
                      <CardDescription>Common approaches to climate risk assessment</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-base font-medium">IPCC Risk Framework</h3>
                        <p className="text-sm text-muted-foreground">
                          The Intergovernmental Panel on Climate Change (IPCC) risk framework conceptualizes risk as the
                          interaction of hazard, exposure, and vulnerability. This framework is widely used
                          internationally and provides a comprehensive approach to understanding climate risks.
                        </p>
                        <div className="flex items-center mt-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href="https://www.ipcc.ch/report/ar6/wg2/" target="_blank" rel="noopener noreferrer">
                              Learn More
                              <ExternalLink className="ml-2 h-3 w-3" />
                            </Link>
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2 pt-2">
                        <h3 className="text-base font-medium">ISO 14090 - Adaptation to Climate Change</h3>
                        <p className="text-sm text-muted-foreground">
                          This international standard provides principles, requirements, and guidelines for adaptation
                          to climate change. It includes frameworks and approaches for assessing climate risks and
                          implementing adaptation measures.
                        </p>
                        <div className="flex items-center mt-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link
                              href="https://www.iso.org/standard/68507.html"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Learn More
                              <ExternalLink className="ml-2 h-3 w-3" />
                            </Link>
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2 pt-2">
                        <h3 className="text-base font-medium">UKCIP Adaptation Wizard</h3>
                        <p className="text-sm text-muted-foreground">
                          The UK Climate Impacts Programme (UKCIP) Adaptation Wizard is a 5-step process to assess
                          vulnerability to climate change and develop an adaptation strategy. It includes tools for risk
                          assessment, identification of adaptation options, and implementation planning.
                        </p>
                        <div className="flex items-center mt-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href="https://www.ukcip.org.uk/wizard/" target="_blank" rel="noopener noreferrer">
                              Learn More
                              <ExternalLink className="ml-2 h-3 w-3" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Practical Tools</CardTitle>
                      <CardDescription>
                        Software, templates, and resources for conducting risk assessments
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-base">Climate Data Portal</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm text-muted-foreground">
                            Access historical climate data and future projections for different regions across Canada.
                            Includes temperature, precipitation, and extreme weather events.
                          </p>
                          <div className="flex items-center mt-3">
                            <Button variant="outline" size="sm" asChild>
                              <Link href="#" target="_blank" rel="noopener noreferrer">
                                Access Tool
                                <ExternalLink className="ml-2 h-3 w-3" />
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-base">Vulnerability Assessment Matrix</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm text-muted-foreground">
                            A spreadsheet tool for systematically assessing vulnerability of different systems or
                            sectors to climate hazards, based on sensitivity and adaptive capacity.
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
                          <CardTitle className="text-base">Risk Prioritization Tool</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm text-muted-foreground">
                            A tool for ranking and prioritizing identified climate risks based on likelihood,
                            consequence, and confidence levels.
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
                          <CardTitle className="text-base">Stakeholder Engagement Guide</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm text-muted-foreground">
                            Guidelines and templates for engaging stakeholders in the climate risk assessment process,
                            including workshop facilitation materials.
                          </p>
                          <div className="flex items-center mt-3">
                            <Button variant="outline" size="sm">
                              Download Guide
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
              title="Climate Risk Assessment Assistant"
              description="Get help with your climate risk assessment questions"
              contextualPrompt="What aspects of climate risk assessment are you interested in learning about?"
            />

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Competencies</CardTitle>
                <CardDescription>Skills developed in this domain</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Hazard Identification</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Identifying relevant climate hazards</li>
                    <li>• Analyzing historical climate data</li>
                    <li>• Interpreting climate projections</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Vulnerability Assessment</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Evaluating exposure to hazards</li>
                    <li>• Assessing sensitivity of systems</li>
                    <li>• Analyzing adaptive capacity</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Risk Analysis</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Estimating likelihood of impacts</li>
                    <li>• Evaluating consequences</li>
                    <li>• Prioritizing risks</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Communication</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Visualizing climate risks</li>
                    <li>• Communicating with stakeholders</li>
                    <li>• Presenting findings effectively</li>
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
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                    <Thermometer className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Climate Risk Assessment Circle</h3>
                    <p className="text-sm text-muted-foreground">28 members</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  Join discussions with practitioners focused on climate risk assessment methodologies, tools, and case
                  studies.
                </p>

                <div className="flex -space-x-2 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Avatar key={i} className="border-2 border-background">
                      <AvatarImage src={`/diverse-group.png?height=32&width=32&query=person${i + 1}`} />
                      <AvatarFallback>{`P${i + 1}`}</AvatarFallback>
                    </Avatar>
                  ))}
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-xs font-medium">
                    +23
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/groups/climate-risk-assessment">Join Circle</Link>
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

                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">Vulnerability Mapping Workshop</CardTitle>
                    <CardDescription>July 5, 2023 • Virtual</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">
                      Hands-on workshop on techniques for mapping climate vulnerabilities.
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
                  <Link href="/events?domain=Climate%20Risk%20Assessment">View All Events</Link>
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
