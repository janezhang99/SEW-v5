import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Filter, ThumbsUp, Eye } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { format } from "date-fns"

// Sample discussions data (same as before)
const discussions = [
  {
    id: "discussion-1",
    title: "Best practices for community engagement in adaptation planning",
    content:
      "I'm working on an adaptation plan for a coastal community and looking for effective ways to engage residents in the process. What approaches have worked well for others?",
    author: {
      name: "Sarah Johnson",
      avatar: "/diverse-person-portrait.png",
      role: "Municipal Planner",
    },
    domain: "Strategic Adaptation Planning",
    group: "Strategic Planning",
    createdAt: "2023-05-01T14:30:00Z",
    replies: 12,
    views: 156,
    likes: 24,
    tags: ["community", "engagement", "planning"],
    featured: true,
  },
  {
    id: "discussion-2",
    title: "Challenges in monitoring adaptation outcomes",
    content:
      "We've implemented several adaptation measures in our region, but we're struggling to effectively monitor and evaluate their outcomes. Looking for advice on practical monitoring approaches.",
    author: {
      name: "Michael Chen",
      avatar: "/diverse-group-conversation.png",
      role: "Adaptation Specialist",
    },
    domain: "Monitoring & Learning (MEL)",
    group: "Monitoring & Evaluation",
    createdAt: "2023-04-28T09:15:00Z",
    replies: 8,
    views: 112,
    likes: 18,
    tags: ["monitoring", "evaluation", "outcomes"],
  },
  {
    id: "discussion-3",
    title: "Integrating nature-based solutions in urban environments",
    content:
      "Our city is looking to incorporate more nature-based solutions for flood management. Would love to hear examples of successful urban NBS implementations and lessons learned.",
    author: {
      name: "Elena Rodriguez",
      avatar: "/diverse-group-meeting.png",
      role: "Urban Planner",
    },
    domain: "Adaptation Options",
    group: "Nature-based Solutions",
    createdAt: "2023-05-03T11:45:00Z",
    replies: 15,
    views: 203,
    likes: 32,
    tags: ["naturebasedsolutions", "urban", "flooding"],
    featured: true,
  },
  {
    id: "discussion-4",
    title: "Cost-benefit analysis methods for adaptation options",
    content:
      "I'm trying to compare different adaptation options for our municipality and need advice on conducting a robust cost-benefit analysis that accounts for non-monetary benefits.",
    author: {
      name: "David Wilson",
      avatar: "/diverse-group-meeting.png",
      role: "Economic Analyst",
    },
    domain: "Adaptation Options",
    group: "Strategic Planning",
    createdAt: "2023-04-25T16:20:00Z",
    replies: 7,
    views: 98,
    likes: 14,
    tags: ["economics", "cost-benefit", "analysis"],
  },
]

