import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MentorshipLoading() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-5 w-full max-w-[600px]" />
      </div>

      <Tabs defaultValue="find-mentors" className="space-y-4">
        <TabsList>
          <TabsTrigger value="find-mentors">Find Mentors</TabsTrigger>
          <TabsTrigger value="my-sessions">My Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="find-mentors" className="space-y-6">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-[80px]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <Skeleton className="h-48 w-full" />
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-[180px]" />
                      <Skeleton className="h-4 w-[150px]" />
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Skeleton className="h-5 w-[80px]" />
                        <Skeleton className="h-5 w-[100px]" />
                        <Skeleton className="h-5 w-[90px]" />
                      </div>
                      <Skeleton className="h-4 w-full mt-4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-[200px] mt-2" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between p-6 pt-0">
                    <Skeleton className="h-9 w-[100px]" />
                    <Skeleton className="h-9 w-[120px]" />
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
