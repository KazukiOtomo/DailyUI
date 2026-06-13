import React, { useState } from "react";
import {
  X,
  Download,
  Coffee,
  CheckCircle,
  CreditCard,
  Headphones,
  RotateCcw,
  Instagram,
  Twitter,
  Facebook,
  Loader2,
  Check,
} from "lucide-react";

const receiptEdgeStyle = {
  height: "12px",
  background:
    "linear-gradient(-45deg, transparent 8px, #ffffff 8px), linear-gradient(45deg, transparent 8px, #ffffff 8px)",
  backgroundPosition: "left bottom",
  backgroundRepeat: "repeat-x",
  backgroundSize: "16px 16px",
  position: "relative",
  zIndex: 10,
};

export default function Day17() {
  const [downloadState, setDownloadState] = useState("idle");

  const handleDownload = () => {
    if (downloadState !== "idle") return;
    setDownloadState("loading");
    setTimeout(() => {
      setDownloadState("done");
      setTimeout(() => setDownloadState("idle"), 2000);
    }, 1000);
  };

  const DownloadIcon = () => {
    if (downloadState === "loading") return <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />;
    if (downloadState === "done") return <Check className="w-5 h-5 text-green-500" />;
    return <Download className="w-5 h-5" />;
  };

  return (
    <div className="antialiased text-gray-800 bg-gray-100 min-h-screen flex justify-center items-center p-5">
      <div
        className="w-full max-w-sm bg-gray-50 flex flex-col rounded-3xl shadow-xl overflow-hidden"
        style={{ height: "85vh", maxHeight: "800px", animation: "slideUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards" }}
      >
        <style>{`
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}</style>

        {/* Header */}
        <header className="bg-white px-6 py-4 flex justify-between items-center border-b border-gray-100 z-20 sticky top-0 shadow-sm">
          <button className="text-gray-500 hover:text-gray-900 transition-colors" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Receipt</h1>
          <button
            onClick={handleDownload}
            className="text-gray-500 hover:text-indigo-600 transition-colors"
            aria-label="Download"
          >
            <DownloadIcon />
          </button>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-4 pb-8">

          {/* Receipt paper */}
          <div className="bg-white rounded-t-xl shadow-sm pt-6 pb-2 px-6">

            {/* Store header */}
            <div className="flex flex-col items-center mb-6 text-center">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-3 shadow-inner">
                <Coffee className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Artisan Brew Co.</h2>
              <p className="text-sm text-gray-500 mt-1">123 Roaster Ave, Seattle, WA</p>
              <p className="text-xs text-gray-400 mt-0.5">+1 (555) 123-4567 • artisanbrew.co</p>
            </div>

            {/* Success badge */}
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <CheckCircle className="w-4 h-4 mr-2" /> Payment Successful
              </span>
            </div>

            {/* Date & Receipt No */}
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Date & Time</p>
                <p className="text-sm font-medium">Oct 24, 2023 • 09:41 AM</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Receipt No.</p>
                <p className="text-sm font-mono font-medium text-indigo-600">#AB-8472-9X</p>
              </div>
            </div>

            <div className="border-t-2 border-dashed border-gray-200 my-6" />

            {/* Items */}
            <div className="mb-2">
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-4">Items</p>

              {[
                { img: "Coffee", name: "Ethiopia Yirgacheffe Beans", sub: "Whole Bean • 250g", price: "$18.50" },
                { img: "Latte", name: "Oat Milk Latte", sub: "Large • Iced", price: "$5.75" },
              ].map((item) => (
                <div key={item.name} className="flex justify-between items-start mb-4">
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                      <img
                        src={`https://placehold.co/100x100/e2e8f0/64748b?text=${item.img}`}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-2">
                    <p className="text-sm font-semibold">{item.price}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Qty: 1</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-dashed border-gray-200 my-6" />

            {/* Totals */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm text-gray-600"><p>Subtotal</p><p>$24.25</p></div>
              <div className="flex justify-between text-sm text-gray-600"><p>Tax (8.5%)</p><p>$2.06</p></div>
              <div className="flex justify-between text-sm text-green-600 font-medium"><p>Loyalty Discount</p><p>-$1.50</p></div>
              <div className="flex justify-between items-center pt-3 mt-3 border-t border-gray-100">
                <p className="text-base font-bold text-gray-900">Total Paid</p>
                <p className="text-2xl font-bold text-gray-900">$24.81</p>
              </div>
            </div>

            {/* Payment info */}
            <div className="bg-gray-50 rounded-xl p-4 mb-2 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-white p-1.5 rounded shadow-sm border border-gray-100 text-blue-600">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Visa ending in 4242</p>
                  <p className="text-xs text-gray-500">Contactless • Apple Pay</p>
                </div>
              </div>
            </div>
          </div>

          {/* Zigzag receipt edge */}
          <div style={receiptEdgeStyle} />

          {/* Post-purchase section */}
          <div className="mt-6 space-y-4">

            {/* Promo card */}
            <div className="bg-indigo-600 rounded-xl p-5 text-white shadow-md relative overflow-hidden">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-indigo-500 rounded-full opacity-50" />
              <div className="relative z-10 flex justify-between items-center">
                <div className="pr-4">
                  <h3 className="font-bold text-lg mb-1">Get 10% Off</h3>
                  <p className="text-indigo-100 text-sm mb-3">
                    Scan to take our 1-min survey and earn a reward for your next visit!
                  </p>
                  <button className="bg-white text-indigo-600 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-indigo-50 transition-colors shadow-sm">
                    Rate Us
                  </button>
                </div>
                <div className="bg-white p-2 rounded-lg shrink-0 shadow-sm">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=https://example.com/survey"
                    alt="Survey QR Code"
                    className="w-16 h-16"
                  />
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all shadow-sm text-gray-700">
                <Headphones className="w-5 h-5 text-indigo-500 mb-1.5" />
                <span className="text-xs font-semibold">Need Help?</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all shadow-sm text-gray-700">
                <RotateCcw className="w-5 h-5 text-indigo-500 mb-1.5" />
                <span className="text-xs font-semibold">Order Again</span>
              </button>
            </div>

            {/* Footer */}
            <div className="text-center mt-6 mb-2">
              <div className="flex justify-center gap-4 mb-3 text-gray-400">
                <a href="#" className="hover:text-indigo-600 transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="hover:text-indigo-600 transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="hover:text-indigo-600 transition-colors"><Facebook className="w-5 h-5" /></a>
              </div>
              <p className="text-xs text-gray-400">Thank you for supporting local business!</p>
              <div className="mt-2 text-[10px] text-gray-400 flex justify-center gap-2">
                <a href="#" className="underline">Terms</a>
                <span>|</span>
                <a href="#" className="underline">Privacy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
