"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAboutData } from "@/lib/actions";
import { AnimatedContent } from "@/components/AnimatedContent";

interface AboutData {
  title: string;
  content: string;
  coverImage?: string;
  slug?: string;
  [key: string]: unknown;
}

export default function About() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAboutData() {
      try {
        const data = await getAboutData();
        // Find the "who-we-are" page or use the first one
        const aboutPage =
          data.find((page) => page.slug === "who-we-are") || data[0];
        setAboutData(aboutPage);
      } catch (error) {
        console.error("Error fetching about data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAboutData();
  }, []);

  // Custom components for ReactMarkdown with tailwind styling
  const components = {
    h1: ({ ...props }) => (
      <h1 className="my-4 text-3xl font-bold text-red-600" {...props} />
    ),
    h2: ({ ...props }) => (
      <h2 className="my-4 text-2xl font-bold text-gray-500" {...props} />
    ),
    h3: ({ ...props }) => (
      <h3 className="my-4 text-xl font-semibold text-gray-500" {...props} />
    ),
    // Improve list rendering
    ul: ({ ...props }) => (
      <ul className="mb-4 list-disc space-y-1 pl-5" {...props} />
    ),
    ol: ({ ...props }) => (
      <ol className="mb-4 list-decimal space-y-1 pl-5" {...props} />
    ),
    // Improve blockquote styling
    blockquote: ({ ...props }) => (
      <blockquote
        className="my-4 border-l-4 border-gray-300 pl-4 italic"
        {...props}
      />
    ),
    // Better code block styling
    code: ({ ...props }) => (
      <code
        className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm"
        {...props}
      />
    ),
    pre: ({ ...props }) => (
      <pre
        className="my-4 overflow-x-auto rounded bg-gray-100 p-3 font-mono text-sm"
        {...props}
      />
    ),
    // Improve table styling
    table: ({ ...props }) => (
      <div className="my-4 overflow-x-auto">
        <table
          className="min-w-full divide-y divide-gray-300 text-sm"
          {...props}
        />
      </div>
    ),
    thead: ({ ...props }) => <thead className="bg-gray-100" {...props} />,
    th: ({ ...props }) => (
      <th className="px-3 py-2 text-left font-semibold" {...props} />
    ),
    td: ({ ...props }) => (
      <td className="border-t border-gray-200 px-3 py-2" {...props} />
    ),
    img: ({ ...props }) => (
      <img className="rounded-2xl p-4 align-middle" {...props} />
    ),
    a: ({ ...props }) => (
      <a
        className="underline decoration-red-600 decoration-2 underline-offset-2 transition-colors hover:text-red-600"
        {...props}
      />
    ),
  };

  const renderContent = () => {
    if (loading) {
      return <p className="text-center">Loading about page...</p>;
    }

    if (!aboutData) {
      return <p className="text-center">About content not found</p>;
    }

    return (
      <div className="flex h-full w-full flex-col items-center overflow-y-auto">
        <AnimatedContent
          uniqueKey={aboutData.slug || aboutData.title}
          className="w-full max-w-5xl px-4"
        >
          <div className="flex items-center justify-center pb-10 pt-14">
            <h1 className="font-outfit text-4xl font-bold text-red-600">
              {aboutData.title || "Who We Are"}
            </h1>
          </div>

          {aboutData.coverImage && (
            <div className="mb-8 flex justify-center">
              <img
                src={aboutData.coverImage}
                alt={aboutData.title || "About VGDC"}
                className="max-h-[400px] rounded-xl object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg w-full max-w-none px-4 font-outfit">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
              {aboutData.content || ""}
            </ReactMarkdown>
          </div>
        </AnimatedContent>
      </div>
    );
  };

  return (
    <section className="relative z-10 h-full w-full overflow-auto">
      {renderContent()}
    </section>
  );
}
