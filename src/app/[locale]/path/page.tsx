import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { TimelineItem } from "@/components/TimelineItem";
import { pathEntries } from "@/content/experience";
import type { Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, path: "path", title: ui.path.title[locale], description: ui.path.subtitle[locale] });
}

export default async function PathPage({ params }: Props) {
  const { locale } = await params;
  return (
    <>
      <PageHeader label={ui.path.title[locale]} title={ui.path.title[locale]} subtitle={ui.path.subtitle[locale]} />

      <div className="container-page py-16 md:py-24">
        <ol className="max-w-3xl">
          {pathEntries.map((entry, i) => (
            <Reveal key={`${entry.organization}-${i}`}>
              <TimelineItem entry={entry} index={i + 1} locale={locale} />
            </Reveal>
          ))}
        </ol>
      </div>
    </>
  );
}
