"use client"; // for router
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-start py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        HCTM Clinical Calculators
      </h1>

      <div className="flex flex-col space-y-6 w-full max-w-sm">
        {/* Potassium */}
        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Potassium Calculator
          </h2>
          <p className="text-gray-700 mb-4">
            Estimate potassium deficit safely
          </p>
          <button
            onClick={() => router.push("/calculators/potassium")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Open
          </button>
        </div>

        {/* Sodium */}
        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Sodium Calculator
          </h2>
          <p className="text-gray-700 mb-4">
            Correct sodium safely
          </p>
          <button
            onClick={() => router.push("/calculators/sodium")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Open
          </button>
        </div>

        {/* Magnesium */}
        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Magnesium Calculator
          </h2>
          <p className="text-gray-700 mb-4">
            Check magnesium safely
          </p>
          <button
            onClick={() => router.push("/calculators/magnesium")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Open
          </button>
        </div>

        {/* Corrected Calcium */}
        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Corrected Calcium
          </h2>
          <p className="text-gray-700 mb-4">
            Adjust calcium for albumin
          </p>
          <button
            onClick={() => router.push("/calculators/calcium")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Open
          </button>
        </div>
      </div>
    </div>
  );
}
