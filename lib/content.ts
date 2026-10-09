import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { cacheLife } from "next/cache";
import { parse } from "yaml";

// Markdown content edited through Pages CMS (see .pages.yml). Files only
// change via git commits, which trigger a redeploy, so results are cached for
// the life of the build.

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Collection = "about" | "games" | "teams" | "officers";

export interface Entry {
  slug: string;
  title: string;
  description?: string;
  coverImage?: string;
  publishedAt?: string;
  body: string;
}

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

function parseEntry(file: string, raw: string): Entry | null {
  const match = FRONTMATTER.exec(raw);
  const data = (match ? parse(match[1]) : {}) ?? {};
  if (data.status && data.status !== "published") return null;

  return {
    slug: data.slug || path.basename(file, ".md"),
    title: data.title ?? "",
    description: data.description || undefined,
    coverImage: data.coverImage || undefined,
    publishedAt: data.publishedAt ? String(data.publishedAt) : undefined,
    body: match ? raw.slice(match[0].length) : raw,
  };
}

/** Published entries in a collection, newest first. */
export async function getCollection(name: Collection): Promise<Entry[]> {
  "use cache";
  cacheLife("max");

  const dir = path.join(CONTENT_DIR, name);
  const files = (await readdir(dir)).filter((f) => f.endsWith(".md"));
  const entries = await Promise.all(
    files.map(async (f) =>
      parseEntry(f, await readFile(path.join(dir, f), "utf8")),
    ),
  );

  return entries
    .filter((e): e is Entry => e !== null)
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
}
