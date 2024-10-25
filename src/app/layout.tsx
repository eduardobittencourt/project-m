import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { verifySession } from "./lib/session";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Project M",
  description: "Created by Eduardo Bittencourt",
};

type RootLayoutProps = { children: React.ReactNode };

export default async function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  const session = await verifySession();
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <pre>{JSON.stringify(session)}</pre>
        {children}
      </body>
    </html>
  );
}
