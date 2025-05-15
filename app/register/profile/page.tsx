"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { OnboardingLayout } from "@/components/layouts/onboarding-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Loader2 } from "lucide-react"

export default function ProfileSetupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    age: "",
    location: "",
    communityType: "",
    projectInterest: "",
    experience: "",
    goals: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would save the profile data here
      router.push("/register/community")
    } catch (error) {
      console.error("Error saving profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <OnboardingLayout currentStep="profile">
      <div className="mx-auto max-w-2xl">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Tell us about yourself</h1>
            <p className="text-muted-foreground">
              This information helps us personalize your experience and connect you with relevant opportunities
            </p>
          </div>

          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>Share some basic information to get started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age Range</Label>
                    <Select onValueChange={(value) => handleSelectChange("age", value)} defaultValue={formData.age}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select age range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under18">Under 18</SelectItem>
                        <SelectItem value="18-24">18-24</SelectItem>
                        <SelectItem value="25-34">25-34</SelectItem>
                        <SelectItem value="35-44">35-44</SelectItem>
                        <SelectItem value="45plus">45+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="City, Province/Territory"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Community Type</Label>
                  <RadioGroup
                    defaultValue={formData.communityType}
                    onValueChange={(value) => handleSelectChange("communityType", value)}
                  >
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="rural" id="rural" />
                        <Label htmlFor="rural">Rural</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="remote" id="remote" />
                        <Label htmlFor="remote">Remote</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="northern" id="northern" />
                        <Label htmlFor="northern">Northern</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="indigenous" id="indigenous" />
                        <Label htmlFor="indigenous">Indigenous</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectInterest">What type of project are you interested in?</Label>
                  <Select
                    onValueChange={(value) => handleSelectChange("projectInterest", value)}
                    defaultValue={formData.projectInterest}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="business">Small Business</SelectItem>
                      <SelectItem value="social">Social Enterprise</SelectItem>
                      <SelectItem value="community">Community Initiative</SelectItem>
                      <SelectItem value="cultural">Cultural Project</SelectItem>
                      <SelectItem value="environmental">Environmental Project</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Previous Experience</Label>
                  <Select
                    onValueChange={(value) => handleSelectChange("experience", value)}
                    defaultValue={formData.experience}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No previous experience</SelectItem>
                      <SelectItem value="some">Some experience</SelectItem>
                      <SelectItem value="moderate">Moderate experience</SelectItem>
                      <SelectItem value="extensive">Extensive experience</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goals">What do you hope to achieve?</Label>
                  <Textarea
                    id="goals"
                    name="goals"
                    placeholder="Share your goals and aspirations for this program"
                    value={formData.goals}
                    onChange={handleChange}
                    rows={4}
                  />
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
