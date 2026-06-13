import React from "react";
import {
  PlaneTakeoff, Plane, Signal, Wifi, Battery, User,
  Maximize2, Crown, ChevronRight, Ticket, Compass, Bell, Wallet,
} from "lucide-react";

export default function Day24() {
  return (
    <div className="bg-gray-200 flex justify-center items-center min-h-screen p-4">
      <style>{`
        .ticket-divider {
          position: relative;
          border-top: 2px dashed #D1D5DB;
          margin: 0 20px;
        }
        .ticket-divider::before, .ticket-divider::after {
          content: '';
          position: absolute;
          top: -10px;
          width: 20px; height: 20px;
          background-color: #F3F4F6;
          border-radius: 50%;
        }
        .ticket-divider::before { left: -30px; }
        .ticket-divider::after { right: -30px; }
        .scan-line {
          width: 100%; height: 2px;
          background-color: rgba(30,58,138,0.5);
          position: absolute; top: 0; left: 0;
          animation: qrscan 2.5s infinite linear;
          box-shadow: 0 0 10px rgba(30,58,138,0.8);
          display: none;
        }
        .qr-container:hover .scan-line { display: block; }
        @keyframes qrscan {
          0% { top: 0; } 50% { top: 100%; } 100% { top: 0; }
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Phone mockup */}
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          width: "100%", maxWidth: "390px", height: "844px",
          backgroundColor: "#F3F4F6", borderRadius: "40px",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25), inset 0 0 0 8px #1F2937",
        }}
      >
        {/* Dynamic Island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-[15px] z-50" />

        {/* Status bar */}
        <div className="w-full flex justify-between items-center px-6 pt-4 pb-2 text-xs font-semibold text-gray-800 z-40 relative">
          <span>9:41</span>
          <div className="flex space-x-2">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto hide-scrollbar pb-24 relative">

          {/* App header */}
          <header className="px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center">
                <PlaneTakeoff className="w-4 h-4" />
              </div>
              <span className="font-bold text-gray-900 tracking-tight">Nexus Airlines</span>
            </div>
            <button className="text-blue-900 font-semibold text-sm bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition">
              Help
            </button>
          </header>

          <div className="px-5 mt-2">
            {/* Flight status */}
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
              </span>
              <span className="text-sm font-semibold text-green-600 uppercase tracking-wider">On Time</span>
            </div>

            {/* Ticket card */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

              {/* Ticket header (blue route section) */}
              <div className="bg-blue-900 text-white p-6 pb-8 rounded-b-3xl relative">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-blue-200 text-xs font-medium mb-1 uppercase tracking-wider">Tokyo</p>
                    <h2 className="text-4xl font-extrabold tracking-tighter">HND</h2>
                  </div>
                  <div className="flex flex-col items-center flex-1 px-4">
                    <p className="text-blue-200 text-xs font-medium mb-1">Direct • 13h 15m</p>
                    <div className="w-full flex items-center justify-between relative mt-2">
                      <div className="w-2 h-2 rounded-full border-2 border-white bg-blue-900 z-10" />
                      <div className="flex-1 border-t-2 border-dashed border-blue-400/50 absolute w-full top-1/2 -translate-y-1/2" />
                      <Plane className="text-white z-10 w-5 h-5 absolute left-1/2 -translate-x-1/2" />
                      <div className="w-2 h-2 rounded-full border-2 border-white bg-blue-900 z-10" />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-200 text-xs font-medium mb-1 uppercase tracking-wider">New York</p>
                    <h2 className="text-4xl font-extrabold tracking-tighter">JFK</h2>
                  </div>
                </div>
                <div className="flex justify-between mt-6 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                  <div>
                    <p className="text-blue-200 text-[10px] uppercase font-semibold">Date</p>
                    <p className="font-semibold text-sm">Oct 24, 2026</p>
                  </div>
                  <div className="text-center">
                    <p className="text-blue-200 text-[10px] uppercase font-semibold">Flight</p>
                    <p className="font-semibold text-sm">NX 104</p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-200 text-[10px] uppercase font-semibold">Terminal</p>
                    <p className="font-semibold text-sm">T3</p>
                  </div>
                </div>
              </div>

              {/* Boarding info */}
              <div className="p-6 bg-white -mt-4 rounded-t-3xl relative z-10">
                <p className="text-xs text-gray-500 font-semibold mb-3 uppercase tracking-wider text-center">Boarding Information</p>
                <div className="flex justify-between items-center mb-6">
                  <div className="bg-amber-50 border border-amber-300/30 rounded-2xl p-3 w-1/3 text-center shadow-sm">
                    <p className="text-amber-500 text-[10px] uppercase font-bold tracking-wider mb-1">Boarding</p>
                    <p className="text-xl font-black text-gray-900">09:15</p>
                    <p className="text-[9px] text-gray-500 mt-0.5">Closes 09:45</p>
                  </div>
                  <div className="w-1/3 text-center border-r border-gray-100">
                    <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">Gate</p>
                    <p className="text-3xl font-black text-blue-900">42B</p>
                  </div>
                  <div className="w-1/3 text-center">
                    <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">Seat</p>
                    <p className="text-3xl font-black text-blue-900">14A</p>
                  </div>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Passenger</p>
                      <p className="text-sm font-bold text-gray-800">Taro Yamada</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Class / Zone</p>
                    <p className="text-sm font-bold text-gray-800">Economy / <span className="text-blue-900">Zone 2</span></p>
                  </div>
                </div>
              </div>

              {/* Ticket divider (perforated) */}
              <div className="ticket-divider" />

              {/* QR / Barcode section */}
              <div className="p-6 bg-white flex flex-col items-center">
                <p className="text-xs text-gray-500 font-medium mb-4">Have this ready for boarding</p>
                <div className="qr-container bg-white border-2 border-gray-100 p-2 rounded-xl relative overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition-shadow">
                  <svg width="140" height="140" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100" height="100" fill="#ffffff" />
                    <path d="M10,10 h25 v25 h-25 z M15,15 h15 v15 h-15 z M10,65 h25 v25 h-25 z M15,70 h15 v15 h-15 z M65,10 h25 v25 h-25 z M70,15 h15 v15 h-15 z M45,10 h10 v10 h-10 z M45,25 h10 v25 h-10 z M10,45 h25 v10 h-25 z M65,45 h25 v10 h-25 z M45,60 h10 v30 h-10 z M65,65 h10 v10 h-10 z M80,65 h10 v25 h-10 z M65,80 h10 v10 h-10 z M20,20 h5 v5 h-5 z M20,75 h5 v5 h-5 z M75,20 h5 v5 h-5 z" fill="#111827" />
                    <rect x="40" y="40" width="5" height="5" fill="#111827" />
                    <rect x="50" y="45" width="10" height="5" fill="#111827" />
                    <rect x="35" y="60" width="5" height="15" fill="#111827" />
                    <rect x="60" y="55" width="5" height="5" fill="#111827" />
                  </svg>
                  <div className="scan-line" />
                  <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-black/70 text-white text-[10px] px-2 py-1 rounded-md font-medium flex items-center gap-1">
                      <Maximize2 className="w-3 h-3" /> Tap to Enlarge
                    </span>
                  </div>
                </div>
                <p className="text-[10px] font-mono text-gray-400 mt-3 tracking-widest">NX-847291004A</p>
                <button className="mt-5 w-full bg-black text-white rounded-xl py-3.5 flex items-center justify-center space-x-2 font-semibold text-sm hover:bg-gray-800 transition active:scale-[0.98]">
                  <Wallet className="w-5 h-5" />
                  <span>Add to Apple Wallet</span>
                </button>
              </div>
            </div>

            {/* Offers section */}
            <div className="mt-6 mb-8">
              <h3 className="text-sm font-bold text-gray-800 mb-3 ml-2">Offers & Information</h3>
              <div className="bg-white rounded-2xl p-4 shadow-sm mb-3 flex items-center justify-between border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 text-white flex items-center justify-center shadow-inner">
                    <Crown className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Nexus Platinum Member</p>
                    <p className="text-sm font-bold text-gray-800">142,500 Miles</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </div>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex">
                <div className="w-1/3 relative" style={{ minHeight: "100px" }}>
                  <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Hotel Room" className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="w-2/3 p-4">
                  <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-900 text-[9px] font-bold uppercase tracking-wider rounded mb-1">Partner Offer</span>
                  <p className="text-sm font-bold text-gray-800 leading-tight mb-1">Save 20% on NYC Hotels</p>
                  <p className="text-xs text-gray-500 line-clamp-2">Book with Nexus Partners and earn double miles on your stay in New York.</p>
                  <a href="#" className="inline-block mt-2 text-blue-900 text-xs font-bold hover:underline">Book Now →</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom nav */}
        <div className="absolute bottom-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-200 pb-8 pt-4 px-6 flex justify-between items-center z-50">
          {[
            { icon: <Ticket className="w-5 h-5" />, label: "Trips", active: true },
            { icon: <Compass className="w-5 h-5" />, label: "Explore", active: false },
            { icon: <Bell className="w-5 h-5" />, label: "Alerts", active: false },
            { icon: <User className="w-5 h-5" />, label: "Profile", active: false },
          ].map((item) => (
            <div key={item.label} className={`flex flex-col items-center ${item.active ? "text-blue-900" : "text-gray-400"}`}>
              {item.icon}
              <span className="text-[10px] font-semibold mt-1">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
