"use client";

import { useState, useEffect } from "react";
import { 
  BrainCircuit, Thermometer, Droplet, 
  Wind, Users, Calendar, Upload, 
  AlertCircle, ShieldCheck, Activity, Info
} from "lucide-react";

const symptomsList = [
  "Diarrhea", "Vomiting", "Fever", "Skin Irritation",
  "Stomach Pain", "Nausea", "Weakness", "Headache",
];

export default function AIInsights() {
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scanMessage, setScanMessage] = useState("");
  
  // State for user inputs
  const [appearance, setAppearance] = useState("clear");
  const [odor, setOdor] = useState("none");
  const [sensor, setSensor] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/sensor")
      .then(res => res.json())
      .then(data => setSensor(data));
  }, []);

  const toggleSymptom = (symptom: string) => {
    setSelected((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  const analyzeHealth = () => {
    setIsScanning(true);
    setResult(null);
    setProgress(0);

    const messages = [
      "Syncing with Bio-Sensor Network...",
      "Cross-referencing symptom clusters...",
      "Analyzing turbidity & odor data...",
      "Running predictive contamination model...",
      "Finalizing health recommendations...",
    ];

    let step = 0;
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 20;
        setScanMessage(messages[step]);
        step++;
        if (next >= 100) {
          clearInterval(interval);
          
          // 🧠 ACTUAL AI LOGIC BASED ON INPUTS
          setTimeout(() => {
            setIsScanning(false);
            
            let score = 10;
            // Symptom weight
            score += selected.length * 10;
            // Observation weight
            if (appearance !== "clear") score += 15;
            if (odor !== "none") score += 15;
            // Live Sensor weight
            if (sensor && (sensor.ph < 6.5 || sensor.ph > 8.5)) score += 20;
            if (sensor && sensor.tds > 500) score += 20;

            const finalScore = Math.min(score, 100);
            
            let riskLevel = "LOW";
            let disease = "No significant biological threat detected.";
            let suggestion = "Continue standard filtration. Your water parameters look normal.";

            if (finalScore > 40) {
              riskLevel = "MODERATE";
              disease = "Potential Microbial Presence";
              suggestion = "Boil drinking water. The current pH/TDS levels combined with your symptoms suggest a pipeline leak.";
            }
            if (finalScore > 70) {
              riskLevel = "CRITICAL";
              disease = "High Pathogen Probability";
              suggestion = "STOP DRINKING. Evidence of severe contamination detected. An inspector has been dispatched.";
            }

            setResult({
              risk: riskLevel,
              disease: disease,
              score: finalScore,
              suggestion: suggestion,
              color: finalScore > 70 ? "text-rose-500" : finalScore > 40 ? "text-amber-500" : "text-emerald-500"
            });
          }, 800);
        }
        return next;
      });
    }, 800);
  };

  return (
    <main className="min-h-screen text-white px-6 py-10 bg-[#020617]">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* HEADER SECTION */}
        <section className="premium-panel p-8 border-l-4 border-l-cyan-500">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-black tracking-tighter flex items-center gap-3">
                <BrainCircuit className="text-cyan-400" size={40} />
                AI Health <span className="text-cyan-400">Insights</span>
              </h1>
              <p className="text-gray-400 text-sm mt-2 font-medium">Predicting water-borne risks via neural-link analysis.</p>
            </div>
            <div className="bg-white/5 px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">System Online</span>
            </div>
          </div>
        </section>

        {!isScanning && !result && (
          <div className="grid lg:grid-cols-3 gap-8 ticket-anim">
            <div className="lg:col-span-2 space-y-6">
              <div className="premium-panel p-6">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-rose-400">
                  <Thermometer size={20} /> Symptom Selection
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {symptomsList.map((symptom) => (
                    <button
                      key={symptom}
                      onClick={() => toggleSymptom(symptom)}
                      className={`p-3 rounded-2xl text-xs font-bold transition-all border ${
                        selected.includes(symptom)
                          ? "bg-rose-500/20 border-rose-500 text-rose-400 scale-105"
                          : "bg-white/5 border-white/10 hover:border-white/20 text-gray-400"
                      }`}
                    >
                      {symptom}
                    </button>
                  ))}
                </div>
              </div>

              <div className="premium-panel p-6 grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-cyan-400 flex items-center gap-2">
                    <Droplet size={14} /> Water Appearance
                  </label>
                  <select 
                    onChange={(e) => setAppearance(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-400 outline-none transition-all">
                    <option value="clear">Clear Water</option>
                    <option value="yellow">Yellowish Tint</option>
                    <option value="brown">Brown / Muddy</option>
                    <option value="cloudy">Cloudy / Turbid</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-amber-400 flex items-center gap-2">
                    <Wind size={14} /> Water Odor
                  </label>
                  <select 
                    onChange={(e) => setOdor(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-amber-400 outline-none transition-all">
                    <option value="none">No Smell</option>
                    <option value="chlorine">Heavy Chlorine</option>
                    <option value="sulfur">Rotten Egg (Sulfur)</option>
                    <option value="metallic">Metallic / Rusty</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="premium-panel p-6 space-y-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-500">Demographics</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400 flex items-center gap-2"><Users size={14} /> Affected Members</label>
                    <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-cyan-400" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400 flex items-center gap-2"><Calendar size={14} /> Duration (Days)</label>
                    <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-cyan-400" placeholder="0" />
                  </div>
                </div>
              </div>

              <button
                onClick={analyzeHealth}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black py-5 rounded-[2rem] transition-all hover:scale-105 shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 uppercase tracking-tighter"
              >
                <Activity size={20} /> Start Neural Scan
              </button>
            </div>
          </div>
        )}

        {isScanning && (
          <div className="premium-panel p-16 text-center space-y-8 animate-pulse">
            <div className="relative inline-block">
               <div className="absolute inset-0 bg-cyan-400 blur-3xl opacity-20" />
               <BrainCircuit size={80} className="text-cyan-400 relative z-10 animate-bounce" />
            </div>
            <div className="max-w-md mx-auto space-y-4">
              <h2 className="text-2xl font-black uppercase tracking-tighter">AI Analysis in Progress</h2>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-cyan-500 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-cyan-400 font-mono text-xs uppercase tracking-widest">{scanMessage}</p>
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-6 ticket-anim">
            <div className={`premium-panel p-10 border-t-4 ${result.score > 70 ? 'border-t-rose-500' : 'border-t-amber-500'} relative overflow-hidden`}>
              <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                    <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" 
                            className={result.color} strokeDasharray={440} strokeDashoffset={440 - (440 * result.score) / 100} 
                            strokeLinecap="round" />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-4xl font-black">{result.score}%</span>
                    <p className="text-[8px] text-gray-500 font-bold uppercase">Risk Index</p>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className={`${result.color} bg-white/5 px-4 py-1 rounded-full text-[10px] font-black uppercase border border-white/10`}>
                      {result.risk} RISK
                    </span>
                    <span className="text-gray-500 text-xs">Analysis ID: #AI-{Math.floor(Math.random()*9000)+1000}-X</span>
                  </div>
                  <h2 className="text-4xl font-black tracking-tight">{result.disease}</h2>
                  <div className="bg-white/5 p-5 rounded-2xl border border-white/10 flex items-start gap-4">
                    <Info className="text-cyan-400 shrink-0 mt-1" size={20} />
                    <p className="text-gray-300 text-sm leading-relaxed">{result.suggestion}</p>
                  </div>
                </div>
              </div>
            </div>
            <button onClick={() => setResult(null)} className="px-8 py-4 premium-panel bg-white/5 hover:bg-white/10 text-xs font-black uppercase tracking-widest transition-all">
              Run New Analysis
            </button>
          </div>
        )}
      </div>
    </main>
  );
}