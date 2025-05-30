import type { Metadata } from "next"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, MapPin, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Project Details | Small Economy Works",
  description: "View project updates and progress from youth entrepreneurs.",
}

// This would be fetched from your API
async function getProject(projectId: string) {
  // Mock data - replace with actual API call
  return {
    id: projectId,
    title: "Community Garden Initiative",
    description:
      "Creating a sustainable community garden to provide fresh produce and education opportunities for local families.",
    projectLead: {
      name: "Maya Thompson",
      age: 17,
      avatar: "/young-asian-woman-portrait.png",
    },
    teamMembers: [
      { name: "Jordan Blackfeather", role: "Research Coordinator" },
      { name: "Alex Chen", role: "Community Outreach" },
    ],
    mentor: {
      name: "Sarah Wilson",
      title: "Agricultural Specialist",
    },
    location: "Whitehorse, YT",
    category: "Environmental",
    startDate: "2024-01-15",
    expectedCompletion: "2024-06-30",
    fundingGoal: 5000,
    fundingReceived: 3200,
    progress: 64,
    updates: [
      {
        id: "1",
        title: "Site Preparation Complete",
        content:
          "We've successfully cleared and prepared the garden site. The soil testing results show excellent conditions for growing vegetables.",
        date: "2024-03-15",
        images: ["/community-garden.png"],
      },
      {
        id: "2",
        title: "Community Workshop Success",
        content:
          "Hosted our first community workshop with 25 participants learning about sustainable gardening practices.",
        date: "2024-03-01",
        images: ["/youth-workshop.png"],
      },
    ],
    impact: {
      peopleReached: 150,
      outcomes: [
        "25 families trained in sustainable gardening",
        "500 sq ft of productive garden space created",
        "Partnership established with local school",
      ],
    },
  }
}

export default async function PublicProjectPage({ params }: { params: { projectId: string } }) {
  const project = await getProject(params.projectId)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Small Economy Works</h1>
              <p className="text-sm text-gray-600">Youth-led community development projects</p>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Public Project View
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{project.title}</CardTitle>
                    <CardDescription className="mt-2 text-base">{project.description}</CardDescription>
                  </div>
                  <Badge variant="secondary">{project.category}</Badge>
                </div>

                <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {project.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Started {new Date(project.startDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {project.impact.peopleReached} people reached
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Project Updates */}
            <Card>
              <CardHeader>
                <CardTitle>Project Updates</CardTitle>
                <CardDescription>Latest progress and milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {project.updates.map((update) => (
                    <div key={update.id} className="border-l-2 border-blue-200 pl-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{update.title}</h3>
                        <span className="text-sm text-gray-500">{new Date(update.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-gray-700 mb-3">{update.content}</p>
                      {update.images && update.images.length > 0 && (
                        <div className="grid grid-cols-2 gap-2">
                          {update.images.map((image, index) => (
                            <div key={index} className="relative h-32 rounded-md overflow-hidden">
                              <Image
                                src={image || "/placeholder.svg"}
                                alt={`Update ${update.id} image ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Impact Section */}
            <Card>
              <CardHeader>
                <CardTitle>Community Impact</CardTitle>
                <CardDescription>How this project is making a difference</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">{project.impact.peopleReached}</div>
                    <div className="text-sm text-blue-800">People Reached</div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Key Outcomes</h4>
                    <ul className="space-y-2">
                      {project.impact.outcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start">
                          <div className="h-2 w-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                          <span className="text-sm">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Team Information */}
            <Card>
              <CardHeader>
                <CardTitle>Project Team</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-gray-600 mb-2">Project Lead</h4>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-sm font-medium text-blue-700">{project.projectLead.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium">{project.projectLead.name}</p>
                      <p className="text-sm text-gray-600">Age {project.projectLead.age}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-gray-600 mb-2">Team Members</h4>
                  <div className="space-y-2">
                    {project.teamMembers.map((member, index) => (
                      <div key={index} className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                          <span className="text-xs font-medium text-gray-700">{member.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{member.name}</p>
                          <p className="text-xs text-gray-600">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-gray-600 mb-2">Mentor</h4>
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <span className="text-xs font-medium text-green-700">{project.mentor.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{project.mentor.name}</p>
                      <p className="text-xs text-gray-600">{project.mentor.title}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Funding Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Funding Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-gray-600">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">${project.fundingReceived}</span>
                    <span className="text-gray-600">of ${project.fundingGoal}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Started</span>
                    <span className="font-medium">{new Date(project.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Expected Completion</span>
                    <span className="font-medium">{new Date(project.expectedCompletion).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
