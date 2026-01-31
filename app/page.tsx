"use client"; // for router
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
        HCTM Calculators
      </h1>

      <div className="dashboard max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="card bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Potassium Calculator</h2>
          <p className="text-gray-700 mb-4">Estimate potassium deficit safely</p>
          <button
            onClick={() => router.push("/calculators/potassium")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 px-4 rounded-lg"
          >
            Open
          </button>
        </div>

        <div className="card bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Sodium Calculator</h2>
          <p className="text-gray-700 mb-4">Correct sodium safely</p>
          <button
            onClick={() => router.push("/calculators/sodium")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 px-4 rounded-lg"
          >
            Open
          </button>
        </div>

        <div className="card bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Magnesium Calculator</h2>
          <p className="text-gray-700 mb-4">Check magnesium safely</p>
          <button
            onClick={() => router.push("/calculators/magnesium")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 px-4 rounded-lg"
          >
            Open
          </button>
        </div>

        <div className="card bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Corrected Calcium</h2>
          <p className="text-gray-700 mb-4">Adjust calcium for albumin</p>
          <button
            onClick={() => router.push("/calculators/calcium")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 px-4 rounded-lg"
          >
            Open
          </button>
        </div>
      </div>
    </div>
  );
}
