import "server-only";
import { Resend } from "resend";
import {
  BRAND_COUNTS,
  CURRENT_SYSTEMS,
  ORDER_VOLUMES,
  PAINS,
  STORE_COUNTS,
  TIMELINES,
  labelFor,
  type Lead,
} from "./lead-schema";

/**
 * The owner's inbox lives only in LEAD_NOTIFY_EMAIL on the server. It is never rendered,
 * never shipped to the client bundle, and never appears in a mailto: link.
 */
function config() {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  const from = process.env.LEAD_FROM_ADDRESS ?? "Furniture OS <leads@furniturepos.com>";
  if (!apiKey || !to) return null;
  return { apiKey, to, from };
}

export function leadDeliveryConfigured() {
  return config() !== null;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendLeadEmail(lead: Lead, meta: { ip: string; userAgent: string }) {
  const cfg = config();
  if (!cfg) throw new Error("Lead delivery is not configured (RESEND_API_KEY / LEAD_NOTIFY_EMAIL).");

  const rows: [string, string][] = [
    ["Name", lead.name],
    ["Business", lead.business],
    ["Role", lead.role],
    ["Email", lead.email],
    ["Phone", lead.phone || "—"],
    ["Region", lead.region || "—"],
    ["Stores", labelFor(STORE_COUNTS.map((v) => ({ value: v, label: v })), lead.stores)],
    ["Brands", labelFor(BRAND_COUNTS.map((v) => ({ value: v, label: v })), lead.brands)],
    ["Current system", labelFor(CURRENT_SYSTEMS, lead.system)],
    ["Monthly orders", labelFor(ORDER_VOLUMES, lead.volume)],
    ["Biggest pains", lead.pains.map((p) => labelFor(PAINS, p)).join(", ")],
    ["Timeline", labelFor(TIMELINES, lead.timeline)],
    ["Notes", lead.notes || "—"],
  ];

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<!doctype html><body style="font-family:system-ui,sans-serif;color:#242629">
<h2 style="margin:0 0 12px">New demo request — ${escapeHtml(lead.business)}</h2>
<table cellpadding="6" style="border-collapse:collapse;font-size:14px">
${rows
  .map(
    ([k, v]) =>
      `<tr><td style="color:#5b5f66;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td><td>${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`,
  )
  .join("\n")}
</table>
<p style="color:#8a8f97;font-size:12px;margin-top:16px">Sent from furniturepos.com · ${escapeHtml(meta.ip)} · ${escapeHtml(meta.userAgent.slice(0, 120))}</p>
</body>`;

  const resend = new Resend(cfg.apiKey);
  const { error } = await resend.emails.send({
    from: cfg.from,
    to: cfg.to,
    replyTo: lead.email,
    subject: `Demo request: ${lead.business} (${labelFor(STORE_COUNTS.map((v) => ({ value: v, label: v })), lead.stores)} stores, ${labelFor(TIMELINES, lead.timeline).toLowerCase()})`,
    text,
    html,
  });
  if (error) throw new Error(error.message);
}
