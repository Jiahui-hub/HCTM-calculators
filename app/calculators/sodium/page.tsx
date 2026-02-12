"use client";
import { useState } from "react";

export default function SodiumCalculator() {
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
  const deltaNaPerL =
    (infusateNa - serumNa) / (totalBodyWater + 1);

  const desiredChange = targetNa - serumNa;

  const volumeRequired =
    deltaNaPerL !== 0
      ? desiredChange / deltaNaPerL
      : 0;

  const infusionRate =
    volumeRequired > 0
      ? (volumeRequired * 1000) / 24
      : 0;

  // Free Water Deficit (Hypernatremia only)
  const freeWaterDeficit =
    mode === "hyper"
      ? totalBodyWater *
        ((serumNa / targetNa) - 1)
      : 0;

  // Safety Limits
  const absoluteChange = Math.abs(desiredChange);

  const safeLimitHypo = 8;
  const safeLimitHyper = 10;

  const exceedsHypo =
    mode === "hypo" &&
    absoluteChange > safeLimitHypo;

  const exceedsHyper =
    mode === "hyper" &&
    absoluteChange > safeLimitHyper;

  const cautionHyper =
    mode === "hyper" &&
    absoluteChange > 8 &&
    absoluteChange <= 10;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-2xl font-semibold mb-6">
          Sodium Management Calculator
        </h1>

        {/* Mode */}
        <div className="mb-4">
          <label className="font-medium">Clinical Scenario</label>
          <select
            className="w-full border rounded px-3 py-2 mt-1"
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
          <label>Sex</label>
          <select
            className="w-full border rounded px-3 py-2 mt-1"
            value={sex}
            onChange={(e) =>
              setSex(e.target.value as "male" | "female")
            }
          >
            <option value="male">
              Male (0.6 × body weight)
            </option>
            <option value="female">
              Female (0.5 × body weight)
            </option>
          </select>
        </div>

        {/* Weight */}
        <div className="mb-4">
          <label>Body Weight (kg)</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2 mt-1"
            value={weight}
            onChange={(e) => setWeight(+e.target.value)}
          />
        </div>

        {/* Serum Sodium */}
        <div className="mb-4">
          <label>Current Serum Sodium (mmol/L)</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2 mt-1"
            value={serumNa}
            onChange={(e) => setSerumNa(+e.target.value)}
          />
        </div>

        {/* Target Sodium */}
        <div className="mb-6">
          <label>Target Serum Sodium (mmol/L)</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2 mt-1"
            value={targetNa}
            onChange={(e) => setTargetNa(+e.target.value)}
          />
        </div>

        {/* Fluid Selection */}
        <div className="mb-6">
          <label>Intravenous Fluid</label>
          <select
            className="w-full border rounded px-3 py-2 mt-1"
            value={infusateNa}
            onChange={(e) =>
              setInfusateNa(+e.target.value)
            }
          >
            {mode === "hypo" && (
              <>
                <option value={154}>
                  0.9% Sodium Chloride (154 mmol/L)
                </option>
                <option value={513}>
                  3% Hypertonic Saline (513 mmol/L)
                </option>
              </>
            )}

            {mode === "hyper" && (
              <>
                <option value={0}>
                  5% Dextrose in Water (0 mmol/L)
                </option>
                <option value={77}>
                  0.45% Sodium Chloride (77 mmol/L)
                </option>
              </>
            )}
          </select>
        </div>

        {/* Results */}
        <div className="bg-slate-100 p-5 rounded-xl space-y-2">

          <p>
            Estimated Total Body Water:{" "}
            <b>{totalBodyWater.toFixed(1)} L</b>
          </p>

          <p>
            Predicted Sodium Change per 1 L:{" "}
            <b>{deltaNaPerL.toFixed(2)} mmol/L</b>
          </p>

          {mode === "hyper" && (
            <p>
              Estimated Free Water Deficit:{" "}
              <b>{freeWaterDeficit.toFixed(2)} L</b>
            </p>
          )}

          <p>
            Estimated Volume Required:{" "}
            <b>
              {volumeRequired > 0
                ? volumeRequired.toFixed(2)
                : 0}{" "}
              L
            </b>
          </p>

          <p>
            Suggested Infusion Rate:{" "}
            <b>
              {infusionRate > 0
                ? infusionRate.toFixed(0)
                : 0}{" "}
              mL/hour
            </b>
          </p>

          {/* Alerts */}
          {exceedsHypo && (
            <p className="text-red-600 font-semibold">
              ⚠ Correction exceeds 8 mmol/L per 24 hours.
              Risk of osmotic demyelination syndrome.
            </p>
          )}

          {exceedsHyper && (
            <p className="text-red-600 font-semibold">
              ⚠ Correction exceeds 10 mmol/L per 24 hours.
              Risk of cerebral edema.
            </p>
          )}

          {cautionHyper && (
            <p className="text-orange-600 font-medium">
              ⚠ Consider limiting correction to ≤8 mmol/L
              in high-risk patients.
            </p>
          )}

          {!exceedsHypo &&
            !exceedsHyper &&
            absoluteChange > 0 && (
              <p className="text-green-600 font-medium">
                ✓ Within recommended correction limits.
              </p>
            )}
        </div>

        {/* Clinical Notes */}
        <div className="mt-8 text-sm text-slate-600">
          <h2 className="font-semibold mb-2">
            Important Clinical Notes
          </h2>
          <ul className="list-disc ml-5 space-y-1">
            <li>
              Do not exceed 8 mmol/L increase in 24 hours
              for chronic hyponatremia.
            </li>
            <li>
              Hypernatremia correction should generally
              not exceed 10 mmol/L per 24 hours.
            </li>
            <li>
              High-risk patients may require slower
              correction (≤6–8 mmol/L per day).
            </li>
            <li>
              Monitor serum sodium every 4–6 hours during
              active correction.
            </li>
          </ul>
        </div>

        {/* References */}
        <div className="mt-6 text-xs text-slate-500">
          <h2 className="font-semibold mb-1">
            References
          </h2>
          <p>
            Adrogué HJ, Madias NE. Hyponatremia.
            New England Journal of Medicine.
            2000.
          </p>
          <p>
            European Clinical Practice Guideline on
            Hyponatremia (2014).
          </p>
        </div>

      </div>
    </div>
  );
}
