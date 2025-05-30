import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { EventsProvider } from "@/contexts/events-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Next.js E-Commerce Dashboard",
}

// async function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const session = await getServerSession(authOptions)

//   if (!session?.user) {
//     redirect("/login")
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.menu}>
//         <Sidebar />
//       </div>
//       <div className={styles.content}>{children}</div>
//     </div>
//   )
// }

// export default DashboardLayout

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <EventsProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </EventsProvider>
  )
}
