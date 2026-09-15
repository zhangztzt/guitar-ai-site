"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type AnswerKey = "level" | "direction" | "challenge" | "target";
export type AnalysisAnswers = Partial<Record<AnswerKey, string>> & { practice: number };

type AnalysisValue = {
  answers: AnalysisAnswers;
  step: number;
  hasProgress: boolean;
  setAnswer: (key: AnswerKey, value: string) => void;
  setPractice: (value: number) => void;
  setStep: (step: number) => void;
  reset: () => void;
};

const initialAnswers: AnalysisAnswers = { practice: 30 };
const AnalysisContext = createContext<AnalysisValue | null>(null);

export function AnalysisProvider({ children }: { children: React.ReactNode }) {
  const [answers, setAnswers] = useState<AnalysisAnswers>(initialAnswers);
  const [step, setStepState] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("randon-analysis");
      if (saved) {
        const parsed = JSON.parse(saved) as { answers?: AnalysisAnswers; step?: number };
        if (parsed.answers) setAnswers({ ...initialAnswers, ...parsed.answers });
        if (typeof parsed.step === "number") setStepState(Math.min(4, Math.max(0, parsed.step)));
      }
    } catch {
      window.localStorage.removeItem("randon-analysis");
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem("randon-analysis", JSON.stringify({ answers, step }));
  }, [answers, step, hydrated]);

  const value = useMemo<AnalysisValue>(() => ({
    answers,
    step,
    hasProgress: step > 0 || Object.keys(answers).some((key) => key !== "practice"),
    setAnswer: (key, value) => setAnswers((current) => ({ ...current, [key]: value })),
    setPractice: (value) => setAnswers((current) => ({ ...current, practice: value })),
    setStep: (next) => setStepState(Math.min(4, Math.max(0, next))),
    reset: () => {
      setAnswers(initialAnswers);
      setStepState(0);
      window.localStorage.removeItem("randon-analysis");
    },
  }), [answers, step]);

  return <AnalysisContext.Provider value={value}>{children}</AnalysisContext.Provider>;
}

export function useAnalysis() {
  const value = useContext(AnalysisContext);
  if (!value) throw new Error("useAnalysis must be used inside AnalysisProvider");
  return value;
}
