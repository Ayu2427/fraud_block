import { FileText, BrainCircuit, Users, ShieldCheck } from "lucide-react"

const steps = [
  {
    icon: FileText,
    title: "Report",
    text: "Submit a scam with the category, description, suspicious identifiers, and evidence like screenshots or receipts.",
  },
  {
    icon: BrainCircuit,
    title: "AI analyzes",
    text: "Our NLP engine reads the report, matches it to known patterns, and assigns a 0–100 risk score in seconds.",
  },
  {
    icon: Users,
    title: "Community verifies",
    text: "Members confirm or dispute reports. Verified reports build reputation scores for each identifier.",
  },
  {
    icon: ShieldCheck,
    title: "Everyone checks",
    text: "Anyone can search a number, email, site, or wallet and see its risk before sending money or data.",
  },
]

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          How it works
        </p>
        <h2 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
          From report to protection in four steps
        </h2>
        <p className="mt-3 text-pretty text-muted-foreground">
          FraudBlock combines artificial intelligence with community participation to turn
          scattered scam experiences into shared, verifiable protection.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <div
            key={step.title}
            className="relative rounded-xl border border-border bg-card p-6"
          >
            <span className="absolute right-5 top-5 font-display text-4xl font-bold text-secondary">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <step.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {step.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
