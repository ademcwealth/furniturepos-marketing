import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getPost, getPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: `${SITE_URL}/blog/${post.slug}`,
    author: { "@type": "Organization", name: "Furniture OS" },
    publisher: { "@type": "Organization", name: "Furniture OS" },
  };

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl px-6 py-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Link href="/blog" className="text-sm text-muted hover:text-foreground">
          ← All posts
        </Link>
        <p className="mt-6 text-xs text-muted">
          {post.dateLabel} · {post.readingMinutes} min read
        </p>
        <h1 className="mt-2 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted">{post.description}</p>
        {post.tags.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <Link
                key={t}
                href={`/blog/tags/${t}`}
                className="rounded-full border border-line px-3 py-1 text-xs text-muted hover:bg-surface-muted"
              >
                {t}
              </Link>
            ))}
          </div>
        ) : null}
        <article
          className="prose-fos mt-10"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        {post.sources.length > 0 ? (
          <section className="mt-12 border-t border-line pt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Sources</h2>
            <ol className="mt-3 space-y-1.5 text-sm">
              {post.sources.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    rel="noopener noreferrer nofollow"
                    target="_blank"
                    className="text-ember underline underline-offset-4"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </section>
        ) : null}
        <aside className="mt-14 rounded-2xl border border-line bg-surface-muted/50 p-6">
          <p className="text-base font-semibold tracking-tight">
            Furniture OS is the operating system for furniture retail.
          </p>
          <p className="mt-2 text-sm leading-6 text-muted">
            AI that reads your paperwork and drafts your follow-ups, with a person approving every
            change. See it on a store like yours.
          </p>
          <Link
            href="/#demo"
            className="mt-4 inline-block rounded-full bg-ember px-5 py-2.5 text-sm font-medium text-white hover:bg-ember-deep"
          >
            Request a demo
          </Link>
        </aside>
      </main>
      <SiteFooter />
    </div>
  );
}
