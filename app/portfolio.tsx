"use client";

import {
  ArrowDown, ArrowRight, BookOpen, Building2, CalendarDays, Camera, Check,
  ClipboardCheck, Code2, ExternalLink, Languages, MapPin,
  Menu, Search, TrainFront, Users, X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Language = "ko" | "ja";
type PhotoProps = { label: string; hint?: string; src?: string; className?: string; caption?: string };

function Photo({ label, hint = "Photo will be added later", src, className = "", caption }: PhotoProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;
  return (
    <figure className={`photo ${className}`}>
      {showImage ? <img src={src} alt={caption || label} onError={() => setFailed(true)} /> : (
        <div className="photoPlaceholder"><Camera aria-hidden="true" /><strong>{label}</strong><span>{hint}</span></div>
      )}
      {showImage && src?.includes("/ai-") && <span className="aiBadge">AI GENERATED</span>}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

const rolesKo = [
  ["01", "PROGRAM OPERATIONS", "인턴십 프로그램 운영 지원", "학생, 기업, 학교의 일정을 확인하고 전체 프로그램이 원활하게 진행되도록 지원했습니다.", "Scheduling · Operations · Coordination"],
  ["02", "SYSTEM DEVELOPMENT", "학생 실습일지 관리 시스템 개발", "실제 운영을 전제로 권한, 기록, 코멘트와 관리 기능을 설계했습니다.", "Web · Apps Script · System"],
  ["03", "STUDENT MANAGEMENT", "학생 활동 및 실습 현황 관리", "학생별 배치, 일정, 일지와 최종 제출자료를 지속적으로 확인했습니다.", "Students · Reports · Schedule"],
  ["04", "WEB DEVELOPMENT", "기업 관련 웹페이지 개발 및 개선", "콘텐츠 구조부터 반응형 UI와 애니메이션까지 직접 구현했습니다.", "Frontend · UI · Animation"],
  ["05", "COMMUNICATION", "기업 · 학교 · 학생 커뮤니케이션", "한국어와 일본어를 오가며 관계자 사이의 정보 전달을 지원했습니다.", "Korean · Japanese · Business"],
  ["06", "INTERPRETATION", "한일 관계자 현장 통역 지원", "한국 대학 관계자와 일본 기업 담당자가 정확히 소통하도록 도왔습니다.", "KR · JP · Interpretation"],
  ["07", "COMPANY VISIT", "기업 조사부터 예약·인솔까지", "방문처 조사, 신청, 일정 조율, 집합과 현장 인솔을 담당했습니다.", "Research · Booking · Guidance"],
  ["08", "EXHIBITION PLANNING", "박람회 조사·신청·현장 인솔", "참가 조건을 확인하고 등록부터 이동 계획까지 준비했습니다.", "Expo · Registration · Planning"],
];

const rolesJa = [
  ["01", "PROGRAM OPERATIONS", "インターンシップ運営支援", "学生・企業・大学の予定を確認し、プログラム全体が円滑に進むよう支援しました。", "Scheduling · Operations · Coordination"],
  ["02", "SYSTEM DEVELOPMENT", "実習日誌管理システムの開発", "実運用を前提に、権限・記録・コメント・管理機能を設計しました。", "Web · Apps Script · System"],
  ["03", "STUDENT MANAGEMENT", "学生の活動・実習状況管理", "学生ごとの配属、日程、日誌、最終提出資料を継続的に確認しました。", "Students · Reports · Schedule"],
  ["04", "WEB DEVELOPMENT", "企業関連Webページの開発・改善", "コンテンツ構成からレスポンシブUI、アニメーションまで実装しました。", "Frontend · UI · Animation"],
  ["05", "COMMUNICATION", "企業・大学・学生間の連絡支援", "韓国語と日本語を使い、関係者間の情報共有を支援しました。", "Korean · Japanese · Business"],
  ["06", "INTERPRETATION", "日韓関係者の現場通訳支援", "韓国の大学関係者と日本企業の担当者が正確に意思疎通できるよう支援しました。", "KR · JP · Interpretation"],
  ["07", "COMPANY VISIT", "企業調査から予約・引率まで", "訪問先の調査、申請、日程調整、集合管理、現地での引率を担当しました。", "Research · Booking · Guidance"],
  ["08", "EXHIBITION PLANNING", "展示会の調査・申請・現地引率", "参加条件を確認し、登録から移動計画まで準備しました。", "Expo · Registration · Planning"],
];

const studentTasksKo = ["학생별 기업 배치 확인", "출퇴근 정보 정리", "실습일지 작성 현황 확인", "학생 활동 내용 정리", "기업 방문 감상문 작성 지원", "병원 실습 주간 감상문 취합", "한 달간 학생 활동 기록 정리", "인터뷰 동영상 촬영 지원", "최종 제출자료 확인", "학교 및 기업용 설명자료 제작"];
const studentTasksJa = ["学生ごとの企業配属を確認", "出退勤情報を整理", "実習日誌の作成状況を確認", "学生の活動内容を整理", "企業訪問レポートの作成支援", "病院実習の週間レポートを集約", "1か月間の学生活動記録を整理", "インタビュー動画の撮影支援", "最終提出資料を確認", "大学・企業向け説明資料を作成"];

const numberStats = [[60, "DAYS IN JAPAN"], [2, "UNIVERSITIES"], [5, "COMPANIES", "+"], [2, "EXHIBITIONS"], [1, "WEB SYSTEM"]] as const;

export function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("ko");
  const [lightbox, setLightbox] = useState<{ caption: string; src: string } | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const isJa = language === "ja";
  const roles = isJa ? rolesJa : rolesKo;
  const studentTasks = isJa ? studentTasksJa : studentTasksKo;

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-language");
    if (saved === "ja" || saved === "ko") setLanguage(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem("portfolio-language", language);
  }, [language]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("isVisible");
    }), { threshold: 0.12, rootMargin: "0px 0px -6%" });
    document.querySelectorAll("[data-reveal]").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || matchMedia("(pointer: coarse)").matches) return;
    const move = (event: PointerEvent) => {
      hero.style.setProperty("--mx", `${(event.clientX / innerWidth - .5) * 12}px`);
      hero.style.setProperty("--my", `${(event.clientY / innerHeight - .5) * 10}px`);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  return <>
    <header className="topbar">
      <a className="wordmark" href="#top" onClick={closeMenu}>SUHO <span>/ TOKYO 2026</span></a>
      <nav className={menuOpen ? "navOpen" : ""} aria-label={isJa ? "メインメニュー" : "주요 메뉴"}>
        {[['ABOUT','about'],['WORK','work'],['VISITS','visits'],['EXPO','expo']].map(([label, id]) => <a key={id} href={`#${id}`} onClick={closeMenu}>{label}</a>)}
      </nav>
      <div className="languageSwitch" role="group" aria-label={isJa ? "言語選択" : "언어 선택"}>
        <button className={!isJa ? "active" : ""} onClick={() => setLanguage("ko")} aria-pressed={!isJa}>한국어</button>
        <button className={isJa ? "active" : ""} onClick={() => setLanguage("ja")} aria-pressed={isJa}>日本語</button>
      </div>
      <button className="menuButton" aria-label={menuOpen ? (isJa ? "メニューを閉じる" : "메뉴 닫기") : (isJa ? "メニューを開く" : "메뉴 열기")} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    </header>

    <main id="top">
      <section className="hero" ref={heroRef}>
        <div className="metroLines" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="heroCopy">
          <p className="kicker">CHONNAM NATIONAL UNIVERSITY · AI MAJOR</p>
          <h1>SUHO<br /><span>IN TOKYO</span></h1>
          <p className="discipline">ARTIFICIAL INTELLIGENCE <b>×</b> DEVELOPMENT <b>×</b> PROGRAM OPERATIONS</p>
          <div className="heroStatement">I DIDN&apos;T JUST PARTICIPATE.<br /><strong>I HELPED MAKE IT HAPPEN.</strong></div>
          <p className="heroNote">{isJa ? <>システム開発から<br />東京での学生引率まで。</> : <>From building systems<br />to guiding students across Tokyo.</>}</p>
        </div>
        <div className="heroVisual">
          <Photo label="TOKYO 2026" hint="Tokyo / Work / Suho" src="/images/ai-tokyo-hero.jpg" />
          <span className="sticker stickerA">TOKYO <b>JP</b></span><span className="sticker stickerB">SUMMER 2026</span><span className="sticker stickerC">BUILDING...</span><span className="sticker stickerD">BUSY DAY!</span>
        </div>
        <a className="scrollCue" href="#about">SCROLL TO EXPLORE <ArrowDown /></a>
      </section>

      <section className="story section" id="about">
        <div className="sectionTag">01 / ABOUT</div>
        <div className="profileIntro" data-reveal>
          <div><small>{isJa ? "UNIVERSITY" : "UNIVERSITY"}</small><strong>{isJa ? "全南大学校" : "전남대학교"}</strong></div>
          <div><small>{isJa ? "DEPARTMENT" : "DEPARTMENT"}</small><strong>{isJa ? "人工知能学部・人工知能専攻" : "인공지능학부 · 인공지능전공"}</strong></div>
          <div><small>{isJa ? "INTEREST" : "INTEREST"}</small><strong>{isJa ? "AI・データ・Webシステム" : "AI · 데이터 · 웹 시스템"}</strong></div>
        </div>
        <div className="growthNarrative">
          <div data-reveal><span>01</span><p className="eyebrow">AT UNIVERSITY</p><h3>{isJa ? "大学で学んだこと" : "학교에서 배운 것"}</h3><p>{isJa ? "全南大学校の人工知能学部・人工知能専攻で、プログラミング、人工知能の基礎、データ分析、アルゴリズム、問題解決の考え方を学びました。授業とプロジェクトを通じて、問題を小さな単位に分解し、必要なデータを整理し、実装後の結果を確認しながら改善する流れを身につけました。技術そのものだけでなく、利用者の立場から機能を設計することも大切にしてきました。" : "전남대학교 인공지능학부 인공지능전공에서 프로그래밍, 인공지능 기초, 데이터 분석, 알고리즘과 문제 해결 방식을 배웠습니다. 수업과 프로젝트를 통해 문제를 작은 단위로 나누고, 필요한 데이터를 정리한 뒤 구현 결과를 확인하며 개선하는 과정을 익혔습니다. 기술 자체뿐 아니라 실제 사용자의 입장에서 기능을 설계하는 태도도 중요하게 배웠습니다."}</p></div>
          <div data-reveal><span>02</span><p className="eyebrow">IN TOKYO</p><h3>{isJa ? "インターンシップで担当したこと" : "인턴십에서 맡은 일"}</h3><p>{isJa ? "東京でのインターンシップでは、実習日誌管理システムの要件整理、画面構成、機能実装、利用者向けマニュアル作成まで担当しました。同時に、学生の日程・出退勤・提出物の確認、企業訪問と展示会の調査・予約・移動計画・現地引率、日韓関係者間の通訳、Webページと報告資料の制作にも携わりました。大学で学んだ技術を、現場で起きている具体的な運営課題の解決につなげる経験となりました。" : "도쿄 인턴십에서는 실습일지 관리 시스템의 요구사항 정리, 화면 구성, 기능 구현과 사용자 매뉴얼 제작까지 담당했습니다. 동시에 학생 일정·출퇴근·제출물 확인, 기업 방문과 박람회 조사·예약·이동 계획·현장 인솔, 한일 관계자 사이의 통역, 웹페이지와 보고 자료 제작에도 참여했습니다. 학교에서 배운 기술을 현장에서 발생하는 구체적인 운영 문제 해결에 연결한 경험이었습니다."}</p></div>
          <div data-reveal><span>03</span><p className="eyebrow">THE CHALLENGE</p><h3>{isJa ? "難しかったことと成長" : "힘들었던 점과 성장"}</h3><p>{isJa ? "最も難しかったのは、開発だけに集中できる環境ではなく、言語と文化が異なる関係者の要望を確認しながら、変更される日程と複数の業務に同時対応する必要があったことです。最初は曖昧な依頼を機能に落とし込むことや、急な予定変更の中で優先順位を決めることに苦労しました。そこで、確認事項をすぐに質問し、決定内容を記録し、作業を重要度と期限で整理するようにしました。この経験から、技術力だけでなく、説明・確認・共有まで含めて仕事を完成させる姿勢を学びました。" : "가장 힘들었던 점은 개발에만 집중하는 환경이 아니라, 언어와 문화가 다른 관계자의 요구를 확인하면서 계속 바뀌는 일정과 여러 업무를 동시에 처리해야 했다는 것입니다. 처음에는 모호한 요청을 실제 기능으로 정리하고, 갑작스러운 일정 변경 속에서 우선순위를 결정하는 일이 어려웠습니다. 그래서 확인할 내용을 바로 질문하고 결정 사항을 기록했으며, 업무를 중요도와 마감일 기준으로 정리했습니다. 이 경험을 통해 기술력뿐 아니라 설명·확인·공유까지 포함해야 일이 완성된다는 태도를 배웠습니다."}</p></div>
        </div>
        <div className="storyGrid">
          <div><p className="eyebrow">SO...</p><h2>WHAT DID I<br />ACTUALLY DO?</h2></div>
          <div className="storyLines">
            {(isJa ? ["学生として日本に来ました。", "学生の日程を管理し、", "企業と大学をつなぎ、", "Webシステムを開発し、", "企業を調査して訪問を予約し、", "展示会を探して参加申請を行い、", "学生を現地まで引率し、", "通訳と資料作成まで担当しました。"] : ["학생으로 일본에 왔습니다.", "학생들의 일정을 관리하고,", "기업과 학교를 연결하고,", "웹 시스템을 개발하고,", "기업을 조사하고 예약하고,", "박람회를 찾아 신청하고,", "학생들을 직접 인솔하고,", "통역과 자료 제작까지 하고 있었습니다."]).map((line, i) => <p data-reveal key={line}><span>{String(i + 1).padStart(2, "0")}</span>{line}</p>)}
          </div>
        </div>
        <div className="storyResult" data-reveal>I HELPED<br /><span>RUN THE PROGRAM.</span></div>
        <div className="splitCopy" data-reveal><Photo label="PROGRAM OPERATIONS" src="/images/ai-communication.jpg" /><p>{isJa ? "日本でのインターンシッププログラム全般の運営を補助し、学生・企業・大学の間で必要となるさまざまな業務を担当しました。Webシステム開発、学生管理、企業訪問の企画・予約、展示会への参加申請、現地引率、通訳、報告資料の作成まで、実際の運営に幅広く携わりました。" : "일본 인턴십 프로그램의 전반적인 운영을 보조하며 학생, 기업, 학교 사이에서 필요한 다양한 업무를 담당했습니다. 웹 시스템 개발부터 학생 관리, 기업 방문 기획과 예약, 박람회 참가 신청, 현장 인솔, 통역, 보고자료 제작까지 실제 운영 과정에 폭넓게 참여했습니다."}</p></div>
      </section>

      <section className="roles section colorBand" id="work">
        <div className="sectionHeading"><div><p className="eyebrow">MY ROLE</p><h2>WHAT WAS<br />MY ROLE?</h2></div><p>{isJa ? "運営に必要なことを、幅広く。" : "A little bit of everything."}</p></div>
        <div className="roleGrid" data-reveal>{roles.map(([n,en,ko,desc,tags]) => <article className="roleCard" key={n}><b>{n}</b><Code2 aria-hidden="true" /><p>{en}</p><h3>{ko}</h3><span>{desc}</span><small>{tags}</small></article>)}</div>
      </section>

      <section className="system section">
        <div className="sectionHeading"><div><p className="eyebrow">SYSTEM DEVELOPMENT</p><h2>I BUILT<br />A SYSTEM.</h2></div><p><strong>Not just a prototype.</strong><br />It was actually used.</p></div>
        <div className="systemIntro" data-reveal><p>{isJa ? "紙・メッセージ・個別ファイルに分散していた学生の実習記録を一つに集約するため、Webベースの統合管理システムを設計・開発しました。単なる入力フォームではなく、学生・企業・大学・管理者という異なる利用者が、必要な情報だけを安全かつ効率的に扱える実運用システムを目指しました。" : "종이, 메신저와 개별 파일에 흩어져 있던 학생 실습 기록을 하나로 통합하기 위해 웹 기반 통합 관리시스템을 설계하고 개발했습니다. 단순한 입력 폼이 아니라 학생·기업·학교·관리자라는 서로 다른 사용자가 각자 필요한 정보를 안전하고 효율적으로 처리할 수 있는 실제 운영 시스템을 목표로 했습니다."}</p><div className="buildLoop"><b>ANALYZE</b><ArrowRight /><b>DESIGN</b><ArrowRight /><b>BUILD</b><ArrowRight /><b>TEST</b><ArrowRight /><b>IMPROVE</b></div></div>
        <div className="caseStudyGrid systemCase">
          <article data-reveal><small>01 / PROBLEM</small><h3>{isJa ? "分散した情報と重複作業" : "흩어진 정보와 반복 업무"}</h3><p>{isJa ? "学生の日誌、出退勤、企業コメント、大学別確認事項が別々に管理され、担当者が同じ内容を繰り返し確認する必要がありました。誰がどの記録を提出・確認したのかを一目で把握しにくいことも課題でした。" : "학생 일지, 출퇴근, 기업 코멘트와 학교별 확인 사항이 각각 따로 관리되어 담당자가 같은 내용을 반복해서 확인해야 했습니다. 누가 어떤 기록을 제출하고 확인했는지 한눈에 파악하기 어려운 것도 문제였습니다."}</p></article>
          <article data-reveal><small>02 / ARCHITECTURE</small><h3>{isJa ? "利用者別の権限と画面設計" : "사용자별 권한과 화면 설계"}</h3><p>{isJa ? "学生は日誌作成、企業は確認とコメント、大学は所属学生の進捗確認、管理者は全体状況とアカウント管理を行えるよう役割を分離しました。ログイン後に必要な機能だけが見える構造にし、誤操作を減らしました。" : "학생은 일지 작성, 기업은 확인과 코멘트, 학교는 소속 학생의 진행 상황 확인, 관리자는 전체 현황과 계정 관리를 할 수 있도록 역할을 분리했습니다. 로그인 후 필요한 기능만 보이는 구조로 설계해 오작동을 줄였습니다."}</p></article>
          <article data-reveal><small>03 / FEATURES</small><h3>{isJa ? "記録から運営までを一つに" : "기록부터 운영까지 하나로"}</h3><p>{isJa ? "日誌の作成・修正、提出状況、コメント、出退勤記録、学生検索、期間別確認、管理者による履歴・アカウント管理を一つの流れにまとめました。運営中に出た要望を反映し、画面と機能を継続的に改善しました。" : "일지 작성·수정, 제출 현황, 코멘트, 출퇴근 기록, 학생 검색, 기간별 확인, 관리자의 이력·계정 관리를 하나의 흐름으로 연결했습니다. 운영 중 나온 요청을 반영하며 화면과 기능을 계속 개선했습니다."}</p></article>
          <article className="challengeCard" data-reveal><small>04 / HARDEST PART</small><h3>{isJa ? "曖昧な業務を機能に変える" : "모호한 업무를 기능으로 바꾸기"}</h3><p>{isJa ? "最も難しかったのは、利用者ごとに異なる説明や途中で変わる運用ルールを、一貫したシステム要件に変換することでした。質問事項と変更履歴を記録し、機能を小さく実装して実際の利用者に確認してもらうサイクルを繰り返しました。データを壊さずに修正する責任と、分かりやすい操作説明の重要性を実感しました。" : "가장 어려웠던 점은 사용자마다 다르게 설명하는 업무 방식과 중간에 바뀌는 운영 규칙을 일관된 시스템 요구사항으로 바꾸는 일이었습니다. 질문과 변경 이력을 기록하고, 기능을 작은 단위로 구현한 뒤 실제 사용자에게 확인받는 과정을 반복했습니다. 데이터를 손상시키지 않고 수정해야 하는 책임과 쉬운 사용 설명의 중요성을 체감했습니다."}</p></article>
        </div>
        <div className="techStack"><span>GOOGLE APPS SCRIPT</span><span>GOOGLE SHEETS</span><span>ROLE-BASED ACCESS</span><span>CRUD</span><span>RESPONSIVE UI</span><span>OPERATIONS</span></div>
        <div className="systemMap" data-reveal><strong>ADMIN</strong><i /><div><span><Users />STUDENT<small>{isJa ? "日誌作成・記録確認" : "일지 작성 · 기록 확인"}</small></span><span><Building2 />COMPANY<small>{isJa ? "日誌確認・コメント" : "일지 확인 · 코멘트"}</small></span><span><BookOpen />SCHOOL<small>{isJa ? "所属学生の確認" : "소속 학생 확인"}</small></span></div></div>
        <div className="browserMock" data-reveal><div className="browserBar"><i /><i /><i /><span>internship-log.system</span></div><Photo label="SYSTEM DEVELOPMENT" src="/images/ai-system-development.jpg" /></div>
      </section>

      <section className="students section warmBand">
        <div className="studentLayout"><div><p className="eyebrow">STUDENT MANAGEMENT</p><h2>KEEPING<br />EVERYONE<br />ON TRACK.</h2><p className="bigAside">CODING WASN&apos;T<br />THE ONLY THING<br />I HAD TO MANAGE.</p></div><div className="checklist">{studentTasks.map((task) => <div data-reveal key={task}><Check />{task}</div>)}</div></div>
        <div className="singleFeaturePhoto"><Photo label="STUDENT ACTIVITY & REPORT WORK" src="/images/ai-communication.jpg" /></div>
      </section>

      <section className="visits section" id="visits">
        <div className="sectionHeading"><div><p className="eyebrow">COMPANY VISITS</p><h2>LET&apos;S VISIT<br />A COMPANY.</h2></div><p>SEARCH → BOOK → PLAN → GUIDE</p></div>
        <div className="flowRail" data-reveal>{[[Search,"SEARCH"],[Building2,"CONTACT"],[CalendarDays,"RESERVE"],[ClipboardCheck,"SCHEDULE"],[MapPin,"GUIDE"],[BookOpen,"REPORT"]].map(([Icon,label], i) => { const I = Icon as typeof Search; return <div key={label as string}><I /><b>{label as string}</b><span>{i + 1}</span></div>})}</div>
        <Visit title="INNOPHYS" date="2026.07.23" category="ROBOTICS / HUMAN ASSIST" text={isJa ? "人の動きや作業を支援するロボット技術を見学しました。重量物を持ち上げる際の身体的負担を軽減する技術を確認し、実際の産業活用事例を学びました。" : "인체의 움직임과 작업을 지원하는 로봇 기술을 확인했습니다. 무거운 물건을 들 때 신체 부담을 줄이는 기술을 살펴보며 실제 산업 활용 사례를 경험했습니다."} images={["/images/ai-company-visit.jpg"]} />
        <Visit reverse title="YAKULT" date="2026.08.03" category="HEALTH / RESEARCH" text={isJa ? "訪問情報を確認し、日程と参加人数を整理しました。当日は学生の集合と移動を管理し、現地での引率を担当しました。" : "방문 정보를 확인하고 일정과 참가 인원을 준비했습니다. 당일에는 학생 집합과 이동을 관리하고 현장 인솔을 담당했습니다."} images={["/images/ai-communication.jpg"]} />
      </section>

      <section className="expo section colorBand" id="expo">
        <div className="sectionHeading"><div><p className="eyebrow">EXHIBITION PLANNING</p><h2>NEXT STOP:<br />EXPO!</h2></div><p>FOUND IT. BOOKED IT.<br />PLANNED IT. GUIDED IT.</p></div>
        <div className="expoRoute"><TrainFront />EVENT SEARCH <ArrowRight /> REGISTRATION <ArrowRight /> SCHEDULE <ArrowRight /> TRANSPORTATION <ArrowRight /> ON-SITE SUPPORT</div>
        <div className="eventGrid">
          <Event title="イプロスAI 2026 夏" date="2026.07.29" category="AI / DX / AUTOMATION" text={isJa ? "生成AI、AIエージェント、業務自動化、データ活用、マーケティング支援サービスを確認するため、展示会を調査して参加登録を行いました。" : "생성형 AI, AI Agent, 업무 자동화, 데이터 활용과 마케팅 지원 서비스를 확인하기 위해 박람회를 조사하고 참가 등록을 진행했습니다."} photo="/images/ai-expo.jpg" tags="GENERATIVE AI · AI AGENTS · DX" />
          <Event title="WELLNESS FOOD" date="2026.08.05" category="HEALTH / FOOD / WELLNESS" text={isJa ? "参加情報を調査して登録し、病院実習中の学生と合流して会場まで引率しました。健康食品やヘルスケア製品を見学しました。" : "참가 정보를 조사하고 등록했으며, 병원 실습 학생들과 합류해 전시장까지 인솔했습니다. 건강식과 헬스케어 제품을 확인했습니다."} photo="/images/ai-expo.jpg" tags="HEALTH FOOD · NUTRITION · CARE" />
        </div>
      </section>

      <section className="digital section">
        <div className="sectionHeading"><div><p className="eyebrow">JISA WEBSITE REBUILD</p><h2>I BUILT IT<br />FROM ZERO.</h2></div><p>Research. Structure. Design. Build. Localize. Deploy.</p></div>
        <div className="digitalSplit"><div className="digitalCopy"><h3>{isJa ? "JISA公式サイトをゼロから再構築" : "JISA 공식 홈페이지를 처음부터 재구축"}</h3><p>{isJa ? "既存資料と協会の事業内容を分析するところから始め、誰が訪れても必要な情報に到達できるようサイト構成を全面的に再設計しました。ロゴの青を基調にブランドカラー、文字体系、余白、写真比率、ボタン状態を統一し、日本語・韓国語の両方に対応するレスポンシブWebサイトを制作しました。完成後はWordPressのカスタムテーマとしてパッケージ化し、担当者が実際の管理画面から運用できる形まで整えました。" : "기존 자료와 협회의 사업 내용을 분석하는 것부터 시작해, 누구나 필요한 정보를 빠르게 찾을 수 있도록 사이트 구조를 전면 재설계했습니다. 로고의 파란색을 기준으로 브랜드 색상, 글자 체계, 여백, 사진 비율과 버튼 상태를 통일하고 한국어·일본어를 모두 지원하는 반응형 웹사이트를 제작했습니다. 완성 후에는 워드프레스 사용자 정의 테마로 패키징하여 담당자가 실제 관리자 화면에서 운영할 수 있는 형태까지 구현했습니다."}</p><ul>{(isJa ? ["要件・既存資料分析", "情報設計と導線", "UIデザインシステム", "日韓多言語対応", "レスポンシブ実装", "WordPressテーマ化"] : ["요구사항·기존 자료 분석", "정보 구조와 사용자 동선", "UI 디자인 시스템", "한일 다국어 전환", "반응형 웹 구현", "워드프레스 테마 제작"]).map(item => <li key={item}>{item}</li>)}</ul></div><Photo label="JISA WEBSITE / RESPONSIVE VIEW" src="/images/ai-system-development.jpg" /></div>
        <div className="caseStudyGrid websiteCase">
          <article data-reveal><small>01 / CONTENT</small><h3>{isJa ? "大量の資料をWebの言葉へ" : "많은 자료를 웹의 언어로"}</h3><p>{isJa ? "PDFや既存サイトに分散していた協会紹介、プログラム、大学連携、支援内容を読み直し、ページとセクションに整理しました。資料をそのまま貼り付けず、閲覧者の目的に合わせて見出し・要約・詳細へ情報の階層を作りました。" : "PDF와 기존 사이트에 흩어져 있던 협회 소개, 프로그램, 대학 연계와 지원 내용을 다시 읽고 페이지와 섹션으로 정리했습니다. 자료를 그대로 붙여 넣지 않고 방문자의 목적에 따라 제목·요약·상세 내용으로 정보의 위계를 만들었습니다."}</p></article>
          <article data-reveal><small>02 / EXPERIENCE</small><h3>{isJa ? "クリックできる場所を明確に" : "클릭 가능한 영역을 명확하게"}</h3><p>{isJa ? "初期案では要素間の余白が少なく、ボタンと説明領域の区別も曖昧でした。ナビゲーション、カード、タブ、スライダー、言語メニューの状態を再設計し、ホバー・選択・フォーカス時の反応を統一しました。" : "초기 화면은 요소 사이의 여백이 부족하고 버튼과 설명 영역의 구분도 모호했습니다. 내비게이션, 카드, 탭, 슬라이더와 언어 메뉴의 상태를 다시 설계하고 마우스 오버·선택·키보드 포커스 반응을 통일했습니다."}</p></article>
          <article data-reveal><small>03 / WORDPRESS</small><h3>{isJa ? "デザインを運用可能なテーマへ" : "디자인을 운영 가능한 테마로"}</h3><p>{isJa ? "静的な画面で終わらせず、ヘッダー、ページテンプレート、画像、スタイル、スクリプトをWordPressテーマの構造に変換しました。Polylangによる言語切替や問い合わせメール運用も考慮し、更新後も担当者が扱える構成にしました。" : "정적인 화면으로 끝내지 않고 헤더, 페이지 템플릿, 이미지, 스타일과 스크립트를 워드프레스 테마 구조로 변환했습니다. Polylang 언어 전환과 문의 메일 운영까지 고려하여 이후에도 담당자가 관리할 수 있는 구조로 만들었습니다."}</p></article>
          <article className="challengeCard" data-reveal><small>04 / HARDEST PART</small><h3>{isJa ? "正解のないデザインを調整する" : "정답이 없는 디자인을 조율하기"}</h3><p>{isJa ? "実績写真や確定原稿がそろっていない状態で、協会らしい信頼感と若い参加者に届く新鮮さを同時に表現する必要がありました。フィードバックのたびに情報量、文字サイズ、色、横方向のレイアウト、写真枠を検証し、既存内容を守りながら見やすさを高めました。技術的な実装以上に、曖昧な要望を具体的な画面へ翻訳する作業が難しく、同時に最も成長した部分でした。" : "실적 사진과 확정 원고가 모두 준비되지 않은 상태에서 협회다운 신뢰감과 젊은 참가자에게 전달되는 신선함을 함께 표현해야 했습니다. 피드백을 받을 때마다 정보량, 글자 크기, 색상, 가로형 레이아웃과 사진 영역을 검토하며 기존 내용을 지키면서도 읽기 쉽게 개선했습니다. 기술 구현보다 모호한 요구를 구체적인 화면으로 번역하는 과정이 어려웠고, 동시에 가장 크게 성장한 부분이었습니다."}</p></article>
        </div>
        <div className="techStack"><span>WORDPRESS</span><span>HTML / CSS</span><span>JAVASCRIPT</span><span>PHP THEME</span><span>POLYLANG</span><span>GIT / GITHUB</span></div>
        <h3 className="galleryTitle">DIGITAL CONTENT</h3><div className="contentStrip"><span>INSTAGRAM</span><span>REELS</span><span>JAPANESE COPY</span><span>KOREAN COPY</span><span>PHOTO & VIDEO</span></div>
      </section>

      <section className="communication section warmBand">
        <div className="communicationTitle"><p className="eyebrow">COMMUNICATION & INTERPRETATION</p><h2>BETWEEN<br />KOREA <span>KR</span><br /><i>&</i><br />JAPAN <span>JP</span></h2></div>
        <div className="bridge" data-reveal><div><strong>KOREA</strong><span>University<br />Professors<br />Students</span></div><div className="me"><Languages />ME</div><div><strong>JAPAN</strong><span>Companies<br />Managers<br />Organizations</span></div></div>
        <p className="communicationCopy">{isJa ? "韓国の大学・学生と日本企業の間で、現場通訳、業務文書の作成、日韓資料の整理、企業案内資料とシステムマニュアルの制作を支援しました。" : "한국 학교, 학생, 일본 기업 사이에서 현장 통역, 업무 문서 작성, 한일 자료 정리, 기업 안내자료와 시스템 매뉴얼 제작을 지원했습니다."}</p>
      </section>

      <section className="numbers section"><p className="eyebrow">INTERNSHIP BY NUMBERS</p><h2>INTERNSHIP<br />BY NUMBERS.</h2><div className="numberGrid">{numberStats.map(([n,label,suffix]) => <div key={label} data-reveal><strong>{n}{suffix || ""}</strong><span>{label}</span></div>)}<div className="infinite" data-reveal><strong>∞</strong><span>PROBLEMS SOLVED</span></div></div></section>

      <section className="learned section warmBand"><p className="eyebrow">WHAT I LEARNED</p><h2>THINGS I LEARNED<br />THE HARD WAY.</h2><div className="lessonGrid">
        <Lesson n="01" title="BUILD FOR PEOPLE." text={isJa ? "開発者にとって便利なシステムより、実際の利用者が使いやすいシステムが重要だと学びました。" : "개발자에게 편한 시스템보다 실제 사용자가 편한 시스템이 더 중요하다는 것을 배웠습니다."} />
        <Lesson n="02" title="ASK WHEN YOU DON'T KNOW." text={isJa ? "業務を正確に理解するには、分からないことをすぐに質問する姿勢が重要でした。" : "업무를 정확히 이해하려면 모르는 것을 바로 질문하는 태도가 중요했습니다."} />
        <Lesson n="03" title="PLANS ALWAYS CHANGE." text={isJa ? "計画だけでなく、予期しない状況に素早く対応する力も必要でした。" : "계획뿐 아니라 예상하지 못한 상황에 빠르게 대응하는 능력이 필요했습니다."} />
        <Lesson n="04" title="DEVELOPMENT ≠ CODING ONLY." text={isJa ? "開発、運営、ユーザー支援、コミュニケーション、文書化がそろって初めてサービスが動きます。" : "개발, 운영, 사용자 지원, 커뮤니케이션과 문서화가 함께해야 서비스가 움직입니다."} />
      </div></section>

      <section className="memories section"><p className="eyebrow">VISUAL HIGHLIGHTS</p><h2>TOKYO<br />MEMORIES.</h2><div className="masonry">{[
        ["TOKYO, SUMMER 2026", "/images/ai-tokyo-hero.jpg"], ["SYSTEM DEVELOPMENT", "/images/ai-system-development.jpg"], ["COMPANY VISIT", "/images/ai-company-visit.jpg"], ["AI & WELLNESS EXPO", "/images/ai-expo.jpg"], ["PROGRAM COMMUNICATION", "/images/ai-communication.jpg"]
      ].map(([caption, src]) => <button key={caption} onClick={() => setLightbox({ caption, src })} aria-label={`${caption} ${isJa ? "を拡大表示" : "크게 보기"}`}><Photo label={caption} src={src} caption={caption} /></button>)}</div></section>

      <section className="ending"><div className="endingRoute" aria-hidden="true" /><p>FROM</p><h2>STUDENT</h2><span>TO</span><h2>OPERATOR.</h2><div className="endingCopy">{isJa ? <>学生として日本に来ましたが、<br />帰る頃には一つのインターンシッププログラムが<br />どのように運営されるのかを経験していました。</> : <>일본에 학생으로 왔지만,<br />돌아갈 때는 하나의 인턴십 프로그램이<br />어떻게 운영되는지를 경험하게 되었습니다.</>}</div><strong>I DIDN&apos;T JUST PARTICIPATE.<br />I HELPED MAKE IT HAPPEN.</strong><footer>TOKYO, JAPAN · SUMMER 2026<br /><b>LEE SUHO</b></footer></section>
    </main>

    {lightbox && <div className="lightbox" role="dialog" aria-modal="true" aria-label={isJa ? "写真プレビュー" : "사진 미리보기"} onClick={() => setLightbox(null)}><button aria-label={isJa ? "閉じる" : "닫기"} onClick={() => setLightbox(null)}><X /></button><div onClick={(e) => e.stopPropagation()}><Photo label={lightbox.caption} src={lightbox.src} caption={lightbox.caption} /></div></div>}
  </>;
}

function Visit({ title, date, category, text, images, reverse = false }: { title: string; date: string; category: string; text: string; images: string[]; reverse?: boolean }) {
  return <article className={`visit ${reverse ? "reverse" : ""}`} data-reveal><div className="visitInfo"><p>{date} / {category}</p><h3>{title}</h3><span>{text}</span></div><div className={`visitPhotos ${images.length === 1 ? "single" : ""}`}>{images.map((src, i) => <Photo key={src} label={`${title} 0${i + 1}`} src={src} />)}</div></article>;
}

function Event({ title, date, category, text, photo, tags }: { title: string; date: string; category: string; text: string; photo: string; tags: string }) {
  return <article className="eventCard" data-reveal><Photo label={`${title} PHOTO`} src={photo} /><div><small>{date} / {category}</small><h3>{title}</h3><p>{text}</p><b>{tags}</b></div></article>;
}

function Lesson({ n, title, text }: { n: string; title: string; text: string }) {
  return <article data-reveal><b>{n}</b><h3>{title}</h3><p>{text}</p></article>;
}
