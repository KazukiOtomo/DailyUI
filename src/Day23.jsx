import React, { useState, useRef } from "react";
import { ArrowRight, Check, Loader2, Wifi, Battery, Signal } from "lucide-react";

const screens = [
  {
    title: "目標を現実に",
    desc: "小さな習慣の積み重ねが、大きな変化を生み出します。まずは目標を設定しましょう。",
    svg: (
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#e0e7ff", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#c7d2fe", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <circle cx="200" cy="150" r="120" fill="url(#grad1)" />
        <path d="M160,180 L190,210 L250,130" stroke="#4f46e5" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="120" cy="100" r="15" fill="#818cf8" />
        <circle cx="280" cy="80" r="10" fill="#f472b6" />
        <circle cx="270" cy="230" r="20" fill="#34d399" />
      </svg>
    ),
  },
  {
    title: "ワンタップで記録",
    desc: "煩わしい入力は不要です。達成したタスクをワンタップするだけで、毎日の記録が完了します。",
    svg: (
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <rect x="120" y="60" width="160" height="200" rx="20" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="4" />
        <line x1="150" y1="100" x2="250" y2="100" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />
        <line x1="150" y1="130" x2="200" y2="130" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
        <circle cx="150" cy="180" r="12" fill="#4f46e5" />
        <line x1="170" y1="180" x2="250" y2="180" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />
        <circle cx="150" cy="220" r="12" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
        <line x1="170" y1="220" x2="230" y2="220" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
        <path d="M146,180 L149,183 L154,177" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    title: "成長を実感",
    desc: "分かりやすいグラフで進捗を視覚化。自分の頑張りがひと目でわかり、モチベーションが続きます。",
    svg: (
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <line x1="80" y1="240" x2="320" y2="240" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
        <line x1="80" y1="240" x2="80" y2="60" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
        <rect x="110" y="160" width="40" height="80" rx="4" fill="#818cf8" />
        <rect x="170" y="120" width="40" height="120" rx="4" fill="#6366f1" />
        <rect x="230" y="60" width="40" height="180" rx="4" fill="#4f46e5" />
        <path d="M130,140 L190,100 L250,40" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="130" cy="140" r="6" fill="#f59e0b" />
        <circle cx="190" cy="100" r="6" fill="#f59e0b" />
        <circle cx="250" cy="40" r="6" fill="#f59e0b" />
      </svg>
    ),
  },
];

export default function Day23() {
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const touchStartX = useRef(0);

  const goTo = (i) => {
    if (i >= 0 && i < screens.length) setCurrent(i);
  };

  const handleNext = () => {
    if (current < screens.length - 1) {
      goTo(current + 1);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setCurrent(0);
      }, 1000);
    }
  };

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].screenX; };
  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].screenX;
    if (diff > 50) goTo(current + 1);
    if (diff < -50) goTo(current - 1);
  };

  const isLast = current === screens.length - 1;

  return (
    <div className="h-screen w-full overflow-hidden flex justify-center items-center bg-gray-100">
      <div className="relative w-full h-full sm:w-[375px] sm:h-[812px] bg-white sm:rounded-[40px] sm:shadow-2xl sm:border-[8px] border-gray-900 overflow-hidden flex flex-col">

        {/* Mock status bar */}
        <div className="h-12 w-full flex justify-between items-center px-6 pt-2 z-50 text-xs font-semibold text-gray-800 absolute top-0 left-0">
          <span>9:41</span>
          <div className="flex space-x-2 items-center">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Sliding screen container */}
        <div
          className="relative w-full flex-1 overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex h-full transition-transform duration-[400ms]"
            style={{ transform: `translateX(-${current * 100}%)`, transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)" }}
          >
            {screens.map((s, i) => (
              <div key={i} className="min-w-full h-full flex flex-col items-center justify-center pt-16 pb-4 px-6 space-y-8">
                <div className="w-full max-w-xs">{s.svg}</div>
                <div className="text-center space-y-4">
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{s.title}</h1>
                  <p className="text-base text-gray-500 leading-relaxed px-4">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom controls */}
        <div className="px-6 pb-12 pt-4 bg-white z-10 w-full flex flex-col space-y-6">
          {/* Dot indicators */}
          <div className="flex justify-center space-x-2">
            {screens.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-indigo-600" : "w-2 bg-gray-300"}`}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => goTo(screens.length - 1)}
              className="text-gray-500 font-medium py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors"
              style={{ opacity: isLast ? 0 : 1, pointerEvents: isLast ? "none" : "auto" }}
            >
              スキップ
            </button>
            <button
              onClick={handleNext}
              disabled={loading}
              className="text-white font-semibold py-4 px-8 rounded-2xl flex items-center space-x-2 focus:outline-none transition active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                boxShadow: "0 4px 14px 0 rgba(79,70,229,0.39)",
              }}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>{isLast ? "はじめる" : "次へ"}</span>
                  {isLast ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
