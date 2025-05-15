import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, MessageCircle, Star, Video } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Mentor Profile | Small Economy Works",
  description: "View mentor profile and schedule a session.",
}

// Mock data for mentor
const getMentor = (id: string) => {
  const mentors = {
    "1": {
      id: "1",
      name: "Sarah Johnson",
      title: "Community Development Specialist",
      image: "/short-haired-woman-portrait.png",
      bio: "I have over 10 years of experience working with community-led initiatives and grant writing. My passion is helping young people develop the skills they need to create positive change in their communities. I specialize in grant writing, community organizing, and project management.",
      expertise: ["Grant Writing", "Community Organizing", "Project Management", "Youth Engagement", "Fundraising"],
      languages: ["English", "Spanish"],
      education: [
        "Master's in Community Development, University of British Columbia",
        "Bachelor's in Sociology, University of Alberta",
      ],
      experience: [
        "Community Development Officer, Indigenous Youth Council (2018-Present)",
        "Grant Writer, Northern Communities Foundation (2015-2018)",
        "Youth Program Coordinator, Community Futures (2012-2015)",
      ],
      availability: [
        { day: "Monday", slots: ["10:00 AM - 11:00 AM", "2:00 PM - 3:00 PM"] },
        { day: "Wednesday", slots: ["1:00 PM - 2:00 PM", "4:00 PM - 5:00 PM"] },
        { day: "Friday", slots: ["11:00 AM - 12:00 PM"] },
      ],
      rating: 4.9,
      reviews: [
        {
          id: "r1",
          name: "Jamie T.",
          date: "April 2, 2025",
          rating: 5,
          comment:
            "Sarah was incredibly helpful with reviewing my grant application. She provided detailed feedback and suggestions that significantly improved my proposal.",
        },
        {
          id: "r2",
          name: "Alex M.",
          date: "March 15, 2025",
          rating: 5,
          comment:
            "I had a great mentorship session with Sarah. She shared practical advice for community organizing that I could immediately apply to my project.",
        },
        {
          id: "r3",
          name: "Taylor K.",
          date: "February 28, 2025",
          rating: 4,
          comment:
            "Sarah provided valuable insights on project management. Her experience in the field is evident, and she was able to address all my questions.",
        },
      ],
    },
    "2": {
      id: "2",
      name: "Michael Redfeather",
      title: "Indigenous Business Advisor",
      image: "/placeholder-zmmhy.png",
      bio: "With 15 years of experience in Indigenous business development, I help entrepreneurs build sustainable businesses that honor cultural values while achieving economic success. My approach combines traditional knowledge with modern business practices.",
      expertise: ["Business Planning", "Cultural Enterprise", "Funding", "Marketing", "Financial Management"],
      languages: ["English", "Cree"],
      education: [
        "MBA, Indigenous Business and Leadership, Simon Fraser University",
        "Bachelor's in Commerce, University of Saskatchewan",
      ],
      experience: [
        "Indigenous Business Advisor, First Nations Development Corporation (2017-Present)",
        "Economic Development Officer, Treaty 6 Tribal Council (2012-2017)",
        "Small Business Consultant, Aboriginal Business Service Network (2008-2012)",
      ],
      availability: [
        { day: "Tuesday", slots: ["9:00 AM - 10:00 AM", "1:00 PM - 2:00 PM"] },
        { day: "Thursday", slots: ["11:00 AM - 12:00 PM", "3:00 PM - 4:00 PM"] },
        { day: "Saturday", slots: ["10:00 AM - 11:00 AM"] },
      ],
      rating: 4.8,
      reviews: [
        {
          id: "r1",
          name: "Jordan B.",
          date: "April 10, 2025",
          rating: 5,
          comment:
            "Michael helped me develop a business plan that respects my cultural values while being financially viable. His guidance was invaluable.",
        },
        {
          id: "r2",
          name: "Sam W.",
          date: "March 22, 2025",
          rating: 5,
          comment:
            "I appreciated Michael's holistic approach to business development. He understands the unique challenges Indigenous entrepreneurs face.",
        },
        {
          id: "r3",
          name: "Casey L.",
          date: "February 15, 2025",
          rating: 4,
          comment:
            "Michael provided excellent advice on funding opportunities specifically for Indigenous businesses. His network and knowledge are impressive.",
        },
      ],
    },
  }

  return mentors[id as keyof typeof mentors]
}

