export type RiskLevel = "low" | "medium" | "high" | "critical"

export type IdentifierType = "phone" | "email" | "website" | "wallet"

export type ScamCategory =
  | "Phishing"
  | "Investment"
  | "Crypto"
  | "Job Offer"
  | "E-commerce"
  | "Romance"
  | "Tech Support"
  | "Loan / Banking"
  | "Lottery / Prize"
  | "Social Media"

export type ReportStatus = "verified" | "investigating" | "pending"

export interface Identifier {
  type: IdentifierType
  value: string
}

export interface ScamReport {
  id: string
  title: string
  category: ScamCategory
  description: string
  riskScore: number
  riskLevel: RiskLevel
  status: ReportStatus
  identifiers: Identifier[]
  amountLost?: number
  currency?: string
  reportedAt: string
  location: string
  reporter: {
    name: string
    initials: string
    reputation: number
  }
  confirmations: number
  disputes: number
  aiSignals: string[]
  evidenceCount: number
}

export function riskLevelFromScore(score: number): RiskLevel {
  if (score >= 85) return "critical"
  if (score >= 65) return "high"
  if (score >= 40) return "medium"
  return "low"
}

export const scamCategories: { name: ScamCategory; blurb: string }[] = [
  { name: "Phishing", blurb: "Fake login pages & credential theft" },
  { name: "Investment", blurb: "Guaranteed-return & Ponzi schemes" },
  { name: "Crypto", blurb: "Wallet drainers & fake exchanges" },
  { name: "Job Offer", blurb: "Fake recruiters & upfront fees" },
  { name: "E-commerce", blurb: "Non-delivery & counterfeit stores" },
  { name: "Romance", blurb: "Long-con emotional manipulation" },
  { name: "Tech Support", blurb: "Fake helpdesk & remote access" },
  { name: "Loan / Banking", blurb: "Advance-fee & account takeover" },
  { name: "Lottery / Prize", blurb: "You-won-a-prize collection fees" },
  { name: "Social Media", blurb: "Impersonation & giveaway scams" },
]

