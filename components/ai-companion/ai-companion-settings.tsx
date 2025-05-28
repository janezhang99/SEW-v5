"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAICompanion } from "./ai-companion-provider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"

export function AICompanionSettings() {
  const { mode, setMode, tone, setTone, frameworkPreference, updateFrameworkPreference } = useAICompanion()
  const [activeTab, setActiveTab] = useState("general")
  const [individualPreference, setIndividualPreference] = useState(frameworkPreference.individual)
  const [systemPreference, setSystemPreference] = useState(frameworkPreference.system)
  const [defaultFramework, setDefaultFramework] = useState<"individual" | "system" | "integrated">(
    frameworkPreference.defaultFramework,
  )

  const handleSaveFrameworkPreferences = () => {
    updateFrameworkPreference({
      individual: individualPreference,
      system: systemPreference,
      defaultFramework,
    })
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6 pt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Interaction Mode</h3>
              <RadioGroup value={mode} onValueChange={(value) => setMode(value as any)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="assistant" id="mode-assistant" />
                  <Label htmlFor="mode-assistant">Assistant</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="coach" id="mode-coach" />
                  <Label htmlFor="mode-coach">Coach</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="educator" id="mode-educator" />
                  <Label htmlFor="mode-educator">Educator</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="reflector" id="mode-reflector" />
                  <Label htmlFor="mode-reflector">Reflector</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="systems_thinker" id="mode-systems-thinker" />
                  <Label htmlFor="mode-systems-thinker">Systems Thinker</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Tone</h3>
              <RadioGroup value={tone} onValueChange={(value) => setTone(value as any)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="coach" id="tone-coach" />
                  <Label htmlFor="tone-coach">Coach</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="instructor" id="tone-instructor" />
                  <Label htmlFor="tone-instructor">Instructor</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="socratic" id="tone-socratic" />
                  <Label htmlFor="tone-socratic">Socratic</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="strengths_based" id="tone-strengths-based" />
                  <Label htmlFor="tone-strengths-based">Strengths-Based</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="systems_oriented" id="tone-systems-oriented" />
                  <Label htmlFor="tone-systems-oriented">Systems-Oriented</Label>
                </div>
              </RadioGroup>
            </div>
          </TabsContent>

          <TabsContent value="frameworks" className="space-y-6 pt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Framework Preferences</h3>
              <p className="text-sm text-muted-foreground">
                Adjust how much the AI Companion focuses on individual wellbeing versus system-level resilience.
              </p>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="individual-preference">Individual Wellbeing Focus</Label>
                    <span className="text-sm">{individualPreference}/10</span>
                  </div>
                  <Slider
                    id="individual-preference"
                    min={1}
                    max={10}
                    step={1}
                    value={[individualPreference]}
                    onValueChange={(value) => setIndividualPreference(value[0])}
                  />
                  <p className="text-xs text-muted-foreground">
                    Higher values emphasize positive psychology, personal strengths, and individual flourishing.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="system-preference">System Resilience Focus</Label>
                    <span className="text-sm">{systemPreference}/10</span>
                  </div>
                  <Slider
                    id="system-preference"
                    min={1}
                    max={10}
                    step={1}
                    value={[systemPreference]}
                    onValueChange={(value) => setSystemPreference(value[0])}
                  />
                  <p className="text-xs text-muted-foreground">
                    Higher values emphasize ecological resilience, systems thinking, and community-level adaptation.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Default Framework</Label>
                  <RadioGroup value={defaultFramework} onValueChange={(value) => setDefaultFramework(value as any)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="individual" id="framework-individual" />
                      <Label htmlFor="framework-individual">Individual</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="system" id="framework-system" />
                      <Label htmlFor="framework-system">System</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="integrated" id="framework-integrated" />
                      <Label htmlFor="framework-integrated">Integrated</Label>
                    </div>
                  </RadioGroup>
                  <p className="text-xs text-muted-foreground">
                    Choose which framework the AI Companion should use by default.
                  </p>
                </div>

                <Button onClick={handleSaveFrameworkPreferences} className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Save Framework Preferences
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  )
}
