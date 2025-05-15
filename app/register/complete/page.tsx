"use client"

import { useRouter } from "next/navigation"
import { OnboardingLayout } from "@/components/layouts/onboarding-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight } from "lucide-react"

export default function RegistrationCompletePage() {
  const router = useRouter()

  return (
    <OnboardingLayout>
      <div className="mx-auto max-w-md">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Registration Complete!</h1>
            <p className="text-muted-foreground">
              You're all set to begin your entrepreneurial journey with Small Economy Works
            </p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-center">Welcome to Small Economy Works</CardTitle>
              <CardDescription className="text-center">Your account has been created successfully</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <h3 className="font-medium mb-2">What's Next?</h3>
                <ul className="space-y-2 text-sm list-disc pl-5">
                  <li>Complete your AI assessment to personalize your learning journey</li>
                  <li>Explore available learning modules and funding opportunities</li>
                  <li>Start working on tasks to unlock micro-grant funding</li>
                  <li>Connect with mentors and other entrepreneurs in your community</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => router.push("/dashboard")}>
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </OnboardingLayout>
  )
}
