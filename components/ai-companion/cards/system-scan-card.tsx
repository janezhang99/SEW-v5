"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useAICompanion } from "../ai-companion-provider"
import { Network, Plus, Save, Trash2 } from "lucide-react"
import type { SystemComponent, SystemDomain } from "@/types/ai-companion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SystemScanCardProps {
  title?: string
  description?: string
  onComplete?: () => void
  customAddComponent?: (component: SystemComponent) => void
}

export function SystemScanCard({
  title = "System Scan",
  description = "Identify key components of the system you're working with",
  onComplete,
  customAddComponent,
}: SystemScanCardProps) {
  const aiCompanion = useAICompanion()
  const addSystemComponentToContext = aiCompanion?.addSystemComponent

  const [newComponent, setNewComponent] = useState<Partial<SystemComponent>>({
    name: "",
    domain: "ecological",
    description: "",
    connections: [],
    vulnerabilities: [],
    strengths: [],
  })
  const [connectionInput, setConnectionInput] = useState("")
  const [vulnerabilityInput, setVulnerabilityInput] = useState("")
  const [strengthInput, setStrengthInput] = useState("")

  const handleAddConnection = () => {
    if (connectionInput.trim()) {
      setNewComponent((prev) => ({
        ...prev,
        connections: [...(prev.connections || []), connectionInput.trim()],
      }))
      setConnectionInput("")
    }
  }

  const handleAddVulnerability = () => {
    if (vulnerabilityInput.trim()) {
      setNewComponent((prev) => ({
        ...prev,
        vulnerabilities: [...(prev.vulnerabilities || []), vulnerabilityInput.trim()],
      }))
      setVulnerabilityInput("")
    }
  }

  const handleAddStrength = () => {
    if (strengthInput.trim()) {
      setNewComponent((prev) => ({
        ...prev,
        strengths: [...(prev.strengths || []), strengthInput.trim()],
      }))
      setStrengthInput("")
    }
  }

  const handleRemoveConnection = (index: number) => {
    setNewComponent((prev) => ({
      ...prev,
      connections: prev.connections?.filter((_, i) => i !== index),
    }))
  }

  const handleRemoveVulnerability = (index: number) => {
    setNewComponent((prev) => ({
      ...prev,
      vulnerabilities: prev.vulnerabilities?.filter((_, i) => i !== index),
    }))
  }

  const handleRemoveStrength = (index: number) => {
    setNewComponent((prev) => ({
      ...prev,
      strengths: prev.strengths?.filter((_, i) => i !== index),
    }))
  }

  const handleSave = () => {
    if (newComponent.name && newComponent.description) {
      const componentToAdd = newComponent as SystemComponent

      // Use the custom function if provided, otherwise use the context function
      if (customAddComponent) {
        customAddComponent(componentToAdd)
      } else if (addSystemComponentToContext) {
        addSystemComponentToContext(componentToAdd)
      }

      setNewComponent({
        name: "",
        domain: "ecological",
        description: "",
        connections: [],
        vulnerabilities: [],
        strengths: [],
      })

      if (onComplete) {
        onComplete()
      }
    }
  }

  // Get components from context or use an empty array if not available
  const systemComponents = aiCompanion?.systemData?.components || []

  return (
    <Card className="w-full max-w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Network className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="component-name" className="text-sm font-medium">
            Component Name
          </label>
          <Input
            id="component-name"
            placeholder="e.g., Local Watershed"
            value={newComponent.name}
            onChange={(e) => setNewComponent((prev) => ({ ...prev, name: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="component-domain" className="text-sm font-medium">
            Domain
          </label>
          <Select
            value={newComponent.domain}
            onValueChange={(value) => setNewComponent((prev) => ({ ...prev, domain: value as SystemDomain }))}
          >
            <SelectTrigger id="component-domain">
              <SelectValue placeholder="Select domain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ecological">Ecological</SelectItem>
              <SelectItem value="social">Social</SelectItem>
              <SelectItem value="economic">Economic</SelectItem>
              <SelectItem value="governance">Governance</SelectItem>
              <SelectItem value="infrastructure">Infrastructure</SelectItem>
              <SelectItem value="knowledge">Knowledge</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="component-description" className="text-sm font-medium">
            Description
          </label>
          <Textarea
            id="component-description"
            placeholder="Describe this component and its role in the system"
            value={newComponent.description}
            onChange={(e) => setNewComponent((prev) => ({ ...prev, description: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Connections to Other Components</label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Municipal Water System"
              value={connectionInput}
              onChange={(e) => setConnectionInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleAddConnection()
                }
              }}
            />
            <Button type="button" size="sm" onClick={handleAddConnection}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {newComponent.connections?.map((connection, index) => (
              <div
                key={index}
                className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
              >
                {connection}
                <button
                  type="button"
                  onClick={() => handleRemoveConnection(index)}
                  className="ml-1 rounded-full p-1 hover:bg-primary/20"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Vulnerabilities</label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Drought"
              value={vulnerabilityInput}
              onChange={(e) => setVulnerabilityInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleAddVulnerability()
                }
              }}
            />
            <Button type="button" size="sm" onClick={handleAddVulnerability}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {newComponent.vulnerabilities?.map((vulnerability, index) => (
              <div
                key={index}
                className="flex items-center gap-1 rounded-full bg-destructive/10 px-3 py-1 text-sm text-destructive"
              >
                {vulnerability}
                <button
                  type="button"
                  onClick={() => handleRemoveVulnerability(index)}
                  className="ml-1 rounded-full p-1 hover:bg-destructive/20"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Strengths</label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Biodiversity"
              value={strengthInput}
              onChange={(e) => setStrengthInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleAddStrength()
                }
              }}
            />
            <Button type="button" size="sm" onClick={handleAddStrength}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {newComponent.strengths?.map((strength, index) => (
              <div
                key={index}
                className="flex items-center gap-1 rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-600"
              >
                {strength}
                <button
                  type="button"
                  onClick={() => handleRemoveStrength(index)}
                  className="ml-1 rounded-full p-1 hover:bg-green-500/20"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {systemComponents.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">System Components</h4>
            <div className="rounded-md border p-2">
              <ul className="space-y-1 text-sm">
                {systemComponents.map((component, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="font-medium">{component.name}</span>
                    <span className="text-xs text-muted-foreground">({component.domain})</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} disabled={!newComponent.name || !newComponent.description} className="w-full">
          <Save className="mr-2 h-4 w-4" />
          Save Component
        </Button>
      </CardFooter>
    </Card>
  )
}
