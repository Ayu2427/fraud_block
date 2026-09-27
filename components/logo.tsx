import { ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

export function Logo({
  className,
  showText = true,
}: {
  className?: string
  showText?: boolean
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
        <ShieldCheck className="h-5 w-5" aria-hidden="true" />
      </span>
      {showText && (
        <span className="font-display text-lg font-bold tracking-tight">
          Fraud<span className="text-primary">Block</span>
        </span>
      )}
    </span>
  )
}
