"use client";

import { useEffect, useRef, useState } from "react";
import { LogoMark } from "./logo";
import { APP_LOGIN_URL } from "@/lib/site";
import { readVisitor, writeVisitor } from "@/lib/visitor";
import { useClientValue } from "@/lib/use-client-value";

function shouldOpenOnLoad(): boolean {
  const params = new URLSearchParams(window.location.search);
  const forced = params.get("login") === "1" || window.location.hash === "#login";
  return forced || readVisitor() === null;
}

/**
 * First-visit chooser: existing users go straight to the app, prospects stay to read.
 * The choice is remembered in localStorage so nobody sees it twice.
 * Reopen it any time with ?login=1 or #login.
 */
export function WelcomeDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const wanted = useClientValue(shouldOpenOnLoad, false);
  const [dismissed, setDismissed] = useState(false);
  const open = wanted && !dismissed;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function choose(kind: "user" | "prospect") {
    writeVisitor(kind);
    setDismissed(true);
    if (kind === "user") window.location.assign(APP_LOGIN_URL);
  }

  return (
    <dialog
      ref={ref}
      aria-labelledby="welcome-title"
      onClose={() => {
        // Esc counts as "learn more" so it never reappears.
        if (readVisitor() === null) writeVisitor("prospect");
        setDismissed(true);
      }}
      className="m-auto w-[min(92vw,30rem)] rounded-3xl border border-line bg-surface p-0 text-foreground shadow-2xl open:animate-[fos-in_160ms_ease-out] motion-reduce:open:animate-none"
    >
      <div className="p-8 sm:p-10">
        <LogoMark size={40} />
        <h2 id="welcome-title" className="mt-5 text-2xl font-semibold tracking-tight">
          Welcome to Furniture OS
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Already use Furniture OS in your store? Head to the app. New here? Take two
          minutes to see what it does.
        </p>
        <div className="mt-7 flex flex-col gap-3">
          <button
            type="button"
            autoFocus
            onClick={() => choose("user")}
            className="rounded-full bg-ink px-5 py-3 text-sm font-medium text-cream transition-colors hover:bg-ink-soft dark:bg-cream dark:text-ink dark:hover:bg-white"
          >
            Log in to the app
          </button>
          <button
            type="button"
            onClick={() => choose("prospect")}
            className="rounded-full border border-line px-5 py-3 text-sm font-medium transition-colors hover:bg-surface-muted"
          >
            Learn about Furniture OS
          </button>
        </div>
        <p className="mt-5 text-xs text-muted">
          We remember your choice on this device. Press Esc to close.
        </p>
      </div>
      <style>{`@keyframes fos-in{from{opacity:0;transform:translateY(6px) scale(.98)}to{opacity:1;transform:none}}`}</style>
    </dialog>
  );
}
