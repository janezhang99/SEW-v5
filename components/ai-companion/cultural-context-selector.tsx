"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { MapPin, Sparkles } from "lucide-react"

export function CulturalContextSelector() {
  const [communityType, setCommunityType] = useState<string>("")
  const [culturalElements, setCulturalElements] = useState<string[]>([])

  const handleCulturalElementChange = (element: string, checked: boolean) => {
    if (checked) {
      setCulturalElements((prev) => [...prev, element])
    } else {
      setCulturalElements((prev) => prev.filter((item) => item !== element))
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Cultural Context
        </CardTitle>
        <CardDescription>Help us tailor content to your cultural background and community</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="community-type">Community Type</Label>
          <Select value={communityType} onValueChange={setCommunityType}>
            <SelectTrigger id="community-type">
              <SelectValue placeholder="Select your community type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rural">Rural</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="northern">Northern</SelectItem>
              <SelectItem value="indigenous">Indigenous</SelectItem>
              <SelectItem value="urban">Urban</SelectItem>
              <SelectItem value="suburban">Suburban</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>Cultural Elements Important to Your Project</Label>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="traditional-knowledge"
                checked={culturalElements.includes("traditional-knowledge")}
                onCheckedChange={(checked) => handleCulturalElementChange("traditional-knowledge", checked as boolean)}
              />
              <Label htmlFor="traditional-knowledge">Traditional Knowledge</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="language"
                checked={culturalElements.includes("language")}
                onCheckedChange={(checked) => handleCulturalElementChange("language", checked as boolean)}
              />
              <Label htmlFor="language">Language Revitalization</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="land-based"
                checked={culturalElements.includes("land-based")}
                onCheckedChange={(checked) => handleCulturalElementChange("land-based", checked as boolean)}
              />
              <Label htmlFor="land-based">Land-Based Practices</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="arts"
                checked={culturalElements.includes("arts")}
                onCheckedChange={(checked) => handleCulturalElementChange("arts", checked as boolean)}
              />
              <Label htmlFor="arts">Arts & Creative Expression</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="healing"
                checked={culturalElements.includes("healing")}
                onCheckedChange={(checked) => handleCulturalElementChange("healing", checked as boolean)}
              />
              <Label htmlFor="healing">Healing & Wellness</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="storytelling"
                checked={culturalElements.includes("storytelling")}
                onCheckedChange={(checked) => handleCulturalElementChange("storytelling", checked as boolean)}
              />
              <Label htmlFor="storytelling">Storytelling & Oral Tradition</Label>
            </div>
          </div>
        </div>

        <div className="rounded-md border p-4 bg-amber-50 border-amber-200">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-amber-800">Why This Matters</h3>
              <p className="text-sm text-amber-700 mt-1">
                Sharing your cultural context helps us provide more relevant examples, resources, and guidance that
                honor your community's unique strengths and needs.
              </p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full">Save Preferences</Button>
      </CardFooter>
    </Card>
  )
}
