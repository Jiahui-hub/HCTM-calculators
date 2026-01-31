"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiChevronDown, FiChevronUp, FiArrowLeft, FiActivity, FiAlertCircle } from "react-icons/fi";

export default function PotassiumCalculator() {
  const router = useRouter();
  const [weight, setWeight] = useState("");
  const [currentK, setCurrentK] = useState("");
  const [targetK, setTargetK] = useState("4.0");
  const [openRef, setOpenRef] = useState(false);

  // --- Logic (KEPT EXACTLY AS PROVIDED) ---
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
      warningColor = "bg-red-50 border-red-200 text-red-800";
    } else if (k < 3.0) {
      potassiumWarning = "Moderate hypokalaemia (2.5–3.0 mmol/L). IV replacement with close monitoring.";
      warningColor = "bg-orange-50 border-orange-200 text-orange-800";
    } else if (k < 3.5) {
      potassiumWarning = "Mild hypokalaemia (3.0–3.5 mmol/L). Oral replacement preferred.";
      warningColor = "bg-amber-50 border-amber-200 text-amber-800";
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans pb-10">
      <style jsx global>{`
        body { background-color: #FDFDFD !important; }
        input[type='number']::-webkit-inner-spin-button { display: none; }
      `}</style>

      {/* Modern Header */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-indigo-600 font-medium hover:opacity-70 transition">
            <FiArrowLeft /> <span>Back</span>
          </button>
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <FiActivity className="text-indigo-600" />
            <span>K+ Calc</span>
          </div>
          <div className="w-10" /> 
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 pt-8 space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Potassium Deficit</h1>
          <p className="text-slate-500 text-sm">Calculate IV replacement based on body weight</p>
        </header>

        {/* Input Card */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputGroup label="Body Weight" unit="kg" value={weight} setValue={setWeight} />
            <InputGroup label="Measured K+" unit="mmol/L" value={currentK} setValue={setCurrentK} />
            <InputGroup label="Target K+" unit="mmol/L" value={targetK} setValue={setTargetK} />
          </div>
          
          <div className="mt-8 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
             <p className="text-xs font-semibold text-indigo-900 uppercase tracking-wider mb-1">Current Formula</p>
             <p className="text-sm text-indigo-700 italic">(Target K⁺ − Measured K⁺) × Weight (kg) × 0.4</p>
          </div>
        </section>

        {/* Dynamic Warning Alert */}
        {potassiumWarning && (
          <div className={`flex gap-3 p-4 rounded-2xl border animate-in fade-in slide-in-from-top-2 ${warningColor}`}>
            <FiAlertCircle className="shrink-0 mt-0.5" />
            <p className="text-sm font-medium">{potassiumWarning}</p>
          </div>
        )}

        {/* Results Card */}
        {deficit > 0 && (
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-200 animate-in zoom-in-95 duration-300">
            <div className="text-center space-y-1 mb-8">
              <span className="text-indigo-400 text-xs font-bold uppercase tracking-[0.2em]">Total Deficit</span>
              <h2 className="text-5xl font-black">{deficit.toFixed(1)} <small className="text-xl font-normal opacity-60">mmol</small></h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-2xl p-5 border border-white/10 text-center">
                <p className="text-xs text-indigo-300 font-medium mb-1">Volume (Injecsol K10)</p>
                <p className="text-2xl font-bold">{volumeML.toFixed(1)} <span className="text-sm font-normal">mL</span></p>
              </div>
              <div className="bg-white/10 rounded-2xl p-5 border border-white/10 text-center">
                <p className="text-xs text-indigo-300 font-medium mb-1">Suggested Vials</p>
                <p className="text-2xl font-bold">{suggestedVials} <span className="text-sm font-normal">Vial(s)</span></p>
              </div>
            </div>

            {Number(currentK) > 2.5 && (
              <div className="mt-6 flex items-center justify-center gap-2 text-xs bg-red-500/20 text-red-200 py-2 px-4 rounded-full">
                <span>⚠ Adjust infusion carefully (K &gt; 2.5)</span>
              </div>
            )}
          </div>
        )}

        {/* Information Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          <DisplayCard title="Dose Guidelines">
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex gap-2"><span>•</span> <span>IV infusion: initial 40-60 mEq</span></li>
              <li className="flex gap-2"><span>•</span> <span>Prophylaxis (PO): 20 mmol/day</span></li>
              <li className="flex gap-2"><span>•</span> <span>K &gt; 2.5: 10-15 mmol/hr (Max 200/day)</span></li>
              <li className="flex gap-2"><span>•</span> <span>K 3–3.5: PO 40–100 mmol/day (2-3 doses)</span></li>
            </ul>
          </DisplayCard>

          <DisplayCard title="Administration">
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex gap-2"><span>•</span> <span>IV: 1g in 100mL NS (1hr) or 2g/200mL (2hr)</span></li>
              <li className="flex gap-2"><span>•</span> <span>Peripheral: 10 mEq/100 mL</span></li>
              <li className="flex gap-2"><span>•</span> <span>Central: 20–40 mEq/100 mL</span></li>
            </ul>
          </DisplayCard>
        </div>

        {/* Safety & Notes */}
        <div className="space-y-4">
          <ExpandableSection title="Safety Guidance">
             <ul className="space-y-2 text-sm text-slate-600 list-disc pl-4">
                <li>Check renal & cardiac status before IV replacement</li>
                <li>Central access for rates &gt; 20 mmol/hr</li>
                <li>Re-check serum potassium after every 40–60 mmol</li>
                <li>Correct hypomagnesaemia if present</li>
             </ul>
          </ExpandableSection>

          <ExpandableSection title="Notes & Units">
             <ul className="space-y-2 text-sm text-slate-600 list-disc pl-4">
                <li>1 vial of K10% = 1g KCl (13.41 mmol)</li>
                <li>Potassium 1 mEq/L = 1 mmol/L</li>
                <li>Dilute before use; <strong>never bolus</strong></li>
             </ul>
          </ExpandableSection>

          <ReferenceSection openRef={openRef} setOpenRef={setOpenRef} />
        </div>

        <p className="text-[10px] text-slate-400 text-center pt-8 border-t border-slate-100 uppercase tracking-widest">
          Disclaimer: Use as a guide only. Verify calculations before clinical use.
        </p>
      </main>
    </div>
  );
}

// --- Specialized Helper Components ---

function InputGroup({ label, unit, value, setValue }: { label: string; unit: string; value: string; setValue: (v: string) => void }) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-tight">{label}</label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-4 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          placeholder="0.0"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase">{unit}</span>
      </div>
    </div>
  );
}

function DisplayCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
      <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">{title}</h3>
      {children}
    </div>
  );
}

function ExpandableSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 font-bold text-sm text-slate-700">
        {title} {open ? <FiChevronUp /> : <FiChevronDown />}
      </button>
      {open && <div className="p-4 pt-0 border-t border-slate-200/50 bg-white">{children}</div>}
    </div>
  );
}

function ReferenceSection({ openRef, setOpenRef }: any) {
  return (
    <div className="text-center">
      <button onClick={() => setOpenRef(!openRef)} className="text-xs font-medium text-slate-400 underline underline-offset-4">
        {openRef ? "Hide Reference" : "Show Reference Source"}
      </button>
      {openRef && (
        <div className="mt-4 p-4 text-[11px] text-slate-500 leading-relaxed bg-slate-50 rounded-xl italic">
          Alldredge B.K., et al. Koda-Kimble and Young’s Applied Therapeutics. 10th ed. Lippincott; 2013.
        </div>
      )}
    </div>
  );
}