"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ThemeSelector, IndigenousThemeProvider } from "@/components/theme/indigenous-theme-provider"
import { useAICompanion } from "@/components/ai-companion/ai-companion-context"
import { AvatarSelector } from "@/components/ai-companion/avatar-selector"
import { Settings, Palette, MessageSquare, Save, UserCircle } from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()
  const { state, updateUserProfile } = useAICompanion()
  const [formData, setFormData] = useState({
    name: state.currentUser?.name || "",
    email: "user@example.com", // Placeholder
    bio: "",
    skillLevel: state.currentUser?.skillLevel || "beginner",
    businessStage: state.currentUser?.businessStage || "idea",
    learningStyle: state.currentUser?.learningStyle || "visual",
    communityType: state.currentUser?.communityType || "rural",
    projectType: state.currentUser?.projectType || "business",
    notifications: true,
    emailUpdates: true,
    darkMode: false,
    highContrast: false,
    reducedMotion: false,
    language: "english",
  })

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    // Update user profile with relevant fields
    updateUserProfile({
      name: formData.name,
      skillLevel: formData.skillLevel as any,
      businessStage: formData.businessStage as any,
      learningStyle: formData.learningStyle as any,
      communityType: formData.communityType,
      projectType: formData.projectType,
    })

    // Show success message
    alert("Settings saved successfully!")
  }

  return (
    <IndigenousThemeProvider>
      <DashboardShell>
        <DashboardHeader heading="Settings" text="Manage your account settings and preferences.">
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </DashboardHeader>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">
              <UserCircle className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="appearance">
              <Palette className="h-4 w-4 mr-2" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="companion">
              <MessageSquare className="h-4 w-4 mr-2" />
              AI Companion
            </TabsTrigger>
            <TabsTrigger value="preferences">
              <Settings className="h-4 w-4 mr-2" />
              Preferences
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and how it appears in Small Economy Works.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself and your project goals..."
                    value={formData.bio}
                    onChange={(e) => handleChange("bio", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Information</CardTitle>
                <CardDescription>Tell us about your project and learning preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="skillLevel">Skill Level</Label>
                    <Select value={formData.skillLevel} onValueChange={(value) => handleChange("skillLevel", value)}>
                      <SelectTrigger id="skillLevel">
                        <SelectValue placeholder="Select skill level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="businessStage">Business Stage</Label>
                    <Select
                      value={formData.businessStage}
                      onValueChange={(value) => handleChange("businessStage", value)}
                    >
                      <SelectTrigger id="businessStage">
                        <SelectValue placeholder="Select business stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="idea">Idea Stage</SelectItem>
                        <SelectItem value="startup">Startup</SelectItem>
                        <SelectItem value="growth">Growth</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="learningStyle">Learning Style</Label>
                    <Select
                      value={formData.learningStyle}
                      onValueChange={(value) => handleChange("learningStyle", value)}
                    >
                      <SelectTrigger id="learningStyle">
                        <SelectValue placeholder="Select learning style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reflective">Reflective</SelectItem>
                        <SelectItem value="visual">Visual</SelectItem>
                        <SelectItem value="practical">Practical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="communityType">Community Type</Label>
                    <Select
                      value={formData.communityType}
                      onValueChange={(value) => handleChange("communityType", value)}
                    >
                      <SelectTrigger id="communityType">
                        <SelectValue placeholder="Select community type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rural">Rural</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="northern">Northern</SelectItem>
                        <SelectItem value="indigenous">Indigenous</SelectItem>
                        <SelectItem value="urban">Urban</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="projectType">Project Type</Label>
                    <Select value={formData.projectType} onValueChange={(value) => handleChange("projectType", value)}>
                      <SelectTrigger id="projectType">
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="community">Community Initiative</SelectItem>
                        <SelectItem value="cultural">Cultural Project</SelectItem>
                        <SelectItem value="educational">Educational Program</SelectItem>
                        <SelectItem value="environmental">Environmental Project</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Theme Settings</CardTitle>
                <CardDescription>
                  Customize the appearance of Small Economy Works to reflect your cultural preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ThemeSelector />

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Accessibility</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="darkMode">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Use a darker color scheme for reduced eye strain in low light.
                      </p>
                    </div>
                    <Switch
                      id="darkMode"
                      checked={formData.darkMode}
                      onCheckedChange={(checked) => handleChange("darkMode", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="highContrast">High Contrast</Label>
                      <p className="text-sm text-muted-foreground">Increase contrast for better readability.</p>
                    </div>
                    <Switch
                      id="highContrast"
                      checked={formData.highContrast}
                      onCheckedChange={(checked) => handleChange("highContrast", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="reducedMotion">Reduced Motion</Label>
                      <p className="text-sm text-muted-foreground">Minimize animations and transitions.</p>
                    </div>
                    <Switch
                      id="reducedMotion"
                      checked={formData.reducedMotion}
                      onCheckedChange={(checked) => handleChange("reducedMotion", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Language Settings</CardTitle>
                <CardDescription>Choose your preferred language for the platform.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <Label htmlFor="language">Language</Label>
                  <Select value={formData.language} onValueChange={(value) => handleChange("language", value)}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="cree">Cree</SelectItem>
                      <SelectItem value="inuktitut">Inuktitut</SelectItem>
                      <SelectItem value="dene">Dene</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Companion Tab */}
          <TabsContent value="companion" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>AI Companion Settings</CardTitle>
                <CardDescription>Customize your AI companion to better support your learning journey.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Choose Your Guide</h3>
                  <AvatarSelector />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Interaction Preferences</h3>

                  <div className="space-y-1">
                    <Label htmlFor="tonePreference">Communication Style</Label>
                    <Select
                      defaultValue={state.currentUser?.tonePreference || "adaptive"}
                      onValueChange={(value) => {
                        updateUserProfile({ tonePreference: value as any })
                      }}
                    >
                      <SelectTrigger id="tonePreference">
                        <SelectValue placeholder="Select communication style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="coaching">Coaching (supportive guidance)</SelectItem>
                        <SelectItem value="cheerleading">Cheerleading (enthusiastic encouragement)</SelectItem>
                        <SelectItem value="inquiry">Inquiry (thoughtful questions)</SelectItem>
                        <SelectItem value="directive">Directive (clear instructions)</SelectItem>
                        <SelectItem value="adaptive">Adaptive (changes based on context)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="showSuggestions">Show Suggestions</Label>
                      <p className="text-sm text-muted-foreground">
                        Display contextual suggestions from your AI companion.
                      </p>
                    </div>
                    <Switch id="showSuggestions" defaultChecked={true} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Learning Preferences</CardTitle>
                <CardDescription>Customize how your AI companion helps with your learning journey.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="reminderNotifications">Learning Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive gentle reminders to continue your learning journey.
                    </p>
                  </div>
                  <Switch id="reminderNotifications" defaultChecked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="progressCelebrations">Celebrate Progress</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive encouragement when you complete learning milestones.
                    </p>
                  </div>
                  <Switch id="progressCelebrations" defaultChecked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="culturalContext">Cultural Context</Label>
                    <p className="text-sm text-muted-foreground">
                      Include cultural context in learning materials when available.
                    </p>
                  </div>
                  <Switch id="culturalContext" defaultChecked={true} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage how and when you receive notifications.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about important updates and deadlines.
                    </p>
                  </div>
                  <Switch
                    id="notifications"
                    checked={formData.notifications}
                    onCheckedChange={(checked) => handleChange("notifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailUpdates">Email Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email updates about your projects and learning progress.
                    </p>
                  </div>
                  <Switch
                    id="emailUpdates"
                    checked={formData.emailUpdates}
                    onCheckedChange={(checked) => handleChange("emailUpdates", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Manage your privacy and data sharing preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dataSharing">Data Sharing</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow anonymous data sharing to improve the platform.
                    </p>
                  </div>
                  <Switch id="dataSharing" defaultChecked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="profileVisibility">Profile Visibility</Label>
                    <p className="text-sm text-muted-foreground">
                      Make your profile visible to other community members.
                    </p>
                  </div>
                  <Switch id="profileVisibility" defaultChecked={true} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DashboardShell>
    </IndigenousThemeProvider>
  )
}
