"use client";

import { useI18n } from "@/lib/i18n-context";

export function SiteFooter() {
  const { messages } = useI18n();
  return (
    <footer className="site-footer localized-copy">
      <span className="footer-brand">RANDON LAB</span>
      <span>{messages.footer.note}</span>
      <span>{messages.footer.copyright}</span>
    </footer>
  );
}
