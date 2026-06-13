import React from "react";
import { Link } from "react-router-dom";

const challenges = [
  { day: 1, title: "Sign Up", description: "ボランティア登録フォーム" },
  { day: 2, title: "Credit Card Checkout", description: "クレジットカード決済フォーム" },
  { day: 3, title: "Landing Page", description: "習慣化アプリのランディングページ" },
  { day: 4, title: "Calculator", description: "住宅ローンシミュレーター" },
  { day: 5, title: "App Icon", description: "スマートフォンアプリアイコン" },
  { day: 6, title: "User Profile", description: "デザイナーのポートフォリオプロフィール" },
  { day: 7, title: "Settings", description: "アプリ設定画面" },
  { day: 8, title: "404 Page", description: "404 Not Foundページ" },
  { day: 9, title: "Music Player", description: "音楽プレイヤー" },
  { day: 10, title: "Social Share", description: "記事シェア画面" },
  { day: 11, title: "Flash Message", description: "フラッシュメッセージ（スナックバー）" },
  { day: 12, title: "E-Commerce", description: "ナチュラルコスメECサイト" },
  { day: 13, title: "Direct Message", description: "ダイレクトメッセージUI" },
  { day: 14, title: "Countdown Timer", description: "カウントダウンタイマー" },
  { day: 15, title: "On/Off Switch", description: "機械制御パネルのスイッチUI" },
  { day: 16, title: "Overlay", description: "プレミアムコンテンツ購読オーバーレイ" },
  { day: 17, title: "Purchase Receipt", description: "コーヒーショップ購入レシート" },
  { day: 18, title: "Analytics Chart", description: "活動記録ダッシュボード" },
  { day: 19, title: "Leaderboard", description: "リーダーボード" },
  { day: 20, title: "Location Tracker", description: "友人位置共有マップ" },
  { day: 21, title: "Home Monitoring", description: "スマートホームダッシュボード" },
  { day: 22, title: "Search", description: "検索UI" },
  { day: 23, title: "Onboarding", description: "オンボーディング（3画面スライド）" },
  { day: 24, title: "Boarding Pass", description: "航空券搭乗券" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Daily UI</h1>
        <p className="text-gray-500 mb-8">100 days of UI challenges</p>
        <div className="grid gap-4">
          {challenges.map(({ day, title, description }) => (
            <Link
              key={day}
              to={`/${day}`}
              className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <span className="text-2xl font-bold text-emerald-500 w-12 shrink-0">
                #{String(day).padStart(2, "0")}
              </span>
              <div>
                <p className="font-semibold text-gray-900">{title}</p>
                <p className="text-sm text-gray-500">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
