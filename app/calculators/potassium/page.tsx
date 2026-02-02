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

  const mmolPerML = 13.41 / 10;
  const volumeML = deficit > 0 ? deficit / mmolPerML : 0;
  const suggestedVials = volumeML > 0 ? Math.ceil(volumeML / 10) : 0;

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* PAGE CONTAINER — THIS CREATES REAL MARGINS */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* FIXED HEADER */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 sm:px-6 lg:px-8 z-50">
          <div className="bg-white/90 backdrop-blur shadow-lg rounded-xl py-3">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700"
            >
              <FiArrowLeft />
              Back
            </button>
          </div>
        </div>

        {/* SPACER FOR FIXED HEADER */}
        <div className="h-20" />

        {/* MAIN CARD */}
        <div className="bg-white rounded-[2rem] shadow-2xl p-8 md:p-10 lg:p-12 space-y-8">

          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900">
            Potassium Deficit Calculator
          </h1>

          <div className="bg-indigo-50 p-6 rounded-xl">
            <p className="font-semibold">
              Potassium deficit (mmol) = (Target − Measured) × Weight × 0.4
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Input label="Body weight (kg)" value={weight} setValue={setWeight} />
            <Input label="Measured potassium (mmol/L)" value={currentK} setValue={setCurrentK} />
            <Input label="Target potassium (mmol/L)" value={targetK} setValue={setTargetK} />
          </div>

          {potassiumWarning && (
            <div className={`p-4 rounded-lg ${warningColor}`}>
              ⚠ {potassiumWarning}
            </div>
          )}

          {deficit > 0 && (
            <div className="bg-green-50 p-6 rounded-xl">
              <p className="text-xl font-semibold text-center">
                Total deficit: {deficit.toFixed(1)} mmol
              </p>
              <p className="text-center mt-2">
                Volume: {volumeML.toFixed(1)} mL (≈ {suggestedVials} vials)
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <SectionCard title="Dose">
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>IV 10–15 mmol/hr (max 200/day)</li>
                <li>PO 40–100 mmol/day</li>
              </ul>
            </SectionCard>

            <SectionCard title="Administration">
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Peripheral: 10 mmol/100 mL</li>
                <li>Central: up to 40 mmol/100 mL</li>
              </ul>
            </SectionCard>
          </div>

          <SectionCard title="Reference">
            <button
              onClick={() => setOpenRef(!openRef)}
              className="flex items-center gap-2 font-semibold"
            >
              Reference {openRef ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            {openRef && (
              <p className="text-sm mt-2">
                Koda-Kimble & Young’s Applied Therapeutics, 10th ed.
              </p>
            )}
          </SectionCard>

          <p className="text-xs text-center text-gray-500 border-t pt-4">
            Use as a guide only. Verify before clinical application.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Helpers ---------- */

function Input({ label, value, setValue }: any) {
  return (
    <div>
      <label className="block mb-1 font-semibold">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full border rounded-lg p-3"
      />
    </div>
  );
}

function SectionCard({ title, children }: any) {
  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      <h3 className="font-semibold mb-2">{title}</h3>
      {children}
    </div>
  );
}
