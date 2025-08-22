"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { OnboardingLayout } from "@/components/layouts/onboarding-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Loader2 } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<"register" | "login">("register")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    ageRange: "",
    communityName: "",
    provinceTerritory: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const ageRanges = [
    { value: "15-19", label: "15-19" },
    { value: "20-24", label: "20-24" },
    { value: "25-30", label: "25-30" },
  ]

  const provincesAndTerritories = [
    { value: "alberta", label: "Alberta" },
    { value: "british-columbia", label: "British Columbia" },
    { value: "newfoundland-and-labrador", label: "Newfoundland and Labrador" },
    { value: "northwest-territories", label: "Northwest Territories" },
    { value: "nunavut", label: "Nunavut" },
    { value: "saskatchewan", label: "Saskatchewan" },
    { value: "yukon", label: "Yukon" },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user makes selection
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (activeTab === "register") {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required"
      }

      if (!formData.ageRange) {
        newErrors.ageRange = "Age range is required"
      }

      if (!formData.communityName.trim()) {
        newErrors.communityName = "Community name is required"
      }

      if (!formData.provinceTerritory) {
        newErrors.provinceTerritory = "Province/Territory is required"
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
      }

      if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters"
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would handle authentication here
      // For now, we'll just redirect to the next step
      if (activeTab === "register") {
        router.push("/register/profile")
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Error during registration:", error)
      setErrors({ form: "An error occurred. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <OnboardingLayout currentStep={activeTab}>
      <div className="mx-auto max-w-md">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Join Small Economy Works</h1>
            <p className="text-muted-foreground">
              Create an account to start your entrepreneurial journey and access micro-grant funding
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "register" | "login")}>
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="register">Register</TabsTrigger>
              <TabsTrigger value="login">Login</TabsTrigger>
            </TabsList>

            <TabsContent value="register">
              <Card>
                <form onSubmit={handleSubmit}>
                  <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>Enter your information to create your account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                      />
                      {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                      />
                      {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ageRange">Age Range *</Label>
                      <Select
                        value={formData.ageRange}
                        onValueChange={(value) => handleSelectChange("ageRange", value)}
                        disabled={isLoading}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your age range" />
                        </SelectTrigger>
                        <SelectContent>
                          {ageRanges.map((range) => (
                            <SelectItem key={range.value} value={range.value}>
                              {range.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.ageRange && <p className="text-sm text-destructive">{errors.ageRange}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="communityName">Community Name *</Label>
                      <Input
                        id="communityName"
                        name="communityName"
                        placeholder="Enter your community name"
                        value={formData.communityName}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                      />
                      {errors.communityName && <p className="text-sm text-destructive">{errors.communityName}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="provinceTerritory">Province/Territory *</Label>
                      <Select
                        value={formData.provinceTerritory}
                        onValueChange={(value) => handleSelectChange("provinceTerritory", value)}
                        disabled={isLoading}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your province/territory" />
                        </SelectTrigger>
                        <SelectContent>
                          {provincesAndTerritories.map((location) => (
                            <SelectItem key={location.value} value={location.value}>
                              {location.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.provinceTerritory && (
                        <p className="text-sm text-destructive">{errors.provinceTerritory}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password *</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Create a password (min. 8 characters)"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                      />
                      {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password *</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                      />
                      {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
                    </div>

                    {errors.form && <p className="text-sm text-destructive">{errors.form}</p>}
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        <>
                          Create account
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="login">
              <Card>
                <form onSubmit={handleSubmit}>
                  <CardHeader>
                    <CardTitle>Welcome back</CardTitle>
                    <CardDescription>Enter your credentials to access your account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isLoading}
                      />
                      {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="login-password">Password</Label>
                        <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <Input
                        id="login-password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={isLoading}
                      />
                      {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                    </div>

                    {errors.form && <p className="text-sm text-destructive">{errors.form}</p>}
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Logging in...
                        </>
                      ) : (
                        <>
                          Log in
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </OnboardingLayout>
  )
}
