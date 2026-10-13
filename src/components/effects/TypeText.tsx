"use client";

import { useEffect, useState } from "react";

/** Escreve o texto letra a letra, depois de um atraso. Sem animação se o utilizador preferir. */
export function TypeText({ text, delay = 0, speed = 38 }: { text: string; delay?: number; speed?: number }) {
  const [count, setCount] = useState(text.length);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const reset = requestAnimationFrame(() => setCount(0));
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, delay);
    return () => {
      cancelAnimationFrame(reset);
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay, speed]);

  return (
    <span aria-label={text}>
      <span aria-hidden="true">{text.slice(0, count)}</span>
    </span>
  );
}
