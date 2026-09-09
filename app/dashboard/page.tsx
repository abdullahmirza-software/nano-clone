"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Grid } from "@/components/layout/grid";
import { formatCents } from "@/lib/utils";
import { getCampaigns } from "@/lib/campaigns";
import { getCampaignStats } from "@/lib/mock/dashboard-stats";
import { SEED_CAMPAIGNS } from "@/lib/mock/seed-campaigns";
import { OBJECTIVES, type Campaign } from "@/lib/mock/campaign-types";

const STATUS_BADGE_VARIANT = {
  draft: "secondary",
  active: "success",
  completed: "outline",
} as const;

function objectiveLabel(value: string) {
  return OBJECTIVES.find((o) => o.value === value)?.label ?? value;
}

export default function DashboardPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [usingSeedData, setUsingSeedData] = useState(false);

  useEffect(() => {
    const saved = getCampaigns();
    if (saved.length > 0) {
      setCampaigns(saved);
      setUsingSeedData(false);
    } else {
      setCampaigns(SEED_CAMPAIGNS);
      setUsingSeedData(true);
    }
  }, []);

  return (
    <Section>
      <Container className="space-y-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Dashboard</h1>
            <p className="mt-3 text-muted-foreground">
              {usingSeedData
                ? "You haven't created any campaigns yet — here's example data."
                : "Track performance across your campaigns."}
            </p>
          </div>
          <Button asChild>
            <Link href="/campaigns/new">Create a campaign</Link>
          </Button>
        </div>

        <Grid cols={3}>
          {campaigns.map((campaign) => {
            const stats = getCampaignStats(campaign.id);
            return (
              <Link key={campaign.id} href={`/dashboard/${campaign.id}`}>
                <Card className="h-full transition-colors hover:border-primary/50">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg">{campaign.name}</CardTitle>
                      <Badge variant={STATUS_BADGE_VARIANT[campaign.status]} className="shrink-0 capitalize">
                        {campaign.status}
                      </Badge>
                    </div>
                    <CardDescription>{objectiveLabel(campaign.objective)}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Budget</span>
                      <span className="font-medium">{formatCents(campaign.budgetCents)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Clicks (14d)</span>
                      <span className="font-medium">{stats.clicks.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Leads (14d)</span>
                      <span className="font-medium">{stats.leads.toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
}
