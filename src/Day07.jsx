import React, { useState } from "react";
import {
  ChevronLeft,
  Moon,
  Briefcase,
  Hourglass,
  BedDouble,
  BellOff,
  AppWindow,
  PieChart,
  ChevronRight,
  Info,
} from "lucide-react";

// 再利用可能なトグルスイッチコンポーネント
const Toggle = ({ enabled, onChange }) => (
  <button
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
      enabled ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"
    }`}
    aria-pressed={enabled}
  >
    <span
      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-300 ${
        enabled ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
);

// 設定のグループ（カード）コンポーネント
const SettingsGroup = ({ title, children }) => (
  <div className="mb-6">
    {title && (
      <h2 className="px-4 pb-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        {title}
      </h2>
    )}
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
      {children}
    </div>
  </div>
);

// 設定の各行（リストアイテム）コンポーネント
const SettingsRow = ({
  icon: Icon,
  title,
  subtitle,
  value,
  type = "link",
  enabled,
  onToggle,
  isLast,
}) => (
  <div className="flex items-center px-4 py-3 sm:py-4 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors active:bg-gray-100 dark:active:bg-gray-700 cursor-pointer">
    <div className="flex-shrink-0 mr-4">
      <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
        <Icon size={20} />
      </div>
    </div>
    <div className="flex-1 min-w-0 pr-4">
      <p className="text-base font-medium text-gray-900 dark:text-white truncate">
        {title}
      </p>
      {subtitle && (
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
          {subtitle}
        </p>
      )}
    </div>
    <div className="flex-shrink-0 flex items-center">
      {value && (
        <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
          {value}
        </span>
      )}

      {type === "toggle" ? (
        <Toggle enabled={enabled} onChange={onToggle} />
      ) : (
        <ChevronRight size={20} className="text-gray-400 dark:text-gray-500" />
      )}
    </div>
  </div>
);

export default function App() {
  // 設定の状態管理（プロトタイプ用）
  const [settings, setSettings] = useState({
    doNotDisturb: false,
    downtime: true,
    notificationSummary: false,
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center font-sans items-start sm:py-8">
      {/* スマートフォンのモックアップフレーム */}
      <div className="w-full max-w-md bg-gray-50 dark:bg-black sm:rounded-[2.5rem] sm:shadow-2xl overflow-hidden relative border-x-0 sm:border-[8px] border-gray-800 h-[100vh] sm:h-[850px] flex flex-col">
        {/* ヘッダー（ナビゲーション） */}
        <header className="px-4 py-3 bg-gray-50/90 dark:bg-black/90 backdrop-blur-md sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <button className="p-2 -ml-2 text-blue-600 dark:text-blue-500 flex items-center hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full transition-colors">
            <ChevronLeft size={24} />
            <span className="text-base ml-1">設定</span>
          </button>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white absolute left-1/2 transform -translate-x-1/2">
            ウェルビーイング
          </h1>
          <div className="w-10"></div> {/* バランス調整用の空要素 */}
        </header>

        {/* スクロール可能なメインコンテンツ */}
        <main className="flex-1 overflow-y-auto p-4 pb-12">
          {/* ヒーローセクション：現状のフィードバック */}
          <div className="mb-8 pt-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                今日の利用状況
              </h2>
              <button className="text-gray-400 hover:text-blue-500 transition-colors">
                <Info size={20} />
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 dark:bg-gray-700">
                <div className="h-full bg-blue-500 w-[65%] rounded-r-full"></div>
              </div>
              <PieChart
                size={48}
                className="text-blue-500 mb-3"
                strokeWidth={1.5}
              />
              <div className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-1">
                4
                <span className="text-xl font-medium text-gray-500 mx-1">
                  時間
                </span>
                12
                <span className="text-xl font-medium text-gray-500 ml-1">
                  分
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                昨日より 25分 減少しています
              </p>
            </div>
          </div>

          {/* セクション1: 集中モード */}
          <SettingsGroup title="集中とブロック">
            <SettingsRow
              icon={Moon}
              title="おやすみモード"
              subtitle="すべての通知をミュートします"
              type="toggle"
              enabled={settings.doNotDisturb}
              onToggle={() => toggleSetting("doNotDisturb")}
            />
            <div className="h-[1px] bg-gray-100 dark:bg-gray-700 ml-16"></div>
            <SettingsRow
              icon={Briefcase}
              title="仕事モード"
              subtitle="許可されたアプリのみ通知"
              value="オン"
            />
            <div className="h-[1px] bg-gray-100 dark:bg-gray-700 ml-16"></div>
            <SettingsRow
              icon={BedDouble}
              title="睡眠スケジュール"
              subtitle="23:00 - 07:00"
            />
          </SettingsGroup>

          {/* セクション2: 利用時間の管理 */}
          <SettingsGroup title="使用時間の管理">
            <SettingsRow
              icon={Hourglass}
              title="休止時間 (ダウンタイム)"
              subtitle="許可したアプリ以外をブロック"
              type="toggle"
              enabled={settings.downtime}
              onToggle={() => toggleSetting("downtime")}
            />
            <div className="h-[1px] bg-gray-100 dark:bg-gray-700 ml-16"></div>
            <SettingsRow
              icon={AppWindow}
              title="アプリの制限"
              subtitle="SNSやゲームの1日あたりの上限"
              value="3個設定済み"
            />
          </SettingsGroup>

          {/* セクション3: 通知の最適化 */}
          <SettingsGroup title="気を散らさない工夫">
            <SettingsRow
              icon={BellOff}
              title="通知の要約"
              subtitle="重要でない通知をまとめて配信"
              type="toggle"
              enabled={settings.notificationSummary}
              onToggle={() => toggleSetting("notificationSummary")}
            />
          </SettingsGroup>
        </main>
      </div>
    </div>
  );
}
