import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import Image from "next/image";

// Import VGDC letter SVGs
import VectorC from "@/public/Vector_C.svg";
import VectorD from "@/public/Vector_D.svg";
import VectorG from "@/public/Vector_G.svg";
import VectorV from "@/public/Vector_V.svg";

export const VGDCnavbar = () => {
  return (
    <NextUINavbar
      maxWidth="full"
      position="sticky"
      className="py-2 sm:py-3 md:py-4"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="max-w-fit">
          <NextLink className="flex items-center justify-start" href="/">
            {/* VGDC Banner as home button */}
            <div className="inline-flex flex-row items-center justify-center gap-1 sm:gap-2">
              <Image
                src={VectorV}
                alt="V"
                className="h-[30px] w-[30px] sm:h-[40px] sm:w-[40px] md:h-[50px] md:w-[50px] lg:h-[60px] lg:w-[60px]"
              />
              <Image
                src={VectorG}
                alt="G"
                className="h-[30px] w-[30px] sm:h-[40px] sm:w-[40px] md:h-[50px] md:w-[50px] lg:h-[60px] lg:w-[60px]"
              />
              <Image
                src={VectorD}
                alt="D"
                className="h-[30px] w-[30px] sm:h-[40px] sm:w-[40px] md:h-[50px] md:w-[50px] lg:h-[60px] lg:w-[60px]"
              />
              <Image
                src={VectorC}
                alt="C"
                className="h-[30px] w-[30px] sm:h-[40px] sm:w-[40px] md:h-[50px] md:w-[50px] lg:h-[60px] lg:w-[60px]"
              />
            </div>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex" justify="end">
        <NavbarItem>
          <NextLink
            className={clsx(
              linkStyles({ color: "foreground" }),
              "group relative text-base data-[active=true]:font-medium data-[active=true]:text-primary sm:text-lg md:text-xl",
            )}
            href="/about"
          >
            About
            <span className="absolute -bottom-1 left-0 h-1 w-0 bg-danger-alternative transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </NextLink>
        </NavbarItem>
        <NavbarItem>
          <NextLink
            className={clsx(
              linkStyles({ color: "foreground" }),
              "group relative text-base data-[active=true]:font-medium data-[active=true]:text-primary sm:text-lg md:text-xl",
            )}
            href="/officers"
          >
            Officers
            <span className="absolute -bottom-1 left-0 h-1 w-0 bg-primary-alternative transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </NextLink>
        </NavbarItem>
        <NavbarItem>
          <NextLink
            className={clsx(
              linkStyles({ color: "foreground" }),
              "group relative text-base data-[active=true]:font-medium data-[active=true]:text-primary sm:text-lg md:text-xl",
            )}
            href="/teams"
          >
            Teams
            <span className="absolute -bottom-1 left-0 h-1 w-0 bg-warning-alternative transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </NextLink>
        </NavbarItem>
        <NavbarItem>
          <NextLink
            className={clsx(
              linkStyles({ color: "foreground" }),
              "group relative text-base data-[active=true]:font-medium data-[active=true]:text-primary sm:text-lg md:text-xl",
            )}
            href="/games"
          >
            Games
            <span className="absolute -bottom-1 left-0 h-1 w-0 bg-success-alternative transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </NextLink>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          <NavbarMenuItem>
            <Link href="/about" size="lg" className="text-danger-alternative">
              About
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link
              href="/officers"
              size="lg"
              className="text-primary-alternative"
            >
              Officers
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link href="/teams" size="lg" className="text-warning-alternative">
              Teams
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link href="/games" size="lg" className="text-success-alternative">
              Games
            </Link>
          </NavbarMenuItem>
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
