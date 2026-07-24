import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/lib/config";
import "./globals.css";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Transformación operativa para pymes`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Del caos operativo a un sistema claro`,
    description: siteConfig.description,
    images: [{ url: "/og/social.png", width: 1680, height: 937, alt: "Paisaje abstracto azul" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Transformación operativa para pymes`,
    description: siteConfig.description,
    images: ["/og/social.png"],
  },
  robots: siteConfig.indexable
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = {
  themeColor: "#070B1A",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={cn("font-sans", montserrat.variable)}>
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
        {process.env.VERCEL === "1" && <Analytics />}
      </body>
    </html>
  );
}
