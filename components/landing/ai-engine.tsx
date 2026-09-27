import { CheckCircle2 } from "lucide-react"
import { RiskMeter } from "@/components/risk-indicator"

const capabilities = [
  "Natural-language analysis of report descriptions and messages",
  "Pattern matching against thousands of known scam templates",
  "Automatic grouping of similar reports into emerging threats",
  "Reputation scoring for phone numbers, emails, sites, and wallets",
]

const sampleSignals = [
  { label: "Urgency & pressure language", score: 88, level: "critical" as const },
  { label: "Brand impersonation", score: 76, level: "high" as const },
  { label: "Upfront payment request", score: 64, level: "medium" as const },
  { label: "Newly registered domain", score: 91, level: "critical" as const },
]

export function AiEngine() {
  return (
    <section className="bg-card">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            The AI risk engine
          </p>
          <h2 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
            A risk score you can actually trust
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Every report is analyzed by machine-learning models trained on real scam data.
            Instead of guessing, you get a clear 0–100 score and the exact signals behind
            it — so you know why something is risky.
          </p>

          <ul className="mt-6 space-y-3">
            {capabilities.map((cap) => (
              <li key={cap} className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span className="text-sm leading-relaxed text-foreground">{cap}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Detected signals
            </h3>
            <span className="rounded-full bg-risk-critical/10 px-2.5 py-1 text-xs font-semibold text-risk-critical">
              Overall 89 / 100
            </span>
          </div>
          <div className="mt-5 space-y-5">
            {sampleSignals.map((signal) => (
              <div key={signal.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{signal.label}</span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {signal.score}
                  </span>
                </div>
                <RiskMeter score={signal.score} level={signal.level} className="mt-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
