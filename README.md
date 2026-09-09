# Naano Clone

A portfolio demo of **Naano** — a fictional B2B marketplace connecting brands with LinkedIn creators for sponsored content, product launches, and thought-leadership campaigns.

Built with Next.js 15 (App Router, Turbopack), TypeScript, and Tailwind CSS. **Mock data only — no real backend, auth, or payments.** Demo build, not affiliated with the real Naano.

## Getting started

This sandbox has broken IPv6 routing that hangs Node's network calls, so set this first:

```bash
export NODE_OPTIONS="--dns-result-order=ipv4first --no-network-family-autoselection"
npm install
npm run dev
```

Then open the printed local URL (usually [http://localhost:3000](http://localhost:3000) — if port 3000 is already taken on your machine, Next.js will fall back to 3001 and print the actual URL).

## What's done

Everything below is built and has been manually tested in Chrome (via chrome-devtools-mcp) at mobile (375px), tablet (768px), laptop (1280px), and desktop (1920px), with zero console errors.

| Page | Route | What it does |
|---|---|---|
| Marketing homepage | `/` | Hero, social proof, how-it-works, featured creators, results/case studies, pricing preview, FAQ accordion, final CTA |
| Creator directory | `/creators` | 14 mock creators in a grid, with live client-side filters: text search, vertical (multi-select), location, follower range, price range |
| Creator profile | `/creators/[id]` | Bio, stats, sample posts (tabs), and an "Invite to campaign" flow. Invalid ids show a proper not-found page |
| Campaign builder | `/campaigns/new` | 5-step wizard (Objective → Messaging/Audience → Budget/Timeline → CTA → Review) with a fake "AI draft" button and validation gating each step |
| Campaign view | `/campaigns/[id]` | Shows a saved campaign's brief plus its booked creators and their status |
| Booking flow | *(on the creator profile + campaign view)* | Invite a creator to one of your campaigns via a dialog; advance status invited → accepted → live with a button click |
| Dashboard | `/dashboard` | Lists your campaigns as cards (falls back to 3 example campaigns if you haven't created any yet) |
| Campaign analytics | `/dashboard/[campaignId]` | A clicks-over-time bar chart (plain SVG, no chart library) and a stats table, plus a working "Export CSV" button |
| Pricing + ROI calculator | `/pricing` | Two pricing plans, and a live calculator that shows every step of the math (not a black-box number) |

### Design system

`components/ui/` has a small hand-written shadcn-style component set (Button, Card, Input, Badge, Tabs, Dialog, Accordion, Label, Textarea, Select), all built on Radix primitives where interaction/accessibility matters and plain styled elements otherwise. `components/layout/` has the shared Container/Section/Grid/Nav/Footer used on every page.

## What's fake / not real

This is a demo — nothing here talks to a real server:

- **No backend, no database.** Campaigns and bookings are saved to **`localStorage`** (`naano:campaigns`, `naano:bookings`) — they only exist in the browser that created them, and clearing site data wipes them.
- **No auth.** "Log in" links to the dashboard; there's no real account system.
- **No payments.** Pricing is illustrative copy only.
- **"AI draft" button** (campaign builder) fills in a canned template based on the objective you picked — not a real AI call. Marked `// TODO: real impl` in the code.
- **Dashboard stats & chart** are deterministically generated from the campaign's id (same campaign always shows the same numbers), not real analytics.
- **"Export CSV"** genuinely builds and downloads a real CSV from the mock stats — that part works — but there's no real export/reporting pipeline behind it. Marked `// TODO: real impl`.
- **Creator data** (`lib/mock/creators.ts`) and **seed campaigns** (`lib/mock/seed-campaigns.ts`) are hand-authored fictional data, not scraped or sourced from anywhere real.

## Project structure

```
app/                   Routes (Next.js App Router)
components/ui/         Design-system primitives (Button, Card, Dialog, ...)
components/layout/     Nav, Footer, Container, Section, Grid
components/booking/    Invite dialog + booking status lists
components/dashboard/  SVG clicks chart
components/pricing/    Pricing cards + ROI calculator
lib/mock/              Static mock data & types (creators, campaigns, bookings, dashboard stats)
lib/campaigns.ts       localStorage helpers for campaigns
lib/bookings.ts        localStorage helpers for bookings
lib/utils.ts           cn(), formatCents(), formatCompactNumber(), initialsColor()
```

Money is stored as integer cents throughout (`budgetCents`, `pricePerPostCents`, etc.) and formatted for display with `formatCents()`.

## Known limitations

- Campaign/booking data is per-browser (localStorage), not shared across devices or users.
- No automated test suite — everything was verified manually in a real browser.