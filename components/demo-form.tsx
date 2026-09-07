"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { submitLead, type LeadState } from "@/app/actions/lead";
import {
  BRAND_COUNTS,
  CURRENT_SYSTEMS,
  ORDER_VOLUMES,
  PAINS,
  STORE_COUNTS,
  TIMELINES,
} from "@/lib/lead-schema";

const initial: LeadState = { status: "idle" };

const inputClass =
  "w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted/70 focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/25";
const labelClass = "block text-sm font-medium";
const errorClass = "mt-1 text-xs text-ember";

function Field({
  label,
  name,
  error,
  children,
  hint,
}: {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
        {hint ? <span className="ml-1 font-normal text-muted">{hint}</span> : null}
      </label>
      <div className="mt-1.5">{children}</div>
      {error ? (
        <p id={`${name}-error`} className={errorClass}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Choice({
  name,
  value,
  label,
  type = "radio",
}: {
  name: string;
  value: string;
  label: string;
  type?: "radio" | "checkbox";
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm transition-colors hover:bg-surface-muted has-checked:border-ember has-checked:bg-ember/5">
      <input type={type} name={name} value={value} className="accent-ember" />
      <span>{label}</span>
    </label>
  );
}

export function DemoForm() {
  const [state, action, pending] = useActionState(submitLead, initial);
  const [step, setStep] = useState<1 | 2>(1);
  const startedAt = useRef(0);
  const errors = state.fieldErrors ?? {};

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // If the server flagged a step-1 field, send the visitor back to it
  // (state adjustment during render, per React's guidance).
  const [seenState, setSeenState] = useState(state);
  if (state !== seenState) {
    setSeenState(state);
    const stepOne = ["name", "business", "role", "email", "phone", "region"];
    if (state.fieldErrors && Object.keys(state.fieldErrors).some((k) => stepOne.includes(k))) {
      setStep(1);
    }
  }

  // Submitting via onSubmit (not the form `action` prop) keeps React from resetting the
  // uncontrolled fields after a validation error, so nobody retypes step 1.
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("startedAt", String(startedAt.current));
    startTransition(() => action(formData));
  }

  if (state.status === "sent") {
    return (
      <div className="rounded-2xl border border-line bg-surface p-8 text-center" role="status">
        <p className="text-lg font-semibold">Thanks, we have your request.</p>
        <p className="mt-2 text-sm text-muted">
          A real person will reply within one business day with a few times for a walkthrough.
          No drip sequence, no auto-dialler.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="relative rounded-2xl border border-line bg-surface p-6 sm:p-8">
      {/* Anti-spam: hidden from humans, irresistible to bots. */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mb-6 flex items-center justify-between text-xs text-muted">
        <span>Step {step} of 2</span>
        <span>{step === 1 ? "About you" : "About your business"}</span>
      </div>

      <div className={step === 1 ? "grid gap-5 sm:grid-cols-2" : "hidden"}>
        <Field label="Your name" name="name" error={errors.name}>
          <input id="name" name="name" autoComplete="name" className={inputClass} required />
        </Field>
        <Field label="Business name" name="business" error={errors.business}>
          <input id="business" name="business" autoComplete="organization" className={inputClass} required />
        </Field>
        <Field label="Your role" name="role" error={errors.role}>
          <input id="role" name="role" placeholder="Owner, GM, operations…" className={inputClass} required />
        </Field>
        <Field label="Work email" name="email" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" className={inputClass} required />
        </Field>
        <Field label="Phone" name="phone" hint="(optional)" error={errors.phone}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={inputClass} />
        </Field>
        <Field label="Where are your stores?" name="region" hint="(city or province/state)" error={errors.region}>
          <input id="region" name="region" className={inputClass} />
        </Field>
        <div className="sm:col-span-2">
          <button
            type="button"
            onClick={() => setStep(2)}
            className="w-full rounded-full bg-ink px-5 py-3 text-sm font-medium text-cream transition-colors hover:bg-ink-soft sm:w-auto dark:bg-cream dark:text-ink"
          >
            Continue
          </button>
        </div>
      </div>

      <div className={step === 2 ? "grid gap-6" : "hidden"}>
        <Field label="How many stores?" name="stores" error={errors.stores}>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {STORE_COUNTS.map((v) => (
              <Choice key={v} name="stores" value={v} label={v} />
            ))}
          </div>
        </Field>
        <Field label="How many brands do you sell under?" name="brands" error={errors.brands}>
          <div className="grid grid-cols-3 gap-2">
            {BRAND_COUNTS.map((v) => (
              <Choice key={v} name="brands" value={v} label={v} />
            ))}
          </div>
        </Field>
        <Field label="What do you run on today?" name="system" error={errors.system}>
          <div className="grid gap-2 sm:grid-cols-2">
            {CURRENT_SYSTEMS.map((o) => (
              <Choice key={o.value} name="system" value={o.value} label={o.label} />
            ))}
          </div>
        </Field>
        <Field label="Roughly how many orders a month?" name="volume" error={errors.volume}>
          <div className="grid gap-2 sm:grid-cols-2">
            {ORDER_VOLUMES.map((o) => (
              <Choice key={o.value} name="volume" value={o.value} label={o.label} />
            ))}
          </div>
        </Field>
        <Field label="What hurts most right now?" name="pains" hint="(pick any)" error={errors.pains}>
          <div className="grid gap-2 sm:grid-cols-2">
            {PAINS.map((o) => (
              <Choice key={o.value} name="pains" value={o.value} label={o.label} type="checkbox" />
            ))}
          </div>
        </Field>
        <Field label="When are you looking to start?" name="timeline" error={errors.timeline}>
          <div className="grid gap-2 sm:grid-cols-3">
            {TIMELINES.map((o) => (
              <Choice key={o.value} name="timeline" value={o.value} label={o.label} />
            ))}
          </div>
        </Field>
        <Field label="Anything else we should know?" name="notes" hint="(optional)" error={errors.notes}>
          <textarea id="notes" name="notes" rows={3} className={inputClass} />
        </Field>

        {state.status === "error" && state.message ? (
          <p className="rounded-xl border border-ember/40 bg-ember/5 px-4 py-3 text-sm" role="alert">
            {state.message}
          </p>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={pending}
            className="rounded-full bg-ember px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-ember-deep disabled:opacity-60"
          >
            {pending ? "Sending…" : "Request a demo"}
          </button>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="text-sm text-muted underline-offset-4 hover:underline"
          >
            Back
          </button>
        </div>
        <p className="text-xs text-muted">
          We use these answers only to prepare your walkthrough. No newsletter, no resale.
        </p>
      </div>
    </form>
  );
}
