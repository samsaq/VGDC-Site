"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatedContent } from "@/components/animated-content";
import { TeamsSidebar } from "@/components/teams-sidebar";

export interface Team {
  title: string;
  coverImage?: string;
  /** Content beside the cover image, or the whole body when there's no image. */
  lead: ReactNode;
  /** Content below the cover image. */
  rest?: ReactNode;
}

export function TeamsView({ teams }: { teams: Team[] }) {
  const [selected, setSelected] = useState(teams[0]?.title ?? "");
  const team = teams.find((t) => t.title === selected);

  return (
    <section className="relative z-10 flex h-full w-full flex-row overflow-hidden">
      <div className="h-full w-[70px] min-w-[70px] sm:w-auto sm:min-w-[20%] lg:min-w-[18%] xl:min-w-[15%]">
        <TeamsSidebar
          items={teams.map((t) => t.title)}
          selected={selected}
          onSelect={setSelected}
        />
      </div>

      <div className="flex flex-1 flex-col overflow-auto p-4 md:p-6 lg:p-8">
        {!team ? (
          <p className="text-lg md:text-xl lg:text-2xl">No team selected</p>
        ) : (
          <div className="flex h-full w-full flex-col items-center overflow-y-auto">
            <AnimatedContent uniqueKey={team.title}>
              <h2 className="mb-4 w-full text-center text-3xl font-bold text-warning-alternative md:mb-6 md:text-4xl lg:mb-8 lg:text-5xl xl:text-6xl">
                {team.title}
              </h2>

              {team.coverImage ? (
                <>
                  <div className="mb-8 flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-8 lg:gap-10">
                    <div className="order-2 w-full md:order-1 md:flex-1">
                      {team.lead}
                    </div>
                    <div className="relative order-1 mx-auto mb-4 aspect-square w-full max-w-sm shrink-0 md:order-2 md:mx-4 md:mb-0 md:w-64 lg:w-80 xl:w-96">
                      <Image
                        src={team.coverImage}
                        alt={team.title}
                        fill
                        sizes="(min-width: 1280px) 24rem, (min-width: 1024px) 20rem, (min-width: 768px) 16rem, 24rem"
                        className="rounded-2xl object-cover"
                      />
                    </div>
                  </div>
                  {team.rest && <div className="w-full">{team.rest}</div>}
                </>
              ) : (
                <div className="w-full">{team.lead}</div>
              )}
            </AnimatedContent>
          </div>
        )}
      </div>
    </section>
  );
}
