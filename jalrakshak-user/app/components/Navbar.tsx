"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { 
  Waves, 
  LayoutDashboard, 
  FileWarning, 
  Activity, 
  User,
  Menu,
  X,
  Signal
} from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", path: "/user/dashboard", icon: <LayoutDashboard size={16} /> },
    { name: "Report", path: "/user/report", icon: <FileWarning size={16} /> },
    { name: "AI Insights", path: "/user/ai-insights", icon: <Activity size={16} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 px-6 py-4">
      {/* OUTER CONTAINER - Floating Effect */}
      <div className="max-w-[1400px] mx-auto">
        <div className="premium-panel bg-[#020617]/80 backdrop-blur-xl border border-white/10 px-6 py-3 flex justify-between items-center rounded-[2rem] shadow-2xl shadow-cyan-500/10">
          
          {/* LOGO SECTION */}
          <div 
            onClick={() => router.push("/user/dashboard")} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="bg-cyan-500 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
              <Waves className="text-black" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter flex items-center gap-2">
                Jal<span className="text-cyan-400">Rakshak</span>
              </h1>
              <div className="flex items-center gap-1">
                <Signal size={10} className="text-emerald-500 animate-pulse" />
                <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Global_Grid_Active</span>
              </div>
            </div>
          </div>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <button
                  key={link.name}
                  onClick={() => router.push(link.path)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                    isActive 
                      ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.1)]" 
                      : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </button>
              );
            })}
          </div>

          {/* RIGHT SIDE: USER PROFILE & MENU */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Citizen_Node</span>
              <span className="text-[9px] font-bold text-cyan-500/70 uppercase tracking-widest">Verified</span>
            </div>
            
            <button className="p-2.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all group">
              <User size={18} className="text-gray-400 group-hover:text-cyan-400" />
            </button>

            {/* MOBILE TOGGLE */}
            <button 
              className="md:hidden p-2 text-gray-400"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {isOpen && (
          <div className="md:hidden mt-3 premium-panel bg-[#020617] border border-white/10 p-4 rounded-3xl ticket-anim">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    router.push(link.path);
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-4 p-4 rounded-2xl text-sm font-bold text-gray-400 hover:bg-white/5 hover:text-cyan-400 transition-all"
                >
                  {link.icon}
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}