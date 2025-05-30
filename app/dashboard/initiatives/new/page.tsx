"use client"

import type React from "react"
import { useState } from "react"
import { useEvents } from "@/contexts/events-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Upload } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

export default function NewInitiativePage() {
  const { addEvent } = useEvents()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "showcase" as const,
    date: new Date(),
    location: "",
    isVirtual: false,
    virtualLink: "",
    tags: [] as string[],
    fundingCategory: "",
    fundingGoal: "",
    fundingSource: "Small Economy Works Grant",
    communityBenefit: "",
    outcomes: [""] as string[],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData((prev) => ({ ...prev, date }))
    }
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleTagChange = (tag: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      tags: checked ? [...prev.tags, tag] : prev.tags.filter((t) => t !== tag),
    }))
  }

  const handleOutcomeChange = (index: number, value: string) => {
    setFormData((prev) => {
      const newOutcomes = [...prev.outcomes]
      newOutcomes[index] = value
      return { ...prev, outcomes: newOutcomes }
    })
  }

  const addOutcomeField = () => {
    setFormData((prev) => ({
      ...prev,
      outcomes: [...prev.outcomes, ""],
    }))
  }

  const removeOutcomeField = (index: number) => {
    setFormData((prev) => {
      const newOutcomes = [...prev.outcomes]
      newOutcomes.splice(index, 1)
      return { ...prev, outcomes: newOutcomes }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Filter out empty outcomes
    const filteredOutcomes = formData.outcomes.filter((outcome) => outcome.trim() !== "")

    // Create the new event object
    const newEvent = {
      title: formData.title,
      description: formData.description,
      type: formData.type,
      date: formData.date,
      location: formData.location,
      image: "/placeholder-o4loo.png", // In a real app, this would be the uploaded image
      organizer: {
        id: "current-user", // In a real app, this would be the current user's ID
        name: "Current User", // In a real app, this would be the current user's name
        avatar: "/placeholder-ukgjx.png", // In a real app, this would be the current user's avatar
      },
      attendees: [],
      isVirtual: formData.isVirtual,
      virtualLink: formData.isVirtual ? formData.virtualLink : undefined,
      tags: formData.tags,
      isInitiative: true,
      funding: {
        totalFunded: 0,
        fundingGoal: Number.parseFloat(formData.fundingGoal),
        fundingSource: formData.fundingSource,
        fundingCategory: formData.fundingCategory,
      },
      impact: {
        communityBenefit: formData.communityBenefit,
        peopleReached: 0,
        outcomes: filteredOutcomes,
      },
      progress: 0,
      milestones: [{ title: "Initiative Created", completed: true, date: new Date() }],
    }

    // Add the event to the context
    addEvent(newEvent)

    // Redirect to the initiatives page
    router.push("/dashboard/initiatives")
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.push("/dashboard/initiatives")} className="mb-2">
          ← Back to Initiatives
        </Button>
        <h1 className="text-3xl font-bold">Create New Initiative</h1>
        <p className="text-muted-foreground">Share your project with the community and track your progress</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Initiative Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter a descriptive title for your initiative"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your initiative, its goals, and how it benefits the community"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={5}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Initiative Type</Label>
                    <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="showcase">Showcase</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="meetup">Meetup</SelectItem>
                        <SelectItem value="presentation">Presentation</SelectItem>
                        <SelectItem value="fundraiser">Fundraiser</SelectItem>
                        <SelectItem value="community">Community Event</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.date && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={formData.date} onSelect={handleDateChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isVirtual"
                      checked={formData.isVirtual}
                      onCheckedChange={(checked) => handleCheckboxChange("isVirtual", checked as boolean)}
                    />
                    <Label htmlFor="isVirtual">This is a virtual initiative</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder={formData.isVirtual ? "Virtual location name" : "Physical location address"}
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {formData.isVirtual && (
                  <div className="space-y-2">
                    <Label htmlFor="virtualLink">Virtual Link</Label>
                    <Input
                      id="virtualLink"
                      name="virtualLink"
                      placeholder="https://meet.example.com/your-event"
                      value={formData.virtualLink}
                      onChange={handleInputChange}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {[
                      "education",
                      "technology",
                      "sustainability",
                      "agriculture",
                      "art",
                      "indigenous",
                      "entrepreneurship",
                      "community service",
                    ].map((tag) => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox
                          id={`tag-${tag}`}
                          checked={formData.tags.includes(tag)}
                          onCheckedChange={(checked) => handleTagChange(tag, checked as boolean)}
                        />
                        <Label htmlFor={`tag-${tag}`}>{tag.charAt(0).toUpperCase() + tag.slice(1)}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Funding Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fundingCategory">Funding Category</Label>
                  <Select
                    value={formData.fundingCategory}
                    onValueChange={(value) => handleSelectChange("fundingCategory", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Environmental">Environmental</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Cultural">Cultural</SelectItem>
                      <SelectItem value="Entrepreneurship">Entrepreneurship</SelectItem>
                      <SelectItem value="Community">Community</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fundingGoal">Funding Goal ($)</Label>
                  <Input
                    id="fundingGoal"
                    name="fundingGoal"
                    type="number"
                    min="0"
                    step="100"
                    placeholder="Enter your funding goal"
                    value={formData.fundingGoal}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fundingSource">Funding Source</Label>
                  <Input
                    id="fundingSource"
                    name="fundingSource"
                    value={formData.fundingSource}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Community Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="communityBenefit">How will this initiative benefit the community?</Label>
                  <Textarea
                    id="communityBenefit"
                    name="communityBenefit"
                    placeholder="Describe the positive impact your initiative will have on the community"
                    value={formData.communityBenefit}
                    onChange={handleInputChange}
                    required
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Expected Outcomes</Label>
                  <div className="space-y-3">
                    {formData.outcomes.map((outcome, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder={`Outcome ${index + 1}`}
                          value={outcome}
                          onChange={(e) => handleOutcomeChange(index, e.target.value)}
                        />
                        {formData.outcomes.length > 1 && (
                          <Button type="button" variant="outline" size="icon" onClick={() => removeOutcomeField(index)}>
                            -
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button type="button" variant="outline" onClick={addOutcomeField} className="w-full">
                      Add Another Outcome
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Initiative Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center">
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">Drag and drop an image, or click to browse</p>
                    <p className="text-xs text-muted-foreground">Recommended size: 1200 x 800 pixels</p>
                    <Input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      // In a real app, this would handle file uploads
                    />
                    <Button variant="outline" className="mt-4" size="sm">
                      Upload Image
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Publish</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Your initiative will be reviewed before being published to the community.
                  </p>
                  <Button className="w-full" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create Initiative"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
