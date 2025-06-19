export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Ping",
  description: "Voice-first connection, powered by Wing — your human-first AI concierge. Built for presence, not profiles.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Waitlist",
      href: "/waitlist",
    },
    {
      label: "Invest",
      href: "/invest",
    },
    {
      label: "FAQ",
      href: "/faq",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Wing",
      href: "/wing",
    },
    {
      label: "Conversations",
      href: "/conversations",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/Vladimir-G4/ping",
    twitter: "https://twitter.com/letsping",
    docs: "https://letsping.co/docs",
    discord: "https://discord.gg/yourcommunity",
    sponsor: "mailto:founders@letsping.co",
  },
};
