"use client";

import { useRouter } from "next/navigation";
import { Cpu, Truck, LayoutDashboard, Radio, ChevronRight } from "lucide-react";

export default function DeviceSetup() {
  const router = useRouter();

  return (
    <div className="min-h-screen text-white p-8 relative overflow-hidden bg-[#020617]">
      
      {/* ===== BACKGROUND VISUALS ===== */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-500/10 blur-[140px] rounded-full" />
        {/* Subtle Scan Line Effect */}
        <div className="scan-line opacity-20" />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="max-w-6xl mx-auto py-12">
        
        {/* Header Section */}
        <div className="mb-12 ticket-anim">
          <div className="flex items-center gap-2 mb-2">
            <Radio size={16} className="text-cyan-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500/70">Hardware Configuration</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter uppercase italic">
            Device <span className="text-cyan-400">Setup</span>
          </h1>
          <p className="text-gray-500 mt-4 max-w-xl font-medium">
            Integrate your monitoring node with the JalRakshak Global Grid for real-time telemetry and AI predictive analysis.
          </p>
        </div>

        {/* OPTIONS GRID */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* Connect Device */}
          <div className="premium-panel p-8 group hover:border-cyan-400 transition-all duration-500 cursor-pointer flex flex-col ticket-anim" style={{ animationDelay: '0.1s' }}>
            <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
              <Cpu className="text-cyan-400" size={28} />
            </div>
            
            <h2 className="text-xl font-black uppercase tracking-tighter mb-3">
              Connect Existing Node
            </h2>

            <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
              Sync your hardware via the unique <span className="text-gray-300">Device CID</span> printed on your JalRakshak sensor plate.
            </p>

            <button
              onClick={() => router.push("/user/connect")}
              className="primary-btn w-full flex items-center justify-center gap-2 uppercase text-xs tracking-widest text-black"
            >
              Sync Hardware <ChevronRight size={16} />
            </button>
          </div>

          {/* Request Device */}
          <div className="premium-panel p-8 group hover:border-blue-400 transition-all duration-500 cursor-pointer flex flex-col ticket-anim" style={{ animationDelay: '0.2s' }}>
            <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
              <Truck className="text-blue-400" size={28} />
            </div>
            
            <h2 className="text-xl font-black uppercase tracking-tighter mb-3">
              Request Govt. Installation
            </h2>

            <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
              Apply for a subsidised JalRakshak hardware node installation at your residential or ward storage facility.
            </p>

            <button
              onClick={() => router.push("/user/request-device")}
              className="primary-btn w-full flex items-center justify-center gap-2 uppercase text-xs tracking-widest text-black"
              style={{ background: 'linear-gradient(90deg, #3b82f6, #6366f1)' }}
            >
              Request Link <ChevronRight size={16} />
            </button>
          </div>

          {/* Continue Without Device */}
          <div className="premium-panel p-8 group hover:border-white/30 transition-all duration-500 cursor-pointer flex flex-col ticket-anim" style={{ animationDelay: '0.3s' }}>
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:bg-white/10 transition-colors">
              <LayoutDashboard className="text-white" size={28} />
            </div>
            
            <h2 className="text-xl font-black uppercase tracking-tighter mb-3">
              Manual Telemetry Mode
            </h2>

            <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
              Continue to the dashboard to report physical symptoms manually and view regional water quality maps.
            </p>

            <button
              onClick={() => router.push("/user/dashboard")}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 font-black uppercase text-xs tracking-widest hover:bg-white/10 transition-all text-gray-300"
            >
              Bypass Setup
            </button>
          </div>

        </div>

        {/* Bottom Footer Info */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-cyan-500 border-2 border-[#020617]" />
              <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-[#020617]" />
              <div className="w-6 h-6 rounded-full bg-indigo-500 border-2 border-[#020617]" />
            </div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              Join 12,000+ nodes across the state grid
            </p>
          </div>
          <span className="text-[10px] font-black text-cyan-500/40 uppercase tracking-[0.4em]">Secure Node Auth v2.4</span>
        </div>

      </div>
    </div>
  );
}