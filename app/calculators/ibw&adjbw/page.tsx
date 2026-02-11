"use client";

import { useState } from 'react';

const BodyWeightCalculatorPage = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [ibw, setIbw] = useState<number | null>(null);
  const [abw, setAbw] = useState<number | null>(null);
  const [adjbw, setAdjbw] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [refText, setRefText] = useState('');
  const [reference, setReference] = useState(''); // To store selected reference

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

    // Calculate ABW
    const minABW = 0.8 * ibwValue;
    const abwValue = weightNum < minABW ? minABW : weightNum;

    // Calculate AdjBW
    const adjbwValue = ibwValue + 0.4 * (weightNum - ibwValue);

    setIbw(parseFloat(ibwValue.toFixed(2)));
    setAbw(parseFloat(abwValue.toFixed(2)));
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

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', backgroundColor: '#f4f4f4', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Body Weight Calculator</h1>
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

      {showResults && (
        <div className="results" style={{ marginTop: '20px', backgroundColor: '#fff', padding: '15px', borderRadius: '5px' }}>
          <h2>Results</h2>
          <p><strong>Ideal Body Weight (IBW):</strong> {ibw} kg</p>
          <p><strong>Adjusted Body Weight (ABW):</strong> {abw} kg</p>
          <p><strong>Adjusted Body Weight (AdjBW):</strong> {adjbw} kg</p>
        </div>
      )}

      <div className="reference" style={{ marginTop: '30px' }}>
        <label htmlFor="refDropdown">Reference:</label>
        <select id="refDropdown" value={reference} onChange={handleRefChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
          <option value="">Select a reference</option>
          <option value="devine">Devine Formula</option>
          <option value="broca">Broca Index</option>
          {/* Add more options here as needed */}
        </select>
        <p style={{ marginTop: '10px' }}>{refText}</p>
      </div>
    </div>
  );
};

export default BodyWeightCalculatorPage;