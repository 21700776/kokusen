import { Input } from "@nextui-org/input";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import {
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
	Navbar as NextUINavbar,
} from "@nextui-org/navbar";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/app/ui/site";
import clsx from "clsx";
import NextLink from "next/link";

import {
	GithubIcon,
	SearchIcon
} from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";

import DropDrop from '@/components/dropdrop';
import { JuKaiLogo } from "@/components/icons";
import Logout from "@/components/logout";

export const Navbar = () => {
	const searchInput = (
		<Input
			aria-label="Search"
			classNames={{
				inputWrapper: "bg-default-100",
				input: "text-sm",
				placeholder: "hidden md:flex",
			}}
			endContent={
				<Kbd className="hidden xl:inline-block" keys={["command"]}>
					Good
				</Kbd>
			}
			labelPlacement="outside"
			placeholder="Search"
			startContent={
				<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
			}
			type="search"
		/>
	);

	return (
		<NextUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1 mr-1" href="/">
						<JuKaiLogo width={36} height={36} />
						<p className="font-bold text-inherit">Motoongi</p>
					</NextLink>
				</NavbarBrand>

				<ul className="hidden md:flex gap-3 justify-start ml-6">
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"data-[active=true]:text-primary data-[active=true]:font-medium"
								)}
								color="foreground"
								href={item.href}
							>
								{item.label}
							</NextLink>
						</NavbarItem>
					))}
				</ul>
			</NavbarContent>

			<NavbarContent
				className="hidden sm:flex basis-1/5 sm:basis-full"
				justify="end"
			>
				<NavbarItem className="hidden md:flex gap-2">
					<Link isExternal href={siteConfig.links.github} aria-label="Github">
						<GithubIcon className="text-default-500" />
					</Link>
					<ThemeSwitch />
				</NavbarItem>
				<NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
				<NavbarItem className="hidden md:flex">
				<ul className="hidden md:flex gap-4 justify-start">
					<NavbarItem>
						<DropDrop />
					</NavbarItem>
				</ul>
				</NavbarItem>
				
			</NavbarContent>

			<NavbarContent className="md:hidden basis-1 pl-4" justify="end">
				<Link isExternal href={siteConfig.links.github} aria-label="Github">
					<GithubIcon className="text-default-500" />
				</Link>
				<ThemeSwitch />
				<NavbarMenuToggle />
			</NavbarContent>

			<NavbarMenu className="mt-2">
				{searchInput}
				<div className="mx-4 mt-1 flex flex-col gap-2">
				{siteConfig.navMenuItems.slice(0, 3).map((item, index) => (
					<NavbarMenuItem key={`${item.label}-${index}`}>
						<Link
							color={index === 0 ? "primary" : "foreground"}
							href={item.href}
							size="lg"
						>
							{item.label}
						</Link>
					</NavbarMenuItem>
				))}

				{/* 선을 긋기 위한 구분 요소 */}
				<hr className="border-gray-300 my-2" />

				{/* index 3 이상인 항목 */}
				{siteConfig.navMenuItems.slice(3).map((item, index) => (
					<NavbarMenuItem key={`${item.label}-${index}`}>
						<Link
							color={index === siteConfig.navMenuItems.length - 4 ? "warning" : "foreground"}
							href={item.href}
							size="lg"
						>
							{item.label}
						</Link>
					</NavbarMenuItem>
				))}
				<hr className="border-gray-300 my-2" />
				<NavbarItem className="text-danger" >
           			<Logout/>
          		</NavbarItem>
				</div>
			</NavbarMenu>
		</NextUINavbar>
	);
};
