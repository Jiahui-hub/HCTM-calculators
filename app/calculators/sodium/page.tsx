"use client";
import { useState } from "react";

export default function SodiumCalculator() {
  const [mode, setMode] = useState<"hypo" | "hyper">("hypo");
  const [sex, setSex] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState(70);
  const [serumNa, setSerumNa] = useState(125);
  const [targetNa, setTargetNa] = useState(132);
  const [infusateNa, setInfusateNa] = useState(154);

  // TBW calculation
  const tbwFactor = sex === "male" ? 0.6 : 0.5;
  const tbw = weight * tbwFactor;

  // Adrogue-Madias formula
  const deltaNaPerL = (infusateNa - serumNa) / (tbw + 1);

  const desiredChange = targetNa - serumNa;

  const safeLimitHypo = 8;
const safeLimitHyper = 10;

const absoluteChange = Math.abs(desiredChange);

const exceedsHypoLimit =
  mode === "hypo" && absoluteChange > safeLimitHypo;

const exceedsHyperLimit =
  mode === "hyper" && absoluteChange > safeLimitHyper;

const warningHyperModerate =
  mode === "hyper" &&
  absoluteChange > 8 &&
  absoluteChange <= 10;

  const volumeRequired = desiredChange / deltaNaPerL;

  const maxSafeIncrease24h = 8; // mmol/L

  const maxSafeVolume =
    maxSafeIncrease24h / deltaNaPerL > 0
      ? maxSafeIncrease24h / deltaNaPerL
      : 0;

  const infusionRate =
    volumeRequired > 0 ? volumeRequired / 24 : 0;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow">

        <h1 className="text-2xl font-semibold mb-6">
          Sodium Correction Calculator
        </h1>

        {/* Mode Selection */}
        <div className="mb-4">
          <label className="font-medium mr-4">Mode:</label>
          <select
            className="border rounded px-3 py-1"
            value={mode}
            onChange={(e) =>
              setMode(e.target.value as "hypo" | "hyper")
            }
          >
            <option value="hypo">Hyponatremia</option>
            <option value="hyper">Hypernatremia</option>
          </select>
        </div>

        {/* Sex */}
        <div className="mb-4">
          <label className="font-medium mr-4">Sex:</label>
          <select
            className="border rounded px-3 py-1"
            value={sex}
            onChange={(e) =>
              setSex(e.target.value as "male" | "female")
            }
          >
            <option value="male">Male (0.6)</option>
            <option value="female">Female (0.5)</option>
          </select>
        </div>

        {/* Weight */}
        <div className="mb-4">
          <label>Weight (kg)</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={weight}
            onChange={(e) => setWeight(+e.target.value)}
          />
        </div>

        {/* Serum Na */}
        <div className="mb-4">
          <label>Current Serum Na (mmol/L)</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={serumNa}
            onChange={(e) => setSerumNa(+e.target.value)}
          />
        </div>

        {/* Target Na */}
        <div className="mb-4">
          <label>Target Na (mmol/L)</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={targetNa}
            onChange={(e) => setTargetNa(+e.target.value)}
          />
        </div>

        {/* Product Selection */}
        <div className="mb-6">
          <label>Infusate</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={infusateNa}
            onChange={(e) => setInfusateNa(+e.target.value)}
          >
            <option value={154}>0.9% NaCl (154 mmol/L)</option>
            <option value={77}>0.45% NaCl (77 mmol/L)</option>
            <option value={513}>3% Hypertonic Saline (513 mmol/L)</option>
          </select>
        </div>

        {/* Results */}
        <div className="bg-slate-100 p-4 rounded-xl space-y-2">

  <p>
    TBW: <b>{tbw.toFixed(1)} L</b>
  </p>

  <p>
    ΔNa per 1L: <b>{deltaNaPerL.toFixed(2)} mmol/L</b>
  </p>

  <p>
    Estimated Volume Required:{" "}
    <b>{volumeRequired > 0 ? volumeRequired.toFixed(2) : 0} L</b>
  </p>

  <p>
    Suggested Infusion Rate:{" "}
    <b>{infusionRate.toFixed(2)} L/hr</b>
  </p>

  {/* Safety Alerts */}

  {exceedsHypoLimit && (
    <p className="text-red-600 font-semibold">
      ⚠ Exceeds safe correction limit (8 mmol/L per 24h).
      Risk of osmotic demyelination syndrome.
    </p>
  )}

  {exceedsHyperLimit && (
    <p className="text-red-600 font-semibold">
      ⚠ Hypernatremia correction too rapid (&gt;10 mmol/L per 24h).
      Risk of cerebral edema.
    </p>
  )}

  {warningHyperModerate && (
    <p className="text-orange-600 font-medium">
      ⚠ Consider limiting correction to ≤8 mmol/L in high-risk patients.
    </p>
  )}

  {!exceedsHypoLimit && !exceedsHyperLimit && (
    <p className="text-green-600 font-medium">
      ✓ Within recommended correction safety range.
    </p>
  )}
</div>


        {/* Clinical Notes */}
        <div className="mt-8 text-sm text-slate-600">
          <h2 className="font-semibold mb-2">Important Clinical Notes</h2>
          <ul className="list-disc ml-5 space-y-1">
            <li>Do not exceed 8 mmol/L correction in 24 hours.</li>
            <li>High risk ODS patients may require ≤6 mmol/L per 24h.</li>
            <li>Recheck sodium every 4–6 hours during active correction.</li>
            <li>Hypertonic saline reserved for symptomatic hyponatremia.</li>
          </ul>
        </div>

        {/* References */}
        <div className="mt-6 text-xs text-slate-500">
          <h2 className="font-semibold mb-1">References</h2>
          <p>
            Adrogue HJ, Madias NE. Hyponatremia. NEJM 2000.
          </p>
          <p>
            European Clinical Practice Guidelines on Hyponatremia (2014).
          </p>
          <p>
            MDCalc Sodium Correction Rate.
          </p>
        </div>

      </div>
    </div>
  );
}
