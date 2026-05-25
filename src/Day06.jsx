import React, { useState } from "react";
import {
  ArrowLeft,
  MoreHorizontal,
  MapPin,
  Link as LinkIcon,
  Mail,
  Briefcase,
  Star,
  Award,
  Grid,
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("portfolio");
  const [isFollowing, setIsFollowing] = useState(false);

  // モックデータ
  const user = {
    name: "佐藤 美咲",
    handle: "@misaki_design",
    role: "シニア UI/UX デザイナー & イラストレーター",
    location: "東京都, 日本",
    website: "misakidesign.jp",
    bio: "人間中心設計に基づいた、使いやすく美しいインターフェースの設計を得意としています。BtoB SaaSからコンシューマー向けアプリまで幅広く対応。",
    stats: {
      projects: 142,
      followers: "12.4k",
      following: 340,
    },
  };

  const portfolioItems = [
    { id: 1, title: "Fintech App UI", color: "bg-blue-100" },
    { id: 2, title: "E-commerce Redesign", color: "bg-pink-100" },
    { id: 3, title: "Healthcare Dashboard", color: "bg-emerald-100" },
    { id: 4, title: "Travel Booking Flow", color: "bg-orange-100" },
    { id: 5, title: "Social Media Concept", color: "bg-purple-100" },
    { id: 6, title: "Smart Home Control", color: "bg-teal-100" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
      {/* スマホ画面のシミュレーションコンテナ */}
      <div className="w-full max-w-[400px] h-[800px] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col relative border-[8px] border-gray-900">
        {/* ヘッダー / カバー画像 */}
        <div className="relative h-40 bg-gradient-to-r from-indigo-500 to-purple-600 shrink-0">
          <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center text-white z-10">
            <button className="p-2 bg-black/20 backdrop-blur-md rounded-full hover:bg-black/30 transition">
              <ArrowLeft size={20} />
            </button>
            <button className="p-2 bg-black/20 backdrop-blur-md rounded-full hover:bg-black/30 transition">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* スクロール可能なコンテンツエリア */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-8">
          {/* プロフィール基本情報 */}
          <div className="px-6 relative">
            {/* アバター */}
            <div className="absolute -top-16 left-6">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-md">
                <img
                  src={`https://api.dicebear.com/7.x/notionists/svg?seed=Misaki&backgroundColor=e2e8f0`}
                  alt="Profile Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* アバター右側のアクション（余白調整） */}
            <div className="flex justify-end pt-4 pb-2">
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-colors border-2 ${
                  isFollowing
                    ? "bg-gray-100 text-gray-800 border-gray-100"
                    : "bg-white text-indigo-600 border-indigo-600"
                }`}
              >
                {isFollowing ? "フォロー中" : "フォロー"}
              </button>
            </div>

            {/* 名前と役職 */}
            <div className="mt-2">
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-500 text-sm font-medium">{user.handle}</p>
              <p className="text-gray-800 mt-3 font-medium leading-snug">
                {user.role}
              </p>
            </div>

            {/* ロケーションとリンク */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin size={16} className="text-gray-400" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <LinkIcon size={16} className="text-gray-400" />
                <a
                  href="#"
                  className="text-indigo-600 font-medium hover:underline"
                >
                  {user.website}
                </a>
              </div>
            </div>

            {/* 統計情報 */}
            <div className="flex gap-6 mt-6 py-4 border-t border-b border-gray-100">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900">
                  {user.stats.projects}
                </span>
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                  プロジェクト
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900">
                  {user.stats.followers}
                </span>
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                  フォロワー
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900">
                  {user.stats.following}
                </span>
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                  フォロー中
                </span>
              </div>
            </div>

            {/* プライマリーアクションボタン */}
            <div className="flex gap-3 mt-6">
              <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-bold shadow-sm shadow-indigo-200 transition-colors flex justify-center items-center gap-2">
                <Mail size={18} />
                メッセージ
              </button>
              <button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-3.5 rounded-xl font-bold shadow-sm transition-colors flex justify-center items-center gap-2">
                <Briefcase size={18} />
                依頼する
              </button>
            </div>
          </div>

          {/* タブナビゲーション */}
          <div className="flex px-6 mt-8 border-b border-gray-200">
            {[
              { id: "portfolio", label: "ポートフォリオ", icon: Grid },
              { id: "about", label: "概要", icon: Star },
              { id: "experience", label: "経歴", icon: Award },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 pb-4 text-sm font-bold flex justify-center items-center gap-2 transition-colors relative ${
                  activeTab === tab.id
                    ? "text-indigo-600"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full" />
                )}
              </button>
            ))}
          </div>

          {/* タブコンテンツ */}
          <div className="p-6">
            {activeTab === "portfolio" && (
              <div className="grid grid-cols-2 gap-4">
                {portfolioItems.map((item) => (
                  <div key={item.id} className="group cursor-pointer">
                    <div
                      className={`aspect-square rounded-2xl ${item.color} mb-2 shadow-sm border border-gray-100 flex items-center justify-center p-4 transition-transform group-hover:scale-[1.02]`}
                    >
                      <span className="text-gray-600 font-medium text-center text-sm opacity-50">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-800 truncate px-1">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "about" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2">
                    自己紹介
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {user.bio}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2">
                    スキルセット
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "UI Design",
                      "UX Research",
                      "Figma",
                      "Prototyping",
                      "Design Systems",
                      "Illustration",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "experience" && (
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                {[
                  {
                    year: "2021 - 現在",
                    role: "シニアデザイナー",
                    company: "Tech Startup Inc.",
                  },
                  {
                    year: "2018 - 2021",
                    role: "UIデザイナー",
                    company: "Creative Agency Tokyo",
                  },
                ].map((job, idx) => (
                  <div
                    key={idx}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      <Briefcase size={16} className="text-indigo-600" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                      <div className="flex items-center justify-between space-x-2 mb-1">
                        <div className="font-bold text-slate-900 text-sm">
                          {job.role}
                        </div>
                        <time className="font-medium text-indigo-600 text-xs">
                          {job.year}
                        </time>
                      </div>
                      <div className="text-slate-500 text-xs">
                        {job.company}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
