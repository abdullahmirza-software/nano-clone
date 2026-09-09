import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { AICommandBar } from "@/components/layout/ai-command-bar";

export const metadata: Metadata = {
  title: "Naano — The B2B Creator Marketplace",
  description: "Book LinkedIn creators for B2B campaigns. Demo build.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <AICommandBar />
      </body>
    </html>
  );
}
