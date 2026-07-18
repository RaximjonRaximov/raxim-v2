import type { Metadata } from "next";
import { Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { Providers } from "@/components/Providers";

export const dynamic = "force-dynamic";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Raxim — AI Image Prompts & Courses",
  description: "Curated AI image prompts and video courses for creators and freelancers.",
  openGraph: {
    title: "Raxim — AI Image Prompts & Courses",
    description: "Curated AI image prompts and video courses for creators and freelancers.",
    url: "https://raxim.design",
    siteName: "Raxim",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${ibmPlexMono.variable}`}>
      <body className="antialiased min-h-screen bg-page text-ink">
        <Providers>
          <MobileHeader />
          <Sidebar />
          <div className="lg:pl-64 min-h-screen flex flex-col">
            <main className="flex-1 pt-16 lg:pt-0">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
