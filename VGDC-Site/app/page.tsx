"use client";

import { FillOnHoverButton } from "@/components/fillOnHoverButton";
import { SwapOnHoverButton } from "@/components/swapOnHoverButton";
import { SocialMediaColumn } from "@/components/socialMediaColumn";

export default function Home() {
  return (
    <>
      <video
        autoPlay
        loop
        muted
        className="fixed left-0 top-0 h-full w-full object-cover blur-[3px] filter"
        src="/example-background-video.mp4"
      />
      <SocialMediaColumn
        icons={[
          {
            icon: "emojione-monotone:trident-emblem",
            color: "#FEB95F",
            hoverColor: "#2B4593",
            href: "/",
            iconSize: 40,
          },
          {
            icon: "simple-icons:discord",
            color: "#FEB95F",
            hoverColor: "#2B4593",
            href: "https://discord.gg/vgdcasu",
            iconSize: 40,
          },
          {
            icon: "hugeicons:instagram",
            color: "#FEB95F",
            hoverColor: "#2B4593",
            href: "/",
            iconSize: 40,
          },
          {
            icon: "mage:tiktok-circle",
            color: "#FEB95F",
            hoverColor: "#2B4593",
            href: "/",
            iconSize: 40,
          },
          {
            icon: "ri:twitter-x-fill",
            color: "#FEB95F",
            hoverColor: "#2B4593",
            href: "/",
            iconSize: 40,
          },
          {
            icon: "mdi:at",
            color: "#FEB95F",
            hoverColor: "#2B4593",
            href: "/about",
            iconSize: 40,
          },
        ]}
        position="top-right"
      />
      <section className="relative z-10 flex h-full flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="flex flex-col items-center justify-center gap-0 rounded-none bg-secondary p-8 shadow-xl">
          <h1 className="flex w-full flex-row justify-between text-9xl font-bold">
            <span className="text-danger">V</span>
            <span className="text-primary">G</span>
            <span className="text-success">D</span>
            <span className="text-warning">C</span>
          </h1>
          <span className="font-poppins text-3xl text-secondary-foreground">
            Video Game Development Club
          </span>
          <span className="font-poppins py-2 text-2xl font-bold text-primary">
            We make games
          </span>
          <div className="flex flex-row gap-4">
            <FillOnHoverButton
              color="#DB504A"
              fillColor="#DB504A"
              hoverColor="#2B4593"
              href="/"
              icon="emojione-monotone:newspaper"
              text="News"
            />
            <FillOnHoverButton
              color="#FEB95F"
              fillColor="#FEB95F"
              hoverColor="#2B4593"
              href="/"
              icon="game-icons:game-console"
              text="Games"
            />
            <FillOnHoverButton
              color="#2EC4B6"
              fillColor="#2EC4B6"
              hoverColor="#2B4593"
              href="/"
              icon="mage:robot-happy-fill"
              text="Team"
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-4 pt-3">
          <SwapOnHoverButton
            color="#2B4593"
            hoverColor="#FEB95F"
            icon="emojione-monotone:trident-emblem"
            text="ASU Sync Signup"
          />
          <SwapOnHoverButton
            color="#2B4593"
            hoverColor="#FEB95F"
            icon="simple-icons:discord"
            text="Join Our Discord"
          />
        </div>
      </section>
    </>
  );
}
