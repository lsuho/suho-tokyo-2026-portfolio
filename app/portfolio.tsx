"use client";

import {
  ArrowDown, ArrowRight, BookOpen, Building2, CalendarDays, Camera, Check,
  ClipboardCheck, Code2, ExternalLink, Languages, MapPin,
  Menu, Search, Sun, TrainFront, Users, Waves, X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Language = "ko" | "ja";
type PhotoProps = { label: string; hint?: string; src?: string; className?: string; caption?: string };

function Photo({ label, hint = "Photo will be added later", src, className = "", caption }: PhotoProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;
  const basePath = typeof document === "undefined" ? "" : document.documentElement.dataset.basePath || "";
  const resolvedSrc = src?.startsWith("/") ? `${basePath}${src}` : src;
  return (
    <figure className={`photo ${className}`}>
      {showImage ? <img src={resolvedSrc} alt={caption || label} onError={() => setFailed(true)} /> : (
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

const roleDetailsKo = [
  { work:"학생·기업·학교의 전체 일정을 한 흐름으로 정리하고, 변경 사항과 제출 마감일을 확인했습니다. 관계자별로 필요한 정보를 구분해 전달하고, 현장 이동·기업 방문·보고 일정이 충돌하지 않도록 우선순위를 조정했습니다.", skills:["일정 관리","이해관계자 조율","문서화","우선순위 설정"], learned:"운영은 단순히 일정을 전달하는 일이 아니라, 정보가 필요한 사람에게 필요한 시점에 정확히 도착하도록 설계하는 일이라는 것을 배웠습니다.", challenge:"일본 현장에서는 일정이 갑자기 변경되거나 관계자마다 알고 있는 내용이 다른 경우가 있었습니다. 결정 사항을 즉시 기록하고 확인 대상을 명확히 하여 혼선을 줄였습니다." },
  { work:"프로그램별로 분리되어 있던 3개의 관리 시스템을 하나로 통합했습니다. 관리자·학생·기업·학교 권한, 실습일지와 사진, 코멘트, 문서 출력, 오류 진단, 자동 대조, 백업과 복원까지 실제 운영에 필요한 전체 흐름을 설계하고 구현했습니다.", skills:["Google Apps Script","JavaScript","데이터 모델링","권한·보안 설계","자동화","오류 복구"], learned:"좋은 시스템은 기능이 많은 시스템보다 데이터가 왜 틀렸는지 추적할 수 있고, 문제가 생겼을 때 운영자가 스스로 복구할 수 있는 시스템이라는 것을 배웠습니다.", challenge:"여러 프로그램과 4개 권한이 동시에 동작하면서 발생하는 권한 충돌, 중복 등록, 누락 기록과 Apps Script 실행 제한을 함께 해결해야 했습니다. 서버 검증과 10분 자동 대조, 재처리 기능으로 신뢰성을 높였습니다." },
  { work:"학생별 기업 배치, 출퇴근, 일정, 실습일지, 사진과 최종 제출자료를 지속적으로 확인했습니다. 미제출 또는 수정이 필요한 항목을 찾아 안내하고, 기업 방문 감상문·병원 실습 보고·인터뷰 자료를 취합했습니다.", skills:["진행률 관리","데이터 확인","학생 커뮤니케이션","보고서 정리"], learned:"같은 안내도 학생마다 이해하는 방식과 필요한 지원이 다르기 때문에, 현황을 숫자로 확인하면서도 개인별 상황을 함께 살펴야 한다는 점을 배웠습니다.", challenge:"여러 학생의 일정과 제출 상태가 계속 달라져 단순 기억으로 관리하기 어려웠습니다. 체크 항목을 표준화하고 시스템에서 진행률을 확인할 수 있도록 흐름을 개선했습니다." },
  { work:"JISA 공식 홈페이지를 기존 자료 분석부터 새롭게 구축했습니다. 정보 구조, 한국어·일본어 전환, 반응형 화면, 인터랙션과 접근성을 설계하고, 최종적으로 WordPress 사용자 정의 테마로 패키징해 실제 운영 환경에 적용했습니다.", skills:["HTML","CSS","JavaScript","Responsive UI","WordPress","다국어 UX"], learned:"예쁜 화면보다 사용자가 클릭 가능한 영역을 바로 알아보고 원하는 정보에 빠르게 도달하도록 만드는 것이 더 중요하다는 것을 배웠습니다.", challenge:"많은 PDF 자료를 그대로 옮기지 않고 홈페이지에 맞는 흐름으로 재구성해야 했습니다. 사용자 피드백을 반복 반영하며 글자 크기, 여백, 버튼 상태와 페이지 구조를 개선했습니다." },
  { work:"한국 대학, 일본 기업, 학생과 JISA 담당자 사이에서 일정·요청·제출 정보를 한국어와 일본어로 정리해 전달했습니다. 전달 전 내용과 대상, 마감일을 다시 확인하고 기록을 남겼습니다.", skills:["한국어·일본어","비즈니스 커뮤니케이션","요약","확인과 공유"], learned:"정확한 커뮤니케이션은 단순 번역이 아니라 상대가 무엇을 해야 하는지까지 분명하게 만드는 과정이라는 것을 배웠습니다.", challenge:"같은 표현도 조직과 상황에 따라 다르게 받아들여질 수 있었습니다. 모호한 표현은 질문으로 확인하고 핵심 행동과 기한을 분리해 전달했습니다." },
  { work:"한국 대학 관계자와 일본 기업 담당자의 현장 대화에서 순차 통역을 지원했습니다. 기술·일정·교육 관련 표현을 사전에 조사하고, 발언의 의도와 분위기를 유지하면서 핵심 내용을 정확히 전달했습니다.", skills:["JLPT N1","순차 통역","사전 조사","현장 대응"], learned:"좋은 통역은 단어를 바꾸는 것이 아니라 서로 다른 배경을 가진 사람들이 같은 상황을 이해하도록 연결하는 일이라는 것을 배웠습니다.", challenge:"예상하지 못한 전문 용어와 빠른 대화가 어려웠습니다. 방문 목적과 기업 정보를 미리 공부하고, 확실하지 않은 내용은 현장에서 다시 확인했습니다." },
  { work:"INNOPHYS와 Yakult 등 방문 기업을 조사하고, 참가 조건 확인, 예약, 일정 조율, 집합 장소와 이동 경로 안내, 현장 인솔, 방문 후 감상문 정리까지 담당했습니다.", skills:["기업 조사","예약·일정 조율","동선 설계","현장 인솔"], learned:"현장 방문의 품질은 방문 당일보다 사전 조사와 이동 계획, 참가자 안내에서 결정된다는 것을 배웠습니다.", challenge:"도쿄의 복잡한 교통과 여러 학생의 이동 시간을 함께 고려해야 했습니다. 환승·집합·비상 연락 정보를 미리 정리하고 여유 시간을 확보했습니다." },
  { work:"イプロスAI 2026 夏와 Wellness Food 전시회의 참가 조건과 세션을 조사하고, 등록·티켓·이동 계획을 준비했습니다. 현장에서는 학생을 인솔하고 관심 기업과 기술 정보를 기록해 후속 자료로 정리했습니다.", skills:["정보 탐색","참가 신청","현장 리서치","콘텐츠 정리"], learned:"전시회는 단순 관람이 아니라 목적을 정하고 질문과 기록 방식을 준비해야 학습 결과가 남는다는 것을 배웠습니다.", challenge:"행사 규모가 커 모든 부스를 볼 수 없었습니다. 참가자의 전공과 관심 분야를 기준으로 우선 방문 대상을 정해 제한된 시간을 효율적으로 사용했습니다." },
];

const roleDetailsJa = [
  { work:"学生・企業・大学の全日程を一つの流れに整理し、変更点と提出期限を確認しました。関係者ごとに必要な情報を分け、移動・企業訪問・報告日程が重ならないよう優先順位を調整しました。", skills:["スケジュール管理","関係者調整","文書化","優先順位設定"], learned:"運営とは予定を伝えるだけでなく、必要な情報を必要な人へ適切な時点で届ける仕組みを作ることだと学びました。", challenge:"急な日程変更や関係者間の認識差がありました。決定事項をすぐ記録し、確認対象を明確にすることで混乱を減らしました。" },
  { work:"プログラム別に分かれていた3つの管理システムを統合しました。管理者・学生・企業・大学の権限、日誌・写真・コメント・文書出力、エラー診断、自動照合、バックアップと復元まで実運用の全体フローを設計・実装しました。", skills:["Google Apps Script","JavaScript","データモデリング","権限・セキュリティ","自動化","障害復旧"], learned:"良いシステムとは機能数ではなく、データの誤りを追跡でき、問題発生時に運営者自身が復旧できるシステムだと学びました。", challenge:"複数プログラムと4つの権限が同時に動く中で、権限衝突、重複登録、記録欠落、Apps Scriptの実行制限を解決する必要がありました。" },
  { work:"学生ごとの企業配属、出退勤、日程、実習日誌、写真、最終提出資料を継続的に確認しました。未提出・要修正項目を案内し、企業訪問レポート、病院実習報告、インタビュー資料を集約しました。", skills:["進捗管理","データ確認","学生対応","報告整理"], learned:"数値で進捗を確認しながら、学生一人ひとりの状況にも合わせて支援する必要があると学びました。", challenge:"学生ごとに日程と提出状況が異なるため、確認項目を標準化し、システム上で進捗を把握できる流れに改善しました。" },
  { work:"JISA公式サイトを既存資料の分析から再構築しました。情報設計、日韓言語切替、レスポンシブ画面、インタラクション、アクセシビリティを設計し、WordPressカスタムテーマとして実運用環境に導入しました。", skills:["HTML","CSS","JavaScript","Responsive UI","WordPress","多言語UX"], learned:"見た目だけでなく、クリックできる場所が明確で、目的の情報へ早く到達できる設計が重要だと学びました。", challenge:"大量のPDFをそのまま移すのではなくWebサイトに合う流れへ再構成し、文字、余白、ボタン状態、ページ構造を改善しました。" },
  { work:"韓国の大学、日本企業、学生、JISA担当者の間で、日程・依頼・提出情報を韓国語と日本語で整理して共有しました。送信前に内容、対象、期限を再確認しました。", skills:["韓国語・日本語","ビジネス連絡","要約","確認・共有"], learned:"正確な連絡とは翻訳だけでなく、相手が次に何をすべきかまで明確にすることだと学びました。", challenge:"曖昧な表現は質問で確認し、必要な行動と期限を分けて伝えました。" },
  { work:"韓国の大学関係者と日本企業担当者の現場会話で逐次通訳を支援しました。技術・日程・教育関連の表現を事前に調べ、意図と雰囲気を保って伝えました。", skills:["JLPT N1","逐次通訳","事前調査","現場対応"], learned:"通訳は単語を置き換えるだけでなく、異なる背景を持つ人が同じ状況を理解できるようにつなぐ仕事だと学びました。", challenge:"予想外の専門用語に備えて訪問目的と企業情報を事前に調べ、不明点はその場で再確認しました。" },
  { work:"INNOPHYSやYakultなどの訪問先を調査し、参加条件、予約、日程、集合場所、移動経路、現地引率、訪問後レポートまで担当しました。", skills:["企業調査","予約・調整","動線設計","現地引率"], learned:"企業訪問の質は当日よりも、事前調査と移動計画、参加者への案内で決まると学びました。", challenge:"複雑な東京の交通を考慮し、乗換・集合・緊急連絡情報と余裕時間を準備しました。" },
  { work:"イプロスAI 2026 夏とWellness Foodの参加条件・セッションを調査し、登録、チケット、移動計画を準備しました。現地では学生を引率し、企業・技術情報を記録しました。", skills:["情報検索","参加申請","現地調査","コンテンツ整理"], learned:"展示会は目的と質問、記録方法を事前に準備することで学習成果が残ると学びました。", challenge:"限られた時間の中で、学生の専攻と関心を基準に優先訪問先を決めました。" },
];

const studentTasksKo = ["학생별 기업 배치 확인", "출퇴근 정보 정리", "실습일지 작성 현황 확인", "학생 활동 내용 정리", "기업 방문 감상문 작성 지원", "병원 실습 주간 감상문 취합", "한 달간 학생 활동 기록 정리", "인터뷰 동영상 촬영 지원", "최종 제출자료 확인", "학교 및 기업용 설명자료 제작"];
const studentTasksJa = ["学生ごとの企業配属を確認", "出退勤情報を整理", "実習日誌の作成状況を確認", "学生の活動内容を整理", "企業訪問レポートの作成支援", "病院実習の週間レポートを集約", "1か月間の学生活動記録を整理", "インタビュー動画の撮影支援", "最終提出資料を確認", "大学・企業向け説明資料を作成"];

const numberStats = [[60, "DAYS IN JAPAN"], [2, "UNIVERSITIES"], [5, "COMPANIES", "+"], [2, "EXHIBITIONS"], [1, "WEB SYSTEM"]] as const;

export function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("ko");
  const [lightbox, setLightbox] = useState<{ caption: string; src: string } | null>(null);
  const [activeRole, setActiveRole] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const roleDetailRef = useRef<HTMLDivElement>(null);
  const isJa = language === "ja";
  const roles = isJa ? rolesJa : rolesKo;
  const studentTasks = isJa ? studentTasksJa : studentTasksKo;
  const roleDetails = isJa ? roleDetailsJa : roleDetailsKo;
  const summerChapters = isJa ? [
    ["01", "BUILD", "役割と統合システム"],
    ["02", "GUIDE", "学生管理と企業訪問"],
    ["03", "DISCOVER", "展示会とWeb制作"],
    ["04", "CONNECT", "日韓コミュニケーション"],
    ["05", "REMEMBER", "学びと東京の記憶"],
  ] : [
    ["01", "BUILD", "역할과 통합 시스템"],
    ["02", "GUIDE", "학생 관리와 기업 방문"],
    ["03", "DISCOVER", "박람회와 웹 제작"],
    ["04", "CONNECT", "한일 커뮤니케이션"],
    ["05", "REMEMBER", "배운 점과 도쿄의 기억"],
  ];
  const chapterIds = ["journey-build", "journey-guide", "journey-discover", "journey-connect", "memories"];
  const memoryPhotos = isJa ? [
    ["横浜の夜景", "/images/memories/yokohama-night.jpg"],
    ["観覧車から見た横浜", "/images/memories/yokohama-wheel-portrait.jpg"],
    ["夏色の観覧車", "/images/memories/yokohama-ferris-wheel.jpg"],
    ["夏の東京タワー", "/images/memories/tokyo-tower-summer-night.jpg"],
    ["青空とスカイツリー", "/images/memories/skytree-summer-sky.jpg"],
    ["東京駅の夜", "/images/memories/tokyo-station-night.jpg"],
    ["夕暮れの夏祭り", "/images/memories/summer-market.jpg"],
    ["細田守の原点展", "/images/memories/summer-exhibition.jpg"],
    ["時をかける少女、2006 SUMMER", "/images/memories/summer-animation.jpg"],
    ["川越で見つけた灯り", "/images/memories/kawagoe-miffy.jpg"],
    ["神保町の雑誌棚", "/images/memories/jimbocho-magazines.jpg"],
    ["矢口書店を歩く", "/images/memories/yaguchi-bookstore.jpg"],
    ["東京タワーで残した一枚", "/images/memories/tokyo-tower-portrait.jpg"],
    ["雨上がりの東京タワー", "/images/memories/tokyo-tower-day.jpg"],
  ] : [
    ["요코하마의 밤", "/images/memories/yokohama-night.jpg"],
    ["관람차에서 본 요코하마", "/images/memories/yokohama-wheel-portrait.jpg"],
    ["여름빛 관람차", "/images/memories/yokohama-ferris-wheel.jpg"],
    ["여름밤의 도쿄타워", "/images/memories/tokyo-tower-summer-night.jpg"],
    ["파란 하늘과 스카이트리", "/images/memories/skytree-summer-sky.jpg"],
    ["도쿄역의 밤", "/images/memories/tokyo-station-night.jpg"],
    ["해 질 무렵의 여름 축제", "/images/memories/summer-market.jpg"],
    ["호소다 마모루의 원점전", "/images/memories/summer-exhibition.jpg"],
    ["시간을 달리는 소녀, 2006 SUMMER", "/images/memories/summer-animation.jpg"],
    ["가와고에에서 만난 불빛", "/images/memories/kawagoe-miffy.jpg"],
    ["진보초의 오래된 잡지들", "/images/memories/jimbocho-magazines.jpg"],
    ["야구치 서점 산책", "/images/memories/yaguchi-bookstore.jpg"],
    ["도쿄타워에서 남긴 한 장", "/images/memories/tokyo-tower-portrait.jpg"],
    ["비가 갠 뒤의 도쿄타워", "/images/memories/tokyo-tower-day.jpg"],
  ];

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
  const selectRole = (index: number) => {
    setActiveRole(index);
    requestAnimationFrame(() => roleDetailRef.current?.scrollIntoView({ behavior:"smooth", block:"center" }));
  };
  return <>
    <header className="topbar">
      <a className="wordmark" href="#top" onClick={closeMenu}>SUHO <span>/ TOKYO 2026</span></a>
      <nav className={menuOpen ? "navOpen" : ""} aria-label={isJa ? "メインメニュー" : "주요 메뉴"}>
        {[['ABOUT','about'],['JOURNEY','journey'],['MEMORIES','memories']].map(([label, id]) => <a key={id} href={`#${id}`} onClick={closeMenu}>{label}</a>)}
      </nav>
      <div className="languageSwitch" role="group" aria-label={isJa ? "言語選択" : "언어 선택"}>
        <button className={!isJa ? "active" : ""} onClick={() => setLanguage("ko")} aria-pressed={!isJa}>한국어</button>
        <button className={isJa ? "active" : ""} onClick={() => setLanguage("ja")} aria-pressed={isJa}>日本語</button>
      </div>
      <button className="menuButton" aria-label={menuOpen ? (isJa ? "メニューを閉じる" : "메뉴 닫기") : (isJa ? "メニューを開く" : "메뉴 열기")} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    </header>

    <main id="top" className="summerPortfolio">
      <section className="hero" ref={heroRef}>
        <div className="metroLines" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="heroCopy">
          <p className="kicker">SUHO IN TOKYO · JAPAN INTERNSHIP 2026</p>
          <h1><span className="heroSchool">CHONNAM</span><br /><span className="heroDestination">TO TOKYO</span></h1>
          <p className="schoolStatement">{isJa ? <>全南大学校 人工知能学部から<br /><strong>東京のインターンシップ現場へ。</strong></> : <>전남대학교 인공지능학부에서<br /><strong>도쿄의 인턴십 현장으로.</strong></>}</p>
          <p className="discipline">ARTIFICIAL INTELLIGENCE <b>×</b> DEVELOPMENT <b>×</b> PROGRAM OPERATIONS</p>
          <div className="heroStatement">I DIDN&apos;T JUST PARTICIPATE.<br /><strong>I HELPED MAKE IT HAPPEN.</strong></div>
          <p className="heroNote">{isJa ? <>システム開発から<br />東京での学生引率まで。</> : <>From building systems<br />to guiding students across Tokyo.</>}</p>
        </div>
        <div className="heroVisual">
          <Photo label="TOKYO 2026" hint="Tokyo / Work / Suho" src="/images/ai-tokyo-hero.jpg" />
        </div>
        <a className="scrollCue" href="#about">SCROLL TO EXPLORE <ArrowDown /></a>
      </section>

      <section className="story section" id="about">
        <div className="sectionTag">01 / PROFILE</div>
        <div className="profileLead" data-reveal>
          <div><p className="eyebrow">LEE SUHO / イ・スホ</p><h2>AI STUDENT.<br />DEVELOPER.<br /><span>OPERATOR.</span></h2></div>
          <div><strong>AI Student · Developer · Internship Operations Support</strong><p>{isJa ? "全南大学校人工知能学部で人工知能を専攻し、AI・ソフトウェア開発の知識を活かして、日本のインターンシッププログラムにおける運営支援とシステム開発を担当しました。Web開発に加え、データ処理、機械学習・深層学習、自然言語処理のプロジェクト経験を持ち、日本の現場では学生・企業・大学間のコミュニケーションと運営業務にも参加しました。" : "전남대학교 인공지능학부에서 인공지능을 전공하고 있으며, AI·소프트웨어 개발 역량을 바탕으로 일본 인턴십 프로그램의 운영 지원과 시스템 개발 업무를 수행했습니다. 웹 개발뿐 아니라 데이터 처리, 머신러닝·딥러닝, 자연어처리 프로젝트 경험을 가지고 있으며, 일본 현장에서는 개발과 함께 학생·기업·학교 간 커뮤니케이션 및 운영 업무에도 참여했습니다."}</p></div>
        </div>
        <div className="profileDisciplines" data-reveal>
          <strong>ARTIFICIAL INTELLIGENCE</strong><i>×</i><strong>SOFTWARE DEVELOPMENT</strong><i>×</i><strong>JAPANESE COMMUNICATION</strong>
        </div>
        <div className="profileMetrics" data-reveal>
          <div><strong>03</strong><span>YEAR</span></div><div><strong>N1</strong><span>JLPT</span></div><div><strong>860</strong><span>TOEIC</span></div><div><strong>8</strong><span>WEEKS IN JAPAN</span></div>
        </div>
        <div className="profileDetails" data-reveal>
          <div><small>UNIVERSITY</small><strong>{isJa ? "全南大学校（Chonnam National University）" : "전남대학교 (Chonnam National University)"}</strong></div>
          <div><small>MAJOR</small><strong>{isJa ? "人工知能学部・人工知能専攻" : "인공지능학부 인공지능전공"}</strong></div>
          <div className="profileDetailFeature"><small>AI / MACHINE LEARNING</small><strong>{isJa ? "ロボット走行方向を予測する機械学習モデルの比較・改善" : "로봇 이동 방향 예측 머신러닝 모델 비교·개선"}</strong><p>{isJa ? "24個の超音波センサーデータを前処理し、Logistic Regression・RBF-SVM・Random Forestを比較しました。PolynomialFeaturesによる特徴量エンジニアリング、GridSearch、クラス重み調整、5-fold交差検証を行い、Accuracy・Precision・Recall・Macro F1、混同行列、誤分類、Feature Importanceまで分析しました。" : "24개 초음파 센서 데이터를 전처리하고 Logistic Regression·RBF-SVM·Random Forest를 비교했습니다. PolynomialFeatures 기반 특성 공학, GridSearch, 클래스 가중치 조정과 5-fold 교차검증을 수행했으며 Accuracy·Precision·Recall·Macro F1, 혼동행렬, 오분류와 Feature Importance까지 분석했습니다."}</p><div className="profileSkillTags"><span>Python</span><span>Scikit-learn</span><span>Logistic Regression</span><span>RBF-SVM</span><span>Random Forest</span><span>GridSearch</span></div></div>
          <div className="profileDetailFeature"><small>NLP / DEEP LEARNING</small><strong>{isJa ? "韓国語の間接表現・感情・隠れた意図を分析するNLPシステム" : "한국어 간접 표현·감정·숨은 의도 분석 NLP 시스템"}</strong><p>{isJa ? "TF-IDF＋Logistic Regressionをベースラインとして構築し、KLUE-BERTを文章分類タスクにFine-tuningしました。直接／間接表現、隠れた感情・意図を分類し、Classification Reportと混同行列で評価したほか、リスクスコアと応答推薦を含むStreamlitデモまで実装しました。" : "TF-IDF + Logistic Regression을 기준 모델로 구축하고 KLUE-BERT를 문장 분류 작업에 Fine-tuning했습니다. 직접·간접 표현과 숨은 감정·의도를 분류하고 Classification Report와 혼동행렬로 평가했으며, 위험도 점수와 응답 추천을 포함한 Streamlit 데모까지 구현했습니다."}</p><div className="profileSkillTags"><span>KLUE-BERT</span><span>Transformer</span><span>Fine-tuning</span><span>TF-IDF</span><span>Text Classification</span><span>Streamlit</span></div></div>
          <div><small>WEB DEVELOPMENT</small><strong>HTML · CSS · JavaScript · Google Apps Script</strong></div>
          <div><small>SYSTEM DEVELOPMENT</small><strong>{isJa ? "権限設計・データ構造・業務管理システムの開発運用" : "사용자 권한 · 데이터 구조 · 업무 관리 시스템 개발 및 운영"}</strong></div>
          <div><small>GOOGLE WORKSPACE</small><strong>Forms · Sheets · Drive · Apps Script · Trigger</strong></div>
          <div><small>DATABASE / TOOLS</small><strong>{isJa ? "データモデル設計・Gitによるバージョン管理" : "데이터 모델 설계 · Git 버전 관리"}</strong></div>
          <div><small>UI / UX</small><strong>{isJa ? "利用者フィードバックに基づく画面・業務フロー改善" : "사용자 피드백 기반 화면·업무 흐름 개선"}</strong></div>
          <div><small>LANGUAGE</small><strong>{isJa ? "JLPT N1・TOEIC 860・日常／実務コミュニケーション" : "JLPT N1 · TOEIC 860 · 일본어 일상·실무 커뮤니케이션"}</strong></div>
          <div><small>INTERNSHIP PERIOD</small><strong>2026.06.30 — 2026.08.29 / 8 WEEKS</strong></div>
          <div><small>PROGRAM</small><strong>{isJa ? "大学SW中心大学事業団 · JISA（日本インターンシップ支援協会）" : "대학 SW중심사업단 · JISA 일본인턴십지원협회"}</strong></div>
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

      <section className="summerPrelude" id="chapters" aria-labelledby="summer-title">
        <div className="summerSun" aria-hidden="true"><Sun /></div>
        <div className="summerPreludeCopy">
          <p>SUMMER INTERNSHIP · JAPAN 2026</p>
          <h2 id="summer-title">A SUMMER<br />I HELPED<br /><span>MAKE HAPPEN.</span></h2>
          <div>{isJa ? "海のように広く、花火のように鮮明だった8週間。" : "바다처럼 넓게 배우고, 불꽃처럼 선명하게 남은 8주."}</div>
        </div>
        <div className="summerWave" aria-hidden="true"><Waves /><Waves /><Waves /></div>
      </section>

      <section className="summerRoute section" id="journey" aria-label={isJa ? "夏の記録" : "여름의 기록"}>
        <div className="routeIntro"><p className="eyebrow">THE SUMMER ROUTE</p><h2>{isJa ? <>仕事も、東京も。<br />一つの夏として。</> : <>일도, 도쿄도.<br />하나의 여름으로.</>}</h2><p>{isJa ? "章を切り替える必要はありません。そのままスクロールしながら、8週間の仕事と時間を順番に見ることができます。" : "챕터를 매번 바꿀 필요 없이 그대로 스크롤하며 8주간의 업무와 시간을 순서대로 볼 수 있습니다."}</p></div>
        <nav className="routeLinks">{summerChapters.map(([n, title, desc], index) => <a key={title} href={`#${chapterIds[index]}`}><span>{n}</span><strong>{title}</strong><small>{desc}</small><ArrowDown /></a>)}</nav>
      </section>

      <div className="summerChapterStage">
      <div id="journey-build" className="summerChapterPanel">
      <div className="journeyMarker"><span>01</span><p>BUILD</p><small>{isJa ? "つくる" : "만들다"}</small></div>
      <section className="roles section colorBand" id="work">
        <div className="sectionHeading"><div><p className="eyebrow">MY ROLE</p><h2>WHAT WAS<br />MY ROLE?</h2></div><p>{isJa ? "運営に必要なことを、幅広く。" : "A little bit of everything."}</p></div>
        <div className="roleTicker" aria-hidden="true">
          <div className="roleTickerTrack">{[0, 1].map((copy) => <div className="roleTickerGroup" key={copy}><span>SYSTEM DEVELOPMENT</span><b>×</b><span>PROGRAM OPERATIONS</span><b>×</b><span>AI &amp; DATA</span><b>×</b><span>WEB DESIGN</span><b>×</b><span>JAPANESE COMMUNICATION</span><b>×</b><span>FIELD SUPPORT</span><i>●</i></div>)}</div>
        </div>
        <p className="roleGuide">{isJa ? "気になる役割を選ぶと、担当内容・必要なスキル・学んだこと・難しかったことを確認できます。" : "궁금한 역할을 선택하면 담당한 일, 필요한 스킬, 배운 점과 힘들었던 점을 확인할 수 있습니다."}</p>
        <div className="roleGrid" data-reveal>{roles.map(([n,en,ko,desc,tags], index) => <button type="button" className={`roleCard ${activeRole === index ? "active" : ""}`} key={n} onClick={() => selectRole(index)} aria-pressed={activeRole === index}><b>{n}</b><Code2 aria-hidden="true" /><p>{en}</p><h3>{ko}</h3><span>{desc}</span><small>{tags}</small><i className="roleAction">{isJa ? "詳しく見る" : "자세히 보기"}<ArrowDown /></i></button>)}</div>
        <div className="roleDetailPanel" ref={roleDetailRef} key={`${language}-${activeRole}`} tabIndex={-1}>
          <div className="roleDetailTitle"><span>ROLE / {roles[activeRole][0]}</span><p>{roles[activeRole][1]}</p><h3>{roles[activeRole][2]}</h3></div>
          <div className="roleWork"><small>{isJa ? "WHAT I DID" : "담당한 일"}</small><p>{roleDetails[activeRole].work}</p></div>
          <div className="roleSkills"><small>{isJa ? "REQUIRED SKILLS" : "필요한 스킬"}</small><div>{roleDetails[activeRole].skills.map(skill => <span key={skill}>{skill}</span>)}</div></div>
          <div className="roleLearning"><small>{isJa ? "WHAT I LEARNED" : "배운 점"}</small><p>{roleDetails[activeRole].learned}</p></div>
          <div className="roleChallenge"><small>{isJa ? "THE CHALLENGE" : "힘들었던 점"}</small><p>{roleDetails[activeRole].challenge}</p></div>
        </div>
      </section>

      <section className="system section">
        <div className="sectionHeading"><div><p className="eyebrow">FLAGSHIP SYSTEM DEVELOPMENT</p><h2>I BUILT<br />THE SYSTEM.</h2></div><p><strong>3 systems became one.</strong><br />Built for real operations.</p></div>
        <div className="systemIntro" data-reveal><p>{isJa ? "プログラムごとに分かれていた3つの管理システムを、一つのWebアプリケーションへ統合しました。プログラム作成・終了、学生・企業・大学、日誌・写真・コメント・文書、エラー復旧、バックアップ、出力までを一つの運用フローとして設計した、今回のインターンシップにおける代表プロジェクトです。" : "프로그램마다 분리되어 있던 3개의 관리 시스템을 하나의 웹 애플리케이션으로 통합했습니다. 프로그램 생성·종료, 학생·기업·학교, 일지·사진·코멘트·문서, 오류 복구, 백업과 내보내기까지 하나의 운영 흐름으로 설계한 이번 인턴십의 대표 프로젝트입니다."}</p><div className="buildLoop"><b>ANALYZE</b><ArrowRight /><b>DESIGN</b><ArrowRight /><b>BUILD</b><ArrowRight /><b>TEST</b><ArrowRight /><b>OPERATE</b></div></div>
        <div className="systemImpact" data-reveal>{[["3", isJa ? "統合したシステム" : "통합한 시스템"], ["4", isJa ? "利用者権限" : "사용자 권한"], ["252", isJa ? "実運用記録" : "실제 운영 기록"], ["10 MIN", isJa ? "自動照合周期" : "자동 대조 주기"]].map(([value,label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
        <div className="caseStudyGrid systemCase">
          <article data-reveal><small>01 / PROBLEM</small><h3>{isJa ? "分散した情報と重複作業" : "흩어진 정보와 반복 업무"}</h3><p>{isJa ? "学生の日誌、出退勤、企業コメント、大学別確認事項が別々に管理され、担当者が同じ内容を繰り返し確認する必要がありました。誰がどの記録を提出・確認したのかを一目で把握しにくいことも課題でした。" : "학생 일지, 출퇴근, 기업 코멘트와 학교별 확인 사항이 각각 따로 관리되어 담당자가 같은 내용을 반복해서 확인해야 했습니다. 누가 어떤 기록을 제출하고 확인했는지 한눈에 파악하기 어려운 것도 문제였습니다."}</p></article>
          <article data-reveal><small>02 / ARCHITECTURE</small><h3>{isJa ? "プログラムと権限をデータ境界に" : "프로그램과 권한을 데이터 경계로"}</h3><p>{isJa ? "プログラムを最上位のデータ境界にし、JISA管理者・学生・企業・大学の4つの役割を分離しました。ブラウザの役割情報を信頼せず、サーバー側でセッション、プログラム、所属機関を毎回検証します。" : "프로그램을 최상위 데이터 경계로 두고 JISA 관리자·학생·기업·학교의 4개 역할을 분리했습니다. 브라우저의 역할 정보를 그대로 믿지 않고 서버에서 세션, 프로그램과 소속 기관을 매번 검증합니다."}</p></article>
          <article data-reveal><small>03 / RELIABILITY</small><h3>{isJa ? "失敗しても記録を取り戻せる" : "실패해도 기록을 되찾을 수 있게"}</h3><p>{isJa ? "フォーム原本とシステム記録を10分ごとに自動照合し、失敗した回答はそのまま保存します。選択的な再処理、操作監査、エラー診断、定期バックアップ、復元前プレビューまで実装しました。" : "폼 원본과 시스템 기록을 10분마다 자동 대조하고 실패한 응답은 그대로 보존합니다. 선택 재처리, 작업 감사, 오류 진단, 예약 백업과 복원 전 미리보기까지 구현했습니다."}</p></article>
          <article className="challengeCard" data-reveal><small>04 / HARDEST PART</small><h3>{isJa ? "複数プログラムを安全かつ速く" : "여러 프로그램을 안전하고 빠르게"}</h3><p>{isJa ? "最も難しかったのは、異なる役割と複数プログラムが同時に動く中で、権限衝突・重複登録・欠落記録・Apps Scriptの実行制限を一緒に解決することでした。画面を作るだけでなく、運営者が開発者なしで異常を発見し復旧できるところまで設計しました。" : "가장 어려웠던 점은 서로 다른 권한과 여러 프로그램이 동시에 움직일 때 권한 충돌, 중복 등록, 누락 기록과 Apps Script 실행 제한을 함께 해결하는 일이었습니다. 화면 제작에 그치지 않고 운영자가 개발자 없이 이상을 발견하고 복구할 수 있는 수준까지 설계했습니다."}</p></article>
        </div>
        <div className="techStack"><span>GOOGLE APPS SCRIPT</span><span>GOOGLE SHEETS</span><span>GOOGLE FORMS</span><span>GOOGLE DRIVE</span><span>ROLE-BASED ACCESS</span><span>PBKDF2 HASH</span><span>AUTO RECONCILIATION</span><span>BACKUP & RESTORE</span></div>
        <div className="systemMap" data-reveal><strong>JISA ADMIN</strong><i /><div><span><Users />STUDENT<small>{isJa ? "日誌・写真・進捗" : "일지 · 사진 · 진행률"}</small></span><span><Building2 />COMPANY<small>{isJa ? "確認・コメント・評価" : "확인 · 코멘트 · 평가"}</small></span><span><BookOpen />SCHOOL<small>{isJa ? "所属学生・文書出力" : "소속 학생 · 문서 출력"}</small></span></div></div>
        <div className="systemScreens" data-reveal>
          <div className="browserMock systemScreenPrimary"><div className="browserBar"><i /><i /><i /><span>jisa-integrated-system / programs</span></div><Photo className="projectScreenshot integratedDashboard" label="INTEGRATED PROGRAM DASHBOARD" src="/images/system-report/image1.png" caption={isJa ? "実際の複数プログラム統合ダッシュボード：9名・6社・2大学・252件" : "실제 멀티 프로그램 통합 대시보드: 학생 9명·기업 6곳·학교 2곳·기록 252건"} /></div>
          <div className="browserMock integratedLogin"><div className="browserBar"><i /><i /><i /><span>jisa-integrated-system / login</span></div><Photo className="projectScreenshot" label="ROLE BASED LOGIN" src="/images/system-report/image2.png" caption={isJa ? "4つの役割に対応する統合ログイン画面" : "4개 사용자 권한을 지원하는 통합 로그인 화면"} /></div>
          <div className="systemProof"><small>OPERATIONS PROOF</small><strong>9 STUDENTS<br />6 COMPANIES<br />2 SCHOOLS<br /><em>252 RECORDS</em></strong><p>{isJa ? "学生登録から日誌・写真・文書、確認、出力、復旧までを実際のデータで検証しました。" : "학생 등록부터 일지·사진·문서, 확인, 내보내기와 복구까지 실제 데이터로 검증했습니다."}</p></div>
        </div>
      </section>

      </div>
      <div id="journey-guide" className="summerChapterPanel">
      <div className="journeyMarker"><span>02</span><p>GUIDE</p><small>{isJa ? "支える" : "지원하다"}</small></div>

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

      </div>
      <div id="journey-discover" className="summerChapterPanel">
      <div className="journeyMarker"><span>03</span><p>DISCOVER</p><small>{isJa ? "見つける" : "발견하다"}</small></div>

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
        <div className="digitalSplit"><div className="digitalCopy"><h3>{isJa ? "JISA公式サイトをゼロから再構築" : "JISA 공식 홈페이지를 처음부터 재구축"}</h3><p>{isJa ? "既存資料と協会の事業内容を分析するところから始め、誰が訪れても必要な情報に到達できるようサイト構成を全面的に再設計しました。ロゴの青を基調にブランドカラー、文字体系、余白、写真比率、ボタン状態を統一し、日本語・韓国語の両方に対応するレスポンシブWebサイトを制作しました。完成後はWordPressのカスタムテーマとしてパッケージ化し、担当者が実際の管理画面から運用できる形まで整えました。" : "기존 자료와 협회의 사업 내용을 분석하는 것부터 시작해, 누구나 필요한 정보를 빠르게 찾을 수 있도록 사이트 구조를 전면 재설계했습니다. 로고의 파란색을 기준으로 브랜드 색상, 글자 체계, 여백, 사진 비율과 버튼 상태를 통일하고 한국어·일본어를 모두 지원하는 반응형 웹사이트를 제작했습니다. 완성 후에는 워드프레스 사용자 정의 테마로 패키징하여 담당자가 실제 관리자 화면에서 운영할 수 있는 형태까지 구현했습니다."}</p><ul>{(isJa ? ["要件・既存資料分析", "情報設計と導線", "UIデザインシステム", "日韓多言語対応", "レスポンシブ実装", "WordPressテーマ化"] : ["요구사항·기존 자료 분석", "정보 구조와 사용자 동선", "UI 디자인 시스템", "한일 다국어 전환", "반응형 웹 구현", "워드프레스 테마 제작"]).map(item => <li key={item}>{item}</li>)}</ul></div><Photo className="projectScreenshot" label="JISA WEBSITE" src="/images/jisa-website-screenshot.png" caption={isJa ? "実際に制作したJISA公式サイト" : "실제로 제작한 JISA 공식 홈페이지"} /></div>
        <div className="caseStudyGrid websiteCase">
          <article data-reveal><small>01 / CONTENT</small><h3>{isJa ? "大量の資料をWebの言葉へ" : "많은 자료를 웹의 언어로"}</h3><p>{isJa ? "PDFや既存サイトに分散していた協会紹介、プログラム、大学連携、支援内容を読み直し、ページとセクションに整理しました。資料をそのまま貼り付けず、閲覧者の目的に合わせて見出し・要約・詳細へ情報の階層を作りました。" : "PDF와 기존 사이트에 흩어져 있던 협회 소개, 프로그램, 대학 연계와 지원 내용을 다시 읽고 페이지와 섹션으로 정리했습니다. 자료를 그대로 붙여 넣지 않고 방문자의 목적에 따라 제목·요약·상세 내용으로 정보의 위계를 만들었습니다."}</p></article>
          <article data-reveal><small>02 / EXPERIENCE</small><h3>{isJa ? "クリックできる場所を明確に" : "클릭 가능한 영역을 명확하게"}</h3><p>{isJa ? "初期案では要素間の余白が少なく、ボタンと説明領域の区別も曖昧でした。ナビゲーション、カード、タブ、スライダー、言語メニューの状態を再設計し、ホバー・選択・フォーカス時の反応を統一しました。" : "초기 화면은 요소 사이의 여백이 부족하고 버튼과 설명 영역의 구분도 모호했습니다. 내비게이션, 카드, 탭, 슬라이더와 언어 메뉴의 상태를 다시 설계하고 마우스 오버·선택·키보드 포커스 반응을 통일했습니다."}</p></article>
          <article data-reveal><small>03 / WORDPRESS</small><h3>{isJa ? "デザインを運用可能なテーマへ" : "디자인을 운영 가능한 테마로"}</h3><p>{isJa ? "静的な画面で終わらせず、ヘッダー、ページテンプレート、画像、スタイル、スクリプトをWordPressテーマの構造に変換しました。Polylangによる言語切替や問い合わせメール運用も考慮し、更新後も担当者が扱える構成にしました。" : "정적인 화면으로 끝내지 않고 헤더, 페이지 템플릿, 이미지, 스타일과 스크립트를 워드프레스 테마 구조로 변환했습니다. Polylang 언어 전환과 문의 메일 운영까지 고려하여 이후에도 담당자가 관리할 수 있는 구조로 만들었습니다."}</p></article>
          <article className="challengeCard" data-reveal><small>04 / HARDEST PART</small><h3>{isJa ? "正解のないデザインを調整する" : "정답이 없는 디자인을 조율하기"}</h3><p>{isJa ? "実績写真や確定原稿がそろっていない状態で、協会らしい信頼感と若い参加者に届く新鮮さを同時に表現する必要がありました。フィードバックのたびに情報量、文字サイズ、色、横方向のレイアウト、写真枠を検証し、既存内容を守りながら見やすさを高めました。技術的な実装以上に、曖昧な要望を具体的な画面へ翻訳する作業が難しく、同時に最も成長した部分でした。" : "실적 사진과 확정 원고가 모두 준비되지 않은 상태에서 협회다운 신뢰감과 젊은 참가자에게 전달되는 신선함을 함께 표현해야 했습니다. 피드백을 받을 때마다 정보량, 글자 크기, 색상, 가로형 레이아웃과 사진 영역을 검토하며 기존 내용을 지키면서도 읽기 쉽게 개선했습니다. 기술 구현보다 모호한 요구를 구체적인 화면으로 번역하는 과정이 어려웠고, 동시에 가장 크게 성장한 부분이었습니다."}</p></article>
        </div>
        <div className="techStack"><span>WORDPRESS</span><span>HTML / CSS</span><span>JAVASCRIPT</span><span>PHP THEME</span><span>POLYLANG</span><span>GIT / GITHUB</span></div>
        <h3 className="galleryTitle">DIGITAL CONTENT</h3><div className="contentStrip"><span>INSTAGRAM</span><span>REELS</span><span>JAPANESE COPY</span><span>KOREAN COPY</span><span>PHOTO & VIDEO</span></div>
      </section>

      </div>
      <div id="journey-connect" className="summerChapterPanel">
      <div className="journeyMarker"><span>04</span><p>CONNECT</p><small>{isJa ? "つなぐ" : "연결하다"}</small></div>

      <section className="communication section warmBand">
        <div className="communicationTitle"><p className="eyebrow">COMMUNICATION & INTERPRETATION</p><h2>BETWEEN<br />KOREA <span>KR</span><br /><i>&</i><br />JAPAN <span>JP</span></h2></div>
        <div className="bridge" data-reveal><div><strong>KOREA</strong><span>University<br />Professors<br />Students</span></div><div className="me"><Languages />ME</div><div><strong>JAPAN</strong><span>Companies<br />Managers<br />Organizations</span></div></div>
        <p className="communicationCopy">{isJa ? "韓国の大学・学生と日本企業の間で、現場通訳、業務文書の作成、日韓資料の整理、企業案内資料とシステムマニュアルの制作を支援しました。" : "한국 학교, 학생, 일본 기업 사이에서 현장 통역, 업무 문서 작성, 한일 자료 정리, 기업 안내자료와 시스템 매뉴얼 제작을 지원했습니다."}</p>
      </section>

      <section className="numbers section"><p className="eyebrow">INTERNSHIP BY NUMBERS</p><h2>INTERNSHIP<br />BY NUMBERS.</h2><div className="numberGrid">{numberStats.map(([n,label,suffix]) => <div key={label} data-reveal><strong>{n}{suffix || ""}</strong><span>{label}</span></div>)}<div className="infinite" data-reveal><strong>∞</strong><span>PROBLEMS SOLVED</span></div></div></section>

      </div>
      <div id="memories" className="summerChapterPanel memoryChapter">
      <div className="journeyMarker"><span>05</span><p>REMEMBER</p><small>{isJa ? "記憶する" : "기억하다"}</small></div>

      <section className="learned section warmBand"><p className="eyebrow">WHAT I LEARNED</p><h2>THINGS I LEARNED<br />THE HARD WAY.</h2><div className="lessonGrid">
        <Lesson n="01" title="BUILD FOR PEOPLE." text={isJa ? "開発者にとって便利なシステムより、実際の利用者が使いやすいシステムが重要だと学びました。" : "개발자에게 편한 시스템보다 실제 사용자가 편한 시스템이 더 중요하다는 것을 배웠습니다."} />
        <Lesson n="02" title="ASK WHEN YOU DON'T KNOW." text={isJa ? "業務を正確に理解するには、分からないことをすぐに質問する姿勢が重要でした。" : "업무를 정확히 이해하려면 모르는 것을 바로 질문하는 태도가 중요했습니다."} />
        <Lesson n="03" title="PLANS ALWAYS CHANGE." text={isJa ? "計画だけでなく、予期しない状況に素早く対応する力も必要でした。" : "계획뿐 아니라 예상하지 못한 상황에 빠르게 대응하는 능력이 필요했습니다."} />
        <Lesson n="04" title="DEVELOPMENT ≠ CODING ONLY." text={isJa ? "開発、運営、ユーザー支援、コミュニケーション、文書化がそろって初めてサービスが動きます。" : "개발, 운영, 사용자 지원, 커뮤니케이션과 문서화가 함께해야 서비스가 움직입니다."} />
      </div></section>

      <section className="memoryOpening" aria-labelledby="memory-title">
        <video autoPlay muted loop playsInline preload="metadata" poster="/images/memories/yokohama-night.jpg"><source src="/videos/tokyo-summer-01.mp4" type="video/mp4" /></video>
        <div><p>OFF DUTY IN TOKYO · SUMMER 2026</p><h2 id="memory-title">WORK ENDED.<br /><span>SUMMER DIDN&apos;T.</span></h2><strong>{isJa ? "仕事の外で出会った東京も、このインターンシップを完成させた大切な時間でした。" : "업무가 끝난 뒤 만난 도쿄도, 이번 인턴십을 완성한 소중한 시간이었습니다."}</strong></div>
      </section>

      <section className="memoryStories section">
        <div className="memoryLead"><div><p className="eyebrow">PERSONAL ACTIVITIES</p><h2>{isJa ? <>働いたあと、<br />夏を歩いた。</> : <>일한 뒤에는,<br />여름을 걸었다.</>}</h2></div><p>{isJa ? "横浜の観覧車、東京タワー、夏祭り、アニメーションの展示、神保町の古書店。観光地を回っただけではなく、日本の街と文化を自分の速度で知っていった記録です。" : "요코하마의 관람차, 도쿄타워, 여름 축제, 애니메이션 전시와 진보초의 오래된 서점. 관광지만 돌아본 것이 아니라 일본의 도시와 문화를 내 속도로 알아간 기록입니다."}</p></div>
        <div className="memoryEditorial">
          <button className="memoryWide" onClick={() => setLightbox({ caption: memoryPhotos[0][0], src: memoryPhotos[0][1] })}><Photo label={memoryPhotos[0][0]} src={memoryPhotos[0][1]} caption={memoryPhotos[0][0]} /></button>
          <article><span>01 / YOKOHAMA</span><h3>{isJa ? "港の風と、観覧車の光。" : "항구의 바람과 관람차의 빛."}</h3><p>{isJa ? "日が沈んだあと、横浜の水面に街の色が映りました。短い夜の散歩が、忙しかった一日の余白になりました。" : "해가 진 뒤 요코하마의 수면에 도시의 색이 비쳤습니다. 짧은 밤 산책이 바빴던 하루에 여백을 만들어 주었습니다."}</p></article>
          <button className="memoryPortrait" onClick={() => setLightbox({ caption: memoryPhotos[1][0], src: memoryPhotos[1][1] })}><Photo label={memoryPhotos[1][0]} src={memoryPhotos[1][1]} caption={memoryPhotos[1][0]} /></button>
          <article><span>02 / TOKYO CULTURE</span><h3>{isJa ? "夏の物語を、東京で見る。" : "여름의 이야기를 도쿄에서 보다."}</h3><p>{isJa ? "『時をかける少女』の展示と神保町の古書店を歩き、映画や本が街の記憶として残る方法を見ました。" : "〈시간을 달리는 소녀〉 전시와 진보초의 고서점을 걸으며 영화와 책이 도시의 기억으로 남는 방식을 보았습니다."}</p></article>
          <button className="memoryCulture" onClick={() => setLightbox({ caption: memoryPhotos[7][0], src: memoryPhotos[7][1] })}><Photo label={memoryPhotos[7][0]} src={memoryPhotos[7][1]} caption={memoryPhotos[7][0]} /></button>
        </div>
      </section>

      <section className="summerFilms section colorBand"><div className="sectionHeading"><div><p className="eyebrow">SUMMER IN MOTION</p><h2>{isJa ? <>写真の間に残った、<br />東京の動き。</> : <>사진 사이에 남은,<br />도쿄의 움직임.</>}</h2></div><p>{isJa ? "音と動きまで残した3つの短い記録" : "소리와 움직임까지 남긴 세 개의 짧은 기록"}</p></div><div className="filmRail">
        {["01", "02", "03"].map((n, index) => <figure key={n}><video controls playsInline preload="metadata" poster={memoryPhotos[[2, 4, 6][index]][1]}><source src={`/videos/tokyo-summer-${n}.mp4`} type="video/mp4" /></video><figcaption><span>FILM / {n}</span><strong>{isJa ? ["横浜の夜", "東京の夏景色", "街で見つけた瞬間"][index] : ["요코하마의 밤", "도쿄의 여름 풍경", "거리에서 발견한 순간"][index]}</strong></figcaption></figure>)}
      </div></section>

      <section className="memories section"><div className="sectionHeading"><div><p className="eyebrow">SUMMER PHOTO DIARY</p><h2>TOKYO<br />MEMORIES.</h2></div><p>{isJa ? "写真を選ぶと大きく見ることができます。" : "사진을 선택하면 크게 볼 수 있습니다."}</p></div><div className="memoryMosaic">{memoryPhotos.slice(2).map(([caption, src], index) => <button className={`memoryTile memoryTile${index + 1}`} key={caption} onClick={() => setLightbox({ caption, src })} aria-label={`${caption} ${isJa ? "を拡大表示" : "크게 보기"}`}><Photo label={caption} src={src} caption={caption} /></button>)}</div><div className="memoryInvitation"><p>{isJa ? "インターンシップは、仕事だけを学ぶ時間ではありませんでした。知らない街で働き、迷い、言葉を交わし、仕事のあとに自分だけの東京を見つける8週間でした。次の夏、この景色の続きを歩くのは、あなたかもしれません。" : "인턴십은 일만 배우는 시간이 아니었습니다. 낯선 도시에서 일하고, 길을 헤매고, 사람들과 말하며, 퇴근 후에는 나만의 도쿄를 발견한 8주였습니다. 다음 여름, 이 풍경의 다음 장면을 걷는 사람은 여러분일지도 모릅니다."}</p><strong>{isJa ? "次の夏を、東京で。" : "다음 여름을, 도쿄에서."}</strong></div></section>

      </div>
      </div>

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
