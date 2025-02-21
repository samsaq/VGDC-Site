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
              <span className="instagram-hover relative text-4xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  className="absolute"
                >
                  <defs>
                    <linearGradient
                      id="instagram-gradient"
                      x1="30%"
                      y1="107%"
                      x2="0%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#fdf497" />
                      <stop offset="5%" stopColor="#fdf497" />
                      <stop offset="45%" stopColor="#fd5949" />
                      <stop offset="60%" stopColor="#d6249f" />
                      <stop offset="90%" stopColor="#285AEB" />
                    </linearGradient>
                  </defs>
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  >
                    <path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12" />
                    <path d="M16.5 12a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m1.008-5.5h-.01" />
                  </g>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  className="gradient-icon opacity-0 transition-opacity duration-300"
                >
                  <g
                    fill="none"
                    stroke="url(#instagram-gradient)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  >
                    <path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12" />
                    <path d="M16.5 12a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m1.008-5.5h-.01" />
                  </g>
                </svg>
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
