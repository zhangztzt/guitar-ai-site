"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import zh from "@/locales/zh.json";
import ru from "@/locales/ru.json";

export type Language = "zh" | "ru";
type Messages = typeof zh;
type I18nValue = {
  language: Language;
  messages: Messages;
  switching: boolean;
  setLanguage: (language: Language) => void;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setCurrentLanguage] = useState<Language>("zh");
  const [switching, setSwitching] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("randon-language") as Language | null;
    if (saved === "zh" || saved === "ru") setCurrentLanguage(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "ru";
  }, [language]);

  const setLanguage = useCallback((next: Language) => {
    if (next === language || switching) return;
    setSwitching(true);
    window.setTimeout(() => {
      setCurrentLanguage(next);
      window.localStorage.setItem("randon-language", next);
      window.setTimeout(() => setSwitching(false), 40);
    }, 180);
  }, [language, switching]);

  const value = useMemo(() => ({
    language,
    messages: (language === "zh" ? zh : ru) as Messages,
    switching,
    setLanguage,
  }), [language, switching, setLanguage]);

  return (
    <I18nContext.Provider value={value}>
      <div className={`language-stage${switching ? " is-switching" : ""}`}>{children}</div>
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside I18nProvider");
  return value;
}
