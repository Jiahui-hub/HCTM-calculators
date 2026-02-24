"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

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

  const k = Number(currentK);
  let potassiumWarning = "";
  let warningColor = "bg-green-50 border-green-200 text-green-800";

  if (k > 0) {
    if (k < 2.5) {
      potassiumWarning =
        "Severe hypokalaemia (<2.5 mmol/L). Continuous ECG monitoring required.";
      warningColor = "bg-red-50 border-red-200 text-red-800";
    } else if (k < 3.0) {
      potassiumWarning =
        "Moderate hypokalaemia (2.5–3.0 mmol/L). IV replacement with close monitoring.";
      warningColor = "bg-orange-50 border-orange-200 text-orange-800";
    } else if (k < 3.5) {
      potassiumWarning =
        "Mild hypokalaemia (3.0–3.5 mmol/L). Oral replacement preferred.";
      warningColor = "bg-yellow-50 border-yellow-200 text-yellow-800";
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-2xl mx-auto bg-white p-6 md:p-10 rounded-2xl shadow-xl">
        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-md text-white font-semibold mb-8 transition-transform hover:scale-105"
        >
          <span className="w-4 h-4">
            <FiArrowLeft />
          </span>
          Back to Home
        </button>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          Potassium Deficit Calculator
        </h1>

        <div className="space-y-8">
          {/* Formula */}
          <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 shadow-sm">
            <h2 className="text-lg font-bold text-indigo-900 mb-2">
              Formula used:
            </h2>
            <p className="text-indigo-800">
              <b>Potassium deficit (mmol)</b> = (Target K⁺ − Measured K⁺) ×
              Weight (kg) × 0.4
            </p>
            <p className="text-xs text-indigo-600 mt-2 italic">
              Note: 1 mEq/L = 1 mmol/L
            </p>
          </div>

          {/* Inputs */}
          <div className="space-y-4 max-w-md mx-auto">
            <InputField
              label="Body weight (kg)"
              value={weight}
              onChange={setWeight}
            />
            <InputField
              label="Measured K⁺ (mmol/L)"
              value={currentK}
              onChange={setCurrentK}
            />
            <InputField
              label="Target K⁺ (mmol/L)"
              value={targetK}
              onChange={setTargetK}
            />
          </div>

          {/* Warning */}
          {potassiumWarning && (
            <div
              className={`p-4 rounded-xl border ${warningColor} flex items-center gap-3 text-sm font-medium`}
            >
              <span className="text-lg">⚠</span> {potassiumWarning}
            </div>
          )}

          {/* Result */}
          {deficit > 0 && (
            <div
              className={`p-8 rounded-2xl border shadow-inner text-center space-y-4 ${warningColor}`}
            >
              <h2 className="text-4xl font-black">
                {deficit.toFixed(1)}{" "}
                <span className="text-xl font-bold">mmol</span>
              </h2>

              <div className="space-y-1">
                <p className="text-sm opacity-90">
                  Estimated volume required:{" "}
                  <b>{volumeML.toFixed(1)} mL</b>
                </p>
                <p className="text-lg font-bold">
                  Suggested KCl 10% vials: {suggestedVials} vial(s)
                </p>
                <p className="text-xs opacity-75">(10 mL each vial)</p>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-8 text-xs text-slate-500 border-t pt-6 text-center">
            <p className="font-bold mb-1 uppercase tracking-wider">
              Disclaimer
            </p>
            <p>
              Use as a guide. Calculations are for reference only. Always verify
              and consult clinical judgment before clinical application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="—"
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition"
      />
    </div>
  );
}
