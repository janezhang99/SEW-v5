import { PageHeader } from "@/components/page-header"
import { ContentGrid } from "@/components/content-grid"
import { ProjectCard } from "@/components/projects/project-card"
import { ProjectFilters } from "@/components/projects/project-filters"
import { AICompanionEmbedded } from "@/components/ai-companion/ai-companion-embedded"

// Mock data for projects
const projects = [
  {
    id: "1",
    title: "Urban Heat Island Mitigation",
    description: "Implementing green infrastructure to reduce urban heat island effects in downtown areas.",
    domain: "Adaptation Options",
    stage: "Planning",
    progress: 35,
    collaborators: 4,
    image: "/urban-green-infrastructure.png",
    updatedAt: "2023-11-15T10:30:00Z",
  },
  {
    id: "2",
    title: "Coastal Erosion Management",
    description: "Developing nature-based solutions to address coastal erosion in vulnerable communities.",
    domain: "Climate Risk Assessment",
    stage: "Implementation",
    progress: 65,
    collaborators: 7,
    image: "/nature-based-solutions-urban.png",
    updatedAt: "2023-11-10T14:45:00Z",
  },
  {
    id: "3",
    title: "Community Flood Resilience",
    description: "Building community capacity to prepare for and respond to increasing flood risks.",
    domain: "Implementation & Operations",
    stage: "Monitoring",
    progress: 80,
    collaborators: 5,
    image: "/climate-risk-map-flooding.png",
    updatedAt: "2023-11-05T09:15:00Z",
  },
  {
    id: "4",
    title: "Climate-Resilient Agriculture",
    description: "Supporting farmers in adopting climate-smart agricultural practices.",
    domain: "Cross-Cutting Skills",
    stage: "Planning",
    progress: 20,
    collaborators: 3,
    image: "/nature-based-solutions.png",
    updatedAt: "2023-11-18T16:20:00Z",
  },
  {
    id: "5",
    title: "Municipal Adaptation Planning",
    description: "Developing comprehensive climate adaptation plans for small municipalities.",
    domain: "Strategic Adaptation Planning",
    stage: "Assessment",
    progress: 45,
    collaborators: 6,
    image: "/climate-adaptation-policy.png",
    updatedAt: "2023-11-08T11:30:00Z",
  },
  {
    id: "6",
    title: "Climate Risk Communication",
    description: "Improving public understanding of climate risks through innovative communication strategies.",
    domain: "Climate Risk Assessment",
    stage: "Implementation",
    progress: 60,
    collaborators: 4,
    image: "/climate-risk-communication.png",
    updatedAt: "2023-11-12T13:45:00Z",
  },
]

export default function ProjectsPage() {
  return (
    <div>
      <PageHeader title="Projects" description="Create and collaborate on climate adaptation projects" />

      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ProjectFilters />

            <div className="mt-8">
              <AICompanionEmbedded
                title="Project Assistant"
                description="Need help with your project? I can suggest resources, methodologies, and connect you with similar projects."
                flowId="project-assistance"
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <ContentGrid
              itemCount={projects.length}
              showAddButton
              addButtonLabel="Create Project"
              addButtonUrl="/projects/create"
            >
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </ContentGrid>
          </div>
        </div>
      </div>
    </div>
  )
}
