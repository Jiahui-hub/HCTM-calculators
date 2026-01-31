"use client"; // MUST be first line

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiChevronDown, FiChevronUp, FiArrowLeft, FiAlertTriangle, FiInfo, FiActivity, FiShield } from "react-icons/fi";

export default function PotassiumCalculator() {
  const router = useRouter();
  const [weight, setWeight] = useState("");
  const [currentK, setCurrentK] = useState("");
  const [targetK, setTargetK] = useState("4.0");
  const [openRef, setOpenRef] = useState(false);

  // --- Logic (Unchanged) ---
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

  let potassiumWarning = "";
  let warningClasses = "";
  const k = Number(currentK);
  if (k > 0) {
    if (k < 2.5) {
      potassiumWarning = "Severe hypokalaemia (<2.5 mmol/L). Continuous ECG monitoring required.";
      warningClasses = "bg-red-50 text-red-700 border-red-200";
    } else if (k < 3.0) {
      potassiumWarning = "Moderate hypokalaemia (2.5–3.0 mmol/L). IV replacement with close monitoring.";
      warningClasses = "bg-orange-50 text-orange-700 border-orange-200";
    } else if (k < 3.5) {
      potassiumWarning = "Mild hypokalaemia (3.0–3.5 mmol/L). Oral replacement preferred.";
      warningClasses = "bg-yellow-50 text-yellow-700 border-yellow-200";
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-slate-800 font-sans pb-12">
      {/* Dynamic Background Blur - subtle creative touch */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-100 rounded-full blur-[120px] opacity-60" />
      </div>

      {/* Header Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-white shadow-sm px-6 py-4 flex items-center">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors flex items-center gap-2 font-medium text-slate-600"
        >
          <FiArrowLeft size={20} />
          <span>Home</span>
        </button>
        <div className="flex-1 text-center">
          <span className="font-bold text-slate-900 tracking-tight">HCTM Utilities</span>
        </div>
        <div className="w-20" /> {/* Spacer for balance */}
      </nav>

      <main className="max-w-3xl mx-auto px-4 mt-8">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">Potassium Deficit</h1>
          <p className="text-slate-500 font-medium italic">Clinical Replacement Guide</p>
        </div>

        {/* Input Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-6 md:p-8 mb-6 border border-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputField label="Body Weight" unit="kg" value={weight} onChange={setWeight} />
            <InputField label="Measured K⁺" unit="mmol/L" value={currentK} onChange={setCurrentK} />
            <InputField label="Target K⁺" unit="mmol/L" value={targetK} onChange={setTargetK} />
          </div>

          {/* Warning Banner */}
          {potassiumWarning && (
            <div className={`mt-6 p-4 rounded-2xl border flex items-start gap-3 transition-all duration-300 ${warningClasses}`}>
              <FiAlertTriangle className="mt-1 flex-shrink-0" />
              <p className="text-sm font-semibold leading-relaxed">{potassiumWarning}</p>
            </div>
          )}
        </div>

        {/* Results Hero */}
        {deficit > 0 && (
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 text-white shadow-lg shadow-emerald-200 mb-8 transform transition-all animate-in fade-in slide-in-from-bottom-4">
            <div className="flex flex-col items-center text-center">
              <span className="text-emerald-100 uppercase tracking-widest text-xs font-bold mb-2">Estimated Deficit</span>
              <div className="text-5xl font-black mb-6">{deficit.toFixed(1)} <span className="text-2xl font-normal opacity-80">mmol</span></div>
              
              <div className="w-full h-px bg-white/20 mb-6" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <p className="text-xs text-emerald-100 mb-1 font-medium">Required Volume</p>
                  <p className="text-xl font-bold">{volumeML.toFixed(1)} mL</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <p className="text-xs text-emerald-100 mb-1 font-medium">Suggested Vials</p>
                  <p className="text-xl font-bold">{suggestedVials} Vials <span className="text-sm font-normal">(Injecsol K)</span></p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Section icon={<FiActivity className="text-indigo-500"/>} title="Dose Guidelines">
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• IV: Initial 40-60 mEq (individualized)</li>
              <li>• Prophylaxis: 20 mmol/day</li>
              <li>• Normal requirement: 40-80 mEq/day</li>
              <li>• {">"} 2.5 mmol/L: IV 10-15 mmol/hr</li>
              <li>• 3.0–3.5 mmol/L: PO 40–100 mmol/day</li>
            </ul>
          </Section>

          <Section icon={<FiShield className="text-emerald-500"/>} title="Administration">
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• 1g in 100mL NS (1hr) or 2g in 200mL NS (2hrs)</li>
              <li>• Peripheral: 10 mEq/100 mL</li>
              <li>• Central: 20–40 mEq/100 mL</li>
              <li>• <span className="text-red-500 font-semibold">Never bolus KCl</span></li>
            </ul>
          </Section>
        </div>

        {/* Collapsible Reference & Notes */}
        <div className="space-y-4">
            <details className="group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer list-none font-semibold text-slate-700 hover:bg-slate-50">
                    <span className="flex items-center gap-2"><FiInfo className="text-blue-500"/> Conversion Notes</span>
                    <FiChevronDown className="transition-transform group-open:rotate-180" />
                </summary>
                <div className="p-4 pt-0 text-sm text-slate-600 border-t border-slate-50 space-y-1">
                    <p>• 1 vial K10% = 1g KCl</p>
                    <p>• 1g KCl = 13.41 mmol</p>
                    <p>• 1 mEq/L = 1 mmol/L</p>
                </div>
            </details>

            <details className="group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer list-none font-semibold text-slate-700 hover:bg-slate-50">
                    <span className="flex items-center gap-2"><FiShield className="text-orange-500"/> Safety Check</span>
                    <FiChevronDown className="transition-transform group-open:rotate-180" />
                </summary>
                <div className="p-4 pt-0 text-sm text-slate-600 border-t border-slate-50 space-y-2">
                    <p>• Verify renal and cardiac function</p>
                    <p>• Central access required for {">"} 20 mmol/hr</p>
                    <p>• Re-check K⁺ every 40-60 mmol infused</p>
                </div>
            </details>

            <div className="p-4 text-center">
                <button 
                  onClick={() => setOpenRef(!openRef)}
                  className="text-xs text-slate-400 hover:text-indigo-500 transition-colors uppercase tracking-widest font-bold"
                >
                  {openRef ? "Hide Reference" : "Show Reference"}
                </button>
                {openRef && (
                  <p className="mt-4 text-[11px] text-slate-400 italic max-w-md mx-auto leading-relaxed animate-in fade-in duration-500">
                    Alldredge B.K., et al. Koda-Kimble and Young’s Applied Therapeutics. 10th ed. Lippincott; 2013.
                  </p>
                )}
            </div>
        </div>

        {/* Disclaimer */}
        <footer className="mt-12 text-center">
           <p className="text-[10px] text-slate-400 uppercase tracking-tighter max-w-xs mx-auto">
             For clinical reference only. Professional judgment must override automated calculations.
           </p>
        </footer>
      </main>
    </div>
  );
}

// --- High-Quality UI Sub-components ---

function InputField({ label, unit, value, onChange }: { label: string; unit: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">{label}</label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0.0"
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-300"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-100 shadow-sm">
          {unit}
        </span>
      </div>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-4 font-bold text-slate-800">
        {icon}
        <h3>{title}</h3>
      </div>
      {children}
    </div>
  );
}