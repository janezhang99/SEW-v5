import Image from "next/image"
import { Mail, Phone, LinkIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ProjectTeam() {
  // Mock team data
  const teamMembers = [
    {
      id: "1",
      name: "Alex Johnson",
      role: "Project Lead",
      avatar: "/diverse-person-portrait.png",
      email: "alex.johnson@example.com",
      phone: "+1 (555) 123-4567",
      website: "alexjohnson.example.com",
      skills: ["Project Management", "Climate Adaptation", "Stakeholder Engagement"],
      bio: "Alex has over 10 years of experience in climate adaptation projects and specializes in urban resilience planning.",
    },
    {
      id: "2",
      name: "Sam Rivera",
      role: "Urban Planner",
      avatar: "/diverse-group-five.png",
      email: "sam.rivera@example.com",
      phone: "+1 (555) 234-5678",
      website: "samrivera.example.com",
      skills: ["Urban Planning", "GIS", "Land Use"],
      bio: "Sam is an urban planner with expertise in sustainable city design and green infrastructure implementation.",
    },
    {
      id: "3",
      name: "Taylor Kim",
      role: "Environmental Scientist",
      avatar: "/diverse-group-conversation.png",
      email: "taylor.kim@example.com",
      phone: "+1 (555) 345-6789",
      website: "taylorkim.example.com",
      skills: ["Environmental Assessment", "Ecology", "Climate Modeling"],
      bio: "Taylor specializes in environmental impact assessments and ecosystem-based adaptation approaches.",
    },
    {
      id: "4",
      name: "Jordan Smith",
      role: "Community Liaison",
      avatar: "/diverse-group-meeting.png",
      email: "jordan.smith@example.com",
      phone: "+1 (555) 456-7890",
      website: "jordansmith.example.com",
      skills: ["Community Engagement", "Public Relations", "Social Equity"],
      bio: "Jordan works closely with community members to ensure project benefits are equitably distributed.",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {teamMembers.map((member) => (
        <Card key={member.id} className="overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            <div className="relative h-48 sm:h-auto sm:w-1/3">
              <Image src={member.avatar || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
            </div>
            <CardContent className="flex-1 p-4">
              <div className="mb-2">
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>

              <p className="text-sm mb-3">{member.bio}</p>

              <div className="space-y-1 mb-3">
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{member.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <LinkIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{member.website}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {member.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  )
}
