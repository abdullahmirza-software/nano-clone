"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ClicksChart } from "@/components/dashboard/clicks-chart";
import { formatCents } from "@/lib/utils";
import { getCampaign } from "@/lib/campaigns";
import { getCampaignStats } from "@/lib/mock/dashboard-stats";
import { CAMPAIGN_STATUS_BADGE_VARIANT, objectiveLabel, type Campaign } from "@/lib/mock/campaign-types";

export default function CampaignDashboardPage() {
  const params = useParams<{ campaignId: string }>();
  const [campaign, setCampaign] = useState<Campaign | null | undefined>(undefined);
  const [exportMessage, setExportMessage] = useState("");

  useEffect(() => {
    // getCampaign() already checks the user's saved campaigns and falls back to the seed
    // campaigns itself, so this route and /campaigns/[id] resolve the same id consistently.
    setCampaign(getCampaign(params.campaignId) ?? null);
  }, [params.campaignId]);

  // Stats are deterministic per campaign id — derive from `campaign` instead of tracking
  // a second piece of state that has to be kept in sync by hand.
  const stats = useMemo(() => (campaign ? getCampaignStats(campaign.id) : null), [campaign]);

  function handleExport() {
    if (!campaign || !stats) return;
    // TODO: real impl — builds a CSV client-side from mock stats instead of calling a real export/reporting API.
    const rows = [["date", "clicks"], ...stats.dailyClicks.map((d) => [d.date, String(d.clicks)])];
    const csv = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${campaign.id}-stats.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setExportMessage("Export started — CSV downloaded.");
    setTimeout(() => setExportMessage(""), 4000);
  }

  if (campaign === undefined) {
    return null;
  }

  if (campaign === null) {
    return (
      <Section>
        <Container className="flex max-w-lg flex-col items-center py-20 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Campaign not found</h1>
          <p className="mt-3 text-muted-foreground">This campaign doesn't exist in this browser's storage.</p>
          <Button className="mt-6" asChild>
            <Link href="/dashboard">Back to dashboard</Link>
          </Button>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container className="max-w-3xl space-y-8">
        <Button variant="ghost" size="sm" asChild className="-ml-3">
          <Link href="/dashboard">
            <ArrowLeft />
            Back to dashboard
          </Link>
        </Button>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{campaign.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{objectiveLabel(campaign.objective)}</p>
          </div>
          <Badge variant={CAMPAIGN_STATUS_BADGE_VARIANT[campaign.status]} className="capitalize">
            {campaign.status}
          </Badge>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
            <CardTitle className="text-lg">Clicks over the last 14 days</CardTitle>
            <Button size="sm" variant="outline" onClick={handleExport}>
              <Download />
              Export CSV
            </Button>
          </CardHeader>
          <CardContent>
            {stats && <ClicksChart data={stats.dailyClicks} />}
            {exportMessage && <p className="mt-3 text-sm text-success">{exportMessage}</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Stats</CardTitle>
          </CardHeader>
          <CardContent>
            {stats && (
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-3 text-muted-foreground">Impressions</td>
                    <td className="py-3 text-right font-medium">{stats.impressions.toLocaleString()}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 text-muted-foreground">Clicks</td>
                    <td className="py-3 text-right font-medium">{stats.clicks.toLocaleString()}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 text-muted-foreground">Click-through rate</td>
                    <td className="py-3 text-right font-medium">{stats.ctr}%</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 text-muted-foreground">Leads</td>
                    <td className="py-3 text-right font-medium">{stats.leads.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-muted-foreground">Spend</td>
                    <td className="py-3 text-right font-medium">{formatCents(stats.spendCents)}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
}
