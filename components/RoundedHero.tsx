/**
 * RoundedHero is a component that displays a hero text with rounded corners of varying colors on a per-character or per-word basis.
 * The rounding mode can be set to either "per-character" or "per-word".
 * The rounding colors are an array of valid css colors of the same number of characters or words as the hero text.
 */

interface RoundedHeroProps {
  heroText: string;
  textColor: string;
  roundingMode: "per-character" | "per-word";
  roundingColors: string[];
  colorSize: number;
  elementSeperation: number;
  className?: string;
}
//NOTE: rounding colors should be valid css colors, but are not validated at this time
export const RoundedHero = ({
  heroText,
  textColor,
  roundingMode,
  roundingColors,
  colorSize,
  elementSeperation,
  className,
}: RoundedHeroProps) => {
  //validate if the number of rounding colors is equal to the number of characters in the hero text
  if (roundingMode === "per-character") {
    if (roundingColors.length !== heroText.length) {
      throw new Error(
        "The number of rounding colors must be equal to the number of characters in the hero text",
      );
    }
  }
  if (roundingMode === "per-word") {
    if (roundingColors.length !== heroText.split(" ").length) {
      throw new Error(
        "The number of rounding colors must be equal to the number of words in the hero text",
      );
    }
  }

  if (roundingMode === "per-character") {
    return (
      <div className={`rounded-lg p-4 ${className}`}>
        {heroText.split("").map((char, index) => (
          <span
            key={char + index}
            className={`inline-flex items-center justify-center rounded-full text-center`}
            style={{
              backgroundColor: roundingColors[index],
              color: textColor,
              width: colorSize,
              height: colorSize,
              minWidth: colorSize,
              minHeight: colorSize,
              marginRight:
                index === heroText.length - 1 ? 0 : elementSeperation,
            }}
          >
            {char}
          </span>
        ))}
      </div>
    );
  } else if (roundingMode === "per-word") {
    return (
      <div className={`rounded-lg p-4 ${className}`}>
        {heroText.split(" ").map((word, index) => (
          <span
            key={word + index}
            className={`rounded-full`}
            style={{
              backgroundColor: roundingColors[index],
              color: textColor,
              marginRight:
                index === heroText.split(" ").length - 1
                  ? 0
                  : elementSeperation,
            }}
          >
            {word}
          </span>
        ))}
      </div>
    );
  }
};
