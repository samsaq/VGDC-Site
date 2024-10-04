import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        poppins: ["Poppins", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
    },
  },
  // VGDC Logo Themed Colors
  // Jasper Red = #DB504A, is rgb(219, 80, 74)
  // Hunyadi Yellow = #FEB95F, is rgb(254, 185, 95)
  // Rich Black = #011627, is rgb(1, 22, 39)
  // Marian Blue = #2B4593, is rgb(43, 69, 147)
  // Light Sea Green = #2EC4B6, is rgb(46, 196, 182)
  // Cerulean Blue = #337CA0, is rgb(51, 124, 160)
  // Rich Black for background, white for foreground (egg white: #FFF5C3 as rgb(255, 245, 195))
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          layout: {},
          background: "#011627", // Rich Black
          foreground: "#FFF5C3", // Egg White
          colors: {
            primary: {
              DEFAULT: "#FEB95F", // Hunyadi Yellow
            },
            secondary: {
              DEFAULT: "#2B4593", // Marian Blue
              foreground: "#FFFFFF", // White
            },
            success: {
              DEFAULT: "#2EC4B6", // Light Sea Green
            },
            warning: {
              DEFAULT: "#337CA0", // Cerulean Blue
            },
            danger: {
              DEFAULT: "#DB504A", // Jasper Red
            },
          },
        },
        dark: {
          colors: {},
        },
      },
    }),
  ],
};
