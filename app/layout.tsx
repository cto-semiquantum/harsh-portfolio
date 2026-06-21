import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import ClientShell from "@/src/components/ClientShell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harsh Jha | Portfolio",
  description: "AI Engineer, Full Stack Developer, and CTO.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable} dark`} style={{ colorScheme: 'dark' }}>
      <body suppressHydrationWarning className="min-h-screen bg-black text-foreground antialiased selection:bg-primary selection:text-white">
        <ClientShell>
          {children}
        </ClientShell>
      </body>
    </html>
  );
}

