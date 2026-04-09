"use client";

import { useEffect, useState } from "react";
import { Radio, BrainCircuit, CloudZap, ShieldCheck } from "lucide-react";

export default function LiveStatusBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-[#020617] border-b border-white/5 relative overflow-hidden">
      {/* Background Scanning Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />

      <div className="max-w-[1400px] mx-auto px-6 py-2.5 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        
        {/* LEFT: LIVE STATUS */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.15em]">
              Node_Active
            </span>
          </div>
          
          <div className="h-4 w-[1px] bg-white/10 hidden md:block" />
          
          <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
            <Radio size={12} className="text-cyan-500" />
            Live_Telemetry: <span className="text-gray-300">{time || "Initializing..."}</span>
          </p>
        </div>

        {/* RIGHT: SYSTEM INDICATORS */}
        <div className="flex items-center gap-8">
          <StatusItem icon={<DropletIcon />} label="Sensors" status="Online" color="text-cyan-400" />
          <StatusItem icon={<BrainCircuit size={14} />} label="AI_Core" status="Predictive" color="text-purple-400" />
          <StatusItem icon={<ShieldCheck size={14} />} label="Gov_Link" status="Secure" color="text-blue-400" />
          
          {/* VERSION TAG */}
          <div className="hidden lg:block bg-white/5 px-2 py-0.5 rounded border border-white/10">
            <span className="text-[9px] font-bold text-gray-600 tracking-tighter uppercase">v2.4.0-Stable</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

function StatusItem({ icon, label, status, color }: any) {
  return (
    <div className="flex items-center gap-2 group cursor-default">
      <div className={`${color} opacity-50 group-hover:opacity-100 transition-opacity`}>
        {icon}
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-[8px] font-black text-gray-600 uppercase tracking-tighter">{label}</span>
        <span className={`text-[10px] font-bold uppercase tracking-tight ${color}`}>{status}</span>
      </div>
    </div>
  );
}

function DropletIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
    </svg>
  );
}