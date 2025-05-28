import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ProjectMetrics() {
  // Mock data for metrics
  const progressData = [
    { name: "Q1 2023", planned: 15, actual: 12 },
    { name: "Q2 2023", planned: 30, actual: 25 },
    { name: "Q3 2023", planned: 45, actual: 40 },
    { name: "Q4 2023", planned: 60, actual: 55 },
    { name: "Q1 2024", planned: 75, actual: 65 },
    { name: "Q2 2024", planned: 90, actual: 0 },
    { name: "Q3 2024", planned: 100, actual: 0 },
  ]

  const budgetData = [
    { name: "Personnel", value: 35 },
    { name: "Equipment", value: 25 },
    { name: "Materials", value: 20 },
    { name: "Services", value: 15 },
    { name: "Other", value: 5 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Project Metrics</CardTitle>
        <CardDescription>Key performance indicators and project statistics</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="progress">
          <TabsList className="mb-4">
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="impact">Impact</TabsTrigger>
          </TabsList>

          <TabsContent value="progress">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={progressData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="planned" name="Planned Progress (%)" fill="#8884d8" />
                  <Bar dataKey="actual" name="Actual Progress (%)" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="budget">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={budgetData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {budgetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="impact">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold">15%</div>
                    <div className="text-sm text-muted-foreground mt-1">Increase in Urban Tree Canopy</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold">3</div>
                    <div className="text-sm text-muted-foreground mt-1">Cooling Centers Established</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold">2.1°C</div>
                    <div className="text-sm text-muted-foreground mt-1">Temperature Reduction</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
