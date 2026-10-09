import Image from "next/image";
import VectorC from "@/public/Vector_C.svg";
import VectorD from "@/public/Vector_D.svg";
import VectorG from "@/public/Vector_G.svg";
import VectorV from "@/public/Vector_V.svg";

const letters = [
  { src: VectorV, alt: "V" },
  { src: VectorG, alt: "G" },
  { src: VectorD, alt: "D" },
  { src: VectorC, alt: "C" },
];

const sizes = {
  hero: {
    gap: "gap-1 sm:gap-2 lg:gap-3 xl:gap-4",
    letter: "h-[65px] w-[65px] sm:h-[125px] sm:w-[150px] md:h-[150px]",
  },
  nav: {
    gap: "gap-1 sm:gap-2",
    letter:
      "h-[30px] w-[30px] sm:h-[40px] sm:w-[40px] md:h-[50px] md:w-[50px] lg:h-[60px] lg:w-[60px]",
  },
};

export function VGDCBanner({ size = "hero" }: { size?: keyof typeof sizes }) {
  const { gap, letter } = sizes[size];
  return (
    <div className={`inline-flex flex-row items-center justify-center ${gap}`}>
      {letters.map(({ src, alt }) => (
        <Image key={alt} src={src} alt={alt} className={letter} priority />
      ))}
    </div>
  );
}
