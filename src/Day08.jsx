import React, { useState, useEffect } from "react";
import {
  Search,
  Home,
  ArrowLeft,
  Compass,
  ShoppingBag,
  MessageCircle,
  Info,
} from "lucide-react";

export default function NotFoundPage() {
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // 検索アクションのモック
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setSearchValue("");
      // 実際にはここで検索結果ページへ遷移します
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans text-slate-800">
      {/* モバイルデバイスのモックフレーム */}
      <div className="w-full max-w-md bg-white h-[850px] max-h-[100vh] rounded-[3rem] shadow-2xl overflow-hidden relative flex flex-col border-[8px] border-slate-800">
        {/* ステータスバーのモック */}
        <div className="h-7 w-full flex justify-between items-center px-6 pt-2 text-[10px] font-medium text-slate-400 absolute top-0 z-10">
          <span>9:41</span>
          <div className="flex gap-1.5 items-center">
            <div className="w-3 h-3 rounded-full border border-slate-400"></div>
            <div className="w-3 h-3 rounded-full border border-slate-400"></div>
            <div className="w-4 h-2.5 rounded-sm border border-slate-400"></div>
          </div>
        </div>

        {/* ヘッダー */}
        <header className="px-6 pt-12 pb-4 flex items-center justify-between bg-white z-10">
          <button className="p-2 -ml-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-50">
            <ArrowLeft size={24} />
          </button>
          <div className="font-bold text-xl tracking-tight text-indigo-600 flex items-center gap-2">
            <Compass className="text-indigo-600" size={24} />
            LUMI
          </div>
          <div className="w-10"></div> {/* バランス用のスペーサー */}
        </header>

        {/* メインコンテンツ - スクロール可能 */}
        <main className="flex-1 overflow-y-auto px-6 pb-8 custom-scrollbar">
          {/* ビジュアルエリア（アニメーション付きSVG） */}
          <div className="relative w-full h-48 mt-4 mb-6 flex justify-center items-center">
            {/* 背景の装飾 */}
            <div className="absolute inset-0 bg-indigo-50 rounded-3xl overflow-hidden">
              <div className="absolute top-4 left-4 w-24 h-24 bg-white rounded-full opacity-50 mix-blend-overlay blur-xl"></div>
              <div className="absolute bottom-4 right-4 w-32 h-32 bg-purple-100 rounded-full opacity-50 mix-blend-overlay blur-xl"></div>
            </div>

            {/* 浮かぶ気球のアニメーション */}
            <div className="relative z-10 animate-[bounce_4s_ease-in-out_infinite]">
              <svg
                width="120"
                height="120"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-indigo-500 drop-shadow-md"
              >
                <path
                  d="M12 2c-3.31 0-6 2.69-6 6 0 4.5 6 11 6 11s6-6.5 6-11c0-3.31-2.69-6-6-6z"
                  fill="#E0E7FF"
                  stroke="#4F46E5"
                  strokeWidth="1.5"
                />
                <circle cx="12" cy="8" r="2" fill="#4F46E5" />
                <path
                  d="M9 19h6v3a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-3z"
                  fill="#4F46E5"
                />
                {/* 雲の装飾 */}
                <path
                  d="M4 12a2 2 0 0 1 2-2h.5a3.5 3.5 0 0 1 6.8 0H14a2 2 0 0 1 0 4H6a2 2 0 0 1-2-2z"
                  fill="#ffffff"
                  stroke="#CBD5E1"
                  strokeWidth="0.5"
                  className="animate-[pulse_3s_ease-in-out_infinite]"
                  transform="translate(-8, 4) scale(0.6)"
                />
                <path
                  d="M4 12a2 2 0 0 1 2-2h.5a3.5 3.5 0 0 1 6.8 0H14a2 2 0 0 1 0 4H6a2 2 0 0 1-2-2z"
                  fill="#ffffff"
                  stroke="#CBD5E1"
                  strokeWidth="0.5"
                  className="animate-[pulse_4s_ease-in-out_infinite_0.5s]"
                  transform="translate(10, 0) scale(0.5)"
                />
              </svg>
            </div>

            {/* 404の背景文字 */}
            <div className="absolute font-black text-8xl text-indigo-500/10 tracking-tighter select-none z-0">
              404
            </div>
          </div>

          {/* メッセージエリア */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-800 mb-2">
              おっと！道に迷いましたか？
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              お探しのページは移動したか、削除された可能性があります。
              <br />
              ご不便をおかけして申し訳ありません。
            </p>
          </div>

          {/* 検索バー（HCD: 回復策の提示） */}
          <form onSubmit={handleSearch} className="mb-8 relative">
            <div className="relative flex items-center">
              <Search className="absolute left-4 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="何をお探しですか？"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-sm"
              />
              {searchValue && (
                <button
                  type="submit"
                  disabled={isSearching}
                  className="absolute right-2 bg-indigo-600 text-white text-xs font-medium py-2 px-4 rounded-xl hover:bg-indigo-700 transition-colors"
                >
                  {isSearching ? "検索中..." : "検索"}
                </button>
              )}
            </div>
          </form>

          {/* プライマリアクション */}
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 mb-8 shadow-lg shadow-indigo-600/20">
            <Home size={20} />
            ホーム画面に戻る
          </button>

          {/* セカンダリアクション：よく見られているページ */}
          <div>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">
              おすすめのリンク
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <LinkCard icon={<ShoppingBag size={18} />} title="新作アイテム" />
              <LinkCard icon={<Compass size={18} />} title="ガイドを見る" />
              <LinkCard icon={<Info size={18} />} title="よくある質問" />
              <LinkCard
                icon={<MessageCircle size={18} />}
                title="お問い合わせ"
              />
            </div>
          </div>
        </main>

        {/* モック用のホームインジケーター */}
        <div className="h-1 bg-slate-800 w-1/3 mx-auto rounded-full mb-2 mt-1 absolute bottom-2 left-1/2 -translate-x-1/2"></div>
      </div>

      {/* Tailwindの設定用のインラインスタイル（デモ環境用） */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
      `,
        }}
      />
    </div>
  );
}

// サブリンク用のコンポーネント
function LinkCard({ icon, title }) {
  return (
    <button className="flex flex-col items-start p-4 bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/50 active:bg-indigo-50 rounded-2xl transition-all text-left group">
      <div className="text-indigo-500 bg-white p-2 rounded-xl shadow-sm mb-3 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-700 transition-colors">
        {title}
      </span>
    </button>
  );
}
