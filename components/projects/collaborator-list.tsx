"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, MoreVertical, Mail, Edit, Trash2 } from "lucide-react"
import { useProjects, type Collaborator } from "@/contexts/projects-context"

interface CollaboratorListProps {
  projectId: string
}

export function CollaboratorList({ projectId }: CollaboratorListProps) {
  const { getProjectById, removeCollaborator } = useProjects()
  const [searchQuery, setSearchQuery] = useState("")

  const project = getProjectById(projectId)
  if (!project) return null

  // Filter collaborators by search query
  const filteredCollaborators = project.collaborators.filter((collaborator) => {
    const matchesSearch =
      collaborator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collaborator.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collaborator.role.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesSearch
  })

  // Handle collaborator removal
  const handleRemoveCollaborator = (collaboratorId: string) => {
    if (window.confirm("Are you sure you want to remove this team member from the project?")) {
      removeCollaborator(projectId, collaboratorId)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search team members..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredCollaborators.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground mb-4">
              No team members found. Try adjusting your search or add team members to your project.
            </p>
            <Button asChild>
              <Link href={`/dashboard/projects/${projectId}/team/add`}>Add Team Member</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Team Members ({filteredCollaborators.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredCollaborators.map((collaborator) => (
                <CollaboratorItem
                  key={collaborator.id}
                  collaborator={collaborator}
                  projectId={projectId}
                  onRemove={() => handleRemoveCollaborator(collaborator.id)}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

interface CollaboratorItemProps {
  collaborator: Collaborator
  projectId: string
  onRemove: () => void
}

function CollaboratorItem({ collaborator, projectId, onRemove }: CollaboratorItemProps) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-muted/5 transition-colors">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={collaborator.avatar || "/placeholder.svg"} alt={collaborator.name} />
          <AvatarFallback>
            {collaborator.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{collaborator.name}</p>
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">{collaborator.role}</p>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {collaborator.email}
            </span>
          </div>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/projects/${projectId}/team/${collaborator.id}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Role
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600" onClick={onRemove}>
            <Trash2 className="h-4 w-4 mr-2" />
            Remove from Project
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
