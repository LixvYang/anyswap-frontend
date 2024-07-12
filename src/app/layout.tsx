import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers/Providers";
import { fontSans } from "../../config/fonts";
import clsx from "clsx";
import { siteConfig } from "../../config/site";
import Navbar from "@/app/components/NavBar";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#8A64D0" },
    { media: "(prefers-color-scheme: dark)", color: "#93B289" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="theme-color" content="#7983C2" />
      </Head>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto flex-grow">{children}</main>
          </div>
        </Providers>

        <ToastContainer />
      </body>
    </html>
  );
}
