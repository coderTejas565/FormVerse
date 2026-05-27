import type { Metadata } from "next";
import "./globals.css";

// FormVerse Typography Stack
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource/geist-sans/400.css";
import "@fontsource/geist-sans/500.css";
import "@fontsource/geist-mono/400.css";
import "@fontsource/geist-mono/500.css";

import { GlobalProviders } from "~/providers/global";

export const metadata: Metadata = {
  title: "FORMVERSE",
  description: "Craft-focused Form Builder Architecture",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /* 1. Swapped "dark" to "light" or removed completely */
    <html lang="en" className="light">
      {/* 2. Swapped bg-[#0F1117] for your Ivory token (or hex #FFFFEB)
        3. Swapped text-[#F0F6FC] for your Carbon text token (or hex #1A1A1A)
        4. Kept the selection styling matching your brand focus color with a tiny opacity layer
      */}
      <body className="bg-workspace text-brand-text font-sans antialiased selection:bg-[#034F46/10] selection:text-[#034F46]">
        <GlobalProviders>{children}</GlobalProviders>
      </body>
    </html>
  );
}
