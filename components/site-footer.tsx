import Link from "next/link"
import { Logo } from "@/components/logo"

const columns = [
  {
    title: "Platform",
    links: [
      { href: "/reports", label: "Browse reports" },
      { href: "/lookup", label: "Check an identifier" },
      { href: "/report", label: "Report a scam" },
      { href: "/dashboard", label: "Dashboard" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/reports", label: "Scam categories" },
      { href: "/lookup", label: "Reputation lookup" },
      { href: "/", label: "How it works" },
      { href: "/", label: "Safety guide" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/", label: "About" },
      { href: "/", label: "Privacy" },
      { href: "/", label: "Terms" },
      { href: "/", label: "Contact" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              A community-driven, AI-powered platform to report, verify, and check
              online scams before they cost you.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-foreground">{col.title}</h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} FraudBlock. Built for a safer internet.</p>
          <p>Reports are community-submitted. Always verify independently.</p>
        </div>
      </div>
    </footer>
  )
}
