"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Bot,
  Send,
  FileText,
  Calendar,
  Users,
  AlertTriangle,
  BarChart,
  Lightbulb,
  Sparkles,
  ChevronRight,
  Clock,
  Clipboard,
  Download,
  Plus,
  ExternalLink,
  Search,
  File,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAIBridge } from "@/components/ai-bridge/ai-systems-bridge"

interface AIProjectAssistantProps {
  projectId: string
  projectName: string
  projectType?: string
  projectPhase?: string
  className?: string
}

export function AIProjectAssistant({
  projectId,
  projectName,
  projectType = "Urban Greening",
  projectPhase = "Implementation",
  className,
}: AIProjectAssistantProps) {
  const [activeTab, setActiveTab] = useState("chat")
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<
    Array<{
      role: "user" | "assistant" | "system"
      content: string
      timestamp: Date
    }>
  >([
    {
      role: "assistant",
      content: `Hello! I'm your AI project assistant for "${projectName}". How can I help you with your ${projectType} project today?`,
      timestamp: new Date(),
    },
  ])
  const [suggestions, setSuggestions] = useState<string[]>([
    "What are the best practices for urban tree planting?",
    "Help me identify potential risks for this project phase",
    "Generate a stakeholder communication plan",
    "Suggest metrics to track project impact",
    "What funding sources are available for urban greening?",
  ])
  const [tools, setTools] = useState([
    {
      id: "risk-assessment",
      name: "Risk Assessment",
      description: "Identify and analyze potential project risks",
      icon: AlertTriangle,
    },
    {
      id: "timeline-optimizer",
      name: "Timeline Optimizer",
      description: "Optimize project timeline based on resources and constraints",
      icon: Calendar,
    },
    {
      id: "stakeholder-analysis",
      name: "Stakeholder Analysis",
      description: "Map and analyze project stakeholders",
      icon: Users,
    },
    {
      id: "impact-metrics",
      name: "Impact Metrics",
      description: "Recommend metrics to track project impact",
      icon: BarChart,
    },
    {
      id: "resource-finder",
      name: "Resource Finder",
      description: "Find relevant resources and best practices",
      icon: FileText,
    },
  ])
  const [activeTool, setActiveTool] = useState<string | null>(null)
  const [toolOutput, setToolOutput] = useState<any>(null)
  const [recentInsights, setRecentInsights] = useState([
    {
      id: "insight-1",
      title: "Timeline Risk Detected",
      description: "Tree planting schedule may be affected by upcoming weather patterns",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      type: "risk",
    },
    {
      id: "insight-2",
      title: "Stakeholder Opportunity",
      description: "Local school district has expressed interest in educational components",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      type: "opportunity",
    },
    {
      id: "insight-3",
      title: "Similar Project Success",
      description: "Recent urban greening project in Portland achieved 15% temperature reduction",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      type: "benchmark",
    },
  ])

  // Get access to the AI Bridge
  const { setCurrentProject, handoffToCompanion, addToSharedHistory, setActiveSystem, updateLastInteraction } =
    useAIBridge()

  // State for suggesting companion handoff
  const [suggestCompanion, setSuggestCompanion] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Set the current project in the bridge when the component mounts
  useEffect(() => {
    setCurrentProject({
      projectId,
      projectName,
      projectType,
      projectPhase,
      lastUpdated: new Date(),
    })

    // Set this as the active system
    setActiveSystem("project-assistant")

    // Update last interaction
    updateLastInteraction()

    // Cleanup when unmounting
    return () => {
      // Only clear the current project if this component set it
      setCurrentProject(null)
    }
  }, [projectId, projectName, projectType, projectPhase, setCurrentProject, setActiveSystem, updateLastInteraction])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage = {
      role: "user" as const,
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Add to shared history
    addToSharedHistory({
      system: "project-assistant",
      action: "message-sent",
      context: { content: input, projectId, projectName },
    })

    try {
      // In a real implementation, this would call an API endpoint
      // For now, we'll simulate a response
      setTimeout(() => {
        const assistantMessage = {
          role: "assistant" as const,
          content: generateResponse(input, projectName, projectType, projectPhase),
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, assistantMessage])
        setIsLoading(false)

        // Check if the message contains personal development keywords
        const personalKeywords = ["learning", "course", "personal", "growth", "reflection", "strength", "value"]
        if (personalKeywords.some((keyword) => input.toLowerCase().includes(keyword)) && !suggestCompanion) {
          setSuggestCompanion(true)
        }
      }, 1000)
    } catch (error) {
      console.error("Error sending message:", error)
      setIsLoading(false)
    }
  }

  const handleToolSelect = (toolId: string) => {
    setActiveTool(toolId)
    setToolOutput(null)

    // Add to shared history
    addToSharedHistory({
      system: "project-assistant",
      action: "tool-selected",
      context: { toolId, projectId, projectName },
    })

    // Simulate tool loading
    setTimeout(() => {
      setToolOutput(generateToolOutput(toolId, projectType, projectPhase))
    }, 1000)
  }

  const handleUseSuggestion = (suggestion: string) => {
    setInput(suggestion)
  }

  const handleCompanionHandoff = () => {
    // Hand off to the companion
    handoffToCompanion(
      `The user was working with the Project Assistant for ${projectName} and might need personal development support.`,
      "reflection",
    )

    // Reset the suggestion flag
    setSuggestCompanion(false)
  }

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return "Just now"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    return `${Math.floor(diffInSeconds / 86400)}d ago`
  }

  return (
    <Card className={`flex flex-col h-full ${className}`}>
      <CardHeader className="px-4 py-3 border-b">
        <div className="flex items-center">
          <div className="bg-primary/10 p-1.5 rounded-md mr-2">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-lg">AI Project Assistant</CardTitle>
        </div>
      </CardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-3 px-4 py-2">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  {message.role === "assistant" && (
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarFallback>AI</AvatarFallback>
                      <AvatarImage src="/ai-companion-avatar.png" />
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                    }`}
                  >
                    <div className="text-sm">{message.content}</div>
                    <div className="text-xs mt-1 opacity-70 text-right">{formatTimestamp(message.timestamp)}</div>
                  </div>
                  {message.role === "user" && (
                    <Avatar className="h-8 w-8 ml-2">
                      <AvatarFallback>You</AvatarFallback>
                      <AvatarImage src="/diverse-group.png" />
                    </Avatar>
                  )}
                </div>
              ))}

              {/* AI Companion Suggestion */}
              {suggestCompanion && (
                <Alert className="bg-primary/10 border-primary/20">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <AlertTitle>Personal Development Support</AlertTitle>
                  <AlertDescription>
                    I notice you're discussing personal development topics. Would you like to switch to the AI Companion
                    for more personalized support?
                    <div className="mt-2">
                      <Button size="sm" onClick={handleCompanionHandoff} className="mr-2">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Switch to AI Companion
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setSuggestCompanion(false)}>
                        Continue here
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {messages.length === 1 && (
            <div className="px-4 pb-3">
              <p className="text-sm text-muted-foreground mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => handleUseSuggestion(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <CardFooter className="p-4 pt-2 border-t">
            <div className="flex w-full items-center space-x-2">
              <Input
                placeholder="Ask about your project..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                disabled={isLoading}
              />
              <Button size="icon" onClick={handleSendMessage} disabled={isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </TabsContent>

        <TabsContent value="tools" className="flex-1 flex flex-col p-0">
          {!activeTool ? (
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Select a tool to help with specific aspects of your project:
                </p>
                <div className="grid gap-3">
                  {tools.map((tool) => (
                    <Button
                      key={tool.id}
                      variant="outline"
                      className="flex items-start justify-start h-auto p-3 text-left"
                      onClick={() => handleToolSelect(tool.id)}
                    >
                      <div className="bg-primary/10 p-1.5 rounded-md mr-3">
                        <tool.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{tool.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{tool.description}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </Button>
                  ))}
                </div>
              </div>
            </ScrollArea>
          ) : (
            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b flex items-center">
                <Button variant="ghost" size="sm" onClick={() => setActiveTool(null)} className="mr-2">
                  <ChevronRight className="h-4 w-4 rotate-180" />
                </Button>
                <h3 className="font-medium">{tools.find((t) => t.id === activeTool)?.name || "Tool"}</h3>
              </div>
              <ScrollArea className="flex-1 p-4">
                {!toolOutput ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-2 animate-spin" />
                      <p className="text-sm text-muted-foreground">Analyzing project data...</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {toolOutput.title && <h3 className="text-lg font-medium">{toolOutput.title}</h3>}
                    {toolOutput.description && (
                      <p className="text-sm text-muted-foreground">{toolOutput.description}</p>
                    )}
                    {toolOutput.content}
                    {toolOutput.actions && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {toolOutput.actions.map((action: any, index: number) => {
                          const { label, icon: Icon } = action
                          return (
                            <Button key={index} variant="outline" size="sm" className="text-xs">
                              {Icon && <Icon className="h-3 w-3 mr-1" />}
                              {label}
                            </Button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )}
              </ScrollArea>
              {toolOutput && (
                <div className="p-4 border-t">
                  <div className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <Clipboard className="h-4 w-4 mr-2" />
                      Copy to Clipboard
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="insights" className="flex-1 p-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">AI-Generated Insights</h3>
                <Badge variant="outline" className="text-xs">
                  Updated {formatTimestamp(new Date())}
                </Badge>
              </div>

              <div className="space-y-3">
                {recentInsights.map((insight) => (
                  <Card key={insight.id} className="overflow-hidden">
                    <div className="p-3">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-1.5 rounded-md ${
                            insight.type === "risk"
                              ? "bg-red-100 text-red-600"
                              : insight.type === "opportunity"
                                ? "bg-green-100 text-green-600"
                                : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {insight.type === "risk" ? (
                            <AlertTriangle className="h-4 w-4" />
                          ) : insight.type === "opportunity" ? (
                            <Lightbulb className="h-4 w-4" />
                          ) : (
                            <Sparkles className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm">{insight.title}</h4>
                            <span className="text-xs text-muted-foreground">{formatTimestamp(insight.timestamp)}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
                        </div>
                      </div>
                      <div className="flex justify-end mt-2">
                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                          Dismiss
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                          Take Action
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="pt-2">
                <Button variant="outline" className="w-full text-xs">
                  View All Insights
                </Button>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Card>
  )
}

// Helper function to generate responses based on input
function generateResponse(input: string, projectName: string, projectType: string, projectPhase: string): string {
  const inputLower = input.toLowerCase()

  // Project phase specific responses
  if (projectPhase === "Planning") {
    if (inputLower.includes("timeline") || inputLower.includes("schedule")) {
      return `For ${projectType} projects in the planning phase, I recommend allocating sufficient time for stakeholder engagement and site assessment. A typical timeline might include:

