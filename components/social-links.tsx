import { Icon } from "@iconify/react";
import { siteConfig } from "@/config/site";

const INSTAGRAM_PATHS = (
  <>
    <path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12" />
    <path d="M16.5 12a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m1.008-5.5h-.01" />
  </>
);

// Hover colors match each platform's brand where VGDC colors don't fit
// (e.g. Discord's blurple).
const iconLinks = [
  {
    href: siteConfig.links.engage,
    label: "ASU Engage",
    icon: "emojione-monotone:trident-emblem",
    hover: "hover:text-primary-alternative",
  },
  {
    href: siteConfig.links.discord,
    label: "Discord",
    icon: "simple-icons:discord",
    hover: "hover:text-[#868ff7]",
  },
];

const linkClass =
  "flex items-center justify-center rounded-full text-4xl text-secondary-foreground";

export function SocialLinks() {
  return (
    <div className="flex flex-row items-center justify-center gap-2 rounded-full bg-secondary-alternative px-4 py-2">
      {iconLinks.map(({ href, label, icon, hover }) => (
        <a key={label} href={href} aria-label={label} className={linkClass}>
          <Icon
            icon={icon}
            className={`transition-colors duration-300 ${hover}`}
          />
        </a>
      ))}

      <a
        href={siteConfig.links.instagram}
        aria-label="Instagram"
        className={linkClass}
      >
        <span className="instagram-hover">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <defs>
              <linearGradient
                id="instagram-gradient"
                x1="30%"
                y1="107%"
                x2="0%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#fdf497" />
                <stop offset="5%" stopColor="#fdf497" />
                <stop offset="45%" stopColor="#fd5949" />
                <stop offset="60%" stopColor="#d6249f" />
                <stop offset="90%" stopColor="#285AEB" />
              </linearGradient>
            </defs>
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            >
              {INSTAGRAM_PATHS}
            </g>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            className="gradient-icon"
          >
            <g
              fill="none"
              stroke="url(#instagram-gradient)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            >
              {INSTAGRAM_PATHS}
            </g>
          </svg>
        </span>
      </a>

      <a
        href={siteConfig.links.x}
        aria-label="X (Twitter)"
        className={linkClass}
      >
        <Icon
          icon="ri:twitter-x-fill"
          className="transition-colors duration-300 hover:text-black"
        />
      </a>
    </div>
  );
}
