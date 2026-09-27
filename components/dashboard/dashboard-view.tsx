import {
  FileText,
  ShieldCheck,
  Ban,
  PiggyBank,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react"
import { TrendChart } from "@/components/dashboard/trend-chart"
import { CategoryChart } from "@/components/dashboard/category-chart"
import { RiskBadge } from "@/components/risk-indicator"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { platformStats, reports } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const stats = [
  {
    label: "Total reports",
    value: platformStats.totalReports.toLocaleString(),
    delta: "+12.4%",
    icon: FileText,
  },
  {
    label: "Verified reports",
    value: platformStats.verifiedReports.toLocaleString(),
    delta: "+8.1%",
    icon: ShieldCheck,
  },
  {
    label: "Identifiers blocked",
    value: platformStats.identifiersBlocked.toLocaleString(),
    delta: "+5.6%",
    icon: Ban,
  },
  {
    label: "Losses prevented",
    value: `$${(platformStats.amountProtected / 1_000_000).toFixed(1)}M`,
    delta: "+18.9%",
    icon: PiggyBank,
  },
]

const statusStyles: Record<string, string> = {
  verified: "text-risk-low",
  investigating: "text-risk-medium",
  pending: "text-muted-foreground",
}

export function DashboardView() {
  const queue = reports.slice(0, 6)

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Admin overview</p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">
            Platform dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Monitor scam trends, moderate reports, and track community impact.
          </p>
        </div>
        <Button render={<Link href="/report" />} nativeButton={false}>
          New report
        </Button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="inline-flex items-center gap-0.5 text-xs font-medium text-risk-low">
                  <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
                  {s.delta}
                </span>
              </div>
              <p className="mt-4 font-display text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          )
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <TrendChart />
        <CategoryChart />
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border p-5">
          <div>
            <h3 className="font-display text-base font-semibold">Moderation queue</h3>
            <p className="text-sm text-muted-foreground">
              Latest reports awaiting review and verification
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-3 font-medium">Report</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Risk</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Confirmations</th>
                <th className="px-5 py-3 font-medium text-right"></th>
              </tr>
            </thead>
            <tbody>
              {queue.map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-border last:border-0 transition-colors hover:bg-secondary/40"
                >
                  <td className="px-5 py-3">
                    <p className="max-w-[240px] truncate font-medium text-foreground">
                      {r.title}
                    </p>
                    <p className="font-mono text-xs text-muted-foreground">{r.id}</p>
                  </td>
                  <td className="px-5 py-3">
                    <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                      {r.category}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <RiskBadge level={r.riskLevel} />
                  </td>
                  <td className="px-5 py-3">
                    <span className={cn("text-xs font-medium capitalize", statusStyles[r.status])}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right font-mono text-xs text-muted-foreground">
                    {r.confirmations}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link
                      href={`/reports/${r.id}`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      Review
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
