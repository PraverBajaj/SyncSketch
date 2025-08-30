import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Toaster from "./components/Toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "SynSketch",
  description: "Collaborative sketching tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.jpg" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
