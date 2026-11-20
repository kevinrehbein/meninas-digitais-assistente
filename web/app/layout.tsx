import type { Metadata } from "next";
import { Pathway_Gothic_One, Poppins } from "next/font/google";

import { SiteHeader } from "@/components/layout/site-header";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const pathway = Pathway_Gothic_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pathway",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://meninas-digitais-assistente.onrender.com/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Assistente Meninas Digitais",
    template: "%s · Meninas Digitais",
  },
  description:
    "Assistente acadêmico com respostas fundamentadas nos artigos do WIT — Women in Information Technology.",
  keywords: [
    "Meninas Digitais",
    "WIT",
    "Women in Information Technology",
    "GraphRAG",
    "computação",
    "gênero",
    "SBC",
  ],
  authors: [{ name: "Projeto Meninas Digitais" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Assistente Meninas Digitais",
    title: "Assistente Meninas Digitais",
    description:
      "Respostas fundamentadas nos artigos do WIT, com pesquisa GraphRAG e verificação de fontes.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Assistente Meninas Digitais",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Assistente Meninas Digitais",
    description:
      "Respostas fundamentadas nos artigos do WIT, com pesquisa GraphRAG e verificação de fontes.",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} ${pathway.variable}`}>
      <body>
        <div className="page-shell flex min-h-svh flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
