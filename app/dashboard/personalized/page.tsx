"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SimplifiedNavigation } from "@/components/navigation/simplified-navigation"
import { FlexibleTaskStructureExample } from "@/components/tasks/flexible-task-structure"
import { IndigenousDesignSystemExample } from "@/components/cultural-elements/indigenous-design-system"

export default function PersonalizedLearningPage() {
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Personalized Learning Experience</h1>

      <Tabs defaultValue="navigation">
        <TabsList className="mb-6">
          <TabsTrigger value="navigation">Simplified Navigation</TabsTrigger>
          <TabsTrigger value="tasks">Flexible Task Structure</TabsTrigger>
          <TabsTrigger value="cultural">Cultural Design Elements</TabsTrigger>
        </TabsList>

        <TabsContent value="navigation">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Simplified Navigation</h2>
            <p className="text-muted-foreground mb-6">
              Clear, visual navigation paths with minimal text and intuitive icons to guide users through the platform.
            </p>
            <div className="border rounded-lg p-4 bg-muted/20">
              <p className="text-center text-muted-foreground mb-4">Navigation Preview (Desktop & Mobile)</p>
              <div className="h-[500px] relative border rounded-lg overflow-hidden">
                <SimplifiedNavigation />
                <div className="absolute inset-0 flex items-center justify-center bg-black/5 pointer-events-none">
                  <p className="text-lg font-medium">Your content would appear here</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tasks">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Flexible Task Structure</h2>
            <p className="text-muted-foreground mb-6">
              Phase-based roadmaps that allow tasks to be completed in different orders with estimated time commitments.
            </p>
            <FlexibleTaskStructureExample />
          </div>
        </TabsContent>

        <TabsContent value="cultural">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Cultural Design Elements</h2>
            <p className="text-muted-foreground mb-6">
              Indigenous design elements and imagery that respect and honor traditional knowledge.
            </p>
            <IndigenousDesignSystemExample />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
