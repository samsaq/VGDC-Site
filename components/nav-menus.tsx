import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { MobileNav } from "@/components/mobile-nav";

/** The navbar's desktop links and mobile menu, with `activeHref` marked. */
export function NavMenus({ activeHref }: { activeHref?: string }) {
  return (
    <>
      <ul className="group/nav hidden items-center gap-4 sm:flex">
        {siteConfig.navItems.map((item) => {
          const active = item.href === activeHref;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="group relative text-base text-foreground transition-opacity hover:opacity-80 sm:text-lg md:text-xl"
              >
                {item.label}
                {/* Grows in on hover; stays full width on the current section,
                    and shrinks away while another link is hovered. */}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-1 transition-all duration-300 ease-in-out group-hover:w-full",
                    item.bg,
                    active
                      ? "w-full group-has-[a:not([aria-current]):hover]/nav:w-0"
                      : "w-0",
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="sm:hidden">
        <MobileNav activeHref={activeHref} />
      </div>
    </>
  );
}
