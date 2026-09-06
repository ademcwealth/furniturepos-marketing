import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getPosts, getTags } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Furniture industry news and what technology is doing to it, written from inside a furniture retailing group.",
};

export default async function BlogIndex() {
  const [posts, tags] = await Promise.all([getPosts(), getTags()]);
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-6 py-16">
        <p className="text-sm font-medium uppercase tracking-wide text-ember">Blog</p>
        <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight">
          Furniture industry news, and what technology is doing to it.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          Short, sourced pieces written from inside a furniture retailing group. What happened,
          why it matters on the floor, and one thing to do about it.
        </p>
        {tags.length > 0 ? (
          <div className="mt-8 flex flex-wrap gap-2">
            {tags.map((t) => (
              <Link
                key={t.tag}
                href={`/blog/tags/${t.tag}`}
                className="rounded-full border border-line px-3 py-1 text-xs text-muted hover:bg-surface-muted"
              >
                {t.tag} · {t.count}
              </Link>
            ))}
          </div>
        ) : null}
        {posts.length === 0 ? (
          <p className="mt-16 text-muted">First post coming shortly.</p>
        ) : (
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-colors hover:bg-surface-muted/60"
                >
                  <p className="text-xs text-muted">
                    {p.dateLabel} · {p.readingMinutes} min read
                  </p>
                  <h2 className="mt-2 text-lg font-semibold tracking-tight">{p.title}</h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted">{p.description}</p>
                  {p.tags.length > 0 ? (
                    <p className="mt-auto pt-4 text-xs text-ember">{p.tags.join(" · ")}</p>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
