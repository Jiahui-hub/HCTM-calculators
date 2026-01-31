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

  // --- Logic (Original Content & Logic) ---
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
    else if (volumeML <= 24) suggestedVials = 2;
    else if (volumeML <= 35) suggestedVials = 3;
    else suggestedVials = Math.ceil(volumeML / vialML);
  }

  const k = Number(currentK);
  let potassiumWarning = "";
  let warningColor = "";
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
    <div className="min-h-screen bg-[#FBFBFE] text-slate-900 font-sans pb-16">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        body { font-family: 'Inter', sans-serif; background-color: #FBFBFE !important; }
        input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
      `}</style>

      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-indigo-600 font-bold hover:opacity-70 transition-all">
            <FiArrowLeft size={20} /> <span className="text-sm">Back</span>
          </button>
          <div className="flex items-center gap-2 font-black text-slate-800 uppercase tracking-tighter italic">
            <FiActivity className="text-indigo-600" /> K+ Precision
          </div>
          <div className="w-12" />
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 mt-8 space-y-6">
        {/* Input Card - Perfect Alignment Grid */}
        <section className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputBox label="Weight (kg)" value={weight} onChange={setWeight} placeholder="70" />
            <InputBox label="Current K+" value={currentK} onChange={onChange(setCurrentK)} placeholder="3.2" />
            <InputBox label="Target K+" value={targetK} onChange={onChange(setTargetK)} placeholder="4.0" />
          </div>
          
          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Calculation Formula</p>
             <p className="text-sm text-slate-600 italic font-medium">(Target K⁺ − Measured K⁺) × Weight × 0.4</p>
          </div>
        </section>

        {/* Warning Section */}
        {potassiumWarning && (
          <div className={`flex gap-3 p-4 rounded-2xl border ${warningColor} animate-in fade-in duration-300`}>
            <FiAlertCircle className="shrink-0 mt-0.5" />
            <p className="text-sm font-bold leading-tight">{potassiumWarning}</p>
          </div>
        )}

        {/* Results Block - Perfectly Centered and Aligned */}
        {deficit > 0 && (
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-200">
            <div className="text-center mb-8">
              <span className="text-indigo-200 text-[10px] font-black uppercase tracking-widest">Total Deficit Required</span>
              <h2 className="text-6xl font-black tracking-tighter mt-1">{deficit.toFixed(1)}<span className="text-xl font-normal opacity-60 ml-2">mmol</span></h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-2xl p-5 text-center border border-white/10">
                <p className="text-[10px] font-bold text-indigo-200 uppercase mb-1 tracking-widest">Volume (mL)</p>
                <p className="text-2xl font-black tabular-nums">{volumeML.toFixed(1)}</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-5 text-center border border-white/10">
                <p className="text-[10px] font-bold text-indigo-200 uppercase mb-1 tracking-widest">Vial(s)</p>
                <p className="text-2xl font-black tabular-nums">{suggestedVials}</p>
              </div>
            </div>
          </div>
        )}

        {/* Info Grid - Same Height Alignment */}
        <div className="grid md:grid-cols-2 gap-4">
          <InfoCard title="Dose Guidelines">
            <ul className="text-xs space-y-3 text-slate-600 font-medium">
              <li>• IV infusion: individualized; initial 40-60 mEq</li>
              <li>• Prophylaxis (PO): 20 mmol/day</li>
              <li>• Normal daily requirement: 40-80 mEq</li>
              <li>• K &gt; 2.5: IV 10-15 mmol/hr (Max 200/day)</li>
              <li>• K 3–3.5: PO 40–100 mmol/day (2–3 doses)</li>
            </ul>
          </InfoCard>

          <InfoCard title="Administration">
            <ul className="text-xs space-y-3 text-slate-600 font-medium">
              <li>• IV: 1g/100mL NS (1hr) or 2g/200mL NS (2hr)</li>
              <li>• Peripheral: 10 mEq/100 mL</li>
              <li>• Central: 20–40 mEq/100 mL</li>
              <li>• Dilute before use; not for bolus</li>
            </ul>
          </InfoCard>
        </div>

        {/* Safety & Notes Accordions */}
        <div className="space-y-3">
          <Accordion title="Clinical Notes">
            <ul className="text-xs space-y-2 text-slate-600 list-disc pl-4 font-medium">
              <li>1 vial of K10% = 1g KCl (13.41 mmol)</li>
              <li>Potassium 1 mEq/L = 1 mmol/L</li>
            </ul>
          </Accordion>

          <Accordion title="Safety Guidance">
            <ul className="text-xs space-y-2 text-slate-600 list-disc pl-4 font-medium">
              <li>Check renal & cardiac status before IV replacement</li>
              <li>Central access for rates &gt; 20 mmol/hr</li>
              <li>Re-check serum potassium after every 40–60 mmol</li>
              <li>Correct hypomagnesaemia if present</li>
            </ul>
          </Accordion>
        </div>

        {/* Footer Reference */}
        <footer className="pt-10 border-t border-slate-200">
          <button onClick={() => setOpenRef(!openRef)} className="flex items-center justify-between w-full text-xs font-black text-slate-400 uppercase tracking-widest">
            References {openRef ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          {openRef && (
            <p className="mt-4 p-4 bg-slate-50 rounded-xl text-[10px] leading-relaxed text-slate-500 italic">
              Alldredge B.K., Corelli R.L., Ernst M.E., Guglielmo B.J., Jacobson P.A., Kradjan W.A. Koda-Kimble and Young’s Applied Therapeutics. 10th ed. Lippincott; 2013.
            </p>
          )}
          <p className="mt-8 text-[9px] text-slate-300 text-center uppercase tracking-widest font-black">
            Clinical Aid Only • Verify All Calculations
          </p>
        </footer>
      </main>
    </div>
  );
}

// --- Components with Fixed Alignment ---

function InputBox({ label, value, onChange, placeholder }: any) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 font-bold text-lg outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all"
      />
    </div>
  );
}

function InfoCard({ title, children }: any) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col h-full">
      <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-4 border-l-2 border-indigo-500 pl-3 leading-none">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Accordion({ title, children }: any) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-4 text-[10px] font-black text-slate-700 uppercase tracking-widest hover:bg-slate-50 transition-all">
        {title} {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </button>
      {isOpen && <div className="p-5 pt-0 border-t border-slate-50 animate-in fade-in">{children}</div>}
    </div>
  );
}

function onChange(fn: (v: string) => void) {
  return (val: string) => fn(val);
}