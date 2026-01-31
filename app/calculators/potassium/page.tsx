"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

export default function PotassiumCalculator() {
  const router = useRouter();
  const [weight, setWeight] = useState("");
  const [currentK, setCurrentK] = useState("");
  const [targetK, setTargetK] = useState("4.0");
  const [openRef, setOpenRef] = useState(false);

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

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">

      {/* Top bar: light theme, larger height, centered title */}
      <div className="w-full fixed top-0 z-50 bg-[#F0F4F8] h-28 flex items-center px-4 md:px-8 shadow-md">
        {/* Back Button - larger size, icon only, left side */}
        <button
          onClick={() => router.back()}
          className="flex items-center focus:outline-none"
        >
          <FiArrowLeft className="w-8 h-8 text-gray-700" />
        </button>
        {/* Title centered, dark color */}
        <h1 className="flex-1 text-3xl font-bold text-gray-900 text-center">
          Potassium Deficit Calculator
        </h1>
        {/* Empty div for right side spacing */}
        <div style={{ width: "32px" }} />
      </div>

      {/* Spacer to prevent content being hidden behind the header */}
      <div className="h-28" /> {/* same height as header */}

      {/* Main Content */}
      <div className="flex-1 flex justify-center px-4 pb-8 mt-4">
        <div className="w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 space-y-10 overflow-y-auto">

          {/* Formula Tile */}
          <div className="bg-indigo-50 p-8 rounded-[1.5rem] shadow-md hover:shadow-xl transition duration-300 ease-in-out">
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">Formula used:</h2>
            <p className="text-gray-700 mb-2 text-lg">
              <b>Potassium deficit (mmol)</b> = (Target K⁺ − Measured K⁺) × Weight (kg) × 0.4
            </p>
            <p className="text-sm text-gray-600">Note: 1 mEq/L = 1 mmol/L</p>
          </div>

          {/* Input Section */}
          <div className="grid md:grid-cols-3 gap-8 bg-gray-50 p-8 rounded-[2rem] shadow-md space-y-6 md:space-y-0 transition duration-300 ease-in-out text-xl font-semibold">
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

          {/* Result Section */}
          {deficit > 0 && (
            <div className="bg-green-50 p-8 rounded-[2rem] shadow-xl mt-8 hover:shadow-2xl transition duration-300 ease-in-out">
              <h2 className="text-3xl mb-4 text-gray-900 text-center">
                Total potassium deficit: {deficit.toFixed(1)} mmol
              </h2>
              <div>
                <p className="font-semibold mb-4">Suggested replacement (Injecsol K10):</p>
                <ul className="list-disc list-inside space-y-3 text-gray-700 max-w-xl mx-auto text-lg">
                  <li>
                    Required volume: <b>{volumeML.toFixed(1)} mL</b>
                  </li>
                  <li>
                    ≈ <b>{suggestedVials} vial(s)</b> (10 mL per vial)
                  </li>
                  {Number(currentK) > 2.5 && (
                    <li className="flex items-center gap-2 bg-red-100 p-3 rounded">
                      ⚠ Measured potassium &gt; 2.5 mmol/L — adjust infusion carefully
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}

          {/* Dose & Administration Sections */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <SectionCard
              title="Dose"
              content={
                <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg">
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
                <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg">
                  <li>IV infusion: 1g in 100 mL NS over 1 hr or 2g in 200 mL NS over 2 hrs</li>
                  <li>Peripheral: 10 mEq/100 mL</li>
                  <li>Central: 20–40 mEq/100 mL</li>
                </ul>
              }
            />
          </div>

          {/* Support & Reference */}
          <div className="space-y-10 mt-12 max-w-2xl mx-auto">
            <NotesSection />
            <SafetySection />

            {/* Reference toggle */}
            <div className="bg-gray-50 p-6 rounded-[1.5rem] shadow-md transition relative">
              <button
                onClick={() => setOpenRef(!openRef)}
                className="flex items-center justify-between w-full font-semibold text-gray-700 mb-2 focus:outline-none"
              >
                <span className="flex items-center gap-2">
                  Reference {openRef ? "▲" : "▼"}
                </span>
              </button>
              {openRef && (
                <div className="text-sm text-gray-600 mt-2 animate-fadeIn">
                  <p>
                    Alldredge B.K., Corelli R.L., Ernst M.E., Guglielmo B.J., Jacobson P.A., Kradjan W.A. Koda-Kimble and Young’s Applied Therapeutics. 10th ed. Lippincott; 2013.
                  </p>
                </div>
              )}
            </div>

            <DisclaimerSection />
          </div>

        </div>
      </div>
    </div>
  );
}

// Helper components remain the same
function Input({ label, value, setValue }: { label: string; value: string; setValue: (val: string) => void }) {
  return (
    <div className="flex flex-col">
      <label className="mb-2 text-gray-700 font-semibold">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border border-gray-300 rounded-lg p-4 text-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-gray-100"
        placeholder={label}
      />
    </div>
  );
}

function SectionCard({ title, content }: { title: string; content: React.ReactNode }) {
  return (
    <div className="bg-gray-50 p-8 rounded-[1.5rem] shadow-md hover:shadow-xl transition duration-300 ease-in-out">
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
        <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg">
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
        <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg">
          <li>Check renal & cardiac status before IV replacement</li>
          <li>Central access for rates &gt; 20 mmol/hr</li>
          <li>Re-check serum potassium after every 40–60 mmol</li>
          <li>Correct hypomagnesaemia if present</li>
        </ul>
      }
    />
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