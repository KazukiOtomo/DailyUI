import React, { useState } from "react";
import {
  Mail,
  Lock,
  User,
  Leaf,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Waves,
  Heart,
} from "lucide-react";

const SignUpApp = () => {
  // フォームの状態管理
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agreeTerms: false,
  });

  // エラーと送信状態の管理
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 入力値の変更ハンドラー
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
    // 入力時にエラーをクリア
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  // バリデーション処理
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "お名前を入力してください";
    if (!formData.email) {
      newErrors.email = "メールアドレスを入力してください";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "有効なメールアドレスを入力してください";
    }
    if (!formData.password) {
      newErrors.password = "パスワードを入力してください";
    } else if (formData.password.length < 8) {
      newErrors.password = "パスワードは8文字以上で入力してください";
    }
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "利用規約への同意が必要です";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 送信処理
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // API通信をシミュレート (1.5秒後に成功)
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1500);
    }
  };

  // 成功画面のコンポーネント
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-4 font-sans text-gray-800">
        <div className="bg-white w-full max-w-md rounded-[2rem] shadow-xl overflow-hidden p-8 text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            登録が完了しました！
          </h2>
          <p className="text-gray-600 mb-8">
            {formData.name}さん、ボランティアへのご参加ありがとうございます。
            <br />
            詳細な案内をメールでお送りしました。
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-6 rounded-2xl transition-colors flex items-center justify-center gap-2"
          >
            マイページへ進む <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-6 font-sans text-gray-800">
      {/* スマホサイズのコンテナ */}
      <div className="bg-white w-full max-w-md rounded-[2rem] shadow-xl overflow-hidden relative">
        {/* 装飾的なヘッダー背景 */}
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-b-[3rem] opacity-20 pointer-events-none"></div>

        {/* ヘッダーコンテンツ */}
        <div className="px-6 pt-10 pb-6 relative z-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-100 text-emerald-600 rounded-2xl mb-4 shadow-sm">
            <Waves className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
            週末ビーチクリーンナップ
          </h1>
          <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
            <Heart className="w-4 h-4 text-emerald-500" />
            海を綺麗にして、オリジナルエコバッグをGET！
          </p>
        </div>

        {/* フォームセクション */}
        <div className="px-6 pb-8 relative z-10">
          {/* ソーシャルログイン (入力負荷の軽減) */}
          <div className="space-y-3 mb-6">
            <button
              type="button"
              className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Googleで登録
            </button>
            <button
              type="button"
              className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.31-.83 3.65-.72 1.63.14 2.87.82 3.65 1.93-3.11 1.83-2.61 5.95.42 7.15-.71 1.55-1.57 3.06-2.8 4.19v-.38zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              Appleで登録
            </button>
          </div>

          <div className="flex items-center text-sm text-gray-400 mb-6">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="px-3 bg-white">またはメールアドレスで登録</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 名前フィールド */}
            <div>
              <label htmlFor="name" className="sr-only">
                お名前
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User
                    className={`w-5 h-5 ${errors.name ? "text-red-400" : "text-gray-400"}`}
                  />
                </div>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="お名前（ニックネーム可）"
                  className={`w-full pl-11 pr-4 py-3.5 bg-gray-50 border ${errors.name ? "border-red-300 ring-1 ring-red-300" : "border-gray-200"} rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all`}
                />
              </div>
              {errors.name && (
                <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.name}
                </p>
              )}
            </div>

            {/* メールアドレスフィールド */}
            <div>
              <label htmlFor="email" className="sr-only">
                メールアドレス
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail
                    className={`w-5 h-5 ${errors.email ? "text-red-400" : "text-gray-400"}`}
                  />
                </div>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="メールアドレス"
                  className={`w-full pl-11 pr-4 py-3.5 bg-gray-50 border ${errors.email ? "border-red-300 ring-1 ring-red-300" : "border-gray-200"} rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all`}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.email}
                </p>
              )}
            </div>

            {/* パスワードフィールド */}
            <div>
              <label htmlFor="password" className="sr-only">
                パスワード
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock
                    className={`w-5 h-5 ${errors.password ? "text-red-400" : "text-gray-400"}`}
                  />
                </div>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="パスワード（8文字以上）"
                  className={`w-full pl-11 pr-4 py-3.5 bg-gray-50 border ${errors.password ? "border-red-300 ring-1 ring-red-300" : "border-gray-200"} rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all`}
                />
              </div>
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.password}
                </p>
              )}
            </div>

            {/* 利用規約の同意 (明確な同意を求めるHCD原則) */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center pt-0.5">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="w-5 h-5 border-2 border-gray-300 rounded text-emerald-600 focus:ring-emerald-500 transition-colors cursor-pointer appearance-none checked:bg-emerald-500 checked:border-emerald-500"
                  />
                  {formData.agreeTerms && (
                    <CheckCircle2 className="w-4 h-4 text-white absolute top-1 left-0.5 pointer-events-none" />
                  )}
                </div>
                <span className="text-sm text-gray-600 leading-tight select-none">
                  <a
                    href="#"
                    className="text-emerald-600 hover:underline font-medium"
                  >
                    利用規約
                  </a>
                  と
                  <a
                    href="#"
                    className="text-emerald-600 hover:underline font-medium"
                  >
                    プライバシーポリシー
                  </a>
                  に同意して参加します。
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.agreeTerms}
                </p>
              )}
            </div>

            {/* 送信ボタン */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full text-white font-semibold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2
                  ${
                    isSubmitting
                      ? "bg-emerald-400 cursor-not-allowed"
                      : "bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] shadow-md hover:shadow-lg"
                  }`}
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Leaf className="w-5 h-5" />
                    ボランティアに登録する
                  </>
                )}
              </button>
            </div>
          </form>

          {/* フッターリンク */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              すでにアカウントをお持ちですか？{" "}
              <a
                href="#"
                className="text-emerald-600 font-semibold hover:underline"
              >
                ログイン
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpApp;
