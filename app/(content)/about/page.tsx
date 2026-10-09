import type { Metadata } from "next";
import Image from "next/image";
import { AnimatedContent } from "@/components/animated-content";
import { Markdown } from "@/components/markdown";
import { getCollection } from "@/lib/content";

export const metadata: Metadata = { title: "About" };

export default async function AboutPage() {
  const pages = await getCollection("about");
  const about = pages.find((p) => p.slug === "who-we-are") ?? pages[0];

  return (
    <section className="relative z-10 h-full w-full overflow-auto">
      {!about ? (
        <p className="text-center">About content not found</p>
      ) : (
        <div className="flex h-full w-full flex-col items-center overflow-y-auto">
          <AnimatedContent
            uniqueKey={about.slug}
            className="w-full max-w-5xl px-4"
          >
            <div className="flex items-center justify-center pt-14 pb-10">
              <h1 className="font-outfit text-4xl font-bold text-red-600">
                {about.title || "Who We Are"}
              </h1>
            </div>

            {about.coverImage && (
              <div className="mb-8 flex justify-center">
                <Image
                  src={about.coverImage}
                  alt={about.title || "About VGDC"}
                  width={1200}
                  height={400}
                  className="h-auto max-h-[400px] w-auto rounded-xl object-cover"
                />
              </div>
            )}

            <div className="w-full px-4 font-outfit">
              <Markdown variant="about">{about.body}</Markdown>
            </div>
          </AnimatedContent>
        </div>
      )}
    </section>
  );
}
