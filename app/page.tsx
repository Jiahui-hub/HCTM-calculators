/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import BodyWeightCalculator from "./pages/BodyWeightCalculator";
import PotassiumCalculator from "./pages/PotassiumCalculator";
import SodiumCalculator from "./pages/SodiumCalculator";
import MagnesiumCalculator from "./pages/MagnesiumCalculator";

const Placeholder = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#f0f0f0] flex flex-col items-center justify-center p-8 font-sans">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        This calculator is currently under development. Please paste the code for this page to implement its functionality.
      </p>
      <button 
        onClick={() => navigate("/")}
        className="px-6 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all font-medium text-gray-800"
      >
        Back to Home
      </button>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculators/ibw-adjbw" element={<BodyWeightCalculator />} />
        <Route path="/calculators/potassium" element={<PotassiumCalculator />} />
        <Route path="/calculators/sodium" element={<SodiumCalculator />} />
        <Route path="/calculators/magnesium" element={<MagnesiumCalculator />} />
      </Routes>
    </Router>
  );
}
