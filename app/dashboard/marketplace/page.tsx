import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Search, Star, Clock, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const metadata: Metadata = {
  title: "Marketplace | Small Economy Works",
  description: "Discover services offered by youth in your community.",
}

// Mock data for service providers
const serviceProviders = [
  {
    id: "1",
    name: "Maya Thompson",
    age: 17,
    location: "Whitehorse, YT",
    image: "/young-asian-woman-portrait.png",
    services: ["Graphic Design", "Social Media", "Photography"],
    bio: "Creative designer passionate about helping community projects shine",
    rating: 4.9,
    reviews: 23,
    hourlyRate: 25,
    availability: "Available this week",
    portfolio: ["/community-garden.png", "/youth-workshop.png", "/abstract-ec.png"],
    completedProjects: 15,
    responseTime: "Usually responds within 2 hours",
  },
  {
    id: "2",
    name: "Jordan Blackfeather",
    age: 19,
    location: "Yellowknife, NT",
    image: "/placeholder-pqb8p.png",
    services: ["Web Development", "App Design", "Tech Support"],
    bio: "Full-stack developer helping bring digital ideas to life",
    rating: 4.8,
    reviews: 31,
    hourlyRate: 30,
    availability: "Available next week",
    portfolio: ["/placeholder-416kf.png", "/placeholder-yze5z.png"],
    completedProjects: 22,
    responseTime: "Usually responds within 4 hours",
  },
  {
    id: "3",
    name: "Alex Chen",
    age: 16,
    location: "Iqaluit, NU",
    image: "/asian-professional-glasses.png",
    services: ["Video Editing", "Content Creation", "Storytelling"],
    bio: "Storyteller helping communities share their impact through video",
    rating: 5.0,
    reviews: 18,
    hourlyRate: 20,
    availability: "Available today",
    portfolio: ["/mountain-terrain.png", "/red-barn-landscape.png"],
    completedProjects: 12,
    responseTime: "Usually responds within 1 hour",
  },
  {
    id: "4",
    name: "Sam Redwing",
    age: 18,
    location: "Inuvik, NT",
    image: "/placeholder-55u3s.png",
    services: ["Event Planning", "Community Outreach", "Workshop Facilitation"],
    bio: "Community organizer passionate about bringing people together",
    rating: 4.7,
    reviews: 26,
    hourlyRate: 22,
    availability: "Available this week",
    portfolio: ["/stylized-letters-sj.png", "/abstract-dw.png"],
    completedProjects: 19,
    responseTime: "Usually responds within 3 hours",
  },
]

const serviceCategories = [
  "All Services",
  "Design & Creative",
  "Technology",
  "Marketing & Social Media",
  "Event Planning",
  "Content Creation",
  "Business Support",
  "Education & Tutoring",
]

export default function MarketplacePage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-sew-midnight-blue">Marketplace</h1>
        <p className="text-muted-foreground">
          Discover talented youth in your community offering services to help with your initiatives.
        </p>
      </div>

      <Tabs defaultValue="browse-services" className="space-y-4">
        <TabsList className="bg-sew-warm-gray/10">
          <TabsTrigger
            value="browse-services"
            className="data-[state=active]:bg-sew-midnight-blue data-[state=active]:text-white"
          >
            Browse Services
          </TabsTrigger>
          <TabsTrigger
            value="my-services"
            className="data-[state=active]:bg-sew-midnight-blue data-[state=active]:text-white"
          >
            My Services
          </TabsTrigger>
          <TabsTrigger
            value="my-requests"
            className="data-[state=active]:bg-sew-midnight-blue data-[state=active]:text-white"
          >
            My Requests
          </TabsTrigger>
        </TabsList>

        <TabsContent value="browse-services" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search services, skills, or names..." className="pl-8" />
            </div>
            <Select defaultValue="All Services">
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {serviceCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select defaultValue="rating">
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="availability">Available Now</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceProviders.map((provider) => (
              <Card
                key={provider.id}
                className="overflow-hidden border-sew-warm-gray/20 hover:border-sew-midnight-blue/30 transition-colors"
              >
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full bg-muted">
                    <Image
                      src={provider.image || "/placeholder.svg"}
                      alt={provider.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="bg-white/90 text-sew-midnight-blue">
                        ${provider.hourlyRate}/hr
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div>
                      <CardTitle className="text-sew-midnight-blue">{provider.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Age {provider.age} • {provider.location}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {provider.services.map((service) => (
                        <Badge
                          key={service}
                          variant="secondary"
                          className="bg-sew-sky-blue/10 text-sew-sky-blue hover:bg-sew-sky-blue/20 border-sew-sky-blue/20"
                        >
                          {service}
                        </Badge>
                      ))}
                    </div>

                    <p className="text-sm">{provider.bio}</p>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-sew-sunset-orange">
                        <Star className="h-4 w-4 fill-current mr-1" />
                        <span>
                          {provider.rating} ({provider.reviews} reviews)
                        </span>
                      </div>
                      <div className="text-muted-foreground">{provider.completedProjects} projects</div>
                    </div>

                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{provider.availability}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between p-6 pt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-sew-moss-green text-sew-moss-green hover:bg-sew-moss-green/10"
                  >
                    Message
                  </Button>
                  <Button size="sm" className="bg-sew-midnight-blue hover:bg-sew-midnight-blue/90" asChild>
                    <Link href={`/dashboard/marketplace/${provider.id}`}>
                      View Profile
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-services" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-sew-midnight-blue">My Service Offerings</h2>
            <Button className="bg-sew-midnight-blue hover:bg-sew-midnight-blue/90">Add New Service</Button>
          </div>

          <Card className="border-sew-warm-gray/20">
            <CardContent className="p-6 text-center">
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-sew-sky-blue/10 rounded-full flex items-center justify-center">
                  <ShoppingBag className="h-8 w-8 text-sew-sky-blue" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-sew-midnight-blue">Start Offering Your Services</h3>
                  <p className="text-muted-foreground mt-2">
                    Share your talents with the community and help other youth with their initiatives.
                  </p>
                </div>
                <Button className="bg-sew-midnight-blue hover:bg-sew-midnight-blue/90">
                  Create Your First Service
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my-requests" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-sew-midnight-blue">Service Requests</h2>
            <Button className="bg-sew-midnight-blue hover:bg-sew-midnight-blue/90">Post New Request</Button>
          </div>

          <Card className="border-sew-warm-gray/20">
            <CardContent className="p-6 text-center">
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-sew-moss-green/10 rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-sew-moss-green" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-sew-midnight-blue">No Service Requests Yet</h3>
                  <p className="text-muted-foreground mt-2">
                    When you request services from other youth, they'll appear here.
                  </p>
                </div>
                <Button className="bg-sew-midnight-blue hover:bg-sew-midnight-blue/90">Browse Services</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
