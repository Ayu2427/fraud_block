import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CtaBanner() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-surface px-6 py-14 text-center text-surface-foreground sm:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--surface-foreground) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Seen something suspicious? Warn the community.
          </h2>
          <p className="mt-4 text-pretty text-surface-muted">
            Your report takes two minutes and could save someone their savings. Every
            submission makes FraudBlock smarter for everyone.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button render={<Link href="/report" />} nativeButton={false} size="lg">
              Report a scam
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              render={<Link href="/lookup" />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="border-white/20 bg-transparent text-surface-foreground hover:bg-white/10 hover:text-surface-foreground"
            >
              Check an identifier
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
