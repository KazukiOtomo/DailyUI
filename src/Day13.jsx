import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  Phone,
  Video,
  Plus,
  Smile,
  Mic,
  Send,
  Image as ImageIcon,
  Check,
  CheckCheck,
  MoreVertical,
} from "lucide-react";

/**
 * 人間中心設計に基づくダイレクトメッセージUI
 * * - Thumb Zone (親指の可動域): 頻繁にタップする入力フィールドと送信ボタンを画面下部に配置。
 * - Tap Targets: ボタンサイズは44x44px以上を確保し、誤操作を防止。
 * - Contrast & Readability: 読みやすいフォントサイズと、視認性の高いコントラスト比を維持。
 * - Clear Feedback: 送信状態（送信中、既読）やオンライン状態を視覚的に明示。
 */

const App = () => {
  // 会話の初期データ（ソーシャルな会話を想定）
  const initialMessages = [
    {
      id: 1,
      text: "お疲れ様！今日の待ち合わせ、19時で大丈夫？",
      sender: "other",
      timestamp: "18:00",
      type: "text",
    },
    {
      id: 2,
      text: "お疲れ！ごめん、仕事が長引いてて15分くらい遅れそう🙏",
      sender: "me",
      timestamp: "18:05",
      status: "read",
      type: "text",
    },
    {
      id: 3,
      text: "了解！全然大丈夫だよー。じゃあ駅前のスタバでコーヒー飲みながら待ってるね☕️",
      sender: "other",
      timestamp: "18:06",
      type: "text",
    },
    {
      id: 4,
      text: "ありがとう！本当に助かる😭 着いたらすぐ連絡するね！",
      sender: "me",
      timestamp: "18:08",
      status: "read",
      type: "text",
    },
    {
      id: 5,
      text: "はーい、気をつけてきてね！",
      sender: "other",
      timestamp: "18:09",
      type: "text",
    },
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // 新しいメッセージが追加されたら一番下まで自動スクロールする
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputText.trim() === "") return;

    const newMessage = {
      id: Date.now(),
      text: inputText,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
      type: "text",
    };

    setMessages([...messages, newMessage]);
    setInputText("");

    // デモ用：相手からの自動返信をシミュレート
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const reply = {
          id: Date.now() + 1,
          text: "了解です！",
          sender: "other",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          type: "text",
        };
        setMessages((prev) => [...prev, reply]);

        // 自分の直前のメッセージを「既読」にするシミュレーション
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessage.id ? { ...msg, status: "read" } : msg,
          ),
        );
      }, 2000);
    }, 1000);
  };

  // メッセージの送信状態（チェックマーク）を描画
  const renderMessageStatus = (status) => {
    if (status === "read") {
      return <CheckCheck className="w-4 h-4 text-blue-500 inline-block ml-1" />;
    }
    return <Check className="w-4 h-4 text-gray-400 inline-block ml-1" />;
  };

  return (
    // スマートフォンの画面サイズをシミュレートするコンテナ
    <div className="flex justify-center bg-gray-100 min-h-screen font-sans sm:p-4">
      <div className="w-full max-w-[400px] h-[100dvh] sm:h-[800px] bg-white sm:rounded-[40px] sm:shadow-2xl overflow-hidden flex flex-col relative sm:border-[8px] sm:border-gray-900">
        {/* --- ヘッダー領域 --- 
            常に上部に固定。相手の情報と主要アクション（通話など）を配置し、
            「誰と話しているか」というコンテキストを常に明示する。
        */}
        <header className="bg-white border-b border-gray-100 flex items-center justify-between px-4 py-3 z-10 shadow-sm">
          <div className="flex items-center gap-3">
            {/* 戻るボタン：左上に配置し、親指が届きにくい位置だがナビゲーションの標準位置 */}
            <button className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors active:bg-gray-200">
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>

            {/* プロフィール情報 */}
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <img
                  src="https://api.dicebear.com/7.x/notionists/svg?seed=Yuki&backgroundColor=e2e8f0"
                  alt="佐藤 由紀"
                  className="w-10 h-10 rounded-full object-cover border border-gray-200 bg-gray-50"
                />
                {/* オンライン状態のインジケーター */}
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-900 text-base leading-tight">
                  佐藤 由紀
                </span>
                <span className="text-xs text-green-600 font-medium">
                  オンライン
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button className="p-2.5 rounded-full text-gray-600 hover:bg-gray-100 transition-colors">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2.5 rounded-full text-gray-600 hover:bg-gray-100 transition-colors">
              <Video className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* --- チャット履歴領域 --- 
            十分な余白を持たせ、メッセージの可読性を高める。
        */}
        <main className="flex-1 overflow-y-auto p-4 bg-[#F8F9FA] flex flex-col gap-4">
          {/* 日付の区切り線 */}
          <div className="flex justify-center my-2">
            <span className="text-xs text-gray-500 bg-gray-200/60 px-3 py-1 rounded-full font-medium">
              今日
            </span>
          </div>

          {messages.map((msg, index) => {
            const isMe = msg.sender === "me";
            // 連続するメッセージの角丸を変えるためのロジック（HCD的ディテール）
            const showAvatar =
              !isMe &&
              (index === messages.length - 1 ||
                messages[index + 1]?.sender !== "other");

            return (
              <div
                key={msg.id}
                className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}
              >
                {!isMe && (
                  <div className="w-8 h-8 mr-2 flex-shrink-0 flex items-end">
                    {showAvatar ? (
                      <img
                        src="https://api.dicebear.com/7.x/notionists/svg?seed=Yuki&backgroundColor=e2e8f0"
                        alt="佐藤 由紀"
                        className="w-8 h-8 rounded-full border border-gray-200 bg-gray-50"
                      />
                    ) : (
                      <div className="w-8 h-8"></div> // アバターのプレースホルダー
                    )}
                  </div>
                )}

                <div
                  className={`flex flex-col ${isMe ? "items-end" : "items-start"} max-w-[75%]`}
                >
                  {/* メッセージバブル */}
                  <div
                    className={`
                      px-4 py-2.5 text-[15px] leading-relaxed shadow-sm
                      ${
                        isMe
                          ? "bg-blue-600 text-white rounded-2xl rounded-br-sm" // 自分：視認性の高いアクセントカラー
                          : "bg-white text-gray-800 rounded-2xl rounded-bl-sm border border-gray-100" // 相手：ニュートラルな色
                      }
                    `}
                    style={{ wordBreak: "break-word" }}
                  >
                    {msg.text}
                  </div>

                  {/* メタデータ（時間と既読ステータス） */}
                  <div className="flex items-center mt-1 space-x-1 px-1">
                    <span className="text-[11px] text-gray-500">
                      {msg.timestamp}
                    </span>
                    {isMe && renderMessageStatus(msg.status)}
                  </div>
                </div>
              </div>
            );
          })}

          {/* タイピングインジケーター */}
          {isTyping && (
            <div className="flex w-full justify-start items-end">
              <div className="w-8 h-8 mr-2 flex-shrink-0">
                <img
                  src="https://api.dicebear.com/7.x/notionists/svg?seed=Yuki&backgroundColor=e2e8f0"
                  alt="佐藤 由紀"
                  className="w-8 h-8 rounded-full border border-gray-200 bg-gray-50"
                />
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex items-center space-x-1.5">
                <div
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} className="h-2" />
        </main>

        {/* --- 入力領域 (Thumb Zone) --- 
            片手で操作しやすいように画面最下部に配置。
            入力フィールドはタップしやすい大きさを確保。
        */}
        <footer className="bg-white border-t border-gray-200 p-3 pb-safe sm:pb-4 flex items-end gap-2 shadow-[0_-4px_10px_rgba(0,0,0,0.02)] z-10">
          <button
            type="button"
            className="p-2.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors flex-shrink-0 mb-0.5"
            aria-label="メニューを追加"
          >
            <Plus className="w-6 h-6" />
          </button>

          {/* 入力フォーム */}
          <form
            onSubmit={handleSendMessage}
            className="flex-1 flex items-center bg-gray-100 rounded-3xl pr-1.5 border border-transparent focus-within:border-blue-200 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all"
          >
            <button
              type="button"
              className="p-2.5 pl-3 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="絵文字"
            >
              <Smile className="w-5 h-5" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="メッセージを入力..."
              className="flex-1 bg-transparent border-none focus:ring-0 py-3 px-1 text-[15px] text-gray-900 placeholder-gray-500"
            />

            {/* テキストが入力されていない場合はマイク、入力されている場合は送信ボタンを表示。
                文脈に応じたUIの変化で認知負荷を下げる。
            */}
            {inputText.trim() === "" ? (
              <button
                type="button"
                className="p-2 text-gray-500 hover:text-blue-600 transition-colors mr-1"
                aria-label="音声入力"
              >
                <Mic className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="submit"
                className="p-2 m-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-transform active:scale-95 shadow-md flex items-center justify-center"
                aria-label="送信"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            )}
          </form>
        </footer>
      </div>
    </div>
  );
};

export default App;
