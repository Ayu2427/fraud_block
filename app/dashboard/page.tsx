import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DashboardView } from "@/components/dashboard/dashboard-view"

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Monitor scam trends, moderate community reports, and track the impact of FraudBlock.",
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1 bg-surface">
        <DashboardView />
      </main>
      <SiteFooter />
    </div>
  )
}
