import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, FileText, Users, ArrowRight, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { AICompanionEmbedded } from "@/components/ai-companion/ai-companion-embedded"

export default function AdaptationOptionsPage() {
  return (
    <>
      <PageHeader title="Adaptation Options" description="Identifying and evaluating potential adaptation measures">
        <div className="flex justify-center mt-6">
          <div className="bg-white/90 text-black rounded-full px-4 py-1 text-sm flex items-center">
            <Leaf className="h-4 w-4 mr-2 text-primary" />
            <span>Competency Domain 3</span>
          </div>
        </div>
      </PageHeader>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Domain Overview</CardTitle>
                <CardDescription>Understanding adaptation options and measures</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Adaptation Options focuses on identifying, evaluating, and selecting appropriate measures to address
                  climate risks and build resilience. This domain explores the range of potential adaptation approaches
                  across different sectors and contexts.
                </p>

                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src="/nature-based-solutions-urban.png"
                    alt="Nature-based Solutions Visualization"
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="text-lg font-medium mt-4">Types of Adaptation Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base">Nature-based Solutions</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">
                        Approaches that use natural systems and processes to address climate impacts, such as wetland
                        restoration, urban forests, and living shorelines.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base">Engineered Solutions</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">
                        Built infrastructure and technological approaches, including sea walls, flood barriers,
                        stormwater systems, and cooling centers.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base">Social & Institutional Measures</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">
                        Policies, programs, and behavioral changes that build adaptive capacity, such as early warning
                        systems, insurance mechanisms, and community networks.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base">Hybrid Approaches</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">
                        Combinations of different adaptation types that leverage multiple benefits and address various
                        aspects of climate risk.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <h3 className="text-lg font-medium mt-4">Evaluation Criteria</h3>
                <p>Selecting appropriate adaptation options involves evaluating measures against multiple criteria:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Effectiveness in reducing climate risks</li>
                  <li>Cost-effectiveness and economic feasibility</li>
                  <li>Co-benefits beyond climate adaptation</li>
                  <li>Flexibility and robustness under different future scenarios</li>
                  <li>Equity and distributional impacts</li>
                  <li>Technical feasibility and implementation requirements</li>
                  <li>Alignment with community values and priorities</li>
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
                        src="/nature-based-solutions.png"
                        alt="Nature-based Solutions for Climate Adaptation"
                        fill
                        className="object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-2 right-2">Intermediate</Badge>
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base">Nature-based Solutions for Climate Adaptation</CardTitle>
                      <CardDescription>Explore how natural systems can be leveraged for resilience</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <FileText className="mr-1 h-4 w-4" />
                        <span>4 modules</span>
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
                        src="/cost-benefit-climate-adaptation.png"
                        alt="Cost-Benefit Analysis for Adaptation Options"
                        fill
                        className="object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-2 right-2">Intermediate</Badge>
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base">Cost-Benefit Analysis for Adaptation Options</CardTitle>
                      <CardDescription>Learn to evaluate and compare adaptation measures</CardDescription>
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

                  <Card>
                    <div className="aspect-video relative">
                      <Image
                        src="/urban-green-infrastructure.png"
                        alt="Urban Adaptation Strategies"
                        fill
                        className="object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-2 right-2">Intermediate</Badge>
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base">Urban Adaptation Strategies</CardTitle>
                      <CardDescription>Adaptation approaches for urban environments</CardDescription>
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
                        src="/climate-adaptation-policy.png"
                        alt="Policy Instruments for Climate Adaptation"
                        fill
                        className="object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-2 right-2">Advanced</Badge>
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base">Policy Instruments for Climate Adaptation</CardTitle>
                      <CardDescription>Explore policy approaches to enable adaptation</CardDescription>
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
                    <Link href="/courses?domain=Adaptation%20Options">
                      View All Adaptation Options Courses
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
                        <CardTitle className="text-base">Nature-based Solutions Database</CardTitle>
                        <Badge variant="outline">Web Tool</Badge>
                      </div>
                      <CardDescription>Searchable database of nature-based adaptation solutions</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground mb-4">
                        Access a comprehensive database of nature-based adaptation solutions with case studies,
                        implementation guidance, and effectiveness evaluations.
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="mr-1 h-4 w-4" />
                        <span>142 active users</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full">Access Database</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base">Adaptation Options Toolkit</CardTitle>
                        <Badge variant="outline">PDF</Badge>
                      </div>
                      <CardDescription>Comprehensive guide to adaptation measures</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground mb-4">
                        A toolkit providing detailed information on adaptation options across different sectors,
                        including selection criteria, implementation considerations, and case examples.
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <FileText className="mr-1 h-4 w-4" />
                        <span>56 pages</span>
                        <span className="mx-2">•</span>
                        <span>198 downloads</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full">Download</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base">Adaptation Case Studies Collection</CardTitle>
                        <Badge variant="outline">PDF Collection</Badge>
                      </div>
                      <CardDescription>Real-world examples of successful adaptation</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground mb-4">
                        A collection of case studies showcasing successful implementation of various adaptation options
                        across different contexts, with lessons learned and best practices.
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <FileText className="mr-1 h-4 w-4" />
                        <span>18 case studies</span>
                        <span className="mx-2">•</span>
                        <span>165 downloads</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full">Download</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base">Adaptation Options Webinar Series</CardTitle>
                        <Badge variant="outline">Video</Badge>
                      </div>
                      <CardDescription>Expert presentations on adaptation approaches</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground mb-4">
                        A series of recorded webinars featuring experts discussing various adaptation options, from
                        nature-based solutions to engineered approaches and policy instruments.
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <FileText className="mr-1 h-4 w-4" />
                        <span>8 videos</span>
                        <span className="mx-2">•</span>
                        <span>10 hours total</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full">Watch Series</Button>
                    </CardFooter>
                  </Card>
                </div>

                <div className="flex justify-center mt-6">
                  <Button variant="outline" asChild>
                    <Link href="/resources?domain=Adaptation%20Options">
                      View All Adaptation Options Resources
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="tools" className="mt-6">
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Evaluation Methods</CardTitle>
                      <CardDescription>Approaches for assessing adaptation options</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-base font-medium">Multi-Criteria Analysis (MCA)</h3>
                        <p className="text-sm text-muted-foreground">
                          A structured approach to evaluate adaptation options against multiple criteria, allowing for
                          the consideration of both quantitative and qualitative factors. MCA is particularly useful
                          when monetary valuation is challenging or when diverse stakeholder perspectives need to be
                          incorporated.
                        </p>
                        <div className="flex items-center mt-2">
                          <Button variant="outline" size="sm">
                            Download MCA Template
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2 pt-2">
                        <h3 className="text-base font-medium">Cost-Benefit Analysis (CBA)</h3>
                        <p className="text-sm text-muted-foreground">
                          A systematic approach to comparing the costs and benefits of adaptation options in monetary
                          terms. CBA helps identify economically efficient options but requires careful consideration of
                          non-market values and distributional impacts.
                        </p>
                        <div className="flex items-center mt-2">
                          <Button variant="outline" size="sm">
                            Download CBA Guide
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2 pt-2">
                        <h3 className="text-base font-medium">Robust Decision Making (RDM)</h3>
                        <p className="text-sm text-muted-foreground">
                          An approach for making decisions under deep uncertainty, focusing on identifying options that
                          perform well across a wide range of possible future scenarios rather than optimizing for a
                          single predicted future.
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
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Practical Tools</CardTitle>
                      <CardDescription>Tools for identifying and evaluating adaptation options</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-base">Adaptation Options Database</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm text-muted-foreground">
                            A searchable database of adaptation options categorized by climate hazard, sector, scale,
                            and type. Includes information on effectiveness, costs, and implementation considerations.
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
                          <CardTitle className="text-base">Adaptation Options Evaluation Matrix</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm text-muted-foreground">
                            A spreadsheet tool for systematically evaluating adaptation options against multiple
                            criteria, including effectiveness, cost, co-benefits, and implementation feasibility.
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
                          <CardTitle className="text-base">Co-Benefits Calculator</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm text-muted-foreground">
                            A tool for estimating and valuing the co-benefits of different adaptation options, including
                            environmental, social, economic, and health benefits.
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
                          <CardTitle className="text-base">Adaptation Pathways Planner</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm text-muted-foreground">
                            A tool for developing flexible adaptation pathways that can evolve over time in response to
                            changing conditions and new information.
                          </p>
                          <div className="flex items-center mt-3">
                            <Button variant="outline" size="sm">
                              Access Tool
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
              title="Adaptation Options Assistant"
              description="Get help identifying and evaluating adaptation measures"
              contextualPrompt="What climate impacts are you trying to address with adaptation measures?"
            />

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Competencies</CardTitle>
                <CardDescription>Skills developed in this domain</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Option Identification</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Identifying relevant adaptation measures</li>
                    <li>• Understanding different types of options</li>
                    <li>• Matching options to climate risks</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Option Evaluation</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Assessing effectiveness of measures</li>
                    <li>• Conducting cost-benefit analysis</li>
                    <li>• Evaluating co-benefits and trade-offs</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Option Selection</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Prioritizing adaptation measures</li>
                    <li>• Developing adaptation portfolios</li>
                    <li>• Creating flexible adaptation pathways</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Implementation Planning</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Identifying implementation requirements</li>
                    <li>• Addressing barriers to implementation</li>
                    <li>• Developing phased implementation plans</li>
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
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                    <Leaf className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Nature-based Solutions Circle</h3>
                    <p className="text-sm text-muted-foreground">24 members</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  Join discussions with practitioners focused on nature-based approaches to climate adaptation,
                  including case studies, implementation challenges, and innovative solutions.
                </p>

                <div className="flex -space-x-2 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Avatar key={i} className="border-2 border-background">
                      <AvatarImage src={`/diverse-group.png?height=32&width=32&query=person${i + 1}`} />
                      <AvatarFallback>{`P${i + 1}`}</AvatarFallback>
                    </Avatar>
                  ))}
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-xs font-medium">
                    +19
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/groups/nature-based-solutions">Join Circle</Link>
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
                    <CardTitle className="text-base">Cost-Benefit Analysis Webinar</CardTitle>
                    <CardDescription>June 8, 2023 • Virtual</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">
                      Learn practical approaches to evaluating adaptation options using cost-benefit analysis.
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
                  <Link href="/events?domain=Adaptation%20Options">View All Events</Link>
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
