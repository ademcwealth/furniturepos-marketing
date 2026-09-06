const steps = [
  {
    n: "1",
    title: "Keep your POS, or make Furniture OS the till",
    body: "Stores on a legacy system like Anzio keep writing bills the way they do today; Furniture OS reads the printouts. Stores that are ready switch the till on and get numbering, tax and checkout in one place. Mix and match per store.",
  },
  {
    n: "2",
    title: "Scan, forward or drop your paperwork",
    body: "Take a photo on your phone, forward an email, or post a file in a Slack channel. Furniture OS works out what it is and what it belongs to.",
  },
  {
    n: "3",
    title: "Review, approve, done",
    body: "Extractions and suggestions wait in a queue. Someone glances, fixes anything odd, approves. Orders, POs, shipments and tickets update themselves from there.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 border-t border-line bg-ink text-cream">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
        <p className="text-sm font-medium uppercase tracking-wide text-ember">How it works</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Three steps. No rip-and-replace.
        </h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="rounded-2xl border border-cream/15 p-6">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ember text-sm font-semibold text-white">
                {s.n}
              </span>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm leading-6 text-cream/75">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const trust = [
  {
    title: "Two-factor sign-in, enforced for managers",
    body: "Managers and admins must enrol an authenticator. Everyone else can. Lost phone? An admin resets it with a recovery code.",
  },
  {
    title: "Roles and regions, not one big password",
    body: "Sales associates, supervisors, managers and delivery crews each see their own slice. A delivery role can never manage users.",
  },
  {
    title: "Brand isolation as the first rule",
    body: "Every query is scoped to the brand and store you're allowed to see. It's the invariant the whole codebase is tested against.",
  },
  {
    title: "An audit log that only grows",
    body: "Who proposed it, who approved it, when. Entries are appended, never edited.",
  },
  {
    title: "Backups at a different vendor",
    body: "The database and every uploaded file are copied nightly to storage that is deliberately not where the app runs.",
  },
  {
    title: "A person approves every AI change",
    body: "Models read and suggest. They don't write to your records. That's a design rule, not a setting.",
  },
];

export function Security() {
  return (
    <section id="security" className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-20 sm:py-24">
      <p className="text-sm font-medium uppercase tracking-wide text-ember">Built for trust</p>
      <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
        Your books, your customers, your call.
      </h2>
      <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {trust.map((t) => (
          <div key={t.title}>
            <h3 className="text-base font-semibold tracking-tight">{t.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{t.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function MultiBrand() {
  return (
    <section className="border-t border-line bg-surface-muted/40">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-20 sm:py-24 lg:grid-cols-2">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-ember">Multi-brand, multi-store</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            One login. Every brand. Every store.
          </h2>
        </div>
        <ul className="grid gap-4 text-sm leading-6 text-muted sm:grid-cols-2">
          <li className="rounded-2xl border border-line bg-surface p-5">
            Switch brands from the sidebar or see them all at once.
          </li>
          <li className="rounded-2xl border border-line bg-surface p-5">
            Per-store numbering, timezone and print settings.
          </li>
          <li className="rounded-2xl border border-line bg-surface p-5">
            Regional managers see their region. Owners see everything.
          </li>
          <li className="rounded-2xl border border-line bg-surface p-5">
            Add a brand or a store in Settings, not in a support ticket.
          </li>
        </ul>
      </div>
    </section>
  );
}
