import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  // lib/content.ts reads markdown from disk; ship it with every route so
  // revalidation on the server can still find it.
  outputFileTracingIncludes: {
    "/*": ["./content/**/*"],
  },
  turbopack: {
    // Pin the root so a stray lockfile or PostCSS config in a parent folder
    // is never picked up as the workspace.
    root: path.join(__dirname),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
