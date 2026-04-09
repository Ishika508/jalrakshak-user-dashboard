"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    village: "",
    waterSource: "",
    password: "",
  });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    // Later send to backend
    router.push("/user/setup");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">

      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10">

        <h1 className="text-2xl font-bold text-center text-cyan-400 mb-6">
          Create Citizen Account
        </h1>

        <form onSubmit={handleSignup} className="space-y-4">

          <input
            placeholder="Full Name"
            className="input"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            placeholder="Phone Number"
            className="input"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />

          <input
            placeholder="Village / Ward"
            className="input"
            onChange={(e) => setForm({ ...form, village: e.target.value })}
            required
          />

          <select
            className="input"
            onChange={(e) =>
              setForm({ ...form, waterSource: e.target.value })
            }
            required
          >
            <option value="">Water Source</option>
            <option>Borewell</option>
            <option>Municipal</option>
            <option>Tanker</option>
            <option>River</option>
          </select>

          <input
            type="password"
            placeholder="Password"
            className="input"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button className="w-full bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg font-semibold">
            Register
          </button>
        </form>

        <p className="text-center text-sm mt-5 text-gray-400">
          Already registered?{" "}
          <span
            className="text-cyan-400 cursor-pointer"
            onClick={() => router.push("/auth/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}