import React, { useState } from "react";
import {
  Trophy,
  Medal,
  ChevronUp,
  ChevronDown,
  MoreHorizontal,
  Users,
  Globe,
  Award,
} from "lucide-react";

// Mock data for the leaderboard
const MOCK_DATA = [
  {
    id: 1,
    name: "Sarah Connor",
    steps: 84520,
    avatar: "https://i.pravatar.cc/150?u=sarah",
    trend: "up",
    isCurrentUser: false,
  },
  {
    id: 2,
    name: "John Doe",
    steps: 81200,
    avatar: "https://i.pravatar.cc/150?u=john",
    trend: "same",
    isCurrentUser: false,
  },
  {
    id: 3,
    name: "Jane Smith",
    steps: 79850,
    avatar: "https://i.pravatar.cc/150?u=jane",
    trend: "down",
    isCurrentUser: false,
  },
  {
    id: 4,
    name: "Mike Johnson",
    steps: 75400,
    avatar: "https://i.pravatar.cc/150?u=mike",
    trend: "up",
    isCurrentUser: false,
  },
  {
    id: 5,
    name: "Emily Chen",
    steps: 72100,
    avatar: "https://i.pravatar.cc/150?u=emily",
    trend: "up",
    isCurrentUser: false,
  },
  {
    id: 6,
    name: "David Kim",
    steps: 68900,
    avatar: "https://i.pravatar.cc/150?u=david",
    trend: "down",
    isCurrentUser: false,
  },
  {
    id: 7,
    name: "You",
    steps: 65430,
    avatar: "https://i.pravatar.cc/150?u=you",
    trend: "up",
    isCurrentUser: true,
  },
  {
    id: 8,
    name: "Alex Turner",
    steps: 61200,
    avatar: "https://i.pravatar.cc/150?u=alex",
    trend: "down",
    isCurrentUser: false,
  },
  {
    id: 9,
    name: "Lisa Wong",
    steps: 59800,
    avatar: "https://i.pravatar.cc/150?u=lisa",
    trend: "same",
    isCurrentUser: false,
  },
  {
    id: 10,
    name: "Tom Hardy",
    steps: 55000,
    avatar: "https://i.pravatar.cc/150?u=tom",
    trend: "down",
    isCurrentUser: false,
  },
];

// Utility function to format numbers with commas
const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Component for rendering rank icons or numbers
const RankBadge = ({ rank }) => {
  if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />;
  if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
  if (rank === 3) return <Medal className="w-6 h-6 text-amber-700" />;
  return (
    <span className="w-6 text-center font-bold text-gray-500">{rank}</span>
  );
};

// Component for rendering trend icons
const TrendIcon = ({ trend }) => {
  if (trend === "up") return <ChevronUp className="w-4 h-4 text-emerald-500" />;
  if (trend === "down")
    return <ChevronDown className="w-4 h-4 text-rose-500" />;
  return <MoreHorizontal className="w-4 h-4 text-gray-400" />;
};

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState("friends");

  // Find current user for sticky footer
  const currentUserIndex = MOCK_DATA.findIndex((user) => user.isCurrentUser);
  const currentUser = MOCK_DATA[currentUserIndex];
  const currentUserRank = currentUserIndex + 1;

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans text-slate-800">
      {}
      {/* --- HEADER --- */}
      <header className="bg-white px-6 pt-12 pb-4 shadow-sm z-10 sticky top-0">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
          Leaderboard
        </h1>
        <p className="text-sm text-slate-500 mt-1">This Week's Steps</p>

        {/* Tab Navigation */}
        <div className="flex mt-6 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("friends")}
            className={`flex-1 flex items-center justify-center py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === "friends" ? "bg-white shadow-sm text-indigo-600" : "text-slate-500"}`}
          >
            <Users className="w-4 h-4 mr-2" />
            Friends
          </button>
          <button
            onClick={() => setActiveTab("global")}
            className={`flex-1 flex items-center justify-center py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === "global" ? "bg-white shadow-sm text-indigo-600" : "text-slate-500"}`}
          >
            <Globe className="w-4 h-4 mr-2" />
            Global
          </button>
        </div>
      </header>

      {}
      {/* --- MAIN LIST --- */}
      <main className="flex-1 overflow-y-auto pb-32">
        <ul className="px-4 py-2 space-y-2">
          {MOCK_DATA.map((user, index) => {
            const rank = index + 1;
            const isTopThree = rank <= 3;

            return (
              <li
                key={user.id}
                className={`flex items-center p-4 rounded-2xl transition-all ${user.isCurrentUser ? "bg-indigo-50 border border-indigo-100" : "bg-white hover:bg-slate-50 shadow-sm border border-transparent"}`}
              >
                {/* Rank */}
                <div className="flex items-center justify-center w-8 mr-3">
                  <RankBadge rank={rank} />
                </div>

                {/* Avatar */}
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={`${user.name}'s avatar`}
                    className={`w-12 h-12 rounded-full object-cover border-2 ${isTopThree ? (rank === 1 ? "border-yellow-400" : rank === 2 ? "border-gray-300" : "border-amber-600") : "border-transparent"}`}
                  />
                  {/* Small trend indicator on avatar for quick scanning */}
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-slate-100">
                    <TrendIcon trend={user.trend} />
                  </div>
                </div>

                {/* User Info */}
                <div className="ml-4 flex-1">
                  <p
                    className={`font-semibold text-base ${user.isCurrentUser ? "text-indigo-900" : "text-slate-800"}`}
                  >
                    {user.name}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {formatNumber(user.steps)} steps
                  </p>
                </div>

                {/* Points/Value emphasis */}
                <div className="text-right">
                  <p
                    className={`font-bold ${isTopThree ? "text-indigo-600" : "text-slate-700"}`}
                  >
                    {formatNumber(user.steps)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </main>

      {}
      {/* --- STICKY CURRENT USER FOOTER --- */}
      {/* This ensures the user always knows their standing without scrolling */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 p-4 pb-8 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center">
            <div className="flex flex-col items-center justify-center w-10 h-10 bg-indigo-100 rounded-full mr-4">
              <span className="text-xs font-semibold text-indigo-800 uppercase leading-none">
                Rank
              </span>
              <span className="text-lg font-bold text-indigo-600 leading-none">
                {currentUserRank}
              </span>
            </div>
            <div>
              <p className="font-semibold text-slate-800">Your Current Rank</p>
              <p className="text-sm text-slate-500">
                {formatNumber(currentUser.steps)} steps total
              </p>
            </div>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-md transition-colors flex items-center justify-center">
            <Award className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
