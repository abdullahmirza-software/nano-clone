import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Search,
  Handshake,
  Send,
  BarChart3,
  TrendingUp,
  Gauge,
  Clock,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Grid } from "@/components/layout/grid";
import { PricingPlanCards } from "@/components/pricing/plan-cards";
import { cn, formatCents, formatCompactNumber, initialsColor } from "@/lib/utils";

const LOGO_WALL = ["Framewire", "Alto Systems", "Northbeam", "Loopline", "Verdant Labs", "Quill & Co."];

const HOW_IT_WORKS = [
  {
    icon: FileText,
    title: "Post your brief",
    description: "Objective, audience, budget, and timeline — done in a few guided steps.",
  },
  {
    icon: Search,
    title: "Get matched",
    description: "Filter vetted LinkedIn creators by vertical, follower range, and price.",
  },
  {
    icon: Handshake,
    title: "Invite & align",
    description: "Message creators directly, agree on deliverables, and lock in the rate.",
  },
  {
    icon: Send,
    title: "Creator posts",
    description: "Sponsored content goes live on the creator's own LinkedIn feed.",
  },
  {
    icon: BarChart3,
    title: "Track results",
    description: "Engagement, reach, and ROI roll into your dashboard automatically.",
  },
];

/** Hardcoded for the homepage preview. Real creator data + directory land in the next task. */
const FEATURED_CREATORS = [
  {
    id: "priya-anand",
    name: "Priya Anand",
    initials: "PA",
    vertical: "Product Marketing",
    followers: 84000,
    pricePerPostCents: 65000,
    bio: "Turns dry release notes into posts people actually screenshot.",
  },
  {
    id: "marcus-chen",
    name: "Marcus Chen",
    initials: "MC",
    vertical: "Fintech & Ops",
    followers: 112000,
    pricePerPostCents: 90000,
    bio: "The voice CFOs and finance leaders actually stop scrolling for.",
  },
  {
    id: "dana-whitfield",
    name: "Dana Whitfield",
    initials: "DW",
    vertical: "Future of Work",
    followers: 63000,
    pricePerPostCents: 48000,
    bio: "HR and people-ops takes that get forwarded, not just liked.",
  },
  {
    id: "elliot-ruiz",
    name: "Elliot Ruiz",
    initials: "ER",
    vertical: "DevTools & Infra",
    followers: 97000,
    pricePerPostCents: 72000,
    bio: "Explains infra decisions engineers actually trust.",
  },
];

const RESULTS = [
  { icon: TrendingUp, stat: "3.2x", label: "Average engagement lift vs. brand-page posts" },
  { icon: Gauge, stat: "$40", label: "Equivalent CPM vs. comparable LinkedIn ad spend" },
  { icon: Clock, stat: "18 days", label: "Average time from brief to live post" },
  { icon: RotateCcw, stat: "92%", label: "Of campaigns rebook the same creator" },
];

const CASE_STUDIES = [
  {
    quote:
      "We swapped a quarter of our LinkedIn ad budget for four creator posts and got more qualified demos than the whole ad campaign.",
    name: "VP Marketing",
    company: "B2B SaaS, Series B",
  },
  {
    quote:
      "Naano's brief-to-live turnaround let us react to a competitor announcement in under two weeks instead of two months.",
    name: "Head of Growth",
    company: "Fintech infrastructure",
  },
];

const FAQS = [
  {
    question: "How are creators vetted?",
    answer:
      "Every creator is reviewed for audience quality, posting consistency, and past sponsored-post performance before they're listed in the directory.",
  },
  {
    question: "How is pricing calculated?",
    answer:
      "Creators set their own per-post rate. You pay that rate plus a flat 10% platform fee — no subscription, no hidden markup, and no charge until a booking is confirmed.",
  },
  {
    question: "What if a campaign underperforms?",
    answer:
      "Every booking includes agreed deliverables up front. If a creator doesn't deliver what was scoped in the brief, our team helps resolve it before you pay out.",
  },
  {
    question: "Can I run multiple campaigns at once?",
    answer:
      "Yes — your dashboard tracks every active and past campaign separately, each with its own creators, budget, and results.",
  },
  {
    question: "Is this a real, live product?",
    answer:
      "No — this is a portfolio demo build. All creators, campaigns, and stats are mock data, and there's no real backend, payments, or LinkedIn integration.",
  },
];

