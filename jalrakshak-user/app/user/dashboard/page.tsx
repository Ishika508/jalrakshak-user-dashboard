"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Droplets, Activity, ShieldAlert, Zap, 
  ChevronRight, AlertTriangle, Search, Settings, 
  ClipboardCheck, Cpu, Sparkles 
} from "lucide-react";

import SmartInsightEngine from "../../components/SmartInsightEngine";
import LiveSensorGraph from "../../components/LiveSensorGraph";
import AITimeline from "../../components/AITimeline";
import RiskMap from "../../components/RiskMap";
import AlertSystem from "../../components/AlertSystem";

type Insight = { type: string; message: string; };

export default function Dashboard() {
  const router = useRouter();
  const [insights, setInsights] = useState<Insight[]>([]);
  const [sensorData, setSensorData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [sRes, iRes] = await Promise.all([
          fetch("http://localhost:5000/api/sensor"),
          fetch("http://localhost:5000/api/insights")
        ]);
        const sData = await sRes.json();
        setSensorData(sData);
        const iData = await iRes.json();
        setInsights(iData.insights || []);
        setLoading(false);
      } catch (err) { console.error(err); }
    };
    fetchAll();
    const interval = setInterval(fetchAll, 5000);
    return () => clearInterval(interval);
  }, []);

  // 🧠 DYNAMIC RISK LOGIC
  const calculateRisk = () => {
    if (!sensorData) return { score: 0, label: "LOADING", color: "text-gray-400", dot: "bg-gray-400" };
    
    let score = 20; // Base score
    const ph = sensorData.ph;
    const tds = sensorData.tds;

    if (ph < 6.5 || ph > 8.5) score += 40;
    if (tds > 500) score += 30;
    if (tds > 1000) score += 10;

    if (score < 40) return { score, label: "LOW", color: "text-emerald-400", dot: "bg-emerald-400" };
    if (score < 75) return { score, label: "MEDIUM", color: "text-amber-400", dot: "bg-amber-400" };
    return { score: Math.min(score, 100), label: "HIGH", color: "text-rose-400", dot: "bg-rose-400" };
  };

  const risk = calculateRisk();

  if (loading) return <div className="min-h-screen flex items-center justify-center text-cyan-400 font-black animate-pulse uppercase tracking-[0.3em]">Initialising JalRakshak Node...</div>;

  return (
    <main className="min-h-screen px-6 py-8 text-white space-y-8 max-w-[1400px] mx-auto">
      <AlertSystem />

      <section className="premium-panel p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="scan-line" />
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter">
            Citizen <span className="text-cyan-400">Console</span>
          </h1>
          <p className="text-gray-400 text-sm font-medium opacity-80">Real-time AI Public Safety Monitoring</p>
        </div>

        <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-4">
          <div className="text-right">
            <div className={`text-lg font-black ${risk.color}`}>{risk.label} RISK</div>
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">System Health</p>
          </div>
          <span className={`w-3 h-3 rounded-full animate-ping ${risk.dot}`} />
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        <MetricCard icon={<Activity />} title="Water Quality" value={risk.label} color={risk.color} />
        <MetricCard icon={<Zap />} title="pH Balance" value={sensorData?.ph || "7.2"} color={sensorData?.ph < 6.5 || sensorData?.ph > 8.5 ? "text-rose-400" : "text-emerald-400"} />
        <MetricCard icon={<Droplets />} title="TDS Level" value={sensorData?.tds ? `${sensorData.tds} ppm` : "--"} color={sensorData?.tds > 500 ? "text-amber-400" : "text-cyan-400"} />
        <MetricCard icon={<ShieldAlert />} title="Risk Score" value={`${risk.score}%`} color={risk.color} />
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ActionBtn icon={<AlertTriangle className="text-rose-500" />} label="Report Issue" onClick={() => router.push("/user/report")} />
        <ActionBtn icon={<Search className="text-cyan-400" />} label="AI Health Scan" onClick={() => router.push("/user/ai-insights")} />
        <ActionBtn icon={<Settings className="text-amber-400" />} label="Tank Cleaning" onClick={() => router.push("/user/tank-cleaning")} />
        <ActionBtn icon={<ClipboardCheck className="text-emerald-400" />} label="Raise Ticket" onClick={() => router.push("/user/raise-ticket")} />
      </section>

      <section className="premium-panel p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-cyan-500/30">
        <div className="flex items-center gap-6">
          <div className="bg-cyan-500/20 p-4 rounded-3xl border border-cyan-500/40">
            <Cpu className="text-cyan-400 animate-pulse" size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              AI Risk Analysis Engine <Sparkles size={16} className="text-cyan-400" />
            </h3>
            <p className="text-gray-400 text-sm max-w-md">Our neural network is currently analyzing local grid data for microbial anomalies.</p>
          </div>
        </div>
        <button onClick={() => router.push("/user/ai-insights")} className="bg-cyan-500 hover:bg-cyan-400 text-black font-black px-8 py-4 rounded-2xl transition-all hover:scale-105 flex items-center gap-2">
          RUN DEEP SCAN <ChevronRight size={18} />
        </button>
      </section>

      <SmartInsightEngine sensorData={sensorData} insights={insights} riskLevel={risk.label} />

      <section className="grid md:grid-cols-2 gap-8">
        <div className="premium-panel p-6"><LiveSensorGraph /></div>
        <div className="premium-panel p-6"><AITimeline /></div>
      </section>

      <div className="premium-panel"><RiskMap /></div>
    </main>
  );
}

function MetricCard({ title, value, color, icon }: any) {
  return (
    <div className="glow-card p-6 rounded-[1.5rem] group border border-white/5">
      <div className={`p-2 bg-white/5 w-fit rounded-lg mb-4 ${color}`}>{icon}</div>
      <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{title}</p>
      <h3 className={`text-3xl font-black value-highlight mt-1 ${color}`}>{value}</h3>
    </div>
  );
}

function ActionBtn({ icon, label, onClick }: any) {
  return (
    <button onClick={onClick} className="glow-card p-6 rounded-[1.5rem] flex flex-col items-center gap-3 group text-center border border-white/5">
      <div className="p-3 bg-white/5 rounded-xl group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all">{icon}</div>
      <span className="font-bold text-xs text-gray-300 group-hover:text-white">{label}</span>
    </button>
  );
}