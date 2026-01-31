"use client"; // MUST be first line

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiChevronDown, FiChevronUp, FiArrowLeft } from "react-icons/fi";

export default function PotassiumCalculator() {
  const router = useRouter();
  const [weight, setWeight] = useState("");
  const [currentK, setCurrentK] = useState("");
  const [targetK, setTargetK] = useState("4.0");
  const [openRef, setOpenRef] = useState(false);

  // --- Logic (Identical to your original) ---
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

  const k = Number(currentK);
  let potassiumWarning = "";
  let warningColor = "";
  if (k > 0) {
    if (k < 2.5) {
      potassiumWarning = "Severe hypokalaemia (<2.5 mmol/L). Continuous ECG monitoring required.";
      warningColor = "bg-red-50 text-red-800 border-red-200";
    } else if (k < 3.0) {
      potassiumWarning = "Moderate hypokalaemia (2.5–3.0 mmol/L). IV replacement with close monitoring.";
      warningColor = "bg-orange-50 text-orange-800 border-orange-200";
    } else if (k < 3.5) {
      potassiumWarning = "Mild hypokalaemia (3.0–3.5 mmol/L). Oral replacement preferred.";
      warningColor = "bg-yellow-50 text-yellow-800 border-yellow-200";
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans pb-10">
      {/* Top Bar - Simplified */}
      <div className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center shadow-sm">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-indigo-600 font-bold hover:opacity-70 transition-opacity"
        >
          <FiArrowLeft size={20} />
          <span>BACK</span>
        </button>
      </div>

      <div className="flex-1 flex justify-center px-4 pt-8">
        <div className="w-full max-w-3xl space-y-6">
          
          {/* Main Title */}
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            Potassium Deficit Calculator
          </h1>

          {/* Formula Tile - Keeping your structure */}
          <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-2xl">
            <h2 className="text-sm font-bold text-indigo-900 uppercase tracking-wider mb-2">Formula</h2>
            <p className="text-gray-700 text-lg">
              <b>Deficit (mmol)</b> = (Target K⁺ − Measured K⁺) × Weight × 0.4
            </p>
          </div>

          {/* Inputs - Crisp and Clean */}
          <div className="grid md:grid-cols-3 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <Input label="Body weight (kg)" value={weight} setValue={setWeight} />
            <Input label="Measured K⁺ (mmol/L)" value={currentK} setValue={setCurrentK} />
            <Input label="Target K⁺ (mmol/L)" value={targetK} setValue={setTargetK} />
          </div>

          {/* Warning message */}
          {potassiumWarning && (
            <div className={`p-4 rounded-xl border-l-4 shadow-sm font-medium ${warningColor}`}>
              ⚠ {potassiumWarning}
            </div>
          )}

          {/* Results - The "Hero" of the page */}
          {deficit > 0 && (
            <div className="bg-[#EBFDF5] border border-[#A7F3D0] p-6 rounded-2xl shadow-md transition-all">
              <div className="text-center">
                <h2 className="text-gray-600 text-sm font-bold uppercase tracking-widest mb-1">Total Deficit</h2>
                <p className="text-4xl font-black text-[#065F46] mb-6">{deficit.toFixed(1)} mmol</p>
              </div>
              
              <div className="bg-white/60 rounded-xl p-4 space-y-3">
                <p className="font-bold text-gray-800 border-b pb-2 text-sm">SUGGESTED REPLACEMENT (Injecsol K10)</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Required Volume:</span>
                  <span className="font-bold text-lg">{volumeML.toFixed(1)} mL</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Vial Count (10mL):</span>
                  <span className="font-bold text-lg text-indigo-600">≈ {suggestedVials} vial(s)</span>
                </div>
                {Number(currentK) > 2.5 && (
                  <div className="mt-2 text-xs bg-red-100 text-red-700 p-2 rounded-lg font-semibold">
                    Note: K⁺ &gt; 2.5 mmol/L — adjust infusion carefully.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Info Sections - Keeping your exact layout */}
          <div className="grid md:grid-cols-2 gap-4">
            <SectionCard title="Dose" content={
              <ul className="space-y-1.5 text-gray-600 text-sm">
                <li>• IV: Initial 40-60 mEq (individualized)</li>
                <li>• Prophylaxis: 20 mmol/day</li>
                <li>• Daily Requirement: 40-80 mEq</li>
                <li>• K &gt; 2.5: IV 10-15 mmol/hr (Max 200/day)</li>
                <li>• K 3–3.5: PO 40–100 mmol/day (2-3 doses)</li>
              </ul>
            }/>
            <SectionCard title="Administration" content={
              <ul className="space-y-1.5 text-gray-600 text-sm">
                <li>• 1g in 100mL NS (1hr) or 2g in 200mL NS (2hrs)</li>
                <li>• Peripheral: 10 mEq/100 mL</li>
                <li>• Central: 20–40 mEq/100 mL</li>
                <li>• Always dilute before use</li>
              </ul>
            }/>
          </div>

          {/* Footer content */}
          <div className="space-y-4">
            <SectionCard title="Notes" content={
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <p>• 1 vial K10% = 1g KCl</p>
                <p>• 1g KCl = 13.41 mmol</p>
                <p>• 1 mEq/L = 1 mmol/L</p>
                <p>• Not for bolus use</p>
              </div>
            }/>
            
            {/* Simple Safety Section */}
            <div className="bg-gray-100 p-4 rounded-xl text-xs text-gray-500 space-y-1">
              <p className="font-bold text-gray-700 mb-1">SAFETY GUIDANCE</p>
              <p>• Check renal & cardiac status</p>
              <p>• Central access for rates &gt; 20 mmol/hr</p>
              <p>• Re-check K⁺ after every 40-60 mmol</p>
              <p>• Correct hypomagnesaemia if present</p>
            </div>

            {/* Reference & Disclaimer */}
            <div className="text-center pt-4">
               <button onClick={() => setOpenRef(!openRef)} className="text-[10px] text-gray-400 font-bold uppercase hover:underline">
                 {openRef ? "Hide Reference" : "View Reference"}
               </button>
               {openRef && (
                 <p className="mt-2 text-[10px] text-gray-400 italic">Alldredge B.K., et al. Applied Therapeutics. 10th ed. 2013.</p>
               )}
               <p className="mt-4 text-[10px] text-gray-400 border-t pt-4">
                 <b>Disclaimer:</b> Guide only. Verify all calculations before application.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components kept simple as per original
function Input({ label, value, setValue }: { label: string; value: string; setValue: (v: string) => void }) {
  return (
    <div className="flex flex-col">
      <label className="text-xs font-bold text-gray-500 mb-1 uppercase tracking-tighter">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50 font-semibold text-gray-800"
        placeholder="0.0"
      />
    </div>
  );
}

function SectionCard({ title, content }: { title: string; content: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">{title}</h3>
      {content}
    </div>
  );
}