export default function DiscussionsPage() {
  return (
    <div className="flex flex-col w-full">
      <PageHeader title="Discussions" description="Join conversations with other adaptation practitioners">
        <div className="flex flex-col sm:flex-row gap-2 max-w-3xl mx-auto mt-6">
          <Button className="w-full sm:w-auto bg-white/90 text-black hover:bg-white/80">Start a Discussion</Button>

          <div className="relative w-full sm:w-[240px]">
            <Input placeholder="Search discussions..." className="h-9 bg-white/90 text-black" />
          </div>
        </div>
      </PageHeader>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Domain</h3>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="All domains" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All domains</SelectItem>
                      <SelectItem value="risk">Climate Risk Assessment</SelectItem>
                      <SelectItem value="planning">Strategic Adaptation Planning</SelectItem>
                      <SelectItem value="options">Adaptation Options</SelectItem>
                      <SelectItem value="implementation">Implementation & Operations</SelectItem>
                      <SelectItem value="monitoring">Monitoring & Learning</SelectItem>
                      <SelectItem value="cross-cutting">Cross-Cutting Skills</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Peer Circle</h3>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="All groups" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All groups</SelectItem>
                      <SelectItem value="nature">Nature-based Solutions</SelectItem>
                      <SelectItem value="monitoring">Monitoring & Evaluation</SelectItem>
                      <SelectItem value="planning">Strategic Planning</SelectItem>
                      <SelectItem value="risk">Climate Risk Assessment</SelectItem>
                      <SelectItem value="implementation">Adaptation Implementation</SelectItem>
                      <SelectItem value="equity">Equity & Justice</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Sort By</h3>
                  <Select defaultValue="recent">
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="active">Most Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" className="w-full mt-2">
                  Clear Filters
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Popular Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                    #naturebasedsolutions
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                    #monitoring
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                    #equity
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                    #planning
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                    #implementation
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                    #vulnerability
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:w-3/4">
            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">All Discussions</TabsTrigger>
                <TabsTrigger value="featured">Featured</TabsTrigger>
                <TabsTrigger value="my">My Discussions</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <div className="space-y-4">
                  {discussions.map((discussion) => (
                    <Card key={discussion.id} className={discussion.featured ? "border-2 border-primary/20" : ""}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={discussion.author.avatar || "/placeholder.svg"}
                              alt={discussion.author.name}
                            />
                            <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <div className="flex justify-between">
                              <div>
                                <Link
                                  href={`/discussions/${discussion.id}`}
                                  className="font-medium hover:underline text-lg"
                                >
                                  {discussion.title}
                                </Link>
                                {discussion.featured && (
                                  <Badge className="ml-2 bg-primary/20 text-primary border-primary/20">Featured</Badge>
                                )}
                              </div>
                              <Badge variant="outline">{discussion.domain}</Badge>
                            </div>
                            <p className="text-muted-foreground line-clamp-2">{discussion.content}</p>
                            <div className="flex flex-wrap gap-1 pt-1">
                              {discussion.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground pt-2">
                              <div className="flex items-center gap-1">
                                <span className="font-medium">{discussion.author.name}</span>
                                <span>• {discussion.author.role}</span>
                              </div>
                              <div>{format(new Date(discussion.createdAt), "MMM d, yyyy")}</div>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center">
                                  <MessageSquare className="mr-1 h-4 w-4" />
                                  <span>{discussion.replies}</span>
                                </div>
                                <div className="flex items-center">
                                  <Eye className="mr-1 h-4 w-4" />
                                  <span>{discussion.views}</span>
                                </div>
                                <div className="flex items-center">
                                  <ThumbsUp className="mr-1 h-4 w-4" />
                                  <span>{discussion.likes}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="featured" className="mt-6">
                <div className="space-y-4">
                  {discussions
                    .filter((d) => d.featured)
                    .map((discussion) => (
                      <Card key={discussion.id} className="border-2 border-primary/20">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={discussion.author.avatar || "/placeholder.svg"}
                                alt={discussion.author.name}
                              />
                              <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-2">
                              <div className="flex justify-between">
                                <div>
                                  <Link
                                    href={`/discussions/${discussion.id}`}
                                    className="font-medium hover:underline text-lg"
                                  >
                                    {discussion.title}
                                  </Link>
                                  <Badge className="ml-2 bg-primary/20 text-primary border-primary/20">Featured</Badge>
                                </div>
                                <Badge variant="outline">{discussion.domain}</Badge>
                              </div>
                              <p className="text-muted-foreground line-clamp-2">{discussion.content}</p>
                              <div className="flex flex-wrap gap-1 pt-1">
                                {discussion.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    #{tag}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground pt-2">
                                <div className="flex items-center gap-1">
                                  <span className="font-medium">{discussion.author.name}</span>
                                  <span>• {discussion.author.role}</span>
                                </div>
                                <div>{format(new Date(discussion.createdAt), "MMM d, yyyy")}</div>
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center">
                                    <MessageSquare className="mr-1 h-4 w-4" />
                                    <span>{discussion.replies}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Eye className="mr-1 h-4 w-4" />
                                    <span>{discussion.views}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <ThumbsUp className="mr-1 h-4 w-4" />
                                    <span>{discussion.likes}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="my" className="mt-6">
                <div className="text-center py-12">
                  <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-medium">You haven't started any discussions yet</h3>
                  <p className="mt-2 text-muted-foreground">
                    Start a new discussion to share your questions or insights with the community.
                  </p>
                  <Button className="mt-4">Start a Discussion</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
