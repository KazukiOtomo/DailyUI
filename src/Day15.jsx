import React, { useState, useRef, useEffect } from "react";
import {
  Battery,
  Thermometer,
  Power,
  CarFront,
  ShieldCheck,
  Info,
} from "lucide-react";

export default function App() {
  const [isOn, setIsOn] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPressing, setIsPressing] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const timerRef = useRef(null);

  // 長押しの設定
  const HOLD_TIME = 1500; // 起動/停止に必要な時間（ミリ秒）
  const INTERVAL = 16; // 描画の更新間隔（約60fps）

  // リングのアニメーション計算用
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference - (progress / 100) * circumference;

  const handlePressStart = (e) => {
    setIsPressing(true);
    setShowTooltip(false);

    let currentProgress = 0;
    const increment = 100 / (HOLD_TIME / INTERVAL);

    timerRef.current = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(timerRef.current);

        // 状態を反転
        setIsOn((prev) => !prev);
        setIsPressing(false);
        setProgress(0);

        // 触覚フィードバック（対応デバイスのみ）
        if (typeof navigator !== "undefined" && navigator.vibrate) {
          navigator.vibrate([100, 50, 100]);
        }
      }
      setProgress(currentProgress);
    }, INTERVAL);
  };

  const handlePressEnd = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsPressing(false);

    // 途中まで押して離した場合
    if (progress > 0 && progress < 100) {
      // わずかな時間のタップは誤操作とみなし、ヒントを表示
      if (progress < 15) {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 2500);
      }
      setProgress(0);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950 font-sans text-slate-200 p-4">
      {/* スマートフォンの枠を模したコンテナ */}
      <div className="relative w-full max-w-sm h-[800px] bg-slate-900 overflow-hidden rounded-[3rem] shadow-2xl shadow-cyan-900/10 border-8 border-slate-800 flex flex-col items-center">
        {/* ヘッダー情報（視認性） */}
        <div className="w-full flex justify-between items-center p-8 mt-4">
          <div className="flex flex-col">
            <span className="text-slate-400 text-xs font-medium uppercase tracking-widest">
              My Vehicle
            </span>
            <span className="text-xl font-semibold tracking-wide mt-1">
              NEXUS X
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-slate-300 font-medium">
              <Battery
                size={18}
                className={isOn ? "text-cyan-400" : "text-slate-400"}
              />{" "}
              84%
            </div>
            <div className="flex items-center gap-1 text-slate-300 font-medium">
              <Thermometer
                size={18}
                className={isOn ? "text-cyan-400" : "text-slate-400"}
              />{" "}
              22°
            </div>
          </div>
        </div>

        {/* 状態ステータス表示（状態の可視化） */}
        <div className="flex items-center justify-center gap-2 mt-4 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50">
          <ShieldCheck
            size={16}
            className={isOn ? "text-cyan-400" : "text-slate-400"}
          />
          <span className="text-sm font-medium">
            {isOn ? "システム・オンライン" : "セキュアロック状態"}
          </span>
        </div>

        {/* メインビジュアル（フィードバック） */}
        <div className="flex-1 flex flex-col justify-center items-center w-full relative">
          <div className="relative">
            <CarFront
              size={180}
              className={`transition-all duration-700 ease-in-out ${
                isOn
                  ? "text-cyan-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.4)]"
                  : "text-slate-700"
              }`}
              strokeWidth={1}
            />

            {/* ヘッドライトの光の表現 */}
            <div
              className={`absolute top-[45%] left-1/2 -translate-x-1/2 w-[120px] flex justify-between transition-opacity duration-700 ${isOn ? "opacity-100" : "opacity-0"}`}
            >
              <div className="w-6 h-6 bg-cyan-100 rounded-full blur-[10px]" />
              <div className="w-6 h-6 bg-cyan-100 rounded-full blur-[10px]" />
            </div>
          </div>

          <div className="text-center mt-8 space-y-1">
            <h2
              className={`text-4xl font-light tracking-widest transition-colors duration-500 ${isOn ? "text-cyan-400" : "text-slate-500"}`}
            >
              {isOn ? "READY" : "OFF"}
            </h2>
            <p className="text-slate-400 text-sm">
              {isOn ? "走行準備が完了しています" : "エンジンは停止しています"}
            </p>
          </div>
        </div>

        {/* アクションエリア（エラー防止とインタラクション） */}
        <div className="w-full flex justify-center pb-20 relative">
          {/* 操作ヒントのツールチップ */}
          <div
            className={`absolute -top-12 flex items-center gap-2 bg-slate-800 border border-slate-700 text-slate-200 text-sm px-4 py-2 rounded-full shadow-lg transition-all duration-300 ${showTooltip ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}
          >
            <Info size={16} className="text-cyan-400" />
            長押しして操作してください
          </div>

          <div className="relative flex items-center justify-center">
            {/* プログレスリング */}
            <svg
              width="140"
              height="140"
              className="absolute -rotate-90 pointer-events-none"
            >
              <circle
                cx="70"
                cy="70"
                r={radius}
                fill="transparent"
                stroke={isOn ? "#164e63" : "#1e293b"} // 背景リング
                strokeWidth="4"
              />
              <circle
                cx="70"
                cy="70"
                r={radius}
                fill="transparent"
                stroke={isOn ? "#f43f5e" : "#22d3ee"} // 進行リング (ON時は赤、OFF時は青)
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashoffset}
                style={{
                  transition: isPressing
                    ? "none"
                    : "stroke-dashoffset 0.3s ease-out",
                }}
              />
            </svg>

            {/* メインボタン */}
            <button
              onMouseDown={handlePressStart}
              onMouseUp={handlePressEnd}
              onMouseLeave={handlePressEnd}
              onTouchStart={handlePressStart}
              onTouchEnd={handlePressEnd}
              className={`
                w-28 h-28 rounded-full flex flex-col items-center justify-center gap-1 z-10 
                transition-all duration-200 touch-none select-none outline-none
                ${isPressing ? "scale-95 bg-slate-800" : "scale-100 bg-slate-800"}
                ${isOn ? "shadow-[0_0_30px_rgba(34,211,238,0.15)] border-cyan-900/50" : "shadow-lg border-slate-700/50"}
                border-2
              `}
            >
              <Power
                size={36}
                className={`transition-all duration-300 ${isOn ? "text-cyan-400" : "text-slate-400"} ${isPressing ? "scale-90" : "scale-100"}`}
              />
              <span
                className={`text-xs font-bold tracking-widest transition-colors duration-300 ${isOn ? "text-cyan-400" : "text-slate-400"}`}
              >
                {isOn ? "STOP" : "START"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
