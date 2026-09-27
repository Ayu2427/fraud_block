import { riskLevelFromScore, type RiskLevel } from "@/lib/mock-data"

interface Signal {
  label: string
  weight: number
  test: RegExp
}

const signals: Signal[] = [
  { label: "Urgency & pressure language", weight: 18, test: /urgent|immediately|act now|limited time|expdes?|last chance|within \d+ ?(hours|minutes)/i },
  { label: "Upfront payment requested", weight: 20, test: /deposit|advance|upfront|processing fee|registration fee|pay (a )?fee|send money|gift card/i },
  { label: "Guaranteed or unrealistic returns", weight: 22, test: /guaranteed|risk[- ]?free|double your|[0-9]+% (return|profit|weekly|daily)|get rich/i },
  { label: "Requests wallet or seed phrase", weight: 24, test: /seed phrase|private key|connect (your )?wallet|approve transaction|recovery phrase/i },
  { label: "Credential / OTP harvesting", weight: 20, test: /verify your account|login to confirm|otp|one[- ]?time password|reset your password|account (locked|suspended)/i },
  { label: "Brand impersonation", weight: 16, test: /paypal|binance|amazon|microsoft|apple|netflix|irs|bank of|customs|fedex|dhl/i },
  { label: "Off-platform contact push", weight: 12, test: /whatsapp|telegram|move to|contact me on|text me|dm me/i },
  { label: "Too-good-to-be-true offer", weight: 14, test: /you (have )?won|congratulations|free (gift|prize|iphone)|selected as (a )?winner/i },
]

export interface RiskEstimate {
  score: number
  level: RiskLevel
  matched: string[]
}

export function estimateRisk(text: string): RiskEstimate {
  const clean = text.trim()
  if (clean.length < 12) {
    return { score: 0, level: "low", matched: [] }
  }

  let raw = 8 // small base risk for any reported activity
  const matched: string[] = []

  for (const signal of signals) {
    if (signal.test.test(clean)) {
      raw += signal.weight
      matched.push(signal.label)
    }
  }

  // Longer, more detailed descriptions add mild confidence.
  if (clean.length > 220) raw += 6

  const score = Math.max(0, Math.min(99, Math.round(raw)))
  return { score, level: riskLevelFromScore(score), matched }
}
