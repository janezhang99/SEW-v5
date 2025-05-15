"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useEvents, type EventCategory, type EventFormat, type EventVisibility } from "@/contexts/events-context"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatePicker } from "@/components/ui/date-picker"
import { TimePicker } from "@/components/ui/time-picker"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Calendar,
  Clock,
  ImageIcon,
  Info,
  MapPin,
  Plus,
  Save,
  Trash2,
  Upload,
  Users,
  Video,
} from "lucide-react"
import Link from "next/link"
import { EventsProvider } from "@/contexts/events-context"
import { format, setHours, setMinutes } from "date-fns"

// Event category options
const eventCategoryOptions = [
  { value: "workshop", label: "Workshop" },
  { value: "webinar", label: "Webinar" },
  { value: "networking", label: "Networking" },
  { value: "community", label: "Community" },
  { value: "funding", label: "Funding" },
  { value: "cultural", label: "Cultural" },
  { value: "training", label: "Training" },
  { value: "celebration", label: "Celebration" },
  { value: "other", label: "Other" },
]

// Event format options
const eventFormatOptions = [
  { value: "in-person", label: "In-Person" },
  { value: "virtual", label: "Virtual" },
  { value: "hybrid", label: "Hybrid" },
]

// Event visibility options
const eventVisibilityOptions = [
  { value: "public", label: "Public - Anyone can view and join" },
  { value: "community", label: "Community - Only Small Economy Works members" },
  { value: "private", label: "Private - Only invited attendees" },
]

