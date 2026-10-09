import { Fira_Code, Inter, Outfit } from "next/font/google";
import localFont from "next/font/local";

export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const fontMono = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

export const fontOutfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const fontPoppins = localFont({
  src: [
    { path: "./fonts/Poppins-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Poppins-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Poppins-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/Poppins-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
});
