"use client";

import { useState } from "react";

const symptoms = [
  "Diarrhea",
  "Vomiting",
  "Fever",
  "Skin Irritation",
  "Bad Smell Water",
  "Color Change",
];

export default function ReportPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [issue, setIssue] = useState(""); // ✅ FIX 1 (missing state)

  const toggle = (s: string) => {
    setSelected(prev =>
      prev.includes(s)
        ? prev.filter(i => i !== s)
        : [...prev, s]
    );
  };

  /* ================= BACKEND SUBMIT ================= */
 const submitReport = async (e: any) => {
  e.preventDefault();

  try {
    const res = await fetch(
      "http://localhost:5000/api/users/report",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symptoms: selected,
          waterIssue: issue,
        }),
      }
    );

    // 👇 check response BEFORE parsing JSON
    if (!res.ok) {
      const text = await res.text();
      console.error("Server response:", text);
      throw new Error("API failed");
    }

    const data = await res.json();

    alert("Report Submitted Successfully ✅");
    setSubmitted(true);

  } catch (err) {
    console.error(err);
    alert("Submission failed");
  }
};

  if (submitted)
    return (
      <div className="bg-slate-900 border border-green-500 rounded-xl p-10 text-center">
        <h2 className="text-3xl text-green-400 font-bold">
          ✅ Complaint Registered
        </h2>
        <p className="text-gray-400 mt-3">
          Tracking ID: JR-{Math.floor(Math.random() * 100000)}
        </p>
      </div>
    );

  return (
    <form
      onSubmit={submitReport} /* ✅ FIX 2 */
      className="space-y-10 bg-slate-900 border border-white/10 rounded-xl p-10"
    >
      <h1 className="text-3xl font-bold text-cyan-400">
        Water Issue Reporting Portal
      </h1>

      {/* ================= REPORTER DETAILS ================= */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-200">
          Reporter Details
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <input required placeholder="Full Name" className="input" />

          <input required placeholder="Mobile Number" className="input" />

          <input
            placeholder="Email (Optional)"
            className="input md:col-span-2"
          />
        </div>
      </section>

      {/* ================= LOCATION ================= */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          Location Information
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <input required placeholder="District" className="input" />
          <input required placeholder="Village / Area" className="input" />
          <input
            placeholder="Landmark (Optional)"
            className="input md:col-span-2"
          />
        </div>
      </section>

      {/* ================= SYMPTOMS ================= */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          Symptoms Observed
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {symptoms.map(s => (
            <button
              type="button"
              key={s}
              onClick={() => toggle(s)}
              className={`p-4 rounded-lg border transition ${
                selected.includes(s)
                  ? "bg-cyan-500/20 border-cyan-400"
                  : "border-white/10 bg-slate-800"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      {/* ================= DESCRIPTION ================= */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          Issue Description
        </h2>

        <textarea
          required
          rows={4}
          placeholder="Describe the problem..."
          className="input w-full"
          value={issue}
          onChange={(e) => setIssue(e.target.value)} /* ✅ FIX 3 */
        />
      </section>

      {/* ================= SUBMIT ================= */}
      <button
        type="submit"
        className="bg-cyan-500 hover:bg-cyan-600 px-10 py-3 rounded-lg font-semibold"
      >
        Submit Complaint
      </button>
    </form>
  );
}