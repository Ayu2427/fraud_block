import { reportTrend } from "@/lib/mock-data"

export function TrendChart() {
  const data = reportTrend
  const width = 640
  const height = 240
  const padX = 32
  const padY = 24
  const max = Math.max(...data.map((d) => d.reports)) * 1.1

  const xStep = (width - padX * 2) / (data.length - 1)
  const yScale = (v: number) => height - padY - (v / max) * (height - padY * 2)
  const xPos = (i: number) => padX + i * xStep

  function pathFor(key: "reports" | "verified") {
    return data
      .map((d, i) => `${i === 0 ? "M" : "L"} ${xPos(i)} ${yScale(d[key])}`)
      .join(" ")
  }

  const areaPath =
    pathFor("reports") +
    ` L ${xPos(data.length - 1)} ${height - padY} L ${xPos(0)} ${height - padY} Z`

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-base font-semibold">Reports over time</h3>
          <p className="text-sm text-muted-foreground">Submitted vs. community-verified</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
            Submitted
          </span>
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-chart-2" aria-hidden="true" />
            Verified
          </span>
        </div>
      </div>

      <div className="mt-4 w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto w-full"
          role="img"
          aria-label="Line chart of reports submitted and verified over the last six months"
        >
          <defs>
            <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.18" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0.25, 0.5, 0.75, 1].map((t) => (
            <line
              key={t}
              x1={padX}
              x2={width - padX}
              y1={yScale(max * t)}
              y2={yScale(max * t)}
              stroke="var(--color-border)"
              strokeDasharray="4 4"
            />
          ))}

          <path d={areaPath} fill="url(#trendFill)" />
          <path
            d={pathFor("reports")}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={pathFor("verified")}
            fill="none"
            stroke="var(--color-chart-2)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {data.map((d, i) => (
            <g key={d.month}>
              <circle cx={xPos(i)} cy={yScale(d.reports)} r="3.5" fill="var(--color-primary)" />
              <text
                x={xPos(i)}
                y={height - 4}
                textAnchor="middle"
                className="fill-muted-foreground"
                fontSize="11"
              >
                {d.month}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}
