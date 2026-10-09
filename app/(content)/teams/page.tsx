import type { Metadata } from "next";
import { Markdown } from "@/components/markdown";
import { getCollection } from "@/lib/content";
import { TeamsView, type Team } from "./teams-view";

export const metadata: Metadata = { title: "Teams" };

const HEADING = /^#{1,3}\s.+$/gm;
const LEAD_WORDS = 50;

/**
 * Splits a team's markdown into the part shown beside the cover image and the
 * part shown below it: everything before the second heading, or the first
 * 50 words when there are no headings.
 */
function splitBody(body: string): [lead: string, rest: string] {
  const headings = [...body.matchAll(HEADING)];
  if (headings.length > 0) {
    const cut = headings[1]?.index ?? body.length;
    return [body.slice(0, cut), body.slice(cut)];
  }

  const leadMatch = new RegExp(`^(\\s*\\S+){${LEAD_WORDS}}`).exec(body);
  if (!leadMatch || leadMatch[0].length >= body.trimEnd().length) {
    return [body, ""];
  }
  return [leadMatch[0] + "...", body.slice(leadMatch[0].length)];
}

export default async function TeamsPage() {
  const entries = await getCollection("teams");

  const teams: Team[] = entries
    .toSorted((a, b) => a.title.localeCompare(b.title))
    .map((entry) => {
      if (!entry.coverImage) {
        return {
          title: entry.title,
          lead: <Markdown variant="teams">{entry.body}</Markdown>,
        };
      }
      const [lead, rest] = splitBody(entry.body);
      return {
        title: entry.title,
        coverImage: entry.coverImage,
        lead: <Markdown variant="teams">{lead}</Markdown>,
        rest: rest.trim() ? <Markdown variant="teams">{rest}</Markdown> : null,
      };
    });

  return <TeamsView teams={teams} />;
}
