import React, { useCallback, useEffect, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";

type DotButtonProps = {
  selected: boolean;
  onClick: () => void;
  className?: string;
  selectedColor?: string;
};

export const DotButton: React.FC<DotButtonProps> = ({
  selected,
  onClick,
  className,
  selectedColor = "bg-red-600",
}) => (
  <button
    type="button"
    className={`mx-1.5 h-3 w-3 rounded-full border transition-all duration-300 ${
      selected
        ? `scale-125 ${selectedColor} border-transparent`
        : "border-success-alternative bg-transparent hover:border-success-alternative/70"
    } ${className || ""}`}
    onClick={onClick}
    aria-label={selected ? "Selected slide" : "Go to slide"}
  />
);

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

export const useDotButton = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void,
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      if (onButtonClick) onButtonClick(emblaApi);
    },
    [emblaApi, onButtonClick],
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);

    emblaApi.on("init", onInit).on("reInit", onInit).on("select", onSelect);

    return () => {
      emblaApi
        .off("init", onInit)
        .off("reInit", onInit)
        .off("select", onSelect);
    };
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};
