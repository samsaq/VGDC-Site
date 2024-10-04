import React, { useState } from "react";

interface FillOnHoverProps {
  fillColor: string;
  children: React.ReactNode;
  className?: string;
  fillSpeed?: string;
}

export const FillOnHover = ({
  fillColor,
  children,
  className = "",
  fillSpeed = "0.1s",
}: FillOnHoverProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0"
        style={{
          transition: `all ${fillSpeed} ease-out`,
          transform: `translateY(${isHovered ? "0%" : "100%"})`,
          backgroundColor: fillColor,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
