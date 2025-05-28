"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MultiFormatContentExample } from "@/components/learning/multi-format-content"
import { MentorshipSystemExample } from "@/components/mentorship/mentorship-system"
import { CulturalPreferencesExample } from "@/components/cultural-context/cultural-preferences"

export default function PersonalizedLearningPage() {
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Personalized Learning Experience</h1>

      <Tabs defaultValue="content">
        <TabsList className="mb-6">
          <TabsTrigger value="content">Multi-Format Content</TabsTrigger>
          <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
          <TabsTrigger value="cultural">Cultural Context</TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Multi-Format Learning Content</h2>
            <p className="text-muted-foreground mb-6">
              Access learning materials in the format that works best for you - text, video, audio, visual, or
              interactive.
            </p>
            <MultiFormatContentExample />
          </div>
        </TabsContent>

        <TabsContent value="mentorship">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Mentorship Connection</h2>
            <p className="text-muted-foreground mb-6">
              Connect with mentors who can guide you through your learning journey and provide personalized support.
            </p>
            <MentorshipSystemExample />
          </div>
        </TabsContent>

        <TabsContent value="cultural">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Cultural Context Settings</h2>
            <p className="text-muted-foreground mb-6">
              Customize your learning experience to align with your cultural background and preferences.
            </p>
            <CulturalPreferencesExample />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
