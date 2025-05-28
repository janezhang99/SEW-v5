import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BrainCircuit, MessageSquare, Users } from "lucide-react"
import Link from "next/link"

export function AIProjectAssistantStatus() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-base font-medium">AI Project Assistant</CardTitle>
          <CardDescription>Status and recent activity</CardDescription>
        </div>
        <Badge className="bg-green-600">Active</Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <span className="font-medium">842</span> interactions today
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <span className="font-medium">78</span> active users
              </div>
            </div>
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <span className="font-medium">4.8/5</span> rating
              </div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">Last updated: 15 minutes ago</div>
          <Link href="/admin/ai-project-assistant" className="text-sm text-primary hover:underline">
            View settings and analytics →
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
