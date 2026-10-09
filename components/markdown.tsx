import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

// Shared markdown renderer for CMS content. Each page has an accent color;
// the teams page also uses larger, responsive text sizes.

const variants = {
  about: {
    h1: "my-4 text-3xl font-bold text-red-600",
    link: "decoration-red-600 hover:text-red-600",
    large: false,
  },
  games: {
    h1: "my-4 text-3xl font-bold text-success-alternative",
    link: "decoration-success-alternative hover:text-success-alternative",
    large: false,
  },
  teams: {
    h1: "mb-3 text-2xl font-bold md:text-3xl lg:text-4xl",
    link: "decoration-warning-alternative hover:text-warning-alternative md:decoration-3 lg:decoration-4",
    large: true,
  },
};

export type MarkdownVariant = keyof typeof variants;

function components(variant: MarkdownVariant): Components {
  const { h1, link, large } = variants[variant];
  const text = large ? "text-base md:text-lg lg:text-xl" : "";
  const code = large ? "text-sm md:text-base lg:text-lg" : "text-sm";
  const cell = large
    ? "px-3 py-2 md:px-4 md:py-3 lg:px-5 lg:py-4"
    : "px-3 py-2";

  return {
    h1: ({ node, ...props }) => <h1 className={h1} {...props} />,
    h2: ({ node, ...props }) => (
      <h2
        className={
          large
            ? "mb-2 text-xl font-bold md:text-2xl lg:text-3xl"
            : "my-4 text-2xl font-bold text-gray-500"
        }
        {...props}
      />
    ),
    h3: ({ node, ...props }) => (
      <h3
        className={
          large
            ? "mb-2 text-lg font-semibold md:text-xl lg:text-2xl"
            : "my-4 text-xl font-semibold text-gray-500"
        }
        {...props}
      />
    ),
    p: ({ node, ...props }) => <p className={`mb-4 ${text}`} {...props} />,
    ul: ({ node, ...props }) => (
      <ul
        className={`mb-4 list-disc pl-5 ${large ? `space-y-2 md:space-y-3 ${text}` : "space-y-1"}`}
        {...props}
      />
    ),
    ol: ({ node, ...props }) => (
      <ol
        className={`mb-4 list-decimal pl-5 ${large ? `space-y-2 md:space-y-3 ${text}` : "space-y-1"}`}
        {...props}
      />
    ),
    blockquote: ({ node, ...props }) => (
      <blockquote
        className={`my-4 border-l-4 border-gray-300 pl-4 italic ${text}`}
        {...props}
      />
    ),
    // Fenced blocks arrive with a `language-*` className; keep it alongside ours.
    code: ({ node, className, ...props }) => (
      <code
        className={cn(
          "rounded bg-gray-100 px-1 py-0.5 font-mono",
          code,
          className,
        )}
        {...props}
      />
    ),
    pre: ({ node, ...props }) => (
      <pre
        className={`my-4 overflow-x-auto rounded bg-gray-100 p-3 font-mono ${code}`}
        {...props}
      />
    ),
    table: ({ node, ...props }) => (
      <div className="my-4 overflow-x-auto">
        <table
          className={`min-w-full divide-y divide-gray-300 ${code}`}
          {...props}
        />
      </div>
    ),
    thead: ({ node, ...props }) => <thead className="bg-gray-100" {...props} />,
    th: ({ node, ...props }) => (
      <th className={`text-left font-semibold ${cell}`} {...props} />
    ),
    td: ({ node, ...props }) => (
      <td className={`border-t border-gray-200 ${cell}`} {...props} />
    ),
    img: ({ node, alt, ...props }) => (
      // Content images have unknown dimensions, so next/image doesn't fit here.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt={alt ?? ""}
        className={`mx-auto align-middle ${large ? "rounded-4xl p-4 md:p-6 lg:p-8" : "rounded-2xl p-4"}`}
        {...props}
      />
    ),
    a: ({ node, ...props }) => (
      <a
        className={`underline decoration-2 underline-offset-2 transition-colors ${link}`}
        {...props}
      />
    ),
  };
}

export function Markdown({
  children,
  variant,
}: {
  children: string;
  variant: MarkdownVariant;
}) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components(variant)}>
      {children}
    </ReactMarkdown>
  );
}
