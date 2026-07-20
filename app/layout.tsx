import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { StickyCta } from "@/components/sticky-cta";
import { siteConfig } from "@/lib/config";
import "./globals.css";

const outfit = localFont({
  variable: "--font-outfit",
  display: "swap",
  src: [
    { path: "../assets/fonts/outfit-latin-400.woff2", weight: "400" },
    { path: "../assets/fonts/outfit-latin-500.woff2", weight: "500" },
    { path: "../assets/fonts/outfit-latin-600.woff2", weight: "600" },
    { path: "../assets/fonts/outfit-latin-700.woff2", weight: "700" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Nueva Empresa | Transformación operativa para pymes",
    template: "%s | Nueva Empresa",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: siteConfig.name,
    title: "Nueva Empresa | Del caos operativo a un sistema claro",
    description: siteConfig.description,
    images: [{ url: "/og/social.png", width: 1680, height: 937, alt: "Paisaje abstracto azul" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nueva Empresa | Transformación operativa para pymes",
    description: siteConfig.description,
    images: ["/og/social.png"],
  },
  robots: siteConfig.indexable
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = {
  themeColor: "#060f1f",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={outfit.variable}>
      <body>
        <a
          href="#contenido"
          className="focus-ring fixed left-4 top-3 z-[100] -translate-y-24 rounded-lg bg-white px-4 py-3 font-semibold text-ink shadow-xl transition-transform focus:translate-y-0"
        >
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <StickyCta />
        {process.env.VERCEL === "1" && <Analytics />}
      </body>
    </html>
  );
}
