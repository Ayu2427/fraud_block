import Link from "next/link"
import { scamCategories } from "@/lib/mock-data"

export function Categories() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Scam categories
          </p>
          <h2 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Coverage across every major fraud type
          </h2>
        </div>
        <Link
          href="/reports"
          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Browse all reports →
        </Link>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {scamCategories.map((cat) => (
          <Link
            key={cat.name}
            href={`/reports?category=${encodeURIComponent(cat.name)}`}
            className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
          >
            <h3 className="font-display font-semibold text-foreground group-hover:text-primary">
              {cat.name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{cat.blurb}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
