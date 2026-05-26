import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  Heart,
  Home,
  Search,
  User,
  ChevronLeft,
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Check,
} from "lucide-react";

// --- モックデータ ---
const PRODUCTS = [
  {
    id: 1,
    name: "ラベンダー＆ハニーソープ",
    price: 1200,
    category: "石鹸",
    rating: 4.8,
    reviews: 124,
    image:
      "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "リラックス効果の高いラベンダー精油と、保湿力に優れた生ハチミツをブレンド。洗い上がりはしっとりなめらかで、乾燥肌の方に特におすすめです。",
    ingredients:
      "オリーブ果実油、水、パーム油、ヤシ油、水酸化Na、ハチミツ、ラベンダー油、シア脂",
  },
  {
    id: 2,
    name: "オーツミルク＆カモミール",
    price: 1350,
    category: "石鹸",
    rating: 4.9,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "敏感肌を優しく包み込むオーツミルクとカモミールの安らぐ香り。赤ちゃんから大人まで、家族全員で使える優しい石鹸です。",
    ingredients:
      "オリーブ果実油、水、ヤシ油、パーム油、水酸化Na、カラスムギ穀粒エキス、カミツレ花エキス",
  },
  {
    id: 3,
    name: "ローズマリー＆クレイ",
    price: 1100,
    category: "石鹸",
    rating: 4.6,
    reviews: 56,
    image:
      "https://images.unsplash.com/photo-1612260029302-3c72688f9a26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "毛穴の汚れをしっかり吸着する天然クレイと、スッキリとしたローズマリーの香り。オイリー肌や夏の時期に最適です。",
    ingredients:
      "オリーブ果実油、水、ヤシ油、パーム油、水酸化Na、モンモリロナイト（クレイ）、ローズマリー葉油",
  },
  {
    id: 4,
    name: "ボタニカルボディオイル",
    price: 2800,
    category: "保湿",
    rating: 4.7,
    reviews: 210,
    image:
      "https://images.unsplash.com/photo-1629198728664-9cb3fb01221e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "厳選された植物オイルをブレンド。お風呂上がりの濡れた肌に伸ばすことで、水分を閉じ込め、もっちりとした肌へ導きます。",
    ingredients:
      "ホホバ種子油、スクワラン、アーモンド油、トコフェロール、ベルガモット果皮油",
  },
];

const CATEGORIES = ["すべて", "石鹸", "保湿", "ギフト", "新作"];

export default function App() {
  const [currentView, setCurrentView] = useState("home"); // 'home', 'detail', 'cart'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState("すべて");
  const [toast, setToast] = useState(null);

  // --- カート操作 ---
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { ...product, quantity }];
    });
    showToast(`${product.name}をカートに追加しました`);
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  // --- HCD: スマホの枠を模したコンテナ（PCブラウザプレビュー用） ---
  return (
    <div className="flex justify-center items-center min-h-screen bg-stone-200 p-4 font-sans text-stone-800">
      <div className="w-full max-w-[400px] h-[800px] bg-stone-50 rounded-[40px] shadow-2xl overflow-hidden relative flex flex-col border-[8px] border-stone-900">
        {/* --- トースト通知 (HCD: ユーザーの操作に対する明確なフィードバック) --- */}
        {toast && (
          <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg transition-all animate-fade-in-down flex items-center gap-2 w-max max-w-[90%]">
            <Check size={16} className="text-emerald-400" />
            <span className="truncate">{toast}</span>
          </div>
        )}

        {/* --- ビューのルーティング --- */}
        {currentView === "home" && (
          <HomeView
            onProductClick={(p) => {
              setSelectedProduct(p);
              setCurrentView("detail");
            }}
            cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            onCartClick={() => setCurrentView("cart")}
          />
        )}

        {currentView === "detail" && selectedProduct && (
          <ProductDetailView
            product={selectedProduct}
            onBack={() => setCurrentView("home")}
            onAddToCart={addToCart}
            cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
            onCartClick={() => setCurrentView("cart")}
          />
        )}

        {currentView === "cart" && (
          <CartView
            cart={cart}
            setCart={setCart}
            onBack={() => setCurrentView("home")}
          />
        )}

        {/* --- ボトムナビゲーション (HCD: 親指で届く範囲に主要アクションを配置) --- */}
        {currentView !== "cart" && (
          <nav className="bg-white border-t border-stone-200 px-6 py-4 flex justify-between items-center z-10 pb-6 rounded-b-[32px]">
            <NavItem
              icon={<Home size={24} />}
              label="ホーム"
              active={currentView === "home"}
              onClick={() => setCurrentView("home")}
            />
            <NavItem icon={<Search size={24} />} label="探す" />
            <NavItem icon={<Heart size={24} />} label="お気に入り" />
            <NavItem icon={<User size={24} />} label="マイページ" />
          </nav>
        )}
      </div>
    </div>
  );
}