export const reports: ScamReport[] = [
  {
    id: "FB-2841",
    title: "Fake crypto exchange draining wallets after 'verification'",
    category: "Crypto",
    description:
      "A site posing as a well-known exchange asks users to 'verify' their wallet by connecting it. Once connected, a malicious approval transaction drains all tokens. Multiple victims report losses within minutes of connecting.",
    riskScore: 94,
    riskLevel: "critical",
    status: "verified",
    identifiers: [
      { type: "website", value: "binance-verify-secure.com" },
      { type: "wallet", value: "0x9F2a...c41B" },
    ],
    amountLost: 18400,
    currency: "USD",
    reportedAt: "2026-07-16T09:12:00Z",
    location: "Reported from 12 countries",
    reporter: { name: "Amara Okafor", initials: "AO", reputation: 92 },
    confirmations: 47,
    disputes: 1,
    aiSignals: [
      "Domain registered 6 days ago",
      "Impersonates a known brand",
      "Requests wallet approval",
      "Language matches 38 similar reports",
    ],
    evidenceCount: 5,
  },
  {
    id: "FB-2836",
    title: "'HR recruiter' offering remote job asks for onboarding deposit",
    category: "Job Offer",
    description:
      "Victims receive a WhatsApp message about a high-paying remote data-entry role. After a fake interview, they're asked to pay a refundable 'equipment deposit' via UPI. The recruiter disappears after payment.",
    riskScore: 78,
    riskLevel: "high",
    status: "verified",
    identifiers: [
      { type: "phone", value: "+1 (415) 555-0187" },
      { type: "email", value: "hr.talent@globalhire-jobs.co" },
    ],
    amountLost: 320,
    currency: "USD",
    reportedAt: "2026-07-15T14:40:00Z",
    location: "India, Philippines, Nigeria",
    reporter: { name: "Devon Reyes", initials: "DR", reputation: 74 },
    confirmations: 29,
    disputes: 0,
    aiSignals: [
      "Upfront payment requested",
      "Job offer without interview",
      "Free email domain mismatch",
    ],
    evidenceCount: 3,
  },
  {
    id: "FB-2830",
    title: "Phishing email impersonating a bank's 'account locked' notice",
    category: "Phishing",
    description:
      "A convincing email claims the recipient's account is locked and links to a lookalike login page. The page harvests credentials and OTPs in real time. The sending domain spoofs the real bank.",
    riskScore: 71,
    riskLevel: "high",
    status: "investigating",
    identifiers: [
      { type: "email", value: "alerts@secure-bank-support.net" },
      { type: "website", value: "bank-account-unlock.net" },
    ],
    reportedAt: "2026-07-15T08:05:00Z",
    location: "United States, Canada",
    reporter: { name: "Priya Nair", initials: "PN", reputation: 88 },
    confirmations: 21,
    disputes: 2,
    aiSignals: [
      "Lookalike domain detected",
      "Urgency & fear language",
      "Credential capture form",
    ],
    evidenceCount: 4,
  },
  {
    id: "FB-2822",
    title: "Instagram 'investment mentor' promising 40% weekly returns",
    category: "Investment",
    description:
      "An account DMs users with screenshots of fake profits and asks for an initial deposit to a managed account. Small withdrawals are allowed early to build trust, then larger deposits vanish.",
    riskScore: 83,
    riskLevel: "high",
    status: "verified",
    identifiers: [
      { type: "email", value: "profits@fx-mentor-pro.com" },
      { type: "wallet", value: "TRX-Tz8h...9kLm" },
    ],
    amountLost: 5600,
    currency: "USD",
    reportedAt: "2026-07-14T18:22:00Z",
    location: "United Kingdom, UAE",
    reporter: { name: "Marcus Bauer", initials: "MB", reputation: 81 },
    confirmations: 34,
    disputes: 1,
    aiSignals: [
      "Guaranteed-return promise",
      "Fake profit screenshots",
      "Wallet linked to 11 reports",
    ],
    evidenceCount: 6,
  },
  {
    id: "FB-2815",
    title: "Marketplace seller taking payment then blocking buyers",
    category: "E-commerce",
    description:
      "A storefront lists popular electronics far below market price, insists on bank transfer, and blocks buyers after payment. No tracking number is ever provided.",
    riskScore: 58,
    riskLevel: "medium",
    status: "investigating",
    identifiers: [
      { type: "website", value: "megadeals-electronics.shop" },
      { type: "phone", value: "+44 20 7946 0102" },
    ],
    amountLost: 210,
    currency: "GBP",
    reportedAt: "2026-07-13T11:00:00Z",
    location: "United Kingdom",
    reporter: { name: "Lena Fischer", initials: "LF", reputation: 66 },
    confirmations: 12,
    disputes: 3,
    aiSignals: ["Prices below market", "Bank-transfer only", "New storefront"],
    evidenceCount: 2,
  },
  {
    id: "FB-2809",
    title: "Fake tech-support popup claiming virus infection",
    category: "Tech Support",
    description:
      "A full-screen browser popup with an alarm sound claims the device is infected and shows a 'Microsoft' number. Callers are pressured into installing remote-access software and paying a fee.",
    riskScore: 64,
    riskLevel: "medium",
    status: "verified",
    identifiers: [{ type: "phone", value: "+1 (888) 555-0143" }],
    reportedAt: "2026-07-12T16:48:00Z",
    location: "United States, Australia",
    reporter: { name: "Sofia Romano", initials: "SR", reputation: 79 },
    confirmations: 18,
    disputes: 0,
    aiSignals: ["Impersonates a known brand", "Remote-access request", "Scare tactics"],
    evidenceCount: 3,
  },
  {
    id: "FB-2801",
    title: "'You won a prize' SMS asking for a delivery fee",
    category: "Lottery / Prize",
    description:
      "An SMS claims the recipient won an electronics bundle and must pay a small delivery fee via a link. The link leads to a card-skimming checkout page.",
    riskScore: 46,
    riskLevel: "medium",
    status: "pending",
    identifiers: [
      { type: "phone", value: "+1 (312) 555-0166" },
      { type: "website", value: "prize-claim-center.info" },
    ],
    reportedAt: "2026-07-11T10:15:00Z",
    location: "United States",
    reporter: { name: "Noah Klein", initials: "NK", reputation: 58 },
    confirmations: 6,
    disputes: 1,
    aiSignals: ["Unexpected prize", "Small upfront fee", "Card capture page"],
    evidenceCount: 1,
  },
  {
    id: "FB-2794",
    title: "Romance profile moving conversation off-platform fast",
    category: "Romance",
    description:
      "A profile builds rapport quickly, professes strong feelings within days, then describes an emergency requiring money transfers. Photos are reverse-image matches to a stock model.",
    riskScore: 37,
    riskLevel: "low",
    status: "pending",
    identifiers: [{ type: "email", value: "james.wells.love@gmail.com" }],
    reportedAt: "2026-07-10T20:30:00Z",
    location: "Canada",
    reporter: { name: "Grace Miller", initials: "GM", reputation: 61 },
    confirmations: 4,
    disputes: 2,
    aiSignals: ["Rapid escalation", "Reverse-image photo match", "Emergency money request"],
    evidenceCount: 2,
  },
]

