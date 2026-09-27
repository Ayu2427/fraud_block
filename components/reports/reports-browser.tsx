"use client"

import { useMemo, useState } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { ReportCard } from "@/components/report-card"
import {
  reports,
  scamCategories,
  type RiskLevel,
  type ScamCategory,
} from "@/lib/mock-data"
import { cn } from "@/lib/utils"

type SortKey = "recent" | "risk" | "confirmations"

const riskFilters: { value: RiskLevel | "all"; label: string }[] = [
  { value: "all", label: "All risk" },
  { value: "critical", label: "Critical" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
]

const inputClass =
  "h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"

export function ReportsBrowser({
  initialCategory,
}: {
  initialCategory?: ScamCategory
}) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<ScamCategory | "all">(
    initialCategory ?? "all",
  )
  const [risk, setRisk] = useState<RiskLevel | "all">("all")
  const [sort, setSort] = useState<SortKey>("recent")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const result = reports.filter((r) => {
      if (category !== "all" && r.category !== category) return false
      if (risk !== "all" && r.riskLevel !== risk) return false
      if (q) {
        const haystack = [
          r.title,
          r.description,
          r.category,
          r.location,
          ...r.identifiers.map((i) => i.value),
        ]
          .join(" ")
          .toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })

    result.sort((a, b) => {
      if (sort === "risk") return b.riskScore - a.riskScore
      if (sort === "confirmations") return b.confirmations - a.confirmations
      return new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime()
    })
    return result
  }, [query, category, risk, sort])

  const hasFilters = query || category !== "all" || risk !== "all"

  return (
    <div>
      <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              className={cn(inputClass, "pl-10")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search titles, descriptions, or identifiers…"
              aria-label="Search reports"
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal
              className="h-4 w-4 shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
            <select
              className={cn(inputClass, "w-40")}
              value={risk}
              onChange={(e) => setRisk(e.target.value as RiskLevel | "all")}
              aria-label="Filter by risk level"
            >
              {riskFilters.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
            <select
              className={cn(inputClass, "w-44")}
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              aria-label="Sort reports"
            >
              <option value="recent">Most recent</option>
              <option value="risk">Highest risk</option>
              <option value="confirmations">Most confirmed</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              category === "all"
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
          >
            All categories
          </button>
          {scamCategories.map((cat) => (
            <button
              type="button"
              key={cat.name}
              onClick={() => setCategory(cat.name)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                category === cat.name
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "report" : "reports"}
          {hasFilters ? " matching your filters" : ""}
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              setQuery("")
              setCategory("all")
              setRisk("all")
            }}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            <X className="h-3.5 w-3.5" />
            Clear filters
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
          <p className="font-display text-lg font-semibold">No reports found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a different search term or clear your filters.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      )}
    </div>
  )
}
