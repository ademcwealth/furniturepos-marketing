import Link from "next/link";
import { Logo } from "./logo";
import { APP_LOGIN_URL, NAV_LINKS } from "@/lib/site";
import { ReturningUserBar } from "./returning-user-bar";

export function SiteHeader() {
  return (
    <>
      <ReturningUserBar />
      <header className="sticky top-0 z-40 border-b border-line bg-background/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Logo />
          <nav className="hidden items-center gap-7 text-sm text-muted md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={APP_LOGIN_URL}
              className="rounded-full border border-line px-4 py-2 text-sm font-medium transition-colors hover:bg-surface-muted"
            >
              Log in
            </a>
            <Link
              href="/#demo"
              className="hidden rounded-full bg-ember px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-ember-deep sm:inline-block"
            >
              Request a demo
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
