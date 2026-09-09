import type { Booking, BookingStatus } from "@/lib/mock/booking-types";
import { CREATORS } from "@/lib/mock/creators";
import { getCampaign } from "@/lib/campaigns";
import { generateId } from "@/lib/utils";

const STORAGE_KEY = "naano:bookings";

export function getBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Booking[]) : [];
  } catch (error) {
    console.error("Failed to read bookings from localStorage — treating as empty.", error);
    return [];
  }
}

function saveBookings(bookings: Booking[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  } catch (error) {
    console.error("Failed to save bookings to localStorage.", error);
    throw new Error("We couldn't save this booking — your browser's storage may be full or unavailable.");
  }
}

export function getBookingsForCreator(creatorId: string): Booking[] {
  return getBookings().filter((booking) => booking.creatorId === creatorId);
}

export function getBookingsForCampaign(campaignId: string): Booking[] {
  return getBookings().filter((booking) => booking.campaignId === campaignId);
}

/** Returns undefined (instead of creating a booking) if either id doesn't reference a real record. */
export function createBooking(creatorId: string, campaignId: string): Booking | undefined {
  if (!CREATORS.some((creator) => creator.id === creatorId)) return undefined;
  if (!getCampaign(campaignId)) return undefined;

  const bookings = getBookings();
  const existing = bookings.find((b) => b.creatorId === creatorId && b.campaignId === campaignId);
  if (existing) return existing;

  const now = new Date().toISOString();
  const booking: Booking = {
    id: generateId("booking"),
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
