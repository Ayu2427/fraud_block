import Link from "next/link"
import { ReportCard } from "@/components/report-card"
import { reports } from "@/lib/mock-data"

export function RecentReports() {
  const featured = reports.slice(0, 3)
  return (
    <section className="bg-card">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Recently flagged
            </p>
            <h2 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Fresh threats from the community
            </h2>
          </div>
          <Link
            href="/reports"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            See all reports →
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </div>
    </section>
  )
}
