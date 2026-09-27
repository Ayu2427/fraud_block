import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LookupTool } from "@/components/lookup/lookup-tool"

export const metadata: Metadata = {
  title: "Check an identifier",
  description:
    "Look up the fraud reputation of a phone number, email, website, or crypto wallet before you engage.",
}

export default function LookupPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border bg-surface">
          <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
            <p className="text-sm font-medium text-primary">Reputation lookup</p>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-balance text-surface-foreground sm:text-4xl">
              Check before you trust
            </h1>
            <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-surface-muted">
              Search any suspicious identifier against our community database and
              AI risk model. Know the reputation of a contact before you send
              money, click a link, or connect a wallet.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
          <LookupTool />
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
