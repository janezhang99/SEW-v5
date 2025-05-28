import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Thermometer, PenTool, Leaf, Cog, LineChart, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { AICompanionEmbedded } from "@/components/ai-companion/ai-companion-embedded"

export default function DomainsPage() {
  const domains = [
    {
      id: "risk",
      number: 1,
      title: "Climate Risk Assessment",
      description: "Identifying and evaluating climate-related risks and vulnerabilities",
      icon: Thermometer,
      color: "text-red-500",
      bgColor: "bg-red-100 dark:bg-red-900",
      image: "/climate-risk-assessment.png",
      link: "/domains/risk",
    },
    {
      id: "planning",
      number: 2,
      title: "Strategic Adaptation Planning",
      description: "Developing comprehensive plans to address climate risks",
      icon: PenTool,
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900",
      image: "/smart-goals-planning.png",
      link: "/domains/planning",
    },
    {
      id: "options",
      number: 3,
      title: "Adaptation Options",
      description: "Identifying and evaluating potential adaptation measures",
      icon: Leaf,
      color: "text-emerald-500",
      bgColor: "bg-emerald-100 dark:bg-emerald-900",
      image: "/nature-based-solutions.png",
      link: "/domains/options",
    },
    {
      id: "implementation",
      number: 4,
      title: "Implementation & Operations",
      description: "Putting adaptation plans into action and managing projects",
      icon: Cog,
      color: "text-amber-500",
      bgColor: "bg-amber-100 dark:bg-amber-900",
      image: "/project-management-teamwork.png",
      link: "/domains/implementation",
    },
    {
      id: "monitoring",
      number: 5,
      title: "Monitoring & Learning",
      description: "Tracking progress and incorporating lessons learned",
      icon: LineChart,
      color: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900",
      image: "/monitoring-systems.png",
      link: "/domains/monitoring",
    },
    {
      id: "cross-cutting",
      number: 6,
      title: "Cross-Cutting Skills",
      description: "Essential skills that span across all adaptation domains",
      icon: Users,
      color: "text-teal-500",
      bgColor: "bg-teal-100 dark:bg-teal-900",
      image: "/equity-climate-justice.png",
      link: "/domains/cross-cutting",
    },
  ]

  return (
    <>
      <PageHeader
        title="Knowledge Domains"
        description="Explore the six core competency domains for climate adaptation practitioners"
      >
        <div className="flex justify-center mt-6">
          <div className="bg-white/90 text-black rounded-full px-4 py-1 text-sm flex items-center">
            <span>Comprehensive Framework for Climate Adaptation</span>
          </div>
        </div>
      </PageHeader>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Competency Framework</CardTitle>
                <CardDescription>Understanding the domains of climate adaptation practice</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  The CanAdapt Competency Framework identifies six core domains of knowledge and skills for effective
                  climate adaptation practice. These domains represent the full cycle of adaptation, from understanding
                  climate risks to implementing and monitoring adaptation actions.
                </p>

                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder-xt5fu.png"
                    alt="Climate Adaptation Competency Framework"
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="text-lg font-medium mt-4">Framework Structure</h3>
                <p>
                  Each domain contains specific competencies that practitioners can develop through courses, resources,
                  and practical experience. The domains are interconnected, reflecting the iterative and integrated
                  nature of climate adaptation work.
                </p>
                <p>
                  Explore each domain to discover relevant courses, resources, tools, and connect with other
                  practitioners working in these areas.
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {domains.map((domain) => (
                <Card key={domain.id} className="overflow-hidden flex flex-col">
                  <div className="aspect-video relative">
                    <Image src={domain.image || "/placeholder.svg"} alt={domain.title} fill className="object-cover" />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-white/90 text-black">Domain {domain.number}</Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full ${domain.bgColor} flex items-center justify-center`}>
                        <domain.icon className={`h-4 w-4 ${domain.color}`} />
                      </div>
                      <CardTitle className="text-xl">{domain.title}</CardTitle>
                    </div>
                    <CardDescription>{domain.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 flex-grow">
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Understanding key concepts and frameworks</li>
                      <li>• Applying methods and tools</li>
                      <li>• Developing practical skills</li>
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button asChild className="w-full">
                      <Link href={domain.link}>Explore Domain</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <AICompanionEmbedded
              title="Domain Navigator"
              description="Get help finding the right domain for your needs"
              contextualPrompt="Which adaptation domain are you most interested in learning about?"
            />

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Self-Assessment</CardTitle>
                <CardDescription>Evaluate your competencies across domains</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Take our comprehensive self-assessment to identify your strengths and areas for growth across all six
                  competency domains.
                </p>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder-6g65k.png"
                    alt="Competency Assessment Chart"
                    fill
                    className="object-cover"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/assessment">Take Self-Assessment</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Learning Pathways</CardTitle>
                <CardDescription>Structured journeys through the domains</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">Municipal Adaptation Planner</h3>
                      <p className="text-xs text-muted-foreground">For local government practitioners</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                      <Leaf className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">Ecosystem-Based Adaptation</h3>
                      <p className="text-xs text-muted-foreground">For natural resource managers</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                      <Cog className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">Infrastructure Resilience</h3>
                      <p className="text-xs text-muted-foreground">For engineers and planners</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/learning-path">View All Pathways</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Domain Integration</CardTitle>
                <CardDescription>How the domains work together</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Effective climate adaptation requires integration across all domains. Learn how these competencies
                  complement each other in practice.
                </p>
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  <Image
                    src="/placeholder-6nn6g.png"
                    alt="Domain Integration Diagram"
                    fill
                    className="object-cover"
                  />
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/resources/domain-integration-guide">Download Integration Guide</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
