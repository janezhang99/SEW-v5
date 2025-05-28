"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { OnboardingLayout } from "@/components/layouts/onboarding-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, Loader2 } from "lucide-react"

export default function InterestsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    learningStyle: "",
    communicationPreference: "",
    interests: {
      business: false,
      marketing: false,
      finance: false,
      technology: false,
      arts: false,
      environment: false,
      food: false,
      education: false,
      health: false,
      tourism: false,
    },
  })

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      interests: {
        ...prev.interests,
        [name]: checked,
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would save the interests data here
      router.push("/register/complete")
    } catch (error) {
      console.error("Error saving interests:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <OnboardingLayout currentStep="interests">
      <div className="mx-auto max-w-2xl">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Your Interests & Learning Style</h1>
            <p className="text-muted-foreground">
              Help us understand how you learn best and what topics interest you most
            </p>
          </div>

          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Learning Preferences</CardTitle>
                <CardDescription>This helps us personalize your learning journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>How do you prefer to learn?</Label>
                  <RadioGroup
                    defaultValue={formData.learningStyle}
                    onValueChange={(value) => handleRadioChange("learningStyle", value)}
                  >
                    <div className="grid gap-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="reflective" id="reflective" />
                        <Label htmlFor="reflective">By reflecting and thinking deeply</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="visual" id="visual" />
                        <Label htmlFor="visual">By seeing examples and visuals</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="practical" id="practical" />
                        <Label htmlFor="practical">By doing practical activities</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="collaborative" id="collaborative" />
                        <Label htmlFor="collaborative">By discussing with others</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="independent" id="independent" />
                        <Label htmlFor="independent">By researching independently</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label>How do you prefer information to be communicated?</Label>
                  <RadioGroup
                    defaultValue={formData.communicationPreference}
                    onValueChange={(value) => handleRadioChange("communicationPreference", value)}
                  >
                    <div className="grid gap-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="detailed" id="detailed" />
                        <Label htmlFor="detailed">Detailed explanations</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="concise" id="concise" />
                        <Label htmlFor="concise">Concise, to-the-point information</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="visual" id="visual-comm" />
                        <Label htmlFor="visual-comm">Visual examples and diagrams</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="metaphorical" id="metaphorical" />
                        <Label htmlFor="metaphorical">Stories and metaphors</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="straightforward" id="straightforward" />
                        <Label htmlFor="straightforward">Straightforward facts and steps</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label>What topics are you most interested in? (Select all that apply)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="business"
                        checked={formData.interests.business}
                        onCheckedChange={(checked) => handleCheckboxChange("business", checked as boolean)}
                      />
                      <Label htmlFor="business">Business Planning</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="marketing"
                        checked={formData.interests.marketing}
                        onCheckedChange={(checked) => handleCheckboxChange("marketing", checked as boolean)}
                      />
                      <Label htmlFor="marketing">Marketing & Promotion</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="finance"
                        checked={formData.interests.finance}
                        onCheckedChange={(checked) => handleCheckboxChange("finance", checked as boolean)}
                      />
                      <Label htmlFor="finance">Financial Management</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="technology"
                        checked={formData.interests.technology}
                        onCheckedChange={(checked) => handleCheckboxChange("technology", checked as boolean)}
                      />
                      <Label htmlFor="technology">Technology & Digital Skills</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="arts"
                        checked={formData.interests.arts}
                        onCheckedChange={(checked) => handleCheckboxChange("arts", checked as boolean)}
                      />
                      <Label htmlFor="arts">Arts & Culture</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="environment"
                        checked={formData.interests.environment}
                        onCheckedChange={(checked) => handleCheckboxChange("environment", checked as boolean)}
                      />
                      <Label htmlFor="environment">Environmental Sustainability</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="food"
                        checked={formData.interests.food}
                        onCheckedChange={(checked) => handleCheckboxChange("food", checked as boolean)}
                      />
                      <Label htmlFor="food">Food & Agriculture</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="education"
                        checked={formData.interests.education}
                        onCheckedChange={(checked) => handleCheckboxChange("education", checked as boolean)}
                      />
                      <Label htmlFor="education">Education & Training</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="health"
                        checked={formData.interests.health}
                        onCheckedChange={(checked) => handleCheckboxChange("health", checked as boolean)}
                      />
                      <Label htmlFor="health">Health & Wellness</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="tourism"
                        checked={formData.interests.tourism}
                        onCheckedChange={(checked) => handleCheckboxChange("tourism", checked as boolean)}
                      />
                      <Label htmlFor="tourism">Tourism & Hospitality</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                  Back
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      Complete Registration
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </OnboardingLayout>
  )
}
