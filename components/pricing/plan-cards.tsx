import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const PRICING_PLANS = [
  {
    name: "Self-serve",
    price: "Free to browse",
    description: "Pay only when you book a creator.",
    features: [
      "Unlimited creator search & messaging",
      "10% platform fee per booking, no subscription",
      "Campaign briefs, invites, and tracking included",
      "Cancel or pause anytime",
    ],
    cta: { label: "Get Started", href: "/campaigns/new" },
    featured: true,
  },
  {
    name: "Managed",
    price: "Custom",
    description: "For teams running creator programs at scale.",
    features: [
      "Dedicated creator strategist",
      "Hand-curated creator shortlists per campaign",
      "Multi-campaign reporting & invoicing",
      "Priority creator availability",
    ],
    cta: { label: "Contact Sales", href: "/campaigns/new" },
    featured: false,
  },
] as const;

export function PricingPlanCards() {
  return (
    <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
      {PRICING_PLANS.map((plan) => (
        <Card key={plan.name} className={cn(plan.featured && "border-primary shadow-md")}>
          <CardHeader>
            {plan.featured && (
              <Badge variant="accent" className="w-fit">
                Most popular
              </Badge>
            )}
            <CardTitle className="text-xl">{plan.name}</CardTitle>
            <p className="text-2xl font-bold tracking-tight">{plan.price}</p>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2.5 text-sm">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant={plan.featured ? "default" : "outline"} asChild>
              <Link href={plan.cta.href}>{plan.cta.label}</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
