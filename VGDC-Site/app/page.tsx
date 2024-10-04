"use client";

import { Icon } from "@iconify/react";

import { FillOnHover } from "@/components/fillOnHover";
import { FillOnHoverButton } from "@/components/fillOnHoverButton";

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
          <span className="font-poppins pt-2 text-2xl font-bold text-primary">
            We make games
          </span>
          <div className="flex flex-row gap-4">
            <FillOnHover className="p-1" fillColor="#FEB95F">
              <a className="flex flex-row items-center gap-2" href="/">
                <Icon
                  color="white"
                  height={40}
                  icon="emojione-monotone:newspaper"
                  width={40}
                />
                <span className="text-white">News</span>
              </a>
            </FillOnHover>
            <FillOnHoverButton
              fillColor="#FEB95F"
              href="/"
              icon="emojione-monotone:newspaper"
              iconColor="#FEB95F"
              iconColorHover="#2B4593"
              text="News"
            />
          </div>
        </div>
      </section>
    </>
  );
}