1. Initial assessment (2-4 weeks)
2. Stakeholder mapping and engagement (4-6 weeks)
3. Site selection and analysis (3-4 weeks)
4. Design development (4-6 weeks)
5. Permitting and approvals (varies by location, typically 4-12 weeks)

Would you like me to help you create a more detailed timeline for ${projectName}?`
    }
    if (inputLower.includes("stakeholder") || inputLower.includes("community")) {
      return `Effective stakeholder engagement is crucial for ${projectType} projects. For ${projectName}, consider these key stakeholder groups:

1. Local residents and community organizations
2. Municipal departments (Parks, Public Works, Planning)
3. Environmental organizations
4. Local businesses
5. Schools and educational institutions

I recommend starting with a stakeholder mapping exercise to identify their interests, influence, and potential concerns. Would you like me to help you develop a stakeholder engagement plan?`
    }
  }

  if (projectPhase === "Implementation") {
    if (inputLower.includes("risk") || inputLower.includes("challenge")) {
      return `Based on analysis of similar ${projectType} projects, here are key risks to monitor during implementation:

1. Weather disruptions affecting planting schedules
2. Supply chain issues for plant materials
3. Contractor coordination challenges
4. Community resistance or vandalism
5. Irrigation system failures

I recommend developing contingency plans for each of these risks. Would you like me to help you create a risk management framework for ${projectName}?`
    }
    if (inputLower.includes("progress") || inputLower.includes("track")) {
      return `For tracking implementation progress on ${projectType} projects, I recommend these key metrics:

