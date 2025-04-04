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
  			sans: [
  				'var(--font-sans)'
  			],
  			mono: [
  				'var(--font-mono)'
  			],
  			outfit: [
  				'var(--font-outfit)'
  			],
  			poppins: [
  				'Poppins',
  				'sans-serif'
  			],
  			lato: [
  				'Lato',
  				'sans-serif'
  			]
  		},
  		keyframes: {
  			scroll: {
  				'0%': {
  					transform: 'translateY(0)'
  				},
  				'100%': {
  					transform: 'translateY(-600px)'
  				}
  			}
  		},
  		animation: {
  			scrollingBg: 'scroll 10s linear infinite'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		}
  	}
  },
  // VGDC Logo Themed Colors
  // Jasper Red = #DB504A, is rgb(219, 80, 74)
  // Hunyadi Yellow = #FEB95F, is rgb(254, 185, 95)
  // Rich Black = #011627, is rgb(1, 22, 39)
  // Marian Blue = #2B4593, is rgb(43, 69, 147)
  // Light Sea Green = #2EC4B6, is rgb(46, 196, 182)
  // Cerulean Blue = #337CA0, is rgb(51, 124, 160)
  // Rich Black for background, white for foreground (egg white: #FFF5C3 as rgb(255, 245, 195))
  darkMode: ["class", "class"],
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
              alternative: "#EA9232", // SVG Yellow
            },
            secondary: {
              DEFAULT: "#2B4593", // Marian Blue
              foreground: "#FFFFFF", // White
              alternative: "#747474", // Gray
            },
            success: {
              DEFAULT: "#2EC4B6", // Light Sea Green
              alternative: "#90C3A4", // SVG Light Green
            },
            warning: {
              DEFAULT: "#337CA0", // Cerulean Blue
              alternative: "#3F746E", // SVG Teal
            },
            danger: {
              DEFAULT: "#DB504A", // Jasper Red
              alternative: "#E1432A", //SVG Red
            },
          },
        },
        dark: {
          colors: {},
        },
      },
    }),
      require("tailwindcss-animate")
],
};
