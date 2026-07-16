const features = [
  {
    title: "AI document intake",
    description:
      "Scan a printed sales bill or purchase order and Furniture OS extracts the line items, prices, and customer details automatically. Every extraction goes through human review before anything commits — nothing hits your records unverified.",
  },
  {
    title: "Order tracking & customer emails",
    description:
      "Track every customer order end to end with carrier and shipment tracking numbers, and send automated status emails as orders move — no more manually chasing updates or typing out the same email twice.",
  },
  {
    title: "Purchase order generation",
    description:
      "Generate clean purchase orders and email them straight to your suppliers, without re-keying anything that's already in the system.",
  },
  {
    title: "Cross-brand sales dashboard",
    description:
      "If you run more than one furniture brand, see sales performance across all of them in one dashboard — no more stitching together separate reports by hand.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      {/* Header */}
      <header className="border-b border-zinc-100 dark:border-zinc-900">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-5">
          <span className="text-lg font-semibold tracking-tight">
            Furniture OS
          </span>
          <a
            href="https://app.furniturepos.com/login"
            className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium tracking-tight transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900"
          >
            Log in
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-20 pt-20 sm:pb-28 sm:pt-28">
        <p className="text-sm font-medium uppercase tracking-wide text-amber-700 dark:text-amber-500">
          For furniture retailers running on Anzio
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl sm:leading-tight">
          The operations layer your Anzio ERP was never going to give you.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Anzio has no API — data only gets in by someone retyping it from a
          printed sales bill or purchase order. Furniture OS sits downstream
          of Anzio and takes the manual work out of running the business day
          to day: document intake, order tracking, purchase orders, and
          reporting across every brand you run.
        </p>
      </section>

      {/* Features */}
      <section className="border-t border-zinc-100 bg-zinc-50 dark:border-zinc-900 dark:bg-zinc-900/40">
        <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-24">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            What it does
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Four capabilities, built specifically for the way furniture
            retailers already work.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <h3 className="text-lg font-semibold tracking-tight">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-zinc-100 dark:border-zinc-900">
        <div className="mx-auto w-full max-w-5xl px-6 py-8 text-sm text-zinc-500 dark:text-zinc-500">
          © {new Date().getFullYear()} Furniture OS. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
