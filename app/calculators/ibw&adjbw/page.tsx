"use client";

import { useState } from 'react';

const BodyWeightCalculatorPage = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [ibw, setIbw] = useState<number | null>(null);
  const [adjbw, setAdjbw] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [refExpanded, setRefExpanded] = useState(false);
  const [reference, setReference] = useState('');
  const [refText, setRefText] = useState('');

  const handleCalculate = () => {
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    if (!height || !weight || !gender) {
      alert('Please fill all fields');
      return;
    }

    // Calculate IBW
    let ibwValue;
    if (gender === 'male') {
      ibwValue = 50 + 0.9 * (heightNum - 152);
    } else {
      ibwValue = 45.5 + 0.9 * (heightNum - 152);
    }

    // Calculate AdjBW
    const adjbwValue = ibwValue + 0.4 * (weightNum - ibwValue);

    setIbw(parseFloat(ibwValue.toFixed(2)));
    setAdjbw(parseFloat(adjbwValue.toFixed(2)));
    setShowResults(true);
  };

  const handleRefChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setReference(value);
    if (value === 'devine') {
      setRefText('Devine formula is used to estimate ideal body weight based on height and gender.');
    } else if (value === 'broca') {
      setRefText('Broca Index is a simple rule based on height: Ideal weight = height (cm) - 100 for males, height (cm) - 105 for females.');
    } else {
      setRefText('');
    }
  };

  const bmi = (weight && height) ? (parseFloat(weight) / ((parseFloat(height) / 100) ** 2)).toFixed(2) : '';

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', backgroundColor: '#f4f4f4', fontFamily: 'Arial, sans-serif' }}>
      {/* Title */}
      <h1 style={{ textAlign: 'center' }}>Body Weight Calculator</h1>

      {/* Inputs */}
      <div>
        <label htmlFor="height">Height (cm):</label>
        <input
          type="number"
          id="height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          required
          min={50}
          max={250}
          style={{ width: '100%', padding: '8px', marginTop: '5px' }}
        />

        <label htmlFor="weight" style={{ marginTop: '15px', display: 'block' }}>Actual Body Weight (kg):</label>
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
          min={10}
          max={300}
          style={{ width: '100%', padding: '8px', marginTop: '5px' }}
        />

        <label htmlFor="gender" style={{ marginTop: '15px', display: 'block' }}>Gender:</label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginTop: '5px' }}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <button
          type="button"
          onClick={handleCalculate}
          style={{ marginTop: '20px', padding: '10px', width: '100%', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Calculate
        </button>
      </div>

      {/* Results */}
      {showResults && (
        <div className="results" style={{ marginTop: '20px', backgroundColor: '#fff', padding: '15px', borderRadius: '5px' }}>
          <h2>Results</h2>
          <p><strong>Ideal Body Weight (IBW):</strong> {ibw} kg</p>
          <p><strong>Adjusted Body Weight (AdjBW):</strong> {adjbw} kg</p>
          {/* BMI display with category suggestion */}
          <p><strong>BMI:</strong> {bmi}</p>
          {bmi && (
            <div style={{ marginTop: '10px', fontSize: '0.9em' }}>
              <em>Categories:</em> Underweight (&lt;18.5), Normal (18.5–22.9), Overweight (23–27.4), Obese (≥27.5)
            </div>
          )}
        </div>
      )}

{/* Reference section as collapsible */}
<div style={{ marginTop: '30px', border: '1px solid #ccc', borderRadius: '8px' }}>
  <button
    onClick={() => setRefExpanded(!refExpanded)}
    style={{
      width: '100%',
      padding: '10px',
      backgroundColor: '#e0e0e0',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <span style={{ fontWeight: 'bold' }}>Reference</span>
    <span>{refExpanded ? '▲' : '▼'}</span>
  </button>
  {refExpanded && (
    <div style={{ padding: '10px', backgroundColor: '#f9f9f9' }}>
       {/* BMI reference */}
    <p style={{ margin: 0 }}>
      <strong>BMI (Body Mass Index):</strong> MEMS. (2024). MEMS quick reference guide: Management of obesity (Version May 2023).
    </p>
    {/* IBW reference */}
    <p style={{ margin: 0, marginTop: '10px' }}>
      <strong>Ideal Body Weight (IBW):</strong> Devine, B. J. (1974). Gentamicin therapy. DICP, 8, 650–655.
    </p>
    {/* AdjBW reference */}
    <p style={{ margin: 0, marginTop: '10px' }}>
      <strong>Adjusted Body Weight (AdjBW):</strong> Bauer, L. A. (2001). <em>Applied clinical pharmacokinetics</em> (pp. 93–179). McGraw Hill, Medical Publishing Division.
    </p>
    {/* Additional pharmacokinetics reference */}
    <p style={{ margin: 0, marginTop: '10px' }}>
      Winter, M. E. (2004). <em>Basic pharmacokinetics</em>. Lippincott Williams & Williams.
      </p>
    </div>
  )}
</div>
</div>
  );
};

export default BodyWeightCalculatorPage;