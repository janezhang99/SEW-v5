"use client"

import { useView } from "@/components/view-toggle"
import PublicConnectPage from "@/components/connect/public-connect"
import AuthenticatedConnectPage from "@/components/connect/authenticated-connect"

export default function ConnectPage() {
  const { viewMode } = useView()

  if (viewMode === "public") {
    return <PublicConnectPage />
  }

  return <AuthenticatedConnectPage />
}
