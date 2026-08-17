import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SUMMER IN TOKYO | Lee Suho Internship Portfolio 2026",
  description: "푸른 바다와 여름밤 불꽃놀이로 기록한 이수호의 2026 일본 인턴십 포트폴리오",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body className={`${geist.variable} ${mono.variable}`}>{children}</body></html>;
}
