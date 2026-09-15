"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ProductImage } from "@/components/product-image";
import { SiteFooter } from "@/components/site-footer";
import { PageShell } from "@/components/page-shell";
import { useI18n } from "@/lib/i18n-context";
import type { SeriesId } from "@/components/guitar-card";

const images: Record<SeriesId, string> = {
  start: "/assets/guitar-start.jpg",
  advance: "/assets/guitar-advance.jpg",
  master: "/assets/guitar-master.jpg",
};

export function SeriesPage({ id }: { id: SeriesId }) {
  const { messages } = useI18n();
  const category = messages.guitars.categories[id];
  const detail = messages.guitars.detail[id];
  const common = messages.guitars.detail;

  return (
    <PageShell className={`series-detail series-${id}`}>
      <Link className="text-back localized-copy" href="/guitars"><ArrowLeft size={16} />{common.back}</Link>
      <section className="series-hero">
        <div className="series-copy localized-copy">
          <p className="eyebrow">{category.code} / {common.featured}</p>
          <h1>{category.name}</h1>
          <h2>{detail.intro}</h2>
          <p>{detail.body}</p>
          <Link href="/ai-analysis" className="button button-dark">
            <span>{common.consult}</span><ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="series-image">
          <span className="series-watermark">{category.code}</span>
          <ProductImage src={images[id]} alt={`${category.name} ${messages.guitars.imageAlt}`} priority />
        </div>
      </section>

      <section className="product-list localized-copy">
        <div className="section-heading">
          <p className="eyebrow">{category.code}</p>
          <h2>{common.specs}</h2>
        </div>
        <div className="product-table" role="table">
          <div className="product-row product-head" role="row">
            <span role="columnheader">{common.model}</span>
            <span role="columnheader">{common.body}</span>
            <span role="columnheader">{common.wood}</span>
            <span role="columnheader">{common.price}</span>
          </div>
          {detail.products.map((product, index) => (
            <div className="product-row" role="row" key={product.model}>
              <span className="product-index">0{index + 1}</span>
              <strong role="cell">{product.model}</strong>
              <span role="cell">{product.body}</span>
              <span role="cell">{product.wood}</span>
              <span role="cell">{product.price}</span>
            </div>
          ))}
        </div>
      </section>
      <SiteFooter />
    </PageShell>
  );
}
