"use client";

import { useState, useEffect } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  sidebarClasses,
  menuClasses,
} from "react-pro-sidebar";

interface SideNavAltProps {
  items: {
    label: string;
    href?: string;
  }[];
  colorOnHover?: string;
  onItemSelect?: (item: string) => void;
  defaultSelected?: string;
}

export const SideNavAlt: React.FC<SideNavAltProps> = ({
  items,
  colorOnHover = "#3F746E",
  onItemSelect,
  defaultSelected,
}) => {
  const [selectedItem, setSelectedItem] = useState<string>(
    (defaultSelected ?? items[0]?.label) || "",
  );
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [wasManuallyExpanded, setWasManuallyExpanded] =
    useState<boolean>(false);

  // Check window size on mount and resize
  useEffect(() => {
    const handleResize = () => {
      // Only auto-collapse if it wasn't manually expanded
      if (!wasManuallyExpanded) {
        setCollapsed(window.innerWidth < 640);
      }

      // Reset manual flag if we go back to larger screen
      if (window.innerWidth >= 640) {
        setWasManuallyExpanded(false);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [wasManuallyExpanded]);

  const sortedItems = items.sort((a, b) => a.label.localeCompare(b.label));

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    if (onItemSelect) {
      onItemSelect(item);
    }
  };

  const handleExpand = () => {
    setCollapsed(false);
    setWasManuallyExpanded(true);
  };

  return (
    <div className="h-full border-t border-gray-100">
      <Sidebar
        collapsed={collapsed}
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            height: "100%",
            color: "black",
            backgroundColor: "white",
          },
        }}
      >
        <Menu
          menuItemStyles={{
            button: ({ active }) => ({
              backgroundColor: active ? colorOnHover : undefined,
              color: active ? "white" : undefined,
              "&:hover": {
                backgroundColor: colorOnHover,
                color: "white",
                opacity: "0.8",
              },
              transition: "all 0.3s ease",
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: collapsed ? "center" : "flex-start",
              alignItems: "center",
            }),
          }}
          rootStyles={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            [`.${menuClasses.button}`]: {
              padding: collapsed ? "16px 0" : "20px 16px",
              borderRadius: "0",
              fontWeight: "500",
              fontSize: collapsed ? "1.25rem" : "1.125rem",
              textAlign: collapsed ? "center" : "left",
              minHeight: collapsed ? "60px" : "70px",
              lineHeight: "1.2",
              display: "flex",
              alignItems: "center",
              width: "100%",
              "@media (min-width: 768px)": {
                fontSize: collapsed ? "1.5rem" : "1.25rem",
                padding: collapsed ? "20px 0" : "24px 20px",
                minHeight: collapsed ? "70px" : "80px",
              },
              "@media (min-width: 1024px)": {
                fontSize: collapsed ? "1.75rem" : "1.5rem",
                padding: collapsed ? "22px 0" : "28px 24px",
                minHeight: collapsed ? "80px" : "90px",
              },
            },
            [`.${menuClasses.subMenuContent}`]: {
              backgroundColor: "white",
            },
            [`.${menuClasses.menuItemRoot}`]: {
              flexGrow: "1",
              display: "flex",
              width: "100%",
            },
          }}
        >
          {collapsed && (
            <MenuItem
              onClick={handleExpand}
              className="flex w-full items-center justify-center px-0 py-4"
              style={{ flexGrow: 0 }}
            >
              <div className="flex w-full justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mx-auto"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </div>
            </MenuItem>
          )}

          {!collapsed && wasManuallyExpanded && (
            <MenuItem
              onClick={() => setCollapsed(true)}
              className="flex justify-end py-4"
              style={{ flexGrow: 0 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </MenuItem>
          )}

          {sortedItems.map((item) => (
            <MenuItem
              key={item.label}
              active={selectedItem === item.label}
              onClick={() => handleItemClick(item.label)}
              className="w-full border-b border-gray-100"
            >
              {collapsed ? (
                <span className="mx-auto block w-full text-center font-medium">
                  {item.label.charAt(0)}
                </span>
              ) : (
                <span className="font-medium">{item.label}</span>
              )}
            </MenuItem>
          ))}
        </Menu>
      </Sidebar>
    </div>
  );
};
