"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { FileText, Save, Plus, Trash2 } from "lucide-react"

export default function AIProjectAssistantAdmin() {
  const [activeTab, setActiveTab] = useState("general")
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">AI Project Assistant</h2>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>Saving...</>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General Settings</TabsTrigger>
          <TabsTrigger value="prompts">Prompts & Templates</TabsTrigger>
          <TabsTrigger value="integration">AI Bridge Integration</TabsTrigger>
          <TabsTrigger value="analytics">Usage & Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Configuration</CardTitle>
              <CardDescription>Configure the basic settings for the AI Project Assistant</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="assistant-name">Assistant Name</Label>
                <Input id="assistant-name" defaultValue="Project Assistant" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="assistant-description">Description</Label>
                <Textarea
                  id="assistant-description"
                  defaultValue="AI-powered assistant that helps users with climate adaptation project planning, management, and implementation."
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="assistant-active" defaultChecked />
                <Label htmlFor="assistant-active">Active</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="assistant-public" defaultChecked />
                <Label htmlFor="assistant-public">Available on public projects</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Model Configuration</CardTitle>
              <CardDescription>Configure the AI model settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="model-provider">Model Provider</Label>
                <select
                  id="model-provider"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="openai"
                >
                  <option value="openai">OpenAI</option>
                  <option value="anthropic">Anthropic</option>
                  <option value="cohere">Cohere</option>
                  <option value="mistral">Mistral AI</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="model-name">Model Name</Label>
                <select
                  id="model-name"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="gpt-4o"
                >
                  <option value="gpt-4o">GPT-4o</option>
                  <option value="gpt-4-turbo">GPT-4 Turbo</option>
                  <option value="claude-3-opus">Claude 3 Opus</option>
                  <option value="claude-3-sonnet">Claude 3 Sonnet</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="temperature">Temperature</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="temperature"
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    defaultValue="0.7"
                    className="w-full"
                  />
                  <span className="w-12 text-center">0.7</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prompts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Prompts</CardTitle>
              <CardDescription>
                Configure the system prompts that define the AI Project Assistant's behavior
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="system-prompt">Base System Prompt</Label>
                <Textarea
                  id="system-prompt"
                  rows={8}
                  defaultValue="You are the CanAdapt AI Project Assistant, an expert in climate adaptation projects. Your role is to help users plan, manage, and implement climate adaptation projects effectively. You have expertise in climate science, project management, stakeholder engagement, and climate adaptation strategies. Be helpful, informative, and supportive."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Prompt Templates</CardTitle>
                <CardDescription>Create and manage prompt templates for common project tasks</CardDescription>
              </div>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Template
              </Button>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      name: "Project Risk Assessment",
                      description: "Analyze potential risks for a climate adaptation project",
                      tags: ["risk", "assessment"],
                    },
                    {
                      id: 2,
                      name: "Stakeholder Mapping",
                      description: "Identify and analyze key stakeholders for a project",
                      tags: ["stakeholders", "engagement"],
                    },
                    {
                      id: 3,
                      name: "Implementation Timeline",
                      description: "Create a timeline for project implementation phases",
                      tags: ["planning", "timeline"],
                    },
                    {
                      id: 4,
                      name: "Funding Opportunities",
                      description: "Identify potential funding sources for climate projects",
                      tags: ["funding", "finance"],
                    },
                    {
                      id: 5,
                      name: "Monitoring Framework",
                      description: "Develop indicators and methods for project monitoring",
                      tags: ["monitoring", "evaluation"],
                    },
                  ].map((template) => (
                    <Card key={template.id} className="border border-muted">
                      <CardHeader className="p-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{template.name}</CardTitle>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                        <CardDescription>{template.description}</CardDescription>
                      </CardHeader>
                      <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
                        {template.tags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Bridge Configuration</CardTitle>
              <CardDescription>Configure how the AI Project Assistant integrates with the AI Companion</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="bridge-enabled" defaultChecked />
                <Label htmlFor="bridge-enabled">Enable AI Bridge</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bridge-mode">Integration Mode</Label>
                <select
                  id="bridge-mode"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="hybrid"
                >
                  <option value="standalone">Standalone (No Integration)</option>
                  <option value="hybrid">Hybrid (Contextual Integration)</option>
                  <option value="full">Full Integration (Shared Context)</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="context-sharing">Context Sharing</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="share-project-data" defaultChecked />
                    <Label htmlFor="share-project-data">Project Data</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="share-user-profile" defaultChecked />
                    <Label htmlFor="share-user-profile">User Profile</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="share-conversation-history" defaultChecked />
                    <Label htmlFor="share-conversation-history">Conversation History</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="share-resources" defaultChecked />
                    <Label htmlFor="share-resources">Resources</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Handoff Configuration</CardTitle>
              <CardDescription>Configure when and how to hand off between AI systems</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="handoff-triggers">Handoff Triggers</Label>
                <Textarea
                  id="handoff-triggers"
                  rows={4}
                  defaultValue="project planning, risk assessment, adaptation strategies, monitoring framework, stakeholder engagement, climate data analysis"
                  placeholder="Enter comma-separated keywords that trigger handoff"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="handoff-message">Handoff Message Template</Label>
                <Textarea
                  id="handoff-message"
                  rows={4}
                  defaultValue="I notice you're asking about {topic}. Would you like me to connect you with the Project Assistant which specializes in this area?"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usage Statistics</CardTitle>
              <CardDescription>View usage statistics for the AI Project Assistant</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Interactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3,842</div>
                    <p className="text-xs text-muted-foreground">+18% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">156</div>
                    <p className="text-xs text-muted-foreground">+12 from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Satisfaction</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4.7/5</div>
                    <p className="text-xs text-muted-foreground">+0.2 from last month</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Queries</CardTitle>
              <CardDescription>Most common queries and topics users ask about</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  {[
                    { topic: "Risk assessment methodology", count: 342, growth: "+28%" },
                    { topic: "Stakeholder engagement strategies", count: 287, growth: "+15%" },
                    { topic: "Funding opportunities", count: 253, growth: "+22%" },
                    { topic: "Climate data sources", count: 198, growth: "+5%" },
                    { topic: "Monitoring frameworks", count: 176, growth: "+12%" },
                    { topic: "Cost-benefit analysis", count: 165, growth: "+8%" },
                    { topic: "Implementation timeline", count: 142, growth: "+18%" },
                    { topic: "Nature-based solutions", count: 137, growth: "+32%" },
                    { topic: "Community engagement", count: 124, growth: "+10%" },
                    { topic: "Project evaluation methods", count: 118, growth: "+7%" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{item.topic}</div>
                        <div className="text-sm text-muted-foreground">{item.count} queries</div>
                      </div>
                      <Badge variant="outline" className="text-green-600">
                        {item.growth}
                      </Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
