import { Github, Linkedin, Mail } from "lucide-react";
import type { Locale } from "@/content/types";
import { profile } from "@/content/profile";
import { ui } from "@/content/ui";

// Data do build estático (o site é gerado de novo a cada deploy)
const buildDate = new Date();

export function Footer({ locale }: { locale: Locale }) {
  const { contact } = profile;
  const links = [
    { label: "GitHub", href: contact.github, Icon: Github },
    { label: "LinkedIn", href: contact.linkedin, Icon: Linkedin },
    { label: "Email", href: `mailto:${contact.email}`, Icon: Mail },
  ];
  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <p className="text-sm text-muted">
            © {buildDate.getFullYear()} {profile.name}. {ui.footer.rights[locale]}
          </p>
          <p className="font-label flex items-center gap-2 text-[10px] text-muted">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {ui.status.online[locale]}
            <span className="text-border">/</span>
            {ui.status.build[locale]} <time dateTime={buildDate.toISOString()}>{buildDate.toISOString().slice(0, 10)}</time>
          </p>
        </div>
        <ul className="flex items-center gap-1">
          {links.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex h-9 w-9 items-center justify-center text-muted transition-colors hover:text-accent-soft"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
