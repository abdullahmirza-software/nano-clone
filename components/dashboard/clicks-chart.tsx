import type { DailyClicks } from "@/lib/mock/dashboard-stats";

interface ClicksChartProps {
  data: DailyClicks[];
}

function formatShortDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

const WIDTH = 600;
const HEIGHT = 200;
const BAR_GAP = 4;
const CHART_TOP_PADDING = 12;
const LABEL_HEIGHT = 20;

export function ClicksChart({ data }: ClicksChartProps) {
  const max = Math.max(...data.map((d) => d.clicks), 1);
  const barWidth = data.length > 0 ? (WIDTH - BAR_GAP * (data.length - 1)) / data.length : 0;
  const plotHeight = HEIGHT - LABEL_HEIGHT;

  return (
    <div>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="h-48 w-full"
        role="img"
        aria-label="Clicks per day over the last two weeks"
      >
        {data.map((d, i) => {
          const barHeight = (d.clicks / max) * (plotHeight - CHART_TOP_PADDING);
          const x = i * (barWidth + BAR_GAP);
          const y = plotHeight - barHeight;
          return (
            <rect key={d.date} x={x} y={y} width={barWidth} height={barHeight} rx={2} className="fill-primary">
              <title>{`${formatShortDate(d.date)}: ${d.clicks} clicks`}</title>
            </rect>
          );
        })}
        <line x1={0} y1={plotHeight} x2={WIDTH} y2={plotHeight} className="stroke-border" strokeWidth={1} />
      </svg>
      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
        <span>{formatShortDate(data[0]?.date)}</span>
        <span>{formatShortDate(data[data.length - 1]?.date)}</span>
      </div>
    </div>
  );
}
