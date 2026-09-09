import type { Booking, BookingStatus } from "@/lib/mock/booking-types";

const STORAGE_KEY = "naano:bookings";

export function getBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Booking[]) : [];
  } catch {
    return [];
  }
}

function saveBookings(bookings: Booking[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

export function getBookingsForCreator(creatorId: string): Booking[] {
  return getBookings().filter((booking) => booking.creatorId === creatorId);
}

export function getBookingsForCampaign(campaignId: string): Booking[] {
  return getBookings().filter((booking) => booking.campaignId === campaignId);
}

export function createBooking(creatorId: string, campaignId: string): Booking {
  const bookings = getBookings();
  const existing = bookings.find((b) => b.creatorId === creatorId && b.campaignId === campaignId);
  if (existing) return existing;

  const now = new Date().toISOString();
  const booking: Booking = {
    id: `booking-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
    creatorId,
    campaignId,
    status: "invited",
    createdAt: now,
    updatedAt: now,
  };
  saveBookings([...bookings, booking]);
  return booking;
}

export function advanceBookingStatus(bookingId: string, status: BookingStatus): Booking | undefined {
  const bookings = getBookings();
  const index = bookings.findIndex((b) => b.id === bookingId);
  if (index === -1) return undefined;

  const updated: Booking = { ...bookings[index], status, updatedAt: new Date().toISOString() };
  bookings[index] = updated;
  saveBookings(bookings);
  return updated;
}
