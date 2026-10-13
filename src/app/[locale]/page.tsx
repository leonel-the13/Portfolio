import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { CompetitionCard } from "@/components/CompetitionCard";
import { CountUp } from "@/components/effects/CountUp";
import { TypeText } from "@/components/effects/TypeText";
import { focusIcons, WhatsAppIcon } from "@/components/icons";
import { Marquee } from "@/components/Marquee";
import { ProjectLinks } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { SessionTerminal } from "@/components/SessionTerminal";
import { SkillGroup } from "@/components/SkillGroup";
import { SmartImage } from "@/components/SmartImage";
import { ButtonLink, SectionHeader, SectionLabel, TagList } from "@/components/ui";
import { competitions } from "@/content/competitions";
import { profile } from "@/content/profile";
import { featuredProjectSlug, getProject, projects } from "@/content/projects";
import { skills } from "@/content/skills";
import type { Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { projectImages } from "@/lib/assets";
import { href, pad, t } from "@/lib/i18n";

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return (
    <>
      <Hero locale={locale} />
      <TechStrip />
      <About locale={locale} />
      <Featured locale={locale} />
      <Skills locale={locale} />
      <Competitions locale={locale} />
      <Contact locale={locale} />
    </>
  );
}

function Hero({ locale }: { locale: Locale }) {
  return (
    <section id="hero" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-20 pt-32 md:pb-28">
      {/* Grelha subtil em deriva, só do lado do texto */}
      <div
        className="bg-grid grid-drift pointer-events-none absolute inset-0 opacity-40"
        style={{ maskImage: "radial-gradient(ellipse 60% 70% at 15% 75%, #000 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Foto: no mobile ocupa o topo; no desktop fica à direita, com os degradês só nas margens */}
      <div className="absolute inset-x-0 top-0 h-[72%] lg:inset-y-0 lg:left-auto lg:h-full lg:w-[56%]">
        <Image
          src={profile.photo}
          alt={t(profile.photoAlt, locale)}
          fill
          priority
          sizes="(min-width: 1024px) 56vw, 100vw"
          className="object-cover object-[50%_22%]"
        />
        <div
          className="pointer-events-none absolute inset-0 lg:hidden"
          style={{
            background:
              "linear-gradient(to bottom, rgb(var(--background) / 0.35) 0%, transparent 15%, transparent 28%, rgb(var(--background) / 0.85) 54%, rgb(var(--background)) 80%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(to right, rgb(var(--background)) 0%, rgb(var(--background) / 0.85) 16%, rgb(var(--background) / 0.35) 32%, transparent 46%), linear-gradient(to top, rgb(var(--background)) 0%, transparent 28%), linear-gradient(to bottom, rgb(var(--background) / 0.45) 0%, transparent 16%)",
          }}
        />

        {/* Detalhe de identidade: mira à volta do rosto e linha de scan */}
        <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block" aria-hidden="true">
          <div className="scan-line absolute inset-x-0 h-px bg-accent-soft shadow-[0_0_18px_4px_rgb(var(--accent)/0.55)]" />
          <div className="fade-up absolute left-[40%] top-[10%] h-[34%] w-[30%]" style={{ animationDelay: "1.2s" }}>
            <span className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-accent-soft" />
            <span className="absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-accent-soft" />
            <span className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-accent-soft" />
            <span className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-accent-soft" />
            <span className="font-label absolute -bottom-8 left-0 whitespace-nowrap bg-[rgb(var(--photo-shade)/0.7)] px-2 py-1 text-[10px] text-white backdrop-blur-sm">
              <span className="mr-2 inline-block h-1.5 w-1.5 bg-emerald-400" />
              ID · VK-001 · {t(profile.location, locale)}
            </span>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 45% at 0% 100%, rgb(var(--accent-strong) / 0.2) 0%, transparent 60%)" }}
      />

      <div className="container-page relative z-10">
        <div className="max-w-4xl">
          <p className="font-label fade-up mb-4 text-[11px] text-accent md:mb-6 md:text-xs">{t(profile.greeting, locale)}</p>
          <h1 className="font-display text-[clamp(3.5rem,12vw,9.5rem)] leading-[0.86] tracking-tight">
            <span className="block overflow-hidden">
              <span className="rise block text-foreground">{profile.firstName}</span>
            </span>
            <span className="block overflow-hidden">
              <span
                className="rise block bg-gradient-to-r from-accent-strong via-accent-soft to-cyan-400 bg-clip-text pb-2 text-transparent"
                style={{ animationDelay: "120ms" }}
              >
                {profile.lastName}
              </span>
            </span>
          </h1>
          <p
            className="font-label fade-up mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-foreground/80 sm:text-sm md:mt-8"
            style={{ animationDelay: "350ms" }}
          >
            {profile.roleParts.map((part, i) => (
              <span key={i} className="flex w-full items-center gap-3 sm:w-auto">
                {i > 0 && <span className="hidden text-accent sm:inline">|</span>}
                <span>{t(part, locale)}</span>
              </span>
            ))}
          </p>

          <div className="mt-8 md:mt-10 lg:flex lg:items-end lg:justify-between lg:gap-10">
            <p
              className="fade-up min-h-[3.2em] font-mono text-sm text-foreground/75 sm:text-base lg:border-l lg:border-foreground/15 lg:pl-6"
              style={{ animationDelay: "500ms" }}
            >
              <span className="text-accent">$</span> <TypeText text={profile.terminal.command} delay={700} speed={70} />
              <br />
              <span className="text-muted">→</span> <TypeText text={profile.terminal.output} delay={1300} />
              <span className="cursor" aria-hidden="true" />
            </p>
            <div className="fade-up mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4 lg:mt-0" style={{ animationDelay: "650ms" }}>
              <ButtonLink href={href(locale, "projects")} size="lg">
                {ui.hero.viewWork[locale]}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="#contact" variant="outline" size="lg">
                <Mail className="h-4 w-4" aria-hidden="true" />
                {ui.hero.getInTouch[locale]}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>

      <div className="fade-up absolute bottom-10 right-6 z-10 hidden flex-col items-center gap-3 md:flex md:right-12" style={{ animationDelay: "900ms" }} aria-hidden="true">
        <span className="h-10 w-px bg-gradient-to-b from-accent to-transparent" />
        <span className="font-label text-[10px] text-muted" style={{ writingMode: "vertical-rl" }}>
          {ui.hero.scroll[locale]}
        </span>
      </div>
    </section>
  );
}

function TechStrip() {
  // Nomes próprios das competências (os itens traduzidos ficam de fora)
  const items = skills.flatMap((g) => g.items).filter((item): item is string => typeof item === "string");
  return <Marquee items={items} />;
}

function About({ locale }: { locale: Locale }) {
  const stats = [
    { label: ui.stats.projects[locale], value: projects.length },
    { label: ui.stats.competitions[locale], value: competitions.length },
    { label: ui.stats.firstPlaces[locale], value: competitions.filter((c) => c.position === 1).length },
    { label: ui.stats.technologies[locale], value: skills.reduce((n, g) => n + g.items.length, 0) },
  ];
  const session = Object.fromEntries(
    Object.entries(ui.session).map(([key, value]) => [key, value[locale]]),
  ) as Record<keyof typeof ui.session, string>;

  return (
    <section id="about" className="border-t border-border py-24 md:py-32">
      <div className="container-page">
        <Reveal>
          <SectionHeader index={1} label={ui.sections.about[locale]} title={ui.sections.aboutTitle[locale]} />
        </Reveal>
        <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          <Reveal className="h-full">
            <div className="flex h-full flex-col border border-border p-6 sm:p-8">
              <p className="mb-6 text-lg leading-relaxed text-foreground/90">{t(profile.about[0], locale)}</p>
              <p className="text-base leading-relaxed text-muted">{t(profile.about[1], locale)}</p>
              <dl className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-6 [&]:mt-8 lg:[&]:mt-auto">
                <dt className="font-label text-[10px] text-accent">{ui.sections.languages[locale]}</dt>
                {profile.languages.map((lang) => (
                  <dd key={lang.name.en} className="text-sm text-foreground/90">
                    {t(lang.name, locale)} <span className="text-muted">— {t(lang.level, locale)}</span>
                  </dd>
                ))}
              </dl>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="h-full">
            <SessionTerminal labels={session} />
          </Reveal>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {profile.focus.map((item, i) => {
            const Icon = focusIcons[item.icon];
            return (
              <div key={item.icon} className="bg-background">
              <Reveal delay={i * 0.06} className="h-full">
                <div className="spotlight group flex h-full flex-col bg-background p-6 transition-colors duration-300 hover:bg-secondary/40">
                  <div className="mb-6 flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center border border-accent/30 bg-accent/5 transition-colors duration-300 group-hover:border-accent group-hover:bg-accent/15">
                      <Icon className="h-5 w-5 text-accent-soft" aria-hidden="true" />
                    </span>
                    <span className="font-label text-[10px] text-muted">{pad(i + 1)}</span>
                  </div>
                  <h3 className="font-display mb-2 text-2xl text-foreground">{t(item.title, locale)}</h3>
                  <p className="text-sm leading-relaxed text-muted">{t(item.text, locale)}</p>
                </div>
              </Reveal>
              </div>
            );
          })}
        </div>

        <dl className="mt-4 grid grid-cols-2 border border-border lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`p-6 ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b lg:border-b-0" : ""} border-border lg:border-r lg:last:border-r-0`}
            >
              <dd className="font-display text-5xl text-foreground md:text-6xl">
                <CountUp value={stat.value} />
              </dd>
              <dt className="font-label mt-2 text-[10px] text-muted">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Featured({ locale }: { locale: Locale }) {
  const project = getProject(featuredProjectSlug);
  if (!project) return null;
  const cover = projectImages(project.slug, project.cover)[0];
  return (
    <section id="projects" className="border-t border-border py-24 md:py-32">
      <div className="container-page">
        <Reveal>
          <SectionHeader index={2} label={ui.sections.projects[locale]} title={ui.sections.featuredTitle[locale]} />
        </Reveal>
        <Reveal>
          <article className="group grid border border-border lg:grid-cols-[1.15fr_1fr]">
            <Link
              href={href(locale, `projects/${project.slug}`)}
              className="relative block aspect-[16/10] overflow-hidden border-b border-border lg:aspect-auto lg:min-h-[420px] lg:border-b-0 lg:border-r"
              tabIndex={-1}
              aria-hidden="true"
            >
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]">
                <SmartImage
                  src={cover}
                  alt=""
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  fallbackTitle={project.name}
                  fallbackLabel={t(project.tagline, locale)}
                />
              </div>
            </Link>
            <div className="flex flex-col p-6 sm:p-10">
              <SectionLabel>
                {ui.projects.featured[locale]} — {pad(1)}
              </SectionLabel>
              <h3 className="font-display mt-2 text-4xl text-foreground sm:text-5xl">
                <Link href={href(locale, `projects/${project.slug}`)} className="hover:text-accent-soft">
                  {project.name}
                </Link>
              </h3>
              <p className="font-label mt-3 text-[11px] text-muted">
                {t(project.tagline, locale)} · {project.year}
              </p>
              <p className="mt-6 leading-relaxed text-muted">{t(project.summary, locale)}</p>
              <div className="mt-8 space-y-6 lg:mt-auto lg:pt-8">
                <TagList tags={project.tags} />
                <ProjectLinks project={project} locale={locale} />
              </div>
            </div>
          </article>
        </Reveal>
        <div className="mt-10 text-center">
          <ButtonLink href={href(locale, "projects")} variant="ghost">
            {ui.projects.viewAll[locale]}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

function Skills({ locale }: { locale: Locale }) {
  return (
    <section id="skills" className="border-t border-border py-24 md:py-32">
      <div className="container-page">
        <Reveal>
          <SectionHeader index={3} label={ui.sections.skills[locale]} title={ui.sections.skillsTitle[locale]} />
        </Reveal>
        <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <div key={group.title.en} className="bg-background">
              <Reveal delay={(i % 3) * 0.05} className="h-full">
                <SkillGroup title={group.title} items={group.items} index={i + 1} locale={locale} />
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Competitions({ locale }: { locale: Locale }) {
  return (
    <section id="competitions" className="border-t border-border py-24 md:py-32">
      <div className="container-page">
        <Reveal>
          <SectionHeader index={4} label={ui.sections.competitions[locale]} title={ui.sections.competitionsTitle[locale]} />
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {competitions.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 3) * 0.05} className="h-full">
              <CompetitionCard competition={c} locale={locale} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ locale }: { locale: Locale }) {
  const { contact } = profile;
  const whatsapp = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(t(contact.whatsappMessage, locale))}`;
  const socials = [
    { label: "GitHub", handle: contact.github.replace("https://", ""), href: contact.github, Icon: Github },
    { label: "LinkedIn", handle: contact.linkedin.replace("https://", ""), href: contact.linkedin, Icon: Linkedin },
  ];
  return (
    <section id="contact" className="relative overflow-hidden border-t border-border py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgb(var(--accent-strong) / 0.14) 0%, transparent 70%)" }}
      />
      <div className="container-page relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionLabel index={5}>{ui.sections.contact[locale]}</SectionLabel>
          <h2 className="font-display text-5xl text-foreground sm:text-6xl md:text-7xl">{t(contact.title, locale)}</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted">{t(contact.text, locale)}</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <ButtonLink href={`mailto:${contact.email}`} size="lg">
              <Mail className="h-4 w-4" aria-hidden="true" />
              {ui.contact.email[locale]}
            </ButtonLink>
            <ButtonLink href={whatsapp} variant="outline" size="lg">
              <WhatsAppIcon className="h-4 w-4" />
              {ui.contact.whatsapp[locale]}
            </ButtonLink>
          </div>
          <p className="mt-6 font-mono text-sm text-muted">{contact.email}</p>
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-2">
          {socials.map(({ label, handle, href: link, Icon }) => (
            <a
              key={label}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between border border-border bg-background/60 p-5 backdrop-blur-sm transition-all duration-300 hover:translate-x-1 hover:border-accent/50"
            >
              <span className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center bg-secondary transition-colors group-hover:bg-accent/15">
                  <Icon className="h-5 w-5 text-foreground" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-base font-medium text-foreground group-hover:text-accent-soft">{label}</span>
                  <span className="block text-xs text-muted">{handle}</span>
                </span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted transition-colors group-hover:text-accent-soft" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
