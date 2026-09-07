import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getPosts, getTags } from "@/lib/blog";

type Props = { params: Promise<{ tag: string }> };

export async function generateStaticParams() {
  return (await getTags()).map((t) => ({ tag: t.tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  return { title: `Posts tagged ${tag}` };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const posts = (await getPosts()).filter((p) => p.tags.includes(tag));
  if (posts.length === 0) notFound();
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-6 py-16">
        <Link href="/blog" className="text-sm text-muted hover:text-foreground">
          ← All posts
        </Link>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight">
          Tagged <span className="text-ember">{tag}</span>
        </h1>
        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/blog/${p.slug}`}
                className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 hover:bg-surface-muted/60"
              >
                <p className="text-xs text-muted">{p.dateLabel}</p>
                <h2 className="mt-2 text-lg font-semibold tracking-tight">{p.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted">{p.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </div>
  );
}
