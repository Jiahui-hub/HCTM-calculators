import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function SodiumCalculator() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"hypo" | "hyper">("hypo");
  const [sex, setSex] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState(70);
  const [serumNa, setSerumNa] = useState(125);
  const [targetNa, setTargetNa] = useState(132);
  const [infusateNa, setInfusateNa] = useState(154);

  // Estimated Total Body Water
  const totalBodyWaterFactor = sex === "male" ? 0.6 : 0.5;
  const totalBodyWater = weight * totalBodyWaterFactor;

  // Adrogue-Madias equation
  const deltaNaPerL = (infusateNa - serumNa) / (totalBodyWater + 1);

  const rawChange = targetNa - serumNa;
  const maxCorrection = mode === "hypo" ? 8 : 10;
  const plannedChange = Math.min(Math.abs(rawChange), maxCorrection);

  // Volume required to achieve SAFE correction
  const volumeRequired = deltaNaPerL !== 0 ? plannedChange / Math.abs(deltaNaPerL) : 0;

  // Infusion rate over 24h
  const infusionRate = volumeRequired > 0 ? (volumeRequired * 1000) / 24 : 0;

  // Free Water Deficit (Hypernatremia only)
  const freeWaterDeficit = mode === "hyper" ? totalBodyWater * (serumNa / targetNa - 1) : 0;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-2xl mx-auto bg-white p-6 md:p-10 rounded-2xl shadow-xl">
        {/* Standardized Home Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-md text-white font-semibold mb-8 transition-transform hover:scale-105"
        >
          <span className="w-4 h-4"><FiArrowLeft /></span>
          Back to Home
        </button>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          Sodium Management Calculator
        </h1>

        <div className="space-y-6">
          {/* Inputs - Simplified to 1 column vertical flow */}
          <div className="space-y-4 max-w-md mx-auto">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Clinical Scenario</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                value={mode}
                onChange={(e) => setMode(e.target.value as "hypo" | "hyper")}
              >
                <option value="hypo">Hyponatremia</option>
                <option value="hyper">Hypernatremia</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Sex</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                value={sex}
                onChange={(e) => setSex(e.target.value as "male" | "female")}
              >
                <option value="male">Male (0.6 × weight)</option>
                <option value="female">Female (0.5 × weight)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Weight (kg)</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                value={weight}
                onChange={(e) => setWeight(+e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Current Na⁺ (mmol/L)</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                value={serumNa}
                onChange={(e) => setSerumNa(+e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Target Na⁺ (mmol/L)</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                value={targetNa}
                onChange={(e) => setTargetNa(+e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Intravenous Fluid</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                value={infusateNa}
                onChange={(e) => setInfusateNa(+e.target.value)}
              >
                {mode === "hypo" && (
                  <>
                    <option value={154}>0.9% Sodium Chloride (154 mmol/L)</option>
                    <option value={513}>3% Hypertonic Saline (513 mmol/L)</option>
                  </>
                )}
                {mode === "hyper" && (
                  <>
                    <option value={0}>5% Dextrose in Water (0 mmol/L)</option>
                    <option value={77}>0.45% Sodium Chloride (77 mmol/L)</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Results Section - Simplified to 1 column */}
          <div className="bg-slate-100 p-6 rounded-2xl space-y-4 shadow-inner border border-slate-200">
            <div className="space-y-3">
              <p className="text-gray-700">Estimated Total Body Water: <b className="text-gray-900">{totalBodyWater.toFixed(1)} L</b></p>
              <p className="text-gray-700">Planned Na⁺ Correction (24h): <b className="text-gray-900">{plannedChange.toFixed(1)} mmol/L</b></p>
              <p className="text-gray-700">Predicted Na⁺ Change per 1 L: <b className="text-gray-900">{deltaNaPerL.toFixed(2)} mmol/L</b></p>
              <p className="text-gray-700">Suggested Infusion Rate: <b className="text-indigo-700 text-lg">{infusionRate > 0 ? infusionRate.toFixed(0) : 0} mL/hour</b></p>
              {mode === "hyper" && (
                <p className="text-gray-700">Estimated Free Water Deficit: <b className="text-gray-900">{freeWaterDeficit.toFixed(2)} L</b></p>
              )}
            </div>

            {/* Alerts */}
            <div className="pt-2">
              {mode === "hypo" && infusateNa === 154 && (
                <p className="text-orange-600 font-medium flex items-center gap-2">
                  <span>⚠</span> 0.9% saline may be insufficient to significantly raise sodium. Consider hypertonic saline if clinically indicated.
                </p>
              )}

              {Math.abs(rawChange) > maxCorrection && (
                <p className="text-red-600 font-semibold flex items-center gap-2">
                  <span>⚠</span> Target exceeds safe 24-hour correction limit. Risk of cerebral edema. Correction automatically capped at {maxCorrection} mmol.
                </p>
              )}

              {Math.abs(rawChange) <= maxCorrection && rawChange !== 0 && (
                <p className="text-green-600 font-medium flex items-center gap-2">
                  <span>✓</span> Within recommended correction limits.
                </p>
              )}
            </div>
          </div>

          {/* Clinical Notes */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Important Clinical Notes</h2>
            <ul className="list-disc ml-5 space-y-2 text-sm text-gray-600">
              <li>Do not exceed 8 mmol/L increase in 24 hours for chronic hyponatremia.</li>
              <li>Hypernatremia correction should generally not exceed 10 mmol/L per 24 hours.</li>
              <li>High-risk patients may require slower correction (≤6–8 mmol/L per day).</li>
              <li>Monitor serum sodium every 4–6 hours during active correction.</li>
            </ul>
          </div>

          {/* Standardized References */}
          <div className="mt-8 text-xs text-slate-500 border-t pt-6">
            <h2 className="font-bold text-sm text-gray-700 mb-2">References</h2>
            <p className="mb-1">Adrogué HJ, Madias NE. Hyponatremia. New England Journal of Medicine. 2000.</p>
            <p>European Clinical Practice Guideline on Hyponatremia (2014).</p>
          </div>

          {/* Standardized Disclaimer */}
          <div className="mt-8 text-[10px] sm:text-xs text-gray-500 text-center">
            <p className="font-bold mb-1 uppercase tracking-wider">Disclaimer</p>
            <p>Use as a guide. Calculations are for reference only. Always verify and consult clinical judgment before clinical application.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
