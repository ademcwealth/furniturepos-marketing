import { z } from "zod";

export const STORE_COUNTS = ["1", "2-3", "4-10", "10+"] as const;
export const BRAND_COUNTS = ["1", "2-3", "4+"] as const;
export const CURRENT_SYSTEMS = [
  { value: "anzio", label: "Anzio" },
  { value: "other-pos", label: "Another furniture POS / ERP" },
  { value: "generic-pos", label: "A generic POS (Lightspeed, Shopify, Square…)" },
  { value: "paper", label: "Spreadsheets and paper" },
  { value: "none", label: "Nothing yet" },
] as const;
export const ORDER_VOLUMES = [
  { value: "lt50", label: "Under 50 orders a month" },
  { value: "50-200", label: "50 to 200" },
  { value: "200-500", label: "200 to 500" },
  { value: "500+", label: "500 or more" },
] as const;
export const PAINS = [
  { value: "retyping", label: "Re-typing bills, POs and invoices" },
  { value: "followups", label: "Follow-ups that fall through the cracks" },
  { value: "deliveries", label: "Scheduling and tracking deliveries" },
  { value: "inventory", label: "Knowing what's in stock and on order" },
  { value: "reporting", label: "Reporting across brands or stores" },
  { value: "commissions", label: "Commissions and month-end" },
  { value: "quotes", label: "Quoting from vendor price lists" },
  { value: "other", label: "Something else" },
] as const;
export const TIMELINES = [
  { value: "now", label: "As soon as possible" },
  { value: "quarter", label: "In the next few months" },
  { value: "exploring", label: "Just exploring" },
] as const;

const enumValues = <T extends readonly { value: string }[]>(items: T) =>
  items.map((i) => i.value) as [T[number]["value"], ...T[number]["value"][]];

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name.").max(120),
  business: z.string().trim().min(2, "Please tell us the business name.").max(160),
  role: z.string().trim().min(2, "What is your role?").max(120),
  email: z.string().trim().email("Please use a valid email address.").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  region: z.string().trim().max(120).optional().or(z.literal("")),
  stores: z.enum(STORE_COUNTS, { message: "How many stores do you run?" }),
  brands: z.enum(BRAND_COUNTS, { message: "How many brands do you sell under?" }),
  system: z.enum(enumValues(CURRENT_SYSTEMS), { message: "What do you run on today?" }),
  volume: z.enum(enumValues(ORDER_VOLUMES), { message: "Roughly how many orders a month?" }),
  pains: z.array(z.enum(enumValues(PAINS))).min(1, "Pick at least one.").max(8),
  timeline: z.enum(enumValues(TIMELINES), { message: "When are you looking to start?" }),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  // Anti-spam. Bots fill the honeypot and submit instantly.
  website: z.string().max(500).optional().or(z.literal("")),
  startedAt: z.coerce.number().int().nonnegative(),
});

export type Lead = z.infer<typeof leadSchema>;
export type LeadField = keyof Lead;

export function labelFor<T extends readonly { value: string; label: string }[]>(
  items: T,
  value: string,
) {
  return items.find((i) => i.value === value)?.label ?? value;
}
