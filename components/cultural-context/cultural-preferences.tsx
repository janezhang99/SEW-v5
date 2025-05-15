"use client"

import { useState } from "react"
import { ChevronDown, Globe, Info, Moon, Save, Sun, Undo2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface CulturalPreference {
  id: string
  name: string
  description: string
}

interface CulturalPreferencesProps {
  onSave?: (preferences: any) => void
  initialPreferences?: any
}

export function CulturalPreferences({ onSave, initialPreferences = {} }: CulturalPreferencesProps) {
  const [preferences, setPreferences] = useState({
    indigenousIdentity: initialPreferences.indigenousIdentity || false,
    indigenousCommunity: initialPreferences.indigenousCommunity || "",
    language: initialPreferences.language || "english",
    contentPreferences: initialPreferences.contentPreferences || {
      traditionalKnowledge: true,
      landBased: true,
      ceremonial: false,
      storytelling: true,
      elders: true,
      healing: false,
    },
    learningStyle: initialPreferences.learningStyle || "visual",
    seasonalContext: initialPreferences.seasonalContext || true,
    accessibilityNeeds: initialPreferences.accessibilityNeeds || [],
    textDensity: initialPreferences.textDensity || 50,
    colorScheme: initialPreferences.colorScheme || "system",
  })

  const [isChanged, setIsChanged] = useState(false)

  const updatePreference = (key: string, value: any) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }))
    setIsChanged(true)
  }

  const updateContentPreference = (key: string, value: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      contentPreferences: {
        ...prev.contentPreferences,
        [key]: value,
      },
    }))
    setIsChanged(true)
  }

  const handleSave = () => {
    if (onSave) {
      onSave(preferences)
    }
    setIsChanged(false)
    // In a real app, this would save to the backend
    alert("Cultural preferences saved successfully!")
  }

  const handleReset = () => {
    setPreferences({
      indigenousIdentity: false,
      indigenousCommunity: "",
      language: "english",
      contentPreferences: {
        traditionalKnowledge: true,
        landBased: true,
        ceremonial: false,
        storytelling: true,
        elders: true,
        healing: false,
      },
      learningStyle: "visual",
      seasonalContext: true,
      accessibilityNeeds: [],
      textDensity: 50,
      colorScheme: "system",
    })
    setIsChanged(true)
  }

  const indigenousCommunities: CulturalPreference[] = [
    { id: "first-nations", name: "First Nations", description: "First Nations communities across Canada" },
    { id: "inuit", name: "Inuit", description: "Inuit communities in northern Canada" },
    { id: "metis", name: "Métis", description: "Métis communities across Canada" },
    { id: "dene", name: "Dene", description: "Dene communities in northern Canada" },
    { id: "cree", name: "Cree", description: "Cree communities across Canada" },
    { id: "ojibwe", name: "Ojibwe", description: "Ojibwe communities in central Canada" },
    { id: "other", name: "Other", description: "Other Indigenous communities" },
  ]

  const languages: CulturalPreference[] = [
    { id: "english", name: "English", description: "English language content" },
    { id: "french", name: "French", description: "French language content" },
    { id: "inuktitut", name: "Inuktitut", description: "Inuktitut language content" },
    { id: "cree", name: "Cree", description: "Cree language content" },
    { id: "ojibwe", name: "Ojibwe", description: "Ojibwe language content" },
    { id: "dene", name: "Dene", description: "Dene language content" },
  ]

  const accessibilityOptions: CulturalPreference[] = [
    { id: "screen-reader", name: "Screen Reader Compatible", description: "Optimize content for screen readers" },
    { id: "high-contrast", name: "High Contrast", description: "Use high contrast colors for better visibility" },
    { id: "reduced-motion", name: "Reduced Motion", description: "Minimize animations and transitions" },
    {
      id: "simplified-language",
      name: "Simplified Language",
      description: "Use simpler language and shorter sentences",
    },
    {
      id: "audio-descriptions",
      name: "Audio Descriptions",
      description: "Include audio descriptions for visual content",
    },
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Cultural Context Settings</CardTitle>
        <CardDescription>
          Customize your learning experience to align with your cultural background and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="identity">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="identity">Identity & Language</TabsTrigger>
            <TabsTrigger value="content">Content Preferences</TabsTrigger>
            <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
          </TabsList>

          <TabsContent value="identity" className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="indigenous-identity"
                    checked={preferences.indigenousIdentity}
                    onCheckedChange={(checked) => updatePreference("indigenousIdentity", checked)}
                  />
                  <Label htmlFor="indigenous-identity">I identify as Indigenous</Label>
                </div>
                <p className="text-sm text-muted-foreground mt-1 ml-6">
                  This helps us provide culturally relevant content and resources
                </p>
              </div>

              {preferences.indigenousIdentity && (
                <div className="ml-6 mt-4">
                  <Label htmlFor="indigenous-community" className="mb-2 block">
                    Indigenous Community or Nation
                  </Label>
                  <Select
                    value={preferences.indigenousCommunity}
                    onValueChange={(value) => updatePreference("indigenousCommunity", value)}
                  >
                    <SelectTrigger id="indigenous-community">
                      <SelectValue placeholder="Select your community" />
                    </SelectTrigger>
                    <SelectContent>
                      {indigenousCommunities.map((community) => (
                        <SelectItem key={community.id} value={community.id}>
                          {community.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="mt-6">
                <Label htmlFor="language-preference" className="mb-2 block">
                  Preferred Language
                </Label>
                <Select value={preferences.language} onValueChange={(value) => updatePreference("language", value)}>
                  <SelectTrigger id="language-preference">
                    <SelectValue placeholder="Select your preferred language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((language) => (
                      <SelectItem key={language.id} value={language.id}>
                        {language.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-1">
                  Note: Not all content is available in all languages
                </p>
              </div>

              <div className="mt-6">
                <Label className="mb-2 block">Learning Style</Label>
                <RadioGroup
                  value={preferences.learningStyle}
                  onValueChange={(value) => updatePreference("learningStyle", value)}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="visual" id="visual" />
                    <Label htmlFor="visual">Visual (images, diagrams, videos)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="auditory" id="auditory" />
                    <Label htmlFor="auditory">Auditory (spoken word, audio)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="reading" id="reading" />
                    <Label htmlFor="reading">Reading/Writing (text-based)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="kinesthetic" id="kinesthetic" />
                    <Label htmlFor="kinesthetic">Hands-on (interactive, practical)</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Content Themes</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Select the types of cultural content you'd like to see emphasized in your learning materials
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="traditional-knowledge"
                    checked={preferences.contentPreferences.traditionalKnowledge}
                    onCheckedChange={(checked) => updateContentPreference("traditionalKnowledge", checked === true)}
                  />
                  <Label htmlFor="traditional-knowledge">Traditional Knowledge</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="land-based"
                    checked={preferences.contentPreferences.landBased}
                    onCheckedChange={(checked) => updateContentPreference("landBased", checked === true)}
                  />
                  <Label htmlFor="land-based">Land-Based Practices</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="ceremonial"
                    checked={preferences.contentPreferences.ceremonial}
                    onCheckedChange={(checked) => updateContentPreference("ceremonial", checked === true)}
                  />
                  <Label htmlFor="ceremonial">Ceremonial & Spiritual</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="storytelling"
                    checked={preferences.contentPreferences.storytelling}
                    onCheckedChange={(checked) => updateContentPreference("storytelling", checked === true)}
                  />
                  <Label htmlFor="storytelling">Storytelling & Oral Traditions</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="elders"
                    checked={preferences.contentPreferences.elders}
                    onCheckedChange={(checked) => updateContentPreference("elders", checked === true)}
                  />
                  <Label htmlFor="elders">Elder Teachings</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="healing"
                    checked={preferences.contentPreferences.healing}
                    onCheckedChange={(checked) => updateContentPreference("healing", checked === true)}
                  />
                  <Label htmlFor="healing">Healing & Wellness</Label>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="seasonal-context"
                    checked={preferences.seasonalContext}
                    onCheckedChange={(checked) => updatePreference("seasonalContext", checked)}
                  />
                  <Label htmlFor="seasonal-context">Seasonal Context</Label>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Info className="h-4 w-4" />
                        <span className="sr-only">Info</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        When enabled, content will be adapted to reflect the current season and seasonal activities
                        relevant to your region.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-sm text-muted-foreground mt-1 ml-6">
                Adapt content based on the current season in your region
              </p>
            </div>

            <Collapsible className="mt-6">
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="flex w-full justify-between">
                  <span>Advanced Content Settings</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="text-density">Text Density</Label>
                    <span className="text-sm text-muted-foreground">
                      {preferences.textDensity < 33
                        ? "Less Text"
                        : preferences.textDensity > 66
                          ? "More Text"
                          : "Balanced"}
                    </span>
                  </div>
                  <Slider
                    id="text-density"
                    min={0}
                    max={100}
                    step={1}
                    value={[preferences.textDensity]}
                    onValueChange={(value) => updatePreference("textDensity", value[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Visual Focus</span>
                    <span>Detailed Text</span>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </TabsContent>

          <TabsContent value="accessibility" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Accessibility Needs</h3>
              <p className="text-sm text-muted-foreground mb-4">Select any accessibility features you'd like enabled</p>

              <div className="space-y-3">
                {accessibilityOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.id}
                      checked={preferences.accessibilityNeeds.includes(option.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updatePreference("accessibilityNeeds", [...preferences.accessibilityNeeds, option.id])
                        } else {
                          updatePreference(
                            "accessibilityNeeds",
                            preferences.accessibilityNeeds.filter((id: string) => id !== option.id),
                          )
                        }
                      }}
                    />
                    <div>
                      <Label htmlFor={option.id}>{option.name}</Label>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <Label htmlFor="color-scheme" className="mb-2 block">
                Color Scheme
              </Label>
              <RadioGroup
                value={preferences.colorScheme}
                onValueChange={(value) => updatePreference("colorScheme", value)}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light" className="flex items-center">
                    <Sun className="h-4 w-4 mr-2" />
                    Light
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="dark" />
                  <Label htmlFor="dark" className="flex items-center">
                    <Moon className="h-4 w-4 mr-2" />
                    Dark
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="system" id="system" />
                  <Label htmlFor="system" className="flex items-center">
                    <Globe className="h-4 w-4 mr-2" />
                    System Default
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleReset} className="gap-2">
          <Undo2 className="h-4 w-4" />
          Reset to Default
        </Button>
        <Button onClick={handleSave} disabled={!isChanged} className="gap-2">
          <Save className="h-4 w-4" />
          Save Preferences
        </Button>
      </CardFooter>
    </Card>
  )
}

// Example usage component
export function CulturalPreferencesExample() {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Customize Your Learning Experience</h1>
      <CulturalPreferences />
    </div>
  )
}
