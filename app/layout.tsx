import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const lufga = localFont({
  variable: "--font-lufga",
  display: "swap",
  src: [
    { path: "./fonts/Lufga-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Lufga-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Lufga-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/Lufga-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Lufga-ExtraBold.woff2", weight: "800", style: "normal" },
    { path: "./fonts/Lufga-Black.woff2", weight: "900", style: "normal" },
  ],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Danylo Rodnaiev — Full-Stack Developer & UI/UX Designer",
  description: "Portfolio of Danylo Rodnaiev — multilingual digital products, full-stack development and UI/UX design.",
  openGraph: {
    title: "Danylo Rodnaiev — Full-Stack Developer & UI/UX Designer",
    description: "Digital products where design thinking meets frontend, backend and production engineering.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Danylo Rodnaiev — Full-Stack Developer & UI/UX Designer",
    description: "Digital products where design thinking meets frontend, backend and production engineering.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${lufga.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