1. Percentage of planned area completed
2. Number of trees/plants installed vs. planned
3. Budget utilization rate
4. Timeline adherence (planned vs. actual)
5. Community engagement metrics (volunteers, events)

Would you like me to help you set up a progress tracking dashboard for ${projectName}?`
    }
  }

  if (projectPhase === "Monitoring") {
    if (inputLower.includes("impact") || inputLower.includes("success")) {
      return `To measure the impact of your ${projectType} project, consider these key indicators:

1. Environmental metrics: temperature reduction, air quality improvement, stormwater management
2. Social metrics: community usage, perception surveys, health indicators
3. Economic metrics: property value changes, energy savings, maintenance costs

For ${projectName}, I recommend establishing a baseline measurement before implementation and regular monitoring at 6-month intervals. Would you like me to help you develop a comprehensive monitoring plan?`
    }
    if (inputLower.includes("report") || inputLower.includes("communicate")) {
      return `Effective reporting for ${projectType} projects should communicate both quantitative impacts and qualitative benefits. For ${projectName}, consider these reporting approaches:

1. Quarterly stakeholder updates with key metrics
2. Visual before/after comparisons
3. Community testimonials and stories
4. Annual comprehensive impact report
5. Interactive dashboard for real-time monitoring

Would you like me to help you create a reporting template for your project?`
    }
  }

  // General project type responses
  if (projectType === "Urban Greening") {
    if (inputLower.includes("tree") || inputLower.includes("plant")) {
      return `For urban tree planting in ${projectName}, consider these best practices:

