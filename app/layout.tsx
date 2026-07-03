import type { Metadata } from "next";
import { Inter, Space_Mono, Syne } from "next/font/google";
import "./globals.css";
import ClientShell from "@/src/components/ClientShell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Harsh Jha — AI Engineer & CTO",
  description:
    "Portfolio of Harsh Jha — AI Engineer, Full Stack Developer, and CTO at SemiQuantum Technologies. Building secure AI systems, developer tools & futuristic web infrastructures.",
  keywords: [
    "Harsh Jha",
    "AI Engineer",
    "Full Stack Developer",
    "CTO",
    "SemiQuantum",
    "Next.js",
    "Portfolio",
  ],
  openGraph: {
    title: "Harsh Jha — AI Engineer & CTO",
    description:
      "Building secure AI systems, developer tools & futuristic web infrastructures.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceMono.variable} ${syne.variable} dark`}
      style={{ colorScheme: "dark" }}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/30 selection:text-white"
      >
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
