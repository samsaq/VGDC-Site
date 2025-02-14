import Image from "next/image";
import VectorC from "@/public/Vector_C.svg";
import VectorD from "@/public/Vector_D.svg";
import VectorG from "@/public/Vector_G.svg";
import VectorV from "@/public/Vector_V.svg";

interface VGDCBannerProps {
  className?: string;
  characterSize?: number;
}

export const VGDCBanner = ({
  className,
  characterSize = 100,
}: VGDCBannerProps) => {
  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <Image
        src={VectorV}
        alt="V"
        width={characterSize}
        height={characterSize}
      />
      <Image
        src={VectorG}
        alt="G"
        width={characterSize}
        height={characterSize}
      />
      <Image
        src={VectorD}
        alt="D"
        width={characterSize}
        height={characterSize}
      />
      <Image
        src={VectorC}
        alt="C"
        width={characterSize}
        height={characterSize}
      />
    </div>
  );
};
