"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { NavMenus } from "@/components/nav-menus";

/** NavMenus with the current section marked. Rendered from the (content)
 * layout, so the selected segment is the section ("games", "events", …). */
export function ActiveNavMenus() {
  const segment = useSelectedLayoutSegment();
  return <NavMenus activeHref={segment ? `/${segment}` : undefined} />;
}
