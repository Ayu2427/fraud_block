import { categoryStats } from "@/lib/mock-data"

export function CategoryChart() {
  const max = Math.max(...categoryStats.map((c) => c.count))

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="font-display text-base font-semibold">Top scam categories</h3>
      <p className="text-sm text-muted-foreground">Reports by category this quarter</p>

      <div className="mt-5 flex flex-col gap-4">
        {categoryStats.map((c) => (
          <div key={c.category}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">{c.category}</span>
              <span className="font-mono text-xs text-muted-foreground">
                {c.count.toLocaleString()}
              </span>
            </div>
            <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${(c.count / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
