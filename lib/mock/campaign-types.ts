export const OBJECTIVES = [
  { value: "brand-awareness", label: "Brand Awareness" },
  { value: "lead-generation", label: "Lead Generation" },
  { value: "product-launch", label: "Product Launch" },
  { value: "thought-leadership", label: "Thought Leadership" },
] as const;

export type CampaignObjective = (typeof OBJECTIVES)[number]["value"];

export const CTA_TYPES = [
  { value: "learn-more", label: "Learn More" },
  { value: "sign-up", label: "Sign Up" },
  { value: "book-demo", label: "Book a Demo" },
  { value: "download", label: "Download" },
] as const;

export type CampaignCTAType = (typeof CTA_TYPES)[number]["value"];

export type CampaignStatus = "draft" | "active" | "completed";

export interface Campaign {
  id: string;
  name: string;
  objective: CampaignObjective;
  headline: string;
  body: string;
  targetAudience: string;
  budgetCents: number;
  startDate: string;
  endDate: string;
  ctaType: CampaignCTAType;
  ctaText: string;
  status: CampaignStatus;
  createdAt: string;
}

interface AIDraft {
  headline: string;
  body: string;
  targetAudience: string;
}

// TODO: real impl — this is a canned template keyed by objective, not an actual AI call.
const AI_DRAFT_TEMPLATES: Record<CampaignObjective, AIDraft> = {
  "brand-awareness": {
    headline: "Meet the team building the future of [your category]",
    body: "We're on a mission to change how B2B teams think about [problem]. Here's a look at what we're building and why it matters.",
    targetAudience: "B2B marketing and ops leaders at Series A–C SaaS companies, 50–500 employees.",
  },
  "lead-generation": {
    headline: "The [problem] playbook we wish we'd had two years ago",
    body: "We turned everything we've learned running [X] campaigns into a single guide. No email gate — just the framework.",
    targetAudience: "Demand gen and growth marketers at mid-market B2B companies actively evaluating new tools.",
  },
  "product-launch": {
    headline: "We just shipped [feature] — here's why it matters",
    body: "After months of building alongside customers, [feature] is live. Here's the problem it solves and what changed under the hood.",
    targetAudience: "Existing customers and prospects in active evaluation, plus category-relevant technical decision makers.",
  },
  "thought-leadership": {
    headline: "What three years of [X] taught me about [Y]",
    body: "Everyone assumes [common belief]. After running this at scale, here's what actually held up — and what didn't.",
    targetAudience: "Senior operators and executives in [industry] who follow category conversations closely.",
  },
};

export function getAIDraft(objective: CampaignObjective): AIDraft {
  return AI_DRAFT_TEMPLATES[objective];
}
