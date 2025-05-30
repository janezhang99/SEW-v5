"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Clock, MapPin, CheckCircle, FileText } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for service provider
const getProvider = (id: string) => {
  const providers = {
    "1": {
      id: "1",
      name: "Maya Thompson",
      pronouns: "she/her",
      location: "Whitehorse, YT",
      image: "/young-asian-woman-portrait.png",
      bio: "I'm a passionate creative designer who loves helping community projects shine through visual storytelling. I've been designing for 3 years and have worked on everything from event posters to social media campaigns for local initiatives.",
      services: [
        {
          title: "Logo & Brand Design",
          description: "Custom logos and brand identity packages for your initiative",
          price: 50,
          duration: "2-3 days",
        },
        {
          title: "Social Media Graphics",
          description: "Eye-catching graphics for Instagram, Facebook, and other platforms",
          price: 25,
          duration: "1-2 days",
        },
        {
          title: "Event Poster Design",
          description: "Professional posters and flyers for your community events",
          price: 35,
          duration: "1-2 days",
        },
      ],
      skills: ["Graphic Design", "Social Media", "Photography", "Adobe Creative Suite", "Canva", "Brand Identity"],
      languages: ["English", "French"],
      education: "Grade 12 Student, Visual Arts Focus",
      experience: "3 years of design experience, 15+ completed projects",
      portfolio: [
        { image: "/community-garden.png", title: "Community Garden Branding", category: "Logo Design" },
        { image: "/youth-workshop.png", title: "Youth Workshop Poster", category: "Event Design" },
        { image: "/abstract-ec.png", title: "Social Media Campaign", category: "Digital Graphics" },
      ],
      availability: ["Monday 4-8 PM", "Wednesday 4-8 PM", "Friday 4-8 PM", "Saturday 10 AM-4 PM"],
      completedProjects: 15,
      responseTime: "Usually responds within 2 hours",
      joinedDate: "January 2025",
    },
  }

  return providers[id as keyof typeof providers]
}

function ServiceRequestForm({ service, providerName }: { service?: any; providerName: string }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectName: "",
    organization: "",
    serviceType: service?.title || "",
    projectDescription: "",
    timeline: "",
    budget: "",
    additionalInfo: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the request to the backend
    alert(`Service request sent to ${providerName}! They will review your request and get back to you.`)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Your Name *</Label>
          <Input id="name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="projectName">Project Name *</Label>
          <Input
            id="projectName"
            value={formData.projectName}
            onChange={(e) => handleInputChange("projectName", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="organization">Organization (Optional)</Label>
          <Input
            id="organization"
            value={formData.organization}
            onChange={(e) => handleInputChange("organization", e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="serviceType">Service Needed *</Label>
        <Select value={formData.serviceType} onValueChange={(value) => handleInputChange("serviceType", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Logo & Brand Design">Logo & Brand Design</SelectItem>
            <SelectItem value="Social Media Graphics">Social Media Graphics</SelectItem>
            <SelectItem value="Event Poster Design">Event Poster Design</SelectItem>
            <SelectItem value="Other">Other (please specify in description)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="projectDescription">Project Description *</Label>
        <Textarea
          id="projectDescription"
          value={formData.projectDescription}
          onChange={(e) => handleInputChange("projectDescription", e.target.value)}
          placeholder="Tell us about your project and what you need help with..."
          className="min-h-[100px]"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="timeline">Preferred Timeline</Label>
          <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
            <SelectTrigger>
              <SelectValue placeholder="When do you need this?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asap">As soon as possible</SelectItem>
              <SelectItem value="1-2weeks">Within 1-2 weeks</SelectItem>
              <SelectItem value="1month">Within 1 month</SelectItem>
              <SelectItem value="flexible">I'm flexible</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="budget">Budget Range</Label>
          <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select budget range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-25">$0 - $25</SelectItem>
              <SelectItem value="25-50">$25 - $50</SelectItem>
              <SelectItem value="50-100">$50 - $100</SelectItem>
              <SelectItem value="100+">$100+</SelectItem>
              <SelectItem value="negotiate">Open to negotiation</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="additionalInfo">Additional Information</Label>
        <Textarea
          id="additionalInfo"
          value={formData.additionalInfo}
          onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
          placeholder="Any additional details, inspiration, or requirements..."
          className="min-h-[80px]"
        />
      </div>

      <Button type="submit" className="w-full bg-sew-midnight-blue hover:bg-sew-midnight-blue/90">
        Send Service Request
      </Button>
    </form>
  )
}

export default function ServiceProviderPageClient({ params }: { params: { providerId: string } }) {
  const provider = getProvider(params.providerId)

  if (!provider) {
    return (
      <div className="container mx-auto py-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Service Provider not found</h1>
        <p className="mb-6">The service provider you're looking for doesn't exist or is no longer available.</p>
        <Button asChild>
          <Link href="/dashboard/marketplace">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link href="/dashboard/marketplace">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative h-48 w-48 rounded-full overflow-hidden mb-4">
                  <Image src={provider.image || "/placeholder.svg"} alt={provider.name} fill className="object-cover" />
                </div>
                <h1 className="text-2xl font-bold">{provider.name}</h1>
                <p className="text-muted-foreground">{provider.pronouns}</p>
                <div className="flex items-center mt-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{provider.location}</span>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {provider.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-1 gap-4 w-full mt-6">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-sew-midnight-blue hover:bg-sew-midnight-blue/90">
                        <FileText className="mr-2 h-4 w-4" />
                        Request Service
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Request Service from {provider.name}</DialogTitle>
                        <DialogDescription>
                          Fill out this form to request a service. {provider.name} will review your request and get back
                          to you.
                        </DialogDescription>
                      </DialogHeader>
                      <ServiceRequestForm providerName={provider.name} />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center mt-4 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{provider.responseTime}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Projects Completed</span>
                <span className="font-medium">{provider.completedProjects}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Member Since</span>
                <span className="font-medium">{provider.joinedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Languages</span>
                <span className="font-medium">{provider.languages.join(", ")}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {provider.availability.map((time, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    {time}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About {provider.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{provider.bio}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <h3 className="font-medium mb-2">Education</h3>
                  <p className="text-sm text-muted-foreground">{provider.education}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Experience</h3>
                  <p className="text-sm text-muted-foreground">{provider.experience}</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-2">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {provider.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Services Offered</CardTitle>
              <CardDescription>Choose a service to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {provider.services.map((service, index) => (
                  <Card key={index} className="border">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{service.title}</h3>
                        <div className="text-right">
                          <div className="font-bold text-sew-midnight-blue">${service.price}</div>
                          <div className="text-sm text-muted-foreground">{service.duration}</div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" className="bg-sew-midnight-blue hover:bg-sew-midnight-blue/90">
                            Request This Service
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Request: {service.title}</DialogTitle>
                            <DialogDescription>
                              Fill out this form to request "{service.title}" from {provider.name}.
                            </DialogDescription>
                          </DialogHeader>
                          <ServiceRequestForm service={service} providerName={provider.name} />
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {provider.portfolio.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="relative h-32 w-full rounded-lg overflow-hidden bg-muted">
                      <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
