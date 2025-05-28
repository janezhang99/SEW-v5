import { PageHeader } from "@/components/page-header"
import { ContentGrid } from "@/components/content-grid"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, MessageSquare, Thermometer, Clipboard, Leaf, LineChart } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

// Sample groups data (same as before)
const groups = [
  {
    id: "group-1",
    name: "Nature-based Solutions",
    description: "Explore and discuss nature-based approaches to climate adaptation.",
    domain: "Adaptation Options",
    members: 24,
    discussions: 18,
    activity: 85,
    icon: Leaf,
    color: "emerald",
    featured: true,
  },
  {
    id: "group-2",
    name: "Monitoring & Evaluation",
    description: "Share experiences and best practices in monitoring and evaluating adaptation initiatives.",
    domain: "Monitoring & Learning (MEL)",
    members: 18,
    discussions: 12,
    activity: 70,
    icon: LineChart,
    color: "amber",
    featured: true,
  },
  {
    id: "group-3",
    name: "Strategic Planning",
    description: "Discuss approaches to strategic adaptation planning at various scales.",
    domain: "Strategic Adaptation Planning",
    members: 32,
    discussions: 24,
    activity: 90,
    icon: Clipboard,
    color: "blue",
    featured: true,
  },
  {
    id: "group-4",
    name: "Climate Risk Assessment",
    description: "Share methodologies and tools for assessing climate risks and vulnerabilities.",
    domain: "Climate Risk Assessment",
    members: 28,
    discussions: 20,
    activity: 75,
    icon: Thermometer,
    color: "red",
  },
]

export default function GroupsPage() {
  const getColorClass = (color: string, type: "bg" | "text" | "border") => {
    const colorMap: Record<string, Record<string, string>> = {
      emerald: {
        bg: "bg-emerald-100 dark:bg-emerald-900",
        text: "text-emerald-600 dark:text-emerald-400",
        border: "border-emerald-200 dark:border-emerald-800",
      },
      amber: {
        bg: "bg-amber-100 dark:bg-amber-900",
        text: "text-amber-600 dark:text-amber-400",
        border: "border-amber-200 dark:border-amber-800",
      },
      blue: {
        bg: "bg-blue-100 dark:bg-blue-900",
        text: "text-blue-600 dark:text-blue-400",
        border: "border-blue-200 dark:border-blue-800",
      },
      red: {
        bg: "bg-red-100 dark:bg-red-900",
        text: "text-red-600 dark:text-red-400",
        border: "border-red-200 dark:border-red-800",
      },
    }

    return colorMap[color]?.[type] || ""
  }

  return (
    <>
      <PageHeader title="Peer Circles" description="Join discussions with practitioners in your field">
        <div className="flex flex-col sm:flex-row gap-2 max-w-3xl mx-auto mt-6">
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px] bg-white/90 text-black">
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

          <Select defaultValue="activity">
            <SelectTrigger className="w-full sm:w-[180px] bg-white/90 text-black">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="activity">Sort by Activity</SelectItem>
              <SelectItem value="members">Sort by Members</SelectItem>
              <SelectItem value="discussions">Sort by Discussions</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative w-full sm:w-[200px]">
            <Input placeholder="Search circles..." className="h-9 bg-white/90 text-black" />
          </div>
        </div>
      </PageHeader>

      <div className="container mx-auto px-4 py-6">
        <ContentGrid showViewToggle={false} itemCount={groups.length}>
          {groups.map((group) => (
            <Card
              key={group.id}
              className={`overflow-hidden ${group.featured ? `border-2 ${getColorClass(group.color, "border")}` : ""}`}
            >
              <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full ${getColorClass(group.color, "bg")} flex items-center justify-center`}
                    >
                      <group.icon className={`h-5 w-5 ${getColorClass(group.color, "text")}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <CardDescription>{group.domain}</CardDescription>
                    </div>
                  </div>
                  {group.featured && <Badge className="bg-amber-500 hover:bg-amber-600">Featured</Badge>}
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-muted-foreground mb-4">{group.description}</p>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Activity Level</span>
                    <span className="font-medium">{group.activity}%</span>
                  </div>
                  <Progress value={group.activity} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex flex-col items-center p-2 bg-muted rounded-md">
                    <Users className="h-5 w-5 mb-1 text-muted-foreground" />
                    <span className="text-lg font-medium">{group.members}</span>
                    <span className="text-xs text-muted-foreground">Members</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-muted rounded-md">
                    <MessageSquare className="h-5 w-5 mb-1 text-muted-foreground" />
                    <span className="text-lg font-medium">{group.discussions}</span>
                    <span className="text-xs text-muted-foreground">Discussions</span>
                  </div>
                </div>

                {group.members > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Active Members</h4>
                    <div className="flex -space-x-2">
                      {Array.from({ length: Math.min(5, group.members) }).map((_, i) => (
                        <Avatar key={i} className="border-2 border-background">
                          <AvatarImage src={`/diverse-group.png?height=32&width=32&query=person${i + 1}`} />
                          <AvatarFallback>{`P${i + 1}`}</AvatarFallback>
                        </Avatar>
                      ))}
                      {group.members > 5 && (
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-xs font-medium">
                          +{group.members - 5}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full" asChild>
                  <Link href={`/groups/${group.id}`}>Join Circle</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </ContentGrid>

        <div className="flex justify-center mt-8">
          <Button variant="outline" size="lg">
            Create a New Circle
          </Button>
        </div>
      </div>
    </>
  )
}
