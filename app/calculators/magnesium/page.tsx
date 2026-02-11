"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiChevronDown, FiChevronUp, FiArrowLeft } from "react-icons/fi";

export default function MagnesiumCalculator() {
  const router = useRouter();

  const [weight, setWeight] = useState("");
  const [currentMg, setCurrentMg] = useState("");
  const [targetMg, setTargetMg] = useState("0.9");

  // Your calculation logic remains unchanged
  const deficit =
    weight && currentMg && targetMg
      ? (Number(targetMg) - Number(currentMg)) * Number(weight) * 0.2
      : 0;

  const mmolPerGram = 4;
  const volumeG = deficit > 0 ? deficit / mmolPerGram : 0;

  let suggestedDose = "";
  if (volumeG > 0) {
    if (volumeG <= 1) suggestedDose = "1 g IM";
    else if (volumeG <= 5) suggestedDose = "Slow IV infusion 1-5 g";
    else suggestedDose = `${volumeG.toFixed(1)} g over several hours`;
  }

  const volumeML = deficit > 0 ? volumeG * 5 : 0;
  let suggestedAmpoules = 0;
  let suggestedDoseText = "";

  if (volumeML > 0) {
    suggestedAmpoules = Math.ceil(volumeML / 5);
    if (volumeML <= 5) {
      suggestedDoseText = `IM: ${volumeML.toFixed(1)} mL (~${suggestedAmpoules} ampoule)`;
    } else if (volumeML <= 15) {
      suggestedDoseText = `Slow IV: ${volumeML.toFixed(1)} mL (~${suggestedAmpoules} ampoules)`;
    } else {
      suggestedDoseText = `${volumeML.toFixed(1)} mL (~${suggestedAmpoules} ampoules) over several hours`;
    }
  }

  // Reference toggle
  const [openRef, setOpenRef] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 font-sans overflow-hidden">
      {/* Top bar with styled back button, matching your potassium style */}
      <div className="w-full fixed top-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm shadow-lg flex items-center px-4 py-3">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-lg text-white font-semibold transition-transform hover:scale-105"
        >
          <FiArrowLeft />
          Back
        </button>
      </div>
      {/* Spacer */}
      <div className="pt-16" />

      {/* Main content wrapper */}
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

          {/* Input section */}
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
              {/* Suggested volume and ampoules */}
              {(() => {
                const volumeML = (deficit / mmolPerGram) * 5;
                const suggestedAmpoules = Math.ceil(volumeML / 5);
                const suggestedDoseText =
                  volumeML <= 5
                    ? `IM: ${volumeML.toFixed(1)} mL (~${suggestedAmpoules} ampoule)`
                    : `Slow IV: ${volumeML.toFixed(1)} mL (~${suggestedAmpoules} ampoules)`;
                return (
                  <>
                    <p>Suggested replacement: <b>{suggestedDoseText}</b></p>
                    <p>Equivalent: <b>{(volumeML / 5).toFixed(1)} g MgSO₄</b></p>
                    <p>Approx. <b>{suggestedAmpoules} ampoule(s)</b> (5 mL per ampoule)</p>
                  </>
                );
              })()}
            </div>
          )}

          {/* Dose Section */}
          <DoseSection />

          {/* Administration Section */}
          <AdministrationSection />

          {/* Notes Section */}
          <NotesSection />

          {/* Reference toggle styled like potassium */}
          <div
            className="bg-gray-50 p-4 rounded-[1.5rem] shadow-md transition relative cursor-pointer"
            style={{
              backgroundColor: '#e0e0e0', // light color
              borderRadius: '8px',
              padding: '8px 16px',
              marginTop: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => setOpenRef(!openRef)}
          >
            <span className="flex items-center gap-2 font-semibold text-gray-800">
              Reference {openRef ? <FiChevronUp /> : <FiChevronDown />}
            </span>
          </div>
          {openRef && (
            <div className="mt-2 text-sm text-gray-700 max-w-2xl mx-auto">
              {/* Your reference content here */}
              <p>Sample reference line for you to copy</p>
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-8 text-xs text-gray-600 border-t pt-4 max-w-2xl mx-auto text-center">
            <p className="font-semibold mb-1">Disclaimer</p>
            <p>Use as a guide. Verify all calculations before clinical application.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components (unchanged)
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

function AdministrationSection() {
  return (
    <div className="bg-blue-50 p-4 rounded-xl space-y-2">
      <h2 className="font-bold text-lg">Administration</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Fast correction: dilute 1 ampoule in 100 mL NS/D5% over 1 hour</li>
        <li>IV infusion: dilute to 200 mg/mL (20%) or add ≥7.5 mL of compatible solution per ampoule (max rate: 2g/hr to avoid hypotension)</li>
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
        <li>Each 5 mL contains 10 mmol MgSO₄</li>
        <li>1 mL = 493 mg MgSO₄ (2 mmol = 4 mEq Mg, 2 mmol = 4 mEq SO₄)</li>
        <li>Max dose: 30–40 g/day</li>
      </ul>
    </div>
  );
}

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
          {/* Your references here */}
          <p>Sample reference line for you to copy</p>
        </div>
      )}
    </div>
  );
}
