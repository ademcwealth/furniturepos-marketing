import Link from "next/link";
import { BrowserFrame } from "../browser-frame";
import { TiltFrame } from "../tilt-frame";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[38rem]"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 0%, rgba(193,96,42,0.16) 0%, rgba(193,96,42,0) 70%)",
        }}
      />
      <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-16 sm:pt-24">
        <p className="text-sm font-medium uppercase tracking-wide text-ember">
          The operating system for furniture retail, built for the AI era
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl">
          Run your furniture business on one system that does the paperwork for you.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
          Furniture OS sells, fulfils and reports for every brand and store you run. Its AI
          reads your bills, sorts your email and drafts your follow-ups, so your team reviews
          instead of retypes.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/#demo"
            className="rounded-full bg-ember px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-ember-deep"
          >
            Request a demo
          </Link>
          <Link
            href="/#how-it-works"
            className="rounded-full border border-line px-6 py-3 text-center text-sm font-medium transition-colors hover:bg-surface-muted"
          >
            See how it works
          </Link>
        </div>
        <TiltFrame className="mt-14">
          <BrowserFrame
            src="/screens/home.webp"
            alt="The Furniture OS home screen: today's deliveries, tasks due, and what changed overnight"
            width={1440}
            height={900}
            priority
          />
        </TiltFrame>
      </div>
    </section>
  );
}
