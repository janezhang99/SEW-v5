"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useAICompanion } from "../ai-companion-provider"
import { ClipboardList, Plus, Save, Trash2, Users, AlertTriangle, CheckCircle2, Scale } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ResilienceIndicator, SystemScale } from "@/types/ai-companion"

interface ProjectPlanningCardProps {
  title?: string
  description?: string
  onComplete?: () => void
}

export function ProjectPlanningCard({
  title = "Project Planning",
  description = "Plan your adaptation project with resilience principles in mind",
  onComplete,
}: ProjectPlanningCardProps) {
  const { systemData, updateResilienceIndicator, updateSystemScale } = useAICompanion()
  const [activeTab, setActiveTab] = useState("overview")
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    goal: "",
    timeline: "",
    scales: [] as SystemScale[],
    stakeholders: [] as string[],
    risks: [] as { description: string; likelihood: number; impact: number }[],
    actions: [] as { description: string; indicator: ResilienceIndicator }[],
  })

  const [newStakeholder, setNewStakeholder] = useState("")
  const [newRisk, setNewRisk] = useState({ description: "", likelihood: 3, impact: 3 })
  const [newAction, setNewAction] = useState({ description: "", indicator: "diversity" as ResilienceIndicator })

  const handleAddStakeholder = () => {
    if (newStakeholder.trim()) {
      setProjectData((prev) => ({
        ...prev,
        stakeholders: [...prev.stakeholders, newStakeholder.trim()],
      }))
      setNewStakeholder("")
    }
  }

  const handleRemoveStakeholder = (index: number) => {
    setProjectData((prev) => ({
      ...prev,
      stakeholders: prev.stakeholders.filter((_, i) => i !== index),
    }))
  }

  const handleAddRisk = () => {
    if (newRisk.description.trim()) {
      setProjectData((prev) => ({
        ...prev,
        risks: [...prev.risks, { ...newRisk }],
      }))
      setNewRisk({ description: "", likelihood: 3, impact: 3 })
    }
  }

  const handleRemoveRisk = (index: number) => {
    setProjectData((prev) => ({
      ...prev,
      risks: prev.risks.filter((_, i) => i !== index),
    }))
  }

  const handleAddAction = () => {
    if (newAction.description.trim()) {
      setProjectData((prev) => ({
        ...prev,
        actions: [...prev.actions, { ...newAction }],
      }))
      setNewAction({ description: "", indicator: "diversity" })
    }
  }

  const handleRemoveAction = (index: number) => {
    setProjectData((prev) => ({
      ...prev,
      actions: prev.actions.filter((_, i) => i !== index),
    }))
  }

  const handleToggleScale = (scale: SystemScale) => {
    setProjectData((prev) => {
      const scales = prev.scales.includes(scale) ? prev.scales.filter((s) => s !== scale) : [...prev.scales, scale]
      return { ...prev, scales }
    })
  }

  const handleSave = () => {
    // Update system scales
    updateSystemScale(projectData.scales)

    // Update resilience indicators based on actions
    const indicatorCounts: Record<ResilienceIndicator, number> = {
      diversity: 0,
      connectivity: 0,
      feedback: 0,
      learning: 0,
      self_organization: 0,
      redundancy: 0,
      inclusion: 0,
      agency: 0,
    }

    projectData.actions.forEach((action) => {
      indicatorCounts[action.indicator]++
    })

    // Normalize to 1-10 scale
    const maxCount = Math.max(...Object.values(indicatorCounts), 1)
    Object.entries(indicatorCounts).forEach(([indicator, count]) => {
      const normalizedValue = Math.round((count / maxCount) * 10)
      if (normalizedValue > 0) {
        updateResilienceIndicator(indicator as ResilienceIndicator, normalizedValue)
      }
    })

    if (onComplete) {
      onComplete()
    }
  }

  const getRiskLevel = (likelihood: number, impact: number) => {
    const score = likelihood * impact
    if (score >= 20) return "High"
    if (score >= 10) return "Medium"
    return "Low"
  }

  const getRiskColor = (likelihood: number, impact: number) => {
    const level = getRiskLevel(likelihood, impact)
    if (level === "High") return "text-red-500"
    if (level === "Medium") return "text-amber-500"
    return "text-green-500"
  }

  return (
    <Card className="w-full max-w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="stakeholders">Stakeholders</TabsTrigger>
            <TabsTrigger value="risks">Risks</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 pt-4">
            <div className="space-y-2">
              <label htmlFor="project-name" className="text-sm font-medium">
                Project Name
              </label>
              <Input
                id="project-name"
                placeholder="e.g., Coastal Wetland Restoration"
                value={projectData.name}
                onChange={(e) => setProjectData((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="project-description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="project-description"
                placeholder="Briefly describe your project"
                value={projectData.description}
                onChange={(e) => setProjectData((prev) => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="project-goal" className="text-sm font-medium">
                Primary Goal
              </label>
              <Textarea
                id="project-goal"
                placeholder="What is the main objective of this project?"
                value={projectData.goal}
                onChange={(e) => setProjectData((prev) => ({ ...prev, goal: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="project-timeline" className="text-sm font-medium">
                Timeline
              </label>
              <Input
                id="project-timeline"
                placeholder="e.g., 18 months (Jan 2023 - Jun 2024)"
                value={projectData.timeline}
                onChange={(e) => setProjectData((prev) => ({ ...prev, timeline: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">System Scales</label>
              <p className="text-xs text-muted-foreground">Select all scales that apply to this project</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["individual", "household", "community", "municipal", "regional", "national", "global"].map(
                  (scale) => (
                    <Button
                      key={scale}
                      type="button"
                      size="sm"
                      variant={projectData.scales.includes(scale as SystemScale) ? "default" : "outline"}
                      onClick={() => handleToggleScale(scale as SystemScale)}
                      className="capitalize"
                    >
                      {scale}
                    </Button>
                  ),
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stakeholders" className="space-y-4 pt-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-medium">Key Stakeholders</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Identify individuals, groups, or organizations involved in or affected by this project.
            </p>

            <div className="flex gap-2">
              <Input
                placeholder="e.g., Local Residents"
                value={newStakeholder}
                onChange={(e) => setNewStakeholder(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddStakeholder()
                  }
                }}
              />
              <Button type="button" onClick={handleAddStakeholder}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              {projectData.stakeholders.length > 0 ? (
                <ul className="space-y-2">
                  {projectData.stakeholders.map((stakeholder, index) => (
                    <li key={index} className="flex items-center justify-between rounded-md border p-2">
                      <span>{stakeholder}</span>
                      <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveStakeholder(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No stakeholders added yet.</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="risks" className="space-y-4 pt-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-medium">Risk Assessment</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Identify potential risks to your project and rate their likelihood and impact.
            </p>

            <div className="space-y-2">
              <label htmlFor="risk-description" className="text-sm font-medium">
                Risk Description
              </label>
              <Textarea
                id="risk-description"
                placeholder="e.g., Extreme weather events disrupting restoration work"
                value={newRisk.description}
                onChange={(e) => setNewRisk((prev) => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="risk-likelihood" className="text-sm font-medium">
                  Likelihood (1-5)
                </label>
                <Select
                  value={newRisk.likelihood.toString()}
                  onValueChange={(value) => setNewRisk((prev) => ({ ...prev, likelihood: Number.parseInt(value) }))}
                >
                  <SelectTrigger id="risk-likelihood">
                    <SelectValue placeholder="Select likelihood" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Very Low</SelectItem>
                    <SelectItem value="2">2 - Low</SelectItem>
                    <SelectItem value="3">3 - Medium</SelectItem>
                    <SelectItem value="4">4 - High</SelectItem>
                    <SelectItem value="5">5 - Very High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="risk-impact" className="text-sm font-medium">
                  Impact (1-5)
                </label>
                <Select
                  value={newRisk.impact.toString()}
                  onValueChange={(value) => setNewRisk((prev) => ({ ...prev, impact: Number.parseInt(value) }))}
                >
                  <SelectTrigger id="risk-impact">
                    <SelectValue placeholder="Select impact" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Minimal</SelectItem>
                    <SelectItem value="2">2 - Minor</SelectItem>
                    <SelectItem value="3">3 - Moderate</SelectItem>
                    <SelectItem value="4">4 - Significant</SelectItem>
                    <SelectItem value="5">5 - Severe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="button" onClick={handleAddRisk} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Risk
            </Button>

            <div className="space-y-2">
              {projectData.risks.length > 0 ? (
                <ul className="space-y-2">
                  {projectData.risks.map((risk, index) => (
                    <li key={index} className="rounded-md border p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{risk.description}</p>
                          <div className="mt-1 flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Likelihood: {risk.likelihood}/5</span>
                            <span className="text-xs text-muted-foreground">Impact: {risk.impact}/5</span>
                            <span className={`text-xs font-medium ${getRiskColor(risk.likelihood, risk.impact)}`}>
                              {getRiskLevel(risk.likelihood, risk.impact)} Risk
                            </span>
                          </div>
                        </div>
                        <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveRisk(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No risks added yet.</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="actions" className="space-y-4 pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-medium">Resilience Actions</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Define actions that will build resilience into your project.
            </p>

            <div className="space-y-2">
              <label htmlFor="action-description" className="text-sm font-medium">
                Action Description
              </label>
              <Textarea
                id="action-description"
                placeholder="e.g., Establish diverse native plant species to enhance ecosystem resilience"
                value={newAction.description}
                onChange={(e) => setNewAction((prev) => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="resilience-indicator" className="text-sm font-medium">
                Resilience Indicator
              </label>
              <Select
                value={newAction.indicator}
                onValueChange={(value) =>
                  setNewAction((prev) => ({ ...prev, indicator: value as ResilienceIndicator }))
                }
              >
                <SelectTrigger id="resilience-indicator">
                  <SelectValue placeholder="Select indicator" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diversity">Diversity</SelectItem>
                  <SelectItem value="connectivity">Connectivity</SelectItem>
                  <SelectItem value="feedback">Feedback</SelectItem>
                  <SelectItem value="learning">Learning</SelectItem>
                  <SelectItem value="self_organization">Self-Organization</SelectItem>
                  <SelectItem value="redundancy">Redundancy</SelectItem>
                  <SelectItem value="inclusion">Inclusion</SelectItem>
                  <SelectItem value="agency">Agency</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="button" onClick={handleAddAction} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Action
            </Button>

            <div className="space-y-2">
              {projectData.actions.length > 0 ? (
                <ul className="space-y-2">
                  {projectData.actions.map((action, index) => (
                    <li key={index} className="rounded-md border p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{action.description}</p>
                          <div className="mt-1 flex items-center gap-2">
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                              <Scale className="mr-1 h-3 w-3" />
                              {action.indicator.replace("_", " ")}
                            </span>
                          </div>
                        </div>
                        <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveAction(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No actions added yet.</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} disabled={!projectData.name || !projectData.goal} className="w-full">
          <Save className="mr-2 h-4 w-4" />
          Save Project Plan
        </Button>
      </CardFooter>
    </Card>
  )
}
