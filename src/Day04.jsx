import React, { useState, useMemo } from "react";
import { Home, PieChart, Info, ChevronRight } from "lucide-react";

export default function App() {
  // ステート管理（初期値）
  const [propertyPrice, setPropertyPrice] = useState(4500); // 単位: 万円
  const [downPayment, setDownPayment] = useState(500); // 単位: 万円
  const [interestRate, setInterestRate] = useState(1.2); // 単位: %
  const [loanYears, setLoanYears] = useState(35); // 単位: 年

  // 計算ロジック
  const calculations = useMemo(() => {
    const principal = (propertyPrice - downPayment) * 10000; // 借入元本（円）

    // 借入額が0以下の場合は0を返す
    if (principal <= 0) {
      return {
        monthlyPayment: 0,
        totalPayment: 0,
        totalInterest: 0,
        principal: 0,
      };
    }

    const monthlyInterestRate = interestRate / 100 / 12; // 月利
    const numberOfPayments = loanYears * 12; // 支払い回数

    // 月々の支払い額の計算 (元利均等返済)
    // M = P [ i(1 + i)^n ] / [ (1 + i)^n - 1]
    let monthlyPayment = 0;
    if (monthlyInterestRate > 0) {
      monthlyPayment =
        (principal *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    } else {
      monthlyPayment = principal / numberOfPayments; // 金利0の場合
    }

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    return {
      monthlyPayment: Math.round(monthlyPayment),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      principal: principal,
    };
  }, [propertyPrice, downPayment, interestRate, loanYears]);

  // 数値フォーマット補助関数
  const formatCurrency = (num) => {
    return num.toLocaleString("ja-JP");
  };

  // グラフ用の割合計算
  const principalPercent =
    calculations.totalPayment > 0
      ? (calculations.principal / calculations.totalPayment) * 100
      : 0;
  const interestPercent =
    calculations.totalPayment > 0
      ? (calculations.totalInterest / calculations.totalPayment) * 100
      : 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-24">
      {/* ヘッダー */}
      <header className="bg-white px-4 py-4 shadow-sm sticky top-0 z-10 flex items-center justify-center">
        <Home className="w-5 h-5 text-blue-600 mr-2" />
        <h1 className="text-lg font-bold text-slate-800">
          住宅ローンシミュレーター
        </h1>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-6">
        {/* 結果表示エリア (常に視界に入るよう上部に配置) */}
        <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-200">
          <p className="text-blue-100 text-sm font-medium mb-1">
            月々の返済額（目安）
          </p>
          <div className="flex items-baseline mb-4">
            <span className="text-4xl font-extrabold tracking-tight">
              {formatCurrency(calculations.monthlyPayment)}
            </span>
            <span className="ml-2 text-lg font-medium text-blue-100">円</span>
          </div>

          <div className="border-t border-blue-500 pt-4 mt-2">
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-blue-100">総支払額</span>
              <span className="font-semibold">
                {formatCurrency(calculations.totalPayment)} 円
              </span>
            </div>

            {/* 視覚的な内訳バー */}
            <div className="w-full h-2.5 bg-blue-800 rounded-full mt-3 mb-2 flex overflow-hidden">
              <div
                className="h-full bg-white"
                style={{ width: `${principalPercent}%` }}
              ></div>
              <div
                className="h-full bg-blue-400"
                style={{ width: `${interestPercent}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-blue-200">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-white mr-1.5"></div>
                借入元本: {formatCurrency(calculations.principal / 10000)}万円
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-400 mr-1.5"></div>
                利息分:{" "}
                {formatCurrency(Math.round(calculations.totalInterest / 10000))}
                万円
              </div>
            </div>
          </div>
        </div>

        {/* 入力フォームエリア */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-7">
          {/* 物件価格 */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-700">
                物件価格
              </label>
              <div className="bg-slate-100 px-3 py-1.5 rounded-lg flex items-center">
                <input
                  type="number"
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Number(e.target.value))}
                  className="bg-transparent text-right font-bold w-20 outline-none"
                />
                <span className="text-slate-500 text-sm ml-1">万円</span>
              </div>
            </div>
            <input
              type="range"
              min="1000"
              max="10000"
              step="100"
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>1,000万円</span>
              <span>1億円</span>
            </div>
          </div>

          {/* 頭金 */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-700">頭金</label>
              <div className="bg-slate-100 px-3 py-1.5 rounded-lg flex items-center">
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="bg-transparent text-right font-bold w-20 outline-none"
                />
                <span className="text-slate-500 text-sm ml-1">万円</span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max={propertyPrice}
              step="100"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <p className="text-xs text-slate-500 text-right">
              借入金額:{" "}
              <span className="font-semibold text-slate-700">
                {formatCurrency(propertyPrice - downPayment)}万円
              </span>
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* 金利 */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-700">
                金利 (年利)
              </label>
              <div className="bg-slate-100 px-3 py-1.5 rounded-lg flex items-center">
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="bg-transparent text-right font-bold w-16 outline-none"
                />
                <span className="text-slate-500 text-sm ml-1">%</span>
              </div>
            </div>
            <input
              type="range"
              min="0.1"
              max="5.0"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>0.1%</span>
              <span>5.0%</span>
            </div>
          </div>

          {/* 借入期間 */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-700">
                借入期間
              </label>
              <div className="bg-slate-100 px-3 py-1.5 rounded-lg flex items-center">
                <input
                  type="number"
                  value={loanYears}
                  onChange={(e) => setLoanYears(Number(e.target.value))}
                  className="bg-transparent text-right font-bold w-16 outline-none"
                />
                <span className="text-slate-500 text-sm ml-1">年</span>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              value={loanYears}
              onChange={(e) => setLoanYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>1年</span>
              <span>50年</span>
            </div>
          </div>
        </div>

        {/* アクションまたは詳細情報 */}
        <button className="w-full bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between text-slate-700 hover:bg-slate-50 transition-colors active:scale-95 transform duration-150">
          <div className="flex items-center">
            <PieChart className="w-5 h-5 text-blue-500 mr-3" />
            <span className="font-semibold text-sm">
              返済計画の詳しい内訳を見る
            </span>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </button>
      </main>
    </div>
  );
}
