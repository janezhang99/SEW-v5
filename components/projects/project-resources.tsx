import { FileText, FileSpreadsheet, FileImage, LinkIcon, Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ProjectResources() {
  // Mock resources data
  const resources = [
    {
      id: "1",
      title: "Urban Heat Island Mitigation Guide",
      description: "Comprehensive guide on strategies to reduce urban heat island effects",
      type: "PDF",
      size: "2.4 MB",
      date: "2023-01-15",
      url: "#",
      category: "Guide",
    },
    {
      id: "2",
      title: "Green Infrastructure Cost-Benefit Analysis",
      description: "Detailed analysis of costs and benefits for various green infrastructure options",
      type: "Spreadsheet",
      size: "1.8 MB",
      date: "2023-02-28",
      url: "#",
      category: "Analysis",
    },
    {
      id: "3",
      title: "Community Engagement Strategy",
      description: "Framework for engaging local communities in the project",
      type: "Document",
      size: "1.2 MB",
      date: "2023-03-10",
      url: "#",
      category: "Strategy",
    },
    {
      id: "4",
      title: "Project Implementation Timeline",
      description: "Detailed timeline for project implementation phases",
      type: "Gantt Chart",
      size: "3.5 MB",
      date: "2023-04-05",
      url: "#",
      category: "Planning",
    },
    {
      id: "5",
      title: "Site Assessment Photos",
      description: "Collection of photos from the initial site assessment",
      type: "Images",
      size: "15.2 MB",
      date: "2023-01-10",
      url: "#",
      category: "Documentation",
    },
    {
      id: "6",
      title: "Climate Vulnerability Map",
      description: "Interactive map showing climate vulnerability in the project area",
      type: "Web Link",
      date: "2023-05-20",
      url: "#",
      category: "Map",
    },
  ]

  // Function to get the appropriate icon based on resource type
  const getResourceIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="h-5 w-5 text-red-500" />
      case "Spreadsheet":
        return <FileSpreadsheet className="h-5 w-5 text-green-500" />
      case "Document":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "Gantt Chart":
        return <FileSpreadsheet className="h-5 w-5 text-purple-500" />
      case "Images":
        return <FileImage className="h-5 w-5 text-amber-500" />
      case "Web Link":
        return <LinkIcon className="h-5 w-5 text-sky-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">Project Resources</h2>
          <p className="text-muted-foreground">Documents, data, and links related to the project</p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Upload Resource
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((resource) => (
          <Card key={resource.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="mt-1">{getResourceIcon(resource.type)}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{resource.title}</h3>
                    <Badge variant="outline" className="ml-2">
                      {resource.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                  <div className="flex items-center text-xs text-muted-foreground mb-3">
                    <span>{resource.type}</span>
                    {resource.size && (
                      <>
                        <span className="mx-2">•</span>
                        <span>{resource.size}</span>
                      </>
                    )}
                    <span className="mx-2">•</span>
                    <span>Added {new Date(resource.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-2">
                    {resource.type === "Web Link" ? (
                      <Button size="sm" variant="outline">
                        <ExternalLink className="mr-1 h-3 w-3" />
                        Open Link
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline">
                        <Download className="mr-1 h-3 w-3" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
