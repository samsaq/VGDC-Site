import Link from "next/link";
import { siteConfig } from "@/config/site";
import { SocialLinks } from "@/components/social-links";
import { VGDCBanner } from "@/components/vgdc-banner";

export default function Home() {
  return (
    <>
      {/* Rotated, endlessly scrolling controller-pattern background */}
      <div
        className="fixed top-[-25vh] left-[-25vh] h-[200vh] w-[200vw]"
        style={{ transform: "rotate(-25deg) scale(1.5)" }}
      >
        <div
          className="h-full w-full animate-scrolling-bg"
          style={{
            backgroundImage: 'url("/VGDC_Controller_Background_Image.png")',
            backgroundSize: "600px",
            willChange: "transform",
          }}
        />
      </div>

      <section className="relative z-10 flex h-full flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="flex flex-col items-center justify-center rounded-[64px] bg-secondary-alternative p-8 shadow-2xl">
          <h1 className="flex w-full flex-row justify-center py-4">
            <VGDCBanner />
          </h1>
          <span className="text-center font-poppins text-3xl text-secondary-foreground">
            Video Game Development Club
          </span>
          <span className="py-2 text-center font-poppins text-2xl font-semibold text-primary">
            We make games
          </span>
        </div>

        <div className="flex flex-row flex-wrap items-center justify-center gap-4 pt-3 sm:flex-nowrap">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full bg-secondary-alternative px-4 py-2 font-poppins text-2xl font-semibold text-nowrap text-secondary-foreground shadow-xl transition-colors duration-300 ${item.hoverText}`}
            >
              {item.label === "About" ? "About Us" : item.label}
            </Link>
          ))}
        </div>

        <SocialLinks />
      </section>
    </>
  );
}
