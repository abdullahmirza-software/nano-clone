import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PricingPlanCards } from "@/components/pricing/plan-cards";
import { ROICalculator } from "@/components/pricing/roi-calculator";

export default function PricingPage() {
  return (
    <>
      <Section className="pb-8">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Simple, usage-based pricing</h1>
            <p className="mt-3 text-muted-foreground">No subscription. Pay the creator's rate plus a flat fee.</p>
          </div>

          <div className="mt-10">
            <PricingPlanCards />
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Estimate your ROI</h2>
            <p className="mt-3 text-muted-foreground">
              Adjust the numbers to your business — every step of the math is shown below.
            </p>
          </div>

          <div className="mt-10">
            <ROICalculator />
          </div>
        </Container>
      </Section>
    </>
  );
}
