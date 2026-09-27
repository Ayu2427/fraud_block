import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/landing/hero"
import { Stats } from "@/components/landing/stats"
import { HowItWorks } from "@/components/landing/how-it-works"
import { AiEngine } from "@/components/landing/ai-engine"
import { Categories } from "@/components/landing/categories"
import { RecentReports } from "@/components/landing/recent-reports"
import { CtaBanner } from "@/components/landing/cta"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Stats />
        <HowItWorks />
        <AiEngine />
        <Categories />
        <RecentReports />
        <CtaBanner />
      </main>
      <SiteFooter />
    </div>
  )
}
