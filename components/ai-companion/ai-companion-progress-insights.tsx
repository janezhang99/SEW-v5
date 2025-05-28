"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Award, Target } from "lucide-react"

export function AICompanionProgressInsights() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Learning Insights</CardTitle>
          <div className="bg-primary/10 p-1.5 rounded-md">
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
        </div>
        <CardDescription>AI-powered insights on your learning progress</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium">Focus Areas</h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Based on your assessment, focusing on vulnerability mapping will help you advance in risk assessment.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium">Achievement Prediction</h3>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Progress to "Risk Assessment Expert" badge</span>
              <span>68%</span>
            </div>
            <Progress value={68} className="h-1.5" />
            <p className="text-xs text-muted-foreground">
              At your current pace, you'll earn this badge in approximately 3 weeks.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium">Learning Pattern</h3>
          </div>
          <p className="text-xs text-muted-foreground">
            You learn most effectively in the evenings. Consider scheduling 30-minute sessions between 7-9 PM.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
