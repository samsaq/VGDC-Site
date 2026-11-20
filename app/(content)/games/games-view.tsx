"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import { AnimatedContent } from "@/components/animated-content";
import { DotButton, useDotButton } from "@/components/carousel-dot-button";

export interface Game {
  title: string;
  slug: string;
  coverImage?: string;
  jam: string;
  content: ReactNode;
}

const RESUME_DELAY_MS = 5000;

/**
 * One year's games: carousel + description. Stacked on tall screens, side by
 * side on `wide:` ones (see the variant in globals.css). The jam chips pick
 * which jam's games the carousel holds; it never scrolls between jams.
 */
export function GamesView({
  games,
  yearLabel,
}: {
  games: Game[];
  yearLabel: string;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [autoplay] = useState(() =>
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true }),
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", containScroll: false },
    [autoplay],
  );
  const { selectedIndex, onDotButtonClick } = useDotButton(emblaApi);

  // Games arrive grouped by jam; the carousel only ever holds one jam's games.
  const jams = useMemo(() => {
    const result: { name: string; games: Game[] }[] = [];
    for (const game of games) {
      const last = result.at(-1);
      if (last?.name === game.jam) last.games.push(game);
      else result.push({ name: game.jam, games: [game] });
    }
    return result;
  }, [games]);
  const [activeJam, setActiveJam] = useState(jams[0]?.name);
  const slides = jams.find((j) => j.name === activeJam)?.games ?? [];

  // Swapping jams replaces the slides: re-measure them and start from the
  // jam's first game with a fresh autoplay timer.
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
    emblaApi.scrollTo(0, true);
    emblaApi.plugins().autoplay?.reset();
  }, [emblaApi, activeJam]);

  // Pause autoplay while the visitor is reading the game description, and
  // resume a few seconds after they leave it.
  useEffect(() => {
    const section = contentRef.current;
    if (!emblaApi || !section) return;

    let resumeTimer: ReturnType<typeof setTimeout> | undefined;
    const pause = () => {
      clearTimeout(resumeTimer);
      emblaApi.plugins().autoplay?.stop();
    };
    const resume = () => {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(
        () => emblaApi.plugins().autoplay?.play(),
        RESUME_DELAY_MS,
      );
    };

    const engage = ["mouseenter", "touchstart", "scroll"] as const;
    const disengage = ["mouseleave", "touchend"] as const;
    engage.forEach((e) => section.addEventListener(e, pause));
    disengage.forEach((e) => section.addEventListener(e, resume));

    return () => {
      clearTimeout(resumeTimer);
      engage.forEach((e) => section.removeEventListener(e, pause));
      disengage.forEach((e) => section.removeEventListener(e, resume));
    };
  }, [emblaApi]);

  const current = slides[selectedIndex] ?? slides[0];

  return (
    <div className="flex h-full w-full flex-col">
      {/* Third header row (under the year tabs): quieter text, thin bar. */}
      <div className="shrink-0 overflow-x-auto border-b border-gray-100 bg-background/70 px-6 backdrop-blur-lg">
        <ul className="group/jams flex w-max items-center pt-1 pb-2.5 text-sm sm:text-base">
          {jams.map((jam, i) => {
            const active = jam.name === activeJam;
            return (
              <li key={jam.name} className="flex items-center">
                {i > 0 && (
                  <span aria-hidden className="px-2.5 text-muted-foreground">
                    ·
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setActiveJam(jam.name)}
                  aria-pressed={active}
                  className={cn(
                    "group relative text-nowrap transition-colors",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {jam.name}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-success-alternative transition-all duration-300 ease-in-out group-hover:w-full",
                      active
                        ? "w-full group-has-[button[aria-pressed=false]:hover]/jams:w-0"
                        : "w-0",
                    )}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex min-h-0 flex-1 flex-col wide:flex-row fold-x:flex-row! fold-y:flex-col!">
        {/* Carousel column: fixed share of the height when stacked, fills the
          remaining width when side by side. With a hinge reported, it fills
          the first screen half and the description (sized to the second
          half) takes the other. */}
        <div className="flex shrink-0 flex-col wide:min-h-0 wide:flex-1 fold-y:min-h-0 fold-y:flex-1">
          <div className="h-[38dvh] wide:h-auto wide:min-h-0 wide:flex-1 fold-y:h-auto fold-y:min-h-0 fold-y:flex-1">
            <div className="h-full w-full overflow-hidden" ref={emblaRef}>
              <div className="flex h-full">
                {slides.map((game) => (
                  <div
                    key={game.slug}
                    className="flex min-w-0 shrink-0 grow-0 basis-full items-center justify-center px-4"
                  >
                    {game.coverImage ? (
                      <div className="relative h-[90%] w-[90%]">
                        <Image
                          src={game.coverImage}
                          alt={game.title}
                          fill
                          sizes="(min-aspect-ratio: 4/5) and (min-width: 40rem) 60vw, 90vw"
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="flex h-[90%] w-[90%] items-center justify-center rounded-lg bg-muted">
                        <p className="font-outfit text-muted-foreground">
                          No image available
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dots for the selected jam only */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 px-4 py-3">
            {slides.map((game, i) => (
              <DotButton
                key={game.slug}
                selected={game === current}
                onClick={() => onDotButtonClick(i)}
                selectedColor="bg-success-alternative"
              />
            ))}
          </div>
        </div>

        {/* Description: below the carousel when stacked, beside it otherwise */}
        <div
          ref={contentRef}
          className={cn(
            "min-h-0 flex-1 overflow-y-auto p-4",
            // Near-square screens split 50/50 so each panel sits on one half of
            // an unfolded foldable; clearly wider screens give the carousel more.
            "wide:w-1/2 wide:flex-none widescreen:w-[max(20rem,33%)]",
            "fold-x:ml-(--fold-hinge) fold-x:w-(--fold-second)!",
            "fold-y:mt-(--fold-hinge) fold-y:h-(--fold-second) fold-y:w-full! fold-y:flex-none",
          )}
        >
          {current && (
            <AnimatedContent uniqueKey={current.slug}>
              <div className="flex flex-col items-center gap-1 py-4 text-center font-outfit">
                <p className="text-sm font-semibold tracking-wide text-success-alternative uppercase">
                  {current.jam} · {yearLabel}
                </p>
                <h1 className="text-3xl font-bold text-success-alternative">
                  {current.title}
                </h1>
              </div>
              <div className="w-full px-4 font-outfit">{current.content}</div>
            </AnimatedContent>
          )}
        </div>
      </div>
    </div>
  );
}
