import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Mic,
  ArrowLeft,
  Clock,
  X,
  SlidersHorizontal,
  MapPin,
  Star,
  ChevronRight,
} from "lucide-react";

// --- モックデータ ---
const INITIAL_CATEGORIES = [
  "カフェ",
  "ラーメン",
  "イタリアン",
  "焼肉",
  "寿司",
  "居酒屋",
  "スイーツ",
  "パン屋",
];
const INITIAL_RECENT_SEARCHES = [
  "新宿 パンケーキ",
  "渋谷 ランチ",
  "東京駅 弁当",
  "恵比寿 ディナー",
];
const MOCK_SUGGESTIONS = [
  "新宿 カフェ",
  "新宿 焼肉",
  "新宿 ラーメン",
  "新宿 居酒屋 個室",
  "新宿 イタリアン ランチ",
];

const MOCK_RESULTS = [
  {
    id: 1,
    name: "カフェ・ド・ルミエール",
    rating: 4.5,
    reviews: 128,
    category: "カフェ",
    distance: "300m",
    price: "￥",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: 2,
    name: "麺屋 桜",
    rating: 4.2,
    reviews: 350,
    category: "ラーメン",
    distance: "500m",
    price: "￥￥",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: 3,
    name: "トラットリア・ベルデ",
    rating: 4.7,
    reviews: 89,
    category: "イタリアン",
    distance: "1.2km",
    price: "￥￥￥",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: 4,
    name: "焼肉 炎陣",
    rating: 4.0,
    reviews: 210,
    category: "焼肉",
    distance: "800m",
    price: "￥￥￥￥",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=300&h=200",
  },
];

