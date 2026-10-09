import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { fontMono, fontOutfit, fontPoppins, fontSans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: { icon: "/favicon.png" },
};

export const viewport: Viewport = {
  themeColor: "white",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontMono.variable} ${fontOutfit.variable} ${fontPoppins.variable}`}
    >
      <body className="min-h-screen">
        <main className="relative h-screen w-full">{children}</main>
      </body>
    </html>
  );
}
