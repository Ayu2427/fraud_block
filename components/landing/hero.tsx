"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Search, ShieldAlert, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RiskScoreRing } from "@/components/risk-indicator"

export function Hero() {
  const router = useRouter()
  const [query, setQuery] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    router.push(q ? `/lookup?q=${encodeURIComponent(q)}` : "/lookup")
  }

  return (
    <section className="relative overflow-hidden bg-surface text-surface-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--surface-foreground) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-surface-muted">
            <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            AI risk scoring on every report
          </span>

          <h1 className="mt-5 text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Stop scams before they{" "}
            <span className="text-primary">cost you.</span>
          </h1>

          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-surface-muted sm:text-lg">
            FraudBlock lets you report online scams, verify suspicious phone numbers,
            emails, websites, and crypto wallets, and get an instant AI risk score backed
            by a community of thousands.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex max-w-lg flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Check a number, email, website, or wallet"
                aria-label="Check an identifier for fraud reports"
                className="h-12 w-full rounded-lg border border-white/15 bg-white/95 pl-10 pr-3 text-sm text-slate-900 outline-none ring-primary/40 placeholder:text-slate-500 focus:ring-2"
              />
            </div>
            <Button type="submit" size="lg" className="h-12 shrink-0">
              Check now
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </form>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-surface-muted">
            <Link
              href="/report"
              className="inline-flex items-center gap-1.5 font-medium text-surface-foreground underline-offset-4 hover:underline"
            >
              <ShieldAlert className="h-4 w-4 text-primary" aria-hidden="true" />
              Report a scam you experienced
            </Link>
            <span className="hidden sm:inline">Free · No account needed to search</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between">
              <span className="rounded-md bg-white/10 px-2 py-1 text-xs font-medium text-surface-foreground">
                Crypto
              </span>
              <span className="font-mono text-xs text-surface-muted">FB-2841</span>
            </div>
            <div className="mt-5 flex items-center gap-5">
              <RiskScoreRing score={94} level="critical" />
              <div>
                <p className="text-xs uppercase tracking-wide text-surface-muted">
                  AI Verdict
                </p>
                <p className="mt-1 font-display text-lg font-semibold leading-tight text-surface-foreground">
                  Wallet drainer detected
                </p>
              </div>
            </div>
            <div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm">
              {[
                "Domain registered 6 days ago",
                "Impersonates a known brand",
                "Matches 38 similar reports",
              ].map((signal) => (
                <div key={signal} className="flex items-center gap-2 text-surface-muted">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-risk-critical"
                    aria-hidden="true"
                  />
                  {signal}
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-surface-muted">
              <span>47 community confirmations</span>
              <span className="font-medium text-risk-critical">Blocked</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
