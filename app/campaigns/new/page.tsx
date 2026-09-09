"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { cn, formatCents } from "@/lib/utils";
import { saveCampaign } from "@/lib/campaigns";
import {
  OBJECTIVES,
  CTA_TYPES,
  getAIDraft,
  type Campaign,
  type CampaignObjective,
  type CampaignCTAType,
} from "@/lib/mock/campaign-types";

const STEPS = ["Objective", "Messaging & Audience", "Budget & Timeline", "Call to Action", "Review"] as const;

interface FormState {
  name: string;
  objective: CampaignObjective | "";
  headline: string;
  body: string;
  targetAudience: string;
  budget: string;
  startDate: string;
  endDate: string;
  ctaType: CampaignCTAType | "";
  ctaText: string;
}

const INITIAL_STATE: FormState = {
  name: "",
  objective: "",
  headline: "",
  body: "",
  targetAudience: "",
  budget: "",
  startDate: "",
  endDate: "",
  ctaType: "",
  ctaText: "",
};

function objectiveLabel(value: string) {
  return OBJECTIVES.find((o) => o.value === value)?.label ?? value;
}

function ctaLabel(value: string) {
  return CTA_TYPES.find((c) => c.value === value)?.label ?? value;
}

export default function NewCampaignPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(INITIAL_STATE);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function applyAIDraft() {
    if (!form.objective) return;
    const draft = getAIDraft(form.objective);
    setForm((current) => ({
      ...current,
      headline: draft.headline,
      body: draft.body,
      targetAudience: draft.targetAudience,
    }));
  }

  const stepValid = [
    form.name.trim() !== "" && form.objective !== "",
    form.headline.trim() !== "" && form.body.trim() !== "" && form.targetAudience.trim() !== "",
    form.budget !== "" &&
      Number(form.budget) > 0 &&
      form.startDate !== "" &&
      form.endDate !== "" &&
      form.startDate <= form.endDate,
    form.ctaType !== "" && form.ctaText.trim() !== "",
    true,
  ];

  function handleSubmit() {
    const id = `campaign-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    const campaign: Campaign = {
      id,
      name: form.name.trim(),
      objective: form.objective as CampaignObjective,
      headline: form.headline.trim(),
      body: form.body.trim(),
      targetAudience: form.targetAudience.trim(),
      budgetCents: Math.round(Number(form.budget) * 100),
      startDate: form.startDate,
      endDate: form.endDate,
      ctaType: form.ctaType as CampaignCTAType,
      ctaText: form.ctaText.trim(),
      status: "draft",
      createdAt: new Date().toISOString(),
    };
    saveCampaign(campaign);
    router.push(`/campaigns/${id}`);
  }

  return (
    <Section>
      <Container className="max-w-2xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Create a campaign</h1>
          <p className="mt-3 text-muted-foreground">
            Post a brief once — matched creators will apply for it.
          </p>
        </div>

        <ol className="flex flex-wrap items-center gap-x-2 gap-y-3 text-sm">
          {STEPS.map((label, index) => (
            <li key={label} className="flex items-center gap-2">
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                  index === step
                    ? "bg-primary text-primary-foreground"
                    : index < step
                      ? "bg-success text-success-foreground"
                      : "bg-muted text-muted-foreground"
                )}
              >
                {index < step ? <Check className="h-3.5 w-3.5" /> : index + 1}
              </span>
              <span className={cn(index === step ? "font-medium text-foreground" : "text-muted-foreground")}>
                {label}
              </span>
              {index < STEPS.length - 1 && <span className="ml-1 h-px w-4 bg-border sm:w-8" />}
            </li>
          ))}
        </ol>

        <Card>
          <CardContent className="space-y-5 pt-6">
            {step === 0 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="campaign-name">Campaign name</Label>
                  <Input
                    id="campaign-name"
                    name="name"
                    placeholder="Q3 product launch push"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="campaign-objective">Objective</Label>
                  <Select
                    id="campaign-objective"
                    name="objective"
                    value={form.objective}
                    onChange={(e) => update("objective", e.target.value as CampaignObjective)}
                  >
                    <option value="" disabled>
                      Select an objective
                    </option>
                    {OBJECTIVES.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </Select>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Messaging & audience</span>
                  <Button type="button" variant="ai" size="sm" onClick={applyAIDraft}>
                    <Sparkles />
                    AI draft
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="campaign-headline">Headline</Label>
                  <Input
                    id="campaign-headline"
                    name="headline"
                    placeholder="What's the one-line hook?"
                    value={form.headline}
                    onChange={(e) => update("headline", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="campaign-body">Body / key points</Label>
                  <Textarea
                    id="campaign-body"
                    name="body"
                    placeholder="What should the creator's post cover?"
                    value={form.body}
                    onChange={(e) => update("body", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="campaign-audience">Target audience</Label>
                  <Textarea
                    id="campaign-audience"
                    name="targetAudience"
                    placeholder="Who should this reach?"
                    value={form.targetAudience}
                    onChange={(e) => update("targetAudience", e.target.value)}
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="campaign-budget">Budget (USD)</Label>
                  <Input
                    id="campaign-budget"
                    name="budget"
                    type="number"
                    min={0}
                    placeholder="5000"
                    value={form.budget}
                    onChange={(e) => update("budget", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="campaign-start">Start date</Label>
                    <Input
                      id="campaign-start"
                      name="startDate"
                      type="date"
                      value={form.startDate}
                      onChange={(e) => update("startDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="campaign-end">End date</Label>
                    <Input
                      id="campaign-end"
                      name="endDate"
                      type="date"
                      value={form.endDate}
                      onChange={(e) => update("endDate", e.target.value)}
                    />
                  </div>
                </div>
                {form.startDate && form.endDate && form.startDate > form.endDate && (
                  <p className="text-sm text-destructive">End date must be on or after the start date.</p>
                )}
              </>
            )}

            {step === 3 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="campaign-cta-type">Call-to-action type</Label>
                  <Select
                    id="campaign-cta-type"
                    name="ctaType"
                    value={form.ctaType}
                    onChange={(e) => update("ctaType", e.target.value as CampaignCTAType)}
                  >
                    <option value="" disabled>
                      Select a CTA type
                    </option>
                    {CTA_TYPES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="campaign-cta-text">Button text</Label>
                  <Input
                    id="campaign-cta-text"
                    name="ctaText"
                    placeholder="e.g. Book a demo"
                    value={form.ctaText}
                    onChange={(e) => update("ctaText", e.target.value)}
                  />
                </div>
              </>
            )}

            {step === 4 && (
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Campaign</p>
                  <p className="mt-1 font-medium">{form.name}</p>
                  <Badge variant="secondary" className="mt-1.5">
                    {objectiveLabel(form.objective)}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Messaging</p>
                  <p className="mt-1 font-medium">{form.headline}</p>
                  <p className="mt-1 text-muted-foreground">{form.body}</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Audience</p>
                  <p className="mt-1 text-muted-foreground">{form.targetAudience}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Budget</p>
                    <p className="mt-1 font-medium">
                      {form.budget ? formatCents(Math.round(Number(form.budget) * 100)) : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Timeline</p>
                    <p className="mt-1 font-medium">
                      {form.startDate} → {form.endDate}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Call to action
                  </p>
                  <p className="mt-1 font-medium">
                    {ctaLabel(form.ctaType)} — &ldquo;{form.ctaText}&rdquo;
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            <ArrowLeft />
            Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button type="button" onClick={() => setStep((s) => s + 1)} disabled={!stepValid[step]}>
              Next
              <ArrowRight />
            </Button>
          ) : (
            <Button type="button" onClick={handleSubmit}>
              Launch campaign
              <ArrowRight />
            </Button>
          )}
        </div>
      </Container>
    </Section>
  );
}
