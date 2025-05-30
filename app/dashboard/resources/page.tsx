"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  FileText,
  Download,
  Search,
  Star,
  Eye,
  Calculator,
  Palette,
  PresentationIcon as PresentationChart,
  Lightbulb,
  BookOpen,
  Video,
  FileSpreadsheet,
} from "lucide-react"

interface Resource {
  id: string
  title: string
  description: string
  category: string
  type: "template" | "guide" | "video" | "example"
  format: "PDF" | "DOCX" | "XLSX" | "PNG" | "MP4" | "PPTX"
  size: string
  downloads: number
  featured: boolean
  previewUrl?: string
  downloadUrl: string
  tags: string[]
}

const resources: Resource[] = [
  // Financial Templates
  {
    id: "budget-template",
    title: "Project Budget Template",
    description: "Easy-to-use spreadsheet for tracking your project expenses and funding",
    category: "financial",
    type: "template",
    format: "XLSX",
    size: "45 KB",
    downloads: 1247,
    featured: true,
    downloadUrl: "/resources/budget-template.xlsx",
    tags: ["budget", "expenses", "planning"],
  },
  {
    id: "invoice-example",
    title: "Professional Invoice Examples",
    description: "Sample invoices showing proper formatting and required information",
    category: "financial",
    type: "example",
    format: "PDF",
    size: "2.1 MB",
    downloads: 892,
    featured: true,
    downloadUrl: "/resources/invoice-examples.pdf",
    tags: ["invoice", "billing", "professional"],
  },
  {
    id: "expense-tracker",
    title: "Monthly Expense Tracker",
    description: "Simple spreadsheet to track daily expenses and categorize spending",
    category: "financial",
    type: "template",
    format: "XLSX",
    size: "38 KB",
    downloads: 756,
    featured: false,
    downloadUrl: "/resources/expense-tracker.xlsx",
    tags: ["expenses", "tracking", "monthly"],
  },

  // Branding & Design
  {
    id: "logo-kit",
    title: "Youth Project Logo Kit",
    description: "Customizable logo templates and brand guidelines for your project",
    category: "branding",
    type: "template",
    format: "PNG",
    size: "15.3 MB",
    downloads: 634,
    featured: true,
    downloadUrl: "/resources/logo-kit.zip",
    tags: ["logo", "branding", "design"],
  },
  {
    id: "social-media-templates",
    title: "Social Media Post Templates",
    description: "Ready-to-use templates for Instagram, Facebook, and Twitter posts",
    category: "branding",
    type: "template",
    format: "PNG",
    size: "8.7 MB",
    downloads: 923,
    featured: false,
    downloadUrl: "/resources/social-templates.zip",
    tags: ["social media", "marketing", "templates"],
  },
  {
    id: "brand-guidelines",
    title: "Brand Guidelines Template",
    description: "Professional template to document your project's visual identity",
    category: "branding",
    type: "template",
    format: "PDF",
    size: "1.8 MB",
    downloads: 445,
    featured: false,
    downloadUrl: "/resources/brand-guidelines.pdf",
    tags: ["branding", "guidelines", "identity"],
  },

  // Planning & Strategy
  {
    id: "project-plan",
    title: "Project Planning Template",
    description: "Comprehensive template for planning your community project from start to finish",
    category: "planning",
    type: "template",
    format: "DOCX",
    size: "156 KB",
    downloads: 1089,
    featured: true,
    downloadUrl: "/resources/project-plan.docx",
    tags: ["planning", "strategy", "project management"],
  },
  {
    id: "timeline-template",
    title: "Project Timeline Template",
    description: "Visual timeline template to track milestones and deadlines",
    category: "planning",
    type: "template",
    format: "PPTX",
    size: "2.3 MB",
    downloads: 567,
    featured: false,
    downloadUrl: "/resources/timeline-template.pptx",
    tags: ["timeline", "milestones", "planning"],
  },

  // Guides & Education
  {
    id: "funding-guide",
    title: "Complete Funding Guide",
    description: "Step-by-step guide to understanding and maximizing your project funding",
    category: "guides",
    type: "guide",
    format: "PDF",
    size: "3.2 MB",
    downloads: 1456,
    featured: true,
    downloadUrl: "/resources/funding-guide.pdf",
    tags: ["funding", "guide", "education"],
  },
  {
    id: "marketing-basics",
    title: "Marketing Your Project",
    description: "Essential marketing strategies for youth-led community projects",
    category: "guides",
    type: "guide",
    format: "PDF",
    size: "2.8 MB",
    downloads: 723,
    featured: false,
    downloadUrl: "/resources/marketing-guide.pdf",
    tags: ["marketing", "promotion", "community"],
  },
  {
    id: "presentation-tips",
    title: "Presentation Skills Video",
    description: "Learn how to present your project effectively to stakeholders",
    category: "guides",
    type: "video",
    format: "MP4",
    size: "45.2 MB",
    downloads: 389,
    featured: false,
    downloadUrl: "/resources/presentation-tips.mp4",
    tags: ["presentation", "skills", "communication"],
  },
]

