"use client";

import Link from "next/link";
import { ArrowRight, Clock3, ShieldCheck, Sparkles } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { SiteFooter } from "@/components/site-footer";
import { useAnalysis } from "@/lib/analysis-context";
import { useI18n } from "@/lib/i18n-context";

export default function AnalysisHomePage() {
  const { messages } = useI18n();
  const { hasProgress } = useAnalysis();
  const copy = messages.analysis;
  return (
    <PageShell className="analysis-home">
      <section className="analysis-intro">
        <div className="analysis-copy localized-copy">
          <p className="eyebrow"><Sparkles size={14} />{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p>{copy.subtitle}</p>
          <Link href="/ai-analysis/questions" className="button button-dark analysis-start">
            <span>{hasProgress ? copy.resume : copy.start}</span><ArrowRight size={18} />
          </Link>
          <div className="analysis-meta">
            <span><Clock3 size={15} />{copy.time}</span>
            <span><ShieldCheck size={15} />{copy.privacy}</span>
          </div>
        </div>
        <div className="analysis-map localized-copy">
          <div className="map-center">
            <span className="map-pulse" />
            <strong>{copy.visualTitle}</strong>
            <small>{copy.visualSubtitle}</small>
          </div>
          {copy.steps.map((step, index) => (
            <div className={`map-node map-node-${index + 1}`} key={step}>
              <span>0{index + 1}</span><strong>{step}</strong>
            </div>
          ))}
        </div>
      </section>
      <SiteFooter />
    </PageShell>
  );
}
