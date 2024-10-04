//a vertical column of social media icon links using the SwapOnHoverIcon component in a corner of the page

import { SwapOnHoverIcon } from "@/components/swapOnHoverIcon";

interface SocialMediaColumnProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  icons: {
    icon: string;
    color: string;
    hoverColor: string;
    href: string;
    iconSize: number;
  }[];
}

export const SocialMediaColumn = ({
  position,
  icons,
}: SocialMediaColumnProps) => {
  let positionClass = "";

  switch (position) {
    case "top-left":
      positionClass = "top-0 left-0";
      break;
    case "top-right":
      positionClass = "top-0 right-0";
      break;
    case "bottom-left":
      positionClass = "bottom-0 left-0";
      break;
    case "bottom-right":
      positionClass = "bottom-0 right-0";
      break;
    default:
      positionClass = "top-0 right-0"; //default to top right
  }

  //set iconSize to a default if not provided by mapping over them
  const iconsWithSize = icons.map((icon) => ({
    ...icon,
    iconSize: icon.iconSize || 40,
  }));

  return (
    <div className={`absolute flex flex-col gap-2 p-8 ${positionClass}`}>
      {iconsWithSize.map((icon) => (
        <SwapOnHoverIcon key={icon.href} {...icon} />
      ))}
    </div>
  );
};
