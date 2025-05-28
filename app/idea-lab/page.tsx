import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { IdeaCard } from "@/components/idea-lab/idea-card"
import { IdeaSpotlight } from "@/components/idea-lab/idea-spotlight"
import { ShareIdeaDialog } from "@/components/idea-lab/share-idea-dialog"
import { Filter, Search } from "lucide-react"

// Sample data for ideas
const ideas = [
  {
    id: "idea-1",
    title: "Community-based flood monitoring network",
    author: {
      name: "Maria Chen",
      avatar: "/diverse-person-portrait.png",
      role: "Community Organizer",
    },
    description:
      "Creating a network of citizen scientists to monitor and report local flooding events to improve data collection and early warning systems.",
    tags: ["monitoring", "community", "flooding", "citizen-science"],
    stage: "Looking for collaborators",
    region: "British Columbia",
    comments: 8,
    followers: 12,
    resonates: 24,
    createdAt: "2023-05-10T14:30:00Z",
    image: "/climate-risk-map-flooding.png",
  },
  {
    id: "idea-2",
    title: "Urban shade mapping for heat vulnerability",
    author: {
      name: "Jamal Williams",
      avatar: "/diverse-group-conversation.png",
      role: "Urban Planner",
    },
    description:
      "Using satellite imagery and street-level photos to map urban shade coverage and identify priority areas for tree planting and shade structures.",
    tags: ["urban-heat", "mapping", "vulnerability", "nature-based"],
    stage: "Exploring the problem",
    region: "Ontario",
    comments: 5,
    followers: 9,
    resonates: 18,
    createdAt: "2023-05-08T09:15:00Z",
  },
  {
    id: "idea-3",
    title: "Indigenous knowledge integration framework",
    author: {
      name: "Sarah Redbird",
      avatar: "/diverse-group-meeting.png",
      role: "Indigenous Knowledge Keeper",
    },
    description:
      "Developing a respectful framework for integrating traditional ecological knowledge with scientific climate data for holistic adaptation planning.",
    tags: ["indigenous", "knowledge", "integration", "planning"],
    stage: "Gathering input",
    region: "Northwest Territories",
    comments: 12,
    followers: 15,
    resonates: 32,
    createdAt: "2023-05-12T11:45:00Z",
    featured: true,
  },
  {
    id: "idea-4",
    title: "Climate-resilient seed library",
    author: {
      name: "Thomas Nguyen",
      avatar: "/diverse-group-five.png",
      role: "Agricultural Specialist",
    },
    description:
      "Creating a community seed library focused on drought-resistant and heat-tolerant plant varieties adapted to changing local conditions.",
    tags: ["agriculture", "community", "biodiversity", "food-security"],
    stage: "Just a hunch",
    region: "Prairie Provinces",
    comments: 3,
    followers: 7,
    resonates: 14,
    createdAt: "2023-05-05T16:20:00Z",
  },
  {
    id: "idea-5",
    title: "Coastal erosion visualization tool",
    author: {
      name: "Emma Johnson",
      avatar: "/diverse-group-meeting.png",
      role: "GIS Specialist",
    },
    description:
      "An interactive tool to visualize historical and projected coastal erosion to help communities understand risks and plan adaptation measures.",
    tags: ["coastal", "visualization", "erosion", "planning"],
    stage: "Ready to turn into a project",
    region: "Atlantic Canada",
    comments: 9,
    followers: 11,
    resonates: 26,
    createdAt: "2023-05-07T13:30:00Z",
  },
]

// Featured idea (could be selected based on engagement metrics or editorial choice)
const featuredIdea = ideas.find((idea) => idea.featured) || ideas[2]

export default function IdeaLabPage() {
  return (
    <div className="flex flex-col w-full">
      <PageHeader
        title="Idea Lab"
        description="Share early-stage climate adaptation ideas, get feedback, and find collaborators"
      >
        <div className="flex flex-col sm:flex-row gap-2 max-w-3xl mx-auto mt-6">
          <ShareIdeaDialog>
            <Button className="w-full sm:w-auto">Share an Idea</Button>
          </ShareIdeaDialog>

          <div className="relative w-full sm:w-[240px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search ideas..." className="pl-8" />
          </div>
        </div>
      </PageHeader>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Panel: Idea Feed */}
          <div className="lg:w-2/3 space-y-6">
            <div className="flex items-center justify-between">
              <Tabs defaultValue="all" className="w-[400px]">
                <TabsList>
                  <TabsTrigger value="all">All Ideas</TabsTrigger>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                  <TabsTrigger value="following">Following</TabsTrigger>
                </TabsList>
              </Tabs>

              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>

            <div className="space-y-4">
              {ideas.map((idea) => (
                <IdeaCard key={idea.id} idea={idea} />
              ))}
            </div>

            <div className="flex justify-center">
              <Button variant="outline">Load More Ideas</Button>
            </div>
          </div>

          {/* Right Panel: Idea Spotlight */}
          <div className="lg:w-1/3 space-y-6">
            <IdeaSpotlight idea={featuredIdea} />

            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-3">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                  #community
                </Badge>
                <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                  #nature-based
                </Badge>
                <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                  #urban-heat
                </Badge>
                <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                  #coastal
                </Badge>
                <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                  #indigenous
                </Badge>
                <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                  #monitoring
                </Badge>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-3">Idea Stages</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Just a hunch</span>
                  <Badge variant="outline">12</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Exploring the problem</span>
                  <Badge variant="outline">24</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Gathering input</span>
                  <Badge variant="outline">18</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Looking for collaborators</span>
                  <Badge variant="outline">31</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Ready for project</span>
                  <Badge variant="outline">15</Badge>
                </div>
              </div>
            </Card>

            <Card className="bg-primary/10 p-4">
              <h3 className="text-lg font-semibold mb-2">Every big project starts with a spark</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Share your climate adaptation ideas, no matter how early-stage, and watch them grow with community
                input.
              </p>
              <ShareIdeaDialog>
                <Button size="sm">Plant Your Idea</Button>
              </ShareIdeaDialog>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
