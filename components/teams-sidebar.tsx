"use client";

import { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";

// A fixed 250px list. Below the sm breakpoint it collapses to each item's
// initial; the hamburger opens the full list as an overlay.

const itemBase =
  "flex w-full items-center border-b border-gray-100 font-medium transition-all duration-300 hover:bg-warning-alternative/80 hover:text-white";
const fullItem =
  "min-h-[70px] px-4 py-5 text-left text-lg md:min-h-[80px] md:px-5 md:py-6 md:text-xl lg:min-h-[90px] lg:px-6 lg:py-7 lg:text-2xl";

export function TeamsSidebar({
  items,
  selected,
  onSelect,
}: {
  items: string[];
  selected: string;
  onSelect: (item: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const active = (item: string) =>
    item === selected ? "bg-warning-alternative text-white" : "";

  const fullList = items.map((item) => (
    <button
      key={item}
      type="button"
      onClick={() => {
        onSelect(item);
        setExpanded(false);
      }}
      className={`${itemBase} ${fullItem} ${active(item)}`}
    >
      {item}
    </button>
  ));

  return (
    <nav
      aria-label="Teams"
      className="relative h-full border-t border-gray-100 text-black"
    >
      {/* Desktop: full list */}
      <div className="hidden w-[250px] flex-col border-r border-gray-100 sm:flex">
        {fullList}
      </div>

      {/* Mobile: initials */}
      <div className="flex flex-col border-r border-gray-100 sm:hidden">
        <button
          type="button"
          aria-label="Expand team list"
          onClick={() => setExpanded(true)}
          className="flex justify-center py-4 transition-colors hover:bg-warning-alternative/80 hover:text-white"
        >
          <MenuIcon className="size-7" />
        </button>
        {items.map((item) => (
          <button
            key={item}
            type="button"
            aria-label={item}
            onClick={() => onSelect(item)}
            className={`${itemBase} min-h-[60px] justify-center py-4 text-xl ${active(item)}`}
          >
            {item.charAt(0)}
          </button>
        ))}
      </div>

      {/* Mobile: expanded overlay */}
      {expanded && (
        <div className="absolute inset-y-0 left-0 z-20 flex w-64 flex-col bg-white shadow-xl sm:hidden">
          <button
            type="button"
            aria-label="Collapse team list"
            onClick={() => setExpanded(false)}
            className="flex justify-end px-4 py-4 transition-colors hover:bg-warning-alternative/80 hover:text-white"
          >
            <XIcon className="size-7" />
          </button>
          {fullList}
        </div>
      )}
    </nav>
  );
}
