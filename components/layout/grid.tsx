import * as React from "react";
import { cn } from "@/lib/utils";

const COLS = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
} as const;

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns at the widest breakpoint. Scales down responsively (mobile-first). */
  cols?: keyof typeof COLS;
}

/** Responsive grid used for card collections (creators, features, pricing, stats). */
export function Grid({ cols = 3, className, ...props }: GridProps) {
  return <div className={cn("grid gap-6", COLS[cols], className)} {...props} />;
}
