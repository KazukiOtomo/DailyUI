import React from "react";
import { Link } from "react-router-dom";

const challenges = [
  { day: 1, title: "Sign Up", description: "ボランティア登録フォーム" },
  { day: 2, title: "Credit Card Checkout", description: "クレジットカード決済フォーム" },
  { day: 3, title: "Landing Page", description: "習慣化アプリのランディングページ" },
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
