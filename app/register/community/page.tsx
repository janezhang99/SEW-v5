"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { OnboardingLayout } from "@/components/layouts/onboarding-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, Loader2 } from "lucide-react"

export default function CommunityPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    communityDescription: "",
    communityNeeds: "",
    communityAssets: "",
    communitySupport: false,
    elderSupport: false,
    schoolSupport: false,
    businessSupport: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would save the community data here
      router.push("/register/interests")
    } catch (error) {
      console.error("Error saving community information:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <OnboardingLayout currentStep="community">
      <div className="mx-auto max-w-2xl">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Tell us about your community</h1>
            <p className="text-muted-foreground">
              Understanding your community context helps us provide relevant support for your project
            </p>
          </div>

          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Community Context</CardTitle>
                <CardDescription>
                  Share information about your community to help us understand your project's environment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="communityDescription">Describe your community</Label>
                  <Textarea
                    id="communityDescription"
                    name="communityDescription"
                    placeholder="Tell us about your community's size, location, culture, and unique characteristics"
                    value={formData.communityDescription}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="communityNeeds">What are some needs or challenges in your community?</Label>
                  <Textarea
                    id="communityNeeds"
                    name="communityNeeds"
                    placeholder="Describe some challenges or needs that your community faces"
                    value={formData.communityNeeds}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="communityAssets">What are some strengths or assets in your community?</Label>
                  <Textarea
                    id="communityAssets"
                    name="communityAssets"
                    placeholder="Describe some strengths, resources, or assets that your community has"
                    value={formData.communityAssets}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Do you have support from any of the following? (Check all that apply)</Label>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="communitySupport"
                        checked={formData.communitySupport}
                        onCheckedChange={(checked) => handleCheckboxChange("communitySupport", checked as boolean)}
                      />
                      <Label htmlFor="communitySupport">Community leadership</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="elderSupport"
                        checked={formData.elderSupport}
                        onCheckedChange={(checked) => handleCheckboxChange("elderSupport", checked as boolean)}
                      />
                      <Label htmlFor="elderSupport">Elders or knowledge keepers</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="schoolSupport"
                        checked={formData.schoolSupport}
                        onCheckedChange={(checked) => handleCheckboxChange("schoolSupport", checked as boolean)}
                      />
                      <Label htmlFor="schoolSupport">School or educational institution</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="businessSupport"
                        checked={formData.businessSupport}
                        onCheckedChange={(checked) => handleCheckboxChange("businessSupport", checked as boolean)}
                      />
                      <Label htmlFor="businessSupport">Local business or economic development</Label>
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
                      Continue
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
