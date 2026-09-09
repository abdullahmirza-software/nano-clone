"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Grid } from "@/components/layout/grid";
import { cn, formatCents, formatCompactNumber, initialsColor } from "@/lib/utils";
import { CREATORS, VERTICALS, LOCATIONS } from "@/lib/mock/creators";

const ALL_LOCATIONS = "All locations";

export default function CreatorsPage() {
  return (
    <Suspense fallback={null}>
      <CreatorsPageContent />
    </Suspense>
  );
}

function CreatorsPageContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setQuery(q);
    // Only seed from the URL once on mount — after that, the search box owns its own state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [selectedVerticals, setSelectedVerticals] = useState<string[]>([]);
  const [location, setLocation] = useState(ALL_LOCATIONS);
  const [minFollowers, setMinFollowers] = useState("");
  const [maxFollowers, setMaxFollowers] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredCreators = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const min = minFollowers ? Number(minFollowers) : null;
    const max = maxFollowers ? Number(maxFollowers) : null;
    const minCents = minPrice ? Number(minPrice) * 100 : null;
    const maxCents = maxPrice ? Number(maxPrice) * 100 : null;

    return CREATORS.filter((creator) => {
      if (
        normalizedQuery &&
        !creator.name.toLowerCase().includes(normalizedQuery) &&
        !creator.bio.toLowerCase().includes(normalizedQuery)
      ) {
        return false;
      }
      if (
        selectedVerticals.length > 0 &&
        !creator.verticals.some((vertical) => selectedVerticals.includes(vertical))
      ) {
        return false;
      }
      if (location !== ALL_LOCATIONS && creator.location !== location) {
        return false;
      }
      if (min !== null && creator.followers < min) return false;
      if (max !== null && creator.followers > max) return false;
      if (minCents !== null && creator.pricePerPostCents < minCents) return false;
      if (maxCents !== null && creator.pricePerPostCents > maxCents) return false;
      return true;
    });
  }, [query, selectedVerticals, location, minFollowers, maxFollowers, minPrice, maxPrice]);

  function toggleVertical(vertical: string) {
    setSelectedVerticals((current) =>
      current.includes(vertical) ? current.filter((v) => v !== vertical) : [...current, vertical]
    );
  }

  function clearFilters() {
    setQuery("");
    setSelectedVerticals([]);
    setLocation(ALL_LOCATIONS);
    setMinFollowers("");
    setMaxFollowers("");
    setMinPrice("");
    setMaxPrice("");
  }

  const hasActiveFilters =
    query !== "" ||
    selectedVerticals.length > 0 ||
    location !== ALL_LOCATIONS ||
    minFollowers !== "" ||
    maxFollowers !== "" ||
    minPrice !== "" ||
    maxPrice !== "";

  return (
    <Section>
      <Container className="space-y-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Find creators</h1>
          <p className="mt-3 text-muted-foreground">
            Browse vetted LinkedIn creators by vertical, reach, price, and location.
          </p>
        </div>

        <div className="space-y-4 rounded-lg border border-border bg-card p-4 sm:p-6">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="creator-search"
              name="search"
              placeholder="Search by name or bio..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <div>
            <span className="text-sm font-medium">Vertical</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {VERTICALS.map((vertical) => {
                const active = selectedVerticals.includes(vertical);
                return (
                  <button
                    key={vertical}
                    type="button"
                    onClick={() => toggleVertical(vertical)}
                    aria-pressed={active}
                  >
                    <Badge
                      variant={active ? "default" : "outline"}
                      className={cn("cursor-pointer select-none", !active && "text-muted-foreground")}
                    >
                      {vertical}
                    </Badge>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label htmlFor="creator-location" className="text-sm font-medium">
                Location
              </label>
              <select
                id="creator-location"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value={ALL_LOCATIONS}>{ALL_LOCATIONS}</option>
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <span className="text-sm font-medium">Followers</span>
              <div className="mt-2 flex items-center gap-2">
                <Input
                  id="min-followers"
                  name="minFollowers"
                  type="number"
                  min={0}
                  placeholder="Min"
                  value={minFollowers}
                  onChange={(e) => setMinFollowers(e.target.value)}
                />
                <span className="text-muted-foreground">–</span>
                <Input
                  id="max-followers"
                  name="maxFollowers"
                  type="number"
                  min={0}
                  placeholder="Max"
                  value={maxFollowers}
                  onChange={(e) => setMaxFollowers(e.target.value)}
                />
              </div>
            </div>

            <div>
              <span className="text-sm font-medium">Price per post ($)</span>
              <div className="mt-2 flex items-center gap-2">
                <Input
                  id="min-price"
                  name="minPrice"
                  type="number"
                  min={0}
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <span className="text-muted-foreground">–</span>
                <Input
                  id="max-price"
                  name="maxPrice"
                  type="number"
                  min={0}
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-end">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={clearFilters}
                disabled={!hasActiveFilters}
              >
                <X />
                Clear filters
              </Button>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          {filteredCreators.length} creator{filteredCreators.length === 1 ? "" : "s"} found
        </p>

        {filteredCreators.length > 0 ? (
          <Grid cols={3}>
            {filteredCreators.map((creator) => (
              <Link key={creator.id} href={`/creators/${creator.id}`}>
                <Card className="h-full transition-colors hover:border-primary/50">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                          initialsColor(creator.initials)
                        )}
                      >
                        {creator.initials}
                      </div>
                      <div>
                        <CardTitle>{creator.name}</CardTitle>
                        <CardDescription>{creator.location}</CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {creator.verticals.map((vertical) => (
                        <Badge key={vertical} variant="secondary">
                          {vertical}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{creator.bio}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {formatCompactNumber(creator.followers)} followers
                      </span>
                      <span className="font-semibold">{formatCents(creator.pricePerPostCents)}/post</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </Grid>
        ) : (
          <div className="rounded-lg border border-dashed border-border py-16 text-center">
            <p className="font-medium">No creators match these filters</p>
            <p className="mt-1 text-sm text-muted-foreground">Try widening your search or clearing filters.</p>
            <Button variant="outline" className="mt-4" onClick={clearFilters}>
              Clear filters
            </Button>
          </div>
        )}
      </Container>
    </Section>
  );
}