export default function App() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [recentSearches, setRecentSearches] = useState(INITIAL_RECENT_SEARCHES);

  const inputRef = useRef(null);

  // 検索実行ハンドラ
  const handleSearch = (searchQuery) => {
    if (!searchQuery.trim()) return;
    setQuery(searchQuery);
    setIsSearched(true);
    setIsFocused(false);
    inputRef.current?.blur();

    // 最近の検索履歴を更新（重複を避け、先頭に追加）
    setRecentSearches((prev) => {
      const filtered = prev.filter((item) => item !== searchQuery);
      return [searchQuery, ...filtered].slice(0, 5);
    });
  };

  // 検索入力のクリア
  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  // 戻るボタンの処理（検索結果画面から検索画面へ戻る、またはフォーカスを外す）
  const handleBack = () => {
    if (isSearched) {
      setIsSearched(false);
      setIsFocused(true);
      inputRef.current?.focus();
    } else {
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  // --- UIコンポーネント ---

  // 1. 検索サジェスト (入力中の予測候補)
  const renderSuggestions = () => (
    <div className="bg-white">
      {MOCK_SUGGESTIONS.filter((s) => s.includes(query) || query === "").map(
        (suggestion, index) => (
          <button
            key={index}
            className="w-full flex items-center px-4 py-3 border-b border-gray-100 hover:bg-gray-50 active:bg-gray-100 transition-colors text-left"
            onClick={() => handleSearch(suggestion)}
          >
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <span className="text-gray-800 text-base">{suggestion}</span>
          </button>
        ),
      )}
    </div>
  );

  // 2. 初期画面: 最近の検索とカテゴリ (認知的負荷の軽減)
  const renderInitialView = () => (
    <div className="p-4 space-y-6 bg-white min-h-screen">
      {/* 最近の検索 */}
      {recentSearches.length > 0 && (
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-semibold text-gray-600">最近の検索</h2>
            <button
              className="text-xs text-blue-600 font-medium p-2 -mr-2"
              onClick={() => setRecentSearches([])}
            >
              消去
            </button>
          </div>
          <div className="space-y-1">
            {recentSearches.map((item, index) => (
              <button
                key={index}
                className="w-full flex items-center py-2.5 active:opacity-70 text-left"
                onClick={() => handleSearch(item)}
              >
                <Clock className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-800 flex-1">{item}</span>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </button>
            ))}
          </div>
        </section>
      )}

      {/* おすすめカテゴリ */}
      <section>
        <h2 className="text-sm font-semibold text-gray-600 mb-3">
          おすすめカテゴリ
        </h2>
        <div className="flex flex-wrap gap-2">
          {INITIAL_CATEGORIES.map((category, index) => (
            <button
              key={index}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-full text-sm text-gray-800 font-medium transition-colors border border-transparent focus:border-blue-500 focus:outline-none"
              onClick={() => handleSearch(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>
    </div>
  );

  // 3. 検索結果画面
  const renderSearchResults = () => (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* フィルターバー */}
      <div className="bg-white px-4 py-3 flex gap-2 overflow-x-auto border-b border-gray-200 sticky top-[68px] z-10 no-scrollbar">
        <button className="flex-shrink-0 flex items-center px-3 py-1.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          <SlidersHorizontal className="w-4 h-4 mr-1.5" />
          絞り込み
        </button>
        <button className="flex-shrink-0 px-4 py-1.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          現在地周辺
        </button>
        <button className="flex-shrink-0 px-4 py-1.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          営業中
        </button>
        <button className="flex-shrink-0 px-4 py-1.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          評価4.0以上
        </button>
      </div>

      {/* 結果リスト */}
      <div className="p-4 space-y-4">
        <p className="text-sm text-gray-600 mb-2">
          「{query}」の検索結果 {MOCK_RESULTS.length}件
        </p>

        {MOCK_RESULTS.map((result) => (
          <div
            key={result.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden active:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="flex h-32">
              <img
                src={result.image}
                alt={result.name}
                className="w-32 h-full object-cover"
              />
              <div className="p-3 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-bold text-gray-900 leading-tight mb-1">
                    {result.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-1">
                    {result.category}
                  </p>
                </div>
                <div>
                  <div className="flex items-center mb-1">
                    <Star className="w-4 h-4 text-orange-500 fill-current" />
                    <span className="text-sm font-bold text-gray-800 ml-1">
                      {result.rating}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">
                      ({result.reviews})
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <MapPin className="w-3.5 h-3.5 mr-0.5" />
                    <span>{result.distance}</span>
                    <span className="mx-1.5">・</span>
                    <span>{result.price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto h-screen bg-white shadow-xl overflow-hidden flex flex-col relative font-sans">
      {/* 共通ヘッダー：検索バーエリア */}
      <header className="bg-white z-20 shadow-sm transition-all duration-200">
        <div className="flex items-center px-4 py-3 gap-3">
          {/* 戻るボタン (フォーカス時または検索結果表示時に出現) */}
          {(isFocused || isSearched) && (
            <button
              onClick={handleBack}
              className="p-2 -ml-2 rounded-full hover:bg-gray-100 active:bg-gray-200 text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="戻る"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}

          {/* 検索入力フォーム */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(query);
            }}
            className={`flex-1 flex items-center bg-gray-100 rounded-full border border-transparent focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-200 transition-all ${isFocused ? "h-12" : "h-11"}`}
          >
            {/* 虫眼鏡アイコン (未フォーカス時のみ表示し、戻るボタンの代わりとする) */}
            {!isFocused && !isSearched && (
              <div className="pl-4 text-gray-400">
                <Search className="w-5 h-5" />
              </div>
            )}

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              placeholder="お店、ジャンル、エリアを入力"
              className="flex-1 bg-transparent border-none py-2 px-3 focus:outline-none text-base text-gray-900 placeholder-gray-500 w-full"
            />

            {/* クリアボタン (入力がある場合のみ表示) */}
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label="検索内容をクリア"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {/* 音声検索ボタン (入力がない場合のみ表示。HCD的観点での代替入力手段) */}
            {!query && (
              <button
                type="button"
                className="pr-4 pl-2 text-blue-600 hover:text-blue-700 focus:outline-none"
                aria-label="音声検索"
              >
                <Mic className="w-5 h-5" />
              </button>
            )}
          </form>
        </div>
      </header>

      {/* メインコンテンツエリア */}
      <main className="flex-1 overflow-y-auto">
        {isSearched
          ? renderSearchResults()
          : isFocused && query.length > 0
            ? renderSuggestions()
            : renderInitialView()}
      </main>
    </div>
  );
}
