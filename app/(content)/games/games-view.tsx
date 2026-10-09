"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { AnimatedContent } from "@/components/animated-content";
import { DotButton, useDotButton } from "@/components/carousel-dot-button";

export interface Game {
  title: string;
  slug: string;
  coverImage?: string;
  content: ReactNode;
}

const RESUME_DELAY_MS = 5000;

export function GamesView({ games }: { games: Game[] }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [autoplay] = useState(() =>
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true }),
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", containScroll: false },
    [autoplay],
  );
  const { selectedIndex, onDotButtonClick } = useDotButton(emblaApi);

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

  const current = games[selectedIndex];

  return (
    <section className="relative z-10 flex h-full w-full flex-col overflow-hidden md:flex-row">
      {/* Carousel: full width on mobile, 1/2 on tablets, 2/3 on large screens */}
      <div className="flex w-full items-center justify-center md:w-1/2 lg:w-2/3">
        <div className="flex w-full flex-col">
          <div className="relative h-[350px] w-full sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]">
            <div className="h-full w-full overflow-hidden" ref={emblaRef}>
              <div className="flex h-full">
                {games.length === 0 ? (
                  <div className="flex min-w-0 shrink-0 grow-0 basis-full items-center justify-center">
                    <p>No games available</p>
                  </div>
                ) : (
                  games.map((game) => (
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
                            sizes="(min-width: 1024px) 60vw, (min-width: 768px) 45vw, 90vw"
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="flex h-[90%] w-[90%] items-center justify-center rounded-lg bg-gray-200">
                          <p>No image available</p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="flex h-12 items-center justify-center">
            {games.map((game, index) => (
              <DotButton
                key={game.slug}
                selected={index === selectedIndex}
                onClick={() => onDotButtonClick(index)}
                selectedColor="bg-success-alternative"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Game description: below the carousel on mobile, beside it otherwise */}
      <div
        ref={contentRef}
        className="w-full p-4 md:w-1/2 md:overflow-y-auto lg:w-1/3"
      >
        {!current ? (
          <p className="text-center">No games found</p>
        ) : (
          <AnimatedContent uniqueKey={current.slug}>
            <div className="flex items-center justify-center py-6">
              <h1 className="font-outfit text-3xl font-bold text-success-alternative">
                {current.title}
              </h1>
            </div>
            <div className="w-full px-4 font-outfit">{current.content}</div>
          </AnimatedContent>
        )}
      </div>
    </section>
  );
}
