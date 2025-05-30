"use client"

import { useState } from "react"
import { useEvents } from "@/contexts/events-context"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, MapPin, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { formatCurrency } from "@/lib/format-currency"

export default function InitiativesPage() {
  const { getInitiatives, loading } = useEvents()
  const [view, setView] = useState<"grid" | "list">("grid")
  const [filter, setFilter] = useState<string>("all")

  const initiatives = getInitiatives()

  const filteredInitiatives =
    filter === "all"
      ? initiatives
      : initiatives.filter((initiative) => initiative.funding?.fundingCategory.toLowerCase() === filter.toLowerCase())

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Initiatives</h1>
          <p className="text-muted-foreground">
            Discover and support youth-led projects funded through Small Economy Works
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard/initiatives/new">
            <Button>Create Initiative</Button>
          </Link>
          <div className="flex items-center border rounded-md">
            <Button
              variant={view === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("grid")}
              className="rounded-r-none"
            >
              Grid
            </Button>
            <Button
              variant={view === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("list")}
              className="rounded-l-none"
            >
              List
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="all" onClick={() => setFilter("all")}>
            All
          </TabsTrigger>
          <TabsTrigger value="environmental" onClick={() => setFilter("environmental")}>
            Environmental
          </TabsTrigger>
          <TabsTrigger value="education" onClick={() => setFilter("education")}>
            Education
          </TabsTrigger>
          <TabsTrigger value="cultural" onClick={() => setFilter("cultural")}>
            Cultural
          </TabsTrigger>
          <TabsTrigger value="entrepreneurship" onClick={() => setFilter("entrepreneurship")}>
            Entrepreneurship
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          {view === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInitiatives.map((initiative) => (
                <InitiativeCard key={initiative.id} initiative={initiative} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredInitiatives.map((initiative) => (
                <InitiativeListItem key={initiative.id} initiative={initiative} />
              ))}
            </div>
          )}
        </TabsContent>

        {["environmental", "education", "cultural", "entrepreneurship"].map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            {view === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInitiatives.map((initiative) => (
                  <InitiativeCard key={initiative.id} initiative={initiative} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredInitiatives.map((initiative) => (
                  <InitiativeListItem key={initiative.id} initiative={initiative} />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {filteredInitiatives.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No initiatives found</h3>
          <p className="text-muted-foreground mb-6">There are no initiatives in this category yet.</p>
          <Link href="/dashboard/initiatives/new">
            <Button>Create an Initiative</Button>
          </Link>
        </div>
      )}
    </div>
  )
}

interface InitiativeCardProps {
  initiative: ReturnType<ReturnType<typeof useEvents>["getEvent"]>
}

function InitiativeCard({ initiative }: InitiativeCardProps) {
  if (!initiative) return null

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48">
        {initiative.image ? (
          <Image src={initiative.image || "/placeholder.svg"} alt={initiative.title} fill className="object-cover" />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
            {initiative.funding?.fundingCategory}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-1 line-clamp-1">{initiative.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{initiative.description}</p>
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{new Date(initiative.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{initiative.location}</span>
          </div>
        </div>

        {initiative.funding && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1 text-sm">
              <span>Funding Progress</span>
              <span className="font-medium">
                {formatCurrency(initiative.funding.totalFunded)} / {formatCurrency(initiative.funding.fundingGoal || 0)}
              </span>
            </div>
            <Progress value={initiative.progress} className="h-2" />
          </div>
        )}

        <div className="flex flex-wrap gap-1 mb-4">
          {initiative.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {initiative.organizer.avatar ? (
              <Image
                src={initiative.organizer.avatar || "/placeholder.svg"}
                alt={initiative.organizer.name}
                width={24}
                height={24}
                className="rounded-full mr-2"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-muted mr-2" />
            )}
            <span className="text-sm">{initiative.organizer.name}</span>
          </div>
          <Link href={`/dashboard/initiatives/${initiative.id}`}>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

function InitiativeListItem({ initiative }: InitiativeCardProps) {
  if (!initiative) return null

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-48 h-48 md:h-auto">
          {initiative.image ? (
            <Image src={initiative.image || "/placeholder.svg"} alt={initiative.title} fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">No image</span>
            </div>
          )}
        </div>
        <div className="p-4 flex-1">
          <div className="flex flex-col md:flex-row justify-between mb-2">
            <div>
              <h3 className="text-lg font-bold mb-1">{initiative.title}</h3>
              <div className="flex items-center text-sm text-muted-foreground mb-1">
                <Calendar className="h-4 w-4 mr-1" />
                <span className="mr-4">{new Date(initiative.date).toLocaleDateString()}</span>
                <MapPin className="h-4 w-4 mr-1" />
                <span>{initiative.location}</span>
              </div>
            </div>
            <Badge variant="secondary" className="self-start md:self-auto mt-2 md:mt-0">
              {initiative.funding?.fundingCategory}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{initiative.description}</p>

          {initiative.funding && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1 text-sm">
                <span>Funding Progress</span>
                <span className="font-medium">
                  {formatCurrency(initiative.funding.totalFunded)} /{" "}
                  {formatCurrency(initiative.funding.fundingGoal || 0)}
                </span>
              </div>
              <Progress value={initiative.progress} className="h-2" />
            </div>
          )}

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {initiative.organizer.avatar ? (
                  <Image
                    src={initiative.organizer.avatar || "/placeholder.svg"}
                    alt={initiative.organizer.name}
                    width={24}
                    height={24}
                    className="rounded-full mr-2"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-muted mr-2" />
                )}
                <span className="text-sm">{initiative.organizer.name}</span>
              </div>

              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="h-4 w-4 mr-1" />
                <span>{initiative.attendees.length} supporters</span>
              </div>
            </div>

            <Link href={`/dashboard/initiatives/${initiative.id}`}>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  )
}
