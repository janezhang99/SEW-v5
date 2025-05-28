import { PageHeader } from "@/components/page-header"
import { ContentGrid } from "@/components/content-grid"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Sample resources data
const resources = [
  {
    id: "resource-1",
    title: "Climate Risk Assessment Toolkit",
    description:
      "A comprehensive set of tools and templates for conducting climate risk assessments at various scales.",
    image: "/risk-assessment-toolkit.png",
    domain: "Climate Risk Assessment",
    type: "Toolkit",
    format: "PDF",
    pages: 48,
    downloads: 256,
    tags: ["riskmapping", "vulnerability", "hazards"],
    featured: true,
    link: "/resources/climate-risk-assessment-toolkit",
  },
  {
    id: "resource-2",
    title: "Adaptation Planning Framework",
    description: "Step-by-step guide to developing climate adaptation plans for municipalities and organizations.",
    image: "/adaptation-planning-framework.png",
    domain: "Strategic Adaptation Planning",
    type: "Guide",
    format: "PDF",
    pages: 36,
    downloads: 189,
    tags: ["planning", "framework", "strategy"],
    featured: true,
    link: "/resources/adaptation-planning-framework",
  },
  {
    id: "resource-3",
    title: "Nature-based Solutions Database",
    description:
      "Searchable database of nature-based adaptation solutions with case studies and implementation guidance.",
    image: "/nature-based-database.png",
    domain: "Adaptation Options",
    type: "Database",
    format: "Web Tool",
    downloads: 142,
    tags: ["naturebasedsolutions", "ecosystem", "biodiversity"],
    link: "/resources/nature-based-solutions-database",
  },
  {
    id: "resource-4",
    title: "Adaptation Project Management Templates",
    description: "Templates for planning, implementing, and tracking climate adaptation projects.",
    image: "/project-management-templates.png",
    domain: "Implementation & Operations",
    type: "Templates",
    format: "Excel",
    downloads: 178,
    tags: ["projectmanagement", "implementation", "operations"],
    link: "/resources/adaptation-project-management-templates",
  },
]

export default function ResourcesPage() {
  return (
    <>
      <PageHeader title="Resources" description="Browse our collection of adaptation tools, guides, and frameworks">
        <div className="flex gap-2 max-w-3xl mx-auto mt-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 bg-white/90 text-black">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Narrow down resources based on your interests and needs</SheetDescription>
              </SheetHeader>
              <div className="grid gap-6 py-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Domain</h3>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="All domains" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All domains</SelectItem>
                      <SelectItem value="risk">Climate Risk Assessment</SelectItem>
                      <SelectItem value="planning">Strategic Adaptation Planning</SelectItem>
                      <SelectItem value="options">Adaptation Options</SelectItem>
                      <SelectItem value="implementation">Implementation & Operations</SelectItem>
                      <SelectItem value="monitoring">Monitoring & Learning</SelectItem>
                      <SelectItem value="cross-cutting">Cross-Cutting Skills</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Resource Type</h3>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All types</SelectItem>
                      <SelectItem value="guide">Guide</SelectItem>
                      <SelectItem value="tool">Tool</SelectItem>
                      <SelectItem value="toolkit">Toolkit</SelectItem>
                      <SelectItem value="framework">Framework</SelectItem>
                      <SelectItem value="templates">Templates</SelectItem>
                      <SelectItem value="database">Database</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline">Clear Filters</Button>
              </div>
            </SheetContent>
          </Sheet>

          <div className="relative w-full">
            <Input placeholder="Search resources..." className="h-9 bg-white/90 text-black" />
          </div>
        </div>
      </PageHeader>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="grid" className="w-full">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {resources.length} {resources.length === 1 ? "resource" : "resources"} found
            </div>
            <TabsList>
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="grid" className="mt-6">
            <ContentGrid items={resources} showViewToggle={false}>
              {/* Children content is now optional since we're using the items prop */}
            </ContentGrid>
          </TabsContent>

          <TabsContent value="list" className="mt-6">
            <ContentGrid items={resources} showViewToggle={false}>
              {/* Children content is now optional since we're using the items prop */}
            </ContentGrid>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
