import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  MessageSquare,
  Settings,
  Layers,
  FileText,
  Users,
  BarChart,
  Network,
  User,
  Lightbulb,
  Sparkles,
} from "lucide-react"

export default function AICompanionAdmin() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">AI Companion Management</h2>
          <p className="text-muted-foreground">Configure and manage the AI Companion system across the platform</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href="/admin/ai-companion/analytics">
              <BarChart className="mr-2 h-4 w-4" />
              Analytics
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/ai-companion/settings">
              <Settings className="mr-2 h-4 w-4" />
              Global Settings
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
          <TabsTrigger value="flows">Flows</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="prompts">Prompts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Interactions</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,543</div>
                <p className="text-xs text-muted-foreground">+1,234 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">743</div>
                <p className="text-xs text-muted-foreground">+82 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Satisfaction Rate</CardTitle>
                <Sparkles className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground">+2% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Popular Flows</CardTitle>
                <CardDescription>Most frequently used AI Companion flows</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <Lightbulb className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Grant Readiness Coach</div>
                        <div className="text-sm text-muted-foreground">32% of interactions</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/admin/ai-companion/flows/grant_readiness">Configure</Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Course Recommender</div>
                        <div className="text-sm text-muted-foreground">24% of interactions</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/admin/ai-companion/flows/course_recommendation">Configure</Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <Network className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">System Scan</div>
                        <div className="text-sm text-muted-foreground">18% of interactions</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/admin/ai-companion/flows/system_scan">Configure</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Framework Usage</CardTitle>
                <CardDescription>Distribution of framework preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Individual Framework</div>
                        <div className="text-sm text-muted-foreground">45% of users</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/admin/ai-companion/frameworks/individual">Configure</Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <Network className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">System Framework</div>
                        <div className="text-sm text-muted-foreground">30% of users</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/admin/ai-companion/frameworks/system">Configure</Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <Layers className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Integrated Framework</div>
                        <div className="text-sm text-muted-foreground">25% of users</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/admin/ai-companion/frameworks/integrated">Configure</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="frameworks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Companion Frameworks</CardTitle>
              <CardDescription>Configure the frameworks used by the AI Companion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Individual Framework</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <CardDescription className="mb-4">
                        Focuses on personal wellbeing, strengths, and positive psychology
                      </CardDescription>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">Status:</span> Active
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Cards:</span> 6 types
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Flows:</span> 8 flows
                        </div>
                      </div>
                    </CardContent>
                    <div className="p-4 pt-0">
                      <Button className="w-full" asChild>
                        <Link href="/admin/ai-companion/frameworks/individual">Configure</Link>
                      </Button>
                    </div>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Network className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">System Framework</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <CardDescription className="mb-4">
                        Focuses on ecological resilience, systems thinking, and community adaptation
                      </CardDescription>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">Status:</span> Active
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Cards:</span> 4 types
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Flows:</span> 5 flows
                        </div>
                      </div>
                    </CardContent>
                    <div className="p-4 pt-0">
                      <Button className="w-full" asChild>
                        <Link href="/admin/ai-companion/frameworks/system">Configure</Link>
                      </Button>
                    </div>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Layers className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Integrated Framework</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <CardDescription className="mb-4">
                        Combines individual and system approaches for a holistic perspective
                      </CardDescription>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">Status:</span> Active
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Cards:</span> 10 types
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Flows:</span> 13 flows
                        </div>
                      </div>
                    </CardContent>
                    <div className="p-4 pt-0">
                      <Button className="w-full" asChild>
                        <Link href="/admin/ai-companion/frameworks/integrated">Configure</Link>
                      </Button>
                    </div>
                  </Card>
                </div>

                <div className="flex justify-end">
                  <Button asChild>
                    <Link href="/admin/ai-companion/frameworks/new">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Create New Framework
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flows" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>AI Companion Flows</CardTitle>
                  <CardDescription>Manage guided conversation flows for the AI Companion</CardDescription>
                </div>
                <Button asChild>
                  <Link href="/admin/ai-companion/flows/new">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Create New Flow
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 p-4 font-medium">
                    <div>Flow Name</div>
                    <div>Framework</div>
                    <div>Steps</div>
                    <div>Usage</div>
                    <div className="text-right">Actions</div>
                  </div>
                  <div className="divide-y">
                    <div className="grid grid-cols-5 items-center p-4">
                      <div className="font-medium">Grant Readiness Coach</div>
                      <div>Individual</div>
                      <div>8 steps</div>
                      <div>High</div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/admin/ai-companion/flows/grant_readiness">Edit</Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 items-center p-4">
                      <div className="font-medium">Course Recommender</div>
                      <div>Individual</div>
                      <div>5 steps</div>
                      <div>Medium</div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/admin/ai-companion/flows/course_recommendation">Edit</Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 items-center p-4">
                      <div className="font-medium">System Scan</div>
                      <div>System</div>
                      <div>6 steps</div>
                      <div>Medium</div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/admin/ai-companion/flows/system_scan">Edit</Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 items-center p-4">
                      <div className="font-medium">Project Planning</div>
                      <div>System</div>
                      <div>7 steps</div>
                      <div>Low</div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/admin/ai-companion/flows/project_planning">Edit</Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 items-center p-4">
                      <div className="font-medium">Socratic Dialogue</div>
                      <div>Integrated</div>
                      <div>Dynamic</div>
                      <div>Medium</div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/admin/ai-companion/flows/socratic_dialogue">Edit</Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cards" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>AI Companion Cards</CardTitle>
                  <CardDescription>Manage interactive cards for the AI Companion</CardDescription>
                </div>
                <Button asChild>
                  <Link href="/admin/ai-companion/cards/new">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Create New Card
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 p-4 font-medium">
                    <div>Card Type</div>
                    <div>Framework</div>
                    <div>Trigger Conditions</div>
                    <div>Usage</div>
                    <div className="text-right">Actions</div>
                  </div>
                  <div className="divide-y">
                    <div className="grid grid-cols-5 items-center p-4">
                      <div className="font-medium">Reflection Prompt</div>
                      <div>Individual</div>
                      <div>Time-based, Activity</div>
                      <div>High</div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/admin/ai-companion/cards/reflection_prompt">Edit</Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 items-center p-4">
                      <div className="font-medium">Strengths Highlight</div>
                      <div>Individual</div>
                      <div>Activity-based</div>
                      <div>Medium</div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/admin/ai-companion/cards/strengths_highlight">Edit</Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 items-center p-4">
                      <div className="font-medium">System Scan</div>
                      <div>System</div>
                      <div>Project Creation</div>
                      <div>Medium</div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/admin/ai-companion/cards/system_scan">Edit</Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 items-center p-4">
                      <div className="font-medium">Project Planning</div>
                      <div>System</div>
                      <div>Project Creation</div>
                      <div>Low</div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/admin/ai-companion/cards/project_planning">Edit</Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 items-center p-4">
                      <div className="font-medium">Values Check</div>
                      <div>Integrated</div>
                      <div>Time-based</div>
                      <div>Medium</div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/admin/ai-companion/cards/values_check">Edit</Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prompts" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>AI Companion Prompts</CardTitle>
                  <CardDescription>Manage system prompts and templates for the AI Companion</CardDescription>
                </div>
                <Button asChild>
                  <Link href="/admin/ai-companion/prompts/new">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Create New Prompt
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border">
                  <div className="grid grid-cols-4 p-4 font-medium">
                    <div>Prompt Name</div>
                    <div>Type</div>
                    <div>Last Updated</div>
                    <div className="text-right">Actions</div>
                  </div>
                  <div className="divide-y">
                    <div className="grid grid-cols-4 items-center p-4">
                      <div className="font-medium">Base System Prompt</div>
                      <div>System</div>
                      <div>2 days ago</div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/admin/ai-companion/prompts/base_system">Edit</Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          Test
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center p-4">
                      <div className="font-medium">Individual Framework</div>
                      <div>Framework</div>
                      <div>1 week ago</div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/admin/ai-companion/prompts/individual_framework">Edit</Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          Test
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center p-4">
                      <div className="font-medium">System Framework</div>
                      <div>Framework</div>
                      <div>1 week ago</div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/admin/ai-companion/prompts/system_framework">Edit</Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          Test
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center p-4">
                      <div className="font-medium">Grant Readiness Flow</div>
                      <div>Flow</div>
                      <div>2 weeks ago</div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/admin/ai-companion/prompts/grant_readiness_flow">Edit</Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          Test
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center p-4">
                      <div className="font-medium">System Scan Flow</div>
                      <div>Flow</div>
                      <div>2 weeks ago</div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/admin/ai-companion/prompts/system_scan_flow">Edit</Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          Test
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
