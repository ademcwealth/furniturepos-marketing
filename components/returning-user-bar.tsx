"use client";

import { useEffect, useState } from "react";
import { APP_LOGIN_URL } from "@/lib/site";
import { loginBarSeen, markLoginBarSeen, readVisitor } from "@/lib/visitor";
import { useClientValue } from "@/lib/use-client-value";

/** A slim, once-only reminder for visitors who previously chose "Log in". */
export function ReturningUserBar() {
  const eligible = useClientValue(() => readVisitor() === "user" && !loginBarSeen(), false);
  const [dismissed, setDismissed] = useState(false);
  const show = eligible && !dismissed;

  useEffect(() => {
    if (eligible) markLoginBarSeen();
  }, [eligible]);

  if (!show) return null;

  return (
    <div className="bg-ink text-cream">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-2 text-sm">
        <span>
          Heading to the app?{" "}
          <a href={APP_LOGIN_URL} className="font-medium underline underline-offset-4">
            Log in →
          </a>
        </span>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="rounded px-2 py-1 text-cream/80 hover:text-cream"
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </div>
  );
}
