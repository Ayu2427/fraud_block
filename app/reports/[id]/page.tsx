import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ReportDetail } from "@/components/reports/report-detail"
import { getReportById, reports } from "@/lib/mock-data"

export function generateStaticParams() {
  return reports.map((r) => ({ id: r.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const report = getReportById(id)
  if (!report) return { title: "Report not found" }
  return {
    title: `${report.title} — ${report.id}`,
    description: report.description.slice(0, 155),
  }
}

export default async function ReportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const report = getReportById(id)
  if (!report) notFound()

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <ReportDetail report={report} />
      </main>
      <SiteFooter />
    </div>
  )
}
