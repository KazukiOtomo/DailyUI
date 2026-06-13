import React, { useState } from "react";
import {
  Play,
  Volume2,
  Settings,
  Heart,
  MessageSquare,
  ChevronRight,
  Search,
  User,
} from "lucide-react";

const App = () => {
  const [activeTab, setActiveTab] = useState("Home");

  const featured = {
    title: "ネオン・シティの夜明け",
    desc: "SF・アクション・120分",
    progress: 65,
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans">
      {}
      <nav className="flex items-center justify-between p-6 bg-gradient-to-b from-black/80 to-transparent fixed w-full z-10">
        <div className="text-2xl font-bold tracking-tighter text-blue-500">
          STREAM_TV
        </div>
        <div className="flex gap-6 text-sm font-medium">
          {["Home", "Movies", "Series", "Live"].map((item) => (
            <button
              key={item}
              className={`${activeTab === item ? "text-white" : "text-neutral-400"} hover:text-white transition`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex gap-4">
          <Search size={20} />
          <User size={20} />
        </div>
      </nav>

      {}
      <section className="relative h-[60vh] w-full flex items-end p-12 bg-neutral-800">
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
        <div className="relative z-0">
          <h1 className="text-5xl font-extrabold mb-2">{featured.title}</h1>
          <p className="text-neutral-400 mb-6">{featured.desc}</p>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition">
              <Play fill="white" size={20} /> 視聴する
            </button>
            <button className="bg-neutral-800 px-6 py-3 rounded-full hover:bg-neutral-700 transition">
              詳細
            </button>
          </div>
        </div>
      </section>

      {}
      <section className="px-12 py-8">
        <h2 className="text-xl font-bold mb-4">続きから見る</h2>
        <div className="bg-neutral-900 p-4 rounded-xl flex items-center gap-6">
          <div className="w-40 h-24 bg-neutral-700 rounded-md flex items-center justify-center">
            <Play size={32} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold">エピソード 4: 隠された真実</h3>
            <div className="w-full h-1 bg-neutral-700 rounded-full mt-3">
              <div
                className="h-1 bg-blue-500 rounded-full"
                style={{ width: `${featured.progress}%` }}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <Heart className="text-neutral-400 hover:text-red-500 cursor-pointer" />
            <MessageSquare className="text-neutral-400 hover:text-blue-500 cursor-pointer" />
            <Settings className="text-neutral-400 hover:text-white cursor-pointer" />
          </div>
        </div>
      </section>

      {}
      <section className="px-12 pb-12">
        {["人気ランキング", "最近追加された作品"].map((category) => (
          <div key={category} className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{category}</h2>
              <ChevronRight className="text-neutral-400 cursor-pointer" />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="min-w-[200px] h-32 bg-neutral-800 rounded-lg hover:ring-2 ring-blue-500 transition cursor-pointer"
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      {}
      <footer className="fixed bottom-0 w-full p-4 bg-neutral-900 border-t border-neutral-800 flex justify-between items-center">
        <div className="flex gap-4">
          <Volume2 size={20} />
          <span className="text-xs">音量調整</span>
        </div>
        <div className="flex gap-4">
          <button className="text-xs bg-neutral-800 px-3 py-1 rounded">
            字幕: 日本語
          </button>
          <button className="text-xs bg-neutral-800 px-3 py-1 rounded">
            言語: 英語
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
