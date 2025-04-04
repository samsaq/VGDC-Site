export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "VGDC ASU",
  description:
    "We are a community of gamers and developers at ASU, also known as Heatwave Studio. We release games yearly and learn new things.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "News",
      href: "/news",
    },
    {
      label: "Games",
      href: "/games",
    },
    {
      label: "Team",
      href: "/team",
    },
  ],
  navMenuItems: [
    {
      label: "News",
      href: "/news",
    },
    {
      label: "Games",
      href: "/games",
    },
    {
      label: "Team",
      href: "/team",
    },
  ],
  links: {
    github: "https://github.com/samsaq",
    twitter: "https://twitter.com/getnextui",
    discord: "https://discord.gg/9b6yyZKmH4",
  },
};
