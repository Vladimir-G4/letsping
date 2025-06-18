import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import clsx from "clsx";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: "https://letsping.co",
    siteName: "Ping",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Let's Ping - Voice-first connection app",
      },
    ],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f5f4",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          "min-h-screen bg-[#faf9f7] text-neutral-900 font-sans antialiased transition-colors duration-200",
          fontSans.variable
        )}
      >
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="theme-color" content="#faf9f7" />

        <Providers themeProps={{ attribute: "class", defaultTheme: "light", forcedTheme: "light" }}>
          <div className="relative flex flex-col min-h-screen">
            <main className="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
