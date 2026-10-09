"use client";

import { useCallback, useEffect, useState } from "react";
import type { UseEmblaCarouselType } from "embla-carousel-react";

type EmblaCarouselType = NonNullable<UseEmblaCarouselType[1]>;

export function DotButton({
  selected,
  onClick,
  className = "",
  selectedColor = "bg-red-600",
}: {
  selected: boolean;
  onClick: () => void;
  className?: string;
  selectedColor?: string;
}) {
  return (
    <button
      type="button"
      className={`mx-1.5 h-3 w-3 rounded-full border transition-all duration-300 ${
        selected
          ? `scale-125 ${selectedColor} border-transparent`
          : "border-success-alternative bg-transparent hover:border-success-alternative/70"
      } ${className}`}
      onClick={onClick}
      aria-label={selected ? "Selected slide" : "Go to slide"}
    />
  );
}

export function useDotButton(
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void,
) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      onButtonClick?.(emblaApi);
    },
    [emblaApi, onButtonClick],
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onInit = (api: EmblaCarouselType) =>
      setScrollSnaps(api.scrollSnapList());
    const onSelect = (api: EmblaCarouselType) =>
      setSelectedIndex(api.selectedScrollSnap());

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("init", onInit).on("reInit", onInit).on("select", onSelect);

    return () => {
      emblaApi
        .off("init", onInit)
        .off("reInit", onInit)
        .off("select", onSelect);
    };
  }, [emblaApi]);

  return { selectedIndex, scrollSnaps, onDotButtonClick };
}
