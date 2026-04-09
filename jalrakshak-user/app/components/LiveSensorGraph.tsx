"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Defs,
  LinearGradient
} from "recharts";
import { Activity } from "lucide-react";

export default function LiveSensorGraph() {
  const [data, setData] = useState<any[]>([]);

  // Simulate Real-time Data Stream
  useEffect(() => {
    // Initial Seed Data
    const initialData = Array.from({ length: 20 }).map((_, i) => ({
      time: new Date(Date.now() - (20 - i) * 5000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      ph: 7 + Math.random() * 1.5 - 0.75,
      tds: 350 + Math.random() * 100,
    }));
    setData(initialData);

    const interval = setInterval(() => {
      setData((prevData) => {
        const lastPh = prevData[prevData.length - 1].ph;
        const lastTds = prevData[prevData.length - 1].tds;

        // Create natural "fluctuation" (Walk Logic)
        const newPh = Math.max(0, Math.min(14, lastPh + (Math.random() - 0.5) * 0.2));
        const newTds = Math.max(50, Math.min(1200, lastTds + (Math.random() - 0.5) * 20));

        const newDataPoint = {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          ph: Number(newPh.toFixed(2)),
          tds: Math.floor(newTds),
        };

        // Keep only last 20 points for smooth scrolling
        return [...prevData.slice(1), newDataPoint];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="premium-panel p-6 h-[400px] relative overflow-hidden group">
      {/* Header Info */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-cyan-400 font-black flex items-center gap-2 tracking-tighter uppercase text-sm">
            <Activity size={18} className="animate-pulse text-rose-500" />
            Live Neural Telemetry
          </h2>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">
            Real-time Chemical Flux (pH / TDS)
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-[10px] font-black text-gray-400 uppercase">pH Level</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-[10px] font-black text-gray-400 uppercase">TDS ppm</span>
          </div>
        </div>
      </div>

      {/* Graph Container */}
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPh" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorTds" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="#475569" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              minTickGap={30}
            />
            <YAxis 
              stroke="#475569" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
              domain={['auto', 'auto']}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0f172a', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                fontSize: '12px'
              }}
              itemStyle={{ fontWeight: 'bold' }}
            />
            
            {/* TDS AREA */}
            <Area
              type="monotone"
              dataKey="tds"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorTds)"
              animationDuration={1000}
            />

            {/* pH AREA */}
            <Area
              type="monotone"
              dataKey="ph"
              stroke="#22d3ee"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorPh)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Status Bar */}
      <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">
        <span>Sampling Rate: 3000ms</span>
        <span className="text-cyan-500/50 italic">JalRakshak AI V2.4 Connected</span>
      </div>
    </div>
  );
}