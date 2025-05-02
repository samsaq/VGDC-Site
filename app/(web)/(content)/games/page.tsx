"use client";

import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useEmblaCarousel from "embla-carousel-react";
import { getGamesData } from "@/lib/actions";
import Autoplay from "embla-carousel-autoplay";
import { DotButton, useDotButton } from "@/components/CarouselDotButton";
import { AnimatedContent } from "@/components/AnimatedContent";

// Define the Game interface
interface Game {
  title: string;
  content: string;
  coverImage?: string;
  slug?: string;
  [key: string]: unknown;
}

export default function Games() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const contentSectionRef = useRef<HTMLDivElement>(null);

  // Create the autoplay plugin inside the component body
  const autoplay = Autoplay({
    delay: 5000,
    stopOnInteraction: true,
    stopOnMouseEnter: true,
  });

  // Initialize Embla carousel with autoplay plugin
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      containScroll: false,
      dragFree: false,
      slidesToScroll: 1,
    },
    [autoplay],
  );

  // Use the dot button hook
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  // Effect to fetch games data
  useEffect(() => {
    async function fetchGamesData() {
      try {
        const data = await getGamesData();
        console.log("Games data:", data); // Add logging to debug
        setGames(data);
      } catch (error) {
        console.error("Error fetching games data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGamesData();
  }, []);

  // Effect to pause autoplay when user is engaging with content
  useEffect(() => {
    if (!emblaApi || !contentSectionRef.current) return;

    const contentSection = contentSectionRef.current;

    const handleUserEngagement = () => {
      emblaApi.plugins().autoplay?.stop();
    };

    const handleUserDisengagement = () => {
      setTimeout(() => {
        emblaApi.plugins().autoplay?.play();
      }, 5000);
    };

    // Add event listeners for user engagement
    contentSection.addEventListener("mouseenter", handleUserEngagement);
    contentSection.addEventListener("touchstart", handleUserEngagement);
    contentSection.addEventListener("scroll", handleUserEngagement);

    // Add event listeners for user disengagement
    contentSection.addEventListener("mouseleave", handleUserDisengagement);
    contentSection.addEventListener("touchend", handleUserDisengagement);

    return () => {
      // Clean up event listeners
      contentSection.removeEventListener("mouseenter", handleUserEngagement);
      contentSection.removeEventListener("touchstart", handleUserEngagement);
      contentSection.removeEventListener("scroll", handleUserEngagement);
      contentSection.removeEventListener("mouseleave", handleUserDisengagement);
      contentSection.removeEventListener("touchend", handleUserDisengagement);
    };
  }, [emblaApi]);

  // Custom components for ReactMarkdown with tailwind styling
  const components = {
    h1: ({ ...props }) => (
      <h1
        className="my-4 text-3xl font-bold text-success-alternative"
        {...props}
      />
    ),
    h2: ({ ...props }) => (
      <h2 className="my-4 text-2xl font-bold text-gray-500" {...props} />
    ),
    h3: ({ ...props }) => (
      <h3 className="my-4 text-xl font-semibold text-gray-500" {...props} />
    ),
    ul: ({ ...props }) => (
      <ul className="mb-4 list-disc space-y-1 pl-5" {...props} />
    ),
    ol: ({ ...props }) => (
      <ol className="mb-4 list-decimal space-y-1 pl-5" {...props} />
    ),
    blockquote: ({ ...props }) => (
      <blockquote
        className="my-4 border-l-4 border-gray-300 pl-4 italic"
        {...props}
      />
    ),
    code: ({ ...props }) => (
      <code
        className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm"
        {...props}
      />
    ),
    pre: ({ ...props }) => (
      <pre
        className="my-4 overflow-x-auto rounded bg-gray-100 p-3 font-mono text-sm"
        {...props}
      />
    ),
    table: ({ ...props }) => (
      <div className="my-4 overflow-x-auto">
        <table
          className="min-w-full divide-y divide-gray-300 text-sm"
          {...props}
        />
      </div>
    ),
    thead: ({ ...props }) => <thead className="bg-gray-100" {...props} />,
    th: ({ ...props }) => (
      <th className="px-3 py-2 text-left font-semibold" {...props} />
    ),
    td: ({ ...props }) => (
      <td className="border-t border-gray-200 px-3 py-2" {...props} />
    ),
    img: ({ ...props }) => (
      <img className="rounded-2xl p-4 align-middle" {...props} />
    ),
    a: ({ ...props }) => (
      <a
        className="underline decoration-success-alternative decoration-2 underline-offset-2 transition-colors hover:text-success-alternative"
        {...props}
      />
    ),
  };

  // Helper to render the game content
  const renderGameContent = () => {
    if (loading) {
      return <p className="text-center">Loading games...</p>;
    }

    if (games.length === 0) {
      return <p className="text-center">No games found</p>;
    }

    const currentGame = games[selectedIndex];

    if (!currentGame) {
      return <p className="text-center">Game not found</p>;
    }

    return (
      <div className="h-full w-full overflow-y-auto">
        <div className="w-full">
          <AnimatedContent uniqueKey={currentGame.slug || selectedIndex}>
            <div className="flex items-center justify-center pb-6 pt-6">
              <h1 className="font-outfit text-3xl font-bold text-success-alternative">
                {currentGame.title}
              </h1>
            </div>

            <div className="prose prose-lg w-full max-w-none px-4 font-outfit">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={components}
              >
                {currentGame.content || ""}
              </ReactMarkdown>
            </div>
          </AnimatedContent>
        </div>
      </div>
    );
  };

  return (
    <section className="relative z-10 flex h-full w-full flex-col overflow-hidden md:flex-row">
      {/* Carousel (full width on mobile, 1/2 on tablets, 2/3 on large screens) */}
      <div className="flex w-full items-center justify-center md:w-1/2 lg:w-2/3">
        <div className="flex w-full flex-col">
          <div className="relative h-[350px] w-full sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]">
            <div className="embla h-full w-full overflow-hidden" ref={emblaRef}>
              <div className="embla__container flex h-full">
                {loading ? (
                  <div className="embla__slide flex min-w-0 flex-shrink-0 flex-grow-0 basis-full items-center justify-center">
                    <p>Loading...</p>
                  </div>
                ) : games.length === 0 ? (
                  <div className="embla__slide flex min-w-0 flex-shrink-0 flex-grow-0 basis-full items-center justify-center">
                    <p>No games available</p>
                  </div>
                ) : (
                  games.map((game, index) => (
                    <div
                      key={game.slug || index}
                      className="embla__slide relative flex min-w-0 flex-shrink-0 flex-grow-0 basis-full items-center justify-center"
                    >
                      <div className="flex h-full w-full items-center justify-center px-4">
                        {game.coverImage ? (
                          <div className="flex h-[90%] w-[90%] items-center justify-center">
                            <img
                              src={game.coverImage}
                              alt={game.title}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                        ) : (
                          <div className="flex h-[90%] w-[90%] items-center justify-center rounded-lg bg-gray-200">
                            <p>No image available</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Dot buttons in separate container */}
          <div className="flex h-12 items-center justify-center">
            {!loading &&
              games.length > 0 &&
              games.map((_, index) => (
                <DotButton
                  key={index}
                  selected={index === selectedIndex}
                  onClick={() => onDotButtonClick(index)}
                  selectedColor="bg-success-alternative"
                />
              ))}
          </div>
        </div>
      </div>

      {/* Game content (full width below carousel on mobile, 1/2 on tablets, 1/3 on large screens) */}
      <div
        ref={contentSectionRef}
        className="w-full p-4 md:w-1/2 md:overflow-y-auto lg:w-1/3"
      >
        {renderGameContent()}
      </div>
    </section>
  );
}
