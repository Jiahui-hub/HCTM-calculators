"use client"; // MUST be first line

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiChevronDown, FiChevronUp, FiArrowLeft, FiActivity, FiAlertCircle } from "react-icons/fi";

export default function PotassiumCalculator() {
  const router = useRouter();
  
  // --- STATE (Original) ---
  const [weight, setWeight] = useState("");
  const [currentK, setCurrentK] = useState("");
  const [targetK, setTargetK] = useState("4.0");
  const [openRef, setOpenRef] = useState(false);

  // --- CALCULATIONS (Original Content & Logic) ---
  const deficit =
    weight && currentK && targetK
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

  // --- WARNING LOGIC (Original Content) ---
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
    <div className="min-h-screen bg-[#F9FAFB] text-slate-900 font-sans pb-12">
      {/* Light Theme Global Styles */}
      <style jsx global>{`
        body { background-color: #F9FAFB !important; color: #0f172a !important; }
        input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
      `}</style>

      {/* Modern Top Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-indigo-600 font-semibold hover:opacity-70 transition-all active:scale-95"
          >
            <FiArrowLeft size={20} />
            <span>Back</span>
          </button>
          <div className="flex items-center gap-2">
            <FiActivity className="text-indigo-600" size={20} />
            <span className="font-bold tracking-tight">K+ Calculator</span>
          </div>
          <div className="w-12" />
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-5 pt-8 space-y-6">
        
        {/* Input Card */}
        <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-8 space-y-6 transition-all">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputGroup label="Body weight (kg)" value={weight} setValue={setWeight} placeholder="70" />
            <InputGroup label="Measured K+ (mmol/L)" value={currentK} setValue={setCurrentK} placeholder="3.2" />
            <InputGroup label="Target K+ (mmol/L)" value={targetK} setValue={setTargetK} placeholder="4.0" />
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Formula used:</h3>
            <p className="text-sm font-medium text-slate-700 italic">
              Potassium deficit (mmol) = (Target K⁺ − Measured K⁺) × Weight (kg) × 0.4
            </p>
          </div>
        </section>

        {/* Original Warnings */}
        {potassiumWarning && (
          <div className={`flex gap-3 p-4 rounded-2xl border animate-in fade-in slide-in-from-top-2 ${warningColor}`}>
            <FiAlertCircle className="shrink-0 mt-0.5" size={18} />
            <p className="text-sm font-bold">{potassiumWarning}</p>
          </div>
        )}

        {/* Results Card */}
        {deficit > 0 && (
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-slate-200 transition-all animate-in zoom-in-95">
            <div className="text-center space-y-1 mb-8">
              <span className="text-indigo-400 text-[10px] font-black uppercase tracking-widest">Total Deficit Result</span>
              <h2 className="text-6xl font-black tracking-tighter tabular-nums">
                {deficit.toFixed(1)} <span className="text-xl font-normal opacity-50 italic">mmol</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white/10 rounded-2xl p-5 border border-white/10">
                <p className="text-[10px] font-bold text-indigo-300 uppercase mb-1">Volume (Injecsol K10)</p>
                <p className="text-2xl font-black">{volumeML.toFixed(1)} <span className="text-sm font-normal">mL</span></p>
              </div>
              <div className="bg-indigo-500/20 rounded-2xl p-5 border border-indigo-500/30">
                <p className="text-[10px] font-bold text-indigo-300 uppercase mb-1">Suggested Vials</p>
                <p className="text-2xl font-black">{suggestedVials} <span className="text-sm font-normal italic">vial(s)</span></p>
              </div>
            </div>

            {Number(currentK) > 2.5 && (
              <div className="mt-6 flex items-center justify-center gap-2 text-[11px] bg-red-500/20 text-red-200 py-2.5 px-4 rounded-xl border border-red-500/20">
                ⚠ Measured potassium &gt; 2.5 mmol/L — adjust infusion carefully
              </div>
            )}
          </div>
        )}

        {/* Information Grid (Original Content) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DetailCard title="Dose">
            <ul className="text-xs space-y-2.5 text-slate-600 font-medium">
              <li>• IV infusion: individualized; initial 40-60 mEq</li>
              <li>• Prophylaxis (PO): 20 mmol/day; adjust per level</li>
              <li>• Normal daily requirement: 40-80 mEq</li>
              <li>• Potassium &gt; 2.5 mmol/L: IV 10-15 mmol/hr</li>
              <li>• Potassium 3–3.5 mmol/L: PO 40–100 mmol/day</li>
            </ul>
          </DetailCard>

          <DetailCard title="Administration">
            <ul className="text-xs space-y-2.5 text-slate-600 font-medium">
              <li>• IV: 1g / 100 mL NS (1 hr) or 2g / 200 mL NS (2 hrs)</li>
              <li>• Peripheral: 10 mEq/100 mL</li>
              <li>• Central: 20–40 mEq/100 mL</li>
            </ul>
          </DetailCard>
        </div>

        {/* Collapsible Sections (Original Content) */}
        <div className="space-y-3">
          <ExpandableItem title="Notes">
            <ul className="text-xs space-y-2 text-slate-600 list-disc pl-4 font-medium">
              <li>1 vial of K10% = 1g KCl (13.41 mmol)</li>
              <li>Potassium 1 mEq/L = 1 mmol/L</li>
              <li>Dilute before use; not for bolus</li>
            </ul>
          </ExpandableItem>

          <ExpandableItem title="Safety Guidance">
            <ul className="text-xs space-y-2 text-slate-600 list-disc pl-4 font-medium">
              <li>Check renal & cardiac status before IV replacement</li>
              <li>Central access for rates &gt; 20 mmol/hr</li>
              <li>Re-check serum K+ after every 40–60 mmol</li>
              <li>Correct hypomagnesaemia if present</li>
            </ul>
          </ExpandableItem>

          {/* Reference */}
          <div className="pt-4 border-t border-slate-200">
            <button 
              onClick={() => setOpenRef(!openRef)}
              className="flex w-full items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest"
            >
              Reference Material {openRef ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            {openRef && (
              <div className="mt-4 p-4 bg-white border border-slate-100 rounded-2xl text-[11px] text-slate-500 italic leading-relaxed">
                Alldredge B.K., Corelli R.L., Ernst M.E., Guglielmo B.J., Jacobson P.A., Kradjan W.A. Koda-Kimble and Young’s Applied Therapeutics. 10th ed. Lippincott; 2013.
              </div>
            )}
          </div>
        </div>

        <footer className="text-center pt-8">
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em]">Disclaimer</p>
          <p className="text-[10px] text-slate-400 mt-1 max-w-[280px] mx-auto">
            Use as a guide. Verify all calculations before clinical application.
          </p>
        </footer>
      </main>
    </div>
  );
}

// --- Helper UI Components ---

function InputGroup({ label, value, setValue, placeholder }: any) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 font-bold text-lg outline-none transition-all focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500"
      />
    </div>
  );
}

function DetailCard({ title, children }: any) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm">
      <h3 className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-800 mb-4 flex items-center gap-2">
        <span className="w-1 h-3 bg-indigo-500 rounded-full"></span> {title}
      </h3>
      {children}
    </div>
  );
}

function ExpandableItem({ title, children }: any) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <button 
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-xs font-bold text-slate-700 uppercase tracking-widest"
      >
        {title} {open ? <FiChevronUp /> : <FiChevronDown />}
      </button>
      {open && <div className="px-4 pb-4 animate-in fade-in slide-in-from-top-1">{children}</div>}
    </div>
  );
}