"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiChevronDown, FiChevronUp, FiArrowLeft } from "react-icons/fi";

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

  const suggestedVials =
    volumeML > 0 ? Math.ceil(volumeML / vialML) : 0;

  const k = Number(currentK);

  let potassiumWarning = "";
  let warningColor = "bg-green-50 border-green-200";

  if (k > 0) {
    if (k < 2.5) {
      potassiumWarning =
        "Severe hypokalaemia (<2.5 mmol/L). Continuous ECG monitoring required.";
      warningColor = "bg-red-50 border-red-200";
    } else if (k < 3.0) {
      potassiumWarning =
        "Moderate hypokalaemia (2.5–3.0 mmol/L). IV replacement with close monitoring.";
      warningColor = "bg-orange-50 border-orange-200";
    } else if (k < 3.5) {
      potassiumWarning =
        "Mild hypokalaemia (3.0–3.5 mmol/L). Oral replacement preferred.";
      warningColor = "bg-yellow-50 border-yellow-200";
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 flex flex-col items-center">

      {/* Top bar */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 z-50">
        <div className="bg-white shadow-md flex items-center py-3 px-4 rounded-2xl mt-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      </div>

      <div className="h-28" />

      {/* Main Card */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl px-8 py-10 mb-16">

        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Potassium Deficit Calculator
        </h1>

        {/* Formula Section */}
        <div className="bg-indigo-50 p-6 rounded-3xl shadow-sm mb-10">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            Formula used:
          </h2>
          <p className="text-gray-700 mb-2">
            <b>Potassium deficit (mmol)</b> = (Target K⁺ − Measured K⁺) × Weight (kg) × 0.4
          </p>
          <p className="text-sm text-gray-600">
            Note: 1 mEq/L = 1 mmol/L
          </p>
        </div>

        {/* Input Section */}
        <div className="grid gap-8 md:grid-cols-3 bg-gray-50 p-8 rounded-3xl shadow-sm max-w-3xl mx-auto mb-8">
          <Input label="Body weight (kg)" value={weight} setValue={setWeight} />
          <Input label="Measured potassium (mmol/L)" value={currentK} setValue={setCurrentK} />
          <Input label="Target potassium (mmol/L)" value={targetK} setValue={setTargetK} />
        </div>

        {/* Warning */}
        {potassiumWarning && (
          <div className={`p-4 rounded-2xl border ${warningColor} mb-6`}>
            ⚠ {potassiumWarning}
          </div>
        )}

        {/* Result Card */}
        {deficit > 0 && (
          <div className={`p-8 rounded-3xl border shadow-md text-center space-y-4 ${warningColor}`}>
            <h2 className="text-3xl font-bold">
              {deficit.toFixed(1)} mmol
            </h2>

            <p className="text-gray-700">
              Estimated volume required: {volumeML.toFixed(1)} mL
            </p>

            <p className="text-lg font-semibold text-indigo-700">
              Suggested KCl 10% vials (10 mL each): {suggestedVials} vial(s)
            </p>
          </div>
        )}

        {/* Info Sections */}
        <div className="mt-14 space-y-8 max-w-2xl mx-auto">
          <SectionCard title="Dose" content={
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>IV infusion: individualized; initial 40–60 mEq</li>
              <li>Normal daily requirement: 40–80 mEq</li>
              <li>K &gt; 2.5 mmol/L: 10–15 mmol/hr</li>
              <li>K 3–3.5 mmol/L: PO 40–100 mmol/day</li>
            </ul>
          } />

          <SectionCard title="Administration" content={
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Peripheral: 10 mEq/100 mL</li>
              <li>Central: 20–40 mEq/100 mL</li>
            </ul>
          } />

          <NotesSection />
          <SafetySection />
          <ReferenceSection openRef={openRef} setOpenRef={setOpenRef} />
          <DisclaimerSection />
        </div>
      </div>
    </div>
  );
}

// Helper Components

function Input({
  label,
  value,
  setValue,
}: {
  label: string;
  value: string;
  setValue: (val: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

    <div className="w-full max-w-[220px]">
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="—"
        className="
          w-full
          rounded-lg
          border border-gray-300
          px-3 py-2
          text-sm
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500
        "
      />
    </div>
  </div>
  );
}

function SectionCard({ title, content }: { title: string; content: React.ReactNode }) {
  return (
    <div className="bg-indigo-50 p-6 rounded-[1.5rem] shadow-md">
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
