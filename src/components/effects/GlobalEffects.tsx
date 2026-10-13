"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useEffect } from "react";

/**
 * Efeitos globais, montados uma vez no layout:
 * - barra de progresso de scroll no topo;
 * - "spotlight": elementos com a classe .spotlight recebem a posição do rato (--x, --y);
 * - assinatura na consola para quem abrir as DevTools.
 */
export function GlobalEffects({ consoleMessage, email }: { consoleMessage: string; email: string }) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.<HTMLElement>(".spotlight");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--y", `${e.clientY - rect.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    const w = window as Window & { __vkSigned?: boolean };
    if (w.__vkSigned) return;
    w.__vkSigned = true;
    console.log(
      "%c VK %c victor-kangombe ",
      "background:#2563eb;color:#fff;font-weight:700;padding:4px 6px",
      "background:#0a0d14;color:#60a5fa;padding:4px 6px;font-family:monospace",
    );
    console.log(`%c${consoleMessage} ${email}`, "color:#9ca3af;font-family:monospace");
  }, [consoleMessage, email]);

  if (reduce) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-gradient-to-r from-accent-strong via-accent-soft to-cyan-400"
      style={{ scaleX }}
    />
  );
}
