import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Leaf } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function DomainOfMonth() {
  return (
    <Card className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 border-emerald-200 dark:border-emerald-800">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3 space-y-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-emerald-600 hover:bg-emerald-700">Domain of the Month</Badge>
              <Badge variant="outline" className="border-emerald-200 dark:border-emerald-800">
                <Leaf className="mr-1 h-3 w-3" />
                Adaptation Options
              </Badge>
            </div>

            <div>
              <h2 className="text-2xl font-bold">Nature-based Solutions</h2>
              <p className="text-muted-foreground mt-2">
                Explore how natural systems can be leveraged to build resilience to climate impacts. This month, we're
                focusing on nature-based solutions for climate adaptation.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button asChild>
                <Link href="/domains/options/nature-based">Explore Domain</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/courses?domain=Adaptation%20Options">View Courses</Link>
              </Button>
            </div>
          </div>

          <div className="md:w-1/3 relative min-h-[160px]">
            <Image
              src="/nature-based-solutions.png"
              alt="Nature-based Solutions"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
