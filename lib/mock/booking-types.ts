export type BookingStatus = "invited" | "accepted" | "live";

export interface Booking {
  id: string;
  creatorId: string;
  campaignId: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
}

export const BOOKING_STATUS_LABEL: Record<BookingStatus, string> = {
  invited: "Invited",
  accepted: "Accepted",
  live: "Live",
};

export const BOOKING_STATUS_BADGE_VARIANT: Record<BookingStatus, "secondary" | "accent" | "success"> = {
  invited: "secondary",
  accepted: "accent",
  live: "success",
};

const STATUS_ORDER: BookingStatus[] = ["invited", "accepted", "live"];

/** Simulates the creator's side of the flow — there's no real counterparty to accept. */
export function nextBookingStatus(status: BookingStatus): BookingStatus | null {
  const index = STATUS_ORDER.indexOf(status);
  return index >= 0 && index < STATUS_ORDER.length - 1 ? STATUS_ORDER[index + 1] : null;
}

export function nextBookingActionLabel(status: BookingStatus): string | null {
  if (status === "invited") return "Simulate creator accepting";
  if (status === "accepted") return "Mark post live";
  return null;
}
