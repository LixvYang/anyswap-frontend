"use client";

import React from "react";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { ThemeSwitch } from "./theme-switch";
import Image from "next/image";
import WalletConnection from "./WalletConnection";
import { usePathname } from "next/navigation";
import { siteConfig } from "../../../config/site";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <header>
      <NextUINavbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Image
              src="/logo.webp"
              alt="Logo"
              width={40}
              height={40}
              className="hidden md:block"
            />
            <p className="font-bold text-inherit">&nbsp;AnySwap</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {siteConfig.navItems.map((item, index) => (
            <NavbarItem>
              <>
                <Link
                  color={item.link === pathname ? "secondary" : "foreground"}
                  href={item.link}
                >
                  {item.label}
                </Link>
              </>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent className="flex basis-1/5 sm:basis-full" justify="end">
          <WalletConnection connectText="Connect Wallet" />
          <ThemeSwitch />
        </NavbarContent>

        <NavbarMenu>
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                onPress={() => {
                  setIsMenuOpen(false);
                }}
                color={item.link === pathname ? "secondary" : "foreground"}
                className="w-full"
                href={item.link}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </NextUINavbar>
    </header>
  );
}
