"use client"; // MUST be first line

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiChevronDown, FiChevronUp, FiArrowLeft } from "react-icons/fi";

export default function PotassiumCalculator() {
  const router = useRouter();
  const [weight, setWeight] = useState("");
  const [currentK, setCurrentK] = useState("");
  const [targetK, setTargetK] = useState("4.0");

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
  let warningColor = "";

  const k = Number(currentK);
  if (k > 0) {
    if (k < 2.5) {
      potassiumWarning =
        "Severe hypokalaemia (<2.5 mmol/L). Continuous ECG monitoring required.";
      warningColor = "bg-red-100 text-red-800";
    } else if (k < 3.0) {
      potassiumWarning =
        "Moderate hypokalaemia (2.5–3.0 mmol/L). IV replacement with close monitoring.";
      warningColor = "bg-orange-100 text-orange-800";
    } else if (k < 3.5) {
      potassiumWarning =
        "Mild hypokalaemia (3.0–3.5 mmol/L). Oral replacement preferred.";
      warningColor = "bg-yellow-100 text-yellow-800";
    }
  }

  // Reference toggle
  const [openRef, setOpenRef] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col font-sans relative overflow-hidden">

      {/* Top bar spanning full width with icons */}
      <div className="w-full fixed top-0 z-50 bg-white bg-opacity-95 backdrop-blur-sm shadow-lg flex items-center px-4 py-3 transition-all duration-300">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-lg text-white font-semibold transition transform hover:scale-105"
        >
          <FiArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Back</span>
        </button>
      </div>

      {/* Spacer to prevent content behind the top bar */}
      <div className="pt-16" />

      {/* Main content container */}
      <div className="flex-1 flex justify-center px-4 pb-8">
        <div className="w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl p-8 md:p-10 space-y-8 transition-all duration-300 overflow-y-auto">

          {/* Lock theme to light */}
          <style jsx global>{`
            body {
              background-color: #f9fafb !important;
              color: #111827;
            }
          `}</style>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6">
            Potassium Deficit Calculator
          </h1>

          {/* Formula Tile with icon */}
          <div className="bg-indigo-50 p-6 rounded-[1.5rem] shadow-md hover:shadow-xl transition duration-300 ease-in-out flex items-start gap-4">
            <div className="text-indigo-600">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4H3" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">Formula used:</h2>
              <p className="text-gray-700 mb-2">
                <b>Potassium deficit (mmol)</b> = (Target K⁺ − Measured K⁺) × Weight (kg) × 0.4
              </p>
              <p className="text-sm text-gray-600">Note: 1 mEq/L = 1 mmol/L</p>
            </div>
          </div>

          {/* Input fields with icons */}
          <div className="grid md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-[1.5rem] shadow-md space-y-4 md:space-y-0 transition duration-300 ease-in-out">
            <Input label="Body weight (kg)" value={weight} setValue={setWeight} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l-4-4m0 0l4-4m-4 4h12" /></svg>} />
            <Input label="Measured potassium (mmol/L)" value={currentK} setValue={setCurrentK} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>} />
            <Input label="Target potassium (mmol/L)" value={targetK} setValue={setTargetK} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20h.01" /></svg>} />
          </div>

          {/* Warning message with icon */}
          {potassiumWarning && (
            <div className={`p-4 rounded-[1rem] shadow ${warningColor} transition-opacity duration-500 flex items-center gap-3`}>
              <svg className="w-6 h-6 text-current" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 3a9 9 0 110 18 9 9 0 010-18z" />
              </svg>
              <span>{potassiumWarning}</span>
            </div>
          )}

          {/* Results */}
          {deficit > 0 && (
            <div className="bg-green-50 p-6 rounded-[1.5rem] shadow-xl mt-8 hover:shadow-2xl transition duration-300 ease-in-out">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 text-center flex items-center justify-center gap-2">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                Total potassium deficit: {deficit.toFixed(1)} mmol
              </h2>
              <div>
                <p className="font-semibold mb-2">Suggested replacement (Injecsol K10):</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm max-w-xl mx-auto">
                  <li>
                    Required volume: <b>{volumeML.toFixed(1)} mL</b>
                  </li>
                  <li>
                    ≈ <b>{suggestedVials} vial(s)</b> (10 mL per vial)
                  </li>
                  {Number(currentK) > 2.5 && (
                    <li className="flex items-center gap-2 bg-red-100 p-2 rounded">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 3a9 9 0 110 18 9 9 0 010-18z" /></svg>
                      ⚠ Measured potassium &gt; 2.5 mmol/L — adjust infusion carefully
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}

          {/* Info Sections with icons */}
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <SectionCard
              title="Dose"
              content={
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                  <li><svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>IV infusion: individualized; initial 40-60 mEq</li>
                  <li><svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20h.01" /></svg>Prophylaxis (PO): 20 mmol/day; adjust per potassium level</li>
                  <li><svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>Normal daily requirement: 40-80 mEq</li>
                  <li><svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M12 20h.01" /></svg>Potassium &gt; 2.5 mmol/L: IV 10-15 mmol/hr, max 200 mmol/day</li>
                  <li><svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>Potassium 3–3.5 mmol/L: PO 40–100 mmol/day in 2–3 doses</li>
                </ul>
              }
            />
            <SectionCard
              title="Administration"
              content={
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                  <li><svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>IV infusion: 1g in 100 mL NS over 1 hr or 2g in 200 mL NS over 2 hrs</li>
                  <li><svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M12 3v18" /></svg>Peripheral: 10 mEq/100 mL</li>
                  <li><svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" /></svg>Central: 20–40 mEq/100 mL</li>
                </ul>
              }
            />
          </div>

          {/* Support & reference sections with icons */}
          <div className="space-y-8 mt-10 max-w-2xl mx-auto">
            <NotesSection />
            <SafetySection />
            <ReferenceSection openRef={openRef} setOpenRef={setOpenRef} />
            <DisclaimerSection />
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper components with icons

function Input({ label, value, setValue, icon }: { label: string; value: string; setValue: (val: string) => void; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <label className="mb-2 text-gray-700 font-semibold flex items-center gap-2">
        {icon}
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-gray-100"
        placeholder={label}
      />
    </div>
  );
}

function SectionCard({ title, content }: { title: string; content: React.ReactNode }) {
  return (
    <div className="bg-gray-50 p-6 rounded-[1.5rem] shadow-md hover:shadow-xl transition duration-300 ease-in-out">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
        {/* Icon for section */}
        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        {title}
      </h3>
      {content}
    </div>
  );
}

function NotesSection() {
  return (
    <SectionCard
      title="Notes"
      content={
        <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
          <li>1 vial of K10% = 1g KCl</li>
          <li>1g KCl = 13.41 mmol</li>
          <li>Potassium 1 mEq/L = 1 mmol/L</li>
          <li>Dilute before use; not for bolus</li>
        </ul>
      }
    />
  );
}

function SafetySection() {
  return (
    <SectionCard
      title="Safety Guidance"
      content={
        <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
          <li>Check renal & cardiac status before IV replacement</li>
          <li>Central access for rates &gt; 20 mmol/hr</li>
          <li>Re-check serum potassium after every 40–60 mmol</li>
          <li>Correct hypomagnesaemia if present</li>
        </ul>
      }
    />
  );
}

function ReferenceSection({ openRef, setOpenRef }: { openRef: boolean; setOpenRef: (val: boolean) => void }) {
  return (
    <div className="bg-gray-50 p-4 rounded-[1.5rem] shadow-md transition relative">
      <button
        onClick={() => setOpenRef(!openRef)}
        className="flex items-center justify-between w-full font-semibold text-gray-700 mb-2 focus:outline-none"
      >
        <span className="flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={openRef ? "M19 9l-7 7-7-7" : "M12 15l-7-7 14 0-7 7z"} /></svg>
          Reference {openRef ? <FiChevronUp /> : <FiChevronDown />}
        </span>
      </button>
      {openRef && (
        <div className="text-sm text-gray-600 mt-2">
          <p>
            Alldredge B.K., Corelli R.L., Ernst M.E., Guglielmo B.J., Jacobson P.A., Kradjan W.A. Koda-Kimble and Young’s Applied Therapeutics. 10th ed. Lippincott; 2013.
          </p>
        </div>
      )}
    </div>
  );
}

function DisclaimerSection() {
  return (
    <div className="mt-8 text-xs text-gray-600 border-t pt-4 max-w-2xl mx-auto text-center">
      <p className="font-semibold mb-1">Disclaimer</p>
      <p>Use as a guide. Verify all calculations before clinical application.</p>
    </div>
  );
}