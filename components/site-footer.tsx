import Link from "next/link";
import { LogoMark } from "./logo";
import { APP_LOGIN_URL } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <LogoMark size={22} />
          <span>© {new Date().getFullYear()} Furniture OS. All rights reserved.</span>
        </div>
        <nav className="flex flex-wrap gap-5" aria-label="Footer">
          <Link href="/blog" className="hover:text-foreground">
            Blog
          </Link>
          <Link href="/#demo" className="hover:text-foreground">
            Request a demo
          </Link>
          <Link href="/privacy" className="hover:text-foreground">
            Privacy
          </Link>
          <a href={APP_LOGIN_URL} className="hover:text-foreground">
            Log in
          </a>
        </nav>
      </div>
    </footer>
  );
}
