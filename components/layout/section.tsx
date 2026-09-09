import * as React from "react";
import { cn } from "@/lib/utils";

/** Vertical rhythm wrapper for every marketing/page section. Keeps spacing consistent site-wide. */
export function Section({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <section className={cn("py-12 sm:py-16 lg:py-20", className)} {...props} />;
}
