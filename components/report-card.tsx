import Link from "next/link"
import {
  Globe,
  Mail,
  Phone,
  Wallet,
  CheckCircle2,
  Clock,
  Search,
  MapPin,
} from "lucide-react"
import { RiskBadge } from "@/components/risk-indicator"
import type { IdentifierType, ScamReport, ReportStatus } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const identifierIcon: Record<IdentifierType, typeof Globe> = {
  website: Globe,
  email: Mail,
  phone: Phone,
  wallet: Wallet,
}

const statusConfig: Record<
  ReportStatus,
  { label: string; icon: typeof CheckCircle2; className: string }
> = {
  verified: {
    label: "Community verified",
    icon: CheckCircle2,
    className: "text-risk-low",
  },
  investigating: { label: "Investigating", icon: Search, className: "text-risk-medium" },
  pending: { label: "Pending review", icon: Clock, className: "text-muted-foreground" },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function ReportCard({ report }: { report: ScamReport }) {
  const status = statusConfig[report.status]
  const StatusIcon = status.icon

  return (
    <Link
      href={`/reports/${report.id}`}
      className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
            {report.category}
          </span>
          <span className="font-mono text-xs text-muted-foreground">{report.id}</span>
        </div>
        <RiskBadge level={report.riskLevel} />
      </div>

      <h3 className="mt-3 text-pretty font-display text-base font-semibold leading-snug text-foreground group-hover:text-primary">
        {report.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {report.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {report.identifiers.map((id) => {
          const Icon = identifierIcon[id.type]
          return (
            <span
              key={id.type + id.value}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 font-mono text-xs text-foreground"
            >
              <Icon className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
              {id.value}
            </span>
          )
        })}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
        <span className={cn("inline-flex items-center gap-1.5 font-medium", status.className)}>
          <StatusIcon className="h-3.5 w-3.5" aria-hidden="true" />
          {status.label}
        </span>
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="max-w-[120px] truncate">{report.location}</span>
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>{report.confirmations} confirmations</span>
        <span>{formatDate(report.reportedAt)}</span>
      </div>
    </Link>
  )
}
