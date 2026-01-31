"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function MagnesiumCalculator() {
  const router = useRouter();

  const [weight, setWeight] = useState("");
  const [currentMg, setCurrentMg] = useState("");
  const [targetMg, setTargetMg] = useState("0.9"); // mmol/L

  // Magnesium deficit calculation
  const deficit =
    weight && currentMg && targetMg
      ? (Number(targetMg) - Number(currentMg)) * Number(weight) * 0.2
      : 0;

  // MgSO4 1g = 4 mmol Mg2+
  const mmolPerGram = 4;
  const volumeG = deficit > 0 ? deficit / mmolPerGram : 0;

  // Suggested dosage text
let suggestedDose = "";
if (volumeG > 0) {
  if (volumeG <= 1) suggestedDose = "1 g IM";
  else if (volumeG <= 5) suggestedDose = "Slow IV infusion 1-5 g";
  else suggestedDose = `${volumeG.toFixed(1)} g over several hours`;
}

// Calculate volume and ampoules for display
const volumeML = deficit > 0 ? (deficit / mmolPerGram) * 5 : 0; // 1g MgSO4 = 5 mL
let suggestedAmpoules = 0;
let suggestedDoseText = "";

if (volumeML > 0) {
  suggestedAmpoules = Math.ceil(volumeML / 5);
  suggestedDoseText =
    volumeML <= 5
      ? `IM: ${volumeML.toFixed(1)} mL (~${suggestedAmpoules} ampoule)`
      : `Slow IV: ${volumeML.toFixed(1)} mL (~${suggestedAmpoules} ampoules) over several hours`;
}

  // State for reference toggle
  const [openRef, setOpenRef] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 font-sans">
      {/* Top bar */}
      <div className="w-full fixed top-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm shadow-lg flex items-center px-4 py-3">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
        >
          &larr; Back
        </button>
      </div>

      {/* Spacer */}
      <div className="pt-16" />

      {/* Main content */}
      <div className="flex-1 flex justify-center px-4 pb-8">
        <div className="w-full max-w-3xl bg-white rounded-[2rem] shadow-2xl p-8 md:p-10 space-y-8 overflow-y-auto">

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6">
            Magnesium Deficit Calculator
          </h1>

          {/* Formula */}
          <div className="bg-indigo-50 p-6 rounded-[1.5rem] shadow-md hover:shadow-xl transition duration-300 ease-in-out">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Formula used:</h2>
            <p className="text-gray-700 mb-2">
              <b>Mg deficit (mmol)</b> = (Target Mg − Measured Mg) × Weight (kg) × 0.2
            </p>
            <p className="text-sm text-gray-600">Note: 1 mmol/L = 1 mEq/L</p>
          </div>

          {/* Inputs */}
          <div className="bg-gray-50 p-6 rounded-[1.5rem] shadow-md space-y-4 md:flex md:space-y-0 md:gap-4 transition duration-300 ease-in-out">
            <Input label="Body weight (kg)" value={weight} setValue={setWeight} />
            <Input label="Measured magnesium (mmol/L)" value={currentMg} setValue={setCurrentMg} />
            <Input label="Target magnesium (mmol/L)" value={targetMg} setValue={setTargetMg} />
          </div>

          {/* Warning Message */}
          {Number(currentMg) > 0 && (
            <div
              className={`p-4 rounded-[1rem] shadow ${
                Number(currentMg) < 0.9
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
              } transition`}
            >
              ⚠ {Number(currentMg) < 0.9 ? "Severe hypomagnesaemia" : "Mild hypomagnesaemia"}
            </div>
          )}

          {/* Results */}
          {deficit > 0 && (
            <div className="bg-green-50 p-6 rounded-[1.5rem] shadow-xl mt-8 hover:shadow-2xl transition duration-300 ease-in-out">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 text-center">
                Total magnesium deficit: {deficit.toFixed(1)} mmol
              </h2>
              <div>
                <p className="font-semibold mb-2">Suggested replacement (MgSO₄):</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm max-w-xl mx-auto">
                  <li>
                    Required volume: <b>{volumeML.toFixed(1)} mL</b>
                  </li>
                  <li>
                    ≈ <b>{suggestedAmpoules} ampoule(s)</b> (5 mL per ampoule)
                  </li>
                  {Number(currentMg) > 0.9 && (
                    <li className="flex items-center gap-2 bg-red-100 p-2 rounded">
                      ⚠ Measured magnesium &gt; 0.9 mmol/L — adjust infusion carefully
                    </li>
                  )}
                </ul>
                <p className="mt-4 text-center font-semibold">{suggestedDoseText}</p>
              </div>
            </div>
          )}

          {/* Dose Section */}
          <DoseSection />

          {/* Administration Section */}
          <AdministrationSection />

          {/* Notes Section */}
          <NotesSection />

          {/* Reference Section */}
          <ReferenceSection openRef={openRef} setOpenRef={setOpenRef} />

        </div>
      </div>
    </div>
  );
}

// Helper Components
function Input({ label, value, setValue }: { label: string; value: string; setValue: (val: string) => void }) {
  return (
    <div className="flex-1">
      <label className="block text-sm font-medium mb-1 text-gray-700">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}

function DoseSection() {
  return (
    <div className="bg-yellow-50 p-4 rounded-xl space-y-2">
      <h2 className="font-bold text-lg">Dose</h2>
      <p>Mild hypomagnesaemia:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>IM: 1 g (8 mEq) every 6 hours for 4 doses</li>
      </ul>
      <p>Severe hypomagnesaemia:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>IM: 0.25 g/kg over 4 hours</li>
        <li>Slow IV infusion: 5 g over 3–4 hours</li>
      </ul>
    </div>
  );
}

function AdministrationSection() {
  return (
    <div className="bg-blue-50 p-4 rounded-xl space-y-2">
      <h2 className="font-bold text-lg">Administration</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Fast correction: dilute 1 ampoule in 100 mL NS/D5% over 1 hour</li>
        <li>IV: dilute to 200 mg/mL (20%) or add ≥7.5 mL compatible solution per ampoule</li>
        <li>Max IV rate: 2 g/hr to avoid hypotension</li>
        <li>IM: dilution not required; can dilute up to 5 mL or 250–500 mg/mL</li>
      </ul>
    </div>
  );
}

function NotesSection() {
  return (
    <div className="bg-purple-50 p-4 rounded-xl space-y-2">
      <h2 className="font-bold text-lg">Notes</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>MgSO₄ 1 g = 4 mmol Mg²⁺</li>
        <li>Each 5 mL contains 10 mmol (20 mEq Mg²⁺ & 20 mEq SO₄²⁻)</li>
        <li>1 mL = 493 mg MgSO₄ (2 mmol = 4 mEq Mg, 2 mmol = 4 mEq SO₄)</li>
        <li>Max dose: 30–40 g/day</li>
      </ul>
    </div>
  );
}

function ReferenceSection({ openRef, setOpenRef }: { openRef: boolean; setOpenRef: (val: boolean) => void }) {
  return (
    <div className="bg-gray-100 p-4 rounded-xl">
      <button
        onClick={() => setOpenRef(!openRef)}
        className="flex items-center justify-between w-full font-semibold text-gray-800"
      >
        <span className="flex items-center gap-2">
          Reference {openRef ? <FiChevronUp /> : <FiChevronDown />}
        </span>
      </button>
      {openRef && (
        <div className="mt-2 text-sm text-gray-700 space-y-1">
          {/* Add your references here */}
          <p>Sample reference line for you to copy</p>
        </div>
      )}
    </div>
  );
}