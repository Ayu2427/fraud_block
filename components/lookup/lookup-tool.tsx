"use client"

import { useState } from "react"
import {
  Search,
  Globe,
  Mail,
  Phone,
  Wallet,
  ShieldCheck,
  ShieldAlert,
  CalendarClock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { RiskScoreRing, RiskBadge } from "@/components/risk-indicator"
import {
  knownIdentifiers,
  riskLevelFromScore,
  type IdentifierType,
  type LookupResult,
} from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const typeIcon: Record<IdentifierType, typeof Globe> = {
  website: Globe,
  email: Mail,
  phone: Phone,
  wallet: Wallet,
}

function detectType(value: string): IdentifierType {
  const v = value.trim()
  if (/^0x[a-fA-F0-9]/.test(v) || /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{10,}/.test(v) || /^(TRX|T)[a-zA-Z0-9]{10,}/.test(v))
    return "wallet"
  if (v.includes("@") && v.includes(".")) return "email"
  if (/^[+()\d][\d\s()-]{6,}$/.test(v)) return "phone"
  return "website"
}

function hashScore(value: string) {
  let h = 0
  for (let i = 0; i < value.length; i++) h = (h * 31 + value.charCodeAt(i)) >>> 0
  return h % 40 // 0-39: clean-ish for unknowns
}

const inputClass =
  "h-12 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"

const examples = [
  "binance-verify-secure.com",
  "+1 (415) 555-0187",
  "hr.talent@globalhire-jobs.co",
  "0x9F2a...c41B",
]

export function LookupTool() {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState<LookupResult | null>(null)
  const [searched, setSearched] = useState(false)

  function runLookup(value: string) {
    const v = value.trim()
    if (!v) return
    const match = knownIdentifiers.find(
      (k) => k.identifier.toLowerCase() === v.toLowerCase(),
    )
    if (match) {
      setResult(match)
    } else {
      const score = hashScore(v)
      setResult({
        identifier: v,
        type: detectType(v),
        riskScore: score,
        riskLevel: riskLevelFromScore(score),
        reportCount: 0,
        firstSeen: "—",
        lastSeen: "—",
        categories: [],
        verdict:
          "No reports found in our database. That doesn't guarantee safety — stay cautious and verify independently.",
      })
    }
    setSearched(true)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    runLookup(query)
  }

  const Icon = result ? typeIcon[result.type] : Search
  const isClean = result != null && result.reportCount === 0

  return (
    <div>
      <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-4 sm:p-6">
        <label htmlFor="lookup" className="text-sm font-medium text-foreground">
          Enter a phone number, email, website, or wallet address
        </label>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              id="lookup"
              className={cn(inputClass, "pl-10")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. secure-bank-support.net"
            />
          </div>
          <Button type="submit" size="lg" className="sm:w-auto">
            <Search className="h-4 w-4" aria-hidden="true" />
            Check reputation
          </Button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">Try:</span>
          {examples.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => {
                setQuery(ex)
                runLookup(ex)
              }}
              className="rounded-full border border-border bg-background px-2.5 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {ex}
            </button>
          ))}
        </div>
      </form>

      {searched && result && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
          <div
            className={cn(
              "flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between",
              isClean ? "bg-risk-low/5" : "bg-risk-high/5",
            )}
          >
            <div className="flex items-center gap-4">
              <span
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl",
                  isClean ? "bg-risk-low/15 text-risk-low" : "bg-risk-high/15 text-risk-high",
                )}
              >
                {isClean ? (
                  <ShieldCheck className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <ShieldAlert className="h-6 w-6" aria-hidden="true" />
                )}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <span className="truncate font-mono text-sm font-medium text-foreground">
                    {result.identifier}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground capitalize">
                  {result.type} · {result.reportCount} report
                  {result.reportCount === 1 ? "" : "s"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 sm:flex-col sm:items-end">
              <RiskScoreRing score={result.riskScore} level={result.riskLevel} size={88} strokeWidth={7} />
              <RiskBadge level={result.riskLevel} />
            </div>
          </div>

          <div className="border-t border-border p-6">
            <p className="text-pretty leading-relaxed text-foreground">{result.verdict}</p>

            {result.reportCount > 0 && (
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-border bg-background p-4">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Linked categories
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {result.categories.map((c) => (
                      <span
                        key={c}
                        className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border border-border bg-background p-4">
                  <p className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-muted-foreground">
                    <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
                    First seen
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground">{result.firstSeen}</p>
                </div>
                <div className="rounded-lg border border-border bg-background p-4">
                  <p className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-muted-foreground">
                    <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
                    Last reported
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground">{result.lastSeen}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
