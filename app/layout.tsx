import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/styles/keyframe.css";

import { Inter, Open_Sans } from "next/font/google";
import Navbar from "@/component/layout/Navber";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-primary",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-secondary",
});

export const metadata: Metadata = {
  title: "my-portfolio",
  description: "my-portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${openSans.variable}`}>
      <body cz-shortcut-listen="true">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
