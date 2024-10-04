import { Icon } from "@iconify/react";
import { useState } from "react";

import { FillOnHover } from "@/components/fillOnHover";

interface FillOnHoverButtonProps {
  text: string;
  icon: string;
  iconColor: string;
  iconColorHover: string;
  fillColor: string;
  fillSpeed?: string;
  iconSize?: number;
  href?: string;
  className?: string; //optional className for custom styles for the outer div
  textClassName?: string; //optional className for custom styles for the text
}

export const FillOnHoverButton = ({
  text,
  icon,
  iconColor,
  iconColorHover,
  fillColor,
  iconSize = 40,
  fillSpeed = "0.1s",
  href,
  className,
  textClassName,
}: FillOnHoverButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <FillOnHover fillColor={fillColor} fillSpeed={fillSpeed}>
        <a className="flex flex-row items-center gap-2 p-2" href={href}>
          <Icon
            color={isHovered ? iconColorHover : iconColor}
            height={iconSize}
            icon={icon}
            width={iconSize}
          />
          <span
            className={textClassName}
            style={{ color: isHovered ? iconColorHover : iconColor }}
          >
            {text}
          </span>
        </a>
      </FillOnHover>
    </div>
  );
};
