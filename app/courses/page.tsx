"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Users, Filter } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { AICompanionEmbedded } from "@/components/ai-companion/ai-companion-embedded"
import { PageHeader } from "@/components/page-header"

// Sample courses data (same as before)
const courses = [
  {
    id: "course-1",
    title: "Climate Risk Assessment Fundamentals",
    description: "Learn the basics of identifying and evaluating climate-related risks and vulnerabilities.",
    image: "/climate-risk-assessment.png",
    domain: "Climate Risk Assessment",
    level: "Beginner",
    duration: "4 hours",
    enrollments: 156,
    tags: ["vulnerability", "riskmapping", "hazards"],
  },
  {
    id: "course-2",
    title: "Advanced Vulnerability Mapping",
    description: "Master techniques for detailed vulnerability mapping across different sectors and regions.",
    image: "/vulnerability-mapping.png",
    domain: "Climate Risk Assessment",
    level: "Advanced",
    duration: "8 hours",
    enrollments: 89,
    tags: ["vulnerability", "riskmapping", "GIS", "spatial analysis"],
  },
  {
    id: "course-3",
    title: "Setting SMART Adaptation Goals",
    description: "Learn how to set Specific, Measurable, Achievable, Relevant, and Time-bound adaptation goals.",
    image: "/smart-goals-planning.png",
    domain: "Strategic Adaptation Planning",
    level: "Intermediate",
    duration: "3 hours",
    enrollments: 124,
    tags: ["SMARTgoals", "planning", "strategy"],
  },
  {
    id: "course-4",
    title: "Nature-based Solutions for Climate Adaptation",
    description: "Explore how natural systems can be leveraged to build resilience to climate impacts.",
    image: "/nature-based-solutions.png",
    domain: "Adaptation Options",
    level: "Intermediate",
    duration: "6 hours",
    enrollments: 210,
    tags: ["naturebasedsolutions", "ecosystem", "biodiversity"],
  },
]

const domains = [
  "Climate Risk Assessment",
  "Strategic Adaptation Planning",
  "Adaptation Options",
  "Implementation & Operations",
  "Monitoring & Learning (MEL)",
  "Cross-Cutting Skills",
]

const levels = ["Beginner", "Intermediate", "Advanced"]

const allTags = [
  "vulnerability",
  "riskmapping",
  "hazards",
  "GIS",
  "spatial analysis",
  "SMARTgoals",
  "planning",
  "strategy",
  "naturebasedsolutions",
  "ecosystem",
  "biodiversity",
]

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const filteredCourses = courses.filter((course) => {
    // Search filter
    if (
      searchQuery &&
      !course.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !course.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Domain filter
    if (selectedDomain && course.domain !== selectedDomain) {
      return false
    }

    // Level filter
    if (selectedLevel && course.level !== selectedLevel) {
      return false
    }

    // Tags filter
    if (selectedTags.length > 0 && !selectedTags.some((tag) => course.tags.includes(tag))) {
      return false
    }

    return true
  })

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const clearFilters = () => {
    setSelectedDomain(null)
    setSelectedLevel(null)
    setSelectedTags([])
  }

  return (
    <div className="p-4 md:p-6">
      <PageHeader title="Courses" description="Browse our collection of climate adaptation courses">
        <div className="flex justify-end">
          <div className="flex gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {(selectedDomain || selectedLevel || selectedTags.length > 0) && (
                    <Badge variant="secondary" className="ml-2 rounded-full">
                      {[selectedDomain ? 1 : 0, selectedLevel ? 1 : 0, selectedTags.length].reduce((a, b) => a + b, 0)}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Narrow down courses based on your interests and needs</SheetDescription>
                </SheetHeader>
                <div className="grid gap-6 py-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Domain</h3>
                    <Select value={selectedDomain || ""} onValueChange={(value) => setSelectedDomain(value || null)}>
                      <SelectTrigger>
                        <SelectValue placeholder="All domains" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All domains</SelectItem>
                        {domains.map((domain) => (
                          <SelectItem key={domain} value={domain}>
                            {domain}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Level</h3>
                    <Select value={selectedLevel || ""} onValueChange={(value) => setSelectedLevel(value || null)}>
                      <SelectTrigger>
                        <SelectValue placeholder="All levels" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All levels</SelectItem>
                        {levels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Tags</h3>
                    <ScrollArea className="h-[200px] pr-4">
                      <div className="space-y-2">
                        {allTags.map((tag) => (
                          <div key={tag} className="flex items-center space-x-2">
                            <Checkbox
                              id={`tag-${tag}`}
                              checked={selectedTags.includes(tag)}
                              onCheckedChange={() => handleTagToggle(tag)}
                            />
                            <Label htmlFor={`tag-${tag}`} className="font-normal">
                              #{tag}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            <div className="relative w-full md:w-[260px]">
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9"
              />
            </div>
          </div>
        </div>
      </PageHeader>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <Tabs defaultValue="grid" className="w-full">
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {filteredCourses.length} {filteredCourses.length === 1 ? "course" : "courses"} found
              </div>
              <TabsList>
                <TabsTrigger value="grid">Grid</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="grid" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden">
                    <div className="aspect-video relative">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-start gap-2">
                        <Badge variant="outline">{course.domain}</Badge>
                        <Badge>{course.level}</Badge>
                      </div>
                      <CardTitle className="text-lg mt-2">{course.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>{course.duration}</span>
                        <Users className="ml-3 mr-1 h-4 w-4" />
                        <span>{course.enrollments} enrolled</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {course.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full">Enroll Now</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="list" className="mt-6">
              <div className="space-y-4">
                {filteredCourses.map((course) => (
                  <Card key={course.id}>
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4 relative">
                        <div className="aspect-video md:h-full relative">
                          <Image
                            src={course.image || "/placeholder.svg"}
                            alt={course.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex justify-between items-start gap-2 mb-2">
                          <Badge variant="outline">{course.domain}</Badge>
                          <Badge>{course.level}</Badge>
                        </div>
                        <h3 className="text-lg font-semibold">{course.title}</h3>
                        <p className="text-muted-foreground mt-1">{course.description}</p>

                        <div className="flex items-center text-sm text-muted-foreground mt-3">
                          <Clock className="mr-1 h-4 w-4" />
                          <span>{course.duration}</span>
                          <Users className="ml-3 mr-1 h-4 w-4" />
                          <span>{course.enrollments} enrolled</span>
                        </div>

                        <div className="flex flex-wrap gap-1 mt-3">
                          {course.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="mt-4">
                          <Button>Enroll Now</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <AICompanionEmbedded
            title="Course Recommender"
            description="Get personalized course recommendations"
            flow="course_recommendation"
            contextualPrompt="What skills are you looking to develop?"
          />

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Popular Courses</CardTitle>
              <CardDescription>Most enrolled courses this month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {courses
                .sort((a, b) => b.enrollments - a.enrollments)
                .slice(0, 3)
                .map((course) => (
                  <div key={course.id} className="flex items-start gap-3 pb-3 last:pb-0 last:border-0 border-b">
                    <div className="w-12 h-12 relative rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm line-clamp-1">{course.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {course.level}
                        </Badge>
                        <span>{course.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