const categories = [
  { id: "all", label: "All Resources", icon: BookOpen },
  { id: "financial", label: "Financial", icon: Calculator },
  { id: "branding", label: "Branding & Design", icon: Palette },
  { id: "planning", label: "Planning", icon: PresentationChart },
  { id: "guides", label: "Guides & Education", icon: Lightbulb },
]

const getTypeIcon = (type: string) => {
  switch (type) {
    case "template":
      return FileSpreadsheet
    case "guide":
      return BookOpen
    case "video":
      return Video
    case "example":
      return Eye
    default:
      return FileText
  }
}

const getFormatColor = (format: string) => {
  switch (format) {
    case "PDF":
      return "bg-red-100 text-red-700"
    case "DOCX":
      return "bg-blue-100 text-blue-700"
    case "XLSX":
      return "bg-green-100 text-green-700"
    case "PNG":
      return "bg-purple-100 text-purple-700"
    case "MP4":
      return "bg-orange-100 text-orange-700"
    case "PPTX":
      return "bg-yellow-100 text-yellow-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [previewResource, setPreviewResource] = useState<Resource | null>(null)

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredResources = resources.filter((resource) => resource.featured)

  return (
    <DashboardShell>
      <DashboardHeader heading="Resources" text="Templates, guides, and tools to help you succeed with your project" />

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Featured Resources */}
      {searchTerm === "" && selectedCategory === "all" && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Star className="h-5 w-5 mr-2 text-amber-500" />
            Featured Resources
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredResources.map((resource) => {
              const TypeIcon = getTypeIcon(resource.type)
              return (
                <Card key={resource.id} className="hover:shadow-md transition-shadow border-2 border-amber-100">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <TypeIcon className="h-5 w-5 text-amber-600" />
                        <Badge className={`text-xs ${getFormatColor(resource.format)}`}>{resource.format}</Badge>
                      </div>
                      <Star className="h-4 w-4 text-amber-500 fill-current" />
                    </div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription className="text-sm">{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <span>{resource.size}</span>
                      <span className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        {resource.downloads.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-sew-midnight-blue hover:bg-sew-midnight-blue/90"
                        onClick={() => window.open(resource.downloadUrl, "_blank")}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setPreviewResource(resource)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{category.label}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredResources.map((resource) => {
                const TypeIcon = getTypeIcon(resource.type)
                return (
                  <Card key={resource.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <TypeIcon className="h-5 w-5 text-sew-midnight-blue" />
                          <Badge className={`text-xs ${getFormatColor(resource.format)}`}>{resource.format}</Badge>
                        </div>
                        {resource.featured && <Star className="h-4 w-4 text-amber-500 fill-current" />}
                      </div>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <CardDescription className="text-sm">{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {resource.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                        <span>{resource.size}</span>
                        <span className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          {resource.downloads.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-sew-midnight-blue hover:bg-sew-midnight-blue/90"
                          onClick={() => window.open(resource.downloadUrl, "_blank")}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setPreviewResource(resource)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {filteredResources.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No resources found</h3>
                <p className="text-muted-foreground">Try adjusting your search terms or browse a different category.</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Preview Dialog */}
      <Dialog open={!!previewResource} onOpenChange={() => setPreviewResource(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {previewResource && (
                <>
                  {(() => {
                    const TypeIcon = getTypeIcon(previewResource.type)
                    return <TypeIcon className="h-5 w-5" />
                  })()}
                  {previewResource.title}
                </>
              )}
            </DialogTitle>
            <DialogDescription>{previewResource?.description}</DialogDescription>
          </DialogHeader>

          {previewResource && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <Badge className={getFormatColor(previewResource.format)}>{previewResource.format}</Badge>
                <span>{previewResource.size}</span>
                <span className="flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  {previewResource.downloads.toLocaleString()} downloads
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {previewResource.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="bg-muted/50 rounded-lg p-6 text-center">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  Preview not available. Click download to access this resource.
                </p>
                <Button
                  className="bg-sew-midnight-blue hover:bg-sew-midnight-blue/90"
                  onClick={() => window.open(previewResource.downloadUrl, "_blank")}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download {previewResource.format}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
