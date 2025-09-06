import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Toaster from "./components/Toaster";
import { useEffect } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "SyncSketch",
  description: "Collaborative sketching tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    // Ping backend and websocket to wake up Render free instances
    fetch("https://syncsketch-2.onrender.com/api/ping").catch(() => {});
    fetch("https://syncsketch-ws.onrender.com").catch(() => {});
  }, []);
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
