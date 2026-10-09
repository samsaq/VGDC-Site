export const siteConfig = {
  name: "VGDC ASU",
  description:
    "We are a community of gamers and developers at ASU, also known as Heatwave Studio. We release games yearly and learn new things.",
  // Each section has an accent color from the VGDC logo, used for hover
  // underlines and highlights. Full class names so Tailwind can detect them.
  navItems: [
    {
      label: "About",
      href: "/about",
      text: "text-danger-alternative",
      hoverText: "hover:text-danger-alternative",
      bg: "bg-danger-alternative",
    },
    {
      label: "Events",
      href: "/events",
      text: "text-primary-alternative",
      hoverText: "hover:text-primary-alternative",
      bg: "bg-primary-alternative",
    },
    {
      label: "Pathways",
      href: "/pathways",
      text: "text-warning-alternative",
      hoverText: "hover:text-[#5ba8a0]",
      bg: "bg-warning-alternative",
    },
    {
      label: "Games",
      href: "/games",
      text: "text-success-alternative",
      hoverText: "hover:text-success-alternative",
      bg: "bg-success-alternative",
    },
  ],
  // Public Google Calendars mirrored on /events (Settings → "Integrate
  // calendar" → Calendar ID). Each must be shared publicly, and the API key
  // goes in the GOOGLE_CALENDAR_API_KEY env var. `dot` colors its events.
  calendars: [
    {
      id: "REPLACE_ME@group.calendar.google.com",
      label: "Meetings",
      dot: "bg-primary-alternative",
    },
    {
      id: "REPLACE_ME_TOO@group.calendar.google.com",
      label: "Workshops",
      dot: "bg-warning-alternative",
    },
  ],
  links: {
    engage: "https://sundevilcentral.eoss.asu.edu/vgdc/home/",
    discord: "https://discord.gg/YgRBPxBaNB",
    instagram: "https://www.instagram.com/heatwavestudioaz/",
    x: "https://x.com/HeatwaveAZ",
  },
};

export type NavItem = (typeof siteConfig.navItems)[number];
export type SiteCalendar = (typeof siteConfig.calendars)[number];
