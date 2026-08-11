import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SUHO IN TOKYO | Japan Internship 2026",
  description: "2026 일본 인턴십 프로그램 운영, 시스템 개발, 커뮤니케이션 활동 포트폴리오",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body className={`${geist.variable} ${mono.variable}`}>{children}</body></html>;
}
