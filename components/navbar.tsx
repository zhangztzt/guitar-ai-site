"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Languages } from "lucide-react";
import { useEffect, useState } from "react";
import { useI18n, type Language } from "@/lib/i18n-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const pathname = usePathname();
  const { language, messages, setLanguage } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const choose = (next: Language) => {
    setOpen(false);
    setLanguage(next);
  };

  return (
    <header className={`site-nav${scrolled ? " is-scrolled" : ""}`}>
      <Link href="/" className="brand" aria-label={messages.nav.homeLabel}>
        <span className="brand-mark">R</span>
        <span className="brand-word">RANDON <i>LAB</i></span>
      </Link>
      <nav className="nav-links localized-copy" aria-label={messages.nav.primaryLabel}>
        <Link href="/guitars" className={pathname.startsWith("/guitars") ? "active" : ""}><span className="nav-full">{messages.nav.guitars}</span><span className="nav-short">{messages.nav.guitarsShort}</span></Link>
        <Link href="/ai-analysis" className={pathname.startsWith("/ai-analysis") ? "active" : ""}><span className="nav-full">{messages.nav.analysis}</span><span className="nav-short">{messages.nav.analysisShort}</span></Link>
      </nav>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <div className="language-menu">
          <DropdownMenuTrigger className="language-trigger localized-copy" aria-label={messages.nav.languageMenu}>
            <Languages className="language-icon" aria-hidden="true" size={15} />
            <span className="language-full">{messages.nav.language}</span>
            <span className="language-short">{messages.nav.languageShort}</span>
            <ChevronDown aria-hidden="true" size={15} className={open ? "rotate" : ""} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={10} className="language-popover">
            <DropdownMenuRadioGroup value={language} onValueChange={(value) => choose(value as Language)}>
              <DropdownMenuRadioItem value="zh">{messages.nav.languages.zh}</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="ru">{messages.nav.languages.ru}</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </div>
      </DropdownMenu>
    </header>
  );
}
