import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ReportForm } from "@/components/report/report-form"

export const metadata: Metadata = {
  title: "Report a scam — FraudBlock",
  description:
    "Submit a scam report with details and evidence. Our AI scores the risk instantly and the community helps verify it.",
}

export default function ReportPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Community reporting
            </p>
            <h1 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Report a scam
            </h1>
            <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">
              Share what happened so others can avoid it. As you write, our AI estimates a
              risk score in real time. Your report is stored securely and sent for
              community verification.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <ReportForm />
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
