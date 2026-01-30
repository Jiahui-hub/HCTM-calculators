"use client";
import { useState } from "react";

export default function SodiumCalculator() {
  const [weight, setWeight] = useState(70);
  const [serumNa, setSerumNa] = useState(130);
  const [infusateNa, setInfusateNa] = useState(154);

  const tbw = weight * 0.6; // total body water approx
  const deltaNa = (infusateNa - serumNa) / (tbw + 1);

  return (
    <div style={{ padding: 20 }}>
      <h1>Sodium Correction Calculator</h1>
      <div>
        <label>Weight (kg): </label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(+e.target.value)}
        />
      </div>
      <div>
        <label>Serum Na (mmol/L): </label>
        <input
          type="number"
          value={serumNa}
          onChange={(e) => setSerumNa(+e.target.value)}
        />
      </div>
      <div>
        <label>Infusate Na (mmol/L): </label>
        <input
          type="number"
          value={infusateNa}
          onChange={(e) => setInfusateNa(+e.target.value)}
        />
      </div>
      <p>
        Estimated Na change per L: <b>{deltaNa.toFixed(2)} mmol/L</b>
      </p>
      {deltaNa * 24 > 12 && (
        <p style={{ color: "red" }}>
          ⚠ Rapid correction risk! Keep &lt;10–12 mmol/L per 24h
        </p>
      )}
    </div>
  );
}
