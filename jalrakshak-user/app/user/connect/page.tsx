"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ConnectDevice() {
  const router = useRouter();

  const [deviceId, setDeviceId] = useState("");
  const [status, setStatus] = useState<
    "idle" | "searching" | "success"
  >("idle");

  const connectDevice = () => {
    if (!deviceId) return;

    setStatus("searching");

    // fake API delay (later backend call)
    setTimeout(() => {
      setStatus("success");

      setTimeout(() => {
        router.push("/user/dashboard");
      }, 2000);
    }, 2500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center
    bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white p-6">

      <div className="w-full max-w-xl card text-center">

        {/* Icon */}
        <div className="text-6xl mb-4 animate-pulse">
          🔌
        </div>

        <h1 className="text-3xl font-bold text-cyan-400 mb-2">
          Connect JalRakshak Device
        </h1>

        <p className="text-gray-400 mb-8">
          Enter the device code printed on your water monitoring hardware.
        </p>

        {/* INPUT */}
        {status === "idle" && (
          <>
            <input
              value={deviceId}
              onChange={(e) => setDeviceId(e.target.value)}
              placeholder="JRK-XXXX-1234"
              className="w-full p-4 rounded-lg bg-white/10 border border-white/20
              focus:outline-none focus:border-cyan-400 text-center tracking-widest"
            />

            <button
              onClick={connectDevice}
              className="btn-primary mt-6"
            >
              🔍 Search Device
            </button>
          </>
        )}

        {/* SEARCHING STATE */}
        {status === "searching" && (
          <div className="space-y-4">
            <div className="text-5xl animate-spin">⚙️</div>
            <p className="text-cyan-400 text-lg">
              Searching nearby device...
            </p>

            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div className="bg-cyan-400 h-2 animate-pulse w-full"></div>
            </div>
          </div>
        )}

        {/* SUCCESS STATE */}
        {status === "success" && (
          <div className="space-y-4 animate-fadeIn">
            <div className="text-6xl">✅</div>
            <h2 className="text-xl text-green-400 font-semibold">
              Device Connected Successfully
            </h2>

            <p className="text-gray-400">
              Water monitoring has started for your location.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}