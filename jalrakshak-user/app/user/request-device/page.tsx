"use client";

import { useState } from "react";

export default function RequestDevice() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="glass-card text-center p-10 max-w-lg">
          <h2 className="text-3xl font-bold text-green-400">
            ✅ Request Submitted
          </h2>
          <p className="mt-3 opacity-80">
            Government installation request received.
            Officials will contact you shortly.
          </p>
          <p className="mt-4 text-cyan-400 font-semibold">
            Request ID: JR-{Math.floor(Math.random() * 100000)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen text-white px-6 py-10">
      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-8">
        <h1 className="text-4xl font-bold">
          Government Device Installation Request
        </h1>
        <p className="opacity-70 mt-2">
          Apply for JalRakshak water monitoring hardware installation.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto space-y-8"
      >
        {/* ================= CITIZEN DETAILS ================= */}
        <section className="glass-card p-6 space-y-4">
          <h2 className="text-xl font-semibold text-cyan-400">
            👤 Citizen Details
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input required placeholder="Full Name"
              className="input" />

            <input required placeholder="Mobile Number"
              className="input" />

            <input placeholder="Aadhaar / Govt ID (Optional)"
              className="input" />

            <input required placeholder="Village / Area"
              className="input" />
          </div>
        </section>

        {/* ================= LOCATION ================= */}
        <section className="glass-card p-6 space-y-4">
          <h2 className="text-xl font-semibold text-cyan-400">
            📍 Installation Location
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input required placeholder="District" className="input" />
            <input required placeholder="State" className="input" />
            <input required placeholder="Pincode" className="input" />

            <select className="input">
              <option>Water Source Type</option>
              <option>Borewell</option>
              <option>Municipal Supply</option>
              <option>Water Tank</option>
              <option>River / Lake</option>
            </select>
          </div>

          <textarea
            required
            placeholder="Full Address"
            className="input h-24"
          />
        </section>

        {/* ================= SERVICE DETAILS ================= */}
        <section className="glass-card p-6 space-y-4">
          <h2 className="text-xl font-semibold text-cyan-400">
            ⚙️ Service Details
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <select className="input">
              <option>Tank Capacity</option>
              <option>Below 500L</option>
              <option>500–1000L</option>
              <option>1000–2000L</option>
              <option>Above 2000L</option>
            </select>

            <select className="input">
              <option>Installation Priority</option>
              <option>Normal</option>
              <option>Urgent (Health Issue)</option>
              <option>Emergency</option>
            </select>

            <input type="date" className="input" />
          </div>
        </section>

        {/* ================= SUBMIT ================= */}
        <div className="text-center">
          <button
            type="submit"
            className="px-10 py-4 bg-cyan-500 hover:bg-cyan-400
            rounded-xl text-lg font-semibold transition-all
            hover:scale-105 shadow-lg"
          >
            🚀 Submit Installation Request
          </button>
        </div>
      </form>
    </main>
  );
}