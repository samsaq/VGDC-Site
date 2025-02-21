"use client";

import { FillOnHoverButton } from "@/components/fillOnHoverButton";
import { SwapOnHoverButton } from "@/components/swapOnHoverButton";
import { SocialMediaButtons } from "@/components/socialMediaButtons";
import { RoundedHero } from "@/components/RoundedHero";
import { VGDCBanner } from "@/components/VGDCBanner";

export default function Home() {
  return (
    <>
      <div
        className="fixed left-[-25vh] top-[-25vh] h-[200vh] w-[200vw]"
        style={{
          transform: "rotate(-25deg) scale(1.5)",
          transformOrigin: "center center",
        }}
      >
        <div
          className="h-full w-full animate-scrollingBg"
          style={{
            backgroundImage: 'url("/VGDC_Controller_Background_Image.png")',
            backgroundSize: "600px",
            backgroundRepeat: "repeat",
            willChange: "transform",
          }}
        />
      </div>
      <section className="relative z-10 flex h-full flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="flex flex-col items-center justify-center gap-0 rounded-[64px] bg-secondary-alternative p-8 shadow-2xl">
          <h1 className="flex w-full flex-row justify-between py-4 text-9xl font-bold">
            <VGDCBanner characterSize={150} />
          </h1>
          <span className="font-poppins text-3xl text-secondary-foreground">
            Video Game Development Club
          </span>
          <span className="py-2 font-poppins text-2xl font-bold text-primary">
            We make games
          </span>
        </div>
        <div className="flex flex-row items-center justify-center gap-4 pt-3">
          <a href="/about">
            <button className="rounded-full bg-secondary-alternative px-4 py-2 font-poppins text-2xl font-bold text-secondary-foreground shadow-xl">
              <span className="hover:text-danger-alternative transition-colors duration-300">
                About Us
              </span>
            </button>
          </a>
          <a href="/officers">
            <button className="rounded-full bg-secondary-alternative px-4 py-2 font-poppins text-2xl font-bold text-secondary-foreground shadow-xl">
              <span className="hover:text-primary-alternative transition-colors duration-300">
                Officers
              </span>
            </button>
          </a>

          <a href="/teams">
            <button className="rounded-full bg-secondary-alternative px-4 py-2 font-poppins text-2xl font-bold text-secondary-foreground shadow-xl">
              <span className="transition-colors duration-300 hover:text-[#5ba8a0]">
                Teams
              </span>
            </button>
          </a>
          <a href="/games">
            <button className="rounded-full bg-secondary-alternative px-4 py-2 font-poppins text-2xl font-bold text-secondary-foreground shadow-xl">
              <span className="hover:text-success-alternative transition-colors duration-300">
                Games
              </span>
            </button>
          </a>
        </div>
      </section>
      <div>
        {/* Social Media Platforms- Youtube, Instagram, Twitter/X, Facebook, Tiktok, Sun Devil Sync, Discord */}
        <SocialMediaButtons
          direction="row"
          icons={[
            {
              icon: "emojione-monotone:trident-emblem",
              color: "#FEB95F",
              hoverColor: "#2B4593",
              href: "https://asu.campuslabs.com/engage/organization/vgdc",
              iconSize: 20,
            },
            {
              icon: "simple-icons:discord",
              color: "#FEB95F",
              hoverColor: "#2B4593",
              href: "https://discord.gg/vgdcasu",
              iconSize: 20,
            },

            {
              icon: "hugeicons:instagram",
              color: "#FEB95F",
              hoverColor: "#2B4593",
              href: "https://www.instagram.com/heatwavestudioaz/",
              iconSize: 20,
            },
            {
              icon: "mage:tiktok-circle",
              color: "#FEB95F",
              hoverColor: "#2B4593",
              href: "/",
              iconSize: 20,
            },
            {
              icon: "ri:twitter-x-fill",
              color: "#FEB95F",
              hoverColor: "#2B4593",
              href: "https://x.com/HeatwaveAZ",
              iconSize: 20,
            },
          ]}
          position="bottom-right"
        />
      </div>
    </>
  );
}
