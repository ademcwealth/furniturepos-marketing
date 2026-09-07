import { BrowserFrame } from "../browser-frame";

const columns = [
  {
    title: "Sell",
    items: [
      "Point of sale with tax, tenders and financing",
      "Visual quotes built from vendor price lists",
      "Multi-manufacturer pricing engine",
      "Warranty plans with attach-rate reporting",
      "Commission by salesperson, down to the order",
      "Sample sign-outs and store credit",
    ],
  },
  {
    title: "Fulfil",
    items: [
      "Purchase orders emailed to suppliers",
      "Incoming shipments and receiving",
      "Special orders with promise dates",
      "Delivery scheduling and printable slips",
      "Service tickets with technicians",
      "A customer tracking page and a field app for crews",
    ],
  },
  {
    title: "Know",
    items: [
      "Revenue, margin and year-over-year",
      "Daily sales summary and terminal reconciliation",
      "Ad spend and return on ad spend",
      "Accounting ledger and receivables aging",
      "Collections: when the cash actually lands",
      "Exports to CSV whenever you want them",
    ],
  },
  {
    title: "Keep",
    items: [
      "Customer 360 across orders, POs and tickets",
      "Segments and templated campaigns",
      "Automated status emails as orders move",
      "Shared tasks with reminders and voice notes",
      "One inbox for every brand's email",
      "Post-delivery review requests",
    ],
  },
];

export function Modules() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
      <p className="text-sm font-medium uppercase tracking-wide text-ember">One system, the whole business</p>
      <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
        From the first quote to the last delivery photo.
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
        Everything below is live today. Nothing is a roadmap slide.
      </p>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-lg font-semibold tracking-tight">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-ember align-middle" />
              {col.title}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm leading-6 text-muted">
              {col.items.map((item) => (
                <li key={item} className="border-l border-line pl-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <BrowserFrame
        src="/screens/quotes.webp"
        alt="The quote workspace: a configured sofa with cover and option pricing and a live total"
        width={1440}
        height={900}
        className="mt-14"
        caption="A quote configured from the vendor's own price list, with the total updating as you go."
      />
    </section>
  );
}