// ==========================================
// Views
// ==========================================

function HomeView({
  onProductClick,
  cartCount,
  activeCategory,
  setActiveCategory,
  onCartClick,
}) {
  const filteredProducts =
    activeCategory === "すべて"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col">
      {/* ヘッダー (HCD: シンプルでブランドロゴを中央に、カートは右上に固定) */}
      <header className="px-6 pt-12 pb-4 flex justify-between items-center bg-stone-50 sticky top-0 z-10">
        <div className="w-10"></div> {/* バランス用スペーサー */}
        <h1 className="text-xl font-serif font-bold tracking-wide text-emerald-900">
          NatureBloom
        </h1>
        <button
          onClick={onCartClick}
          className="relative p-2 -mr-2 text-stone-600 hover:text-emerald-700 transition-colors"
        >
          <ShoppingBag size={24} />
          {cartCount > 0 && (
            <span className="absolute top-1 right-1 bg-emerald-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </header>

      {/* ヒーローバナー */}
      <div className="px-6 mb-8 mt-2">
        <div className="bg-emerald-800 rounded-2xl p-6 text-white relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1542038383-745973b06346?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="relative z-10">
            <span className="text-xs font-semibold tracking-wider text-emerald-200 mb-2 block">
              NEW ARRIVAL
            </span>
            <h2 className="text-2xl font-serif font-medium leading-tight mb-4">
              春の新作
              <br />
              ミモザの香り
            </h2>
            <button className="bg-white text-emerald-900 px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm hover:bg-stone-100 transition-colors">
              詳細を見る
            </button>
          </div>
        </div>
      </div>

      {/* カテゴリーフィルター (HCD: 横スクロールで選択肢を提示、現在位置を明確に) */}
      <div className="px-6 mb-6">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-emerald-800 text-white shadow-md"
                  : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 商品グリッド (HCD: タップしやすい大きな画像、価格の明確化) */}
      <div className="px-6 pb-8 grid grid-cols-2 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group cursor-pointer"
            onClick={() => onProductClick(product)}
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden mb-3 bg-stone-200">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <button
                className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full text-stone-400 hover:text-rose-500 transition-colors"
                onClick={(e) => {
                  e.stopPropagation(); /* お気に入りロジック */
                }}
              >
                <Heart size={18} />
              </button>
            </div>
            <h3 className="text-sm font-medium leading-snug mb-1 text-stone-800 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-sm font-semibold text-emerald-800">
              ¥{product.price.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductDetailView({
  product,
  onBack,
  onAddToCart,
  cartCount,
  onCartClick,
}) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    setIsAdding(true);
    onAddToCart(product, quantity);
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden rounded-[32px]">
      {/* 透過ヘッダー */}
      <header className="absolute top-0 left-0 right-0 p-6 pt-12 flex justify-between items-center z-20 pointer-events-none">
        <button
          onClick={onBack}
          className="pointer-events-auto w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm text-stone-800 hover:bg-white transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={onCartClick}
          className="pointer-events-auto relative w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm text-stone-800 hover:bg-white transition-colors"
        >
          <ShoppingBag size={20} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </header>

      {/* 商品画像 */}
      <div className="w-full h-[45%] relative shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 商品情報 (スクロール可能領域) */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-6 pt-6 pb-32">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-sm text-emerald-700 font-medium mb-1">
              {product.category}
            </p>
            <h2 className="text-2xl font-serif font-bold leading-tight text-stone-900">
              {product.name}
            </h2>
          </div>
          <button className="text-stone-400 hover:text-rose-500 mt-1">
            <Heart size={24} />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-stone-700">
            {product.rating}
          </span>
          <span className="text-sm text-stone-500">
            ({product.reviews} レビュー)
          </span>
        </div>

        <p className="text-2xl font-semibold text-stone-900 mb-6">
          ¥{product.price.toLocaleString()}{" "}
          <span className="text-sm font-normal text-stone-500">税込</span>
        </p>

        <div className="space-y-6">
          <section>
            <h3 className="text-base font-semibold mb-2 border-b border-stone-100 pb-2">
              商品説明
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              {product.description}
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold mb-2 border-b border-stone-100 pb-2">
              全成分表示
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed bg-stone-50 p-4 rounded-xl border border-stone-100">
              {product.ingredients}
            </p>
          </section>
        </div>
      </div>

      {/* ボトムアクションバー (HCD: 常に下部に固定され、フィッツの法則に則り大きく押しやすい) */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-stone-100 p-6 pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] rounded-b-[32px] flex items-center gap-4">
        {/* 数量コントロール */}
        <div className="flex items-center bg-stone-100 rounded-full p-1 border border-stone-200">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 flex items-center justify-center text-stone-600 hover:bg-white rounded-full transition-colors"
          >
            <Minus size={18} />
          </button>
          <span className="w-8 text-center font-semibold text-stone-800">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 flex items-center justify-center text-stone-600 hover:bg-white rounded-full transition-colors"
          >
            <Plus size={18} />
          </button>
        </div>

        {/* カート追加ボタン (HCD: 強いコントラストで一番目立たせる) */}
        <button
          onClick={handleAdd}
          className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-full font-bold text-white transition-all duration-300 ${
            isAdding
              ? "bg-emerald-500 scale-[0.98]"
              : "bg-emerald-800 hover:bg-emerald-900 shadow-md"
          }`}
        >
          {isAdding ? <Check size={20} /> : <ShoppingCart size={20} />}
          <span>{isAdding ? "追加しました" : "カートに入れる"}</span>
        </button>
      </div>
    </div>
  );
}

function CartView({ cart, setCart, onBack }) {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 3000 ? 0 : 500;
  const total = subtotal + shipping;

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      setCart(cart.filter((item) => item.id !== id));
      return;
    }
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-stone-50 overflow-hidden rounded-[32px]">
      <header className="px-6 pt-12 pb-4 flex items-center sticky top-0 bg-stone-50 z-10 border-b border-stone-200">
        <button onClick={onBack} className="p-2 -ml-2 text-stone-800">
          <ChevronLeft size={24} />
        </button>
        <h1 className="flex-1 text-center text-lg font-bold pr-8">
          ショッピングカート
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-stone-400 gap-4">
            <ShoppingBag size={48} className="opacity-50" />
            <p>カートは空です</p>
            <button
              onClick={onBack}
              className="mt-4 px-6 py-2 bg-emerald-800 text-white rounded-full text-sm font-medium"
            >
              お買い物を続ける
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* カートアイテム一覧 */}
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-white p-3 rounded-2xl shadow-sm border border-stone-100"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl bg-stone-100"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-stone-800 line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-stone-500">
                        ¥{item.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center bg-stone-100 rounded-lg p-0.5">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-7 h-7 flex items-center justify-center text-stone-600"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-6 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-7 h-7 flex items-center justify-center text-stone-600"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="font-semibold text-emerald-800">
                        ¥{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* オーダーサマリー (HCD: 透明性の高い料金提示) */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100 space-y-3">
              <h3 className="font-bold text-stone-800 border-b border-stone-100 pb-2 mb-3">
                ご注文内訳
              </h3>
              <div className="flex justify-between text-sm text-stone-600">
                <span>小計</span>
                <span>¥{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-stone-600">
                <span>送料</span>
                <span>
                  {shipping === 0 ? "無料" : `¥${shipping.toLocaleString()}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-emerald-600 text-right">
                  ※あと ¥{(3000 - subtotal).toLocaleString()} で送料無料
                </p>
              )}
              <div className="border-t border-stone-100 pt-3 mt-3 flex justify-between items-end">
                <span className="font-bold text-stone-800">合計</span>
                <span className="text-xl font-bold text-emerald-800">
                  ¥{total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 決済ボタン */}
      {cart.length > 0 && (
        <div className="p-6 bg-white border-t border-stone-100 pb-8">
          <button className="w-full bg-stone-900 text-white py-4 rounded-full font-bold shadow-md hover:bg-stone-800 transition-colors flex justify-center items-center gap-2">
            レジへ進む
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// Utils & Shared Components
// ==========================================

function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 min-w-[64px] transition-colors ${
        active ? "text-emerald-800" : "text-stone-400 hover:text-stone-600"
      }`}
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}

// ----------------------------------------------------------------------------
// 注意: Tailwind CSS を適用するためには、環境側にTailwindがセットアップされているか、
// CDN経由で読み込まれている必要があります。
// ----------------------------------------------------------------------------
