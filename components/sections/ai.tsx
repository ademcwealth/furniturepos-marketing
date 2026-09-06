import { BrowserFrame } from "../browser-frame";

const cards = [
  {
    verb: "Reads",
    title: "your paperwork",
    body: "Photograph a sales bill, purchase order, packing slip, receipt or terminal batch report. Furniture OS extracts the lines, parties and totals and files it where it belongs.",
  },
  {
    verb: "Sorts",
    title: "your inbox",
    body: "Every inbound email is classified, summarised and matched to the order or PO it belongs to. A shipping notice becomes an incoming shipment. A complaint becomes a service ticket.",
  },
  {
    verb: "Drafts",
    title: "your follow-ups",
    body: "A visit that didn't close gets a six-touch, thirty-day sequence written from the salesperson's notes and the customer's actual objection. It pauses the moment the customer replies.",
  },
  {
    verb: "Answers",
    title: "your questions",
    body: "Ask the assistant what's overdue, who bought the sectional last spring, or how much cash lands next week. It reads the same records your team does, scoped to what you're allowed to see.",
  },
  {
    verb: "Proposes,",
    title: "never executes",
    body: "AI in Furniture OS suggests. A person approves. Every extraction lands in a review queue and every action is a card you confirm, so nothing changes your books unseen.",
    highlight: true,
  },
];

export function AiSection() {
  return (
    <section id="product" className="scroll-mt-24 border-t border-line bg-surface-muted/40">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
        <p className="text-sm font-medium uppercase tracking-wide text-ember">What the AI actually does</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Five verbs. No magic, no black box.
        </h2>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.verb}
              className={`rounded-2xl border p-6 ${
                c.highlight ? "border-ember/50 bg-ember/5 lg:col-span-1" : "border-line bg-surface"
              }`}
            >
              <h3 className="text-lg font-semibold tracking-tight">
                <span className="text-ember">{c.verb}</span> {c.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">{c.body}</p>
            </div>
          ))}
          <div className="hidden rounded-2xl border border-dashed border-line p-6 text-sm leading-6 text-muted lg:block">
            Under the hood: Anthropic Claude models with prompt caching, brand-scoped tools,
            rate limits and an append-only audit log of everything that was proposed and who
            approved it.
          </div>
        </div>
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <BrowserFrame
            src="/screens/review-queue.webp"
            alt="The review queue: a scanned sales bill with extracted lines waiting for approval"
            width={1440}
            height={900}
            caption="A scanned bill, extracted and waiting for a human to approve."
          />
          <BrowserFrame
            src="/screens/assistant.webp"
            alt="The assistant panel answering a question and proposing an action for confirmation"
            width={1440}
            height={900}
            caption="The assistant answers, then proposes. You click confirm."
          />
        </div>
      </div>
    </section>
  );
}
