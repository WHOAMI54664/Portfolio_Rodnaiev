import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
