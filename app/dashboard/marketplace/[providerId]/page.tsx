import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Clock, MessageCircle, Star, MapPin, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Service Provider Profile | Small Economy Works",
  description: "View service provider profile and request services.",
}

// Mock data for service provider
const getProvider = (id: string) => {
  const providers = {
    "1": {
      id: "1",
      name: "Maya Thompson",
      age: 17,
      location: "Whitehorse, YT",
      image: "/young-asian-woman-portrait.png",
      bio: "I'm a passionate creative designer who loves helping community projects shine through visual storytelling. I've been designing for 3 years and have worked on everything from event posters to social media campaigns for local initiatives.",
      services: [
        {
          title: "Logo & Brand Design",
          description: "Custom logos and brand identity packages for your initiative",
          price: 50,
          duration: "2-3 days",
        },
        {
          title: "Social Media Graphics",
          description: "Eye-catching graphics for Instagram, Facebook, and other platforms",
          price: 25,
          duration: "1-2 days",
        },
        {
          title: "Event Poster Design",
          description: "Professional posters and flyers for your community events",
          price: 35,
          duration: "1-2 days",
        },
      ],
      skills: ["Graphic Design", "Social Media", "Photography", "Adobe Creative Suite", "Canva", "Brand Identity"],
      languages: ["English", "French"],
      education: "Grade 12 Student, Visual Arts Focus",
      experience: "3 years of design experience, 15+ completed projects",
      portfolio: [
        { image: "/community-garden.png", title: "Community Garden Branding", category: "Logo Design" },
        { image: "/youth-workshop.png", title: "Youth Workshop Poster", category: "Event Design" },
        { image: "/abstract-ec.png", title: "Social Media Campaign", category: "Digital Graphics" },
      ],
      availability: ["Monday 4-8 PM", "Wednesday 4-8 PM", "Friday 4-8 PM", "Saturday 10 AM-4 PM"],
      rating: 4.9,
      reviews: [
        {
          id: "r1",
          name: "Jordan K.",
          date: "May 10, 2025",
          rating: 5,
          project: "Logo Design",
          comment:
            "Maya created an amazing logo for our environmental club. She really understood our vision and delivered exactly what we needed!",
        },
        {
          id: "r2",
          name: "Alex M.",
          date: "April 28, 2025",
          rating: 5,
          project: "Event Poster",
          comment:
            "The poster Maya designed for our fundraiser was perfect. Professional quality and helped us attract more attendees.",
        },
        {
          id: "r3",
          name: "Sam T.",
          date: "April 15, 2025",
          rating: 4,
          project: "Social Media Graphics",
          comment: "Great work on our social media graphics. Maya was responsive and made revisions quickly.",
        },
      ],
      completedProjects: 15,
      responseTime: "Usually responds within 2 hours",
      joinedDate: "January 2025",
    },
  }

  return providers[id as keyof typeof providers]
}

export default function ServiceProviderPage({ params }: { params: { providerId: string } }) {
  const provider = getProvider(params.providerId)

  if (!provider) {
    return (
      <div className="container mx-auto py-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Service Provider not found</h1>
        <p className="mb-6">The service provider you're looking for doesn't exist or is no longer available.</p>
        <Button asChild>
          <Link href="/dashboard/marketplace">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link href="/dashboard/marketplace">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative h-48 w-48 rounded-full overflow-hidden mb-4">
                  <Image src={provider.image || "/placeholder.svg"} alt={provider.name} fill className="object-cover" />
                </div>
                <h1 className="text-2xl font-bold">{provider.name}</h1>
                <p className="text-muted-foreground">Age {provider.age}</p>
                <div className="flex items-center mt-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{provider.location}</span>
                </div>

                <div className="flex items-center mt-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="ml-1 font-medium">{provider.rating}</span>
                  <span className="ml-1 text-muted-foreground">({provider.reviews.length} reviews)</span>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {provider.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-1 gap-4 w-full mt-6">
                  <Button className="w-full bg-sew-midnight-blue hover:bg-sew-midnight-blue/90">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </div>

                <div className="flex items-center mt-4 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{provider.responseTime}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Projects Completed</span>
                <span className="font-medium">{provider.completedProjects}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Member Since</span>
                <span className="font-medium">{provider.joinedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Languages</span>
                <span className="font-medium">{provider.languages.join(", ")}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {provider.availability.map((time, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    {time}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About {provider.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{provider.bio}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <h3 className="font-medium mb-2">Education</h3>
                  <p className="text-sm text-muted-foreground">{provider.education}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Experience</h3>
                  <p className="text-sm text-muted-foreground">{provider.experience}</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-2">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {provider.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Services Offered</CardTitle>
              <CardDescription>Choose a service to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {provider.services.map((service, index) => (
                  <Card key={index} className="border">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{service.title}</h3>
                        <div className="text-right">
                          <div className="font-bold text-sew-midnight-blue">${service.price}</div>
                          <div className="text-sm text-muted-foreground">{service.duration}</div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                      <Button size="sm" className="bg-sew-midnight-blue hover:bg-sew-midnight-blue/90">
                        Request This Service
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {provider.portfolio.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="relative h-32 w-full rounded-lg overflow-hidden bg-muted">
                      <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {provider.reviews.map((review) => (
                  <div key={review.id} className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{review.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {review.date} • {review.project}
                        </p>
                      </div>
                      <div className="flex items-center">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                            />
                          ))}
                      </div>
                    </div>
                    <p className="text-sm">{review.comment}</p>
                    {review.id !== provider.reviews[provider.reviews.length - 1].id && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
