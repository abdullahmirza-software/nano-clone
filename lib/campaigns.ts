import type { Campaign } from "@/lib/mock/campaign-types";
import { SEED_CAMPAIGNS } from "@/lib/mock/seed-campaigns";

const STORAGE_KEY = "naano:campaigns";

export function getCampaigns(): Campaign[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Campaign[]) : [];
  } catch (error) {
    console.error("Failed to read campaigns from localStorage — treating as empty.", error);
    return [];
  }
}

/**
 * Looks up a single campaign by id, checking the user's saved campaigns first and
 * falling back to the seed/demo campaigns — the same set app/dashboard/page.tsx shows
 * when the user hasn't created any campaigns yet. Every id-based lookup should go
 * through this function so a seed campaign's id resolves consistently everywhere
 * (campaign detail page, campaign dashboard page, booking links, etc).
 */
export function getCampaign(id: string): Campaign | undefined {
  return getCampaigns().find((campaign) => campaign.id === id) ?? SEED_CAMPAIGNS.find((campaign) => campaign.id === id);
}

/**
 * Campaigns to show as "yours" in list views: the user's saved campaigns, or — if they
 * haven't created any yet — the seed/demo campaigns. Centralizing this (instead of each
 * page re-deriving its own seed-data fallback) keeps every "your campaigns" list in the
 * app in sync, including which campaigns are offered when inviting a creator.
 */
export function getCampaignsOrSeed(): { campaigns: Campaign[]; usingSeedData: boolean } {
  const campaigns = getCampaigns();
  return campaigns.length > 0 ? { campaigns, usingSeedData: false } : { campaigns: SEED_CAMPAIGNS, usingSeedData: true };
}

export function saveCampaign(campaign: Campaign): void {
  const campaigns = getCampaigns();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...campaigns, campaign]));
  } catch (error) {
    console.error("Failed to save campaign to localStorage.", error);
    throw new Error("We couldn't save your campaign — your browser's storage may be full or unavailable.");
  }
}
