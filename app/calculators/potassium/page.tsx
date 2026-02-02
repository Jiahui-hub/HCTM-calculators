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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col font-sans relative px-4 sm:px-6 lg:px-10">

      {/* Top bar */}
      <div className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 lg:px-10">
        <div className="bg-white bg-opacity-90 backdrop-blur-sm shadow-lg flex items-center py-3 rounded-xl">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-lg text-white font-semibold transition-transform hover:scale-105"
          >
          <FiArrowLeft />
          Back
        </button>
      </div>
  </div>

      {/* Spacer to avoid content hidden behind top bar */}
      <div className="pt-16" />

      {/* Main content wrapper */}
      <div className="flex-1 flex justify-center pb-16">
        <div className="w-[375px] mx-auto bg-white rounded-[2rem] shadow-2xl p-10 md:p-12 lg:p-14 transition-all duration-300 overflow-y-auto">

          {/* Lock theme to light */}
          <style jsx global>{`
            body {
              background-color: #f9fafb !important;
              color: #111827;
              padding-left: env(safe-area-inset-left);
              padding-right: env(safe-area-inset-right);
            }
          `}</style>

          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6">
            Potassium Deficit Calculator
          </h1>

          {/* Formula Tile */}
          <div className="bg-indigo-50 p-6 rounded-[1.5rem] shadow-md hover:shadow-xl transition duration-300 ease-in-out">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Formula used:</h2>
            <p className="text-gray-700 mb-2">
              <b>Potassium deficit (mmol)</b> = (Target K⁺ − Measured K⁺) × Weight (kg) × 0.4
            </p>
            <p className="text-sm text-gray-600">Note: 1 mEq/L = 1 mmol/L</p>
          </div>

          {/* Input cards */}
          <div className="grid md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-[1.5rem] shadow-md space-y-4 md:space-y-0 transition duration-300 ease-in-out">
            <Input label="Body weight (kg)" value={weight} setValue={setWeight} />
            <Input label="Measured potassium (mmol/L)" value={currentK} setValue={setCurrentK} />
            <Input label="Target potassium (mmol/L)" value={targetK} setValue={setTargetK} />
          </div>

          {/* Warning message */}
          {potassiumWarning && (
            <div className={`p-4 rounded-[1rem] shadow ${warningColor} transition-opacity duration-500`}>
              ⚠ {potassiumWarning}
            </div>
          )}

          {/* Results display */}
          {deficit > 0 && (
            <div className="bg-green-50 p-6 rounded-[1.5rem] shadow-xl mt-8 hover:shadow-2xl transition duration-300 ease-in-out">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 text-center">
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
                      ⚠ Measured potassium &gt; 2.5 mmol/L — adjust infusion carefully
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}

          {/* Info sections */}
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <SectionCard
              title="Dose"
              content={
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                  <li>IV infusion: individualized; initial 40-60 mEq</li>
                  <li>Prophylaxis (PO): 20 mmol/day; adjust per potassium level</li>
                  <li>Normal daily requirement: 40-80 mEq</li>
                  <li>
                    Potassium &gt; 2.5 mmol/L: IV 10-15 mmol/hr, max 200 mmol/day
                  </li>
                  <li>Potassium 3–3.5 mmol/L: PO 40–100 mmol/day in 2–3 doses</li>
                </ul>
              }
            />
            <SectionCard
              title="Administration"
              content={
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                  <li>IV infusion: 1g in 100 mL NS over 1 hr or 2g in 200 mL NS over 2 hrs</li>
                  <li>Peripheral: 10 mEq/100 mL</li>
                  <li>Central: 20–40 mEq/100 mL</li>
                </ul>
              }
            />
          </div>

          {/* Support & Reference Sections */}
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

// Helper Components

function Input({ label, value, setValue }: { label: string; value: string; setValue: (val: string) => void }) {
  return (
    <div className="flex flex-col">
      <label className="mb-2 text-gray-700 font-semibold">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border border-gray-300 rounded-lg p-4 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-gray-100"
        placeholder={label}
      />
    </div>
  );
}

function SectionCard({ title, content }: { title: string; content: React.ReactNode }) {
  return (
    <div className="bg-gray-50 p-6 rounded-[1.5rem] shadow-md hover:shadow-xl transition duration-300 ease-in-out">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
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