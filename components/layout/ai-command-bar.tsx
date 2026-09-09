"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Loader2, MessageCircle, Search } from "lucide-react";

const PLACEHOLDERS = [
  "What can I help you find?",
  "Find creators for a fintech launch",
  "What would you like to see?",
  "Draft a campaign brief",
];

/**
 * Sitewide floating AI search bar, matched to naano.com's fixed bottom command bar.
 * Functional (not decorative): submitting routes to the creator directory with the
 * typed query applied as a search filter.
 */
export function AICommandBar() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [minimized, setMinimized] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const query = value.trim();
    if (!query) {
      inputRef.current?.focus();
      return;
    }
    router.push(`/creators?q=${encodeURIComponent(query)}`);
    setValue("");
  }

  if (minimized) {
    return (
      <button
        type="button"
        onClick={() => setMinimized(false)}
        aria-label="Expand Naano AI assistant"
        className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-muted-foreground/40 text-background shadow-lg transition-colors hover:bg-muted-foreground/60 sm:bottom-6 sm:right-6"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 mx-auto flex w-[calc(100%-2rem)] max-w-md flex-col items-center gap-1 sm:bottom-6">
      <button
        type="button"
        onClick={() => setMinimized(true)}
        aria-label="Minimize Naano AI assistant"
        className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background/95 text-muted-foreground shadow-sm backdrop-blur transition-colors hover:bg-muted"
      >
        <ChevronDown className="h-4 w-4" />
      </button>

      <form
        onSubmit={handleSubmit}
        className="flex w-full items-center gap-2 rounded-full border border-border bg-background/95 px-3 py-2 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/85"
        role="search"
        aria-label="Ask Naano AI"
      >
        <Loader2 className="h-4 w-4 shrink-0 animate-spin text-muted-foreground [animation-duration:2.5s]" />
        <input
          ref={inputRef}
          id="ai-command-bar-input"
          name="ai-query"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={PLACEHOLDERS[placeholderIndex]}
          className="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          aria-label="Ask Naano AI"
        />
        <button
          type="submit"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-accent"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
