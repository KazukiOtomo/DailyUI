import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  BarChart3,
  Users,
  Star,
  ArrowRight,
  Menu,
  ChevronRight,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  // スクロール状態を検知し、追従CTAの表示を制御する
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // モバイル実機を想定したコンテナ（PCブラウザで見てもスマホサイズで表示）
    <div className="bg-gray-100 min-h-screen flex justify-center font-sans text-gray-800">
      <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl overflow-x-hidden pb-24">
        {/* ヘッダー: シンプルに保ち、コンテンツへの集中を妨げない */}
        <header className="flex justify-between items-center p-6 bg-white sticky top-0 z-10 bg-opacity-95 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
              H
            </div>
            <span className="font-bold text-xl tracking-tight">HabitSync</span>
          </div>
          <button
            className="p-2 -mr-2 text-gray-500 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg"
            aria-label="メニューを開く"
          >
            <Menu size={24} />
          </button>
        </header>

        <main>
          {/* ヒーローセクション: 瞬時に価値を伝え、行動を促す */}
          <section className="px-6 pt-8 pb-12">
            <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold mb-6">
              ✨ 新機能追加でさらに使いやすく
            </div>
            {/* 視覚的階層: 最も大きな見出し */}
            <h1 className="text-4xl font-extrabold leading-tight mb-4 text-gray-900">
              「なりたい自分」を、
              <br />
              毎日の習慣から。
            </h1>
            <p className="text-gray-600 text-base mb-8 leading-relaxed">
              科学に基づいたアプローチで、1日3分から始める無理のない自己実現。10万人が選んだ習慣化サポートアプリです。
            </p>

            {/* プライマリCTA: 大きく、目立つ色で、タップしやすい */}
            <button className="w-full bg-emerald-500 text-white font-bold text-lg py-4 px-6 rounded-2xl shadow-lg shadow-emerald-500/30 active:scale-95 transition-transform flex items-center justify-center gap-2 mb-4">
              無料でダウンロード
              <ArrowRight size={20} />
            </button>
            <p className="text-center text-sm text-gray-500">
              iOS & Android対応 ・ クレジットカード不要
            </p>

            {/* イメージ画像（プレースホルダー） */}
            <div className="mt-10 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-teal-50 rounded-3xl transform rotate-3 scale-105 -z-10"></div>
              <div className="bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden relative">
                <div className="h-64 bg-gray-50 flex flex-col items-center justify-center text-gray-400 p-6">
                  <Smartphone size={48} className="mb-4 text-emerald-400" />
                  <p className="text-sm font-medium text-center">
                    アプリの直感的なUI画面が
                    <br />
                    ここに入ります
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ソーシャルプルーフ（安心感の提供） */}
          <section className="bg-gray-50 py-10 px-6 border-y border-gray-100">
            <div className="flex items-center justify-center gap-1 mb-2 text-amber-400">
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
            </div>
            <p className="text-center font-bold text-gray-800 text-lg">
              App Store 評価 4.8
            </p>
            <p className="text-center text-gray-500 text-sm mt-1">
              「たった1ヶ月で、朝のランニングが当たり前になりました！」- Y.Kさん
            </p>
          </section>

          {/* 機能セクション: スキャナビリティ（拾い読みしやすさ）を重視 */}
          <section className="py-12 px-6">
            <h2 className="text-2xl font-bold mb-8 text-center text-gray-900">
              なぜHabitSyncが選ばれるのか
            </h2>
            <div className="space-y-6">
              <FeatureCard
                icon={<CheckCircle2 size={24} className="text-emerald-500" />}
                title="1タップで簡単記録"
                description="面倒な入力は不要。達成したら1タップするだけで、毎日の記録が残ります。"
              />
              <FeatureCard
                icon={<BarChart3 size={24} className="text-indigo-500" />}
                title="モチベーションが続く分析"
                description="グラフで成果が可視化されるから、達成感を感じやすく、継続の力になります。"
              />
              <FeatureCard
                icon={<Users size={24} className="text-orange-500" />}
                title="仲間と励まし合う"
                description="同じ目標を持つ仲間と繋がるコミュニティ機能で、挫折を防ぎます。"
              />
            </div>
          </section>

          {/* セカンダリCTA/FAQなどへの誘導 */}
          <section className="py-12 px-6 bg-emerald-900 text-white rounded-t-3xl mt-4">
            <h2 className="text-2xl font-bold mb-4">
              さあ、新しい習慣を始めましょう
            </h2>
            <p className="text-emerald-100 mb-8 leading-relaxed">
              最初の7日間はすべてのプレミアム機能を無料でお試しいただけます。
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-emerald-50">
                <ShieldCheck size={20} className="text-emerald-400" />
                いつでも解約可能
              </li>
              <li className="flex items-center gap-2 text-emerald-50">
                <ShieldCheck size={20} className="text-emerald-400" />
                広告なしで快適
              </li>
            </ul>
            <button className="w-full bg-white text-emerald-900 font-bold text-lg py-4 px-6 rounded-2xl active:scale-95 transition-transform flex items-center justify-center gap-2">
              今すぐ無料トライアル
            </button>
          </section>
        </main>

        {/* フローティング（追従）CTA: 人間中心設計の要
          スクロールしても常に親指の届く位置（Bottom）にアクションボタンを配置。
          画面下部からの一定スクロール後に表示されるようにしている。
        */}
        <div
          className={`fixed bottom-0 left-0 right-0 w-full flex justify-center p-4 z-50 transition-transform duration-300 ease-in-out ${
            isScrolled ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="w-full max-w-md bg-white p-3 rounded-3xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center justify-between">
            <div className="pl-3 hidden sm:block">
              <p className="font-bold text-sm text-gray-800">HabitSync</p>
              <p className="text-xs text-gray-500">無料ではじめる</p>
            </div>
            <button className="w-full sm:w-auto flex-1 sm:flex-none bg-emerald-500 text-white font-bold py-3 px-6 rounded-xl active:scale-95 transition-transform shadow-md flex items-center justify-center">
              アプリを入手する
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 情報をチャンク（塊）に分けて認識しやすくするためのコンポーネント
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex gap-4 items-start active:bg-gray-50 transition-colors cursor-pointer group">
      <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-1">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
