"use client";

import {
  ArrowDown, ArrowRight, BookOpen, Building2, CalendarDays, Camera, Check,
  ClipboardCheck, Code2, ExternalLink, FileSpreadsheet, Languages, MapPin,
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
          <p className="kicker">JAPAN INTERNSHIP 2026</p>
          <h1>SUHO<br /><span>IN TOKYO</span></h1>
          <p className="discipline">PROGRAM OPERATIONS <b>×</b> DEVELOPMENT <b>×</b> COMMUNICATION</p>
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
        <div className="systemIntro" data-reveal><p>{isJa ? "学生の実習活動を効率的に管理する、Webベースの日誌管理システムを開発しました。学生、企業担当者、大学担当者、管理者が実際に使用することを前提に設計しました。" : "학생들의 실습 활동을 효율적으로 관리하는 웹 기반 일지 관리 시스템을 개발했습니다. 학생, 기업 담당자, 학교 담당자와 관리자가 실제로 사용하는 것을 전제로 설계했습니다."}</p><div className="buildLoop"><b>BUILD</b><ArrowRight /><b>DEPLOY</b><ArrowRight /><b>USE</b><ArrowRight /><b>FIX</b><ArrowRight /><b>IMPROVE</b></div></div>
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
        <div className="sectionHeading"><div><p className="eyebrow">WEB & CONTENT</p><h2>I ALSO<br />BUILT THINGS.</h2></div><p>Research. Structure. Build. Improve.</p></div>
        <div className="digitalSplit"><div className="digitalCopy"><h3>CORPORATE WEB PAGE</h3><p>{isJa ? "企業情報を調査し、事業内容とサービスを整理した上で、コンテンツ構成、レスポンシブUI、アニメーション、ユーザー体験を実装しました。" : "기업 정보를 조사하고 사업 내용과 서비스를 정리해 콘텐츠 구조, 반응형 UI, 애니메이션과 사용자 경험을 구현했습니다."}</p><ul>{(isJa ? ["企業情報の調査", "コンテンツ構成設計", "UI実装", "レスポンシブ対応", "アニメーション", "ユーザビリティ改善"] : ["기업 정보 조사", "콘텐츠 구조 설계", "UI 구현", "반응형 구성", "애니메이션", "사용성 개선"]).map(item => <li key={item}>{item}</li>)}</ul></div><Photo label="WEB PAGE / MOBILE VIEW" src="/images/ai-system-development.jpg" /></div>
        <h3 className="galleryTitle">DIGITAL CONTENT</h3><div className="contentStrip"><span>INSTAGRAM</span><span>REELS</span><span>JAPANESE COPY</span><span>KOREAN COPY</span><span>PHOTO & VIDEO</span></div>
      </section>

      <section className="communication section warmBand">
        <div className="communicationTitle"><p className="eyebrow">COMMUNICATION & INTERPRETATION</p><h2>BETWEEN<br />KOREA <span>KR</span><br /><i>&</i><br />JAPAN <span>JP</span></h2></div>
        <div className="bridge" data-reveal><div><strong>KOREA</strong><span>University<br />Professors<br />Students</span></div><div className="me"><Languages />ME</div><div><strong>JAPAN</strong><span>Companies<br />Managers<br />Organizations</span></div></div>
        <p className="communicationCopy">{isJa ? "韓国の大学・学生と日本企業の間で、現場通訳、業務文書の作成、日韓資料の整理、企業案内資料とシステムマニュアルの制作を支援しました。" : "한국 학교, 학생, 일본 기업 사이에서 현장 통역, 업무 문서 작성, 한일 자료 정리, 기업 안내자료와 시스템 매뉴얼 제작을 지원했습니다."}</p>
      </section>

      <section className="documents section">
        <div className="sectionHeading"><div><p className="eyebrow">DOCUMENTATION</p><h2>SO. MANY.<br />DOCUMENTS.</h2></div><div className="excelJoke"><FileSpreadsheet />ANOTHER<br />EXCEL FILE...</div></div>
        <div className="documentStack">{(isJa ? ["学生活動日誌", "企業別活動報告", "企業訪問レポート", "病院実習報告", "企業向けマニュアル", "大学向けマニュアル", "管理者マニュアル", "展示会説明資料", "学生インタビュー資料", "出退勤管理資料"] : ["학생 활동 일지", "기업별 활동 보고", "기업 방문 감상문", "병원 실습 보고", "기업 사용 매뉴얼", "학교 사용 매뉴얼", "관리자 매뉴얼", "박람회 설명자료", "학생 인터뷰 자료", "출퇴근 관리 자료"]).map((doc, i) => <article key={doc} style={{"--i": i} as React.CSSProperties}><small>DOC / {String(i + 1).padStart(2,"0")}</small><h3>{doc}</h3><FileSpreadsheet /></article>)}</div>
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
