"use client";

import React, { useState } from 'react';

function CalciumCalculator() {
  const [measuredCalcium, setMeasuredCalcium] = useState('');
  const [albumin, setAlbumin] = useState('');
  const [correctedCalcium, setCorrectedCalcium] = useState(null);

  const calculateCorrectedCalcium = () => {
    const Ca = parseFloat(measuredCalcium);
    const Alb = parseFloat(albumin);

    if (isNaN(Ca) || isNaN(Alb)) {
      alert('Please enter valid numbers');
      return;
    }

    const corrected = Ca + 0.8 * (4.0 - Alb);
    setCorrectedCalcium(corrected.toFixed(2));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Calcium Correction Calculator</h2>
      <div>
        <label>
          Measured Calcium (mg/dL):
          <input
            type="number"
            value={measuredCalcium}
            onChange={(e) => setMeasuredCalcium(e.target.value)}
            style={{ marginLeft: '10px', width: '100px' }}
          />
        </label>
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>
          Albumin (g/dL):
          <input
            type="number"
            value={albumin}
            onChange={(e) => setAlbumin(e.target.value)}
            style={{ marginLeft: '10px', width: '100px' }}
          />
        </label>
      </div>
      <button
        onClick={calculateCorrectedCalcium}
        style={{ marginTop: '15px', padding: '8px 16px' }}
      >
        Calculate
      </button>
      {correctedCalcium !== null && (
        <div style={{ marginTop: '20px' }}>
          <h3>Corrected Calcium: {correctedCalcium} mg/dL</h3>
        </div>
      )}
    </div>
  );
}

export default CalciumCalculator;