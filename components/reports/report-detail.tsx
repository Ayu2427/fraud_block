import Link from "next/link"
import {
  ArrowLeft,
  Globe,
  Mail,
  Phone,
  Wallet,
  CheckCircle2,
  Clock,
  Search,
  MapPin,
  ShieldAlert,
  FileText,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  Flag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { RiskScoreRing, RiskBadge } from "@/components/risk-indicator"
import { ReportCard } from "@/components/report-card"
import {
  reports,
  type IdentifierType,
  type ScamReport,
  type ReportStatus,
} from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const identifierIcon: Record<IdentifierType, typeof Globe> = {
  website: Globe,
  email: Mail,
  phone: Phone,
  wallet: Wallet,
}

const identifierLabel: Record<IdentifierType, string> = {
  website: "Website",
  email: "Email address",
  phone: "Phone number",
  wallet: "Crypto wallet",
}

const statusConfig: Record<
  ReportStatus,
  { label: string; icon: typeof CheckCircle2; className: string }
> = {
  verified: { label: "Community verified", icon: CheckCircle2, className: "text-risk-low" },
  investigating: { label: "Investigating", icon: Search, className: "text-risk-medium" },
  pending: { label: "Pending review", icon: Clock, className: "text-muted-foreground" },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function ReportDetail({ report }: { report: ScamReport }) {
  const status = statusConfig[report.status]
  const StatusIcon = status.icon
  const related = reports
    .filter((r) => r.id !== report.id && r.category === report.category)
    .slice(0, 3)

  const confirmTotal = report.confirmations + report.disputes
  const confirmPct =
    confirmTotal === 0 ? 0 : Math.round((report.confirmations / confirmTotal) * 100)

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <Link
        href="/reports"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to all reports
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
              {report.category}
            </span>
            <span className="font-mono text-xs text-muted-foreground">{report.id}</span>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 text-xs font-medium",
                status.className,
              )}
            >
              <StatusIcon className="h-3.5 w-3.5" aria-hidden="true" />
              {status.label}
            </span>
          </div>

          <h1 className="mt-3 text-balance font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
            {report.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {report.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" />
              Reported {formatDate(report.reportedAt)}
            </span>
          </div>

          <div className="mt-6 rounded-xl border border-border bg-card p-5">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              What happened
            </h2>
            <p className="mt-2 leading-relaxed text-foreground">{report.description}</p>

            {report.amountLost != null && (
              <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-risk-high/30 bg-risk-high/10 px-3 py-2 text-sm font-medium text-risk-high">
                <ShieldAlert className="h-4 w-4" aria-hidden="true" />
                Reported loss: {report.currency} {report.amountLost.toLocaleString()}
              </div>
            )}
          </div>

          <div className="mt-6 rounded-xl border border-border bg-card p-5">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Suspicious identifiers
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {report.identifiers.map((id) => {
                const Icon = identifierIcon[id.type]
                return (
                  <div
                    key={id.type + id.value}
                    className="flex items-center gap-3 rounded-lg border border-border bg-background p-3"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">
                        {identifierLabel[id.type]}
                      </p>
                      <p className="truncate font-mono text-sm text-foreground">
                        {id.value}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" aria-hidden="true" />
              <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Evidence
              </h2>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {Array.from({ length: report.evidenceCount }).map((_, i) => (
                <div
                  key={i}
                  className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-border bg-background text-muted-foreground"
                >
                  <FileText className="h-5 w-5" aria-hidden="true" />
                  <span className="text-[10px] font-medium">Exhibit {i + 1}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {report.evidenceCount} files submitted (screenshots, receipts, transcripts).
              Evidence is verified before public display.
            </p>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              AI risk assessment
            </div>
            <div className="mt-4 flex flex-col items-center text-center">
              <RiskScoreRing score={report.riskScore} level={report.riskLevel} size={128} />
              <div className="mt-3">
                <RiskBadge level={report.riskLevel} />
              </div>
            </div>
            <ul className="mt-4 space-y-2">
              {report.aiSignals.map((signal) => (
                <li key={signal} className="flex items-start gap-2 text-sm text-foreground">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                  {signal}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Community verification
            </h2>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold text-foreground">
                {confirmPct}%
              </span>
              <span className="text-sm text-muted-foreground">confirm this is a scam</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-risk-low"
                style={{ width: `${confirmPct}%` }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>{report.confirmations} confirmed</span>
              <span>{report.disputes} disputed</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">
                <ThumbsUp className="h-4 w-4" aria-hidden="true" />
                Confirm
              </Button>
              <Button variant="outline" size="sm">
                <ThumbsDown className="h-4 w-4" aria-hidden="true" />
                Dispute
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="mt-2 w-full text-muted-foreground">
              <Flag className="h-4 w-4" aria-hidden="true" />
              Report an issue
            </Button>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Reported by
            </h2>
            <div className="mt-3 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-semibold text-primary">
                {report.reporter.initials}
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">{report.reporter.name}</p>
                <p className="text-xs text-muted-foreground">
                  Reputation {report.reporter.reputation}/100
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="font-display text-xl font-semibold tracking-tight">
            Related {report.category} reports
          </h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {related.map((r) => (
              <ReportCard key={r.id} report={r} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
