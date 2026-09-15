import type { Metadata } from "next";
import "./globals.css";
import { SiteProviders } from "./providers";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Randon Guitar Lab",
  description: "中俄双语吉他探索与智能训练体验。",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <SiteProviders>
          <Navbar />
          {children}
        </SiteProviders>
      </body>
    </html>
  );
}
