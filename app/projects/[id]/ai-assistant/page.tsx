import { PageHeader } from "@/components/page-header"
import { AIProjectAssistant } from "@/components/projects/ai-project-assistant"

interface AIAssistantPageProps {
  params: {
    id: string
  }
}

export default function AIAssistantPage({ params }: AIAssistantPageProps) {
  // In a real app, we would fetch the project data based on the ID
  const projectName = "Urban Heat Island Mitigation Project"
  const projectType = "Urban Greening"
  const projectPhase = "Implementation"

  return (
    <div className="container py-6 space-y-6">
      <PageHeader
        heading="AI Project Assistant"
        subheading="Get AI-powered assistance for your project"
        backLink={`/projects/${params.id}`}
        backLinkText="Back to Project"
      />

      <div className="grid grid-cols-1 gap-6">
        <AIProjectAssistant
          projectId={params.id}
          projectName={projectName}
          projectType={projectType}
          projectPhase={projectPhase}
          className="h-[calc(100vh-12rem)]"
        />
      </div>
    </div>
  )
}
