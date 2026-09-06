const facts = [
  { value: "Every day", label: "used on the sales floor, in the warehouse and on the truck" },
  { value: "10,000+", label: "vendor prices resolved behind a single quote" },
  { value: "11", label: "automations that run every night without anyone asking" },
  { value: "100%", label: "of AI changes reviewed by a person before they commit" },
];

export function TrustStrip() {
  return (
    <section className="border-y border-line bg-surface-muted/60">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <p className="max-w-3xl text-base leading-7 text-muted">
          <span className="font-medium text-foreground">
            Built inside a multi-store, multi-brand furniture retailer,
          </span>{" "}
          not in a software company. The owner runs their own stores on it, and what the
          floor learns each week goes back into the product.
        </p>
        <dl className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.value} className="border-l-2 border-ember/60 pl-4">
              <dt className="text-2xl font-semibold tracking-tight">{f.value}</dt>
              <dd className="mt-1 text-sm leading-6 text-muted">{f.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

const pains = [
  {
    title: "Bills typed twice",
    body: "The sale is written up, then keyed into the POS, then keyed again into a PO, a spreadsheet and an email. Every re-type is a chance to be wrong.",
  },
  {
    title: "Follow-ups forgotten",
    body: "A couple leaves without buying. The salesperson means to call Thursday. Thursday is busy. The sale goes to whoever remembered.",
  },
  {
    title: "Reports stitched by hand",
    body: "Month-end means exporting three systems into one workbook to learn what you sold, what you made and what you owe in commission.",
  },
];

export function Problem() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
      <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
        Furniture retail still runs on paper, re-typing and memory.
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
        Not because retailers are behind. Because the software they were offered was built
        for a different kind of shop. Furniture is special orders, long lead times, big
        tickets, deliveries and vendors with their own price books.
      </p>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {pains.map((p) => (
          <div key={p.title}>
            <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
