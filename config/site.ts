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
  links: {
    engage: "https://sundevilcentral.eoss.asu.edu/vgdc/home/",
    discord: "https://discord.gg/YgRBPxBaNB",
    instagram: "https://www.instagram.com/heatwavestudioaz/",
    x: "https://x.com/HeatwaveAZ",
  },
};

export type NavItem = (typeof siteConfig.navItems)[number];
