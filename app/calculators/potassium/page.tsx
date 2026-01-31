"use client"; // MUST be first line

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

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
  const mmolPer10ML = 13.41; // 1 vial (10 mL) contains 13.41 mmol
  const vialML = 10;
  const mmolPerML = mmolPer10ML / vialML; // 1.341 mmol/mL

  // Correct volume calculation
  const volumeML = deficit > 0 ? deficit / mmolPerML : 0;

  // Suggest vials according to your ranges
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
        "Severe hypokalaemia (<2.5 mmol/L). Continuous ECG monitoring required. Avoid rapid infusion.";
      warningColor = "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200";
    } else if (k < 3.0) {
      potassiumWarning =
        "Moderate hypokalaemia (2.5–3.0 mmol/L). IV replacement with close monitoring.";
      warningColor =
        "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200";
    } else if (k < 3.5) {
      potassiumWarning =
        "Mild hypokalaemia (3.0–3.5 mmol/L). Oral replacement preferred if possible.";
      warningColor =
        "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200";
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto space-y-8 bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          &larr; Back
        </button>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 text-center mb-4">
          Potassium Deficit Calculator
        </h1>

        {/* Formula */}
        <div className="bg-indigo-50 dark:bg-indigo-900 p-4 rounded-xl shadow-md space-y-2 border border-gray-200 dark:border-gray-700">
          <p className="font-semibold mb-1">Formula used:</p>
          <p className="text-gray-700 dark:text-gray-200">
            Potassium deficit (mmol) = (Target K⁺ − Measured K⁺) × Weight (kg) × 0.4
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Note: 1 mEq/L = 1 mmol/L
          </p>
        </div>

        {/* Inputs */}
        <div className="grid md:grid-cols-3 gap-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <Input label="Body weight (kg)" value={weight} setValue={setWeight} />
          <Input label="Measured potassium (mmol/L)" value={currentK} setValue={setCurrentK} />
          <Input label="Target potassium (mmol/L)" value={targetK} setValue={setTargetK} />
        </div>

        {/* Warning */}
        {potassiumWarning && (
          <div className={`p-4 rounded-xl shadow ${warningColor} transition`}>
            ⚠ {potassiumWarning}
          </div>
        )}

        {/* Results */}
        {deficit > 0 && (
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 p-6 rounded-3xl shadow-lg space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Total potassium deficit: {deficit.toFixed(1)} mmol
            </h2>
            <div>
              <p className="font-semibold mb-2">Suggested replacement (Injecsol K10):</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200">
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

        {/* Sections */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <DoseSection />
          <AdministrationSection />
        </div>

        <NotesSection />
        <SafetySection />
        <ReferenceSection />
        <DisclaimerSection />
      </div>
    </div>
  );
}

function Input({ label, value, setValue }: any) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200 transition"
      />
    </div>
  );
}

function DoseSection() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-md border border-gray-200 dark:border-gray-700 transition">
      <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Dose</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
        <li>IV infusion: individualised; initial 40-60 mEq</li>
        <li>Prophylaxis (PO): 20 mmol/day; adjust per potassium level</li>
        <li>Normal daily requirement: 40-80 mEq</li>
        <li>Potassium &gt; 2.5 mmol/L: IV 10-15 mmol/hr, max 200 mmol/day</li>
        <li>Potassium 3–3.5 mmol/L: PO 40–100 mmol/day in 2–3 doses</li>
      </ul>
    </div>
  );
}

function AdministrationSection() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-md border border-gray-200 dark:border-gray-700 transition">
      <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Administration</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
        <li>IV infusion: 1g in 100 mL NS over 1 hr or 2g in 200 mL NS over 2 hrs</li>
        <li>Peripheral: 10 mEq/100 mL</li>
        <li>Central: 20–40 mEq/100 mL</li>
      </ul>
    </div>
  );
}

function NotesSection() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-md border border-gray-200 dark:border-gray-700 transition">
      <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Notes</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
        <li>1 vial of K10% = 1g KCl</li>
        <li>1g KCl = 13.41 mmol</li>
        <li>Potassium 1 mEq/L = 1 mmol/L</li>
        <li>Dilute before use; not for bolus</li>
      </ul>
    </div>
  );
}

function SafetySection() {
  return (
    <div className="bg-red-50 dark:bg-red-900 p-6 rounded-3xl shadow-md border border-gray-200 dark:border-gray-700 transition">
      <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Safety Guidance</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
        <li>Check renal & cardiac status before IV replacement</li>
        <li>Central access for rates &gt; 20 mmol/hr</li>
        <li>Re-check serum potassium after every 40–60 mmol</li>
        <li>Correct hypomagnesaemia if present</li>
      </ul>
    </div>
  );
}

function ReferenceSection() {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-3xl shadow-md border border-gray-200 transition">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full font-semibold text-gray-700 dark:text-gray-200 mb-2"
      >
        Reference {open ? <FiChevronUp /> : <FiChevronDown />}
      </button>
      {open && (
        <div className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1">
          <p>
            Alldredge B.K., Corelli R.L., Ernst M.E., Guglielmo B.J., Jacobson P.A.,
            Kradjan W.A. Koda-Kimble and Young’s Applied Therapeutics: The Clinical
            Use of Drugs. 10th ed. Lippincott; Philadelphia, PA, USA: 2013.
          </p>
        </div>
      )}
    </div>
  );
}

function DisclaimerSection() {
  return (
    <div className="mt-8 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
      <p className="font-semibold mb-1">Disclaimer</p>
      <p>
        Use calculations as a guide only. Verify independently. Do not rely solely on this tool for patient care.
      </p>
    </div>
  );
}