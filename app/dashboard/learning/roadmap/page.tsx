import { redirect } from "next/navigation"

export default function RoadmapPage() {
  redirect("/dashboard/learning?view=roadmap")
}
