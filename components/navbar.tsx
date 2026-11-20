import { Suspense } from "react";
import Link from "next/link";
import { ActiveNavMenus } from "@/components/active-nav-menus";
import { NavMenus } from "@/components/nav-menus";
import { VGDCBanner } from "@/components/vgdc-banner";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-background/70 backdrop-blur-lg">
      <nav className="flex items-center justify-between px-6 py-2 sm:py-3 md:py-4">
        <Link href="/" aria-label="Home" className="flex items-center">
          <VGDCBanner size="nav" />
        </Link>

        {/* Reading the current section suspends on routes whose params are
            only known at request time (e.g. /games/[year]'s shell), so the
            shell shows the same menus with nothing marked. */}
        <Suspense fallback={<NavMenus />}>
          <ActiveNavMenus />
        </Suspense>
      </nav>
    </header>
  );
}
