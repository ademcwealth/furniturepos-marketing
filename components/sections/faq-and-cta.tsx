import Link from "next/link";
import { DemoForm } from "../demo-form";
import type { PostSummary } from "@/lib/blog";

const faqs = [
  {
    q: "Do I have to replace my POS?",
    a: "No. Many stores start by keeping their current system and letting Furniture OS read the printouts. When a store is ready, you switch it to Furniture OS as the till. It's a per-store setting.",
  },
  {
    q: "How does AI intake stay accurate?",
    a: "Nothing commits without a person approving it. Extractions land in a review queue with the original image beside the extracted fields, low-confidence values are flagged, and unattended items expire rather than pile up.",
  },
  {
    q: "Who can see what?",
    a: "Access is by role and region. A sales associate sees their own sales and commission. A manager sees their stores. A delivery crew sees today's stops. The platform enforces brand isolation on every query.",
  },
  {
    q: "How long does it take to get started?",
    a: "A single store with one brand can be live in days: users, a price list and a scanned bill. Multi-brand groups take longer mostly because of price-list imports, which we do with you.",
  },
  {
    q: "What does it cost?",
    a: "Pricing depends on stores and brands. Request a demo and we'll give you a straight number on the first call, not a quote after three.",
  },
  {
    q: "Does it work on phones and tablets?",
    a: "Yes. Scanning, tasks, the assistant and the delivery-crew console are built for phones. The full workspace runs in any modern browser.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Questions retailers ask first</h2>
      <div className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
        {faqs.map((f) => (
          <details key={f.q} className="group rounded-2xl border border-line bg-surface p-5 open:bg-surface-muted/40">
            <summary className="cursor-pointer list-none text-base font-semibold tracking-tight marker:hidden">
              <span className="mr-2 inline-block text-ember transition-transform group-open:rotate-90">›</span>
              {f.q}
            </summary>
            <p className="mt-3 text-sm leading-6 text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function BlogStrip({ posts }: { posts: PostSummary[] }) {
  if (posts.length === 0) return null;
  return (
    <section className="border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-ember">From the blog</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Furniture industry news, and what technology is doing to it
            </h2>
          </div>
          <Link href="/blog" className="text-sm font-medium text-ember hover:underline">
            All posts →
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="rounded-2xl border border-line bg-surface p-5 transition-colors hover:bg-surface-muted/60"
            >
              <p className="text-xs text-muted">{p.dateLabel}</p>
              <h3 className="mt-2 text-base font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted">{p.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DemoCta() {
  return (
    <section id="demo" className="scroll-mt-24 border-t border-line bg-surface-muted/40">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-20 sm:py-24 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-ember">Request a demo</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            See it running on a store like yours.
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            Two short steps. The second one asks about your stores and what hurts, so the
            walkthrough is about your business rather than a canned tour.
          </p>
          <ul className="mt-6 space-y-2 text-sm leading-6 text-muted">
            <li>· A reply from a person within one business day</li>
            <li>· A 30-minute walkthrough on a demo store</li>
            <li>· A straight answer on price</li>
          </ul>
        </div>
        <DemoForm />
      </div>
    </section>
  );
}
