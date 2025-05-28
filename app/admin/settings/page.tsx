import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Platform Settings</CardTitle>
          <CardDescription>Configure global platform settings and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="space-y-4">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="site-name">Site Name</Label>
                <Input id="site-name" defaultValue="CanAdapt Platform" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="site-description">Site Description</Label>
                <Input id="site-description" defaultValue="Canada's Community of Practitioners in Climate Adaptation" />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="public-access">Public Access</Label>
                  <div className="text-sm text-muted-foreground">Allow public access to the platform without login</div>
                </div>
                <Switch id="public-access" />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
