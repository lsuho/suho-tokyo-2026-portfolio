import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lee Suho | JISA Integrated Operations System",
  description: "전남대학교 인공지능전공 이수호의 2026 일본 인턴십 포트폴리오. JISA 다중 프로그램 통합 운영 시스템과 웹사이트 개발 과정을 소개합니다.",
  metadataBase: new URL("https://suho-tokyo-2026.isuho405.chatgpt.site"),
  openGraph: {
    title: "Lee Suho | JISA Integrated Operations System",
    description: "인턴십 운영을 하나의 시스템으로. 이수호의 2026 일본 인턴십 개발 포트폴리오.",
    type: "website",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "JISA Integrated Operations System by Lee Suho" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lee Suho | JISA Integrated Operations System",
    description: "인턴십 운영을 하나의 시스템으로. 이수호의 2026 일본 인턴십 개발 포트폴리오.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body className={`${geist.variable} ${mono.variable}`}>{children}</body></html>;
}
