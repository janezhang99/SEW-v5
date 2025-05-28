import { DemoSection } from "@/components/demo-section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminTools() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Demo Tools</CardTitle>
          <CardDescription>Interactive tools for demonstration and testing purposes</CardDescription>
        </CardHeader>
        <CardContent>
          <DemoSection showTitle={false} />
        </CardContent>
      </Card>
    </div>
  )
}
