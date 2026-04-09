"use client";

import { useState } from "react";
import { 
  ClipboardCheck, User, Phone, MapPin, 
  Upload, Ticket as TicketIcon, CheckCircle2, 
  Clock, ArrowLeft, Loader2
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function RaiseTicket() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketID, setTicketID] = useState("");

  const handleFakeSubmit = () => {
    setIsProcessing(true);
    
    // Realistic delay for "generating ticket"
    setTimeout(() => {
      const randomID = "JR-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000);
      setTicketID(randomID);
      setIsProcessing(false);
      setSubmitted(true);
    }, 2500);
  };

  return (
    <main className="min-h-screen px-4 md:px-6 py-10 bg-[#020617] text-white">
      <div className="max-w-3xl mx-auto">
        
        <button 
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors font-bold text-sm"
        >
          <ArrowLeft size={18} /> BACK TO CONSOLE
        </button>

        {isProcessing ? (
          /* 🔄 LOADING STATE */
          <div className="premium-panel p-20 flex flex-col items-center justify-center text-center space-y-6 ticket-anim">
            <Loader2 className="text-cyan-400 animate-spin" size={60} />
            <div className="space-y-2">
              <h2 className="text-2xl font-black tracking-tighter uppercase">Encrypting Ticket</h2>
              <p className="text-gray-500 text-sm animate-pulse italic">Connecting to Municipal Data Grid...</p>
            </div>
          </div>
        ) : !submitted ? (
          /* 📝 FORM STATE */
          <div className="premium-panel p-8 md:p-10 space-y-8 ticket-anim border-t-4 border-t-cyan-500">
            <div className="border-b border-white/10 pb-6">
              <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 flex items-center gap-3">
                <TicketIcon className="text-cyan-400" size={32} /> Raise Ticket
              </h1>
              <p className="text-gray-400 text-sm mt-2 font-medium">Official Government Grievance Redressal Form</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] ml-1">Applicant Name</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 border-r border-white/10 pr-3">
                    <User className="text-indigo-400" size={18} />
                  </div>
                  <input className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-16 pr-4 focus:border-indigo-500 outline-none transition-all" placeholder="Full Name" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] ml-1">Contact Number</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 border-r border-white/10 pr-3">
                    <Phone className="text-emerald-400" size={18} />
                  </div>
                  <input className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-16 pr-4 focus:border-emerald-500 outline-none transition-all" placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-amber-400 uppercase tracking-[0.2em] ml-1">Village / Ward Area</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 border-r border-white/10 pr-3">
                  <MapPin className="text-amber-400" size={18} />
                </div>
                <input className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-16 pr-4 focus:border-amber-500 outline-none transition-all" placeholder="Enter Area Name" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-rose-400 uppercase tracking-[0.2em] ml-1">Nature of Complaint</label>
              <select defaultValue="" className="w-full bg-[#0f172a] border border-white/10 rounded-2xl py-4 px-5 text-white focus:border-rose-500 outline-none appearance-none cursor-pointer">
                <option value="" disabled>Select issue type</option>
                <option value="smell">Strong Chemical / Foul Smell</option>
                <option value="color">Visible Discoloration</option>
                <option value="health">Physical Health Symptoms</option>
                <option value="pressure">Low Pipeline Pressure</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em] ml-1">Detailed Description</label>
              <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 min-h-[120px] focus:border-cyan-500 outline-none" placeholder="Describe the issue..." />
            </div>

            {/* 📸 RESTORED: PHOTO UPLOAD BOX */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-purple-400 uppercase tracking-[0.2em] ml-1">Visual Evidence</label>
              <label className="border-2 border-dashed border-white/10 rounded-2xl p-8 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all flex flex-col items-center gap-3 cursor-pointer group bg-white/2">
                <div className="p-3 bg-white/5 rounded-full group-hover:scale-110 transition-transform">
                   <Upload className="text-purple-400" size={24} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold">Upload Photo</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">JPG, PNG (Max 5MB)</p>
                </div>
                <input type="file" className="hidden" />
              </label>
            </div>

            <button
              onClick={handleFakeSubmit}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-black py-5 rounded-2xl transition-all hover:scale-[1.01] active:scale-[0.98] shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-3 tracking-widest text-sm"
            >
              <ClipboardCheck size={22} /> SUBMIT INSPECTION REQUEST
            </button>
          </div>
        ) : (
          /* ✅ SUCCESS STATE */
          <div className="premium-panel p-12 text-center space-y-8 ticket-anim border-t-4 border-t-emerald-500">
            <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500/50">
              <CheckCircle2 className="text-emerald-400" size={48} />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-4xl font-black">Ticket Generated</h2>
              <p className="text-gray-400 font-medium">Case successfully filed with the Zonal Water Board.</p>
            </div>
            
            <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
              <p className="text-[10px] text-gray-500 font-black tracking-[0.4em] mb-2 uppercase">Tracking ID</p>
              <p className="text-4xl font-mono font-black text-cyan-400">{ticketID}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-white/5 rounded-2xl border border-white/5 text-left flex items-start gap-4">
                <User className="text-indigo-400" size={18} />
                <div><p className="text-[10px] font-black text-indigo-400">OFFICER</p><p className="text-sm font-bold">Zonal Inspector</p></div>
              </div>
              <div className="p-5 bg-white/5 rounded-2xl border border-white/5 text-left flex items-start gap-4">
                <Clock className="text-amber-400" size={18} />
                <div><p className="text-[10px] font-black text-amber-400">ETA</p><p className="text-sm font-bold">Within 24 Hours</p></div>
              </div>
            </div>

            <button onClick={() => setSubmitted(false)} className="text-gray-500 hover:text-white transition-all text-xs font-bold underline">FILE ANOTHER REPORT</button>
          </div>
        )}
      </div>
    </main>
  );
}