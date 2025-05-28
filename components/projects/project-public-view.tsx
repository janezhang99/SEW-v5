import Image from "next/image"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  FileText,
  ExternalLink,
  MessageSquare,
  ThumbsUp,
  Thermometer,
  Leaf,
  Building,
  Shield,
  Target,
  ChevronRight,
  Share2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProjectPublicViewProps {
  project: {
    id: string | string[]
    name: string
    description: string
    goal: string
    timeline: string
    stage: string
  }
}

export function ProjectPublicView({ project }: ProjectPublicViewProps) {
  // Calculate a random progress value between 10-90% for demo purposes
  const progress = Math.floor(Math.random() * 80) + 10

  // Map stage to badge color and icon
  const stageInfo = {
    planning: {
      variant: "secondary",
      icon: <Target className="h-4 w-4 mr-1" />,
      description: "Planning & Design Phase",
    },
    implementation: {
      variant: "primary",
      icon: <Building className="h-4 w-4 mr-1" />,
      description: "Implementation Phase",
    },
    monitoring: {
      variant: "warning",
      icon: <Thermometer className="h-4 w-4 mr-1" />,
      description: "Monitoring & Evaluation Phase",
    },
    evaluation: {
      variant: "success",
      icon: <Shield className="h-4 w-4 mr-1" />,
      description: "Impact Assessment Phase",
    },
    completed: {
      variant: "default",
      icon: <Leaf className="h-4 w-4 mr-1" />,
      description: "Project Completed",
    },
  }[project.stage] || { variant: "default", icon: null, description: "Project Status" }

  // Mock data for public updates
  const publicUpdates = [
    {
      id: "1",
      author: {
        name: "Alex Johnson",
        avatar: "/diverse-person-portrait.png",
        role: "Project Lead",
      },
      content:
        "We're excited to announce that the first phase of our Urban Heat Island Mitigation Project is now complete! We've planted over 200 trees and installed green roofs on 3 public buildings. Initial measurements show a 1.5°C reduction in surface temperatures in the target areas. Thank you to all community members who participated!",
      createdAt: "2025-05-01T10:15:00Z",
      likes: 45,
      comments: [
        {
          id: "1",
          author: {
            name: "Community Member",
            role: "Resident",
          },
          content: "The new trees look beautiful and it definitely feels cooler in our neighborhood. Great work!",
          createdAt: "2025-05-01T11:30:00Z",
        },
        {
          id: "2",
          author: {
            name: "Local Business Owner",
            role: "Stakeholder",
          },
          content:
            "We've noticed more foot traffic since the improvements. People are spending more time outside now that it's cooler.",
          createdAt: "2025-05-01T14:20:00Z",
        },
      ],
      images: ["/urban-greening-project.png"],
    },
    {
      id: "2",
      author: {
        name: "Alex Johnson",
        avatar: "/diverse-person-portrait.png",
        role: "Project Lead",
      },
      content:
        "Community update: Our next tree planting event is scheduled for May 22nd at Central Park. We'll be planting 50 native trees that are drought-resistant and provide excellent shade. No experience necessary - we'll provide all tools and guidance. Join us from 9am-12pm and be part of the solution to urban heat!",
      createdAt: "2025-04-15T09:30:00Z",
      likes: 32,
      comments: [
        {
          id: "1",
          author: {
            name: "Neighborhood Association",
            role: "Community Partner",
          },
          content: "We'll be bringing 15 volunteers from our neighborhood association. Looking forward to it!",
          createdAt: "2025-04-15T10:45:00Z",
        },
      ],
    },
  ]

  // Format date to relative time (e.g., "2 days ago")
  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true })
    } catch (error) {
      return "recently"
    }
  }

  // Project key facts
  const keyFacts = [
    {
      icon: <Thermometer className="h-8 w-8 text-primary" />,
      title: "Temperature Reduction",
      value: "5°F",
      description: "Target temperature decrease in urban areas",
    },
    {
      icon: <Leaf className="h-8 w-8 text-primary" />,
      title: "Trees Planted",
      value: "500+",
      description: "Native, drought-resistant shade trees",
    },
    {
      icon: <Building className="h-8 w-8 text-primary" />,
      title: "Green Roofs",
      value: "5",
      description: "Installed on public buildings",
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Cooling Centers",
      value: "3",
      description: "Established in vulnerable communities",
    },
  ]

  // Project timeline milestones
  const milestones = [
    {
      date: "Jan 2023",
      title: "Project Launch",
      description: "Initial planning and community engagement",
      completed: true,
    },
    {
      date: "Jun 2023",
      title: "Phase 1 Implementation",
      description: "First round of tree planting and green roof installation",
      completed: true,
    },
    {
      date: "Jan 2024",
      title: "Midpoint Evaluation",
      description: "Assessment of initial temperature impacts",
      completed: true,
    },
    {
      date: "Jun 2024",
      title: "Phase 2 Implementation",
      description: "Cooling centers and additional green infrastructure",
      completed: false,
    },
    {
      date: "Dec 2025",
      title: "Project Completion",
      description: "Final evaluation and community celebration",
      completed: false,
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        <Image
          src="/urban-green-infrastructure.png"
          alt={project.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container mx-auto px-4 pb-8 md:pb-12">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant={stageInfo.variant as any} className="text-sm py-1 px-3">
                  <span className="flex items-center">
                    {stageInfo.icon}
                    {stageInfo.description}
                  </span>
                </Badge>
                <Badge variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-white/20">
                  <Calendar className="mr-1 h-3 w-3" />
                  {project.timeline}
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">{project.name}</h1>

              <p className="text-base md:text-lg text-white/90 mb-4 max-w-2xl line-clamp-2">{project.description}</p>

              <div className="flex flex-wrap gap-3">
                <Button className="gap-2">
                  <Users className="h-4 w-4" />
                  Get Involved
                </Button>
                <Button
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 hover:text-white"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Project Brief
                </Button>
                <Button
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 hover:text-white"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="container mx-auto">
          <div className="flex items-center justify-between py-2">
            <Link href="/projects">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to Projects
              </Button>
            </Link>

            <div className="flex items-center gap-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                Last updated {new Date().toLocaleDateString()}
              </div>
              <div className="hidden md:flex items-center ml-4">
                <div className="mr-2 text-sm font-medium">Progress:</div>
                <div className="w-40 mr-2">
                  <Progress value={progress} className="h-2" />
                </div>
                <div className="text-sm">{progress}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Facts Section */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Project at a Glance</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyFacts.map((fact, index) => (
              <Card key={index} className="border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-4 rounded-full mb-4">{fact.icon}</div>
                    <h3 className="text-xl font-semibold mb-1">{fact.title}</h3>
                    <p className="text-3xl font-bold text-primary mb-2">{fact.value}</p>
                    <p className="text-muted-foreground">{fact.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="mb-8">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="updates">Updates</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="pt-6">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Project Goal</h2>
                    <p className="text-lg">{project.goal}</p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
                    <p className="mb-4">
                      Urban heat islands are metropolitan areas that are significantly warmer than their surrounding
                      rural areas due to human activities and infrastructure. In our city, some neighborhoods experience
                      temperatures up to 10°F higher than surrounding areas, creating health risks and increasing energy
                      consumption.
                    </p>
                    <p>
                      Low-income and vulnerable communities are disproportionately affected by urban heat, with less
                      access to air conditioning, fewer green spaces, and higher rates of heat-related illness.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">Our Approach</h2>
                    <p className="mb-4">
                      This community-led initiative aims to reduce the impact of urban heat islands in vulnerable
                      neighborhoods through a combination of green infrastructure, tree planting, and community cooling
                      centers.
                    </p>
                    <p>
                      The project engages local residents, businesses, and community organizations to create sustainable
                      solutions that improve quality of life while building climate resilience.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">Expected Outcomes</h2>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 bg-primary/10 p-1 rounded-full">
                          <Leaf className="h-4 w-4 text-primary" />
                        </div>
                        <span>Increase urban tree canopy by 15% in target neighborhoods</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 bg-primary/10 p-1 rounded-full">
                          <Building className="h-4 w-4 text-primary" />
                        </div>
                        <span>Install 5 green roofs on public buildings</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 bg-primary/10 p-1 rounded-full">
                          <Shield className="h-4 w-4 text-primary" />
                        </div>
                        <span>Establish 3 cooling centers in vulnerable communities</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 bg-primary/10 p-1 rounded-full">
                          <Thermometer className="h-4 w-4 text-primary" />
                        </div>
                        <span>Reduce average summer temperatures by 2°C in target areas</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 bg-primary/10 p-1 rounded-full">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                        <span>Improve community awareness of climate adaptation strategies</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">Project Location</h2>
                    <div className="relative h-80 w-full overflow-hidden rounded-lg border">
                      <div className="absolute inset-0 flex items-center justify-center bg-muted">
                        <MapPin className="h-12 w-12 text-muted-foreground" />
                        <span className="sr-only">Project location map</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="updates" className="pt-6">
                <h2 className="text-2xl font-bold mb-6">Project Updates</h2>
                <div className="space-y-6">
                  {publicUpdates.map((update) => (
                    <Card key={update.id} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={update.author.avatar || "/placeholder.svg"} alt={update.author.name} />
                            <AvatarFallback>{update.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold">{update.author.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {update.author.role} • {formatDate(update.createdAt)}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <p className="whitespace-pre-wrap mb-4">{update.content}</p>

                        {/* Display images if any */}
                        {update.images && update.images.length > 0 && (
                          <div className="grid grid-cols-1 gap-2 mb-4">
                            {update.images.map((image, index) => (
                              <div key={index} className="relative aspect-video w-full overflow-hidden rounded-md">
                                <Image
                                  src={image || "/placeholder.svg"}
                                  alt="Update image"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Action buttons */}
                        <div className="flex items-center gap-4 pt-2">
                          <Button variant="ghost" size="sm" className="text-muted-foreground">
                            <ThumbsUp className="mr-1 h-4 w-4" />
                            {update.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-muted-foreground">
                            <MessageSquare className="mr-1 h-4 w-4" />
                            {update.comments.length}
                          </Button>
                        </div>
                      </CardContent>

                      {/* Comments section */}
                      <CardFooter className="flex flex-col border-t px-6 py-4">
                        <div className="space-y-4 w-full">
                          {update.comments.map((comment) => (
                            <div key={comment.id} className="flex gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={comment.author.avatar || "/placeholder.svg"}
                                  alt={comment.author.name}
                                />
                                <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="bg-muted rounded-lg px-3 py-2">
                                  <div className="flex justify-between items-center">
                                    <div className="font-medium text-sm">{comment.author.name}</div>
                                    <div className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</div>
                                  </div>
                                  <p className="text-sm mt-1">{comment.content}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Add comment form */}
                        <div className="flex gap-3 mt-4 w-full">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 flex gap-2">
                            <Textarea placeholder="Write a comment..." className="min-h-[60px] flex-1" />
                            <Button size="sm" className="self-end">
                              Comment
                            </Button>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="timeline" className="pt-6">
                <h2 className="text-2xl font-bold mb-6">Project Timeline</h2>
                <div className="relative border-l-2 border-primary/30 pl-6 ml-3 space-y-8">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="relative">
                      <div
                        className={`absolute -left-8 w-4 h-4 rounded-full ${milestone.completed ? "bg-primary" : "bg-muted border-2 border-primary/30"}`}
                      ></div>
                      <div className="mb-1 text-sm text-muted-foreground">{milestone.date}</div>
                      <h3 className="text-lg font-semibold">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Project Gallery */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="relative aspect-square overflow-hidden rounded-md">
                  <Image
                    src="/urban-greening-project.png"
                    alt="Project photo 1"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-md">
                  <Image
                    src="/urban-green-infrastructure.png"
                    alt="Project photo 2"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-md">
                  <Image
                    src="/nature-based-solutions-urban.png"
                    alt="Project photo 3"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-md md:col-span-2">
                  <Image
                    src="/community-event.png"
                    alt="Project photo 4"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-md">
                  <Image
                    src="/climate-adaptation-policy.png"
                    alt="Project photo 5"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Impact Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Project Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Community Engagement</div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">1,200+</span>
                    <span className="text-sm text-muted-foreground">Participants</span>
                  </div>
                  <Progress value={80} className="h-2 mt-2" />
                </div>

                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Temperature Reduction</div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">1.5°C</span>
                    <span className="text-sm text-muted-foreground">Current reduction</span>
                  </div>
                  <Progress value={30} className="h-2 mt-2" />
                </div>

                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Trees Planted</div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">200</span>
                    <span className="text-sm text-muted-foreground">of 500 target</span>
                  </div>
                  <Progress value={40} className="h-2 mt-2" />
                </div>
              </CardContent>
            </Card>

            {/* Project Team */}
            <Card>
              <CardHeader>
                <CardTitle>Project Team</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/diverse-person-portrait.png" alt="Alex Johnson" />
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">Alex Johnson</div>
                      <div className="text-sm text-muted-foreground">Project Lead</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/diverse-group-five.png" alt="Sam Rivera" />
                      <AvatarFallback>SR</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">Sam Rivera</div>
                      <div className="text-sm text-muted-foreground">Urban Planner</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/diverse-group-conversation.png" alt="Taylor Kim" />
                      <AvatarFallback>TK</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">Taylor Kim</div>
                      <div className="text-sm text-muted-foreground">Environmental Scientist</div>
                    </div>
                  </div>
                </div>

                <Button variant="ghost" size="sm" className="w-full mt-4">
                  View All Team Members
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Get Involved */}
            <Card>
              <CardHeader>
                <CardTitle>Get Involved</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full">
                  <Users className="mr-2 h-4 w-4" />
                  Volunteer for This Project
                </Button>
                <Button variant="outline" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Download Project Brief
                </Button>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit Project Website
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-2 border-primary pl-4 py-1">
                  <div className="font-medium">Community Tree Planting Day</div>
                  <div className="text-sm text-muted-foreground">May 22, 2025 • 9:00 AM</div>
                  <div className="mt-1 text-sm">Central Park, Main Entrance</div>
                </div>
                <div className="border-l-2 border-primary pl-4 py-1">
                  <div className="font-medium">Green Roof Workshop</div>
                  <div className="text-sm text-muted-foreground">June 5, 2025 • 2:00 PM</div>
                  <div className="mt-1 text-sm">Community Center, Room 204</div>
                </div>
                <Button variant="link" className="px-0">
                  See all events
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Partners */}
            <Card>
              <CardHeader>
                <CardTitle>Project Partners</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">City Planning Department</Badge>
                  <Badge variant="outline">Community Garden Association</Badge>
                  <Badge variant="outline">Urban Forestry Initiative</Badge>
                  <Badge variant="outline">Climate Resilience Network</Badge>
                  <Badge variant="outline">Neighborhood Association</Badge>
                  <Badge variant="outline">Local Business Council</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Us in Building a Cooler, Greener City</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Together, we can reduce urban heat islands and create more livable, resilient communities for everyone.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary">
              <Users className="mr-2 h-5 w-5" />
              Volunteer Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Attend an Event
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
