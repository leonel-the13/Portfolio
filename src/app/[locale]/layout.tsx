import type { Metadata, Viewport } from "next";
import { Archivo, Bebas_Neue, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { GlobalEffects } from "@/components/effects/GlobalEffects";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { profile, site } from "@/content/profile";
import { locales } from "@/content/types";
import { ui } from "@/content/ui";
import { publicFileExists } from "@/lib/assets";
import { isLocale, otherLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import "../globals.css";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-bebas", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const dynamicParams = false;
export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0d14" },
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    metadataBase: new URL(site.url),
    authors: [{ name: profile.name }],
    ...pageMetadata({ locale }),
  };
}

// Aplica o tema guardado antes da primeira pintura (escuro por defeito).
const themeScript = `try{var t=localStorage.getItem("theme");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){}`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  // CV no idioma activo; se ainda não existir, usa o do outro idioma.
  const cvHref = publicFileExists(profile.cv[locale]) ? profile.cv[locale] : profile.cv[otherLocale(locale)];

  return (
    <html
      lang={locale === "pt" ? "pt-AO" : "en"}
      data-theme="dark"
      suppressHydrationWarning
      className={`${archivo.variable} ${bebas.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="font-label sr-only z-[80] bg-accent-strong px-4 py-2 text-xs text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          {ui.nav.skip[locale]}
        </a>
        <div className="grain" aria-hidden="true" />
        <GlobalEffects consoleMessage={ui.console[locale]} email={profile.contact.email} />
        <Header locale={locale} name={profile.name} cvHref={cvHref} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
