//A button that swaps between two colors when hovered, has an icon and text like the fillOnHoverButton but it doesn't fill in

import { Icon } from "@iconify/react";
import { useState } from "react";

interface SwapOnHoverButtonProps {
  color: string;
  hoverColor: string;
  icon: string;
  text: string;
  href?: string;
  iconSize?: number;
  className?: string;
  textClassName?: string;
}

export const SwapOnHoverButton = ({
  color,
  hoverColor,
  icon,
  text,
  href,
  iconSize = 40,
  className,
  textClassName,
}: SwapOnHoverButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const commonProps = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };

  const content = (
    <div
      className={`z-10 flex flex-row items-center justify-center gap-2 rounded-md p-3 ${className}`}
      style={{
        backgroundColor: isHovered ? color : hoverColor,
      }}
    >
      <Icon
        color={isHovered ? hoverColor : color}
        height={iconSize}
        icon={icon}
        width={iconSize}
      />
      <span
        className={`${textClassName}`}
        style={{ color: isHovered ? hoverColor : color }}
      >
        {text}
      </span>
    </div>
  );

  return href ? (
    <a href={href} {...commonProps}>
      {content}
    </a>
  ) : (
    <span {...commonProps}>{content}</span>
  );
};
