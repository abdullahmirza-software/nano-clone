"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { CampaignBookings } from "@/components/booking/campaign-bookings";
import { formatCents } from "@/lib/utils";
import { getCampaign } from "@/lib/campaigns";
import { OBJECTIVES, CTA_TYPES, type Campaign } from "@/lib/mock/campaign-types";

function objectiveLabel(value: string) {
  return OBJECTIVES.find((o) => o.value === value)?.label ?? value;
}

function ctaLabel(value: string) {
  return CTA_TYPES.find((c) => c.value === value)?.label ?? value;
}

const STATUS_BADGE_VARIANT = {
  draft: "secondary",
  active: "success",
  completed: "outline",
} as const;

export default function CampaignViewPage() {
  const params = useParams<{ id: string }>();
  const [campaign, setCampaign] = useState<Campaign | null | undefined>(undefined);

  useEffect(() => {
    setCampaign(getCampaign(params.id) ?? null);
  }, [params.id]);

  if (campaign === undefined) {
    return null;
  }

  if (campaign === null) {
    return (
      <Section>
        <Container className="flex max-w-lg flex-col items-center py-20 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Campaign not found</h1>
          <p className="mt-3 text-muted-foreground">
            This campaign doesn't exist in this browser's storage. It may have been created on another device, or
            the link may be incorrect.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/campaigns/new">Create a campaign</Link>
          </Button>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container className="max-w-2xl space-y-8">
        <Button variant="ghost" size="sm" asChild className="-ml-3">
          <Link href="/dashboard">
            <ArrowLeft />
            Back to dashboard
          </Link>
        </Button>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{campaign.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Created {new Date(campaign.createdAt).toLocaleDateString()}
            </p>
          </div>
          <Badge variant={STATUS_BADGE_VARIANT[campaign.status]} className="capitalize">
            {campaign.status}
          </Badge>
        </div>

        <Card>
          <CardContent className="space-y-5 pt-6 text-sm">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Objective</p>
              <p className="mt-1 font-medium">{objectiveLabel(campaign.objective)}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Messaging</p>
              <p className="mt-1 font-medium">{campaign.headline}</p>
              <p className="mt-1 text-muted-foreground">{campaign.body}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Target audience</p>
              <p className="mt-1 text-muted-foreground">{campaign.targetAudience}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Budget</p>
                <p className="mt-1 font-medium">{formatCents(campaign.budgetCents)}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Timeline</p>
                <p className="mt-1 font-medium">
                  {campaign.startDate} → {campaign.endDate}
                </p>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Call to action</p>
              <p className="mt-1 font-medium">
                {ctaLabel(campaign.ctaType)} — &ldquo;{campaign.ctaText}&rdquo;
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Booked creators</CardTitle>
          </CardHeader>
          <CardContent>
            <CampaignBookings campaignId={campaign.id} />
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
}
