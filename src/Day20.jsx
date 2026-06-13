import React, { useState } from "react";
import {
  Layers,
  LocateFixed,
  Plus,
  MapPin,
  Navigation,
  Clock,
  EyeOff,
  Users,
  Map,
  MonitorSmartphone,
  User,
} from "lucide-react";

const mapPatternStyle = {
  backgroundColor: "#e5e7eb",
  backgroundImage: "radial-gradient(#d1d5db 1px, transparent 1px)",
  backgroundSize: "20px 20px",
};

const friends = [
  {
    id: 1,
    name: "Emma Watson",
    initials: "E",
    color: "10B981",
    statusColor: "bg-green-500",
    location: "Central Park",
    time: "Now",
    distance: "1.2 km",
    distanceColor: "text-indigo-600",
    icon: <Navigation className="w-3 h-3" />,
    hidden: false,
  },
  {
    id: 2,
    name: "Liam Smith",
    initials: "L",
    color: "F59E0B",
    statusColor: "bg-yellow-500",
    location: "Brooklyn",
    time: "2 hrs ago",
    distance: "5.4 km",
    distanceColor: "text-gray-800",
    icon: <Clock className="w-3 h-3" />,
    hidden: false,
  },
  {
    id: 3,
    name: "Olivia Davis",
    initials: "O",
    color: "9CA3AF",
    statusColor: null,
    location: null,
    time: null,
    distance: null,
    distanceColor: null,
    icon: <EyeOff className="w-3 h-3" />,
    hidden: true,
  },
];

const navItems = [
  { icon: <Users className="w-5 h-5" />, label: "People", active: true },
  { icon: <Map className="w-5 h-5" />, label: "Places", active: false },
  { icon: <MonitorSmartphone className="w-5 h-5" />, label: "Devices", active: false },
  { icon: <User className="w-5 h-5" />, label: "Me", active: false },
];

export default function Day20() {
  const [expanded, setExpanded] = useState(false);
  const [dragging, setDragging] = useState(false);

  return (
    <div className="bg-gray-800 flex justify-center items-center min-h-screen">
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        .pulse-effect::before {
          content: '';
          position: absolute;
          left: 0; top: 0;
          width: 100%; height: 100%;
          background-color: #4F46E5;
          border-radius: 50%;
          z-index: -1;
          animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Phone mockup */}
      <div className="relative w-[375px] h-[812px] bg-gray-100 rounded-[40px] shadow-2xl overflow-hidden border-8 border-gray-900">

        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-50" />

        {/* Map area */}
        <div
          className="relative w-full h-[65%] overflow-hidden"
          style={{ ...mapPatternStyle, cursor: dragging ? "grabbing" : "grab" }}
          onMouseDown={() => setDragging(true)}
          onMouseUp={() => setDragging(false)}
          onMouseLeave={() => setDragging(false)}
        >
          {/* Map controls */}
          <div className="absolute top-12 right-4 flex flex-col gap-3 z-10">
            <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-800 hover:bg-gray-50 transition">
              <Layers className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition">
              <LocateFixed className="w-4 h-4 text-indigo-600" />
            </button>
          </div>

          {/* Emma marker */}
          <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 group">
            <div className="relative w-12 h-12">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-white rotate-45 shadow-sm" />
              <img
                src="https://placehold.co/100x100/10B981/FFFFFF?text=E"
                alt="Emma"
                className="w-12 h-12 rounded-full border-2 border-white shadow-md relative z-10 object-cover"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white z-20" />
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white/90 px-2 py-1 rounded shadow text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Emma・1km
            </div>
          </div>

          {/* Liam marker */}
          <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 group">
            <div className="relative w-10 h-10">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-white rotate-45 shadow-sm" />
              <img
                src="https://placehold.co/100x100/F59E0B/FFFFFF?text=L"
                alt="Liam"
                className="w-10 h-10 rounded-full border-2 border-white shadow-md relative z-10 object-cover opacity-80"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white z-20" />
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white/90 px-2 py-1 rounded shadow text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Liam・5km (2h前)
            </div>
          </div>

          {/* My location marker */}
          <div className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-8 h-8 pulse-effect flex items-center justify-center">
              <div className="w-4 h-4 bg-indigo-600 rounded-full border-2 border-white shadow-lg relative z-10" />
            </div>
          </div>
        </div>

        {/* Bottom sheet */}
        <div
          className="absolute bottom-0 left-0 w-full bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex flex-col transition-all duration-300 z-20"
          style={{ height: expanded ? "85%" : "45%" }}
        >
          {/* Drag handle */}
          <div
            className="w-full pt-3 pb-2 flex justify-center cursor-pointer"
            onClick={() => setExpanded((v) => !v)}
          >
            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
          </div>

          {/* Header */}
          <div className="px-6 pb-4 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">People</h1>
              <p className="text-sm text-gray-500">Sharing location with 3 friends</p>
            </div>
            <button className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-600 hover:text-white transition">
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Friend list */}
          <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-2">
            {friends.map((f) => (
              <div
                key={f.id}
                className={`flex items-center justify-between p-3 mb-2 rounded-2xl hover:bg-gray-50 cursor-pointer transition ${f.hidden ? "opacity-60" : ""}`}
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={`https://placehold.co/100x100/${f.color}/FFFFFF?text=${f.initials}`}
                      alt={f.name}
                      className={`w-12 h-12 rounded-full object-cover ${f.hidden ? "grayscale" : ""}`}
                    />
                    {f.statusColor && (
                      <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 ${f.statusColor} rounded-full border-2 border-white`} />
                    )}
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">{f.name}</h2>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      {f.icon}
                      {f.hidden ? "Location hidden" : `${f.location} · ${f.time}`}
                    </p>
                  </div>
                </div>
                {f.distance && (
                  <div className="text-right">
                    <p className={`font-semibold ${f.distanceColor}`}>{f.distance}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom nav */}
          <div className="border-t border-gray-100 bg-white px-6 py-4 flex justify-between items-center">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={`flex flex-col items-center gap-1 w-16 transition ${item.active ? "text-indigo-600" : "text-gray-400 hover:text-gray-800"}`}
              >
                {item.icon}
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            ))}
          </div>

          {/* iOS home indicator */}
          <div className="w-full pb-2 pt-1 flex justify-center bg-white">
            <div className="w-32 h-1 bg-gray-800 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
