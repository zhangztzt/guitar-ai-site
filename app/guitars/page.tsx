"use client";

import { GuitarCard, type SeriesId } from "@/components/guitar-card";
import { PageShell } from "@/components/page-shell";
import { SiteFooter } from "@/components/site-footer";
import { useI18n } from "@/lib/i18n-context";

const series: SeriesId[] = ["start", "advance", "master"];

export default function GuitarsPage() {
  const { messages } = useI18n();
  return (
    <PageShell className="guitars-page">
      <header className="page-heading localized-copy">
        <p className="eyebrow">{messages.guitars.eyebrow}</p>
        <h1>{messages.guitars.title}</h1>
        <p>{messages.guitars.subtitle}</p>
      </header>
      <section className="guitar-grid">
        {series.map((id, index) => <GuitarCard key={id} id={id} index={index} />)}
      </section>
      <SiteFooter />
    </PageShell>
  );
}
