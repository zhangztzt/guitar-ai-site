"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductImage } from "@/components/product-image";
import { useI18n } from "@/lib/i18n-context";

export type SeriesId = "start" | "advance" | "master";

const images: Record<SeriesId, string> = {
  start: "/assets/guitar-start.jpg",
  advance: "/assets/guitar-advance.jpg",
  master: "/assets/guitar-master.jpg",
};

export function GuitarCard({ id, index }: { id: SeriesId; index: number }) {
  const { messages } = useI18n();
  const copy = messages.guitars.categories[id];
  return (
    <Link href={`/guitars/${id}`} className={`guitar-card card-${id}`}>
      <div className="card-topline">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span>{copy.code}</span>
      </div>
      <div className="card-image-wrap">
        <ProductImage src={images[id]} alt={`${copy.name} ${messages.guitars.imageAlt}`} />
      </div>
      <div className="card-copy localized-copy">
        <h2>{copy.name}</h2>
        <p>{copy.tagline}</p>
        <div className="card-tags">
          {copy.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <span className="card-link">{messages.guitars.view}<ArrowRight aria-hidden="true" size={17} /></span>
      </div>
    </Link>
  );
}
