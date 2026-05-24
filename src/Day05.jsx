import React, { useState } from "react";
import {
  Phone,
  Mail,
  MessageSquare,
  Camera,
  Settings,
  Compass,
  Map,
  Calendar,
  Clock,
  Cloud,
  Music,
  CloudSun,
  ChevronRight,
} from "lucide-react";

// --- カスタムアイコンコンポーネント (Lumina) ---
const LuminaIcon = ({ sizeClass = "w-16 h-16", shadowClass = "shadow-lg" }) => {
  return (
    <div
      className={`${sizeClass} ${shadowClass} rounded-[22.5%] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center relative overflow-hidden transition-transform duration-300 hover:scale-105 active:scale-95 group`}
    >
      {/* 内部の光の反射エフェクト */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent opacity-50 rounded-t-[22.5%]"></div>

      {/* コアとなるシンボル（閃き、集中を表すスパーク） */}
      <div className="relative flex items-center justify-center w-[60%] h-[60%]">
        <div className="absolute w-[20%] h-full bg-white rounded-full rotate-45 group-hover:rotate-90 transition-transform duration-500 shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>
        <div className="absolute w-full h-[20%] bg-white rounded-full rotate-45 group-hover:rotate-90 transition-transform duration-500 shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>
        {/* 中心点 */}
        <div className="absolute w-[35%] h-[35%] bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,1)]"></div>
      </div>
    </div>
  );
};

// --- モック用の汎用アプリアイコン ---
const GenericIcon = ({ IconElement, bgColor, name }) => (
  <div className="flex flex-col items-center gap-1.5 w-16">
    <div
      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-[22.5%] ${bgColor} flex items-center justify-center shadow-sm`}
    >
      <IconElement size={28} className="text-white" />
    </div>
    <span className="text-[10px] sm:text-xs text-slate-800 dark:text-slate-200 truncate w-full text-center font-medium drop-shadow-sm">
      {name}
    </span>
  </div>
);

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? "bg-slate-900 text-slate-100" : "bg-slate-50 text-slate-900"}`}
    >
      {/* ヘッダーナビゲーション */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500">
            Lumina Design System
          </h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="px-4 py-2 text-sm font-medium rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
          >
            {isDarkMode ? "ライトモードに変更" : "ダークモードに変更"}
          </button>
        </div>
      </header>

      <main className="pt-24 pb-20 max-w-5xl mx-auto px-6 space-y-24">
        {/* セクション1: アイコンの提示とブランドメッセージ */}
        <section className="flex flex-col md:flex-row items-center gap-12 pt-10">
          <div className="flex-1 space-y-6">
            <div className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase bg-indigo-100 dark:bg-indigo-900/50 rounded-full">
              App Icon Design
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              ブランドを体現する、
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">
                一筋の「閃き」
              </span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              集中とマインドフルネスのアプリ「Lumina」のアイコン。人間中心設計に基づき、ユーザーの認知的負荷を下げる極めてシンプルな幾何学図形を採用しました。ノイズの多い画面の中でも、一目で目的のアプリを見つけることができます。
            </p>
          </div>
          <div className="flex-1 flex justify-center items-center">
            {/* 巨大なアイコン展示 */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-[25%] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <LuminaIcon
                sizeClass="w-48 h-48 md:w-64 md:h-64"
                shadowClass="shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* セクション2: デザイン原則 (HCD) */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">
              人間中心設計に基づく3つの原則
            </h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              ユーザーがストレスなくアプリを起動できるよう、視覚的・心理的なアプローチからデザインを最適化しました。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* 原則1 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400 font-bold text-xl">
                1
              </div>
              <h4 className="text-lg font-bold mb-2">
                一瞬の認知 (Glanceability)
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                複雑なイラストを避け、中心から広がる「スパーク」のシルエットのみを使用。ユーザーがスマホをポケットから取り出した瞬間に、0.1秒でLuminaだと認識できる明瞭さを持たせています。
              </p>
            </div>
            {/* 原則2 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400 font-bold text-xl">
                2
              </div>
              <h4 className="text-lg font-bold mb-2">意味的メタファー</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                交差する光のモチーフは「集中（フォーカス）」と「頭の中の整理」を表しています。ブランドのコアバリューである「クリアな思考」を、言語に頼らずに視覚情報だけでユーザーに伝達します。
              </p>
            </div>
            {/* 原則3 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/50 rounded-xl flex items-center justify-center mb-4 text-pink-600 dark:text-pink-400 font-bold text-xl">
                3
              </div>
              <h4 className="text-lg font-bold mb-2">コントラストと際立ち</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                彩度の高いインディゴからピンクへのグラデーションは、一般的な青や緑が多い他社アプリの中で特異な存在感を放ちます。ホーム画面に置かれた際、自然と指が伸びるよう設計されています。
              </p>
            </div>
          </div>
        </section>

        {/* セクション3: ホーム画面での見え方検証 */}
        <section className="bg-slate-200 dark:bg-slate-800 rounded-3xl p-8 md:p-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

          <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <h3 className="text-3xl font-bold">
                ホーム画面での圧倒的な際立ち
              </h3>
              <p className="text-slate-700 dark:text-slate-300">
                「遠くからでも見栄えが良いか？他のアプリと並べた時に目立つか？」という問いに対する答えがここにあります。
              </p>
              <p className="text-slate-700 dark:text-slate-300">
                右のモックアップをご覧ください。単色の背景や複雑な線画のアイコンが並ぶ中、Luminaのアイコンは高コントラストなグラデーションと純白のシンボルにより、視覚的な階層の最上位に位置します。ユーザーが「集中したい」と思った時、迷わずタップできる配置的優位性を確保しています。
              </p>
            </div>

            {/* スマホモックアップ */}
            <div className="w-[300px] sm:w-[340px] h-[680px] bg-black rounded-[50px] p-2 shadow-2xl relative border-4 border-slate-700 dark:border-slate-600">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-20"></div>{" "}
              {/* Notch */}
              <div
                className="w-full h-full rounded-[40px] overflow-hidden bg-cover bg-center relative"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')",
                }}
              >
                {/* フィルターオーバーレイ */}
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>

                {/* ステータスバー */}
                <div className="h-12 w-full flex justify-between items-center px-6 text-white text-xs font-semibold z-10 relative">
                  <span>9:41</span>
                  <div className="flex gap-1.5">
                    <div className="w-4 h-3 bg-white rounded-sm"></div>
                    <div className="w-4 h-3 bg-white rounded-sm"></div>
                  </div>
                </div>

                {/* アイコングリッド */}
                <div className="p-6 grid grid-cols-4 gap-y-6 gap-x-4 relative z-10 mt-4">
                  <GenericIcon
                    IconElement={Mail}
                    bgColor="bg-blue-500"
                    name="メール"
                  />
                  <GenericIcon
                    IconElement={Calendar}
                    bgColor="bg-red-500"
                    name="カレンダー"
                  />
                  <GenericIcon
                    IconElement={Camera}
                    bgColor="bg-zinc-200 text-zinc-800"
                    name="写真"
                  />
                  <GenericIcon
                    IconElement={Cloud}
                    bgColor="bg-sky-400"
                    name="天気"
                  />

                  <GenericIcon
                    IconElement={Map}
                    bgColor="bg-green-500"
                    name="マップ"
                  />
                  <GenericIcon
                    IconElement={Clock}
                    bgColor="bg-black"
                    name="時計"
                  />
                  <GenericIcon
                    IconElement={CloudSun}
                    bgColor="bg-orange-400"
                    name="天気"
                  />
                  <GenericIcon
                    IconElement={Settings}
                    bgColor="bg-slate-500"
                    name="設定"
                  />

                  {/* ★ Lumina アイコン (際立つように配置) ★ */}
                  <div className="flex flex-col items-center gap-1.5 w-16 group cursor-pointer">
                    <LuminaIcon
                      sizeClass="w-14 h-14 sm:w-16 sm:h-16"
                      shadowClass="shadow-[0_8px_20px_rgba(236,72,153,0.4)]"
                    />
                    <span className="text-[10px] sm:text-xs text-white truncate w-full text-center font-bold drop-shadow-md">
                      Lumina
                    </span>
                  </div>

                  <GenericIcon
                    IconElement={Music}
                    bgColor="bg-rose-500"
                    name="音楽"
                  />
                  <GenericIcon
                    IconElement={Compass}
                    bgColor="bg-blue-600"
                    name="ブラウザ"
                  />
                  <GenericIcon
                    IconElement={Phone}
                    bgColor="bg-green-400"
                    name="電話"
                  />
                </div>

                {/* Dock */}
                <div className="absolute bottom-4 left-4 right-4 h-24 bg-white/30 backdrop-blur-xl rounded-3xl flex items-center justify-around px-2 z-10 border border-white/20">
                  <GenericIcon
                    IconElement={Phone}
                    bgColor="bg-green-500"
                    name=""
                  />
                  <GenericIcon
                    IconElement={MessageSquare}
                    bgColor="bg-green-400"
                    name=""
                  />
                  <GenericIcon
                    IconElement={Compass}
                    bgColor="bg-blue-500"
                    name=""
                  />
                  <GenericIcon
                    IconElement={Music}
                    bgColor="bg-rose-500"
                    name=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
