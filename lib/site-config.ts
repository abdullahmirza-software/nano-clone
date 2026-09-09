/** Single source of truth for top nav + footer links. Add a route once, it shows up everywhere. */
export const NAV_LINKS = [
  { href: "/creators", label: "Find Creators" },
  { href: "/campaigns/new", label: "Create Campaign" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/pricing", label: "Pricing" },
] as const;

export const FOOTER_LINKS = {
  Product: [
    { href: "/creators", label: "Find Creators" },
    { href: "/campaigns/new", label: "Create a Campaign" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/pricing", label: "Pricing" },
  ],
  Company: [
    { href: "/#how-it-works", label: "How it works" },
    { href: "/#results", label: "Results" },
    { href: "/#faq", label: "FAQ" },
  ],
  Resources: [
    { href: "/#faq", label: "Help center" },
    { href: "/#results", label: "Case studies" },
    { href: "/pricing", label: "Pricing" },
  ],
} as const;

export const SITE_NAME = "Naano";
