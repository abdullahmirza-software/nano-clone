import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export default function CreatorNotFound() {
  return (
    <Section>
      <Container className="flex max-w-lg flex-col items-center py-20 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Creator not found</h1>
        <p className="mt-3 text-muted-foreground">
          We couldn't find a creator with that profile. They may have been removed, or the link may be incorrect.
        </p>
        <Button className="mt-6" asChild>
          <Link href="/creators">Browse all creators</Link>
        </Button>
      </Container>
    </Section>
  );
}
