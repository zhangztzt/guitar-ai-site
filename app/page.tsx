"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { PageShell } from "@/components/page-shell";
import { ProductImage } from "@/components/product-image";

export default function Home() {
  const { messages } = useI18n();
  const copy = messages.home;

  return (
    <PageShell className="home-page">
      <section className="hero-shell">
        <div className="hero-copy localized-copy">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p className="hero-subtitle">{copy.subtitle}</p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/guitars">
              <span>{copy.explore}</span>
              <ArrowUpRight aria-hidden="true" size={18} />
            </Link>
            <Link className="button button-ghost" href="/ai-analysis">
              <span>{copy.analysis}</span>
              <ArrowUpRight aria-hidden="true" size={18} />
            </Link>
          </div>
        </div>

        <div className="hero-visual" aria-label={copy.imageAlt}>
          <div className="hero-orbit" />
          <div className="hero-number">01</div>
          <ProductImage
            src="/assets/guitar-advance.jpg"
            alt={copy.imageAlt}
            priority
            className="hero-guitar"
          />
          <div className="hero-spec localized-copy">
            <span>{copy.materialLabel}</span>
            <strong>{copy.materialValue}</strong>
          </div>
        </div>
      </section>

      <div className="hero-foot localized-copy">
        <span>{copy.scrollNote}</span>
        <span>{copy.collectionNote}</span>
      </div>
    </PageShell>
  );
}
