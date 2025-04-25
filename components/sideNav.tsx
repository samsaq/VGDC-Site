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
    <nav className="flex h-full w-full flex-col justify-items-start gap-0 overflow-y-auto sm:text-xl md:text-2xl lg:text-3xl">
      {sortedItems.map((item, index) => (
        <button
          key={item.label}
          onClick={() => handleItemClick(item.label)}
          className={`group relative w-full flex-1 p-2 px-4 text-center sm:p-3 sm:px-6 md:p-4 md:px-8 lg:p-6 lg:px-12 ${
            index !== sortedItems.length - 1 ? "border-b-1 border-black" : "" //so the last item doesn't have a border
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
