import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names + resolve Tailwind conflicts. Used by every component. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Money is always stored as integer cents. This is the single place that formats it for display. */
export function formatCents(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

/** Compact number formatting for follower counts, e.g. 128000 -> "128K". */
export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en-US", { notation: "compact" }).format(value);
}

const AVATAR_PALETTE = [
  "bg-primary text-primary-foreground",
  "bg-success text-success-foreground",
  "bg-accent-foreground text-accent",
  "bg-secondary-foreground text-secondary",
];

/** Deterministic background/text color pair for an initials avatar, keyed off the first letter. */
export function initialsColor(initials: string): string {
  return AVATAR_PALETTE[initials.charCodeAt(0) % AVATAR_PALETTE.length];
}
