"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
        >
          &larr; Back
        </button>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Potassium Deficit Calculator
        </h1>

        {/* Formula */}
        <div className="bg-indigo-50 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100 p-4 rounded-xl">
          <p className="font-semibold mb-1">Formula used:</p>
          <p>
            Potassium deficit (mmol) = (Target K⁺ − Measured K⁺) × Weight (kg) × 0.4
          </p>
          <p className="mt-2">Note: 1 mEq/L = 1 mmol/L</p>
        </div>

        {/* Inputs */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow space-y-4">
          <Input label="Body weight (kg)" value={weight} setValue={setWeight} />
          <Input label="Measured potassium (mmol/L)" value={currentK} setValue={setCurrentK} />
          <Input label="Target potassium (mmol/L)" value={targetK} setValue={setTargetK} />
        </div>

        {potassiumWarning && (
          <div className={`p-4 rounded-xl shadow ${warningColor}`}>
            ⚠ {potassiumWarning}
          </div>
        )}

        {/* Results */}
        {deficit > 0 && (
          <div className="bg-green-50 dark:bg-green-900 p-4 rounded-xl shadow space-y-3">
            <p className="font-semibold text-lg">
              Total potassium deficit: {deficit.toFixed(1)} mmol
            </p>
            <p className="font-semibold">
              Suggested replacement (Injecsol K10):
            </p>
            <p>Required volume: <b>{volumeML.toFixed(1)} mL</b></p>
            <p>≈ <b>{suggestedVials} vial(s)</b> (10 mL per vial)</p>
            {Number(currentK) > 2.5 && (
              <p className="text-red-600 dark:text-red-400">
                ⚠ Measured potassium &gt; 2.5 mmol/L — adjust infusion carefully
              </p>
            )}
          </div>
        )}

        {/* Dose */}
        <DoseSection />

        {/* Administration */}
        <AdministrationSection />

        {/* Notes */}
        <NotesSection />

        {/* Safety */}
        <SafetySection />

        {/* Reference */}
        <ReferenceSection />

        <DisclaimerSection />

      </div>
    </div>
  );
}

function Input({ label, value, setValue }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200"
      />
    </div>
  );
}

function DoseSection() {
  return (
    <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-xl space-y-2">
      <h2 className="font-bold text-lg">Dose</h2>
      <p>Hypokalaemia:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>IV infusion: individualised; initial 40-60 mEq</li>
        <li>Hypokalaemia prophylaxis (PO): 20 mmol/day; adjust per potassium level</li>
        <li>Normal daily requirement: 40-80 mEq</li>
        <li>Potassium &gt; 2.5 mmol/L: IV 10-15 mmol/hr, max 200 mmol/day</li>
        <li>Potassium 3–3.5 mmol/L: PO 40–100 mmol/day in 2–3 divided doses (max 20 mmol/dose)</li>
      </ul>
    </div>
  );
}

function AdministrationSection() {
  return (
    <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-xl space-y-2">
      <h2 className="font-bold text-lg">Administration</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>IV infusion: 1g in 100 mL NS over 1 hr or 2g in 200 mL NS over 2 hrs</li>
        <li>Peripheral infusion: 10 mEq/100 mL</li>
        <li>Central infusion: 20–40 mEq/100 mL</li>
      </ul>
    </div>
  );
}

function NotesSection() {
  return (
    <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-xl space-y-2">
      <h2 className="font-bold text-lg">Notes</h2>
      <ul className="list-disc pl-5 space-y-1">
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
    <div className="bg-red-50 dark:bg-red-900 p-4 rounded-xl space-y-2">
      <h2 className="font-bold text-lg">Safety Guidance</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Check renal function and cardiac status before IV replacement</li>
        <li>Central venous access required for rates &gt; 20 mmol/hr</li>
        <li>Re-check serum potassium after every 40–60 mmol replacement</li>
        <li>Correct hypomagnesaemia concurrently if present</li>
      </ul>
    </div>
  );
}

function ReferenceSection() {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl space-y-1 text-sm">
      <p className="font-semibold">Reference:</p>
      <p>
        Alldredge B.K., Corelli R.L., Ernst M.E., Guglielmo B.J., Jacobson P.A., Kradjan W.A. 
        Koda-Kimble and Young’s Applied Therapeutics: The Clinical Use of Drugs. 10th ed. 
        Lippincott; Philadelphia, PA, USA: 2013.
      </p>
    </div>
  );
}

function DisclaimerSection() {
  return (
    <div className="mt-6 text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-4 rounded-xl">
      <p className="font-semibold mb-1">Disclaimer</p>
      <p>
        This calculator is intended for educational and clinical support purposes only.
        Calculations must be independently verified and should not be used alone to guide
        patient care, nor should they substitute for clinical judgment, institutional
        protocols, or specialist consultation.
      </p>
    </div>
  );
}
