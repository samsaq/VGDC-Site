import Image from "next/image";
import VectorC from "@/public/Vector_C.svg";
import VectorD from "@/public/Vector_D.svg";
import VectorG from "@/public/Vector_G.svg";
import VectorV from "@/public/Vector_V.svg";

interface VGDCBannerProps {
  className?: string;
}

export const VGDCBanner = ({ className }: VGDCBannerProps) => {
  return (
    <div className="inline-flex flex-row items-center justify-center gap-1 sm:gap-2 md:gap-2 lg:gap-3 xl:gap-4">
      <Image
        src={VectorV}
        alt="V"
        className="h-[65px] w-[65px] sm:h-[125px] sm:w-[150px] md:h-[150px] md:w-[150px] lg:h-[150px] lg:w-[150px] xl:h-[150px] xl:w-[150px]"
      />
      <Image
        src={VectorG}
        alt="G"
        className="h-[65px] w-[65px] sm:h-[125px] sm:w-[150px] md:h-[150px] md:w-[150px] lg:h-[150px] lg:w-[150px] xl:h-[150px] xl:w-[150px]"
      />
      <Image
        src={VectorD}
        alt="D"
        className="h-[65px] w-[65px] sm:h-[125px] sm:w-[150px] md:h-[150px] md:w-[150px] lg:h-[150px] lg:w-[150px] xl:h-[150px] xl:w-[150px]"
      />
      <Image
        src={VectorC}
        alt="C"
        className="h-[65px] w-[65px] sm:h-[125px] sm:w-[150px] md:h-[150px] md:w-[150px] lg:h-[150px] lg:w-[150px] xl:h-[150px] xl:w-[150px]"
      />
    </div>
  );
};
