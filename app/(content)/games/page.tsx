import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getGameYears } from "@/lib/games";

export const metadata: Metadata = { title: "Games" };

/** Opens the newest year. */
export default async function GamesPage() {
  const [newest] = await getGameYears();
  if (newest) redirect(`/games/${newest.year}`);

  return (
    <section className="relative z-10 flex h-full items-center justify-center p-4">
      <p className="font-outfit text-muted-foreground">
        No games yet. Check back soon!
      </p>
    </section>
  );
}
