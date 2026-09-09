import * as React from "react";
import { cn } from "@/lib/utils";

/** Centers content and caps its width. Use inside every Section instead of repeating max-w classes. */
export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("container mx-auto", className)} {...props} />;
}
