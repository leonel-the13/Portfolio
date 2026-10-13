"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck } from "lucide-react";

type Labels = {
  title: string;
  status: string;
  scanning: string;
  timezone: string;
  language: string;
  device: string;
  screen: string;
  timeOfDay: string;
  protocol: string;
  desktop: string;
  mobile: string;
  tablet: string;
  morning: string;
  afternoon: string;
  evening: string;
  profile: string;
  privacy: string;
  footer: string;
};

type Row = { key: string; label: string; value: string };

/** Lê alguns dados não sensíveis do browser. Tudo fica no dispositivo do visitante. */
function readSession(l: Labels): Row[] {
  const w = window.innerWidth;
  const device = w < 640 ? l.mobile : w < 1024 ? l.tablet : l.desktop;
  const hour = new Date().getHours();
  const period = hour < 12 ? l.morning : hour < 19 ? l.afternoon : l.evening;
  return [
    { key: "tz", label: l.timezone, value: Intl.DateTimeFormat().resolvedOptions().timeZone || "—" },
    { key: "lang", label: l.language, value: navigator.language || "—" },
    { key: "device", label: l.device, value: device },
    { key: "screen", label: l.screen, value: `${window.screen.width}×${window.screen.height}` },
    { key: "time", label: l.timeOfDay, value: period },
    { key: "proto", label: l.protocol, value: location.protocol === "https:" ? "HTTPS · TLS" : location.protocol.replace(":", "").toUpperCase() },
  ];
}

/**
 * Janela de terminal que "analisa" a sessão do visitante, linha a linha,
 * quando entra no ecrã. Inspirada num script de reconhecimento.
 */
export function SessionTerminal({ labels }: { labels: Labels }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [visible, setVisible] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const data = readSession(labels);
    const init = requestAnimationFrame(() => setRows(data));
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const show = requestAnimationFrame(() => {
        setVisible(data.length);
        setDone(true);
      });
      return () => {
        cancelAnimationFrame(init);
        cancelAnimationFrame(show);
      };
    }
    let interval: ReturnType<typeof setInterval>;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      let i = 0;
      interval = setInterval(() => {
        i += 1;
        setVisible(i);
        if (i > data.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, 260);
    });
    observer.observe(el);
    return () => {
      cancelAnimationFrame(init);
      observer.disconnect();
      clearInterval(interval);
    };
  }, [labels]);

  return (
    <div
      ref={ref}
      className="flex h-full flex-col border border-border bg-[rgb(var(--secondary)/0.6)] font-mono text-[12px] leading-relaxed shadow-[0_0_40px_rgb(var(--accent-strong)/0.08)] sm:text-[13px]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="truncate text-muted">{labels.title}</span>
        </div>
        <span className="font-label inline-flex shrink-0 items-center gap-1.5 border border-emerald-500/30 px-2 py-0.5 text-[9px] text-emerald-600 dark:text-emerald-400">
          <ShieldCheck className="h-3 w-3" aria-hidden="true" />
          {labels.status}
        </span>
      </div>

      <div className="flex-1 space-y-1 px-4 py-4" aria-live="polite">
        <p className="text-muted">
          <span className="text-accent">$</span> ./recon.sh --visitor
        </p>
        <p className="text-muted/80">{labels.scanning}</p>
        {rows.slice(0, visible).map((row) => (
          <p key={row.key} className="grid grid-cols-[1rem_7.5rem_1fr] gap-x-2">
            <span className="text-emerald-600 dark:text-emerald-400">✔</span>
            <span className="text-muted">{row.label}</span>
            <span className="truncate text-foreground">{row.value}</span>
          </p>
        ))}
        {done && (
          <>
            <p className="pt-3 text-muted/70">─── {labels.profile} ───</p>
            <p className="text-accent-soft">
              <span className="text-emerald-600 dark:text-emerald-400">✔</span> {labels.privacy}
              <span className="cursor" aria-hidden="true" />
            </p>
          </>
        )}
        {!done && rows.length > 0 && <span className="cursor" aria-hidden="true" />}
      </div>

      <div className="font-label flex justify-between border-t border-border px-4 py-2 text-[9px] text-muted/80">
        <span>{labels.footer}</span>
        <span>exit 0</span>
      </div>
    </div>
  );
}