export default function Home() {
  return (
    <>
      <Section className="bg-gradient-to-b from-secondary/80 via-secondary/25 to-background pb-12 pt-16 sm:pt-20 lg:pt-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="bg-background/80 shadow-sm">
              B2B Creator Marketplace
            </Badge>
            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Book LinkedIn creators who move the room.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Naano connects B2B brands with vetted LinkedIn creators for sponsored posts, product
              launches, and thought-leadership campaigns — from first brief to final report.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="rounded-full" asChild>
                <Link href="/campaigns/new">
                  Launch a campaign
                  <ArrowRight />
                </Link>
              </Button>
              <Button size="lg" variant="link" asChild>
                <Link href="#how-it-works">
                  See how Naano works
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-10">
        <Container>
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Trusted by marketing teams at
          </p>
          <div
            className="group relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
          >
            <div className="flex w-max animate-marquee gap-x-16 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
              {[...LOGO_WALL, ...LOGO_WALL].map((company, i) => (
                <span
                  key={`${company}-${i}`}
                  className="shrink-0 text-lg font-semibold tracking-tight text-muted-foreground/70 transition-colors hover:text-foreground"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="how-it-works" className="bg-muted/40">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How it works</h2>
            <p className="mt-3 text-muted-foreground">
              From brief to results, in five steps.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {HOW_IT_WORKS.map((step, index) => (
              <div key={step.title} className="relative rounded-lg border border-border bg-card p-6">
                <span className="text-sm font-semibold text-primary">{String(index + 1).padStart(2, "0")}</span>
                <step.icon className="mt-3 h-6 w-6 text-primary" />
                <h3 className="mt-3 font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured creators</h2>
              <p className="mt-3 text-muted-foreground">A sample of the LinkedIn creators booking through Naano.</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/creators">
                View all creators
                <ArrowRight />
              </Link>
            </Button>
          </div>

          <Grid cols={4} className="mt-10">
            {FEATURED_CREATORS.map((creator) => (
              <Link key={creator.id} href={`/creators/${creator.id}`}>
                <Card className="h-full transition-colors hover:border-primary/50">
                  <CardHeader>
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold",
                        initialsColor(creator.initials)
                      )}
                    >
                      {creator.initials}
                    </div>
                    <CardTitle className="mt-2">{creator.name}</CardTitle>
                    <Badge variant="secondary" className="w-fit">
                      {creator.vertical}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{creator.bio}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{formatCompactNumber(creator.followers)} followers</span>
                      <span className="font-semibold">{formatCents(creator.pricePerPostCents)}/post</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </Grid>
        </Container>
      </Section>

      <Section id="results" className="bg-muted/40">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Results brands see</h2>
            <p className="mt-3 text-muted-foreground">Aggregate numbers across campaigns run on Naano.</p>
          </div>

          <Grid cols={4} className="mt-10">
            {RESULTS.map((result) => (
              <div key={result.label} className="rounded-lg border border-border bg-card p-6 text-center">
                <result.icon className="mx-auto h-6 w-6 text-primary" />
                <p className="mt-3 text-3xl font-bold tracking-tight">{result.stat}</p>
                <p className="mt-1.5 text-sm text-muted-foreground">{result.label}</p>
              </div>
            ))}
          </Grid>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {CASE_STUDIES.map((study) => (
              <figure key={study.name} className="rounded-lg border border-border bg-card p-6">
                <blockquote className="text-sm leading-relaxed text-foreground">&ldquo;{study.quote}&rdquo;</blockquote>
                <figcaption className="mt-4 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{study.name}</span> · {study.company}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="pricing">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Simple, usage-based pricing</h2>
            <p className="mt-3 text-muted-foreground">
              No subscription. Pay the creator's rate plus a flat fee.{" "}
              <Link href="/pricing" className="font-medium text-primary underline-offset-4 hover:underline">
                See full pricing & ROI calculator
              </Link>
              .
            </p>
          </div>

          <div className="mt-10">
            <PricingPlanCards />
          </div>
        </Container>
      </Section>

      <Section id="faq" className="bg-muted/40">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently asked questions</h2>
          </div>

          <div className="mx-auto mt-10 max-w-2xl">
            <Accordion type="single" collapsible>
              {FAQS.map((faq) => (
                <AccordionItem key={faq.question} value={faq.question}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="rounded-2xl bg-gradient-to-b from-secondary/80 to-secondary/20 px-6 py-16 text-center sm:px-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to book your first LinkedIn creator?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Post a brief in minutes, or browse the directory to see who's available.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" className="rounded-full" asChild>
                <Link href="/campaigns/new">
                  Launch a campaign
                  <ArrowRight />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full bg-background" asChild>
                <Link href="/creators">Browse Creators</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
