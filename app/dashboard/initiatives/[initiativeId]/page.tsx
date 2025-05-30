"use client"

import type React from "react"
import { useState } from "react"
import { useEvents } from "@/contexts/events-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, MapPin, Users, Share2, Heart, MessageSquare, CheckCircle, Award } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { formatCurrency } from "@/lib/format-currency"
import { useRouter } from "next/navigation"

export default function InitiativeDetailPage({ params }: { params: { initiativeId: string } }) {
  const { getEvent, addAttendee, addFeedback, loading } = useEvents()
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const initiative = getEvent(params.initiativeId)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!initiative) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Initiative not found</h1>
        <p className="mb-8">The initiative you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => router.push("/dashboard/initiatives")}>Back to Initiatives</Button>
      </div>
    )
  }

  const handleSupportClick = () => {
    // In a real app, this would open a modal to confirm support
    // and possibly collect additional information
    addAttendee(initiative.id, {
      name: "Current User", // In a real app, this would be the current user's name
      role: "Supporter",
    })
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return

    setIsSubmitting(true)

    // In a real app, this would be the current user's information
    addFeedback(initiative.id, {
      userId: "current-user",
      userName: "Current User",
      userAvatar: "/placeholder-ukgjx.png",
      comment,
      rating: 5,
    })

    setComment("")
    setIsSubmitting(false)
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Link
          href="/dashboard/initiatives"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to Initiatives
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative aspect-video w-full mb-6 rounded-lg overflow-hidden">
            {initiative.image ? (
              <Image
                src={initiative.image || "/placeholder.svg"}
                alt={initiative.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">No image</span>
              </div>
            )}
          </div>

          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">{initiative.funding?.fundingCategory}</Badge>
              {initiative.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl font-bold mb-2">{initiative.title}</h1>

            <div className="flex items-center mb-6">
              <div className="flex items-center mr-6">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage
                    src={initiative.organizer.avatar || "/placeholder.svg"}
                    alt={initiative.organizer.name}
                  />
                  <AvatarFallback>{initiative.organizer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{initiative.organizer.name}</span>
              </div>

              <div className="flex items-center text-muted-foreground mr-6">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{new Date(initiative.date).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{initiative.location}</span>
              </div>
            </div>

            <Tabs defaultValue="about" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="impact">Impact</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="supporters">Supporters</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-0">
                <div className="prose max-w-none">
                  <p className="text-base leading-relaxed mb-6">{initiative.description}</p>

                  {initiative.milestones && initiative.milestones.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-4">Project Milestones</h3>
                      <div className="space-y-4">
                        {initiative.milestones.map((milestone, index) => (
                          <div key={index} className="flex items-start">
                            <div
                              className={`mt-0.5 mr-3 ${milestone.completed ? "text-green-500" : "text-muted-foreground"}`}
                            >
                              <CheckCircle className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-medium">{milestone.title}</h4>
                              {milestone.date && (
                                <p className="text-sm text-muted-foreground">
                                  {milestone.completed ? "Completed on" : "Target date"}:{" "}
                                  {new Date(milestone.date).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="impact" className="mt-0">
                {initiative.impact ? (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Community Impact</h3>
                    <p className="mb-6">{initiative.impact.communityBenefit}</p>

                    <div className="mb-6">
                      <div className="flex items-center mb-2">
                        <Users className="h-5 w-5 mr-2 text-primary" />
                        <h4 className="font-medium">People Reached</h4>
                      </div>
                      <p className="text-2xl font-bold">{initiative.impact.peopleReached}+</p>
                    </div>

                    <div className="mb-8">
                      <h4 className="font-medium mb-3">Key Outcomes</h4>
                      <ul className="space-y-2">
                        {initiative.impact.outcomes.map((outcome, index) => (
                          <li key={index} className="flex items-start">
                            <Award className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {initiative.impact.testimonials && initiative.impact.testimonials.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-3">Testimonials</h4>
                        <div className="space-y-4">
                          {initiative.impact.testimonials.map((testimonial) => (
                            <Card key={testimonial.id}>
                              <CardContent className="p-4">
                                <div className="flex items-start">
                                  <Avatar className="h-8 w-8 mr-3">
                                    <AvatarImage
                                      src={testimonial.userAvatar || "/placeholder.svg"}
                                      alt={testimonial.userName}
                                    />
                                    <AvatarFallback>{testimonial.userName.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">{testimonial.userName}</p>
                                    <p className="text-sm text-muted-foreground mb-2">
                                      {new Date(testimonial.createdAt).toLocaleDateString()}
                                    </p>
                                    <p>{testimonial.comment}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No impact data available yet.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="gallery" className="mt-0">
                {initiative.gallery && initiative.gallery.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {initiative.gallery.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-md overflow-hidden">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${initiative.title} gallery image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No gallery images available.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="supporters" className="mt-0">
                {initiative.attendees && initiative.attendees.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {initiative.attendees.map((attendee) => (
                      <Card key={attendee.id}>
                        <CardContent className="p-4 flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={attendee.avatar || "/placeholder.svg"} alt={attendee.name} />
                            <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{attendee.name}</p>
                            {attendee.role && <p className="text-sm text-muted-foreground">{attendee.role}</p>}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      No supporters yet. Be the first to support this initiative!
                    </p>
                    <Button onClick={handleSupportClick}>Support This Initiative</Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Leave a Comment</h3>
            <form onSubmit={handleCommentSubmit}>
              <Textarea
                placeholder="Share your thoughts about this initiative..."
                className="mb-4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
              />
              <Button type="submit" disabled={!comment.trim() || isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Comment"}
              </Button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Funding Details</CardTitle>
            </CardHeader>
            <CardContent>
              {initiative.funding ? (
                <div>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1 text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{initiative.progress}%</span>
                    </div>
                    <Progress value={initiative.progress} className="h-2 mb-2" />
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{formatCurrency(initiative.funding.totalFunded)}</span>
                      <span className="text-muted-foreground">
                        of {formatCurrency(initiative.funding.fundingGoal || 0)}
                      </span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Source</span>
                      <span>{initiative.funding.fundingSource}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category</span>
                      <span>{initiative.funding.fundingCategory}</span>
                    </div>
                  </div>

                  <Button className="w-full" onClick={handleSupportClick}>
                    Support This Initiative
                  </Button>
                </div>
              ) : (
                <p className="text-muted-foreground">No funding information available.</p>
              )}
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Share</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Heart className="h-4 w-4" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <MessageSquare className="h-4 w-4" />
                  <span className="sr-only">Comment</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Initiatives</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* This would be populated with actual related initiatives in a real app */}
                <div className="flex items-start">
                  <div className="relative w-16 h-16 rounded overflow-hidden mr-3 flex-shrink-0">
                    <Image src="/youth-workshop.png" alt="Related initiative" fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-medium line-clamp-1">Youth Tech Workshop Series</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      A series of workshops teaching coding and digital skills to underserved youth.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="relative w-16 h-16 rounded overflow-hidden mr-3 flex-shrink-0">
                    <Image src="/abstract-ec.png" alt="Related initiative" fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-medium line-clamp-1">Indigenous Art Market</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      A marketplace for young Indigenous artists to showcase and sell their artwork.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
