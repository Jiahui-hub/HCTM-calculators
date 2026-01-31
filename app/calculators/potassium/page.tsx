"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { 
  FiChevronDown, 
  FiChevronUp, 
  FiArrowLeft, 
  FiActivity, 
  FiShield, 
  FiInfo, 
  FiBookOpen, 
  FiAlertTriangle 
} from "react-icons/fi";

export default function PotassiumCalculator() {
  const router = useRouter();
  const [weight, setWeight] = useState("");
  const [currentK, setCurrentK] = useState("");
  const [targetK, setTargetK] = useState("4.0");
  const [openRef, setOpenRef] = useState(false);

  // --- CONTENT & LOGIC (STRICTLY PRESERVED) ---
  const deficit = weight && currentK && targetK
      ? (Number(targetK) - Number(currentK)) * Number(weight) * 0.4
      : 0;

  const mmolPer10ML = 13.41;
  const vialML = 10;
  const mmolPerML = mmolPer10ML / vialML;
  const volumeML = deficit > 0 ? deficit / mmolPerML : 0;

  let suggestedVials = 0;
  if (volumeML > 0) {
    if (volumeML <= 14) suggestedVials = 1;
    else if (volumeML <= 16) suggestedVials = 2;
    else if (volumeML <= 20) suggestedVials = 2;
    else if (volumeML <= 24) suggestedVials = 2;
    else if (volumeML <= 30) suggestedVials = 3;
    else if (volumeML <= 35) suggestedVials = 3;
    else suggestedVials = Math.ceil(volumeML / vialML);
  }

  let potassiumWarning = "";
  let warningColor = "";
  const k = Number(currentK);
  if (k > 0) {
    if (k < 2.5) {
      potassiumWarning = "Severe hypokalaemia (<2.5 mmol/L). Continuous ECG monitoring required.";
      warningColor = "bg-red-50 text-red-700 border-red-100";
    } else if (k < 3.0) {
      potassiumWarning = "Moderate hypokalaemia (2.5–3.0 mmol/L). IV replacement with close monitoring.";
      warningColor = "bg-orange-50 text-orange-700 border-orange-100";
    } else if (k < 3.5) {
      potassiumWarning = "Mild hypokalaemia (3.0–3.5 mmol/L). Oral replacement preferred.";
      warningColor = "bg-amber-50 text-amber-700 border-amber-100";
    }
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-900 font-sans selection:bg-indigo-100">
      {/* Modern Font and Light Theme Lock */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        body { background-color: #F9FAFB !important; font-family: 'Inter', sans-serif !important; }
        input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
      `}</style>

      {/* Floating Modern Header */}
      <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-lg border-b border-slate-200/60 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-indigo-600 transition-all active:scale-95"
          >
            <FiArrowLeft size={18} />
            <span className="font-semibold text-sm">Back</span>
          </button>
          
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-indigo-600 rounded-lg shadow-indigo-200 shadow-lg">
              <FiActivity className="text-white" size={16} />
            </div>
            <span className="font-extrabold tracking-tight text-slate-800 uppercase text-xs">Clinical K+ Calc</span>
          </div>
          <div className="w-[72px]" /> {/* Spacer for symmetry */}
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-5 py-8 space-y-8">
        {/* Title Section */}
        <header className="text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Potassium <span className="text-indigo-600">Deficit</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Precision replacement calculator</p>
        </header>

        {/* Input Card */}
        <section className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/40 p-8 border border-slate-100 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <ModernInput label="Body Weight" unit="kg" value={weight} setValue={setWeight} placeholder="0" />
            <ModernInput label="Measured K+" unit="mmol" value={currentK} setValue={setCurrentK} placeholder="0.0" />
            <ModernInput label="Target K+" unit="mmol" value={targetK} setValue={setTargetK} placeholder="4.0" />
          </div>

          <div className="bg-indigo-50/50 rounded-2xl p-5 border border-indigo-100/50">
            <h3 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Formula Used</h3>
            <p className="text-sm font-semibold text-indigo-800">
              (Target K⁺ − Measured K⁺) × Weight (kg) × 0.4
            </p>
            <p className="text-[11px] text-indigo-500 mt-1 italic">Note: 1 mEq/L = 1 mmol/L</p>
          </div>
        </section>

        {/* Dynamic Warning */}
        {potassiumWarning && (
          <div className={`p-4 rounded-2xl border flex gap-3 items-start animate-in fade-in slide-in-from-top-2 ${warningColor}`}>
            <FiAlertTriangle className="shrink-0 mt-1" size={18} />
            <p className="text-sm font-bold leading-snug">⚠ {potassiumWarning}</p>
          </div>
        )}

        {/* Results Card */}
        {deficit > 0 && (
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-200 animate-in zoom-in-95 duration-300">
            <div className="text-center space-y-1 mb-8">
              <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em]">Required Deficit</span>
              <h2 className="text-6xl font-black tracking-tighter">
                {deficit.toFixed(1)} <span className="text-2xl font-normal text-slate-500 italic">mmol</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ResultTile label="Volume (Injecsol K10)" value={`${volumeML.toFixed(1)} mL`} />
              <ResultTile label="Suggested Vials" value={`${suggestedVials} Vial(s)`} highlight />
            </div>

            {Number(currentK) > 2.5 && (
              <div className="mt-6 flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 py-2.5 px-4 rounded-2xl text-red-200 text-xs font-semibold">
                <FiAlertTriangle />
                <span>Measured K &gt; 2.5 mmol/L — adjust infusion carefully</span>
              </div>
            )}
          </div>
        )}

        {/* Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoCard title="Dose" icon={<FiInfo size={16}/>}>
            <ul className="text-xs space-y-2 text-slate-600 font-medium">
              <li className="flex gap-2"><span>•</span> <span>IV infusion: individualized; initial 40-60 mEq</span></li>
              <li className="flex gap-2"><span>•</span> <span>Prophylaxis (PO): 20 mmol/day; adjust per level</span></li>
              <li className="flex gap-2"><span>•</span> <span>Normal daily requirement: 40-80 mEq</span></li>
              <li className="flex gap-2"><span>•</span> <span>K &gt; 2.5: IV 10-15 mmol/hr, max 200/day</span></li>
              <li className="flex gap-2"><span>•</span> <span>K 3–3.5: PO 40–100 mmol/day in 2–3 doses</span></li>
            </ul>
          </InfoCard>

          <InfoCard title="Administration" icon={<FiZap size={16} className="text-amber-500"/>}>
            <ul className="text-xs space-y-2 text-slate-600 font-medium">
              <li className="flex gap-2"><span>•</span> <span>IV: 1g/100mL NS (1hr) or 2g/200mL NS (2hr)</span></li>
              <li className="flex gap-2"><span>•</span> <span>Peripheral: 10 mEq/100 mL</span></li>
              <li className="flex gap-2"><span>•</span> <span>Central: 20–40 mEq/100 mL</span></li>
            </ul>
          </InfoCard>
        </div>

        {/* Collapsible Guidance */}
        <div className="space-y-3">
          <CollapsibleSection title="Notes">
            <ul className="text-xs space-y-2 text-slate-600 list-disc pl-4 font-medium">
              <li>1 vial of K10% = 1g KCl</li>
              <li>1g KCl = 13.41 mmol</li>
              <li>Potassium 1 mEq/L = 1 mmol/L</li>
              <li>Dilute before use; not for bolus</li>
            </ul>
          </CollapsibleSection>

          <CollapsibleSection title="Safety Guidance">
            <ul className="text-xs space-y-2 text-slate-600 list-disc pl-4 font-medium">
              <li>Check renal & cardiac status before IV replacement</li>
              <li>Central access for rates &gt; 20 mmol/hr</li>
              <li>Re-check serum potassium after every 40–60 mmol</li>
              <li>Correct hypomagnesaemia if present</li>
            </ul>
          </CollapsibleSection>

          {/* Reference */}
          <div className="pt-4">
            <button 
              onClick={() => setOpenRef(!openRef)}
              className="flex w-full items-center justify-between p-4 rounded-2xl bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                <FiBookOpen /> Reference Source
              </span>
              {openRef ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            {openRef && (
              <div className="p-5 text-[11px] leading-relaxed text-slate-500 italic bg-white border border-slate-100 rounded-b-2xl animate-in slide-in-from-top-2">
                Alldredge B.K., Corelli R.L., Ernst M.E., Guglielmo B.J., Jacobson P.A., Kradjan W.A. Koda-Kimble and Young’s Applied Therapeutics. 10th ed. Lippincott; 2013.
              </div>
            )}
          </div>
        </div>

        <footer className="pt-10 text-center border-t border-slate-200">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-2">Disclaimer</p>
          <p className="text-[10px] text-slate-400 leading-relaxed max-w-xs mx-auto">
            Use as a guide only. Verify all calculations before clinical application.
          </p>
        </footer>
      </main>
    </div>
  );
}

// --- REUSABLE MODERN COMPONENTS ---

function ModernInput({ label, unit, value, setValue, placeholder }: any) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{label}</label>
      <div className="relative group">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 font-bold text-lg outline-none transition-all focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500"
        />
        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300 uppercase group-focus-within:text-indigo-400 transition-colors">
          {unit}
        </span>
      </div>
    </div>
  );
}

function ResultTile({ label, value, highlight = false }: any) {
  return (
    <div className={`rounded-3xl p-6 transition-all border ${highlight ? 'bg-indigo-600/20 border-indigo-500/30' : 'bg-white/10 border-white/10 hover:bg-white/20'}`}>
      <p className={`text-[10px] font-bold uppercase mb-1 tracking-wider ${highlight ? 'text-indigo-300' : 'text-slate-400'}`}>{label}</p>
      <p className="text-2xl font-black tabular-nums">{value}</p>
    </div>
  );
}

function InfoCard({ title, icon, children }: any) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 bg-slate-50 rounded-lg text-indigo-600">{icon}</div>
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-800">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function CollapsibleSection({ title, children }: any) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-xs font-bold text-slate-700 uppercase tracking-widest hover:bg-slate-50 transition-colors"
      >
        {title} {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </button>
      {isOpen && <div className="p-5 pt-0 border-t border-slate-50 animate-in fade-in duration-300">{children}</div>}
    </div>
  );
}

function FiZap({ size, className }: any) { return <svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height={size} width={size} xmlns="http://www.w3.org/2000/svg"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>; }