import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus } from "lucide-react"

export default function AdminUsers() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search users..." className="w-full pl-8 md:w-[300px]" />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>Manage platform users and their permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg border p-4">
              <Avatar>
                <AvatarImage src="/avatars/sarah-chen.png" alt="Sarah Chen" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">Sarah Chen</div>
                <div className="text-sm text-muted-foreground">sarah.chen@example.com</div>
              </div>
              <Badge>Admin</Badge>
            </div>
            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg border p-4">
              <Avatar>
                <AvatarImage src="/avatars/miguel-rodriguez.png" alt="Miguel Rodriguez" />
                <AvatarFallback>MR</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">Miguel Rodriguez</div>
                <div className="text-sm text-muted-foreground">miguel.rodriguez@example.com</div>
              </div>
              <Badge variant="outline">Member</Badge>
            </div>
            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg border p-4">
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">Jordan Davis</div>
                <div className="text-sm text-muted-foreground">jordan.davis@example.com</div>
              </div>
              <Badge variant="outline">Member</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