function CreateEventContent() {
  const router = useRouter()
  const { addEvent } = useEvents()

  // Set default start date to tomorrow at 10:00 AM
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(10, 0, 0, 0)

  // Set default end date to tomorrow at 12:00 PM
  const tomorrowEnd = new Date(tomorrow)
  tomorrowEnd.setHours(12, 0, 0, 0)

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "workshop" as EventCategory,
    format: "in-person" as EventFormat,
    visibility: "public" as EventVisibility,
    startDate: tomorrow,
    endDate: tomorrowEnd,
    location: {
      name: "",
      address: "",
      city: "",
      region: "",
      country: "",
      postalCode: "",
      virtualLink: "",
      joinInfo: "",
    },
    image: "",
    maxAttendees: "",
    tags: [] as string[],
    isFeatured: false,
    organizers: [
      {
        id: "current-user",
        name: "Current User", // In a real app, this would be the current user's name
        role: "Organizer",
        organization: "Small Economy Works",
      },
    ],
    attendees: [],
    resources: [],
  })

  const [currentTag, setCurrentTag] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Handle date changes
  const handleDateChange = (name: string, date: Date | undefined) => {
    if (date) {
      setFormData((prev) => ({ ...prev, [name]: date }))

      // Clear error for this field if it exists
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors[name]
          return newErrors
        })
      }
    }
  }

  // Handle time changes
  const handleTimeChange = (name: string, time: string) => {
    const [hours, minutes] = time.split(":").map(Number)

    setFormData((prev) => {
      const date = new Date(prev[name as keyof typeof prev] as Date)
      const newDate = setHours(setMinutes(date, minutes), hours)
      return { ...prev, [name]: newDate }
    })
  }

  // Handle switch changes
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  // Handle adding a tag
  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }))
      setCurrentTag("")
    }
  }

  // Handle removing a tag
  const handleRemoveTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }))
  }

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    if (formData.format === "in-person" || formData.format === "hybrid") {
      if (!formData.location.name.trim()) {
        newErrors["location.name"] = "Location name is required"
      }
    }

    if (formData.format === "virtual" || formData.format === "hybrid") {
      if (!formData.location.virtualLink.trim()) {
        newErrors["location.virtualLink"] = "Virtual link is required"
      }
    }

    if (formData.endDate < formData.startDate) {
      newErrors.endDate = "End date must be after start date"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Process form data
      const eventData = {
        ...formData,
        startDate: formData.startDate.toISOString(),
        endDate: formData.endDate.toISOString(),
        maxAttendees: formData.maxAttendees ? Number.parseInt(formData.maxAttendees) : undefined,
      }

      // Add the event
      addEvent(eventData)

      // Redirect to events page
      router.push("/dashboard/events")
    } catch (error) {
      console.error("Error creating event:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <DashboardHeader heading="Create Event" text="Create a new event for your community">
        <Button variant="outline" asChild>
          <Link href="/dashboard/events">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Cancel
          </Link>
        </Button>
      </DashboardHeader>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="details" className="space-y-6">
          <TabsList>
            <TabsTrigger value="details">Event Details</TabsTrigger>
            <TabsTrigger value="location">Location & Time</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Event Details Tab */}
          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Provide the basic details about your event</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Event Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter a descriptive title for your event"
                    value={formData.title}
                    onChange={handleChange}
                    className={errors.title ? "border-red-500" : ""}
                  />
                  {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your event, its purpose, and what attendees can expect"
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                    className={errors.description ? "border-red-500" : ""}
                  />
                  {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">
                      Event Category <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {eventCategoryOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="format">
                      Event Format <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.format}
                      onValueChange={(value) => handleSelectChange("format", value as EventFormat)}
                    >
                      <SelectTrigger id="format">
                        <SelectValue placeholder="Select a format" />
                      </SelectTrigger>
                      <SelectContent>
                        {eventFormatOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      id="tags"
                      placeholder="Add tags to help people find your event"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddTag()
                        }
                      }}
                    />
                    <Button type="button" onClick={handleAddTag} variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 rounded-full hover:bg-muted p-0.5"
                          >
                            <Trash2 className="h-3 w-3" />
                            <span className="sr-only">Remove {tag}</span>
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Event Image</CardTitle>
                <CardDescription>Upload an image to represent your event</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center">
                  <div className="mb-4 rounded-full bg-muted p-3">
                    <ImageIcon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">Upload an image</h3>
                  <p className="text-sm text-muted-foreground mb-4">Drag and drop an image, or click to browse</p>
                  <Button type="button" variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Choose Image
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Location & Time Tab */}
          <TabsContent value="location" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Date and Time</CardTitle>
                <CardDescription>Set when your event will take place</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>
                        Start Date <span className="text-red-500">*</span>
                      </Label>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <DatePicker date={formData.startDate} setDate={(date) => handleDateChange("startDate", date)} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>
                        Start Time <span className="text-red-500">*</span>
                      </Label>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <TimePicker
                          value={format(formData.startDate, "HH:mm")}
                          onChange={(time) => handleTimeChange("startDate", time)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>
                        End Date <span className="text-red-500">*</span>
                      </Label>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <DatePicker date={formData.endDate} setDate={(date) => handleDateChange("endDate", date)} />
                      </div>
                      {errors.endDate && <p className="text-xs text-red-500">{errors.endDate}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label>
                        End Time <span className="text-red-500">*</span>
                      </Label>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <TimePicker
                          value={format(formData.endDate, "HH:mm")}
                          onChange={(time) => handleTimeChange("endDate", time)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">All times are displayed in your local timezone</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
                <CardDescription>Specify where your event will take place</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {(formData.format === "in-person" || formData.format === "hybrid") && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <h3 className="text-sm font-medium">Physical Location</h3>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location.name">
                        Venue Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="location.name"
                        name="location.name"
                        placeholder="e.g., Community Center, Conference Hall"
                        value={formData.location.name}
                        onChange={handleChange}
                        className={errors["location.name"] ? "border-red-500" : ""}
                      />
                      {errors["location.name"] && <p className="text-xs text-red-500">{errors["location.name"]}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location.address">Street Address</Label>
                      <Input
                        id="location.address"
                        name="location.address"
                        placeholder="Street address"
                        value={formData.location.address}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location.city">City</Label>
                        <Input
                          id="location.city"
                          name="location.city"
                          placeholder="City"
                          value={formData.location.city}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location.region">Province/Territory</Label>
                        <Input
                          id="location.region"
                          name="location.region"
                          placeholder="Province/Territory"
                          value={formData.location.region}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location.country">Country</Label>
                        <Input
                          id="location.country"
                          name="location.country"
                          placeholder="Country"
                          value={formData.location.country}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location.postalCode">Postal Code</Label>
                        <Input
                          id="location.postalCode"
                          name="location.postalCode"
                          placeholder="Postal Code"
                          value={formData.location.postalCode}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.format === "in-person" && <Separator />}

                {(formData.format === "virtual" || formData.format === "hybrid") && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Video className="h-4 w-4 text-muted-foreground" />
                      <h3 className="text-sm font-medium">Virtual Location</h3>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location.virtualLink">
                        Meeting Link <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="location.virtualLink"
                        name="location.virtualLink"
                        placeholder="e.g., Zoom, Google Meet, or other virtual meeting link"
                        value={formData.location.virtualLink}
                        onChange={handleChange}
                        className={errors["location.virtualLink"] ? "border-red-500" : ""}
                      />
                      {errors["location.virtualLink"] && (
                        <p className="text-xs text-red-500">{errors["location.virtualLink"]}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location.joinInfo">Join Instructions</Label>
                      <Textarea
                        id="location.joinInfo"
                        name="location.joinInfo"
                        placeholder="Provide any additional instructions for joining the virtual event"
                        rows={3}
                        value={formData.location.joinInfo}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Settings</CardTitle>
                <CardDescription>Configure additional settings for your event</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="visibility">
                    Event Visibility <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.visibility}
                    onValueChange={(value) => handleSelectChange("visibility", value as EventVisibility)}
                  >
                    <SelectTrigger id="visibility">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventVisibilityOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxAttendees">Maximum Attendees</Label>
                  <Input
                    id="maxAttendees"
                    name="maxAttendees"
                    type="number"
                    min="1"
                    placeholder="Leave blank for unlimited"
                    value={formData.maxAttendees}
                    onChange={handleChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    Set a limit on the number of people who can attend. Leave blank for unlimited.
                  </p>
                </div>

                <div className="flex items-center justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <Label htmlFor="isFeatured">Feature this event</Label>
                    <p className="text-xs text-muted-foreground">
                      Featured events appear prominently on the events page
                    </p>
                  </div>
                  <Switch
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) => handleSwitchChange("isFeatured", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Organizers</CardTitle>
                <CardDescription>Add people who are organizing this event</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {formData.organizers.map((organizer, index) => (
                    <div key={organizer.id} className="flex items-center justify-between p-3 rounded-md border">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                          <Users className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium">{organizer.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {organizer.role}
                            {organizer.organization && ` · ${organizer.organization}`}
                          </p>
                        </div>
                      </div>
                      {index > 0 && (
                        <Button variant="ghost" size="sm" type="button">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      )}
                    </div>
                  ))}

                  <Button variant="outline" className="w-full" type="button">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Co-Organizer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" type="button" asChild>
            <Link href="/dashboard/events">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                Creating Event...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Create Event
              </>
            )}
          </Button>
        </div>
      </form>
    </>
  )
}

export default function CreateEventPage() {
  return (
    <EventsProvider>
      <DashboardShell>
        <CreateEventContent />
      </DashboardShell>
    </EventsProvider>
  )
}
