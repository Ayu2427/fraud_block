import { platformStats } from "@/lib/mock-data"

function formatCompact(n: number) {
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n)
}

const items = [
  { label: "Scam reports submitted", value: formatCompact(platformStats.totalReports) },
  { label: "Community verified", value: formatCompact(platformStats.verifiedReports) },
  { label: "Identifiers flagged", value: formatCompact(platformStats.identifiersBlocked) },
  {
    label: "Estimated losses prevented",
    value: "$" + formatCompact(platformStats.amountProtected),
  },
]

export function Stats() {
  return (
    <section className="border-b border-border bg-card">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden px-4 sm:px-6 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="px-2 py-8 text-center sm:px-6">
            <p className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {item.value}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
