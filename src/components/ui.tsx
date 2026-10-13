import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { DecryptText } from "./effects/DecryptText";

/** Etiqueta mono no formato [ 01 / SOBRE ] */
export function SectionLabel({ index, children }: { index?: number; children: ReactNode }) {
  return (
    <p className="font-label mb-3 text-[11px] text-accent">
      [ {index !== undefined && <>{String(index).padStart(2, "0")} / </>}
      {children} ]
    </p>
  );
}

export function SectionHeader({
  index,
  label,
  title,
  subtitle,
  as: Heading = "h2",
}: {
  index?: number;
  label: string;
  title: string;
  subtitle?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className="mb-12 border-b border-border pb-6">
      <SectionLabel index={index}>{label}</SectionLabel>
      <Heading className="font-display text-4xl leading-[0.9] text-foreground sm:text-5xl md:text-6xl">
        <DecryptText text={title} />
      </Heading>
      {subtitle && <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">{subtitle}</p>}
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="font-label inline-flex items-center border border-accent/25 bg-accent/5 px-2 py-0.5 text-[10px] text-accent-soft">
      {children}
    </span>
  );
}

export function TagList({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag}>
          <Tag>{tag}</Tag>
        </li>
      ))}
    </ul>
  );
}

const buttonStyles = {
  primary:
    "bg-accent-strong text-white hover:bg-accent shadow-[0_0_24px_rgb(var(--accent-strong)/0.25)] hover:shadow-[0_0_32px_rgb(var(--accent-strong)/0.45)]",
  outline:
    "border border-accent/40 bg-background/50 text-foreground backdrop-blur-sm hover:border-accent hover:text-accent-soft hover:bg-accent/10",
  ghost: "border border-border text-foreground hover:border-accent/60 hover:bg-secondary",
};

type ButtonProps = {
  variant?: keyof typeof buttonStyles;
  size?: "md" | "lg";
  external?: boolean;
} & ComponentProps<"a">;

export function ButtonLink({
  variant = "primary",
  size = "md",
  external,
  className = "",
  href = "#",
  children,
  ...rest
}: ButtonProps) {
  const classes = `group inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 ${
    size === "lg" ? "h-12 px-7 text-base" : "h-10 px-4 text-sm"
  } ${buttonStyles[variant]} ${className}`;

  if (external || href.startsWith("mailto:") || href.startsWith("http") || href.endsWith(".pdf")) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http") || href.endsWith(".pdf") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
