"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { useAnalysis, type AnswerKey } from "@/lib/analysis-context";
import { useI18n } from "@/lib/i18n-context";

type MotionState = "idle" | "leaving-forward" | "leaving-back" | "enter-forward" | "enter-back";

export default function QuestionsPage() {
  const router = useRouter();
  const { messages } = useI18n();
  const { answers, step, setAnswer, setPractice, setStep } = useAnalysis();
  const [motion, setMotion] = useState<MotionState>("idle");
  const question = messages.questions.items[step];
  const key = question.key as AnswerKey | "practice";
  const selected = key === "practice" ? undefined : answers[key];

  const move = (next: number, direction: "forward" | "back") => {
    if (motion !== "idle") return;
    setMotion(direction === "forward" ? "leaving-forward" : "leaving-back");
    window.setTimeout(() => {
      setStep(next);
      setMotion(direction === "forward" ? "enter-forward" : "enter-back");
      window.setTimeout(() => setMotion("idle"), 360);
    }, 320);
  };

  const choose = (value: string) => {
    if (key === "practice" || motion !== "idle") return;
    setAnswer(key, value);
    if (step === 4) {
      setMotion("leaving-forward");
      window.setTimeout(() => router.push("/ai-analysis/result"), 360);
    } else {
      window.setTimeout(() => move(step + 1, "forward"), 120);
    }
  };

  const back = () => {
    if (step === 0) router.push("/ai-analysis");
    else move(step - 1, "back");
  };

  return (
    <main className="question-page">
      <div className="question-top">
        <Link href="/ai-analysis" className="text-back localized-copy"><ArrowLeft size={16} />{messages.questions.backHome}</Link>
        <div className="question-progress localized-copy">
          <div className="progress-copy">
            <span>{messages.questions.progress}</span>
            <strong>{String(step + 1).padStart(2, "0")} {messages.questions.of} 05</strong>
          </div>
          <Progress value={(step + 1) * 20} aria-label={`${step + 1} / 5`} />
        </div>
      </div>

      <section className={`question-stage ${motion}`}>
        <div className="question-panel localized-copy">
          <p className="question-number">0{step + 1}</p>
          <h1>{question.title}</h1>
          {key !== "practice" && <p className="question-hint">{messages.questions.selectHint}</p>}

          {key === "practice" ? (
            <div className="practice-control">
              <output><strong>{answers.practice}</strong><span>{messages.questions.minutes}</span></output>
              <Slider
                min={10}
                max={60}
                step={5}
                value={[answers.practice]}
                onValueChange={(value) => setPractice(value[0])}
                aria-label={question.title}
              />
              <div className="range-labels"><span>10 MIN</span><span>60 MIN</span></div>
              <button className="button button-dark question-next" type="button" onClick={() => move(3, "forward")}>
                <span>{messages.questions.next}</span><ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div className={`answer-grid ${question.options.length > 4 ? "compact" : ""}`}>
              {question.options.map((option, index) => (
                <button
                  type="button"
                  key={option.value}
                  className={`answer-option${selected === option.value ? " selected" : ""}`}
                  onClick={() => choose(option.value)}
                  style={{ animationDelay: `${index * 45}ms` }}
                >
                  <span className="option-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="option-copy"><strong>{option.label}</strong><small>{option.note}</small></span>
                  <span className="option-check"><Check size={15} /></span>
                </button>
              ))}
            </div>
          )}

          <button type="button" className="question-back" onClick={back}><ArrowLeft size={16} />{messages.questions.back}</button>
        </div>
      </section>
    </main>
  );
}
