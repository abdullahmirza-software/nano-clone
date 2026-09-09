import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { CreatorBookings } from "@/components/booking/creator-bookings";
import { cn, formatCents, formatCompactNumber, initialsColor } from "@/lib/utils";
import { CREATORS } from "@/lib/mock/creators";

interface CreatorProfilePageProps {
  params: Promise<{ id: string }>;
}

export default async function CreatorProfilePage({ params }: CreatorProfilePageProps) {
  const { id } = await params;
  const creator = CREATORS.find((c) => c.id === id);

  if (!creator) {
    notFound();
  }

  return (
    <Section>
      <Container className="max-w-4xl space-y-8">
        <Button variant="ghost" size="sm" asChild className="-ml-3">
          <Link href="/creators">
            <ArrowLeft />
            Back to creators
          </Link>
        </Button>

        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <div
            className={cn(
              "flex h-20 w-20 shrink-0 items-center justify-center rounded-full text-2xl font-semibold",
              initialsColor(creator.initials)
            )}
          >
            {creator.initials}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{creator.name}</h1>
            <p className="mt-1 text-muted-foreground">{creator.location}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {creator.verticals.map((vertical) => (
                <Badge key={vertical} variant="secondary">
                  {vertical}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex w-full gap-6 border-t border-border pt-4 sm:w-auto sm:gap-8 sm:border-0 sm:pt-0 sm:text-right">
            <div>
              <p className="text-xl font-bold">{formatCompactNumber(creator.followers)}</p>
              <p className="text-xs text-muted-foreground">followers</p>
            </div>
            <div>
              <p className="text-xl font-bold">{formatCents(creator.pricePerPostCents)}</p>
              <p className="text-xs text-muted-foreground">per post</p>
            </div>
          </div>
        </div>

        <CreatorBookings creatorId={creator.id} />

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="posts">Sample Posts</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="font-semibold">About</h2>
                <p className="mt-2 text-sm text-muted-foreground">{creator.bio}</p>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-2xl font-bold">{creator.stats.engagementRate}%</p>
                  <p className="mt-1 text-sm text-muted-foreground">Avg. engagement rate</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-2xl font-bold">{formatCompactNumber(creator.stats.avgViews)}</p>
                  <p className="mt-1 text-sm text-muted-foreground">Avg. views per post</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-2xl font-bold">{creator.stats.postsPerMonth}</p>
                  <p className="mt-1 text-sm text-muted-foreground">Posts per month</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="posts" className="space-y-4">
            {creator.samplePosts.map((post) => (
              <Card key={post.title}>
                <CardContent className="pt-6">
                  <h3 className="font-semibold">{post.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{post.snippet}</p>
                  <p className="mt-3 text-xs font-medium text-primary">{post.engagement}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="stats">
            <Card>
              <CardContent className="pt-6">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-3 text-muted-foreground">Followers</td>
                      <td className="py-3 text-right font-medium">{creator.followers.toLocaleString()}</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 text-muted-foreground">Avg. engagement rate</td>
                      <td className="py-3 text-right font-medium">{creator.stats.engagementRate}%</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 text-muted-foreground">Avg. views per post</td>
                      <td className="py-3 text-right font-medium">{creator.stats.avgViews.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-muted-foreground">Posts per month</td>
                      <td className="py-3 text-right font-medium">{creator.stats.postsPerMonth}</td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Container>
    </Section>
  );
}
