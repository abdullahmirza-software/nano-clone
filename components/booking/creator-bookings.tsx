"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { getCampaigns } from "@/lib/campaigns";
import { getBookingsForCreator, createBooking, advanceBookingStatus } from "@/lib/bookings";
import {
  BOOKING_STATUS_LABEL,
  BOOKING_STATUS_BADGE_VARIANT,
  nextBookingStatus,
  nextBookingActionLabel,
  type Booking,
} from "@/lib/mock/booking-types";
import type { Campaign } from "@/lib/mock/campaign-types";

export function CreatorBookings({ creatorId }: { creatorId: string }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setBookings(getBookingsForCreator(creatorId));
    setCampaigns(getCampaigns());
  }, [creatorId]);

  function campaignName(campaignId: string) {
    return campaigns.find((c) => c.id === campaignId)?.name ?? "Unknown campaign";
  }

  function handleInvite() {
    if (!selectedCampaignId) return;
    createBooking(creatorId, selectedCampaignId);
    setBookings(getBookingsForCreator(creatorId));
    setSelectedCampaignId("");
    setOpen(false);
  }

  function handleAdvance(booking: Booking) {
    const next = nextBookingStatus(booking.status);
    if (!next) return;
    advanceBookingStatus(booking.id, next);
    setBookings(getBookingsForCreator(creatorId));
  }

  return (
    <div className="space-y-4">
      <Dialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (next) setCampaigns(getCampaigns());
        }}
      >
        <DialogTrigger asChild>
          <Button size="lg" className="w-full sm:w-auto">
            Invite to campaign
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite to a campaign</DialogTitle>
            <DialogDescription>Choose one of your campaigns to invite this creator to.</DialogDescription>
          </DialogHeader>
          {campaigns.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              You don't have any campaigns yet.{" "}
              <Link href="/campaigns/new" className="font-medium text-primary underline-offset-4 hover:underline">
                Create one first
              </Link>
              .
            </p>
          ) : (
            <Select
              id="invite-campaign"
              name="campaign"
              value={selectedCampaignId}
              onChange={(e) => setSelectedCampaignId(e.target.value)}
            >
              <option value="" disabled>
                Select a campaign
              </option>
              {campaigns.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleInvite} disabled={!selectedCampaignId}>
              Send invite
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {bookings.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Campaign bookings</p>
          {bookings.map((booking) => {
            const action = nextBookingActionLabel(booking.status);
            return (
              <div
                key={booking.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border p-3 text-sm"
              >
                <div className="flex items-center gap-2">
                  <Link href={`/campaigns/${booking.campaignId}`} className="font-medium hover:underline">
                    {campaignName(booking.campaignId)}
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
      )}
    </div>
  );
}
