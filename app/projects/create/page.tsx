import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CreateProjectPage() {
  return (
    <div>
      <PageHeader
        title="Create New Project"
        description="Start a new climate adaptation project and invite collaborators"
      />

      <div className="container mx-auto py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>Fill out the information below to create your new project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">Project creation form will be implemented here.</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/projects">Cancel</Link>
            </Button>
            <Button asChild>
              <Link href="/projects">Save as Draft</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
