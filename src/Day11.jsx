import React, { useState, useEffect, useCallback } from "react";
import {
  CheckCircle,
  AlertCircle,
  X,
  UploadCloud,
  FileImage,
  ArrowRight,
} from "lucide-react";

// --- フラッシュメッセージ（スナックバー）コンポーネント ---
const FlashMessage = ({
  type,
  title,
  message,
  actionLabel,
  onAction,
  onClose,
}) => {
  useEffect(() => {
    // 5秒後に自動的に閉じる (人間中心設計: ユーザーが読み終わる十分な時間を確保しつつ、画面を占有し続けない)
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === "success";

  // 状態に応じたカラーとアイコンの設定 (人間中心設計: 色覚に依存しない情報の伝達)
  const baseClasses =
    "flex items-start w-full p-4 rounded-xl shadow-lg border transform transition-all duration-300 ease-in-out translate-y-0 opacity-100";
  const typeClasses = isSuccess
    ? "bg-emerald-50 border-emerald-200 text-emerald-800"
    : "bg-red-50 border-red-200 text-red-800";
  const Icon = isSuccess ? CheckCircle : AlertCircle;
  const iconColor = isSuccess ? "text-emerald-500" : "text-red-500";

  return (
    <div className={`${baseClasses} ${typeClasses}`} role="alert">
      <div className="flex-shrink-0">
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      <div className="ml-3 flex-1 pt-0.5">
        <p className="text-sm font-bold">{title}</p>
        <p className="text-sm mt-1 opacity-90">{message}</p>

        {/* エラーからの回復手段を提供するアクションボタン (人間中心設計: 復帰のしやすさ) */}
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className={`mt-3 text-sm font-semibold hover:underline flex items-center ${isSuccess ? "text-emerald-700" : "text-red-700"}`}
          >
            {actionLabel} <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        )}
      </div>
      <div className="ml-4 flex-shrink-0 flex">
        {/* 手動で閉じるボタン (人間中心設計: ユーザーへのコントロール付与) */}
        <button
          onClick={onClose}
          className="inline-flex rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-emerald-50 focus:ring-emerald-600 opacity-50 hover:opacity-100 transition-opacity"
          aria-label="閉じる"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// --- メインアプリケーションコンポーネント ---
export default function App() {
  const [flash, setFlash] = useState(null); // { type, title, message, actionLabel, onAction }
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const closeFlash = useCallback(() => {
    setFlash(null);
  }, []);

  // 成功時のシミュレーション
  const simulateSuccessUpload = () => {
    setIsUploading(true);
    setFlash(null);
    setUploadProgress(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        setFlash({
          type: "success",
          title: "アップロード完了",
          message: "プロフィール画像が正常に更新されました。",
          // 成功時はアクション不要なことが多いが、必要に応じて「確認する」などを入れる
        });
      }
    }, 200);
  };

  // エラー時のシミュレーション
  const simulateErrorUpload = () => {
    setIsUploading(true);
    setFlash(null);
    setUploadProgress(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 15;
      setUploadProgress(progress);
      if (progress >= 45) {
        // 途中でエラー発生
        clearInterval(interval);
        setIsUploading(false);
        setUploadProgress(0);
        setFlash({
          type: "error",
          title: "アップロード失敗",
          message:
            "ネットワーク接続が途切れました。通信環境を確認してください。",
          actionLabel: "再試行する",
          onAction: () => simulateErrorUpload(), // 再試行のアクション
        });
      }
    }, 200);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans text-gray-800">
      {/* スマートフォンのモックアップ枠 */}
      <div className="w-full max-w-[375px] h-[812px] bg-white rounded-[40px] shadow-2xl relative overflow-hidden border-[8px] border-gray-900 flex flex-col">
        {/* ステータスバー (モック) */}
        <div className="h-12 w-full flex justify-between items-center px-6 text-xs font-medium text-gray-900 absolute top-0 z-10 bg-white/80 backdrop-blur-sm">
          <span>9:41</span>
          <div className="flex gap-2">
            <div className="w-4 h-3 bg-gray-900 rounded-sm"></div>
            <div className="w-3 h-3 bg-gray-900 rounded-full"></div>
            <div className="w-5 h-3 bg-gray-900 rounded-sm"></div>
          </div>
        </div>

        {/* ヘッダー */}
        <div className="pt-16 pb-4 px-6 border-b border-gray-100">
          <h1 className="text-2xl font-extrabold tracking-tight">
            プロフィール設定
          </h1>
        </div>

        {/* メインコンテンツエリア */}
        <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
          <div className="space-y-8">
            {/* アバターアップロードUI */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-4 relative group cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors">
                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-medium text-blue-600 mb-1">
                      {uploadProgress}%
                    </span>
                    <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 transition-all duration-200"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <FileImage className="w-10 h-10 text-gray-400 group-hover:text-blue-500 transition-colors" />
                )}
              </div>
              <p className="text-sm font-medium text-gray-600">
                新しい画像をタップして選択
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  表示名
                </label>
                <div className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-700">
                  山田 太郎
                </div>
              </div>
            </div>

            {/* テスト用のトリガーボタン群 (通常は隠れているか、別のUIに統合される) */}
            <div className="mt-12 p-4 bg-gray-50 rounded-2xl border border-gray-200 border-dashed">
              <p className="text-xs text-gray-500 mb-3 font-semibold text-center">
                UIテスト用トリガー
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={simulateSuccessUpload}
                  disabled={isUploading}
                  className="w-full flex items-center justify-center py-3 px-4 bg-gray-900 text-white rounded-xl font-semibold text-sm hover:bg-gray-800 active:scale-95 transition-all disabled:opacity-50"
                >
                  <UploadCloud className="w-4 h-4 mr-2" />
                  アップロード成功をテスト
                </button>
                <button
                  onClick={simulateErrorUpload}
                  disabled={isUploading}
                  className="w-full flex items-center justify-center py-3 px-4 bg-white text-gray-900 border border-gray-300 rounded-xl font-semibold text-sm hover:bg-gray-50 active:scale-95 transition-all disabled:opacity-50"
                >
                  <AlertCircle className="w-4 h-4 mr-2" />
                  アップロード失敗をテスト
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* フラッシュメッセージエリア (画面下部に固定) */}
        {/* 人間中心設計: スマホ操作時に指が届きやすく、視線が自然に落ちる画面下部に配置 */}
        <div className="absolute bottom-8 left-0 right-0 px-4 z-50 pointer-events-none">
          <div className="pointer-events-auto">
            {flash && (
              <FlashMessage
                type={flash.type}
                title={flash.title}
                message={flash.message}
                actionLabel={flash.actionLabel}
                onAction={flash.onAction}
                onClose={closeFlash}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
