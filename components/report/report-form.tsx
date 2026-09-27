"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import {
  Plus,
  Trash2,
  UploadCloud,
  FileText,
  X,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Info,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { RiskScoreRing } from "@/components/risk-indicator"
import { estimateRisk } from "@/lib/ai-risk"
import { scamCategories, type IdentifierType, type ScamCategory } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const inputClass =
  "h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"

const identifierTypes: { value: IdentifierType; label: string; placeholder: string }[] = [
  { value: "phone", label: "Phone number", placeholder: "+1 (555) 000-0000" },
  { value: "email", label: "Email address", placeholder: "name@example.com" },
  { value: "website", label: "Website / URL", placeholder: "suspicious-site.com" },
  { value: "wallet", label: "Crypto wallet", placeholder: "0x… or wallet address" },
]

interface IdentifierRow {
  id: number
  type: IdentifierType
  value: string
}

let rowSeq = 2

function FieldLabel({
  children,
  hint,
  required,
}: {
  children: React.ReactNode
  hint?: string
  required?: boolean
}) {
  return (
    <div className="mb-1.5 flex items-baseline justify-between gap-2">
      <label className="text-sm font-medium text-foreground">
        {children}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </label>
      {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
    </div>
  )
}

export function ReportForm() {
  const [category, setCategory] = useState<ScamCategory | "">("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [identifiers, setIdentifiers] = useState<IdentifierRow[]>([
    { id: 1, type: "website", value: "" },
  ])
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState("USD")
  const [location, setLocation] = useState("")
  const [files, setFiles] = useState<string[]>([])
  const [consent, setConsent] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const risk = useMemo(() => estimateRisk(`${title} ${description}`), [title, description])
  const reportId = useMemo(
    () => "FB-" + Math.floor(2900 + Math.random() * 900),
    [],
  )

  function addIdentifier() {
    setIdentifiers((rows) => [...rows, { id: rowSeq++, type: "phone", value: "" }])
  }
  function removeIdentifier(id: number) {
    setIdentifiers((rows) => (rows.length > 1 ? rows.filter((r) => r.id !== id) : rows))
  }
  function updateIdentifier(id: number, patch: Partial<IdentifierRow>) {
    setIdentifiers((rows) => rows.map((r) => (r.id === id ? { ...r, ...patch } : r)))
  }

  function onFilePick(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files ?? []).map((f) => f.name)
    setFiles((prev) => [...prev, ...picked].slice(0, 6))
    e.target.value = ""
  }

  const canSubmit = category !== "" && title.trim().length > 4 && description.trim().length > 20 && consent

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-8 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-risk-low/10 text-risk-low">
          <ShieldCheck className="h-7 w-7" aria-hidden="true" />
        </span>
        <h2 className="mt-4 font-display text-2xl font-bold">Report submitted</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Thank you for helping protect the community. Your report{" "}
          <span className="font-mono text-foreground">{reportId}</span> is now queued for
          community verification.
        </p>

        <div className="mt-6 flex items-center justify-center gap-5 rounded-xl border border-border bg-background p-5">
          <RiskScoreRing score={risk.score || 12} level={risk.score ? risk.level : "low"} />
          <div className="text-left">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Initial AI risk score
            </p>
            <p className="mt-1 font-display text-lg font-semibold">
              {risk.score >= 65
                ? "High-risk pattern detected"
                : risk.score >= 40
                  ? "Suspicious activity"
                  : "Logged for review"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Score updates as members verify your report.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button render={<Link href="/reports" />} nativeButton={false}>
            Browse reports
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setSubmitted(false)
              setCategory("")
              setTitle("")
              setDescription("")
              setIdentifiers([{ id: 1, type: "website", value: "" }])
              setAmount("")
              setLocation("")
              setFiles([])
              setConsent(false)
            }}
          >
            Submit another report
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
      <div className="space-y-8">
        {/* Category */}
        <fieldset>
          <FieldLabel required hint="Pick the closest match">
            Scam category
          </FieldLabel>
          <div className="flex flex-wrap gap-2">
            {scamCategories.map((cat) => {
              const active = category === cat.name
              return (
                <button
                  type="button"
                  key={cat.name}
                  onClick={() => setCategory(cat.name)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
                  )}
                  aria-pressed={active}
                >
                  {cat.name}
                </button>
              )
            })}
          </div>
        </fieldset>

        {/* Title */}
        <div>
          <FieldLabel required>Report title</FieldLabel>
          <input
            className={inputClass}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Fake crypto exchange draining wallets after 'verification'"
            maxLength={120}
          />
        </div>

        {/* Description */}
        <div>
          <FieldLabel required hint={`${description.length}/1200`}>
            What happened?
          </FieldLabel>
          <textarea
            className={cn(inputClass, "h-40 resize-none py-3 leading-relaxed")}
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, 1200))}
            placeholder="Describe how the scam worked, what was promised, how contact was made, and how money or data was requested. The more detail, the better the AI can score it."
          />
        </div>

        {/* Identifiers */}
        <div>
          <FieldLabel hint="Numbers, emails, sites, or wallets involved">
            Suspicious identifiers
          </FieldLabel>
          <div className="space-y-3">
            {identifiers.map((row) => {
              const meta = identifierTypes.find((t) => t.value === row.type)!
              return (
                <div key={row.id} className="flex gap-2">
                  <select
                    className={cn(inputClass, "w-40 shrink-0")}
                    value={row.type}
                    onChange={(e) =>
                      updateIdentifier(row.id, { type: e.target.value as IdentifierType })
                    }
                    aria-label="Identifier type"
                  >
                    {identifierTypes.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                  <input
                    className={cn(inputClass, "flex-1 font-mono")}
                    value={row.value}
                    onChange={(e) => updateIdentifier(row.id, { value: e.target.value })}
                    placeholder={meta.placeholder}
                  />
                  <button
                    type="button"
                    onClick={() => removeIdentifier(row.id)}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-input text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive disabled:opacity-40"
                    disabled={identifiers.length === 1}
                    aria-label="Remove identifier"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )
            })}
          </div>
          <button
            type="button"
            onClick={addIdentifier}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            <Plus className="h-4 w-4" />
            Add another identifier
          </button>
        </div>

        {/* Amount + location */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <FieldLabel hint="Optional">Amount lost</FieldLabel>
            <div className="flex gap-2">
              <select
                className={cn(inputClass, "w-24 shrink-0")}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                aria-label="Currency"
              >
                {["USD", "EUR", "GBP", "INR", "AUD"].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="0"
                className={cn(inputClass, "flex-1")}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>
          <div>
            <FieldLabel hint="Optional">Location / region</FieldLabel>
            <input
              className={inputClass}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. United States"
            />
          </div>
        </div>

        {/* Evidence */}
        <div>
          <FieldLabel hint="Screenshots, PDFs, receipts">Evidence</FieldLabel>
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-input bg-background px-4 py-8 text-center transition-colors hover:border-primary/40">
            <UploadCloud className="h-7 w-7 text-muted-foreground" aria-hidden="true" />
            <span className="mt-2 text-sm font-medium text-foreground">
              Click to upload evidence
            </span>
            <span className="mt-0.5 text-xs text-muted-foreground">
              PNG, JPG, or PDF up to 10MB each
            </span>
            <input
              type="file"
              multiple
              accept="image/*,application/pdf"
              className="hidden"
              onChange={onFilePick}
            />
          </label>
          {files.length > 0 && (
            <ul className="mt-3 space-y-2">
              {files.map((name, i) => (
                <li
                  key={name + i}
                  className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-sm"
                >
                  <span className="flex items-center gap-2 truncate">
                    <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="truncate">{name}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
                    className="text-muted-foreground hover:text-destructive"
                    aria-label={`Remove ${name}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Consent + submit */}
        <div className="space-y-4 border-t border-border pt-6">
          <label className="flex items-start gap-3 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-input accent-primary"
            />
            <span>
              I confirm this report is truthful and based on my own experience or research.
              I understand false reports may be removed.
            </span>
          </label>
          <Button type="submit" size="lg" className="h-12 w-full sm:w-auto" disabled={!canSubmit}>
            Submit report
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>

      {/* Live AI preview */}
      <aside className="lg:pl-2">
        <div className="sticky top-24 space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
              Live AI risk preview
            </div>
            <div className="mt-5 flex items-center gap-5">
              <RiskScoreRing
                score={risk.score}
                level={risk.level}
                size={104}
              />
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Estimated risk
                </p>
                <p className="mt-1 font-display text-lg font-semibold capitalize">
                  {risk.score === 0 ? "Awaiting details" : `${risk.level} risk`}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Updates as you type your description.
                </p>
              </div>
            </div>

            <div className="mt-5 border-t border-border pt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Signals detected
              </p>
              {risk.matched.length === 0 ? (
                <p className="mt-2 text-sm text-muted-foreground">
                  No scam signals detected yet. Add more detail about payments, urgency,
                  or impersonation.
                </p>
              ) : (
                <ul className="mt-2 space-y-2">
                  {risk.matched.map((m) => (
                    <li key={m} className="flex items-center gap-2 text-sm text-foreground">
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-risk-high"
                        aria-hidden="true"
                      />
                      {m}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="flex gap-3 rounded-xl border border-border bg-accent/40 p-4 text-sm text-accent-foreground">
            <Info className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <p>
              This preview is an on-page estimate. The full engine also compares your
              report against thousands of others after submission.
            </p>
          </div>
        </div>
      </aside>
    </form>
  )
}
