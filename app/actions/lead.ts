"use server";

import { headers } from "next/headers";
import { leadSchema, type LeadField } from "@/lib/lead-schema";
import { rateLimit } from "@/lib/rate-limit";
import { leadDeliveryConfigured, sendLeadEmail } from "@/lib/send-lead-email";

export type LeadState = {
  status: "idle" | "sent" | "error";
  message?: string;
  fieldErrors?: Partial<Record<LeadField, string>>;
};

const MIN_FORM_SECONDS = 4;

export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  const raw = {
    name: formData.get("name"),
    business: formData.get("business"),
    role: formData.get("role"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    region: formData.get("region"),
    stores: formData.get("stores"),
    brands: formData.get("brands"),
    system: formData.get("system"),
    volume: formData.get("volume"),
    pains: formData.getAll("pains"),
    timeline: formData.get("timeline"),
    notes: formData.get("notes"),
    website: formData.get("website"),
    startedAt: formData.get("startedAt"),
  };

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: LeadState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as LeadField | undefined;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }
  const lead = parsed.data;

  // Honeypot filled or form submitted faster than a human could: pretend success, send nothing.
  const elapsed = (Date.now() - lead.startedAt) / 1000;
  if ((lead.website && lead.website.length > 0) || elapsed < MIN_FORM_SECONDS) {
    return { status: "sent" };
  }

  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  const userAgent = h.get("user-agent") ?? "";
  if (!rateLimit(`lead:${ip}`)) {
    return {
      status: "error",
      message: "Too many requests from this connection. Please try again in a few minutes.",
    };
  }

  if (!leadDeliveryConfigured()) {
    console.error("[lead] delivery not configured; dropping request from", lead.email);
    return {
      status: "error",
      message: "We couldn't send your request just now. Please try again later.",
    };
  }

  try {
    await sendLeadEmail(lead, { ip, userAgent });
    return { status: "sent" };
  } catch (err) {
    console.error("[lead] send failed", err);
    return {
      status: "error",
      message: "We couldn't send your request just now. Please try again later.",
    };
  }
}
