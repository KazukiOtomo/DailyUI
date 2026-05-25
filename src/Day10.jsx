import React, { useState, useEffect } from "react";
import {
  Share2,
  Heart,
  ChevronLeft,
  MoreHorizontal,
  Link2,
  MessageCircle,
  Twitter,
  Facebook,
  Mail,
  Check,
} from "lucide-react";

export default function App() {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // 共有する記事のモックデータ
  const article = {
    title: "秋の京都、静寂に包まれた隠れ家カフェ5選",
    snippet:
      "色づく紅葉とともに楽しむ、こだわりの抹茶と和菓子。日常の喧騒から離れて、心落ち着く特別な時間を過ごせる場所をご紹介します。週末の小旅行にぴったりな、まだあまり知られていない名店をピックアップしました。",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    url: "example.com/kyoto-cafe-autumn",
    date: "2023.10.15",
  };

  // リンクコピーの擬似的な処理
  const handleCopyLink = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
      setIsShareOpen(false); // コピー成功後にシートを閉じる
    }, 2000);
  };

  // ボトムシートが開いている時は背景のスクロールを防ぐ
  useEffect(() => {
    if (isShareOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isShareOpen]);

  return (
    // モバイルデバイスの画面を模したコンテナ
    <div className="bg-gray-200 min-h-screen flex justify-center items-center p-4 font-sans text-gray-800">
      <div className="w-full max-w-sm bg-white h-[800px] max-h-[90vh] rounded-[2.5rem] overflow-hidden shadow-2xl relative flex flex-col border-[8px] border-gray-900">
        {/* --- ヘッダー --- */}
        <header className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-md absolute top-0 w-full z-10">
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="戻る"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="メニュー"
          >
            <MoreHorizontal className="w-6 h-6 text-gray-700" />
          </button>
        </header>

        {/* --- 記事コンテンツ --- */}
        <main className="flex-1 overflow-y-auto pb-24">
          <img
            src={article.image}
            alt="京都の風景"
            className="w-full h-72 object-cover"
          />
          <div className="p-6">
            <p className="text-sm text-gray-500 mb-2">{article.date}</p>
            <h1 className="text-2xl font-bold leading-tight mb-4 text-gray-900">
              {article.title}
            </h1>
            <p className="text-base leading-relaxed text-gray-700 mb-6">
              {article.snippet}
            </p>
            <p className="text-base leading-relaxed text-gray-700">
              京都の路地裏を歩くと、ふと漂ってくるお茶の香り。今回は、そんな偶然の出会いを期待したくなるような、とっておきの場所を集めました。
              <br />
              <br />
              第一にご紹介するのは、築100年を超える京町家を改装した「茶寮・葉音」。縁側から眺める坪庭の紅葉は、まさに一幅の絵画のようです。ここでは、店主自らが点てるお抹茶と、季節の移ろいを表現した練り切りを楽しむことができます。
            </p>
          </div>
        </main>

        {/* --- ボトムアクションバー (常に親指が届く位置) --- */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 flex items-center justify-between gap-4 pb-8">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-4 rounded-full flex-shrink-0 transition-colors ${isLiked ? "bg-pink-50 text-pink-500" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            aria-label="いいね"
          >
            <Heart className={`w-6 h-6 ${isLiked ? "fill-current" : ""}`} />
          </button>

          {/* メインのシェアボタン：大きく、明確なラベル */}
          <button
            onClick={() => setIsShareOpen(true)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-full flex items-center justify-center gap-2 font-semibold text-lg transition-transform active:scale-95 shadow-md shadow-blue-200"
            aria-label="この記事をシェアする"
          >
            <Share2 className="w-5 h-5" />
            <span>シェアする</span>
          </button>
        </div>

        {/* --- シェア用ボトムシート (モーダル) --- */}
        {/* 背景のダークオーバーレイ */}
        <div
          className={`absolute inset-0 bg-black/60 z-40 transition-opacity duration-300 ${isShareOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          onClick={() => setIsShareOpen(false)}
          aria-hidden="true"
        />

        {/* シート本体 */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-[2rem] z-50 transition-transform duration-300 ease-out transform pb-8 ${isShareOpen ? "translate-y-0" : "translate-y-full"}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-title"
        >
          <div className="p-6">
            {/* ドラッグハンドルの視覚的ヒント */}
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6" />

            <h2
              id="share-title"
              className="text-xl font-bold text-center text-gray-900 mb-6"
            >
              共有する
            </h2>

            {/* HCDポイント：何をシェアするかを視覚的に確認できるプレビュー領域 */}
            <div className="flex items-center gap-4 p-3 mb-6 bg-gray-50 rounded-2xl border border-gray-100">
              <img
                src={article.image}
                alt=""
                className="w-16 h-16 object-cover rounded-xl shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-gray-900 truncate mb-1">
                  {article.title}
                </h3>
                <p className="text-xs text-gray-500 truncate flex items-center gap-1">
                  <Link2 className="w-3 h-3" />
                  {article.url}
                </p>
              </div>
            </div>

            {/* シェア先アイコンのグリッド：十分なタップ領域を確保 */}
            <div className="grid grid-cols-4 gap-y-6 gap-x-2 mb-2">
              <ShareButton
                icon={<MessageCircle className="w-7 h-7 text-green-500" />}
                label="LINE"
                bg="bg-green-50"
              />
              <ShareButton
                icon={<Twitter className="w-7 h-7 text-black" />}
                label="X"
                bg="bg-gray-100"
              />
              <ShareButton
                icon={<Facebook className="w-7 h-7 text-blue-600" />}
                label="Facebook"
                bg="bg-blue-50"
              />
              <ShareButton
                icon={<Mail className="w-7 h-7 text-gray-600" />}
                label="メール"
                bg="bg-gray-100"
              />
            </div>

            <div className="w-full h-px bg-gray-100 my-4" />

            {/* 汎用的なアクション */}
            <button
              onClick={handleCopyLink}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors active:scale-95"
            >
              <div className="flex items-center gap-3 text-gray-800 font-medium">
                <div className="bg-white p-2 rounded-full shadow-sm">
                  <Link2 className="w-5 h-5 text-gray-700" />
                </div>
                リンクをコピー
              </div>
              {isCopied && (
                <span className="text-sm text-green-600 font-bold">
                  コピーしました!
                </span>
              )}
            </button>
          </div>
        </div>

        {/* --- トースト通知 (コピー完了時など) --- */}
        <div
          className={`absolute top-20 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg transition-all duration-300 z-50 ${isCopied && !isShareOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}
        >
          <Check className="w-5 h-5 text-green-400" />
          <span className="font-medium text-sm">リンクをコピーしました</span>
        </div>
      </div>
    </div>
  );
}

// シェア先アイコンボタン用のサブコンポーネント
function ShareButton({ icon, label, bg }) {
  return (
    <button className="flex flex-col items-center gap-2 group active:scale-95 transition-transform">
      <div
        className={`w-14 h-14 ${bg} rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow`}
      >
        {icon}
      </div>
      <span className="text-xs font-medium text-gray-600">{label}</span>
    </button>
  );
}
