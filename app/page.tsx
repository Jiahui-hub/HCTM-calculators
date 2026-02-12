
import React, { useState } from 'react';
import Calculator from './components/Calculator';
import { Theme } from './types';

// Simple navigation state for demonstration
type Route = 'home' | 'calc-general' | 'ibw' | 'potassium' | 'sodium' | 'magnesium';

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<Route>('home');
  const [theme] = useState<Theme>(Theme.DARK); // Keeping a consistent professional dark theme

  const tiles = [
    {
      title: "IBW & AdjBW",
      shortTitle: "Weight",
      description: "Calculate Ideal Body Weight & Adjusted Body Weight",
      route: "ibw" as Route,
      icon: "🧍‍♂️",
      color: "from-blue-500/20 to-indigo-500/20",
      iconColor: "text-blue-400"
    },
    {
      title: "Potassium",
      shortTitle: "K+",
      description: "Estimate potassium deficit safely using clinical norms",
      route: "potassium" as Route,
      icon: "🧪",
      color: "from-emerald-500/20 to-teal-500/20",
      iconColor: "text-emerald-400"
    },
    {
      title: "Sodium",
      shortTitle: "Na+",
      description: "Correct sodium safely with deficit estimations",
      route: "sodium" as Route,
      icon: "🧂",
      color: "from-amber-500/20 to-orange-500/20",
      iconColor: "text-amber-400"
    },
    {
      title: "Magnesium",
      shortTitle: "Mg2+",
      description: "Check magnesium levels and replacement needs",
      route: "magnesium" as Route,
      icon: "⚗️",
      color: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-400"
    },
  ];

  if (currentRoute !== 'home') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <button 
          onClick={() => setCurrentRoute('home')}
          className="mb-8 text-slate-400 hover:text-white flex items-center gap-2 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Back to Dashboard
        </button>
        {currentRoute === 'calc-general' ? <Calculator theme={Theme.DARK} /> : (
          <div className="text-center p-12 bg-slate-900 rounded-[2rem] border border-slate-800 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">Calculator Under Maintenance</h2>
            <p className="text-slate-400">The specialized module for {currentRoute.toUpperCase()} is being calibrated.</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 p-6 md:p-12 font-sans selection:bg-indigo-500/30 overflow-y-auto">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Header Section */}
        <header className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-widest uppercase mb-6">
            Clinical Reference Tools
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
            HCTM <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Calculators</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-lg mx-auto leading-relaxed">
            High-precision medical estimation tools designed for clinical efficiency and accuracy.
          </p>
        </header>

        {/* Tiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {tiles.map((item, index) => (
            <div
              key={index}
              onClick={() => setCurrentRoute(item.route)}
              className="group relative cursor-pointer animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800 hover:border-slate-700 p-8 rounded-3xl transition-all duration-300 transform group-hover:-translate-y-2 flex flex-col items-center md:items-start text-center md:text-left">
                
                {/* Icon Circle */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  {item.icon}
                </div>

                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center text-xs font-bold text-indigo-400 uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-300">
                  Launch Tool
                  <svg className="ml-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </div>
              </div>
            </div>
          ))}
          
          {/* General Purpose Calculator Tile */}
          <div
            onClick={() => setCurrentRoute('calc-general')}
            className="md:col-span-2 group relative cursor-pointer animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
            style={{ animationDelay: `600ms` }}
          >
            <div className="relative bg-slate-900/40 backdrop-blur-xl border border-dashed border-slate-800 hover:border-indigo-500/50 p-6 rounded-3xl transition-all duration-300 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-xl">
                  🧮
                </div>
                <div>
                  <h3 className="text-white font-semibold">Scientific Calculator</h3>
                  <p className="text-slate-500 text-xs">General purpose calculations</p>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-slate-800 group-hover:bg-indigo-500 transition-colors">
                <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer Section */}
        <footer className="mt-20 max-w-2xl text-center animate-in fade-in duration-1000 delay-700">
          <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800/50">
            <p className="text-slate-500 text-sm leading-relaxed">
              <strong className="text-slate-400 uppercase tracking-widest text-[10px] block mb-2">Disclaimer</strong>
              Calculations are for reference only. Always verify and consult clinical judgment.
            </p>
          </div>
          <p className="mt-8 text-slate-600 text-[10px] uppercase tracking-[0.2em]">
            © 2024 HCTM MEDICAL SYSTEMS • V1.2.0
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
