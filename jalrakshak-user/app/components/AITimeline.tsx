export default function AITimeline() {
  const events = [
    { time: "Today", text: "AI detected pH fluctuation" },
    { time: "Yesterday", text: "Citizen complaints increased" },
    { time: "2 days ago", text: "Risk prediction elevated" },
  ];

  return (
    <div className="gov-glass p-6 rounded-2xl">
      <h2 className="text-purple-400 font-semibold mb-5">
        🧠 AI Prediction Timeline
      </h2>

      <div className="space-y-4">
        {events.map((e, i) => (
          <div key={i} className="flex gap-4">
            <div className="w-3 h-3 bg-purple-400 rounded-full mt-2" />
            <div>
              <p className="font-medium">{e.text}</p>
              <p className="text-xs opacity-60">{e.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}