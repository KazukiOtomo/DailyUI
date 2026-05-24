import React, { useState, useRef } from "react";
import {
  CreditCard,
  Lock,
  ChevronLeft,
  ScanLine,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

const App = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 金額のモックデータ
  const orderTotal = 12500;

  // カード番号のフォーマット (例: 1234 5678 1234 5678)
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // 数字以外を削除
    if (value.length > 16) value = value.slice(0, 16);

    // 4桁ごとにスペースを挿入
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formattedValue);
  };

  // 有効期限のフォーマット (例: 12/25)
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);

    if (value.length >= 2) {
      // 月が13以上の場合は自動修正などのロジックも追加可能ですが、今回はシンプルに
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setExpiry(value);
  };

  // CVVのフォーマット (3〜4桁の数字)
  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    setCvv(value);
  };

  const handleNameChange = (e) => {
    // 英字とスペースのみを許容（実際の運用では要件に合わせる）
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "").toUpperCase();
    setCardName(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // 決済処理のモック（2秒後に成功画面へ）
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  // カードブランドの判定（簡易版）
  const getCardType = (number) => {
    if (number.startsWith("4")) return "VISA";
    if (number.startsWith("5")) return "MasterCard";
    if (number.startsWith("3")) return "JCB/Amex";
    return "CARD";
  };

  // 決済成功画面
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-sm w-full animate-fade-in">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            決済が完了しました
          </h2>
          <p className="text-gray-500 mb-6">
            ご注文ありがとうございます。控えをメールで送信しました。
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gray-900 text-white font-semibold py-4 rounded-xl active:scale-95 transition-transform"
          >
            トップに戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 selection:bg-blue-100">
      {/* モバイル用コンテナ（PCで見てもスマホ幅になるように制限） */}
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl relative overflow-hidden">
        {/* ヘッダー */}
        <header className="flex items-center justify-between p-4 border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-10">
          <button className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors active:scale-90">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">お支払い</h1>
          <div className="w-10"></div> {/* バランス調整用 */}
        </header>

        <main className="p-5 pb-24">
          {/* 注文サマリー */}
          <div className="flex justify-between items-end mb-6 bg-gray-50 p-4 rounded-2xl">
            <div>
              <p className="text-sm text-gray-500 mb-1">ご請求金額</p>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                ¥{orderTotal.toLocaleString()}
              </h2>
            </div>
            <div className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1.5 rounded-lg flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" />
              安全な通信
            </div>
          </div>

          {/* インタラクティブなカードプレビュー */}
          <div
            className="relative w-full h-52 rounded-2xl p-6 text-white mb-8 shadow-xl overflow-hidden transition-transform duration-300 ease-out"
            style={{
              background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
              transform: focusedField === "cvv" ? "scale(0.98)" : "scale(1)",
            }}
          >
            {/* 装飾用の背景円 */}
            <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>

            <div className="flex justify-between items-start relative z-10">
              <div className="w-12 h-8 bg-gradient-to-br from-yellow-200 to-yellow-500 rounded flex items-center justify-center opacity-90">
                {/* ICチップのモックアップ */}
                <div className="w-8 h-5 border border-yellow-700/30 rounded-sm"></div>
              </div>
              <span className="font-bold italic text-white/80 tracking-wider">
                {getCardType(cardNumber)}
              </span>
            </div>

            <div className="mt-8 relative z-10">
              <div
                className={`text-2xl font-mono tracking-[0.15em] transition-opacity duration-300 ${cardNumber ? "text-white" : "text-gray-400"}`}
              >
                {cardNumber || "•••• •••• •••• ••••"}
              </div>
            </div>

            <div className="flex justify-between mt-6 relative z-10">
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">
                  名義人
                </span>
                <span
                  className={`font-medium tracking-widest text-sm truncate max-w-[150px] transition-opacity ${cardName ? "text-white" : "text-gray-400"}`}
                >
                  {cardName || "TAROU YAMADA"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">
                  有効期限
                </span>
                <span
                  className={`font-medium tracking-widest text-sm transition-opacity ${expiry ? "text-white" : "text-gray-400"}`}
                >
                  {expiry || "MM/YY"}
                </span>
              </div>
            </div>

            {/* CVV入力時にハイライトされるオーバーレイ（裏面の表現） */}
            <div
              className={`absolute inset-0 bg-slate-800 z-20 transition-opacity duration-300 flex flex-col justify-center ${focusedField === "cvv" ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              <div className="w-full h-10 bg-black/80 mb-4"></div>
              <div className="px-6 flex justify-end">
                <div className="bg-white text-black font-mono px-3 py-1.5 rounded flex items-center">
                  <span className="text-gray-400 text-xs mr-2 border-r border-gray-300 pr-2">
                    CVV
                  </span>
                  {cvv || "•••"}
                </div>
              </div>
            </div>
          </div>

          {/* 入力フォーム */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* カード番号 */}
            <div className="relative">
              <label
                htmlFor="cardNumber"
                className="block text-sm font-medium text-gray-700 mb-1.5 ml-1"
              >
                カード番号
              </label>
              <div
                className={`relative flex items-center border-2 rounded-xl bg-gray-50 transition-colors ${focusedField === "cardNumber" ? "border-blue-500 bg-white" : "border-gray-200"}`}
              >
                <div className="pl-4 text-gray-400">
                  <CreditCard className="w-5 h-5" />
                </div>
                <input
                  id="cardNumber"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9\s]*"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  onFocus={() => setFocusedField("cardNumber")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="0000 0000 0000 0000"
                  maxLength="19"
                  required
                  className="w-full py-4 px-3 bg-transparent outline-none text-gray-900 text-lg placeholder:text-gray-300 font-mono"
                />
                <button
                  type="button"
                  className="pr-4 text-blue-600 hover:text-blue-700"
                  aria-label="カードをスキャン"
                >
                  <ScanLine className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* カード名義人 */}
            <div>
              <label
                htmlFor="cardName"
                className="block text-sm font-medium text-gray-700 mb-1.5 ml-1"
              >
                カード名義人 (ローマ字)
              </label>
              <div
                className={`relative flex items-center border-2 rounded-xl bg-gray-50 transition-colors ${focusedField === "cardName" ? "border-blue-500 bg-white" : "border-gray-200"}`}
              >
                <input
                  id="cardName"
                  type="text"
                  value={cardName}
                  onChange={handleNameChange}
                  onFocus={() => setFocusedField("cardName")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="TAROU YAMADA"
                  required
                  className="w-full py-4 px-4 bg-transparent outline-none text-gray-900 text-lg placeholder:text-gray-300 uppercase"
                />
              </div>
            </div>

            <div className="flex gap-4">
              {/* 有効期限 */}
              <div className="flex-1">
                <label
                  htmlFor="expiry"
                  className="block text-sm font-medium text-gray-700 mb-1.5 ml-1"
                >
                  有効期限
                </label>
                <div
                  className={`relative flex items-center border-2 rounded-xl bg-gray-50 transition-colors ${focusedField === "expiry" ? "border-blue-500 bg-white" : "border-gray-200"}`}
                >
                  <input
                    id="expiry"
                    type="text"
                    inputMode="numeric"
                    value={expiry}
                    onChange={handleExpiryChange}
                    onFocus={() => setFocusedField("expiry")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="MM/YY"
                    maxLength="5"
                    required
                    className="w-full py-4 px-4 bg-transparent outline-none text-gray-900 text-lg placeholder:text-gray-300 font-mono"
                  />
                </div>
              </div>

              {/* セキュリティコード (CVV) */}
              <div className="flex-1">
                <label
                  htmlFor="cvv"
                  className="block text-sm font-medium text-gray-700 mb-1.5 ml-1 flex items-center justify-between"
                >
                  <span>セキュリティコード</span>
                </label>
                <div
                  className={`relative flex items-center border-2 rounded-xl bg-gray-50 transition-colors ${focusedField === "cvv" ? "border-blue-500 bg-white" : "border-gray-200"}`}
                >
                  <input
                    id="cvv"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={cvv}
                    onChange={handleCvvChange}
                    onFocus={() => setFocusedField("cvv")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="123"
                    maxLength="4"
                    required
                    className="w-full py-4 px-4 bg-transparent outline-none text-gray-900 text-lg placeholder:text-gray-300 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* 決済ボタン (固定下部ではなく、フォームの最後に配置してスクロール可能に) */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full relative overflow-hidden flex items-center justify-center gap-2 text-white font-semibold text-lg py-4 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/30 ${
                  isProcessing
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"
                }`}
              >
                {isProcessing ? (
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />¥{orderTotal.toLocaleString()}{" "}
                    を支払う
                  </>
                )}
              </button>
              <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" />
                通信は暗号化され安全に送信されます
              </p>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default App;
