"use client";
import { useState } from "react";

export default function PotassiumCalculator() {
  const [weight, setWeight] = useState("");
  const [currentK, setCurrentK] = useState("");
  const [targetK, setTargetK] = useState("4.0");

  const deficit =
    weight && currentK && targetK
      ? (Number(targetK) - Number(currentK)) * Number(weight) * 0.4
      : 0;

  // Injecsol K10 assumptions
  const mmolPer10ML = 13.41;
  const vialML = 10;

  const volumeML = deficit > 0 ? deficit / mmolPer10ML : 0;
  const ampoules = Math.ceil(volumeML / vialML);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4">
          Potassium Deficit Calculator
        </h1>

        {/* Formula */}
        <div className="bg-indigo-50 p-4 rounded-lg mb-6 text-sm">
          <p className="font-semibold mb-1">Formula used:</p>
          <p>
            Potassium deficit (mmol) = (Target K⁺ − Measured K⁺) × Weight (kg) ×
            0.4
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <Input label="Body weight (kg)" value={weight} setValue={setWeight} />
          <Input
            label="Measured potassium (mmol/L)"
            value={currentK}
            setValue={setCurrentK}
          />
          <Input
            label="Target potassium (mmol/L)"
            value={targetK}
            setValue={setTargetK}
          />
        </div>

        {/* Results */}
        {deficit > 0 && (
          <div className="mt-6 border-t pt-4 space-y-3">
            <p className="text-lg">
              <b>Total potassium deficit:</b> {deficit.toFixed(1)} mmol
            </p>

            <div className="bg-green-50 p-4 rounded-lg">
              <p className="font-semibold mb-1">
                Suggested replacement (Injecsol K10):
              </p>
              <p>
                Required volume: <b>{volumeML.toFixed(1)} mL</b>
              </p>
              <p>
                ≈ <b>{vials} vials</b> (13.4 mmol/ 10mL vial)
              </p>
            </div>
          </div>
        )}

        {/* Reference */}
        <div className="mt-6 text-sm text-gray-600">
          <p className="font-semibold mb-1">Reference:</p>
          <ul className="list-disc pl-5">
            <li>MyFormulary Pharmacy Malaysia – Potassium Deficit Calculator</li>
            <li>Standard clinical electrolyte replacement guidelines</li>
          </ul>
        </div>

        {/* Disclaimer */}
        <p className="mt-4 text-xs text-gray-500">
          ⚠ For educational purposes only. Always verify with institutional
          protocols.
        </p>
      </div>
    </div>
  );
}

function Input({ label, value, setValue }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}
