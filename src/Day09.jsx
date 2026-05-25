import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Heart,
  ListMusic,
  ChevronDown,
  MoreHorizontal,
  Volume2,
  Speaker,
} from "lucide-react";

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35); // 0 to 100%
  const [isLiked, setIsLiked] = useState(false);
  const [currentTime, setCurrentTime] = useState("1:24");
  const totalTime = "3:45";

  // シミュレーション用のプログレスバー進行
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.5;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleLike = () => setIsLiked(!isLiked);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 sm:p-8 font-sans">
      {/* スマートフォンのモックアップコンテナ */}
      <div className="w-full max-w-[400px] h-[850px] bg-gradient-to-b from-slate-800 to-black rounded-[3rem] shadow-2xl border-[8px] border-gray-950 relative overflow-hidden flex flex-col">
        {/* ステータスバー（擬似） */}
        <div className="h-7 w-full flex justify-between items-center px-6 pt-2 text-xs text-white/70 font-medium z-10">
          <span>9:41</span>
          <div className="flex gap-1.5 items-center">
            <div className="w-4 h-3 bg-white/70 rounded-sm"></div>
            <div className="w-4 h-3 bg-white/70 rounded-sm"></div>
            <div className="w-6 h-3 bg-white/70 rounded-sm"></div>
          </div>
        </div>

        {/* トップナビゲーション */}
        <div className="flex justify-between items-center px-6 pt-6 pb-4">
          <button className="p-2 -ml-2 text-white/70 hover:text-white transition-colors">
            <ChevronDown size={28} strokeWidth={2} />
          </button>
          <div className="text-center flex flex-col">
            <span className="text-xs text-white/50 font-semibold tracking-widest uppercase mb-1">
              Now Playing
            </span>
            <span className="text-sm text-white font-medium">Daily Mix 1</span>
          </div>
          <button className="p-2 -mr-2 text-white/70 hover:text-white transition-colors">
            <MoreHorizontal size={24} strokeWidth={2} />
          </button>
        </div>

        {/* メインコンテンツ（スクロール可能だが基本は固定） */}
        <div className="flex-1 flex flex-col px-6 pb-8">
          {/* アルバムアート */}
          <div className="w-full aspect-square mt-2 mb-8 relative group">
            {/* 影の演出で立体感を出す（HCD: 触りたくなる質感） */}
            <div className="absolute inset-4 bg-purple-500 rounded-3xl blur-2xl opacity-40 group-hover:opacity-50 transition-opacity duration-500"></div>
            <img
              src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop"
              alt="Album Cover"
              className="w-full h-full object-cover rounded-3xl shadow-2xl relative z-10"
            />
          </div>

          {/* 曲情報といいねボタン */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-white mb-1 truncate max-w-[250px]">
                Midnight City Sounds
              </h1>
              <h2 className="text-lg text-white/60 truncate max-w-[250px]">
                The Electronic Artist
              </h2>
            </div>
            <button
              onClick={toggleLike}
              className={`p-3 rounded-full transition-all duration-300 ${isLiked ? "text-green-400 bg-green-400/10" : "text-white/70 hover:text-white"}`}
            >
              <Heart
                size={28}
                fill={isLiked ? "currentColor" : "none"}
                strokeWidth={1.5}
              />
            </button>
          </div>

          {/* プログレスバー（HCD: 視認性が高く、タップしやすい太さ） */}
          <div className="mb-6">
            <div className="h-2 bg-white/20 rounded-full w-full cursor-pointer relative group">
              <div
                className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-300 ease-linear"
                style={{ width: `${progress}%` }}
              >
                {/* ハンドル（ドラッグしやすさの視覚的ヒント） */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform"></div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-white/50 font-medium mt-2">
              <span>{currentTime}</span>
              <span>{totalTime}</span>
            </div>
          </div>

          {/* メインコントロール（HCD: 親指の可動域である画面下部に集中配置） */}
          <div className="flex justify-between items-center mb-8">
            <button className="text-white/50 hover:text-white transition-colors p-2">
              <Shuffle size={24} strokeWidth={2} />
            </button>

            <div className="flex items-center gap-6">
              <button className="text-white hover:text-white/80 transition-colors p-2">
                <SkipBack size={36} fill="currentColor" />
              </button>

              {/* 再生ボタン（Fitts's Law: 最も大きく、押しやすい配置） */}
              <button
                onClick={togglePlay}
                className="w-20 h-20 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg"
              >
                {isPlaying ? (
                  <Pause size={32} fill="currentColor" />
                ) : (
                  <Play size={32} fill="currentColor" className="ml-2" />
                )}
              </button>

              <button className="text-white hover:text-white/80 transition-colors p-2">
                <SkipForward size={36} fill="currentColor" />
              </button>
            </div>

            <button className="text-white/50 hover:text-white transition-colors p-2">
              <Repeat size={24} strokeWidth={2} />
            </button>
          </div>

          {/* フッターアクション（HCD: 補助的な機能） */}
          <div className="mt-auto flex justify-between items-center text-white/50 pb-2">
            <button className="hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
              <Speaker size={20} />
              <span>Living Room</span>
            </button>
            <button className="hover:text-white transition-colors p-2">
              <ListMusic size={24} />
            </button>
          </div>
        </div>

        {/* ホームインジケーター（iPhone風） */}
        <div className="w-full flex justify-center pb-2">
          <div className="w-1/3 h-1 bg-white/30 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default App;
