"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { siteConfig } from "@/config/site";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MobileNav({ activeHref }: { activeHref?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger aria-label="Open menu" className="p-2">
        <MenuIcon className="size-6" />
      </SheetTrigger>
      <SheetContent side="top" className="px-6 pt-4 pb-8">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <ul className="mt-8 flex flex-col gap-4">
          {siteConfig.navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={item.href === activeHref ? "page" : undefined}
                className={`relative text-lg ${item.text}`}
              >
                {item.label}
                {item.href === activeHref && (
                  <span
                    className={`absolute -bottom-1 left-0 h-1 w-full ${item.bg}`}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
