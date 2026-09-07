#!/usr/bin/env node
/**
 * Blog post gate, run before `next build`.
 *   - filename is YYYY-MM-DD-slug.md and slug is unique
 *   - frontmatter has title, description, date, tags[], sources[] (each {url,title})
 *   - at least two sources, all https
 *   - no email addresses anywhere in the file
 *   - no customer/store names from the blocklist
 *   - body is 500–1400 words unless `draft: true`
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const dir = path.join(process.cwd(), "content", "blog");
const FILE_RE = /^(\d{4}-\d{2}-\d{2})-([a-z0-9-]+)\.md$/;
const EMAIL_RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
// Names we never publish. Keep this list private to the repo; it is not rendered anywhere.
const BLOCKLIST = ["sleepology"];

let files = [];
try {
  files = await readdir(dir);
} catch {
  console.log("check-posts: no content/blog directory, nothing to check");
  process.exit(0);
}

const errors = [];
const slugs = new Set();

for (const file of files.filter((f) => f.endsWith(".md"))) {
  const m = FILE_RE.exec(file);
  if (!m) {
    errors.push(`${file}: filename must be YYYY-MM-DD-slug.md`);
    continue;
  }
  const slug = m[2];
  if (slugs.has(slug)) errors.push(`${file}: duplicate slug "${slug}"`);
  slugs.add(slug);

  const raw = await readFile(path.join(dir, file), "utf8");
  if (EMAIL_RE.test(raw)) errors.push(`${file}: contains an email address`);
  for (const bad of BLOCKLIST) {
    if (raw.toLowerCase().includes(bad)) errors.push(`${file}: mentions blocklisted name "${bad}"`);
  }

  const { data, content } = matter(raw);
  for (const key of ["title", "description", "date"]) {
    if (!data[key]) errors.push(`${file}: frontmatter missing "${key}"`);
  }
  if (data.title && data.title.length > 90) errors.push(`${file}: title over 90 characters`);
  if (data.description && data.description.length > 200) errors.push(`${file}: description over 200 characters`);
  if (!Array.isArray(data.tags) || data.tags.length === 0) errors.push(`${file}: tags[] required`);
  if (Array.isArray(data.tags) && data.tags.some((t) => !/^[a-z0-9-]+$/.test(String(t)))) {
    errors.push(`${file}: tags must be lowercase-kebab`);
  }
  if (!Array.isArray(data.sources) || data.sources.length < 2) {
    errors.push(`${file}: at least two sources required`);
  } else {
    for (const s of data.sources) {
      if (!s || typeof s.url !== "string" || !s.url.startsWith("https://") || !s.title) {
        errors.push(`${file}: every source needs an https url and a title`);
        break;
      }
    }
  }
  const words = content.split(/\s+/).filter(Boolean).length;
  if (!data.draft && (words < 500 || words > 1400)) {
    errors.push(`${file}: body is ${words} words; expected 500–1400`);
  }
  if (/^#\s/m.test(content)) errors.push(`${file}: use ## for headings; the title is the H1`);
}

if (errors.length) {
  console.error("check-posts: FAILED\n" + errors.map((e) => "  - " + e).join("\n"));
  process.exit(1);
}
console.log(`check-posts: ${slugs.size} post(s) OK`);
