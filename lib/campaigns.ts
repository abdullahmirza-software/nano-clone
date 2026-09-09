import type { Campaign } from "@/lib/mock/campaign-types";

const STORAGE_KEY = "naano:campaigns";

export function getCampaigns(): Campaign[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Campaign[]) : [];
  } catch {
    return [];
  }
}

export function getCampaign(id: string): Campaign | undefined {
  return getCampaigns().find((campaign) => campaign.id === id);
}

export function saveCampaign(campaign: Campaign): void {
  const campaigns = getCampaigns();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...campaigns, campaign]));
}
