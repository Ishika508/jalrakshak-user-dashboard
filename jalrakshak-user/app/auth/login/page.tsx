"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // TEMP LOGIN (later connect backend)
    if (phone && password) {
      router.push("/user/setup");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">

      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-xl">

        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-cyan-400">
            💧 JalRakshak
          </h1>
          <p className="text-sm text-gray-400">
            Government Water Monitoring System
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="text"
            placeholder="Phone Number"
            className="w-full p-3 rounded-lg bg-slate-900 border border-white/10 focus:outline-none"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-slate-900 border border-white/10 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition p-3 rounded-lg font-semibold"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-400">
          New user?{" "}
          <span
            className="text-cyan-400 cursor-pointer"
            onClick={() => router.push("/auth/signup")}
          >
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
}