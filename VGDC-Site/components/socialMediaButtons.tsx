//a vertical column or horizontal row of social media icon links using the SwapOnHoverIcon component in a corner of the page

import { SwapOnHoverIcon } from "@/components/swapOnHoverIcon";

interface SocialMediaButtonsProps {
  position:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "external";
  direction?: "row" | "column";
  icons: {
    icon: string;

    color: string;
    hoverColor: string;
    href: string;
    iconSize: number;
  }[];
}

export const SocialMediaButtons = ({
  position,
  direction = "column",
  icons,
}: SocialMediaButtonsProps) => {
  let positionClass = "";

  switch (position) {
    case "top-left":
      positionClass = "absolute top-0 left-0";
      break;
    case "top-right":
      positionClass = "absolute top-0 right-0";
      break;
    case "bottom-left":
      positionClass = "absolute bottom-0 left-0";
      break;
    case "bottom-right":
      positionClass = "absolute bottom-0 right-0";
      break;
    case "external":
      positionClass = "block"; //for external links, don't position the buttons
      break;
    default:
      positionClass = "absolute top-0 right-0"; //default to top right
  }

  //set iconSize to a default if not provided by mapping over them
  const iconsWithSize = icons.map((icon) => ({
    ...icon,
    iconSize: icon.iconSize || 40,
  }));

  return (
    <div
      className={`flex ${direction === "column" ? "flex-col" : "flex-row"} gap-2 p-8 ${positionClass}`}
    >
      {iconsWithSize.map((icon) => (
        <SwapOnHoverIcon key={icon.href} {...icon} />
      ))}
    </div>
  );
};
