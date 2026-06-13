import React, { useState, useEffect } from "react";
import {
  Activity,
  Flame,
  Clock,
  Bell,
  Home,
  BarChart2,
  Target,
  User,
  ChevronRight,
} from "lucide-react";

const App = () => {
  const [timeRange, setTimeRange] = useState("week");
  const [mounted, setMounted] = useState(false);

  // 初回マウント時のアニメーション用
  useEffect(() => {
    setMounted(true);
  }, []);

  // モックデータ：1週間の歩数
  const weeklyData = [
    { day: "月", value: 4500, label: "4.5k" },
    { day: "火", value: 6200, label: "6.2k" },
    { day: "水", value: 3800, label: "3.8k" },
    { day: "木", value: 8500, label: "8.5k" },
    { day: "金", value: 7100, label: "7.1k" },
    { day: "土", value: 10500, label: "10.5k" },
    { day: "日", value: 8240, label: "8.2k", isToday: true },
  ];

  const maxChartValue = 12000; // グラフのY軸の最大値
  const goalValue = 10000; // 1日の目標歩数
  const goalPositionPct = (goalValue / maxChartValue) * 100;

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-800 font-sans">
      {/* スマートフォンのモックアップ枠 */}
      <div className="w-full max-w-[390px] h-[844px] bg-white rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col border-[8px] border-neutral-900">
        {/* ステータスバーのダミー */}
        <div className="h-12 w-full flex justify-between items-center px-6 pt-2">
          <span className="text-[15px] font-semibold text-neutral-900">
            9:41
          </span>
          <div className="flex gap-1.5 items-center">
            <div className="w-4 h-4 rounded-full bg-neutral-900 flex justify-center items-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
            <div className="w-4 h-4 rounded-full bg-neutral-900"></div>
            <div className="w-6 h-3.5 border border-neutral-300 rounded-[4px] p-[1px] relative">
              <div className="w-[80%] h-full bg-neutral-900 rounded-[2px]"></div>
            </div>
          </div>
        </div>

        {/* ヘッダー */}
        <header className="px-6 pt-4 pb-2 flex justify-between items-center bg-white">
          <div>
            <p className="text-sm text-neutral-500 font-medium mb-1">
              アナリティクス
            </p>
            <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
              活動記録
            </h1>
          </div>
          <button
            className="w-11 h-11 bg-neutral-100 rounded-full flex items-center justify-center relative hover:bg-neutral-200 transition-colors"
            aria-label="通知"
          >
            <Bell size={22} className="text-neutral-700" />
            <span className="absolute top-2.5 right-3 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
          </button>
        </header>

        {/* 期間切り替えタブ */}
        <div className="px-6 py-4">
          <div className="flex bg-neutral-100 p-1.5 rounded-2xl">
            {["日", "週", "月"].map((range, idx) => {
              const ranges = ["day", "week", "month"];
              const isActive = timeRange === ranges[idx];
              return (
                <button
                  key={range}
                  onClick={() => setTimeRange(ranges[idx])}
                  className={`flex-1 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-white text-neutral-900 shadow-sm"
                      : "text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  {range}
                </button>
              );
            })}
          </div>
        </div>

        {/* メインの指標（今日の歩数） */}
        <div className="px-6 py-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-5xl font-extrabold text-neutral-900 tracking-tighter">
              8,240
            </span>
            <span className="text-lg text-neutral-500 font-medium">歩</span>
          </div>
          <div className="inline-flex items-center gap-1.5 mt-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-semibold">
            <Activity size={16} />
            <span>目標の82%を達成しました</span>
          </div>
        </div>

        {/* グラフセクション */}
        <div className="px-6 py-6 mt-2 relative">
          {/* 目標ライン (Target Line) */}
          <div
            className="absolute left-6 right-6 border-t-[1.5px] border-dashed border-emerald-300 z-0 flex items-center"
            style={{ bottom: `calc(2rem + ${goalPositionPct}% - 1px)` }} // 2rem = bottom label height
          >
            <span className="absolute -top-5 right-0 text-[11px] font-bold text-emerald-600 bg-white px-1">
              目標 10k
            </span>
          </div>

          {/* バーグラフ */}
          <div className="flex justify-between items-end h-48 relative z-10">
            {weeklyData.map((d, i) => {
              const heightPct = Math.min((d.value / maxChartValue) * 100, 100);
              return (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-2 group"
                >
                  {/* 数値ラベル (今日の分は常に表示、他はホバー時) */}
                  <span
                    className={`text-[11px] font-bold transition-opacity duration-300 ${
                      d.isToday
                        ? "text-emerald-600 opacity-100"
                        : "text-neutral-400 opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    {d.label}
                  </span>

                  {/* バー本体 */}
                  <div className="w-[85%] max-w-[36px] h-36 bg-neutral-100 rounded-xl relative overflow-hidden flex justify-center">
                    <div
                      className={`absolute bottom-0 w-full rounded-xl transition-all duration-1000 ease-out origin-bottom ${
                        d.isToday
                          ? "bg-gradient-to-t from-emerald-400 to-emerald-500 shadow-sm"
                          : "bg-neutral-200 group-hover:bg-neutral-300"
                      }`}
                      style={{
                        height: mounted ? `${heightPct}%` : "0%",
                        opacity: mounted ? 1 : 0,
                      }}
                    ></div>
                  </div>

                  {/* 曜日ラベル */}
                  <span
                    className={`text-xs font-semibold mt-1 ${d.isToday ? "text-neutral-900" : "text-neutral-400"}`}
                  >
                    {d.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* サブ指標カード */}
        <div className="px-6 py-2 grid grid-cols-2 gap-4">
          <StatCard
            icon={<Flame size={20} className="text-orange-500" />}
            title="消費カロリー"
            value="480"
            unit="kcal"
            bgColor="bg-orange-50"
          />
          <StatCard
            icon={<Clock size={20} className="text-blue-500" />}
            title="活動時間"
            value="45"
            unit="分"
            bgColor="bg-blue-50"
          />
        </div>

        {/* 詳細を見るリンク */}
        <div className="px-6 mt-4">
          <button className="w-full bg-white border border-neutral-200 rounded-2xl p-4 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors active:scale-[0.98]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <Target size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900">
                  週間レポート
                </h3>
                <p className="text-xs text-neutral-500 font-medium">
                  先週よりも活動量が12%増加
                </p>
              </div>
            </div>
            <ChevronRight size={20} className="text-neutral-400" />
          </button>
        </div>

        {/* 下部ナビゲーション (Bottom Navigation) */}
        <nav className="absolute bottom-0 w-full bg-white border-t border-neutral-100 pb-8 pt-4 px-8 flex justify-between items-center z-50">
          <NavItem icon={<Home size={24} />} label="ホーム" />
          <NavItem icon={<BarChart2 size={24} />} label="データ" isActive />
          <NavItem icon={<Target size={24} />} label="目標" />
          <NavItem icon={<User size={24} />} label="マイページ" />
        </nav>

        {/* ホームインジケーター（iPhoneの下の線） */}
        <div className="absolute bottom-2 w-full flex justify-center z-50 pointer-events-none">
          <div className="w-[35%] h-1.5 bg-neutral-900 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

// サブ指標カードコンポーネント
const StatCard = ({ icon, title, value, unit, bgColor }) => (
  <div className="bg-white border border-neutral-100 p-4 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${bgColor}`}
    >
      {icon}
    </div>
    <p className="text-xs text-neutral-500 font-semibold mb-1">{title}</p>
    <div className="flex items-baseline gap-1">
      <span className="text-2xl font-bold text-neutral-900">{value}</span>
      <span className="text-xs text-neutral-500 font-medium">{unit}</span>
    </div>
  </div>
);

// ナビゲーションアイテムコンポーネント
const NavItem = ({ icon, label, isActive }) => (
  <button
    className={`flex flex-col items-center gap-1.5 transition-colors ${isActive ? "text-emerald-600" : "text-neutral-400 hover:text-neutral-600"}`}
  >
    {icon}
    <span className="text-[10px] font-bold">{label}</span>
  </button>
);

export default App;
