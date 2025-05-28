import { Button } from "@/components/ui/button"
import { FileText, Users, MessageSquare, Calendar, Share2 } from "lucide-react"

export function ProjectActions() {
  return (
    <div className="py-2">
      <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
      <div className="flex flex-wrap gap-2">
        <Button size="sm">
          <FileText className="mr-2 h-4 w-4" />
          Edit Project
        </Button>
        <Button size="sm" variant="outline">
          <Users className="mr-2 h-4 w-4" />
          Invite Team
        </Button>
        <Button size="sm" variant="outline">
          <MessageSquare className="mr-2 h-4 w-4" />
          Comment
        </Button>
        <Button size="sm" variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Schedule
        </Button>
        <Button size="sm" variant="outline">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>
    </div>
  )
}