1. Species selection: Choose native or well-adapted species that can thrive in urban conditions
2. Site preparation: Ensure adequate soil volume and quality
3. Planting technique: Follow proper planting depth and root management
4. Initial care: Implement a watering and mulching plan for the establishment period
5. Long-term maintenance: Plan for pruning, pest management, and replacement

Would you like more specific recommendations for your local climate zone?`
    }
    if (inputLower.includes("heat") || inputLower.includes("temperature")) {
      return `Urban greening projects like ${projectName} can significantly reduce urban heat island effects. Research shows that strategic tree planting and green infrastructure can reduce local temperatures by 2-8°F. To maximize temperature reduction:

1. Focus on areas with high heat vulnerability
2. Create continuous canopy where possible
3. Combine trees with other green infrastructure (green roofs, walls)
4. Consider reflective surfaces for complementary cooling
5. Monitor temperature differences pre- and post-implementation

Would you like me to help you identify potential heat island hotspots in your project area?`
    }
  }

  // Funding and resource responses
  if (inputLower.includes("fund") || inputLower.includes("grant") || inputLower.includes("budget")) {
    return `For ${projectType} projects like ${projectName}, consider these funding sources:

1. Federal grants: USDA Urban and Community Forestry, EPA Environmental Justice grants
2. State programs: Urban forestry initiatives, climate resilience funds
3. Local sources: Municipal budget allocations, stormwater management fees
4. Foundations: Local community foundations, national environmental funders
5. Corporate sponsors: Local businesses with sustainability goals

