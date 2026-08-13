"use client";

import {
  ArrowDown,
  ArrowRight,
  Building2,
  CheckCircle2,
  Database,
  FileOutput,
  GraduationCap,
  Languages,
  Menu,
  RefreshCw,
  School,
  ShieldCheck,
  Sparkles,
  UserCog,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

type Language = "ko" | "ja";
type Copy = { ko: string; ja: string };

const t = (language: Language, copy: Copy) => copy[language];

const roleData = [
  {
    icon: UserCog,
    key: "ADMIN",
    title: { ko: "JISA 관리자", ja: "JISA管理者" },
    body: { ko: "프로그램 생성부터 계정, 기록, 오류, 백업과 내보내기까지 전체 운영을 관리합니다.", ja: "プログラム作成からアカウント、記録、エラー、バックアップ、出力まで運営全体を管理します。" },
  },
  {
    icon: GraduationCap,
    key: "STUDENT",
    title: { ko: "참가 학생", ja: "参加学生" },
    body: { ko: "활동일지와 사진을 제출하고, 기업 코멘트와 자신의 진행 상황을 확인합니다.", ja: "活動日誌と写真を提出し、企業コメントと自分の進捗状況を確認します。" },
  },
  {
    icon: Building2,
    key: "COMPANY",
    title: { ko: "실습 기업", ja: "実習企業" },
    body: { ko: "소속 학생의 기록을 검토하고 현장 피드백과 평가를 남깁니다.", ja: "所属学生の記録を確認し、現場からのフィードバックと評価を入力します。" },
  },
  {
    icon: School,
    key: "SCHOOL",
    title: { ko: "소속 학교", ja: "所属大学" },
    body: { ko: "소속 학생의 제출률과 활동을 확인하고 필요한 문서를 내려받습니다.", ja: "所属学生の提出率と活動を確認し、必要な書類をダウンロードします。" },
  },
];

const challengeData = [
  {
    no: "01",
    title: { ko: "권한이 섞이지 않게", ja: "権限を混在させない" },
    body: { ko: "브라우저가 전달한 역할이나 기관 ID를 그대로 믿지 않고, 서버에서 세션·프로그램·소속 기관을 다시 검증하도록 설계했습니다.", ja: "ブラウザから渡された役割や機関IDをそのまま信頼せず、サーバー側でセッション・プログラム・所属機関を再検証する設計にしました。" },
  },
  {
    no: "02",
    title: { ko: "기록이 빠지지 않게", ja: "記録を欠落させない" },
    body: { ko: "폼 원본과 시스템 기록을 10분마다 대조하고, 실패 응답을 보존해 관리자가 선택적으로 재처리할 수 있게 만들었습니다.", ja: "フォーム原本とシステム記録を10分ごとに照合し、失敗時の回答を保存して管理者が選択的に再処理できるようにしました。" },
  },
  {
    no: "03",
    title: { ko: "느리지 않게", ja: "動作を重くしない" },
    body: { ko: "화면 뼈대를 먼저 표시하고 필요한 데이터만 지연 로딩했습니다. 목록 제한과 필터 우선 적용으로 Apps Script 실행 한계를 피했습니다.", ja: "画面の骨格を先に表示し、必要なデータだけを遅延読込しました。件数制限とフィルター優先でApps Scriptの実行制限を回避しました。" },
  },
  {
    no: "04",
    title: { ko: "운영자가 스스로 복구하게", ja: "運営者自身が復旧できるように" },
    body: { ko: "오류 진단, 작업 이력, 예약 백업, 복원 전 미리보기를 넣어 개발자 없이도 문제를 발견하고 되돌릴 수 있게 했습니다.", ja: "エラー診断、操作履歴、定期バックアップ、復元前プレビューを備え、開発者がいなくても問題を発見し復旧できるようにしました。" },
  },
];

const skillData = [
  ["01", { ko: "요구사항 분석", ja: "要件分析" }, { ko: "모호한 현장 요청을 실제 화면과 기능 단위로 바꾸는 법", ja: "曖昧な現場要望を画面と機能の単位に変換する力" }],
  ["02", { ko: "시스템 설계", ja: "システム設計" }, { ko: "프로그램을 데이터 경계로 삼고 역할별 흐름을 분리하는 법", ja: "プログラムをデータ境界とし、役割別に流れを分ける設計" }],
  ["03", { ko: "풀스택 구현", ja: "フルスタック実装" }, { ko: "HTML·CSS·JavaScript와 Apps Script를 연결해 운영 제품으로 완성", ja: "HTML・CSS・JavaScriptとApps Scriptを接続し、運用製品として完成" }],
  ["04", { ko: "신뢰성과 보안", ja: "信頼性とセキュリティ" }, { ko: "중복 방지, 세션 만료, 서버 검증, 백업과 복구 설계", ja: "重複防止、セッション期限、サーバー検証、バックアップと復旧" }],
];

function ProjectImage({ src, alt, caption, className = "" }: { src: string; alt: string; caption?: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  const basePath = typeof document === "undefined" ? "" : document.documentElement.dataset.basePath || "";
  const resolved = src.startsWith("/") ? `${basePath}${src}` : src;
  return (
    <figure className={`projectImage ${className}`}>
      {!failed ? <img src={resolved} alt={alt} onError={() => setFailed(true)} /> : <div className="imageFallback">{alt}</div>}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export function Portfolio() {
  const [language, setLanguage] = useState<Language>("ko");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeRole, setActiveRole] = useState(0);
  const isJa = language === "ja";

  useEffect(() => {
    const saved = localStorage.getItem("suho-portfolio-language");
    if (saved === "ko" || saved === "ja") setLanguage(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem("suho-portfolio-language", language);
  }, [language]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible"));
    }, { threshold: 0.12 });
    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const nav = [
    [isJa ? "代表作" : "대표작", "system"],
    [isJa ? "設計" : "설계", "architecture"],
    [isJa ? "課題" : "난관", "challenges"],
    [isJa ? "その他の制作" : "다른 제작", "more"],
    [isJa ? "成長" : "성장", "growth"],
  ];

  return (
    <>
      <header className="siteHeader">
        <a href="#top" className="brand" onClick={closeMenu} aria-label="Lee Suho portfolio home">
          <b>LEE SUHO</b><span>AI · SYSTEM · TOKYO 2026</span>
        </a>
        <nav className={menuOpen ? "open" : ""} aria-label={isJa ? "メインメニュー" : "주요 메뉴"}>
          {nav.map(([label, id]) => <a key={id} href={`#${id}`} onClick={closeMenu}>{label}</a>)}
        </nav>
        <div className="headerActions">
          <button className="languageButton" onClick={() => setLanguage(isJa ? "ko" : "ja")} aria-label={isJa ? "韓国語に変更" : "일본어로 변경"}>
            <Languages aria-hidden="true" /><span>{isJa ? "한국어" : "日本語"}</span>
          </button>
          <button className="menuButton" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? (isJa ? "メニューを閉じる" : "메뉴 닫기") : (isJa ? "メニューを開く" : "메뉴 열기")}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="heroBackdrop" aria-hidden="true">
            <ProjectImage src="/images/system-report/image1.png" alt="JISA integrated management system dashboard" />
          </div>
          <div className="heroVeil" />
          <div className="heroContent">
            <p className="eyebrow">CHONNAM NATIONAL UNIVERSITY · AI MAJOR</p>
            <h1>{isJa ? <>インターンシップ運営を、<br /><em>一つのシステムへ。</em></> : <>인턴십 운영을,<br /><em>하나의 시스템으로.</em></>}</h1>
            <p className="heroLead">{isJa ? "分散していた学生・企業・大学の記録を統合し、現場で継続運用できる管理システムを設計・開発しました。" : "흩어져 있던 학생·기업·학교의 기록을 통합하고, 현장에서 계속 사용할 수 있는 관리 시스템을 설계하고 개발했습니다."}</p>
            <div className="heroCtas">
              <a className="primaryButton" href="#system">{isJa ? "代表プロジェクトを見る" : "대표 프로젝트 보기"}<ArrowDown /></a>
              <span>LEE SUHO · TOKYO · SUMMER 2026</span>
            </div>
          </div>
          <div className="heroMetric" aria-label={isJa ? "運用実績" : "운영 실적"}>
            <span>{isJa ? "実運用データ" : "실제 운영 데이터"}</span>
            <strong>252</strong>
            <small>{isJa ? "活動記録" : "활동 기록"}</small>
          </div>
        </section>

        <section className="impactStrip" aria-label={isJa ? "プロジェクト規模" : "프로젝트 규모"}>
          {[
            ["9", isJa ? "参加学生" : "참가 학생"],
            ["6", isJa ? "受入企業" : "실습 기업"],
            ["2", isJa ? "連携大学" : "연계 학교"],
            ["4", isJa ? "利用者権限" : "사용자 권한"],
          ].map(([number, label]) => <div key={label}><strong>{number}</strong><span>{label}</span></div>)}
        </section>

        <section className="intro section" id="system">
          <div className="sectionIndex"><span>01</span><p>FLAGSHIP PROJECT</p></div>
          <div className="introHeading" data-reveal>
            <div>
              <p className="eyebrow">JISA INTEGRATED OPERATIONS SYSTEM</p>
              <h2>{isJa ? <>これは日誌フォームではなく、<br /><em>運営そのもの</em>です。</> : <>이것은 일지 폼이 아니라,<br /><em>운영 그 자체</em>입니다.</>}</h2>
            </div>
            <p>{isJa ? "複数プログラムの作成と終了、学生・企業・大学の管理、日誌・写真・コメント・文書、エラー復旧、バックアップ、出力までを一つの流れにまとめました。" : "여러 프로그램의 생성과 종료, 학생·기업·학교 관리, 일지·사진·코멘트·문서, 오류 복구, 백업과 내보내기까지 하나의 흐름으로 통합했습니다."}</p>
          </div>

          <div className="systemShowcase" data-reveal>
            <div className="browserFrame">
              <div className="browserTop"><i /><i /><i /><span>JISA / MULTI-PROGRAM DASHBOARD</span></div>
              <ProjectImage src="/images/system-report/image1.png" alt={isJa ? "複数プログラム統合ダッシュボード" : "멀티 프로그램 통합 대시보드"} />
            </div>
            <aside>
              <span className="status"><i /> LIVE OPERATIONS</span>
              <h3>{isJa ? "プログラムが増えても、同じ仕組みで運営できます。" : "프로그램이 늘어나도, 같은 구조로 운영할 수 있습니다."}</h3>
              <p>{isJa ? "プログラムを最上位のデータ境界として設計しました。担当者は新しいプログラムを作成し、関係者を割り当て、終了後は履歴として安全に保管できます。" : "프로그램을 최상위 데이터 경계로 설계했습니다. 담당자는 새 프로그램을 만들고 관계자를 배정하며, 종료 후에는 기록을 안전하게 보관할 수 있습니다."}</p>
              <ul>
                <li><CheckCircle2 />{isJa ? "複数プログラムを一画面で管理" : "여러 프로그램을 한 화면에서 관리"}</li>
                <li><CheckCircle2 />{isJa ? "既存データを変更せず検証" : "원본 데이터를 바꾸지 않고 검증"}</li>
                <li><CheckCircle2 />{isJa ? "管理者が直接アカウントを運用" : "관리자가 직접 계정을 운영"}</li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="beforeAfter fullBand">
          <div className="section narrow">
            <div className="comparison" data-reveal>
              <div className="before">
                <p>BEFORE</p>
                <h3>{isJa ? "記録が分散し、確認は人に依存" : "기록은 흩어지고, 확인은 사람에게 의존"}</h3>
                <span>{isJa ? "個別シート · メッセージ · 手作業 · 重複確認" : "개별 시트 · 메신저 · 수작업 · 중복 확인"}</span>
              </div>
              <ArrowRight aria-hidden="true" />
              <div className="after">
                <p>AFTER</p>
                <h3>{isJa ? "一つの画面で進捗と異常を把握" : "한 화면에서 진행 상황과 이상을 파악"}</h3>
                <span>{isJa ? "統合データ · 権限管理 · 自動照合 · 復旧" : "통합 데이터 · 권한 관리 · 자동 대조 · 복구"}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="architecture section" id="architecture">
          <div className="sectionIndex"><span>02</span><p>SYSTEM ARCHITECTURE</p></div>
          <div className="architectureHeading" data-reveal>
            <p className="eyebrow">ONE SYSTEM, FOUR EXPERIENCES</p>
            <h2>{isJa ? "同じデータを、役割ごとに正しく見せる。" : "같은 데이터를, 역할에 맞게 정확히 보여주기."}</h2>
            <p>{isJa ? "利用者が迷わない画面と、越えてはいけない権限の境界を同時に設計しました。" : "사용자가 헤매지 않는 화면과 넘어서는 안 되는 권한의 경계를 함께 설계했습니다."}</p>
          </div>
          <div className="roleExplorer" data-reveal>
            <div className="roleTabs" role="tablist" aria-label={isJa ? "利用者権限" : "사용자 권한"}>
              {roleData.map((role, index) => {
                const Icon = role.icon;
                return <button key={role.key} className={activeRole === index ? "active" : ""} onClick={() => setActiveRole(index)} role="tab" aria-selected={activeRole === index}><Icon /><span>{role.key}</span></button>;
              })}
            </div>
            <div className="roleDetail" role="tabpanel">
              <span>ROLE 0{activeRole + 1}</span>
              <h3>{t(language, roleData[activeRole].title)}</h3>
              <p>{t(language, roleData[activeRole].body)}</p>
            </div>
            <div className="dataCore"><Database /><strong>PROGRAM DATA CORE</strong><small>Google Sheets · Forms · Drive</small></div>
          </div>
        </section>

        <section className="reliability fullBand" id="challenges">
          <div className="section">
            <div className="sectionIndex light"><span>03</span><p>ENGINEERING DECISIONS</p></div>
            <div className="reliabilityLead" data-reveal>
              <div>
                <p className="eyebrow">THE HARDEST PART</p>
                <h2>{isJa ? <>「失敗しない」より、<br /><em>失敗しても戻せる</em>設計へ。</> : <>“실패하지 않게”보다,<br /><em>실패해도 돌아올 수 있게.</em></>}</h2>
              </div>
              <p>{isJa ? "本当に難しかったのは画面を作ることではありません。異なる役割と複数プログラムが同時に動く環境で、データを信頼できる状態に保つことでした。" : "진짜 어려웠던 것은 화면을 만드는 일이 아니었습니다. 서로 다른 권한과 여러 프로그램이 동시에 움직이는 환경에서 데이터를 믿을 수 있는 상태로 유지하는 일이었습니다."}</p>
            </div>
            <div className="challengeList">
              {challengeData.map((item) => <article key={item.no} data-reveal><span>{item.no}</span><h3>{t(language, item.title)}</h3><p>{t(language, item.body)}</p></article>)}
            </div>
            <div className="reliabilityRail" data-reveal>
              <div><ShieldCheck /><span>{isJa ? "サーバー権限検証" : "서버 권한 검증"}</span></div>
              <ArrowRight />
              <div><RefreshCw /><span>{isJa ? "10分ごとの自動照合" : "10분마다 자동 대조"}</span></div>
              <ArrowRight />
              <div><FileOutput /><span>{isJa ? "監査・バックアップ・復元" : "감사·백업·복원"}</span></div>
            </div>
          </div>
        </section>

        <section className="loginSection section">
          <div className="loginCopy" data-reveal>
            <p className="eyebrow">ACCESS EXPERIENCE</p>
            <h2>{isJa ? "入り口はシンプルに。判断はサーバーで厳密に。" : "입구는 단순하게. 판단은 서버에서 엄격하게."}</h2>
            <p>{isJa ? "学生・企業・大学・管理者が同じ入口を使い、ログイン後は自分に必要な機能だけを確認できます。パスワードはソルト付きハッシュで保存し、セッションには有効期限を設けました。" : "학생·기업·학교·관리자가 같은 입구를 사용하고, 로그인 후에는 자신에게 필요한 기능만 확인합니다. 비밀번호는 솔트가 적용된 해시로 저장하고 세션에는 만료 시간을 두었습니다."}</p>
          </div>
          <div className="loginVisual" data-reveal>
            <ProjectImage src="/images/system-report/image2.png" alt={isJa ? "JISA管理システムのログイン画面" : "JISA 관리 시스템 로그인 화면"} />
          </div>
        </section>

        <section className="moreWork section" id="more">
          <div className="sectionIndex"><span>04</span><p>MORE THAN ONE PRODUCT</p></div>
          <div className="moreHeading" data-reveal>
            <p className="eyebrow">JISA DIGITAL FOUNDATION</p>
            <h2>{isJa ? "運営システムだけでなく、JISAのWebサイトもゼロから。" : "운영 시스템뿐 아니라, JISA 웹사이트도 처음부터."}</h2>
          </div>
          <div className="websiteFeature" data-reveal>
            <ProjectImage src="/images/jisa-website-screenshot.png" alt={isJa ? "制作したJISA公式Webサイト" : "제작한 JISA 공식 웹사이트"} />
            <div>
              <span>WORDPRESS · BILINGUAL · RESPONSIVE</span>
              <h3>{isJa ? "資料を、使える情報設計へ" : "자료를, 사용할 수 있는 정보 구조로"}</h3>
              <p>{isJa ? "既存資料と事業内容を分析し、サイト構造・ブランドカラー・文字体系・余白・ボタン状態を再設計。日本語と韓国語に対応し、最終的にWordPressのカスタムテーマとして運用できる形まで実装しました。" : "기존 자료와 사업 내용을 분석해 사이트 구조, 브랜드 색상, 글자 체계, 여백과 버튼 상태를 다시 설계했습니다. 한국어와 일본어에 대응하고, 최종적으로 WordPress 사용자 정의 테마로 운영할 수 있는 형태까지 구현했습니다."}</p>
              <ul>
                <li>{isJa ? "情報構造・導線設計" : "정보 구조·사용자 동선"}</li>
                <li>{isJa ? "日韓言語切替" : "한일 언어 전환"}</li>
                <li>{isJa ? "WordPressテーマ化" : "WordPress 테마 제작"}</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="growth fullBand" id="growth">
          <div className="section">
            <div className="sectionIndex"><span>05</span><p>FROM AI STUDENT TO OPERATOR</p></div>
            <div className="growthHeader" data-reveal>
              <div>
                <p className="eyebrow">CHONNAM NATIONAL UNIVERSITY</p>
                <h2>{isJa ? "人工知能専攻で学んだ考え方を、現場の仕組みに変えました。" : "인공지능 전공에서 배운 사고방식을, 현장의 시스템으로 바꿨습니다."}</h2>
              </div>
              <p>{isJa ? "全南大学校人工知能学部・人工知能専攻3年。Python、データ分析、機械学習、Web開発で学んだ問題分解と検証の方法を、東京での実務に適用しました。" : "전남대학교 인공지능학부 인공지능전공 3학년. Python, 데이터 분석, 머신러닝과 웹 개발에서 배운 문제 분해와 검증 방식을 도쿄의 실무에 적용했습니다."}</p>
            </div>
            <div className="skillRows">
              {skillData.map(([no, title, body]) => <article key={no as string} data-reveal><span>{no as string}</span><h3>{t(language, title as Copy)}</h3><p>{t(language, body as Copy)}</p></article>)}
            </div>
            <div className="reflection" data-reveal>
              <Sparkles aria-hidden="true" />
              <blockquote>{isJa ? "最初は曖昧な依頼を機能に落とし込み、変化する日程の中で優先順位を決めることが難しかったです。確認事項をすぐ質問し、決定を記録し、重要度と期限で仕事を整理しました。技術だけでなく、説明・確認・共有まで含めて仕事は完成することを学びました。" : "처음에는 모호한 요청을 기능으로 바꾸고, 계속 달라지는 일정 속에서 우선순위를 정하는 일이 어려웠습니다. 확인할 것은 바로 질문하고, 결정은 기록하며, 중요도와 마감일로 일을 정리했습니다. 기술뿐 아니라 설명·확인·공유까지 포함해야 일이 완성된다는 것을 배웠습니다."}</blockquote>
            </div>
          </div>
        </section>

        <section className="finale">
          <p className="eyebrow">LEE SUHO · JAPAN INTERNSHIP 2026</p>
          <h2>{isJa ? <>参加しただけではありません。<br /><em>動く仕組みを残しました。</em></> : <>참여만 한 것이 아닙니다.<br /><em>작동하는 시스템을 남겼습니다.</em></>}</h2>
          <p>{isJa ? "AI · SYSTEM DESIGN · PROGRAM OPERATIONS · KOREAN / JAPANESE" : "AI · SYSTEM DESIGN · PROGRAM OPERATIONS · KOREAN / JAPANESE"}</p>
          <a href="#top">BACK TO TOP <ArrowRight /></a>
        </section>
      </main>
    </>
  );
}
