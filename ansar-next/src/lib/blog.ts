/**
 * Blog content loader — file-system based MDX.
 *
 * Posts live in /src/content/blog/*.mdx with YAML frontmatter:
 *
 *   ---
 *   title: "..."
 *   excerpt: "..."
 *   date: 2026-04-20
 *   author: Ansar Mahmood
 *   tags: [HSE, AI]
 *   image: /images/ansar-4.jpeg
 *   ---
 *
 *   Your MDX body here…
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export interface BlogFrontmatter {
  title: string;
  excerpt: string;
  date: string;            // ISO yyyy-mm-dd
  author?: string;
  tags?: string[];
  image?: string;
  featured?: boolean;
}

export interface BlogPost extends BlogFrontmatter {
  slug: string;
  body: string;
  readTime: string;        // "8 min read"
  readMinutes: number;
}

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

function readBlogFile(fileName: string): BlogPost | null {
  const fullPath = path.join(BLOG_DIR, fileName);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  // Accept both .md and .mdx
  const slug = fileName.replace(/\.mdx?$/, "");

  return {
    slug,
    title: String(data.title ?? "Untitled"),
    excerpt: String(data.excerpt ?? ""),
    date: String(data.date ?? ""),
    author: data.author ? String(data.author) : "Ansar Mahmood",
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    image: data.image ? String(data.image) : undefined,
    featured: Boolean(data.featured ?? false),
    body: content,
    readTime: stats.text,
    readMinutes: Math.ceil(stats.minutes),
  };
}

/** All posts, newest first, excludes drafts (files prefixed with `_`). */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter(
      (f) => /\.(md|mdx)$/.test(f) && !f.startsWith("_") && !f.startsWith(".")
    )
    .map((f) => readBlogFile(f))
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export function getPost(slug: string): BlogPost | null {
  for (const ext of [".mdx", ".md"]) {
    const p = readBlogFile(slug + ext);
    if (p) return p;
  }
  return null;
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

/** Format ISO date → "20 April 2026" */
export function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
