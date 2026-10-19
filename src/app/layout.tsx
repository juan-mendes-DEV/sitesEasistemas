import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Code Maestro Tech",
    default: "Code Maestro Tech — Soluções digitais sob medida",
  },
  description:
    "A Code Maestro Tech é uma marca independente de desenvolvimento de soluções digitais. Explore 12 demonstrações fictícias de sites, lojas virtuais e sistemas.",
  openGraph: {
    title: "Code Maestro Tech — Soluções digitais sob medida",
    description:
      "Portfólio com 12 demonstrações fictícias em quatro categorias: sites simples, sites institucionais, lojas virtuais e sistemas demonstrativos.",
    type: "website",
    locale: "pt_BR",
    siteName: "Code Maestro Tech",
  },
  twitter: {
    card: "summary_large_image",
    title: "Code Maestro Tech — Soluções digitais sob medida",
    description:
      "Desenvolvimento digital com a precisão de um toque de magia.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-svh flex flex-col text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
