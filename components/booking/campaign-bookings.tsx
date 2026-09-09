"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, initialsColor } from "@/lib/utils";
import { getBookingsForCampaign, advanceBookingStatus } from "@/lib/bookings";
import {
  BOOKING_STATUS_LABEL,
  BOOKING_STATUS_BADGE_VARIANT,
  nextBookingStatus,
  nextBookingActionLabel,
  type Booking,
} from "@/lib/mock/booking-types";
import { CREATORS } from "@/lib/mock/creators";

export function CampaignBookings({ campaignId }: { campaignId: string }) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    setBookings(getBookingsForCampaign(campaignId));
  }, [campaignId]);

  function handleAdvance(booking: Booking) {
    const next = nextBookingStatus(booking.status);
    if (!next) return;
    const updated = advanceBookingStatus(booking.id, next);
    if (!updated) return;
    setBookings((current) => current.map((b) => (b.id === updated.id ? updated : b)));
  }

  if (bookings.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No creators booked yet. Invite one from a{" "}
        <Link href="/creators" className="font-medium text-primary underline-offset-4 hover:underline">
          creator profile
        </Link>
        .
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {bookings.map((booking) => {
        const creator = CREATORS.find((c) => c.id === booking.creatorId);
        const action = nextBookingActionLabel(booking.status);
        return (
          <div
            key={booking.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-border p-3 text-sm"
          >
            <div className="flex items-center gap-3">
              {creator && (
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                    initialsColor(creator.initials)
                  )}
                >
                  {creator.initials}
                </div>
              )}
              <Link href={`/creators/${booking.creatorId}`} className="font-medium hover:underline">
                {creator?.name ?? "Unknown creator"}
              </Link>
              <Badge variant={BOOKING_STATUS_BADGE_VARIANT[booking.status]}>
                {BOOKING_STATUS_LABEL[booking.status]}
              </Badge>
            </div>
            {action && (
              <Button size="sm" variant="outline" onClick={() => handleAdvance(booking)}>
                {action}
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
}