export interface TrendPoint {
  month: string
  reports: number
  verified: number
}

export const reportTrend: TrendPoint[] = [
  { month: "Feb", reports: 820, verified: 540 },
  { month: "Mar", reports: 960, verified: 690 },
  { month: "Apr", reports: 1180, verified: 870 },
  { month: "May", reports: 1420, verified: 1080 },
  { month: "Jun", reports: 1710, verified: 1320 },
  { month: "Jul", reports: 2040, verified: 1610 },
]

export interface CategoryStat {
  category: ScamCategory
  count: number
}

export const categoryStats: CategoryStat[] = [
  { category: "Phishing", count: 4820 },
  { category: "Crypto", count: 3910 },
  { category: "Investment", count: 3240 },
  { category: "Job Offer", count: 2680 },
  { category: "E-commerce", count: 2110 },
  { category: "Tech Support", count: 1640 },
]

export const platformStats = {
  totalReports: 48210,
  verifiedReports: 31940,
  identifiersBlocked: 12750,
  amountProtected: 9400000,
}

export interface LookupResult {
  identifier: string
  type: IdentifierType
  riskScore: number
  riskLevel: RiskLevel
  reportCount: number
  firstSeen: string
  lastSeen: string
  categories: ScamCategory[]
  verdict: string
}

export const knownIdentifiers: LookupResult[] = [
  {
    identifier: "binance-verify-secure.com",
    type: "website",
    riskScore: 96,
    riskLevel: "critical",
    reportCount: 47,
    firstSeen: "2026-07-10",
    lastSeen: "2026-07-17",
    categories: ["Crypto", "Phishing"],
    verdict: "Confirmed wallet-drainer. Do not connect any wallet.",
  },
  {
    identifier: "+1 (415) 555-0187",
    type: "phone",
    riskScore: 81,
    riskLevel: "high",
    reportCount: 29,
    firstSeen: "2026-06-28",
    lastSeen: "2026-07-16",
    categories: ["Job Offer"],
    verdict: "Repeatedly linked to fake-recruiter deposit scams.",
  },
  {
    identifier: "hr.talent@globalhire-jobs.co",
    type: "email",
    riskScore: 77,
    riskLevel: "high",
    reportCount: 22,
    firstSeen: "2026-06-30",
    lastSeen: "2026-07-15",
    categories: ["Job Offer", "Phishing"],
    verdict: "Fake hiring domain. Treat all offers as fraudulent.",
  },
  {
    identifier: "0x9F2a...c41B",
    type: "wallet",
    riskScore: 93,
    riskLevel: "critical",
    reportCount: 41,
    firstSeen: "2026-07-08",
    lastSeen: "2026-07-17",
    categories: ["Crypto"],
    verdict: "Destination wallet for multiple drainer attacks.",
  },
]

export function getReportById(id: string) {
  return reports.find((r) => r.id === id)
}
