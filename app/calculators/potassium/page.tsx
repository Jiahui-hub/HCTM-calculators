"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { FiChevronDown, FiChevronUp, FiArrowLeft, FiActivity, FiAlertTriangle, FiInfo } from "react-icons/fi";

export default function PotassiumCalculator() {
  const router = useRouter();
  const [weight, setWeight] = useState("");
  const [currentK, setCurrentK] = useState("");
  const [targetK, setTargetK] = useState("4.0");
  const [openRef, setOpenRef] = useState(false);

  // Logic Memoization for performance
  const { deficit, volumeML, suggestedVials } = useMemo(() => {
    const w = Number(weight);
    const ck = Number(currentK);
    const tk = Number(targetK);
    
    if (!w || !ck || !tk) return { deficit: 0, volumeML: 0, suggestedVials: 0 };

    const d = (tk - ck) * w * 0.4;
    const mmolPerML = 13.41 / 10;
    const v = d > 0 ? d / mmolPerML : 0;

    let vials = 0;
    if (v > 0) {
      if (v <= 14) vials = 1;
      else if (v <= 24) vials = 2;
      else if (v <= 35) vials = 3;
      else vials = Math.ceil(v / 10);
    }

    return { deficit: d, volumeML: v, suggestedVials: vials };
  }, [weight, currentK, targetK]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-100">
      {/* Light Theme Force Style */}
      <style jsx global>{`
        body { background-color: #F8FAFC !important; color: #1e293b !important; }
        input[type='number']::-webkit-inner-spin-button, 
        input[type='number']::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
      `}</style>

      {/* Modern Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors flex items-center gap-2 text-indigo-600 font-medium"
        >
          <FiArrowLeft size={20} />
          <span className="hidden sm:inline">Back</span>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-indigo-200 shadow-lg">
            <FiActivity size={18} />
          </div>
          <h1 className="font-bold text-slate-800 text-lg sm:text-xl tracking-tight">K+ Calculator</h1>
        </div>
        <div className="w-10" /> {/* Spacer for centering */}
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 sm:py-10 space-y-6">
        
        {/* Input Section */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <InputField label="Weight (kg)" value={weight} onChange={setWeight} placeholder="70" />
            <InputField label="Measured K+" value={currentK} onChange={setCurrentK} placeholder="3.2" />
            <InputField label="Target K+" value={targetK} onChange={setTargetK} placeholder="4.0" />
          </div>

          <div className="pt-4 border-t border-dashed border-slate-200">
            <p className="text-xs text-slate-500 text-center italic">
              Formula: (Target K⁺ − Measured K⁺) × Weight × 0.4
            </p>
          </div>
        </section>

        {/* Results Section */}
        {deficit > 0 ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-1 shadow-xl shadow-indigo-100">
              <div className="bg-white/10 backdrop-blur-sm rounded-[1.4rem] p-6 text-white text-center">
                <p className="text-indigo-100 text-sm font-medium uppercase tracking-wider mb-1">Total Deficit</p>
                <h2 className="text-5xl font-black mb-4 tracking-tighter">
                  {deficit.toFixed(1)} <span className="text-2xl font-light">mmol</span>
                </h2>
                
                <div className="bg-white/10 rounded-2xl p-4 grid grid-cols-2 gap-4">
                  <div className="border-r border-white/20">
                    <p className="text-xs text-indigo-100">Required Vol.</p>
                    <p className="text-xl font-bold">{volumeML.toFixed(1)} mL</p>
                  </div>
                  <div>
                    <p className="text-xs text-indigo-100">Suggested</p>
                    <p className="text-xl font-bold">{suggestedVials} Vials</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Warning Message inside results */}
            {Number(currentK) < 3.5 && (
              <div className={`mt-4 p-4 rounded-2xl flex gap-3 items-start ${getWarningStyles(Number(currentK)).bg}`}>
                <FiAlertTriangle className={`shrink-0 mt-0.5 ${getWarningStyles(Number(currentK)).icon}`} size={18} />
                <p className={`text-sm font-medium ${getWarningStyles(Number(currentK)).text}`}>
                  {getWarningText(Number(currentK))}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-slate-100 rounded-3xl p-10 text-center border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">Enter patient data to see results</p>
          </div>
        )}

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoCard title="Administration" icon={<FiInfo className="text-indigo-500" />}>
            <ul className="text-sm space-y-2 text-slate-600">
              <li>• Peripheral: 10 mEq / 100 mL</li>
              <li>• Central: 20–40 mEq / 100 mL</li>
              <li>• Rate: 10-15 mmol/hr (if K &gt; 2.5)</li>
            </ul>
          </InfoCard>
          
          <InfoCard title="Safety Checklist" icon={<FiAlertTriangle className="text-amber-500" />}>
            <ul className="text-sm space-y-2 text-slate-600">
              <li>• Check renal function (Creatinine)</li>
              <li>• Continuous ECG for K &lt; 2.5</li>
              <li>• Correct Mg++ if low</li>
            </ul>
          </InfoCard>
        </div>

        {/* References */}
        <footer className="pt-6 pb-12 space-y-6">
          <div className="border-t border-slate-200 pt-6">
            <button 
              onClick={() => setOpenRef(!openRef)}
              className="flex items-center justify-between w-full px-4 py-2 hover:bg-slate-50 rounded-xl transition-colors"
            >
              <span className="text-sm font-semibold text-slate-700">Reference Material</span>
              {openRef ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            {openRef && (
              <div className="px-4 py-3 text-xs text-slate-500 leading-relaxed italic animate-in fade-in">
                Alldredge B.K., et al. Koda-Kimble and Young’s Applied Therapeutics. 10th ed. Lippincott; 2013.
              </div>
            )}
          </div>

          <div className="text-[10px] text-slate-400 text-center px-6 leading-relaxed uppercase tracking-widest">
            Medical Use Only • Verify Calculations Individually • Not a Substitute for Clinical Judgment
          </div>
        </footer>
      </main>
    </div>
  );
}

// --- Specialized Components ---

function InputField({ label, value, onChange, placeholder }: any) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-lg font-semibold focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 focus:bg-white transition-all outline-none"
        placeholder={placeholder}
      />
    </div>
  );
}

function InfoCard({ title, icon, children }: any) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="font-bold text-slate-800 text-sm uppercase tracking-tight">{title}</h3>
      </div>
      {children}
    </div>
  );
}

// --- Helper Logic ---

function getWarningStyles(k: number) {
  if (k < 2.5) return { bg: "bg-red-50", text: "text-red-800", icon: "text-red-500" };
  if (k < 3.0) return { bg: "bg-orange-50", text: "text-orange-800", icon: "text-orange-500" };
  return { bg: "bg-amber-50", text: "text-amber-800", icon: "text-amber-500" };
}

function getWarningText(k: number) {
  if (k < 2.5) return "Severe hypokalaemia. Continuous ECG monitoring and central line required.";
  if (k < 3.0) return "Moderate hypokalaemia. Close IV monitoring required.";
  return "Mild hypokalaemia. Consider oral replacement if clinically appropriate.";
}