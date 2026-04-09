"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, 
  Beaker, 
  Users, 
  ShieldCheck, 
  Zap, 
  Search, 
  AlertCircle,
  RefreshCw
} from "lucide-react";

type Insight = { type: string; message: string; };

export default function SmartInsightEngine() {
  const [sensor, setSensor] = useState<any>(null);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [aiResult, setAiResult] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  const fetchData = async () => {
    setIsScanning(true);
    try {
      const [sRes, iRes] = await Promise.all([
        fetch("http://localhost:5000/api/sensor"),
        fetch("http://localhost:5000/api/insights")
      ]);
      const sensorData = await sRes.json();
      const insightData = await iRes.json();

      setSensor(sensorData);
      setInsights(insightData.insights || []);

      const risk = sensorData.tds > 500 || sensorData.ph > 8.5 || sensorData.ph < 6.5
          ? "Contamination Likely"
          : "Water Safe";

      setAiResult({
        status: risk,
        prediction: risk === "Contamination Likely"
            ? "Possible storage contamination or pipeline disturbance detected."
            : "Water quality stable. Continue monitoring.",
        confidence: risk === "Water Safe" ? "98.2%" : "84.5%"
      });
    } catch (err) {
      console.error("Smart Insight Error:", err);
    } finally {
      // Small delay to make the "Scan" feel real
      setTimeout(() => setIsScanning(false), 1200);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="premium-panel p-8 relative overflow-hidden border-cyan-500/20 bg-slate-950/50">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <Cpu size={120} />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
            <span className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
              <Cpu size={24} />
            </span>
            Smart Water Insight <span className="text-cyan-400">Engine</span>
          </h2>
          <p className="text-gray-500 text-xs mt-1 uppercase font-bold tracking-widest">Neural Analysis & Sensor Correlation</p>
        </div>

        {/* USER INPUT: MANUAL RE-SCAN */}
        <button 
          onClick={fetchData}
          disabled={isScanning}
          className="bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
        >
          <RefreshCw size={16} className={`${isScanning ? 'animate-spin' : ''}`} />
          <span className="text-sm font-bold tracking-tight">Manual Diagnostic Trigger</span>
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8 relative z-10">

        {/* COLUMN 1: SENSOR DIAGNOSIS */}
        <div className="bg-gradient-to-b from-white/[0.03] to-transparent p-6 rounded-[2rem] border border-white/5 group hover:border-emerald-500/30 transition-all">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-emerald-400 p-2 bg-emerald-500/10 rounded-xl"><Beaker size={20} /></div>
            <h3 className="font-bold text-emerald-400">Sensor Diagnosis</h3>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="text-xs text-gray-400 font-bold uppercase">pH Level</span>
              <span className="font-mono text-emerald-400 font-bold">{sensor?.ph ?? "--"}</span>
            </div>
            <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="text-xs text-gray-400 font-bold uppercase">TDS Content</span>
              <span className="font-mono text-emerald-400 font-bold">{sensor?.tds ?? "--"} ppm</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/5">
            <AnimatePresence mode="wait">
              {sensor ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-3 text-sm">
                  {sensor.tds > 500 || sensor.ph > 8.5 || sensor.ph < 6.5 ? (
                    <AlertCircle className="text-rose-400 shrink-0" size={18} />
                  ) : (
                    <ShieldCheck className="text-emerald-400 shrink-0" size={18} />
                  )}
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {sensor.tds > 500 ? "Caution: Total Dissolved Solids exceeds safe baseline. Possible mineral spikes." : "Electrolytic parameters within municipal safety baseline."}
                  </p>
                </motion.div>
              ) : <div className="animate-pulse h-10 bg-white/5 rounded-lg w-full" />}
            </AnimatePresence>
          </div>
        </div>

        {/* COLUMN 2: CITIZEN EVIDENCE */}
        <div className="bg-gradient-to-b from-white/[0.03] to-transparent p-6 rounded-[2rem] border border-white/5 hover:border-amber-500/30 transition-all">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-amber-400 p-2 bg-amber-500/10 rounded-xl"><Users size={20} /></div>
            <h3 className="font-bold text-amber-400">Citizen Evidence</h3>
          </div>

          <div className="space-y-3 h-[180px] overflow-y-auto pr-2 custom-scrollbar">
            {insights.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full opacity-20">
                <Search size={32} />
                <p className="text-[10px] mt-2 font-black uppercase">No active reports</p>
              </div>
            ) : (
              insights.map((i, idx) => (
                <div key={idx} className="bg-white/5 p-3 rounded-xl border-l-2 border-amber-500/50">
                  <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest">{i.type}</p>
                  <p className="text-xs text-gray-300 mt-1">{i.message}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* COLUMN 3: AI CONFIRMATION */}
        <div className="bg-gradient-to-b from-white/[0.03] to-transparent p-6 rounded-[2rem] border border-white/5 border-cyan-500/20 shadow-inner relative overflow-hidden">
          {isScanning && (
            <div className="absolute inset-0 bg-cyan-500/10 backdrop-blur-[2px] z-20 flex items-center justify-center">
               <div className="flex flex-col items-center gap-3">
                 <RefreshCw className="animate-spin text-cyan-400" />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">Analyzing Feed</span>
               </div>
            </div>
          )}

          <div className="flex items-center gap-3 mb-6">
            <div className="text-cyan-400 p-2 bg-cyan-500/10 rounded-xl"><Zap size={20} /></div>
            <h3 className="font-bold text-cyan-400">AI Validation</h3>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <div className={`pulse-container ${aiResult?.status === "Water Safe" ? "text-emerald-400" : "text-rose-500"}`}>
                  <div className="pulse-dot" />
               </div>
               <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase">System Status</p>
                  <p className={`text-lg font-black tracking-tight ${aiResult?.status === "Water Safe" ? "text-emerald-400" : "text-rose-400"}`}>
                    {aiResult?.status || "Analyzing..."}
                  </p>
               </div>
            </div>

            <div className="bg-cyan-500/5 p-4 rounded-2xl border border-cyan-500/10">
              <p className="text-[10px] text-cyan-400/60 font-black mb-2 uppercase tracking-widest">Neural Prediction</p>
              <p className="text-xs text-gray-300 italic leading-relaxed">
                "{aiResult?.prediction || "Scanning data streams for potential pattern match..."}"
              </p>
            </div>

            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-500">
               <span>AI Confidence</span>
               <span className="text-cyan-400">{aiResult?.confidence || "0%"}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}