export default function MentorProfilePage({ params }: { params: { mentorId: string } }) {
  const mentor = getMentor(params.mentorId)

  if (!mentor) {
    return (
      <div className="container mx-auto py-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Mentor not found</h1>
        <p className="mb-6">The mentor you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/dashboard/mentorship">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Mentors
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link href="/dashboard/mentorship">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Mentors
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative h-48 w-48 rounded-full overflow-hidden mb-4">
                  <Image src={mentor.image || "/placeholder.svg"} alt={mentor.name} fill className="object-cover" />
                </div>
                <h1 className="text-2xl font-bold">{mentor.name}</h1>
                <p className="text-muted-foreground">{mentor.title}</p>

                <div className="flex items-center mt-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="ml-1 font-medium">{mentor.rating}</span>
                  <span className="ml-1 text-muted-foreground">({mentor.reviews.length} reviews)</span>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {mentor.expertise.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 w-full mt-6">
                  <Button className="w-full">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Languages</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {mentor.languages.map((language) => (
                  <li key={language}>{language}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {mentor.education.map((edu, index) => (
                  <li key={index} className="text-sm">
                    {edu}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {mentor.experience.map((exp, index) => (
                  <li key={index} className="text-sm">
                    {exp}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About {mentor.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{mentor.bio}</p>

              <div className="mt-6">
                <h3 className="font-medium mb-2">Areas of Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {mentor.expertise.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Availability</CardTitle>
              <CardDescription>Select a time slot to schedule a session</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mentor.availability.map((avail) => (
                  <div key={avail.day}>
                    <h3 className="font-medium mb-2">{avail.day}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {avail.slots.map((slot) => (
                        <Button key={slot} variant="outline" className="justify-start">
                          <Clock className="mr-2 h-4 w-4" />
                          {slot}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Session Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium">30-Minute Quick Chat</h3>
                        <p className="text-sm text-muted-foreground">Brief consultation on specific questions</p>
                      </div>
                      <Badge>Free</Badge>
                    </div>
                    <ul className="text-sm space-y-2 mb-4">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Get answers to specific questions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Available via video call or chat</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>One-time session</span>
                      </li>
                    </ul>
                    <Button className="w-full">
                      <Video className="mr-2 h-4 w-4" />
                      Book Quick Chat
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium">60-Minute Deep Dive</h3>
                        <p className="text-sm text-muted-foreground">In-depth guidance on your project</p>
                      </div>
                      <Badge variant="outline">Exchange</Badge>
                    </div>
                    <ul className="text-sm space-y-2 mb-4">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Detailed project review and feedback</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Personalized action plan</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Follow-up resources and materials</span>
                      </li>
                    </ul>
                    <Button className="w-full">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Deep Dive
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="recent">
                <TabsList className="mb-4">
                  <TabsTrigger value="recent">Most Recent</TabsTrigger>
                  <TabsTrigger value="highest">Highest Rated</TabsTrigger>
                </TabsList>

                <TabsContent value="recent" className="space-y-4">
                  {mentor.reviews.map((review) => (
                    <div key={review.id} className="pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{review.name}</h3>
                          <p className="text-sm text-muted-foreground">{review.date}</p>
                        </div>
                        <div className="flex items-center">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                              />
                            ))}
                        </div>
                      </div>
                      <p className="mt-2 text-sm">{review.comment}</p>
                      {review.id !== mentor.reviews[mentor.reviews.length - 1].id && <Separator className="mt-4" />}
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="highest" className="space-y-4">
                  {[...mentor.reviews]
                    .sort((a, b) => b.rating - a.rating)
                    .map((review) => (
                      <div key={review.id} className="pb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{review.name}</h3>
                            <p className="text-sm text-muted-foreground">{review.date}</p>
                          </div>
                          <div className="flex items-center">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                                />
                              ))}
                          </div>
                        </div>
                        <p className="mt-2 text-sm">{review.comment}</p>
                        {review.id !== mentor.reviews[mentor.reviews.length - 1].id && <Separator className="mt-4" />}
                      </div>
                    ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
