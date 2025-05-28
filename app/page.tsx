import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Users, Lightbulb, GraduationCap, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background pt-16 pb-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Building climate resilience together</h1>
              <p className="text-xl text-muted-foreground">
                CanAdapt, Canada's Network of Practitioners in Climate Adaptation and Low-Carbon Resilience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/dashboard">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/explore">Explore Resources</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?key=u263i"
                alt="Climate adaptation professionals collaborating"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">How CanAdapt Works</h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Our platform brings together the essential elements for successful climate adaptation
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            <FeatureCard
              icon={<Users className="h-10 w-10" />}
              title="Connect"
              description="Join a community of practitioners to share experiences and collaborate"
            />
            <FeatureCard
              icon={<Lightbulb className="h-10 w-10" />}
              title="Engage"
              description="Apply knowledge with project tools, templates, and AI-assisted guidance"
            />
            <FeatureCard
              icon={<GraduationCap className="h-10 w-10" />}
              title="Learn"
              description="Access curated courses, resources, and learning paths for your role"
            />
            <FeatureCard
              icon={<BarChart className="h-10 w-10" />}
              title="Explore"
              description="Discover knowledge domains and case studies from across Canada"
            />
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Success Stories</h2>
            <p className="mt-4 text-xl text-muted-foreground">
              See how communities across Canada are building resilience
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <CaseStudyCard
              image="/placeholder.svg?key=5sbri"
              title="Urban Heat Island Mitigation"
              location="Toronto, ON"
              description="How a neighborhood reduced temperatures by 4°C through green infrastructure"
            />
            <CaseStudyCard
              image="/placeholder.svg?key=9as00"
              title="Coastal Flood Protection"
              location="Halifax, NS"
              description="A community-led approach to protecting vulnerable coastal infrastructure"
            />
            <CaseStudyCard
              image="/placeholder.svg?key=c39mb"
              title="Traditional Knowledge Integration"
              location="Yellowknife, NT"
              description="Combining indigenous knowledge with climate science for holistic adaptation"
            />
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/case-studies">View All Case Studies</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 px-6 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight">Ready to start your adaptation journey?</h2>
              <p className="text-xl opacity-90">
                Join our community of practitioners and access personalized resources, tools, and support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/dashboard">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent" asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?key=3kn0q"
                alt="Climate adaptation planning session"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Component for feature cards
function FeatureCard({ icon, title, description }) {
  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

// Component for case study cards
function CaseStudyCard({ image, title, location, description }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{location}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="#">
            Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
