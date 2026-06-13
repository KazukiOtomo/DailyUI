import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  LockKeyhole,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function Day16() {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  const closeModal = () => setIsOpen(false);

  return (
    <div className="bg-gray-100 text-gray-800 antialiased min-h-screen flex flex-col relative font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 px-4 py-3 flex justify-between items-center shadow-sm">
        <div className="text-xl font-bold text-sky-600 tracking-tight">DesignDaily</div>
        <Menu className="w-6 h-6 text-gray-600" />
      </header>

      {/* Article content */}
      <main className="flex-1 overflow-y-auto p-4 pb-24">
        <div className="max-w-md mx-auto space-y-6">
          <span className="inline-block bg-sky-100 text-sky-600 text-xs font-semibold px-2 py-1 rounded">
            UI/UX Insight
          </span>
          <h1 className="text-2xl font-bold leading-tight">
            人間中心設計がもたらす、次世代モバイルUIの可能性
          </h1>
          <div className="flex items-center space-x-3 text-sm text-gray-500">
            <img
              src="https://placehold.co/40x40/0284c7/ffffff?text=A"
              alt="Author"
              className="w-8 h-8 rounded-full"
            />
            <span>By Alex Designer</span>
            <span>•</span>
            <span>10 min read</span>
          </div>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              モバイルデバイスの普及により、私たちはかつてないほど情報にアクセスしやすくなりました。しかし、その一方で情報の過負荷や複雑なインターフェースによるユーザーの疲弊も問題視されています。
            </p>
            <p>
              ここで重要になるのが「人間中心設計（Human-Centered Design）」のアプローチです。単に見た目が美しいだけでなく、ユーザーの認知負荷を下げ、直感的な操作を可能にするUIが求められています。
            </p>
            <p>
              本記事では、最新のデザイントレンドを分析し、明日から使える5つの実践的なUIパターンを解説します。例えば、指の可動域を考慮したボタン配置や、マイクロインタラクションによるフィードバックの重要性など...
            </p>
            <div className="relative h-48 mt-4 overflow-hidden">
              <p className="text-gray-700 opacity-50">
                さらに深く掘り下げると、ダークパターンの回避やアクセシビリティの確保も重要な要素となってきます。特に色覚多様性に配慮したカラーパレットの選定は、より多くのユーザーに情報を届けるための...
              </p>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-100/80 to-gray-100" />
            </div>
          </div>
        </div>
      </main>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center items-center">
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeModal}
          />

          {/* Modal */}
          <div
            className={`bg-white w-full max-w-sm rounded-t-2xl sm:rounded-2xl shadow-2xl relative flex flex-col overflow-hidden transition-all duration-300 z-10 ${
              visible
                ? "translate-y-0 sm:scale-100 opacity-100"
                : "translate-y-full sm:translate-y-4 sm:scale-95 opacity-0"
            }`}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors z-20 focus:outline-none focus:ring-2 focus:ring-sky-500"
              aria-label="閉じる"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header illustration */}
            <div className="bg-sky-50 pt-8 pb-4 px-6 flex justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-sky-100 rounded-full opacity-50 blur-xl" />
              <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 bg-blue-100 rounded-full opacity-50 blur-lg" />
              <div className="relative bg-white p-4 rounded-2xl shadow-sm border border-sky-100 -rotate-3 hover:rotate-0 transition-transform duration-300">
                <LockKeyhole className="w-10 h-10 text-sky-500" />
              </div>
            </div>

            {/* Content */}
            <div className="p-6 pt-5 space-y-5 text-center">
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-gray-900">
                  この記事の続きを読むには
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed">
                  ここから先はプレミアム会員限定コンテンツです。登録して、デザインの専門的な知見や限定ケーススタディにアクセスしましょう。
                </p>
              </div>

              <ul className="text-left space-y-3 text-sm text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-sky-500 mt-0.5 mr-2 shrink-0" />
                  <span>月間50本以上の専門記事が読み放題</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-sky-500 mt-0.5 mr-2 shrink-0" />
                  <span>会員限定のUIキット・テンプレートをダウンロード</span>
                </li>
              </ul>

              <div className="space-y-3 pt-2">
                <button className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3.5 px-4 rounded-xl shadow-sm transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 flex justify-center items-center group">
                  <span>プレミアム会員に登録する</span>
                  <ArrowRight className="w-4 h-4 ml-2 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </button>
                <p className="text-xs text-gray-500">
                  すでにアカウントをお持ちですか？{" "}
                  <a
                    href="#"
                    className="text-sky-600 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-sky-500 rounded px-1"
                  >
                    ログイン
                  </a>
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 border-t border-gray-100 p-4 text-center">
              <p className="text-xs text-gray-400 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 mr-1" />
                初月無料・いつでも解約可能です
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
