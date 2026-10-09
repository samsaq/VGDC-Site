import Link from "next/link";
import { siteConfig } from "@/config/site";
import { MobileNav } from "@/components/mobile-nav";
import { VGDCBanner } from "@/components/vgdc-banner";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-background/70 backdrop-blur-lg">
      <nav className="flex items-center justify-between px-6 py-2 sm:py-3 md:py-4">
        <Link href="/" aria-label="Home" className="flex items-center">
          <VGDCBanner size="nav" />
        </Link>

        <ul className="hidden items-center gap-4 sm:flex">
          {siteConfig.navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group relative text-base text-foreground transition-opacity hover:opacity-80 sm:text-lg md:text-xl"
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-1 w-0 ${item.bg} transition-all duration-300 ease-in-out group-hover:w-full`}
                />
              </Link>
            </li>
          ))}
        </ul>

        <div className="sm:hidden">
          <MobileNav />
        </div>
      </nav>
    </header>
  );
}
