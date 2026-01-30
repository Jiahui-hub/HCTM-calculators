"use client";
import { useState } from "react";

export default function CalciumCalculator() {
  const [requiredMmol, setRequiredMmol] = useState("");

  // B. Braun Calcium Gluconate 10%
  const mmolPerML = 0.23;
  const ampouleML = 10;
  const mmolPerAmpoule = 2.25;

  const volume =
    requiredMmol ? Number(requiredMmol) / mmolPerML : 0;

  const ampoules = Math.ceil(volume / ampouleML);

  const calciumMEq =
    requiredMmol ? Number(requiredMmol) * 2 : 0; // Ca2+

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-6">
          Calcium Gluconate 10% (B. Braun)
        </h1>

        {/* Formula */}
        <div className="bg-indigo-50 p-4 rounded-lg mb-6 text-sm">
          <p className="font-semibold mb-1">Content:</p>
          <ul className="list-disc pl-5">
            <li>0.23 mmol calcium per mL</li>
            <li>2.25 mmol calcium per 10 mL ampoule</li>
          </ul>
        </div>

        {/* Input */}
        <div className="space-y-4">
          <Input
            label="Required calcium (mmol)"
            value={requiredMmol}
            setValue={setRequiredMmol}
          />
        </div>

        {/* Results */}
        {requiredMmol && (
          <div className="mt-6 border-t pt-4 space-y-3">
            <div>
              <p className="font-semibold">Total calcium required:</p>
              <p>{Number(requiredMmol).toFixed(2)} mmol</p>
              <p>{calciumMEq.toFixed(2)} mEq</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <p className="font-semibold mb-1">
                Calcium Gluconate 10% required:
              </p>
              <p>{volume.toFixed(1)} mL</p>
              <p>{ampoules} ampoule(s) (10 mL)</p>
            </div>
          </div>
        )}
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
