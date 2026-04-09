import "./globals.css";
import Link from "next/link";
import LiveStatusBar from "./components/LiveStatusBar";
export const metadata = {
  title: "JalRakshak",
  description: "Government Water Monitoring Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#020617] text-white min-h-screen">
        <LiveStatusBar />
        {/* NAVBAR */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#020617]/70 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

            <div>
              <h1 className="text-xl font-semibold text-cyan-400">
                💧 JalRakshak
              </h1>
              <p className="text-xs text-gray-400">
                Government Water Monitoring
              </p>
            </div>

            <nav className="flex gap-8 text-sm text-gray-300">
              <Link href="/user/dashboard" className="hover:text-cyan-400 transition">
                Dashboard
              </Link>
              <Link href="/user/report" className="hover:text-cyan-400 transition">
                Report
              </Link>
              <Link href="/user/status" className="hover:text-cyan-400 transition">
                Status
              </Link>
              <Link href="/user/ai-insights" className="hover:text-cyan-400 transition">
                AI Insights
              </Link>
            </nav>
          </div>
        </header>

        {/* PAGE */}
        <main className="max-w-7xl mx-auto px-6 py-10">
          {children}
        </main>

      </body>
    </html>
  );
}
