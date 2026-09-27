import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ReportsBrowser } from "@/components/reports/reports-browser"

export const metadata: Metadata = {
  title: "Browse scam reports",
  description:
    "Search verified scam reports by category, risk level, or suspicious identifier before you engage online.",
}

export default function ReportsPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border bg-surface">
          <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
            <p className="text-sm font-medium text-primary">Community intelligence</p>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-balance text-surface-foreground sm:text-4xl">
              Browse the scam report feed
            </h1>
            <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-surface-muted">
              Every report is scored by our AI engine and cross-checked by the
              community. Search by keyword, filter by risk, or drill into a
              category to see emerging threats.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <ReportsBrowser />
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