Many of these sources have application deadlines in the fall for the following year's funding. Would you like me to provide more specific information about any of these sources?`
  }

  // Community engagement responses
  if (inputLower.includes("volunteer") || inputLower.includes("community engagement")) {
    return `Community engagement is crucial for ${projectType} projects like ${projectName}. Consider these approaches:

1. Volunteer planting events: Engage residents in actual implementation
2. Educational workshops: Build knowledge about urban ecology
3. Stewardship programs: Train community members for ongoing care
4. School partnerships: Involve students in monitoring and education
5. Community science: Engage residents in data collection

Would you like me to help you develop a community engagement plan for your project?`
  }

  // Personal development responses (to trigger companion suggestion)
  if (inputLower.includes("learn") || inputLower.includes("course") || inputLower.includes("personal development")) {
    return `While I can provide some guidance on learning resources related to ${projectType} projects, our AI Companion specializes in personalized learning recommendations and professional development. Would you like me to connect you with the AI Companion to explore courses and learning opportunities in more depth?`
  }

  // Default response
  return `I understand you're asking about ${input} for your ${projectType} project "${projectName}" which is currently in the ${projectPhase} phase. To provide more specific assistance, could you tell me more about what aspect of this you're interested in?`
}

// Helper function to generate tool outputs
function generateToolOutput(toolId: string, projectType: string, projectPhase: string): any {
  switch (toolId) {
    case "risk-assessment":
      return {
        title: "Risk Assessment Analysis",
        description: "Based on your project type and phase, here are the key risks to monitor:",
        content: (
          <div className="space-y-4">
            <div className="grid gap-3">
              {[
                {
                  risk: "Weather disruptions",
                  likelihood: 4,
                  impact: 3,
                  mitigation: "Develop flexible planting schedule with buffer periods",
                },
                {
                  risk: "Plant material availability",
                  likelihood: 3,
                  impact: 4,
                  mitigation: "Pre-order plants and identify multiple suppliers",
                },
                {
                  risk: "Community resistance",
                  likelihood: 2,
                  impact: 5,
                  mitigation: "Proactive community engagement and education",
                },
                {
                  risk: "Maintenance capacity",
                  likelihood: 3,
                  impact: 5,
                  mitigation: "Develop maintenance partnerships and volunteer programs",
                },
                {
                  risk: "Budget constraints",
                  likelihood: 3,
                  impact: 4,
                  mitigation: "Phased implementation approach and diverse funding sources",
                },
              ].map((item, index) => (
                <Card key={index} className="p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-sm">{item.risk}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">
                          Likelihood: {item.likelihood}/5
                        </Badge>
                        <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                          Impact: {item.impact}/5
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        <span className="font-medium">Mitigation:</span> {item.mitigation}
                      </p>
                    </div>
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-medium ${
                        item.likelihood * item.impact > 15
                          ? "bg-red-500"
                          : item.likelihood * item.impact > 9
                            ? "bg-orange-500"
                            : "bg-yellow-500"
                      }`}
                    >
                      {item.likelihood * item.impact}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ),
        actions: [
          { label: "Generate Risk Management Plan", icon: FileText },
          { label: "Add to Project Risks", icon: Plus },
        ],
      }

    case "timeline-optimizer":
      return {
        title: "Timeline Optimization",
        description: "Optimized project timeline based on best practices and local conditions:",
        content: (
          <div className="space-y-4">
            <div className="relative pl-8 border-l-2 border-primary/30 space-y-6 py-2">
              {[
                {
                  phase: "Site Preparation",
                  duration: "3 weeks",
                  timing: "Early Spring",
                  tasks: ["Soil testing", "Site clearing", "Irrigation planning"],
                  status: "completed",
                },
                {
                  phase: "Initial Planting",
                  duration: "4 weeks",
                  timing: "Mid Spring",
                  tasks: ["Tree planting", "Shrub installation", "Mulching"],
                  status: "in-progress",
                },
                {
                  phase: "Establishment Period",
                  duration: "8 weeks",
                  timing: "Late Spring - Early Summer",
                  tasks: ["Regular watering", "Weed management", "Health monitoring"],
                  status: "upcoming",
                },
                {
                  phase: "Community Engagement",
                  duration: "Ongoing",
                  timing: "Throughout project",
                  tasks: ["Volunteer events", "Educational workshops", "Stewardship training"],
                  status: "upcoming",
                },
                {
                  phase: "Monitoring & Evaluation",
                  duration: "Ongoing",
                  timing: "Quarterly",
                  tasks: ["Growth measurements", "Survival rates", "Temperature monitoring"],
                  status: "upcoming",
                },
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div
                    className={`absolute -left-[calc(0.5rem+1px)] top-0 h-4 w-4 rounded-full border-2 border-background ${
                      item.status === "completed"
                        ? "bg-green-500"
                        : item.status === "in-progress"
                          ? "bg-blue-500"
                          : "bg-gray-300"
                    }`}
                  ></div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{item.phase}</h4>
                      <Badge
                        variant="outline"
                        className={
                          item.status === "completed"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : item.status === "in-progress"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-gray-50 text-gray-700 border-gray-200"
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{item.duration}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{item.timing}</span>
                    </div>
                    <ul className="mt-2 space-y-1">
                      {item.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="text-xs flex items-center gap-1.5">
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${
                              item.status === "completed"
                                ? "bg-green-500"
                                : item.status === "in-progress"
                                  ? "bg-blue-500"
                                  : "bg-gray-300"
                            }`}
                          ></div>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ),
        actions: [
          { label: "Export to Calendar", icon: Calendar },
          { label: "Adjust Timeline", icon: Clock },
        ],
      }

    case "stakeholder-analysis":
      return {
        title: "Stakeholder Analysis",
        description: "Mapping of key stakeholders and their interests in your project:",
        content: (
          <div className="space-y-4">
            <div className="grid gap-3">
              {[
                {
                  group: "Local Residents",
                  interest: "High",
                  influence: "Medium",
                  concerns: ["Maintenance", "Species selection", "Construction disruption"],
                  opportunities: ["Volunteer engagement", "Stewardship programs"],
                },
                {
                  group: "City Parks Department",
                  interest: "High",
                  influence: "High",
                  concerns: ["Maintenance costs", "Alignment with city plans", "Water usage"],
                  opportunities: ["Integration with existing programs", "Shared resources"],
                },
                {
                  group: "Local Businesses",
                  interest: "Medium",
                  influence: "Medium",
                  concerns: ["Construction impacts", "Visibility changes"],
                  opportunities: ["Sponsorship", "Green business certification"],
                },
                {
                  group: "Environmental Organizations",
                  interest: "High",
                  influence: "Medium",
                  concerns: ["Native species use", "Ecological connectivity", "Wildlife habitat"],
                  opportunities: ["Technical expertise", "Volunteer mobilization", "Funding connections"],
                },
                {
                  group: "Schools",
                  interest: "Medium",
                  influence: "Low",
                  concerns: ["Educational value", "Safety"],
                  opportunities: ["Educational programs", "Student involvement", "Monitoring partnerships"],
                },
              ].map((item, index) => (
                <Card key={index} className="p-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{item.group}</h4>
                      <div className="flex items-center gap-1">
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            item.interest === "High"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : item.interest === "Medium"
                                ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                : "bg-gray-50 text-gray-700 border-gray-200"
                          }`}
                        >
                          Interest: {item.interest}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            item.influence === "High"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : item.influence === "Medium"
                                ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                                : "bg-gray-50 text-gray-700 border-gray-200"
                          }`}
                        >
                          Influence: {item.influence}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div>
                        <h5 className="text-xs font-medium text-red-600">Concerns:</h5>
                        <ul className="mt-1 space-y-1">
                          {item.concerns.map((concern, concernIndex) => (
                            <li key={concernIndex} className="text-xs flex items-center gap-1.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                              <span>{concern}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-xs font-medium text-green-600">Opportunities:</h5>
                        <ul className="mt-1 space-y-1">
                          {item.opportunities.map((opportunity, opportunityIndex) => (
                            <li key={opportunityIndex} className="text-xs flex items-center gap-1.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                              <span>{opportunity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ),
        actions: [
          { label: "Generate Engagement Plan", icon: Users },
          { label: "Export Stakeholder Map", icon: File },
        ],
      }

    case "impact-metrics":
      return {
        title: "Impact Metrics Recommendations",
        description: "Recommended metrics to track the impact of your project:",
        content: (
          <div className="space-y-4">
            <div className="grid gap-3">
              {[
                {
                  metric: "Temperature Reduction",
                  description: "Average temperature reduction in project area during peak heat hours",
                  unit: "°F",
                  frequency: "Monthly",
                  baseline: "Pre-implementation average",
                },
                {
                  metric: "Air Quality Improvement",
                  description: "Reduction in particulate matter (PM2.5) levels",
                  unit: "µg/m³",
                  frequency: "Quarterly",
                  baseline: "Pre-implementation average",
                },
                {
                  metric: "Stormwater Management",
                  description: "Volume of stormwater retained by green infrastructure",
                  unit: "Gallons",
                  frequency: "After each rain event",
                  baseline: "Pre-implementation runoff volume",
                },
                {
                  metric: "Community Usage",
                  description: "Number of visitors to the green space",
                  unit: "People",
                  frequency: "Weekly",
                  baseline: "Pre-implementation estimate",
                },
                {
                  metric: "Property Value Increase",
                  description: "Change in property values within 0.25 miles of the project",
                  unit: "%",
                  frequency: "Annually",
                  baseline: "Pre-implementation average",
                },
              ].map((item, index) => (
                <Card key={index} className="p-3">
                  <div>
                    <h4 className="font-medium text-sm">{item.metric}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        Unit: {item.unit}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Frequency: {item.frequency}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      <span className="font-medium">Baseline:</span> {item.baseline}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ),
        actions: [
          { label: "Set Up Monitoring Dashboard", icon: BarChart },
          { label: "Export Metrics Table", icon: File },
        ],
      }

    case "resource-finder":
      return {
        title: "Resource Finder",
        description: "Relevant resources and best practices for your project:",
        content: (
          <div className="space-y-4">
            <div className="grid gap-3">
              {[
                {
                  title: "Urban and Community Forestry Program",
                  source: "USDA Forest Service",
                  type: "Grant",
                  description: "Provides financial and technical assistance for urban forestry projects.",
                  link: "https://www.fs.usda.gov/managing-land/urban-forests",
                },
                {
                  title: "Green Infrastructure Toolkit",
                  source: "EPA",
                  type: "Guidance",
                  description: "Comprehensive guide to planning, designing, and implementing green infrastructure.",
                  link: "https://www.epa.gov/green-infrastructure/green-infrastructure-toolkit",
                },
                {
                  title: "American Forests",
                  source: "Nonprofit",
                  type: "Organization",
                  description: "Works to restore and protect urban forests across the United States.",
                  link: "https://www.americanforests.org/",
                },
                {
                  title: "The Nature Conservancy",
                  source: "Nonprofit",
                  type: "Organization",
                  description: "Offers resources and expertise on urban conservation and climate resilience.",
                  link: "https://www.nature.org/en-us/",
                },
                {
                  title: "Local Urban Forestry Plan",
                  source: "City of Portland",
                  type: "Example",
                  description: "Example of a comprehensive urban forestry plan for a major city.",
                  link: "https://www.portland.gov/trees/urban-forestry-management/urban-forestry-plan",
                },
              ].map((item, index) => (
                <Card key={index} className="p-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {item.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                    <div className="mt-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View Resource
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ),
        actions: [
          { label: "Search for More Resources", icon: Search },
          { label: "Save to Project Resources", icon: Plus },
        ],
      }

    default:
      return {
        title: "Tool Output",
        description: "No output generated for this tool.",
        content: <p>Please select a valid tool.</p>,
      }
  }
}
