/** Deterministic PRNG (mulberry32) seeded from the campaign id, so stats are stable across reloads. */
function mulberry32(seed: number) {
  let state = seed;
  return function random() {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

export interface DailyClicks {
  date: string;
  clicks: number;
}

export interface CampaignDashboardStats {
  impressions: number;
  clicks: number;
  ctr: number;
  leads: number;
  spendCents: number;
  dailyClicks: DailyClicks[];
}

export function getCampaignStats(campaignId: string, days = 14): CampaignDashboardStats {
  const random = mulberry32(hashString(campaignId));

  const dailyClicks: DailyClicks[] = [];
  let totalClicks = 0;
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const clicks = Math.round(20 + random() * 180);
    totalClicks += clicks;
    dailyClicks.push({ date: date.toISOString().slice(0, 10), clicks });
  }

  const impressions = Math.round(totalClicks * (15 + random() * 10));
  const ctr = Number(((totalClicks / impressions) * 100).toFixed(2));
  const leads = Math.round(totalClicks * (0.04 + random() * 0.05));
  const spendCents = Math.round(totalClicks * (150 + random() * 250));

  return { impressions, clicks: totalClicks, ctr, leads, spendCents, dailyClicks };
}
