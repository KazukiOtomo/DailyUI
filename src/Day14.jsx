import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Plus,
  Coffee,
  Flame,
  Utensils,
  BellRing,
} from "lucide-react";

export default function App() {
  const [time, setTime] = useState(0); // Remaining time in seconds
  const [initialTime, setInitialTime] = useState(0); // To calculate progress
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // タイマーのカウントダウン処理
  useEffect(() => {
    let interval = null;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isRunning && time === 0) {
      setIsRunning(false);
      setIsFinished(true);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  // 時間フォーマット (MM:SS)
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // プログレスリングの計算
  const radius = 130;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    initialTime > 0
      ? circumference - (time / initialTime) * circumference
      : circumference;

  // コントロール関数
  const toggleTimer = () => {
    if (time > 0) {
      setIsRunning(!isRunning);
      setIsFinished(false);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
    setInitialTime(0);
    setIsFinished(false);
  };

  const addTime = (seconds) => {
    setIsFinished(false);
    const newTime = time + seconds;
    setTime(newTime);
    // タイマーが止まっている、または初期値が更新されるべき時は初期値も更新
    if (!isRunning || time === 0) {
      setInitialTime(newTime);
    } else {
      setInitialTime(initialTime + seconds);
    }
  };

  const setPreset = (minutes) => {
    setIsFinished(false);
    const seconds = minutes * 60;
    setTime(seconds);
    setInitialTime(seconds);
    setIsRunning(true);
  };

  const stopAlarm = () => {
    setIsFinished(false);
    resetTimer();
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-slate-900 text-slate-100 font-sans mx-auto max-w-md w-full shadow-2xl relative overflow-hidden">
      {/* 完了時のアラームオーバーレイ */}
      {isFinished && (
        <div className="absolute inset-0 bg-orange-600 z-50 flex flex-col items-center justify-center animate-pulse">
          <BellRing size={80} className="text-white mb-6 animate-bounce" />
          <h2 className="text-5xl font-bold text-white mb-2">時間です！</h2>
          <p className="text-orange-200 text-xl mb-12">
            タイマーが終了しました
          </p>
          <button
            onClick={stopAlarm}
            className="bg-white text-orange-600 px-12 py-5 rounded-full font-bold text-2xl shadow-lg active:scale-95 transition-transform"
          >
            ストップ
          </button>
        </div>
      )}

      {/* ヘッダー */}
      <header className="w-full p-6 text-center">
        <h1 className="text-xl font-medium tracking-wider text-slate-400">
          キッチンタイマー
        </h1>
      </header>

      {/* メインタイマー表示（円形プログレス） */}
      <div className="relative flex items-center justify-center flex-1 w-full my-4">
        <svg className="transform -rotate-90 w-[300px] h-[300px] sm:w-[320px] sm:h-[320px]">
          {/* バックグラウンドリング */}
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-slate-800"
          />
          {/* プログレスリング */}
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`${isRunning ? "text-orange-500" : "text-slate-500"} transition-all duration-1000 ease-linear`}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span
            className={`text-7xl sm:text-8xl font-light tabular-nums tracking-tight ${isRunning ? "text-white" : "text-slate-300"}`}
          >
            {formatTime(time)}
          </span>
          {initialTime > 0 && !isRunning && time > 0 && (
            <span className="text-slate-400 text-sm mt-2 flex items-center">
              <Pause size={14} className="mr-1" /> 一時停止中
            </span>
          )}
        </div>
      </div>

      {/* クイック追加ボタン (手が離せない時用の大きめのボタン) */}
      <div className="w-full px-6 mb-6">
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => addTime(10)}
            className="flex-1 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 py-3 rounded-2xl text-slate-300 font-medium text-lg transition-colors flex items-center justify-center"
          >
            +10秒
          </button>
          <button
            onClick={() => addTime(60)}
            className="flex-1 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 py-3 rounded-2xl text-slate-300 font-medium text-lg transition-colors flex items-center justify-center"
          >
            +1分
          </button>
          <button
            onClick={() => addTime(300)}
            className="flex-1 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 py-3 rounded-2xl text-slate-300 font-medium text-lg transition-colors flex items-center justify-center"
          >
            +5分
          </button>
        </div>
      </div>

      {/* 料理用プリセット (コンテキストに合わせた機能) */}
      <div className="w-full px-6 mb-8">
        <h3 className="text-slate-500 text-xs font-bold mb-3 uppercase tracking-wider px-1">
          おすすめのプリセット
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => setPreset(3)}
            className="flex flex-col items-center justify-center bg-slate-800/50 p-4 rounded-3xl border border-slate-700/50 active:bg-slate-700 transition-colors"
          >
            <Coffee size={24} className="text-amber-400 mb-2" />
            <span className="text-sm font-medium">カップ麺</span>
            <span className="text-xs text-slate-500">3分</span>
          </button>
          <button
            onClick={() => setPreset(7)}
            className="flex flex-col items-center justify-center bg-slate-800/50 p-4 rounded-3xl border border-slate-700/50 active:bg-slate-700 transition-colors"
          >
            <Flame size={24} className="text-orange-400 mb-2" />
            <span className="text-sm font-medium">ゆで卵</span>
            <span className="text-xs text-slate-500">7分</span>
          </button>
          <button
            onClick={() => setPreset(10)}
            className="flex flex-col items-center justify-center bg-slate-800/50 p-4 rounded-3xl border border-slate-700/50 active:bg-slate-700 transition-colors"
          >
            <Utensils size={24} className="text-yellow-400 mb-2" />
            <span className="text-sm font-medium">パスタ</span>
            <span className="text-xs text-slate-500">10分</span>
          </button>
        </div>
      </div>

      {/* メインコントロール */}
      <div className="w-full px-8 pb-10 flex items-center justify-between">
        <button
          onClick={resetTimer}
          disabled={time === 0 && !isRunning}
          className={`p-4 rounded-full flex items-center justify-center transition-all ${time === 0 && !isRunning ? "text-slate-700 bg-slate-800/30 cursor-not-allowed" : "text-slate-300 bg-slate-800 active:scale-90 hover:bg-slate-700"}`}
          aria-label="リセット"
        >
          <RotateCcw size={28} />
        </button>

        <button
          onClick={toggleTimer}
          className={`w-24 h-24 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
            time === 0
              ? "bg-slate-800 text-slate-500 cursor-not-allowed"
              : isRunning
                ? "bg-orange-500/20 text-orange-500 border-2 border-orange-500"
                : "bg-orange-500 text-white hover:bg-orange-600"
          }`}
          disabled={time === 0}
          aria-label={isRunning ? "一時停止" : "スタート"}
        >
          {isRunning ? (
            <Pause size={40} fill="currentColor" />
          ) : (
            <Play size={40} fill="currentColor" className="ml-2" />
          )}
        </button>
      </div>
    </div>
  );
}
