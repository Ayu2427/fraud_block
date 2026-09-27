import { cn } from "@/lib/utils"
import type { RiskLevel } from "@/lib/mock-data"

const riskConfig: Record<
  RiskLevel,
  { label: string; text: string; bg: string; ring: string; dot: string }
> = {
  low: {
    label: "Low risk",
    text: "text-risk-low",
    bg: "bg-risk-low/10",
    ring: "text-risk-low",
    dot: "bg-risk-low",
  },
  medium: {
    label: "Medium risk",
    text: "text-risk-medium",
    bg: "bg-risk-medium/10",
    ring: "text-risk-medium",
    dot: "bg-risk-medium",
  },
  high: {
    label: "High risk",
    text: "text-risk-high",
    bg: "bg-risk-high/10",
    ring: "text-risk-high",
    dot: "bg-risk-high",
  },
  critical: {
    label: "Critical",
    text: "text-risk-critical",
    bg: "bg-risk-critical/10",
    ring: "text-risk-critical",
    dot: "bg-risk-critical",
  },
}

export function RiskBadge({
  level,
  className,
}: {
  level: RiskLevel
  className?: string
}) {
  const cfg = riskConfig[level]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        cfg.bg,
        cfg.text,
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", cfg.dot)} aria-hidden="true" />
      {cfg.label}
    </span>
  )
}

export function RiskScoreRing({
  score,
  level,
  size = 96,
  strokeWidth = 8,
}: {
  score: number
  level: RiskLevel
  size?: number
  strokeWidth?: number
}) {
  const cfg = riskConfig[level]
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`AI risk score ${score} out of 100, ${cfg.label}`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="text-border"
          stroke="currentColor"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cfg.ring}
          stroke="currentColor"
        />
      </svg>
      <span className="absolute flex flex-col items-center">
        <span className={cn("font-display text-2xl font-bold leading-none", cfg.text)}>
          {score}
        </span>
        <span className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
          / 100
        </span>
      </span>
    </div>
  )
}

export function RiskMeter({
  score,
  level,
  className,
}: {
  score: number
  level: RiskLevel
  className?: string
}) {
  const cfg = riskConfig[level]
  return (
    <div className={cn("w-full", className)}>
      <div className="h-2 w-full overflow-hidden rounded-full bg-border">
        <div
          className={cn("h-full rounded-full", cfg.dot)}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}
