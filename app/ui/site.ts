export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Next.js + NextUI",
	description: "Make beautiful websites regardless of your design experience.",
	navItems: [
    {
      label: "Books",
      href: "/dashboard/books",
    },
    {
      label: "Reviews",
      href: "/dashboard/invoices",
    },
    {
      label: "About",
      href: "/dashboard/about",
    },
	{
		label: "고객센터",
		href: "/help-feedback",
	  },
	],
	navMenuItems: [
		{
			label: "Main",
			href: "/dashboard",
		},
		{
			label: "Books",
			href: "/dashboard/books",
		},
		{
			label: "Reviews",
			href: "/dashboard/invoices",
		},
		{
			label: "내 정보",
			href: "/dashboard/profile",
		},
		{
			label: "내 리뷰",
			href: "/dashboard/profile/myreview",
		},
		{
			label: "고객센터",
			href: "/help-feedback",
		},
		// {
		// 	label: "Logout",
		// 	href: "/logout",
		// },
	],
	log: [
		{
		  label: "Login",
		  href: "/login",
		},
		],
	links: {
		github: "https://github.com/21700776/nextjs-framework",
		docs: "https://nextui.org",
		discord: "https://discord.gg",
    sponsor: "login"
	},
};
