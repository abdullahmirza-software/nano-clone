"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { formatCents, formatCompactNumber } from "@/lib/utils";

interface NumberFieldProps {
  id: string;
  label: string;
  hint?: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
}

function NumberField({ id, label, hint, value, onChange, prefix, suffix, min = 0 }: NumberFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            {prefix}
          </span>
        )}
        <Input
          id={id}
          name={id}
          type="number"
          min={min}
          step="any"
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => {
            if (e.target.value === "") {
              onChange(0);
              return;
            }
            const parsed = Number(e.target.value);
            onChange(Number.isFinite(parsed) ? Math.max(min, parsed) : min);
          }}
          className={prefix ? "pl-7" : suffix ? "pr-9" : undefined}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function dollars(cents: number): string {
  return formatCents(Math.round(cents));
}

export function ROICalculator() {
  const [monthlyBudget, setMonthlyBudget] = useState(5000);
  const [avgDealSize, setAvgDealSize] = useState(2000);
  const [pricePerPost, setPricePerPost] = useState(650);
  const [avgReachPerPost, setAvgReachPerPost] = useState(75000);
  const [engagementRate, setEngagementRate] = useState(4.5);
  const [leadRate, setLeadRate] = useState(3);
  const [closeRate, setCloseRate] = useState(20);

  const result = useMemo(() => {
    const safePricePerPost = Math.max(pricePerPost, 1);
    const postsPerMonth = Math.floor(monthlyBudget / safePricePerPost);
    const totalReach = postsPerMonth * avgReachPerPost;
    const clicks = totalReach * (engagementRate / 100);
    const leads = clicks * (leadRate / 100);
    const customers = leads * (closeRate / 100);
    const revenue = customers * avgDealSize;
    const roiPercent = monthlyBudget > 0 ? ((revenue - monthlyBudget) / monthlyBudget) * 100 : 0;

    return { postsPerMonth, totalReach, clicks, leads, customers, revenue, roiPercent };
  }, [monthlyBudget, avgDealSize, pricePerPost, avgReachPerPost, engagementRate, leadRate, closeRate]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Your numbers</CardTitle>
          <CardDescription>What you'd spend and what a customer is worth.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <NumberField
            id="roi-budget"
            label="Monthly budget"
            prefix="$"
            value={monthlyBudget}
            onChange={setMonthlyBudget}
          />
          <NumberField
            id="roi-deal-size"
            label="Average deal size"
            hint="Revenue from one new customer."
            prefix="$"
            value={avgDealSize}
            onChange={setAvgDealSize}
          />
        </CardContent>

        <CardHeader className="pt-0">
          <CardTitle className="text-lg">Assumptions</CardTitle>
          <CardDescription>Editable — defaults reflect typical Naano campaigns.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <NumberField
            id="roi-price-per-post"
            label="Avg. price per post"
            prefix="$"
            value={pricePerPost}
            onChange={setPricePerPost}
            min={1}
          />
          <NumberField
            id="roi-reach"
            label="Avg. reach per post"
            hint="Followers who see a typical sponsored post."
            value={avgReachPerPost}
            onChange={setAvgReachPerPost}
          />
          <NumberField
            id="roi-engagement"
            label="Engagement rate"
            hint="Share of reach that clicks through."
            suffix="%"
            value={engagementRate}
            onChange={setEngagementRate}
          />
          <NumberField
            id="roi-lead-rate"
            label="Lead conversion rate"
            hint="Share of clicks that become leads."
            suffix="%"
            value={leadRate}
            onChange={setLeadRate}
          />
          <NumberField
            id="roi-close-rate"
            label="Close rate"
            hint="Share of leads that become customers."
            suffix="%"
            value={closeRate}
            onChange={setCloseRate}
          />
        </CardContent>
      </Card>

      <div className="space-y-6 lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Estimated results</CardTitle>
            <CardDescription>Updates live as you change the numbers on the left.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-border p-4 text-center">
                <p className="text-2xl font-bold tracking-tight">{result.postsPerMonth}</p>
                <p className="mt-1 text-xs text-muted-foreground">Posts / month</p>
              </div>
              <div className="rounded-lg border border-border p-4 text-center">
                <p className="text-2xl font-bold tracking-tight">{formatCompactNumber(result.totalReach)}</p>
                <p className="mt-1 text-xs text-muted-foreground">Total reach</p>
              </div>
              <div className="rounded-lg border border-border p-4 text-center">
                <p className="text-2xl font-bold tracking-tight">{formatCompactNumber(result.clicks)}</p>
                <p className="mt-1 text-xs text-muted-foreground">Clicks</p>
              </div>
              <div className="rounded-lg border border-border p-4 text-center">
                <p className="text-2xl font-bold tracking-tight">{formatCompactNumber(result.leads)}</p>
                <p className="mt-1 text-xs text-muted-foreground">Leads</p>
              </div>
              <div className="rounded-lg border border-border p-4 text-center">
                <p className="text-2xl font-bold tracking-tight">{formatCompactNumber(result.customers)}</p>
                <p className="mt-1 text-xs text-muted-foreground">New customers</p>
              </div>
              <div className="rounded-lg border border-primary bg-accent p-4 text-center">
                <p className="text-2xl font-bold tracking-tight text-accent-foreground">
                  {result.roiPercent >= 0 ? "+" : ""}
                  {result.roiPercent.toFixed(0)}%
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Estimated ROI</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">How we calculated this</CardTitle>
            <CardDescription>Plain arithmetic, no black box.</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2 text-sm text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">Posts/month</span> = {dollars(monthlyBudget * 100)}{" "}
                budget ÷ {dollars(Math.max(pricePerPost, 1) * 100)} per post ={" "}
                <span className="font-medium text-foreground">{result.postsPerMonth}</span>
              </li>
              <li>
                <span className="font-medium text-foreground">Total reach</span> = {result.postsPerMonth} posts ×{" "}
                {formatCompactNumber(avgReachPerPost)} avg. reach ={" "}
                <span className="font-medium text-foreground">{formatCompactNumber(result.totalReach)}</span>
              </li>
              <li>
                <span className="font-medium text-foreground">Clicks</span> = {formatCompactNumber(result.totalReach)}{" "}
                reach × {engagementRate}% engagement ={" "}
                <span className="font-medium text-foreground">{formatCompactNumber(result.clicks)}</span>
              </li>
              <li>
                <span className="font-medium text-foreground">Leads</span> = {formatCompactNumber(result.clicks)}{" "}
                clicks × {leadRate}% lead rate ={" "}
                <span className="font-medium text-foreground">{formatCompactNumber(result.leads)}</span>
              </li>
              <li>
                <span className="font-medium text-foreground">New customers</span> = {formatCompactNumber(result.leads)}{" "}
                leads × {closeRate}% close rate ={" "}
                <span className="font-medium text-foreground">{formatCompactNumber(result.customers)}</span>
              </li>
              <li>
                <span className="font-medium text-foreground">Revenue</span> = {formatCompactNumber(result.customers)}{" "}
                customers × {dollars(avgDealSize * 100)} deal size ={" "}
                <span className="font-medium text-foreground">{dollars(result.revenue * 100)}</span>
              </li>
              <li>
                <span className="font-medium text-foreground">ROI</span> = ({dollars(result.revenue * 100)} revenue
                {" − "}
                {dollars(monthlyBudget * 100)} spend) ÷ {dollars(monthlyBudget * 100)} spend ={" "}
                <span className="font-medium text-foreground">
                  {result.roiPercent >= 0 ? "+" : ""}
                  {result.roiPercent.toFixed(0)}%
                </span>
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
