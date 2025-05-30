import type { Metadata } from "next"
import ServiceProviderPageClient from "./ServiceProviderPageClient"

export const metadata: Metadata = {
  title: "Service Provider Profile | Small Economy Works",
  description: "View service provider profile and request services.",
}

export default function ServiceProviderPage({ params }: { params: { providerId: string } }) {
  return <ServiceProviderPageClient params={params} />
}
