"use client";

import { useState } from "react";
import { 
  UserCircle2, Star, CheckCircle2, X, 
  MapPin, Box, ShieldCheck, ArrowRight, Droplets
} from "lucide-react";

const cleaners = [
  { id: 1, name: "CleanWater Services", price: 799, rating: "4.8", time: "Same Day", icon: <UserCircle2 className="text-blue-400" /> },
  { id: 2, name: "AquaSafe Cleaning", price: 999, rating: "4.9", time: "24 hrs", icon: <UserCircle2 className="text-cyan-400" /> },
  { id: 3, name: "Gov Approved Unit", price: 650, rating: "4.5", time: "48 hrs", icon: <UserCircle2 className="text-emerald-400" /> },
  { id: 4, name: "Community Help", price: 450, rating: "4.2", time: "3 Days", icon: <UserCircle2 className="text-amber-400" /> }
];

export default function TankCleaning() {
  const [selectedCleaner, setSelectedCleaner] = useState<any>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ tankType: "Plastic (PVC)", address: "" });

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Simulation of API call
    setTimeout(() => {
      setIsSubmitted(false);
      setSelectedCleaner(null);
    }, 4000);
  };

  return (
    <main className="min-h-screen text-white px-6 py-10 bg-[#020617]">
      <div className="max-w-6xl mx-auto space-y-10">
        
        <header className="space-y-2">
          <h1 className="text-4xl font-black tracking-tighter flex items-center gap-3">
            <Box className="text-cyan-400" /> Service <span className="text-cyan-400">Marketplace</span>
          </h1>
          <p className="text-gray-500 font-medium">Verified local sanitation units for your water storage nodes.</p>
        </header>

        {/* CLEANER CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cleaners.map((c) => (
            <div 
              key={c.id} 
              onClick={() => setSelectedCleaner(c)}
              className="premium-panel p-6 group hover:border-cyan-500/50 transition-all cursor-pointer border-white/5 bg-white/5"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">{c.icon}</div>
                <div className="bg-amber-500/10 text-amber-500 px-2 py-1 rounded-lg text-[10px] font-black flex items-center gap-1">
                  <Star size={10} fill="currentColor" /> {c.rating}
                </div>
              </div>
              <h3 className="font-bold text-lg mb-1">{c.name}</h3>
              <p className="text-cyan-400 font-black text-xl mb-4">₹{c.price}</p>
              <button className="w-full py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest group-hover:bg-cyan-500 group-hover:text-black transition-all">
                Select Provider
              </button>
            </div>
          ))}
        </div>

        {/* 🟢 THE FIXED DETAIL DROP BOX (MODAL) */}
        {selectedCleaner && !isSubmitted && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setSelectedCleaner(null)} />
            
            <div className="premium-panel max-w-lg w-full p-8 relative animate-in fade-in zoom-in duration-300 border-cyan-500/30">
              <button onClick={() => setSelectedCleaner(null)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
                <X size={20} />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-cyan-500/20 rounded-3xl">{selectedCleaner.icon}</div>
                <div>
                  <p className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.2em]">Service Request</p>
                  <h2 className="text-2xl font-black tracking-tighter uppercase">{selectedCleaner.name}</h2>
                </div>
              </div>

              <form onSubmit={handleBooking} className="space-y-6">
                <div className="space-y-4">
                  {/* TANK TYPE INPUT */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Structure Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Plastic (PVC)", "Concrete"].map((type) => (
                        <button
                          type="button"
                          key={type}
                          onClick={() => setFormData({...formData, tankType: type})}
                          className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                            formData.tankType === type ? "bg-cyan-500/20 border-cyan-500 text-cyan-400" : "bg-white/5 border-white/10 text-gray-500"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ADDRESS INPUT */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Installation Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-4 text-gray-500" size={16} />
                      <textarea 
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        placeholder="Enter house/building number and street..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 h-24 text-sm outline-none focus:border-cyan-500 transition-all resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* PRICE BREAKDOWN */}
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-500 uppercase">Service Total:</span>
                  <span className="text-2xl font-black text-cyan-400">₹{selectedCleaner.price}</span>
                </div>

                <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 uppercase tracking-tighter transition-all hover:scale-[1.02]">
                  Submit Request <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* 🟢 SUCCESS STATE */}
        {isSubmitted && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#020617]">
            <div className="text-center space-y-6 animate-in zoom-in duration-500">
              <div className="w-24 h-24 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 size={48} className="text-emerald-400 animate-bounce" />
              </div>
              <h2 className="text-4xl font-black uppercase tracking-tighter">Request Logged</h2>
              <p className="text-gray-500 max-w-xs mx-auto text-sm font-medium">
                Service Order <span className="text-cyan-400">#TR-{Math.floor(Math.random()*90000)}</span> is being processed by {selectedCleaner.name}.
              </p>
              <div className="pt-4 flex items-center justify-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                <ShieldCheck size={14} /> Encrypted Node Transfer Complete
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}