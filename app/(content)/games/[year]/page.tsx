import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import { Markdown } from "@/components/markdown";
import { getGameYears, yearLabel, type GameYear } from "@/lib/games";
import { GamesView } from "../games-view";

// Every year is prerendered; any other year is a 404 (dynamicParams isn't
// available with Cache Components, so unknown years are rejected below).
export async function generateStaticParams() {
  return (await getGameYears()).map(({ year }) => ({ year }));
}

export async function generateMetadata({
  params,
}: PageProps<"/games/[year]">): Promise<Metadata> {
  const { year } = await params;
  return { title: `Games · ${yearLabel(year)}` };
}

// The year comes from the URL, which can't be part of the shell shared by
// every /games/[year] link. So the shell is the year tabs (nothing selected),
// and everything that depends on the year streams in behind Suspense.
export default async function GamesYearPage({
  params,
}: PageProps<"/games/[year]">) {
  const years = await getGameYears();

  return (
    <section className="relative z-10 flex h-full w-full flex-col">
      <Suspense fallback={<YearTabs years={years} />}>
        <YearContent params={params} years={years} />
      </Suspense>
    </section>
  );
}

async function YearContent({
  params,
  years,
}: {
  params: PageProps<"/games/[year]">["params"];
  years: GameYear[];
}) {
  const { year } = await params;
  const current = years.find((y) => y.year === year);
  if (!current) notFound();

  return (
    <>
      <YearTabs years={years} current={year} />
      <div className="min-h-0 flex-1">
        <GamesView
          key={year}
          yearLabel={yearLabel(year)}
          games={current.games.map((game) => ({
            title: game.title,
            slug: game.slug,
            coverImage: game.coverImage,
            jam: game.jam,
            content: <Markdown variant="games">{game.body}</Markdown>,
          }))}
        />
      </div>
    </>
  );
}

/** Second header row: same look as the navbar links, games-green bar. */
function YearTabs({ years, current }: { years: GameYear[]; current?: string }) {
  return (
    <nav
      aria-label="Years"
      className="shrink-0 overflow-x-auto bg-background/70 px-6 backdrop-blur-lg"
    >
      {/* pb leaves room for the bar, which overflow-x would otherwise clip */}
      <ul className="group/years flex w-max items-center gap-4 pt-1 pb-2">
        {years.map(({ year }) => {
          const active = year === current;
          return (
            <li key={year}>
              <Link
                href={`/games/${year}`}
                aria-current={active ? "page" : undefined}
                className="group relative text-base text-nowrap text-foreground transition-opacity hover:opacity-80 sm:text-lg md:text-xl"
              >
                {yearLabel(year)}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-1 bg-success-alternative transition-all duration-300 ease-in-out group-hover:w-full",
                    active
                      ? "w-full group-has-[a:not([aria-current]):hover]/years:w-0"
                      : "w-0",
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
