"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function MagnesiumCalculator() {
  const router = useRouter();

  const [weight, setWeight] = useState("");
  const [currentMg, setCurrentMg] = useState("");
  const [targetMg, setTargetMg] = useState("0.9"); // mmol/L

  // Magnesium deficit calculation (example formula)
  const deficit =
    weight && currentMg && targetMg
      ? (Number(targetMg) - Number(currentMg)) * Number(weight) * 0.2
      : 0;

  // MgSO4 1g = 4 mmol Mg2+
  const mmolPerGram = 4;
  const volumeG = deficit > 0 ? deficit / mmolPerGram : 0;

  // Suggested dosage (simplified, adjust according to ranges)
let suggestedDose = "";
if (volumeG > 0) {
  if (volumeG <= 1) suggestedDose = "1 g IM";
  else if (volumeG <= 5) suggestedDose = "Slow IV infusion 1-5 g";
  else suggestedDose = `${volumeG.toFixed(1)} g over several hours`;
}

// Calculate volume and ampoules for display
const volumeML = deficit > 0 ? deficit * 5 : 0; // 1 g MgSO4 = 5 mL
let suggestedAmpoules = 0;
let suggestedDoseText = "";

if (volumeML > 0) {
  suggestedAmpoules = Math.ceil(volumeML / 5);

  if (volumeML <= 5) {
    suggestedDoseText = `IM: 1 ampoule (~${volumeML.toFixed(1)} mL)`;
  } else if (volumeML <= 15) {
    suggestedDoseText = `Slow IV: ${volumeML.toFixed(1)} mL (~${suggestedAmpoules} ampoules)`;
  } else {
    suggestedDoseText = `${volumeML.toFixed(1)} mL (~${suggestedAmpoules} ampoules) over several hours`;
  }
}

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          &larr; Back
        </button>

        <h1 className="text-3xl font-bold text-gray-900">
          Magnesium Deficit Calculator
        </h1>

        {/* Formula */}
        <div className="bg-indigo-50 text-indigo-900 p-4 rounded-xl">
          <p className="font-semibold mb-1">Formula used:</p>
          <p>Mg deficit (mmol) = (Target Mg − Measured Mg) × Weight (kg) × 0.2</p>
          <p className="mt-2">Note: 1 mmol/L = 1 mEq/L</p>
        </div>

        {/* Inputs */}
        <div className="bg-white p-4 rounded-xl shadow space-y-4">
          <Input label="Body weight (kg)" value={weight} setValue={setWeight} />
          <Input label="Measured magnesium (mmol/L)" value={currentMg} setValue={setCurrentMg} />
          <Input label="Target magnesium (mmol/L)" value={targetMg} setValue={setTargetMg} />
        </div>

        {/* Results */}
        {deficit > 0 && (
          <div className="bg-green-50 p-4 rounded-xl shadow space-y-3">
            <p className="font-semibold text-lg">
              Total magnesium deficit: {deficit.toFixed(1)} mmol
            </p>
            <p>Suggested replacement: <b>{suggestedDose}</b></p>
            <p>Total volume: <b>{volumeML.toFixed(1)} mL</b> (~{suggestedAmpoules} ampoule(s))</p>
          </div>
        )}

        {/* Dose Section */}
        <DoseSection />

        {/* Administration Section */}
        <AdministrationSection />

        {/* Notes Section */}
        <NotesSection />

        {/* Reference Section */}
        <ReferenceSection />

      </div>
    </div>
  );
}

// Input Component
function Input({ label, value, setValue }: any) {
  return (
    <div>
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

// Dose Section
function DoseSection() {
  return (
    <div className="bg-yellow-50 p-4 rounded-xl space-y-2">
      <h2 className="font-bold text-lg">Dose</h2>
      <p>Mild hypomagnesaemia:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>IM: 1g (8 mEq) every 6 hours for 4 doses</li>
      </ul>
      <p>Severe hypomagnesaemia:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>IM: 0.25 g/kg over 4 hours</li>
        <li>Slow IV infusion: 5 g over 3–4 hours</li>
      </ul>
    </div>
  );
}

// Administration Section
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

// Notes Section
function NotesSection() {
  return (
    <div className="bg-purple-50 p-4 rounded-xl space-y-2">
      <h2 className="font-bold text-lg">Notes</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>MgSO4 1 g = 4 mmol Mg²⁺</li>
        <li>Each 5 mL contains 10 mmol (20 mEq Mg²⁺ & 20 mEq SO₄²⁻)</li>
        <li>1 mL = 493 mg MgSO₄ (2 mmol = 4 mEq Mg, 2 mmol = 4 mEq SO₄)</li>
        <li>Max dose: 30–40 g/day</li>
      </ul>
    </div>
  );
}

// Reference Section (collapsible)
function ReferenceSection() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gray-100 p-4 rounded-xl">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full font-semibold text-gray-800"
      >
        Reference {open ? <FiChevronUp /> : <FiChevronDown />}
      </button>
      {open && (
        <div className="mt-2 text-sm text-gray-700 space-y-1">
          {/* Add your references below */}
          <p>Sample reference line for you to copy</p>
        </div>
      )}
    </div>
  );
}
