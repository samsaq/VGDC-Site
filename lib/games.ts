import { getCollection, type Entry } from "@/lib/content";
import { dayKey } from "@/lib/dates";

/** Year bucket for games with no publishedAt; listed after every real year. */
export const UNDATED = "undated";
export const NO_JAM = "Other games";

export interface GameYear {
  /** Four-digit year, or UNDATED. Used as the /games/[year] segment. */
  year: string;
  /** Newest first; jams follow the order of their newest game. */
  games: (Entry & { jam: string })[];
}

/** Published games grouped by year (Arizona time), newest year first. */
export async function getGameYears(): Promise<GameYear[]> {
  const games = await getCollection("games");
  const byYear = new Map<string, GameYear["games"]>();

  for (const game of games) {
    const date = game.publishedAt ? new Date(game.publishedAt) : null;
    const year =
      date && !Number.isNaN(date.getTime())
        ? dayKey(date).slice(0, 4)
        : UNDATED;
    byYear.set(year, [
      ...(byYear.get(year) ?? []),
      { ...game, jam: game.jam || NO_JAM },
    ]);
  }

  return [...byYear]
    .map(([year, games]) => ({ year, games: groupByJam(games) }))
    .sort((a, b) =>
      a.year === UNDATED
        ? 1
        : b.year === UNDATED
          ? -1
          : b.year.localeCompare(a.year),
    );
}

/** Keeps each jam's games together so the carousel moves through one jam at a time. */
function groupByJam(games: GameYear["games"]): GameYear["games"] {
  const jams = new Map<string, GameYear["games"]>();
  for (const game of games) {
    jams.set(game.jam, [...(jams.get(game.jam) ?? []), game]);
  }
  return [...jams.values()].flat();
}

export function yearLabel(year: string): string {
  return year === UNDATED ? "Undated" : year;
}
