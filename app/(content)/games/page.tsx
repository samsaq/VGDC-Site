import type { Metadata } from "next";
import { Markdown } from "@/components/markdown";
import { getCollection } from "@/lib/content";
import { GamesView } from "./games-view";

export const metadata: Metadata = { title: "Games" };

export default async function GamesPage() {
  const games = await getCollection("games");

  return (
    <GamesView
      games={games.map((game) => ({
        title: game.title,
        slug: game.slug,
        coverImage: game.coverImage,
        content: <Markdown variant="games">{game.body}</Markdown>,
      }))}
    />
  );
}
