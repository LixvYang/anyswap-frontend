export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Anyswap",
  description: "Swap more crypto currency by AnySwap.",
  navItems: [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "MixSwap",
      link: "/mixswap",
    },
    {
      label: "Jupiter",
      link: "/jupiter",
    },
  ],
  links: {
    github: "https://github.com/",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
