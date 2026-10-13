"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FileText, Menu, Moon, Sun, X } from "lucide-react";
import type { Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { href, otherLocale } from "@/lib/i18n";

const navItems = [
  { key: "home", path: "" },
  { key: "projects", path: "projects" },
  { key: "path", path: "path" },
  { key: "gallery", path: "gallery" },
] as const;

export function Header({ locale, name, cvHref }: { locale: Locale; name: string; cvHref: string }) {
  const pathname = usePathname() ?? `/${locale}/`;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (path: string) => {
    const current = pathname.replace(/\/$/, "");
    const target = href(locale, path).replace(/\/$/, "");
    return path === "" ? current === target : current.startsWith(target);
  };

  const alt = otherLocale(locale);
  const switchHref = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), `/${alt}`) || `/${alt}/`;

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  const iconButton =
    "flex h-9 w-9 items-center justify-center border border-border bg-background/60 text-muted backdrop-blur-sm transition-colors hover:border-accent/60 hover:text-foreground";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "border-b border-border bg-background/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between gap-4" aria-label={ui.nav.main[locale]}>
        <Link href={href(locale)} className="font-display text-2xl tracking-wide text-foreground" onClick={() => setOpen(false)}>
          {name}
          <span className="text-accent">.</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.key}>
              <Link
                href={href(locale, item.path)}
                aria-current={isActive(item.path) ? "page" : undefined}
                className={`font-label relative px-3 py-2 text-[11px] transition-colors ${
                  isActive(item.path) ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {ui.nav[item.key][locale]}
                {isActive(item.path) && <span className="absolute inset-x-3 -bottom-0.5 h-px bg-accent" />}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href={switchHref}
            hrefLang={alt}
            aria-label={ui.nav.language[locale]}
            className={`${iconButton} font-label w-auto px-2.5 text-[11px]`}
          >
            <span className="text-foreground">{locale.toUpperCase()}</span>
            <span className="mx-1 text-border">/</span>
            <span>{alt.toUpperCase()}</span>
          </Link>
          <button type="button" onClick={toggleTheme} aria-label={ui.nav.theme[locale]} className={iconButton}>
            <Sun className="hidden h-4 w-4 dark:block" aria-hidden="true" />
            <Moon className="h-4 w-4 dark:hidden" aria-hidden="true" />
          </button>
          <a
            href={cvHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-label hidden h-9 items-center gap-2 bg-accent-strong px-3 text-[11px] text-white transition-colors hover:bg-accent sm:inline-flex"
          >
            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
            {ui.nav.cv[locale]}
          </a>
          <button
            type="button"
            className={`${iconButton} md:hidden`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? ui.nav.closeMenu[locale] : ui.nav.menu[locale]}
          >
            {open ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="h-[calc(100dvh-4rem)] border-t border-border bg-background md:hidden">
          <ul className="container-page flex flex-col py-6">
            {navItems.map((item, i) => (
              <li key={item.key} className="border-b border-border">
                <Link
                  href={href(locale, item.path)}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.path) ? "page" : undefined}
                  className="flex items-baseline gap-4 py-4"
                >
                  <span className="font-label text-[10px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`font-display text-4xl ${isActive(item.path) ? "text-accent-soft" : "text-foreground"}`}>
                    {ui.nav[item.key][locale]}
                  </span>
                </Link>
              </li>
            ))}
            <li className="pt-6">
              <a
                href={cvHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-label inline-flex h-11 items-center gap-2 bg-accent-strong px-4 text-xs text-white"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                {ui.nav.cv[locale]}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
