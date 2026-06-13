import React, { useState, useCallback } from "react";
import {
  Cloud, Thermometer, Droplets, ShieldCheck, DoorOpen,
  Video, Lightbulb, Wind, Tv, ChevronRight, Plus, Home,
  LayoutGrid, BarChart2, Settings, Mic, Camera, X,
  Info, TrendingDown, BellRing, Sofa, Bed,
} from "lucide-react";

const glassCard = {
  background: "rgba(255,255,255,0.8)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255,255,255,0.3)",
  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
  transition: "transform 0.2s",
};

function Toggle({ checked, onChange }) {
  return (
    <div
      onClick={onChange}
      className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors flex-shrink-0 ${checked ? "bg-blue-500" : "bg-slate-300"}`}
    >
      <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-6" : "translate-x-0"}`} />
    </div>
  );
}

export default function Day21() {
  const [doorLocked, setDoorLocked] = useState(true);
  const [livingRoomOn, setLivingRoomOn] = useState(true);
  const [lightValue, setLightValue] = useState(75);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((msg, duration = 3000) => {
    setToast(msg);
    setTimeout(() => setToast(null), duration);
  }, []);

  const handleDoorToggle = () => {
    const next = !doorLocked;
    setDoorLocked(next);
    showToast(next ? "Front door locked securely." : "Warning: Front door unlocked.", next ? 3000 : 4000);
  };

  const sliderBg = `linear-gradient(to right, #3b82f6 ${lightValue}%, #e2e8f0 ${lightValue}%)`;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start sm:items-center text-gray-800 antialiased">
      <style>{`
        .day21-slider { -webkit-appearance: none; background: transparent; width: 100%; }
        .day21-slider:focus { outline: none; }
        .day21-slider::-webkit-slider-thumb {
          -webkit-appearance: none; height: 20px; width: 20px;
          border-radius: 50%; background: #fff; cursor: pointer;
          margin-top: -8px; box-shadow: 0 2px 4px rgba(0,0,0,.2);
          border: 2px solid #3b82f6;
        }
        .day21-slider::-webkit-slider-runnable-track {
          height: 4px; cursor: pointer; border-radius: 2px;
        }
      `}</style>

      <div className="w-full max-w-md bg-gray-50 flex flex-col h-screen sm:h-[850px] sm:rounded-3xl sm:border-8 border-gray-900 sm:shadow-2xl overflow-hidden relative">

        {/* Header */}
        <header className="p-6 pb-2 bg-gradient-to-b from-blue-50 to-gray-50 sticky top-0 z-10">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Home</h1>
              <p className="text-sm text-gray-500 font-medium">Good Evening, Gemini</p>
            </div>
            <div className="relative">
              <img src="https://ui-avatars.com/api/?name=Gemini&background=0D8ABC&color=fff&rounded=true" alt="Profile" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6" style={{ scrollbarWidth: "none" }}>
            {[
              { icon: <Cloud className="w-5 h-5" />, bg: "bg-blue-100 text-blue-600", label: "Outside", value: "18°C" },
              { icon: <Thermometer className="w-5 h-5" />, bg: "bg-orange-100 text-orange-600", label: "Indoor", value: "22°C" },
              { icon: <Droplets className="w-5 h-5" />, bg: "bg-teal-100 text-teal-600", label: "Humidity", value: "45%" },
            ].map((item) => (
              <div key={item.label} className="flex-shrink-0 flex items-center gap-3 bg-white px-4 py-3 rounded-2xl shadow-sm border border-gray-100 min-w-[140px]">
                <div className={`p-2 rounded-full ${item.bg}`}>{item.icon}</div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">{item.label}</p>
                  <p className="text-lg font-semibold">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </header>

        {/* Scrollable main */}
        <main className="flex-1 overflow-y-auto p-6 pt-2 space-y-6">

          {/* Security */}
          <section>
            <div className="flex justify-between items-end mb-3">
              <h2 className="text-lg font-bold text-gray-800">Security</h2>
              <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Armed
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl p-4 flex flex-col justify-between h-32 relative overflow-hidden" style={glassCard}>
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-100 to-transparent rounded-bl-full opacity-50" />
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-2xl"><DoorOpen className="w-6 h-6" /></div>
                  <Toggle checked={doorLocked} onChange={handleDoorToggle} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Front Door</p>
                  <p className={`text-xs ${doorLocked ? "text-gray-500" : "text-red-500"}`}>{doorLocked ? "Locked" : "Unlocked"}</p>
                </div>
              </div>
              <div className="rounded-3xl p-4 flex flex-col justify-between h-32 relative overflow-hidden cursor-pointer" style={glassCard} onClick={() => setCameraOpen(true)}>
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-100 to-transparent rounded-bl-full opacity-50" />
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-2xl"><Video className="w-6 h-6" /></div>
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 animate-pulse" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Cameras</p>
                  <p className="text-xs text-gray-500">3 Active</p>
                </div>
              </div>
            </div>
          </section>

          {/* Rooms */}
          <section>
            <div className="flex justify-between items-end mb-3">
              <h2 className="text-lg font-bold text-gray-800">Rooms</h2>
              <button className="text-sm text-blue-600 font-medium hover:underline">See All</button>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-50 text-orange-500 rounded-xl"><Sofa className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-bold text-gray-800">Living Room</h3>
                      <p className="text-xs text-gray-500">3 Devices Active</p>
                    </div>
                  </div>
                  <Toggle checked={livingRoomOn} onChange={() => setLivingRoomOn(v => !v)} />
                </div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-yellow-500" /> Main Lights
                    </span>
                    <span className="text-xs font-bold text-blue-600">{lightValue}%</span>
                  </div>
                  <input
                    type="range" min="0" max="100" value={lightValue}
                    onChange={(e) => setLightValue(Number(e.target.value))}
                    className="day21-slider w-full cursor-pointer"
                    style={{ background: sliderBg }}
                  />
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 py-2 px-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 flex items-center justify-center gap-2 hover:bg-gray-50 transition">
                      <Wind className="w-4 h-4" /> AC
                    </button>
                    <button className="flex-1 py-2 px-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 flex items-center justify-center gap-2 hover:bg-gray-50 transition">
                      <Tv className="w-4 h-4" /> TV
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 text-indigo-500 rounded-xl"><Bed className="w-5 h-5" /></div>
                  <div>
                    <h3 className="font-bold text-gray-800">Bedroom</h3>
                    <p className="text-xs text-gray-500">All off</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </section>

          {/* Energy */}
          <section className="pb-4">
            <div className="flex justify-between items-end mb-3">
              <h2 className="text-lg font-bold text-gray-800">Energy Usage</h2>
              <span className="text-xs font-medium text-gray-500">Today</span>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500 opacity-10 rounded-full blur-2xl" />
              <div className="flex justify-between items-center mb-4 relative z-10">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Consumption</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">14.2</span>
                    <span className="text-sm text-gray-400">kWh</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center gap-1 text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full mb-1">
                    <TrendingDown className="w-3 h-3" /> 12%
                  </div>
                  <p className="text-gray-400 text-xs">vs yesterday</p>
                </div>
              </div>
              <div className="h-12 flex items-end gap-2 relative z-10">
                {[
                  { h: "40%", a: 0.3 }, { h: "60%", a: 0.5 }, { h: "50%", a: 0.4 },
                  { h: "90%", a: 0.8, peak: true }, { h: "70%", a: 0.6 }, { h: "100%", bright: true },
                ].map((bar, i) => (
                  <div
                    key={i} className="w-1/6 rounded-t-sm relative"
                    style={{
                      height: bar.h,
                      background: bar.bright ? "#60a5fa" : `rgba(59,130,246,${bar.a})`,
                      boxShadow: bar.bright ? "0 0 10px rgba(96,165,250,0.5)" : undefined,
                    }}
                  >
                    {bar.peak && (
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] bg-white text-gray-900 px-1.5 py-0.5 rounded font-bold whitespace-nowrap">Peak</div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-gray-500 mt-2 relative z-10">
                <span>8 AM</span><span>12 PM</span><span>4 PM</span><span>Now</span>
              </div>
            </div>
          </section>
        </main>

        {/* Bottom Nav */}
        <nav className="bg-white border-t border-gray-100 px-6 pt-3 pb-4 z-20">
          <div className="flex justify-between items-center">
            <button className="flex flex-col items-center gap-1 text-blue-600 w-16">
              <div className="p-2 bg-blue-50 rounded-xl relative">
                <Home className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white" />
              </div>
              <span className="text-[10px] font-semibold">Home</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-400 w-16">
              <div className="p-2 rounded-xl"><LayoutGrid className="w-6 h-6" /></div>
              <span className="text-[10px] font-medium">Routines</span>
            </button>
            <button
              className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-600/30 -mt-6 border-4 border-gray-50 hover:scale-105 transition"
              onClick={() => showToast("Scanning for new devices...")}
            >
              <Plus className="w-5 h-5" />
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-400 w-16">
              <div className="p-2 rounded-xl"><BarChart2 className="w-6 h-6" /></div>
              <span className="text-[10px] font-medium">Stats</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-400 w-16">
              <div className="p-2 rounded-xl"><Settings className="w-6 h-6" /></div>
              <span className="text-[10px] font-medium">Settings</span>
            </button>
          </div>
        </nav>

        {/* Camera Modal */}
        <div
          className={`absolute inset-0 z-50 flex flex-col justify-center items-center p-4 transition-all duration-300 ${cameraOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setCameraOpen(false); }}
        >
          <div className={`bg-gray-900 w-full max-w-sm rounded-3xl overflow-hidden border border-gray-700 transition-all duration-300 ${cameraOpen ? "scale-100" : "scale-95"}`}>
            <div className="relative">
              <div className="p-4 flex justify-between items-center bg-black/50 absolute w-full top-0 z-10">
                <div className="flex items-center gap-2 text-white">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="font-medium text-sm">Front Porch Live</span>
                </div>
                <button onClick={() => setCameraOpen(false)} className="text-white/70 hover:text-white bg-black/40 p-1.5 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="relative w-full h-64 bg-gray-800 overflow-hidden">
                <img src="https://placehold.co/600x400/1f2937/4b5563?text=Camera+Feed+Loading..." alt="Camera Feed" className="w-full h-full object-cover opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white/80 font-mono text-xs">2026-06-13 21:40:29</div>
              </div>
            </div>
            <div className="p-5 bg-gray-900">
              <div className="flex justify-around">
                {[
                  { icon: <Mic className="w-5 h-5" />, label: "Speak", color: "" },
                  { icon: <Camera className="w-5 h-5" />, label: "Snapshot", color: "" },
                  { icon: <BellRing className="w-5 h-5 text-red-400" />, label: "Alarm", color: "" },
                ].map((btn) => (
                  <button key={btn.label} className="flex flex-col items-center gap-2 text-white/70 hover:text-white">
                    <div className="p-3 bg-gray-800 rounded-full border border-gray-700">{btn.icon}</div>
                    <span className="text-xs">{btn.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Toast */}
        <div className={`absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center gap-3 transition-all duration-300 ${toast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
          <Info className="w-5 h-5 text-blue-400 flex-shrink-0" />
          <span className="text-sm font-medium">{toast}</span>
        </div>
      </div>
    </div>
  );
}
