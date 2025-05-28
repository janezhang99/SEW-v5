"use client"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FolderKanban, GraduationCap, Calendar, MessageSquare, Compass, Clock, ArrowRight } from "lucide-react"
import { useView } from "@/components/view-toggle"
import AssessmentPrompt from "@/components/dashboards/assessment-prompt"

export default function DashboardPage() {
  const { viewMode, setViewMode, hasCompletedAssessment, setHasCompletedAssessment } = useView()
  const pathname = usePathname()

  // Show assessment prompt for authenticated users who haven't completed assessment
  if (viewMode === "authenticated" && !hasCompletedAssessment) {
    return (
      <div className="relative">
        <DashboardViewToggle />
        <AssessmentPrompt />
      </div>
    )
  }

  // Show appropriate dashboard based on view mode
  return (
    <div className="relative">
      <DashboardViewToggle />
      {viewMode === "public" ? <PublicDashboard /> : <AuthenticatedDashboard />}
    </div>
  )
}

// Replace the entire DashboardViewToggle function with a version that returns null
function DashboardViewToggle() {
  return null
}

function PublicDashboard() {
  return (
    <div className="flex flex-col gap-8 p-6">
      {/* Welcome section */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Explore Climate Adaptation Resources</h1>
            <p className="text-muted-foreground">
              Discover tools, knowledge, and connections to build climate resilience
            </p>
          </div>
          <Button size="lg" asChild>
            <Link href="/assessment">
              Take Assessment <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Compass className="h-5 w-5" />
            Featured Knowledge Domains
          </CardTitle>
          <CardDescription>Explore key areas of climate adaptation practice</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <DomainCard
              number={1}
              title="Climate Risk Assessment"
              description="Methods and approaches to identify and evaluate climate risks"
              image="/climate-risk-assessment.png"
              href="/domains/risk"
            />
            <DomainCard
              number={3}
              title="Adaptation Options"
              description="Solutions and strategies to address climate impacts"
              image="/placeholder-30kc4.png"
              href="/domains/options"
            />
            <DomainCard
              number={5}
              title="Monitoring & Learning"
              description="Approaches to track progress and improve adaptation efforts"
              image="/placeholder-aoo1l.png"
              href="/domains/monitoring"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/domains">
              View All Knowledge Domains <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Two-column layout for main content */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Popular Courses
            </CardTitle>
            <CardDescription>Most accessed learning resources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <CourseItem
                title="Climate Risk Assessment Fundamentals"
                description="Learn the basics of identifying and evaluating climate risks"
                duration="4 hours"
                level="Beginner"
                href="/courses/risk-fundamentals"
              />
              <CourseItem
                title="Nature-Based Solutions"
                description="Explore ecosystem-based approaches to climate adaptation"
                duration="6 hours"
                level="Intermediate"
                href="/courses/nature-based-solutions"
              />
              <CourseItem
                title="Stakeholder Engagement for Adaptation"
                description="Techniques for inclusive adaptation planning"
                duration="3 hours"
                level="Beginner"
                href="/courses/stakeholder-engagement"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/courses">View All Courses</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Events
            </CardTitle>
            <CardDescription>Connect with the adaptation community</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground">May 20, 2024 • Virtual</p>
                <p className="text-sm font-medium">Climate-Resilient Infrastructure Workshop</p>
                <p className="text-xs text-muted-foreground">Hosted by Infrastructure Canada</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">June 5-7, 2024 • Toronto, ON</p>
                <p className="text-sm font-medium">National Adaptation Forum 2024</p>
                <p className="text-xs text-muted-foreground">Hosted by Environment Canada</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">June 15, 2024 • Virtual</p>
                <p className="text-sm font-medium">Urban Heat Island Mitigation Strategies</p>
                <p className="text-xs text-muted-foreground">Hosted by Canadian Urban Institute</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/events">View All Events</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Case studies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderKanban className="h-5 w-5" />
            Featured Case Studies
          </CardTitle>
          <CardDescription>Real-world adaptation examples from across Canada</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <CaseStudyCard
              title="Urban Heat Island Mitigation"
              location="Toronto, ON"
              description="How a neighborhood reduced temperatures by 4°C through green infrastructure"
              image="/placeholder-1sqlk.png"
              href="/case-studies/toronto-heat"
            />
            <CaseStudyCard
              title="Coastal Flood Protection"
              location="Halifax, NS"
              description="A community-led approach to protecting vulnerable coastal infrastructure"
              image="/placeholder-8l8iz.png"
              href="/case-studies/halifax-flood"
            />
            <CaseStudyCard
              title="Indigenous Knowledge Integration"
              location="Yellowknife, NT"
              description="Combining traditional knowledge with climate science for holistic adaptation"
              image="/placeholder-0fvhz.png"
              href="/case-studies/yellowknife-knowledge"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/case-studies">
              View All Case Studies <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>

      {/* CTA section */}
      <Card className="bg-primary text-primary-foreground">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Ready for personalized content?</h2>
              <p className="mt-2 opacity-90">
                Take our assessment to get customized resources and recommendations for your role.
              </p>
            </div>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/assessment">
                Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AuthenticatedDashboard() {
  return (
    <div className="flex flex-col gap-8 p-6">
      {/* Welcome section with assessment summary */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, Alex</h1>
            <p className="text-muted-foreground">Your personalized dashboard based on your assessment results</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="inline-block h-8 w-8 rounded-full ring-2 ring-background bg-blue-500" />
              <div className="inline-block h-8 w-8 rounded-full ring-2 ring-background bg-green-500" />
              <div className="inline-block h-8 w-8 rounded-full ring-2 ring-background bg-amber-500" />
            </div>
            <div>
              <p className="text-sm font-medium">Your Strengths</p>
              <p className="text-xs text-muted-foreground">Planning, Collaboration, Analysis</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main content with tabs */}
      <Tabs defaultValue="recommended" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="progress">My Progress</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="recommended" className="space-y-4">
          {/* Personalized recommendations based on assessment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Compass className="h-5 w-5" />
                Your Learning Path
              </CardTitle>
              <CardDescription>Personalized recommendations based on your assessment results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Based on your profile as a Municipal Planner</h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <RecommendationCard
                      type="Course"
                      title="Climate Risk Assessment for Urban Areas"
                      match="98% match"
                      href="/courses/climate-risk-urban"
                    />
                    <RecommendationCard
                      type="Resource"
                      title="Stakeholder Engagement Toolkit"
                      match="95% match"
                      href="/resources/stakeholder-toolkit"
                    />
                    <RecommendationCard
                      type="Project Template"
                      title="Urban Heat Island Mitigation Plan"
                      match="92% match"
                      href="/projects/templates/heat-island"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">To strengthen your Monitoring & Evaluation skills</h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <RecommendationCard
                      type="Course"
                      title="Adaptation Metrics & Indicators"
                      match="97% match"
                      href="/courses/adaptation-metrics"
                    />
                    <RecommendationCard
                      type="Resource"
                      title="Monitoring Framework Guide"
                      match="94% match"
                      href="/resources/monitoring-framework"
                    />
                    <RecommendationCard
                      type="Case Study"
                      title="Vancouver's Adaptation Monitoring System"
                      match="90% match"
                      href="/case-studies/vancouver-monitoring"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/learning-path">View Complete Learning Path</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Two-column layout for main content */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderKanban className="h-5 w-5" />
                  Your Projects
                </CardTitle>
                <CardDescription>Active adaptation projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                      <FolderKanban className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Urban Heat Island Mitigation</p>
                      <p className="text-xs text-muted-foreground">Implementation phase • 65% complete</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                      <FolderKanban className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Coastal Erosion Assessment</p>
                      <p className="text-xs text-muted-foreground">Planning phase • 30% complete</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/projects">View All Projects</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Events
                </CardTitle>
                <CardDescription>Events matching your interests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground">May 20, 2024 • Virtual</p>
                    <p className="text-sm font-medium">Climate-Resilient Infrastructure Workshop</p>
                    <p className="text-xs text-muted-foreground">Hosted by Infrastructure Canada</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">June 5-7, 2024 • Toronto, ON</p>
                    <p className="text-sm font-medium">National Adaptation Forum 2024</p>
                    <p className="text-xs text-muted-foreground">Hosted by Environment Canada</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/events">View All Events</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          {/* Learning progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Learning Progress
              </CardTitle>
              <CardDescription>Your course and resource progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-4">In-Progress Courses</h3>
                  <div className="space-y-4">
                    <CourseProgressItem
                      title="Climate Risk Assessment Fundamentals"
                      progress={75}
                      lastActivity="Yesterday"
                      nextModule="Module 4: Risk Prioritization"
                    />
                    <CourseProgressItem
                      title="Nature-Based Solutions"
                      progress={40}
                      lastActivity="3 days ago"
                      nextModule="Module 3: Implementation Challenges"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your recent interactions on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ActivityItem
                  icon={<GraduationCap className="h-5 w-5" />}
                  title="Completed module: Climate Projections for Urban Areas"
                  time="2 hours ago"
                  category="Learning"
                />
                <ActivityItem
                  icon={<MessageSquare className="h-5 w-5" />}
                  title="Commented on discussion: Integrating climate projections into municipal planning"
                  time="Yesterday"
                  category="Discussion"
                />
                <ActivityItem
                  icon={<FolderKanban className="h-5 w-5" />}
                  title="Updated timeline for Urban Heat Island Mitigation project"
                  time="2 days ago"
                  category="Project"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Component for domain cards
function DomainCard({ number, title, description, image, href }) {
  return (
    <Card className="overflow-hidden">
      <Link href={href} className="block h-full hover:bg-muted/50 transition-colors">
        <div className="relative h-32">
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
          <div className="absolute top-2 left-2 bg-background rounded-full h-8 w-8 flex items-center justify-center shadow">
            <span className="font-bold text-sm">D{number}</span>
          </div>
        </div>
        <CardHeader className="p-4">
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription className="text-xs line-clamp-2">{description}</CardDescription>
        </CardHeader>
      </Link>
    </Card>
  )
}

// Component for course items
function CourseItem({ title, description, duration, level, href }) {
  return (
    <Link href={href} className="block hover:bg-muted/50 transition-colors rounded-md p-3">
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm">{title}</h4>
          <Badge variant="outline" className="text-xs">
            {level}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
        <p className="text-xs flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {duration}
        </p>
      </div>
    </Link>
  )
}

// Component for case study cards
function CaseStudyCard({ title, location, description, image, href }) {
  return (
    <Card className="overflow-hidden">
      <Link href={href} className="block h-full hover:bg-muted/50 transition-colors">
        <div className="relative h-32">
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </div>
        <CardHeader className="p-4">
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription className="text-xs">{location}</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
        </CardContent>
      </Link>
    </Card>
  )
}

// Component for recommendation cards
function RecommendationCard({ type, title, match, href }) {
  return (
    <Card className="overflow-hidden">
      <Link href={href} className="block h-full hover:bg-muted/50 transition-colors">
        <CardHeader className="p-4">
          <Badge variant="outline" className="w-fit mb-2">
            {type}
          </Badge>
          <CardTitle className="text-base">{title}</CardTitle>
        </CardHeader>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <span className="text-xs font-medium text-primary">{match}</span>
          <ArrowRight className="h-4 w-4" />
        </CardFooter>
      </Link>
    </Card>
  )
}

// Component for course progress items
function CourseProgressItem({ title, progress, lastActivity, nextModule }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <h4 className="text-sm font-medium">{title}</h4>
        <span className="text-sm font-medium">{progress}%</span>
      </div>
      <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
        <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Last activity: {lastActivity}</span>
        <span>Next: {nextModule}</span>
      </div>
    </div>
  )
}

// Component for activity items
function ActivityItem({ icon, title, time, category }) {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">{icon}</div>
      <div>
        <p className="text-sm">{title}</p>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
          <p className="text-xs text-muted-foreground">{time}</p>
        </div>
      </div>
    </div>
  )
}
