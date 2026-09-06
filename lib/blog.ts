import "server-only";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostSource = { url: string; title: string };

export type PostSummary = {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  dateLabel: string;
  tags: string[];
  readingMinutes: number;
};

export type Post = PostSummary & {
  html: string;
  sources: PostSource[];
};

type Frontmatter = {
  title: string;
  description: string;
  date: string | Date;
  tags?: string[];
  sources?: PostSource[];
  draft?: boolean;
};

const FILE_RE = /^(\d{4}-\d{2}-\d{2})-([a-z0-9-]+)\.md$/;

function toDateString(d: string | Date) {
  return d instanceof Date ? d.toISOString().slice(0, 10) : String(d).slice(0, 10);
}

export function formatDate(date: string) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

function readingMinutes(markdown: string) {
  const words = markdown.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

async function loadAll(): Promise<Post[]> {
  let files: string[] = [];
  try {
    files = await readdir(BLOG_DIR);
  } catch {
    return [];
  }
  const posts: Post[] = [];
  for (const file of files) {
    const m = FILE_RE.exec(file);
    if (!m) continue;
    const raw = await readFile(path.join(BLOG_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const fm = data as Frontmatter;
    if (fm.draft) continue;
    const date = toDateString(fm.date ?? m[1]);
    posts.push({
      slug: m[2],
      title: fm.title,
      description: fm.description,
      date,
      dateLabel: formatDate(date),
      tags: fm.tags ?? [],
      sources: fm.sources ?? [],
      readingMinutes: readingMinutes(content),
      html: await marked.parse(content, { gfm: true }),
    });
  }
  return posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export async function getPosts(): Promise<PostSummary[]> {
  return (await loadAll()).map((p) => {
    const { html: _html, sources: _sources, ...summary } = p;
    void _html;
    void _sources;
    return summary;
  });
}

export async function getPost(slug: string): Promise<Post | null> {
  return (await loadAll()).find((p) => p.slug === slug) ?? null;
}

export async function getTags(): Promise<{ tag: string; count: number }[]> {
  const counts = new Map<string, number>();
  for (const p of await loadAll()) for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts].map(([tag, count]) => ({ tag, count })).sort((a, b) => b.count - a.count);
}
