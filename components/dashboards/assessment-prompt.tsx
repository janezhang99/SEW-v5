"use client"

import { useView } from "@/components/view-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardCheck, ArrowRight } from "lucide-react"

export default function AssessmentPrompt() {
  const { setHasCompletedAssessment } = useView()

  // Function to simulate completing the assessment
  const handleCompleteAssessment = () => {
    setHasCompletedAssessment(true)
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-6">
      <Card className="max-w-2xl">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <ClipboardCheck className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-center text-2xl">Complete Your Assessment</CardTitle>
          <CardDescription className="text-center">
            To personalize your experience, we need to understand your role, interests, and expertise
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <h3 className="mb-2 font-medium">Why complete the assessment?</h3>
            <ul className="ml-6 list-disc space-y-2 text-sm">
              <li>Receive personalized recommendations based on your role and expertise</li>
              <li>Connect with practitioners facing similar challenges</li>
              <li>Access resources tailored to your specific needs</li>
              <li>Track your progress and development in key competency areas</li>
            </ul>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-medium">What to expect</h3>
            <p className="text-sm text-muted-foreground">
              The assessment takes approximately 10-15 minutes to complete. You'll answer questions about:
            </p>
            <ul className="ml-6 mt-2 list-disc space-y-1 text-sm text-muted-foreground">
              <li>Your professional role and organization</li>
              <li>Climate adaptation experience and expertise</li>
              <li>Specific challenges and interests</li>
              <li>Learning preferences and goals</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleCompleteAssessment}>
            Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
