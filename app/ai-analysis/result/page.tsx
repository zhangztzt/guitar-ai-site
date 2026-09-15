"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { SiteFooter } from "@/components/site-footer";
import { useAnalysis, type AnswerKey } from "@/lib/analysis-context";
import { useI18n } from "@/lib/i18n-context";

export default function ResultPage() {
  const router = useRouter();
  const { messages } = useI18n();
  const { answers, reset } = useAnalysis();
  const result = messages.result;

  const answerLabel = (key: AnswerKey) => {
    const value = answers[key];
    for (const question of messages.questions.items) {
      const option = question.options.find((item) => item.value === value);
      if (option) return option.label;
    }
    return result.defaults[key];
  };

  const restart = () => {
    reset();
    router.push("/ai-analysis/questions");
  };

  const profile = [
    [result.labels.level, answerLabel("level")],
    [result.labels.direction, answerLabel("direction")],
    [result.labels.practice, `${answers.practice} ${messages.questions.minutes}`],
    [result.labels.challenge, answerLabel("challenge")],
    [result.labels.target, answerLabel("target")],
  ];

  return (
    <PageShell className="result-page">
      <header className="result-heading localized-copy">
        <p className="eyebrow"><Sparkles size={14} />{result.eyebrow}</p>
        <h1>{result.title}</h1>
        <p>{result.subtitle}</p>
      </header>

      <section className="profile-grid localized-copy">
        {profile.map(([label, value], index) => (
          <div className="profile-item" key={label}>
            <span>0{index + 1}</span><small>{label}</small><strong>{value}</strong>
          </div>
        ))}
      </section>

      <section className="training-route localized-copy" id="training-route">
        <div className="section-heading"><p className="eyebrow">04 WEEKS</p><h2>{result.routeTitle}</h2></div>
        <div className="week-grid">
          {result.weeks.map((week, index) => (
            <article className="week-card" key={week.week}>
              <div className="week-line"><span /><i>{index + 1}</i></div>
              <p>{week.week}</p><h3>{week.title}</h3><span>{week.note}</span>
            </article>
          ))}
        </div>
        <div className="result-actions">
          <Link className="button button-dark" href="#training-route"><span>{result.plan}</span><ArrowRight size={18} /></Link>
          <button className="button button-ghost" type="button" onClick={restart}><span>{result.restart}</span><RotateCcw size={17} /></button>
          <button className="future-button" type="button" disabled title={result.coming}>{result.askAi}<small>{result.coming}</small></button>
        </div>
      </section>
      <SiteFooter />
    </PageShell>
  );
}
