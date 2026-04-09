"use client";

import { useEffect, useState } from "react";

export default function AlertSystem() {
  const [alert, setAlert] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/alerts")
      .then(res => {
        if (res.ok) return res.json();
        return null;
      })
      .then(data => {
        if (data?.alert) setAlert(data.alert);
      })
      .catch(() => {
        // Silently handle errors
      });
  }, []);

  if (!alert) return null;

  return (
    <div className="
      fixed bottom-6 right-6
      bg-red-500/90 backdrop-blur-xl
      px-6 py-4 rounded-xl shadow-lg
      animate-bounce z-50
    ">
      🚨 {alert}
    </div>
  );
}