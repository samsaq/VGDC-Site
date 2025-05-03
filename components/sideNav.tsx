"use client";

import { useState, useEffect } from "react";

interface SideNavProps {
  items: {
    label: string;
  }[];
  colorOnHover?: string; //a hex color
  onItemSelect?: (item: string) => void; // Callback function to communicate selected item
  defaultSelected?: string; // Optional prop to set initially selected item
}

export const SideNav: React.FC<SideNavProps> = ({
  items,
  colorOnHover = "#3F746E",
  onItemSelect,
  defaultSelected,
}) => {
  const [selectedItem, setSelectedItem] = useState<string>(
    (defaultSelected ?? items[0]?.label) || "",
  );
  const [isMinified, setIsMinified] = useState<boolean>(false);

  // Check window size on mount and resize
  useEffect(() => {
    const handleResize = () => {
      setIsMinified(window.innerWidth < 640);
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sortedItems = items.sort((a, b) => a.label.localeCompare(b.label));

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    if (onItemSelect) {
      onItemSelect(item);
    }
  };

  return (
    <nav className="flex h-full w-full flex-col justify-items-start gap-0 overflow-y-auto text-base sm:text-lg md:text-xl lg:text-2xl">
      {sortedItems.map((item, index) => (
        <button
          key={item.label}
          onClick={() => handleItemClick(item.label)}
          className={`group relative w-full flex-1 p-1 px-2 text-center sm:p-2 sm:px-4 md:p-3 md:px-6 lg:p-4 lg:px-8 ${
            index !== sortedItems.length - 1 ? "border-b-1 border-black" : ""
          }`}
          style={{
            transition: "all 0.3s ease-in-out",
          }}
        >
          <span
            className="absolute inset-0 left-0 w-0 group-hover:w-full"
            style={{
              backgroundColor: colorOnHover,
              transition: "width 0.3s ease-in-out",
              width: selectedItem === item.label ? "100%" : "0",
              zIndex: -1,
            }}
          />
          <span
            className="relative z-10 truncate"
            style={{
              color: selectedItem === item.label ? "white" : "inherit",
              transition: "color 0.3s ease-in-out",
            }}
          >
            {isMinified ? item.label.charAt(0) : item.label}
          </span>
        </button>
      ))}
    </nav>
  );
};
