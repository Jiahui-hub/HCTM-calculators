"use client"; // MUST be first line

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiChevronDown, FiChevronUp, FiArrowLeft } from "react-icons/fi";

export default function PotassiumCalculator() {
  const router = useRouter();
  const [weight, setWeight] = useState("");
  const [currentK, setCurrentK] = useState("");
  const [targetK, setTargetK] = useState("4.0");

  // Calculate potassium deficit
  const deficit =
    weight && currentK && targetK
      ? (Number(targetK) - Number(currentK)) * Number(weight) * 0.4
      : 0;

  // Injecsol K10 assumptions
  const mmolPer10ML = 13.41;
  const vialML = 10;
  const mmolPerML = mmolPer10ML / vialML;

  // Volume calculation
  const volumeML = deficit > 0 ? deficit / mmolPerML : 0;

  // Vial suggestion
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

  // Potassium severity warnings
  let potassiumWarning = "";
  let warningColor = "";

  const k = Number(currentK);
  if (k > 0) {
    if (k < 2.5) {
      potassiumWarning =
        "Severe hypokalaemia (<2.5 mmol/L). Continuous ECG monitoring required.";
      warningColor = "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200";
    } else if (k < 3.0) {
      potassiumWarning =
        "Moderate hypokalaemia (2.5–3.0 mmol/L). IV replacement with close monitoring.";
      warningColor =
        "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200";
    } else if (k < 3.5) {
      potassiumWarning =
        "Mild hypokalaemia (3.0–3.5 mmol/L). Oral replacement preferred.";
      warningColor =
        "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200";
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center p-6 font-sans">
      <div className="max-w-4xl w-full space-y-8 bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 transition-all duration-300">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          <FiArrowLeft className="text-lg" />
          Back
        </button>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">
          Potassium Deficit Calculator
        </h1>

        {/* Formula */}
        <div className="bg-indigo-50 dark:bg-indigo-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 space-y-3">
          <h2 className="font-semibold text-lg mb-2">Formula used:</h2>
          <p className="text-gray-700 dark:text-gray-200">
            Potassium deficit (mmol) = (Target K⁺ − Measured K⁺) × Weight (kg) × 0.4
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Note: 1 mEq/L = 1 mmol/L
          </p>
        </div>

        {/* Input Fields */}
        <div className="grid md:grid-cols-3 gap-6 bg-white dark:bg-gray-700 p-8 rounded-xl shadow-md space-y-4 md:space-y-0">
          <Input label="Body weight (kg)" value={weight} setValue={setWeight} />
          <Input label="Measured potassium (mmol/L)" value={currentK} setValue={setCurrentK} />
          <Input label="Target potassium (mmol/L)" value={targetK} setValue={setTargetK} />
        </div>

        {/* Potassium Warning */}
        {potassiumWarning && (
          <div className={`p-4 rounded-xl shadow ${warningColor} transition`}>
            ⚠ {potassiumWarning}
          </div>
        )}

        {/* Result Section */}
        {deficit > 0 && (
          <div className="bg-gradient-to-br from-green-50 dark:from-green-900 to-green-100 dark:to-green-800 p-8 rounded-3xl shadow-lg mt-8 space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Total potassium deficit: {deficit.toFixed(1)} mmol
            </h2>
            <div>
              <p className="font-semibold mb-2">Suggested replacement (Injecsol K10):</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200 text-sm">
                <li>Required volume: <b>{volumeML.toFixed(1)} mL</b></li>
                <li>≈ <b>{suggestedVials} vial(s)</b> (10 mL per vial)</li>
                {Number(currentK) > 2.5 && (
                  <li className="flex items-center gap-2 bg-red-100 dark:bg-red-800 p-2 rounded">
                    ⚠ Measured potassium &gt; 2.5 mmol/L — adjust infusion carefully
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}

        {/* Additional Info Sections */}
        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <DoseSection />
          <AdministrationSection />
        </div>

        {/* Supporting info and disclaimer */}
        <div className="space-y-8 mt-10">
          <NotesSection />
          <SafetySection />
          <ReferenceSection />
          <DisclaimerSection />
        </div>
      </div>
    </div>
  );
}

// Input component
function Input({ label, value, setValue }: any) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      />
    </div>
  );
}

// Dose info section
function DoseSection() {
  return (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-3xl shadow-md border border-gray-200 dark:border-gray-600 transition">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Dose</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200 text-sm">
        <li>IV infusion: individualised; initial 40-60 mEq</li>
        <li>Prophylaxis (PO): 20 mmol/day; adjust per potassium level</li>
        <li>Normal daily requirement: 40-80 mEq</li>
        <li>Potassium &gt; 2.5 mmol/L: IV 10-15 mmol/hr, max 200 mmol/day</li>
        <li>Potassium 3–3.5 mmol/L: PO 40–100 mmol/day in 2–3 doses</li>
      </ul>
    </div>
  );
}

// Administration info
function AdministrationSection() {
  return (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-3xl shadow-md border border-gray-200 dark:border-gray-600 transition">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Administration</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200 text-sm">
        <li>IV infusion: 1g in 100 mL NS over 1 hr or 2g in 200 mL NS over 2 hrs</li>
        <li>Peripheral: 10 mEq/100 mL</li>
        <li>Central: 20–40 mEq/100 mL</li>
      </ul>
    </div>
  );
}

// Notes section
function NotesSection() {
  return (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-3xl shadow-md border border-gray-200 dark:border-gray-600 transition">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Notes</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200 text-sm">
        <li>1 vial of K10% = 1g KCl</li>
        <li>1g KCl = 13.41 mmol</li>
        <li>Potassium 1 mEq/L = 1 mmol/L</li>
        <li>Dilute before use; not for bolus</li>
      </ul>
    </div>
  );
}

// Safety guidance
function SafetySection() {
  return (
    <div className="bg-red-50 dark:bg-red-900 p-6 rounded-3xl shadow-md border border-gray-200 dark:border-gray-600 transition">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Safety Guidance</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200 text-sm">
        <li>Check renal & cardiac status before IV replacement</li>
        <li>Central access for rates &gt; 20 mmol/hr</li>
        <li>Re-check serum potassium after every 40–60 mmol</li>
        <li>Correct hypomagnesaemia if present</li>
      </ul>
    </div>
  );
}

// Reference section with toggle
function ReferenceSection() {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded-3xl shadow-md border border-gray-200 transition">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full font-semibold text-gray-700 dark:text-gray-200 mb-2"
      >
        <span className="flex items-center gap-2">
          Reference {open ? <FiChevronUp /> : <FiChevronDown />}
        </span>
      </button>
      {open && (
        <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          <p>
            Alldredge B.K., Corelli R.L., Ernst M.E., Guglielmo B.J., Jacobson P.A., Kradjan W.A. Koda-Kimble and Young’s Applied Therapeutics. 10th ed. Lippincott; 2013.
          </p>
        </div>
      )}
    </div>
  );
}

// Short, professional disclaimer
function DisclaimerSection() {
  return (
    <div className="mt-8 text-xs text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4 max-w-2xl mx-auto text-center">
      <p className="font-semibold mb-1">Disclaimer</p>
      <p className="text-gray-600 dark:text-gray-400">
        Use as a guide. Verify all calculations before clinical application.
      </p>
    </div>
  );
}