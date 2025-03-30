//an icon that swaps colors on hover

import { Icon } from "@iconify/react";
import { useState } from "react";

interface SwapOnHoverIconProps {
  icon: string;
  color: string;
  hoverColor: string;
  iconSize: number;
}

export const SwapOnHoverIcon = ({
  icon,
  color,
  hoverColor,
  iconSize = 40,
}: SwapOnHoverIconProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Icon
      color={isHovered ? hoverColor : color}
      height={iconSize}
      icon={icon}
      width={iconSize}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
};
