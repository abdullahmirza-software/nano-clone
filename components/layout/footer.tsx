import Link from "next/link";
import { Linkedin } from "lucide-react";
import { Container } from "@/components/layout/container";
import { FOOTER_LINKS, SITE_NAME } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-gradient-to-b from-secondary/50 to-secondary/10">
      <Container className="py-12 pb-28">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                N
              </span>
              {SITE_NAME}
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              The B2B marketplace connecting brands with LinkedIn creators who move the room.
            </p>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Naano on LinkedIn"
              className="mt-4 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-colors hover:bg-muted"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-sm font-semibold">{heading}</h3>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
          &copy; {year} {SITE_NAME}. Demo build — not affiliated with the real Naano.
        </div>
      </Container>
    </footer>
  );
}
