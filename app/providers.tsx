"use client";

import { I18nProvider } from "@/lib/i18n-context";
import { AnalysisProvider } from "@/lib/analysis-context";

export function SiteProviders({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <AnalysisProvider>{children}</AnalysisProvider>
    </I18nProvider>
  );
}
