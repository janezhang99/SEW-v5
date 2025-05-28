"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { PageHeader } from "@/components/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Network, AlertTriangle, Leaf, ArrowRightLeft, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { SystemComponent } from "@/types/ai-companion"

// Import the AICompanionProvider and useAICompanion
import { AICompanionProvider } from "@/components/ai-companion/ai-companion-provider"

// Create a mock initial state that doesn't rely on the AICompanionProvider
const initialSystemData = {
  components: [] as SystemComponent[],
}

// Dynamically import the SystemScanCard to avoid SSR issues
const SystemScanCard = dynamic(
  () => import("@/components/ai-companion/cards/system-scan-card").then((mod) => mod.SystemScanCard),
  { ssr: false },
)

export default function SystemScanPage() {
  // Use local state instead of the AICompanionProvider directly
  const [systemData, setSystemData] = useState(initialSystemData)
  const [selectedComponent, setSelectedComponent] = useState<SystemComponent | null>(null)
  const [isClient, setIsClient] = useState(false)

  // After component mounts, set isClient to true
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Helper function to get domain icon
  const getDomainIcon = (domain: string) => {
    switch (domain) {
      case "ecological":
        return <Leaf className="h-4 w-4 text-green-600" />
      case "social":
        return <Users className="h-4 w-4 text-blue-600" />
      case "infrastructure":
        return <Network className="h-4 w-4 text-purple-600" />
      case "economic":
        return <ArrowRightLeft className="h-4 w-4 text-amber-600" />
      case "governance":
        return <Users className="h-4 w-4 text-indigo-600" />
      case "knowledge":
        return <Network className="h-4 w-4 text-cyan-600" />
      default:
        return <Network className="h-4 w-4" />
    }
  }

  // Helper function to get domain color
  const getDomainColor = (domain: string) => {
    switch (domain) {
      case "ecological":
        return "bg-green-100 text-green-800 border-green-200"
      case "social":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "infrastructure":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "economic":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "governance":
        return "bg-indigo-100 text-indigo-800 border-indigo-200"
      case "knowledge":
        return "bg-cyan-100 text-cyan-800 border-cyan-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // Function to add a component to the system data
  const addSystemComponent = (component: SystemComponent) => {
    setSystemData((prev) => ({
      ...prev,
      components: [...prev.components, component],
    }))
  }

  return (
    <AICompanionProvider>
      <div className="container mx-auto max-w-7xl py-6">
        <PageHeader
          heading="System Scan Tool"
          subheading="Analyze and map the components of your climate adaptation system"
        />

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            {isClient && (
              <SystemScanCard
                title="Add System Component"
                description="Identify and document key elements of your climate adaptation system"
                onComplete={() => {}}
                // Pass the addSystemComponent function to the card
                customAddComponent={addSystemComponent}
              />
            )}

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Network className="h-5 w-5 text-primary" />
                  Getting Started
                </CardTitle>
                <CardDescription>How to use the System Scan Tool</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="space-y-2">
                  <h3 className="font-medium">What is a System Scan?</h3>
                  <p>
                    A system scan helps you identify and analyze the key components of a climate adaptation system,
                    their relationships, vulnerabilities, and strengths.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">How to use this tool:</h3>
                  <ol className="list-inside list-decimal space-y-1">
                    <li>Add components using the form on the left</li>
                    <li>Identify connections between components</li>
                    <li>Document vulnerabilities and strengths</li>
                    <li>View the system map to understand relationships</li>
                    <li>Click on components to see detailed information</li>
                  </ol>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Example components:</h3>
                  <ul className="list-inside list-disc space-y-1">
                    <li>Local watershed (Ecological)</li>
                    <li>Municipal water system (Infrastructure)</li>
                    <li>Community health (Social)</li>
                    <li>Local government (Governance)</li>
                    <li>Agricultural practices (Economic)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Tabs defaultValue="components">
              <TabsList className="mb-4">
                <TabsTrigger value="components">Components</TabsTrigger>
                <TabsTrigger value="map">System Map</TabsTrigger>
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
              </TabsList>

              <TabsContent value="components" className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">System Components</CardTitle>
                    <CardDescription>
                      {systemData.components.length === 0
                        ? "No components added yet. Use the form on the left to add components."
                        : `${systemData.components.length} components in your system`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[500px] pr-4">
                      <div className="space-y-4">
                        {systemData.components.length === 0 ? (
                          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                            <Network className="mb-2 h-10 w-10 text-muted-foreground" />
                            <h3 className="text-lg font-medium">No components yet</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                              Add your first component using the form on the left
                            </p>
                          </div>
                        ) : (
                          systemData.components.map((component, index) => (
                            <Card
                              key={index}
                              className={`cursor-pointer border-l-4 transition-colors hover:bg-muted/50 ${
                                selectedComponent?.name === component.name
                                  ? "border-l-primary bg-muted/50"
                                  : `border-l-transparent`
                              }`}
                              onClick={() => setSelectedComponent(component)}
                            >
                              <CardHeader className="p-4 pb-2">
                                <div className="flex items-center justify-between">
                                  <CardTitle className="text-base">{component.name}</CardTitle>
                                  <Badge
                                    variant="outline"
                                    className={`flex items-center gap-1 ${getDomainColor(component.domain)}`}
                                  >
                                    {getDomainIcon(component.domain)}
                                    {component.domain.charAt(0).toUpperCase() + component.domain.slice(1)}
                                  </Badge>
                                </div>
                                <CardDescription className="line-clamp-2">{component.description}</CardDescription>
                              </CardHeader>
                              <CardContent className="p-4 pt-0">
                                <div className="flex flex-wrap gap-1">
                                  {component.connections.slice(0, 3).map((connection, i) => (
                                    <Badge key={i} variant="secondary" className="text-xs">
                                      {connection}
                                    </Badge>
                                  ))}
                                  {component.connections.length > 3 && (
                                    <Badge variant="secondary" className="text-xs">
                                      +{component.connections.length - 3} more
                                    </Badge>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                {selectedComponent && (
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{selectedComponent.name}</CardTitle>
                        <Badge
                          variant="outline"
                          className={`flex items-center gap-1 ${getDomainColor(selectedComponent.domain)}`}
                        >
                          {getDomainIcon(selectedComponent.domain)}
                          {selectedComponent.domain.charAt(0).toUpperCase() + selectedComponent.domain.slice(1)}
                        </Badge>
                      </div>
                      <CardDescription>{selectedComponent.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="mb-2 text-sm font-medium">Connections</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedComponent.connections.length > 0 ? (
                            selectedComponent.connections.map((connection, i) => (
                              <Badge key={i} variant="outline" className="text-sm">
                                {connection}
                              </Badge>
                            ))
                          ) : (
                            <p className="text-sm text-muted-foreground">No connections identified</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="mb-2 text-sm font-medium">Vulnerabilities</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedComponent.vulnerabilities.length > 0 ? (
                            selectedComponent.vulnerabilities.map((vulnerability, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-1 rounded-full bg-destructive/10 px-3 py-1 text-sm text-destructive"
                              >
                                <AlertTriangle className="h-3 w-3" />
                                {vulnerability}
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-muted-foreground">No vulnerabilities identified</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="mb-2 text-sm font-medium">Strengths</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedComponent.strengths.length > 0 ? (
                            selectedComponent.strengths.map((strength, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-1 rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-600"
                              >
                                <Leaf className="h-3 w-3" />
                                {strength}
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-muted-foreground">No strengths identified</p>
                          )}
                        </div>
                      </div>

                      <div className="pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedComponent(null)}
                          className="w-full"
                        >
                          Close Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="map">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">System Map</CardTitle>
                    <CardDescription>
                      Visualize the relationships between components in your climate adaptation system
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {systemData.components.length < 2 ? (
                      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
                        <Network className="mb-2 h-10 w-10 text-muted-foreground" />
                        <h3 className="text-lg font-medium">Not enough components</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Add at least two components to visualize the system map
                        </p>
                      </div>
                    ) : (
                      <div className="relative h-[500px] w-full rounded-lg border bg-muted/20 p-4">
                        <SystemMapVisualization components={systemData.components} />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analysis">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">System Analysis</CardTitle>
                    <CardDescription>
                      Insights and recommendations based on your climate adaptation system
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {systemData.components.length < 3 ? (
                      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
                        <Network className="mb-2 h-10 w-10 text-muted-foreground" />
                        <h3 className="text-lg font-medium">Not enough data for analysis</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Add at least three components with connections to generate analysis
                        </p>
                      </div>
                    ) : (
                      <SystemAnalysis components={systemData.components} />
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AICompanionProvider>
  )
}

// Simple visualization component for the system map
function SystemMapVisualization({ components }: { components: SystemComponent[] }) {
  // This is a placeholder for a more sophisticated visualization
  // In a real implementation, you would use a library like d3.js or react-force-graph
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="text-center">
        <p className="mb-4 text-muted-foreground">
          This is a placeholder for the system map visualization. In a production environment, this would be an
          interactive network graph showing components and their connections.
        </p>
        <div className="mx-auto mb-6 grid max-w-2xl grid-cols-2 gap-4 md:grid-cols-3">
          {components.map((component, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center"
            >
              <span className="text-sm font-medium">{component.name}</span>
              <span className="text-xs text-muted-foreground">
                {component.connections.length} connection{component.connections.length !== 1 ? "s" : ""}
              </span>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Components with more connections would appear larger and more central in the visualization.
        </p>
      </div>
    </div>
  )
}

// System analysis component
function SystemAnalysis({ components }: { components: SystemComponent[] }) {
  // Calculate some basic metrics
  const totalComponents = components.length
  const totalConnections = components.reduce((sum, component) => sum + component.connections.length, 0) / 2 // Divide by 2 to avoid counting connections twice
  const avgConnectionsPerComponent = totalConnections / totalComponents
  const mostConnectedComponent = [...components].sort((a, b) => b.connections.length - a.connections.length)[0]
  const vulnerabilityCount = components.reduce((sum, component) => sum + component.vulnerabilities.length, 0)
  const strengthCount = components.reduce((sum, component) => sum + component.strengths.length, 0)

  // Domain distribution
  const domainCounts: Record<string, number> = {}
  components.forEach((component) => {
    domainCounts[component.domain] = (domainCounts[component.domain] || 0) + 1
  })

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-4">
        <h3 className="mb-2 text-base font-medium">System Overview</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="space-y-1 rounded-lg bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">Components</p>
            <p className="text-2xl font-bold">{totalComponents}</p>
          </div>
          <div className="space-y-1 rounded-lg bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">Connections</p>
            <p className="text-2xl font-bold">{totalConnections.toFixed(0)}</p>
          </div>
          <div className="space-y-1 rounded-lg bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">Vulnerabilities</p>
            <p className="text-2xl font-bold">{vulnerabilityCount}</p>
          </div>
          <div className="space-y-1 rounded-lg bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">Strengths</p>
            <p className="text-2xl font-bold">{strengthCount}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-base font-medium">Key Insights</h3>

        <div className="rounded-lg border p-4">
          <h4 className="mb-2 text-sm font-medium">Connectivity</h4>
          <p className="text-sm">
            Your system has an average of {avgConnectionsPerComponent.toFixed(1)} connections per component.{" "}
            {avgConnectionsPerComponent < 2
              ? "This suggests low connectivity, which may reduce resilience to disturbances."
              : avgConnectionsPerComponent < 4
                ? "This indicates moderate connectivity, providing some resilience while avoiding over-coupling."
                : "This shows high connectivity, which can enhance information flow but may also increase vulnerability to cascading failures."}
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <h4 className="mb-2 text-sm font-medium">Key Components</h4>
          <p className="text-sm">
            <strong>{mostConnectedComponent?.name || "No components"}</strong>{" "}
            {mostConnectedComponent
              ? `is the most connected component with ${mostConnectedComponent.connections.length} connections. This suggests it plays a central role in your system and may be a leverage point for interventions.`
              : "Add components to identify key elements in your system."}
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <h4 className="mb-2 text-sm font-medium">Domain Balance</h4>
          <div className="mb-2 space-y-2">
            {Object.entries(domainCounts).map(([domain, count]) => (
              <div key={domain} className="flex items-center gap-2">
                <div
                  className="h-3 rounded"
                  style={{
                    width: `${(count / totalComponents) * 100}%`,
                    backgroundColor:
                      domain === "ecological"
                        ? "#10b981"
                        : domain === "social"
                          ? "#3b82f6"
                          : domain === "infrastructure"
                            ? "#8b5cf6"
                            : domain === "economic"
                              ? "#f59e0b"
                              : domain === "governance"
                                ? "#6366f1"
                                : "#06b6d4",
                  }}
                />
                <span className="text-xs">
                  {domain.charAt(0).toUpperCase() + domain.slice(1)}: {count} (
                  {((count / totalComponents) * 100).toFixed(0)}%)
                </span>
              </div>
            ))}
          </div>
          <p className="text-sm">
            {Object.keys(domainCounts).length < 3
              ? "Your system focuses on a limited number of domains. Consider expanding to include more diverse perspectives."
              : "Your system includes multiple domains, which is good for holistic adaptation planning."}
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <h4 className="mb-2 text-sm font-medium">Vulnerability-Strength Balance</h4>
          <div className="mb-2 flex h-4 w-full overflow-hidden rounded-full bg-muted">
            {vulnerabilityCount + strengthCount > 0 ? (
              <>
                <div
                  className="bg-destructive/70"
                  style={{ width: `${(vulnerabilityCount / (vulnerabilityCount + strengthCount)) * 100}%` }}
                />
                <div
                  className="bg-green-500/70"
                  style={{ width: `${(strengthCount / (vulnerabilityCount + strengthCount)) * 100}%` }}
                />
              </>
            ) : (
              <div className="h-full w-full bg-muted-foreground/20"></div>
            )}
          </div>
          <div className="mb-2 flex justify-between text-xs">
            <span>Vulnerabilities: {vulnerabilityCount}</span>
            <span>Strengths: {strengthCount}</span>
          </div>
          <p className="text-sm">
            {vulnerabilityCount + strengthCount === 0
              ? "Add vulnerabilities and strengths to your components to see the balance."
              : vulnerabilityCount > strengthCount
                ? "Your system has more identified vulnerabilities than strengths. Focus on building resilience and adaptive capacity."
                : vulnerabilityCount < strengthCount
                  ? "Your system has more identified strengths than vulnerabilities, suggesting good adaptive capacity."
                  : "Your system has a balance of vulnerabilities and strengths."}
          </p>
        </div>
      </div>

      <div className="rounded-lg border p-4">
        <h3 className="mb-2 text-base font-medium">Recommendations</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <div className="mt-0.5 h-4 w-4 rounded-full bg-blue-100 p-0.5 text-center text-[10px] font-bold text-blue-600">
              1
            </div>
            <span>
              {totalComponents === 0
                ? "Start by adding components to your system to enable analysis."
                : avgConnectionsPerComponent < 2
                  ? "Increase connectivity between components to enhance information flow and resilience."
                  : avgConnectionsPerComponent > 4
                    ? "Monitor highly connected components for potential cascading failures."
                    : "Maintain the current level of connectivity while ensuring quality of connections."}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="mt-0.5 h-4 w-4 rounded-full bg-blue-100 p-0.5 text-center text-[10px] font-bold text-blue-600">
              2
            </div>
            <span>
              {mostConnectedComponent
                ? `Focus on strengthening ${mostConnectedComponent.name} as it plays a central role in your system.`
                : "Identify key components that connect multiple parts of your system."}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="mt-0.5 h-4 w-4 rounded-full bg-blue-100 p-0.5 text-center text-[10px] font-bold text-blue-600">
              3
            </div>
            <span>
              {Object.keys(domainCounts).length < 3
                ? "Expand your system analysis to include more diverse domains for a more holistic approach."
                : "Continue to maintain a balance across different domains in your adaptation planning."}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="mt-0.5 h-4 w-4 rounded-full bg-blue-100 p-0.5 text-center text-[10px] font-bold text-blue-600">
              4
            </div>
            <span>
              {vulnerabilityCount + strengthCount === 0
                ? "Document both vulnerabilities and strengths for each component to improve your analysis."
                : vulnerabilityCount > strengthCount
                  ? "Develop strategies to address identified vulnerabilities and build on existing strengths."
                  : "Document and leverage your system's strengths while remaining vigilant about vulnerabilities."}
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
