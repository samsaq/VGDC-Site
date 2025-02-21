"use client";
import { SocialMediaButtons } from "@/components/socialMediaButtons";
import { VGDCBanner } from "@/components/VGDCBanner";
import { Icon } from "@iconify/react";

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
        <div className="flex flex-row items-center justify-center gap-2 rounded-full bg-secondary-alternative px-4 py-2">
          <a href="https://asu.campuslabs.com/engage/organization/vgdc">
            <button className="flex flex-row items-center justify-center rounded-full font-poppins text-2xl font-bold text-secondary-foreground">
              <span className="hover:text-danger-alternative transition-colors duration-300">
                <Icon
                  icon="emojione-monotone:trident-emblem"
                  className="text-4xl"
                />
              </span>
            </button>
          </a>
          {/* Since there's too many platforms to match VGDC colors, using ones that match platforms (eg: Discord's blurple) */}
          <a href="https://discord.gg/vgdcasu">
            <button className="flex flex-row items-center justify-center rounded-full font-poppins text-2xl font-bold text-secondary-foreground">
              <span className="transition-colors duration-300 hover:text-[#5865F2]">
                <Icon icon="simple-icons:discord" className="text-4xl" />
              </span>
            </button>
          </a>
          <a href="https://www.instagram.com/heatwavestudioaz/">
            <button className="flex flex-row items-center justify-center rounded-full font-poppins text-2xl font-bold text-secondary-foreground">
              <span className="instagram-hover text-4xl">
                <Icon icon="hugeicons:instagram" />
              </span>
            </button>
          </a>
          <a href="/">
            <button className="flex flex-row items-center justify-center rounded-full font-poppins text-2xl font-bold text-secondary-foreground">
              <span className="hover:text-danger-alternative transition-colors duration-300">
                <Icon icon="mage:tiktok-circle" className="text-4xl" />
              </span>
            </button>
          </a>
          <a href="https://x.com/HeatwaveAZ">
            <button className="flex flex-row items-center justify-center rounded-full font-poppins text-2xl font-bold text-secondary-foreground">
              <span className="hover:text-danger-alternative transition-colors duration-300">
                <Icon icon="ri:twitter-x-fill" className="text-4xl" />
              </span>
            </button>
          </a>
        </div>
      </section>
    </>
  );
}
