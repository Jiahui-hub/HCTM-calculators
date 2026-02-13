import Link from "next/link";

const tiles = [
  {
    title: "IBW & Adjusted Body Weight",
    description: "Calculate Ideal Body Weight & Adjusted Body Weight",
    route: "ibw",
    icon: "🧍‍♂️",
  },
  {
    title: "Potassium",
    description: "Estimate potassium deficit safely",
    route: "potassium",
    icon: "🧪",
  },
  {
    title: "Sodium",
    description: "Hyponatremia & Hypernatremia management",
    route: "sodium",
    icon: "🧂",
  },
  {
    title: "Magnesium",
    description: "Magnesium replacement estimation",
    route: "magnesium",
    icon: "⚗️",
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen p-6 md:p-12 flex flex-col items-center">

      <header className="text-center mb-16">
        <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-widest uppercase mb-6">
          Clinical Reference Tools
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
          HCTM <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">
            Calculators
          </span>
        </h1>

        <p className="text-slate-400 text-lg max-w-lg mx-auto">
          High-precision medical estimation tools designed for clinical efficiency.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {tiles.map((item, index) => (
          <Link
            key={index}
            href={`/calculators/${item.route}`}
            className="group relative cursor-pointer"
          >
            <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800 hover:border-indigo-500/50 p-8 rounded-3xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center md:items-start text-center md:text-left">

              <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-3xl mb-6">
                {item.icon}
              </div>

              <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                {item.title}
              </h2>

              <p className="text-slate-400 text-sm">
                {item.description}
              </p>

              <div className="mt-6 text-xs font-bold text-indigo-400 uppercase tracking-widest">
                Launch Tool →
              </div>
            </div>
          </Link>
        ))}
      </div>

      <footer className="mt-20 max-w-2xl text-center">
        <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800/50">
          <p className="text-slate-500 text-sm">
            Calculations are for reference only. Always verify with clinical judgment.
          </p>
        </div>

        <p className="mt-8 text-slate-600 text-[10px] uppercase tracking-[0.2em]">
          © 2026 HCTM MEDICAL SYSTEMS
        </p>
      </footer>
    </div>
  );
}
