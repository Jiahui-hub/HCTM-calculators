"use client"; // for router
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-10">
      <h1 className="text-4xl font-bold text-gray-900 mb-10">HCTM Calculators</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl px-4">
        {/* Potassium */}
        <CalculatorCard
          title="Potassium Calculator"
          description="Estimate potassium deficit safely"
          onClick={() => router.push("/calculators/potassium")}
        />

        {/* Sodium */}
        <CalculatorCard
          title="Sodium Calculator"
          description="Correct sodium safely"
          onClick={() => router.push("/calculators/sodium")}
        />

        {/* Magnesium */}
        <CalculatorCard
          title="Magnesium Calculator"
          description="Check magnesium safely"
          onClick={() => router.push("/calculators/magnesium")}
        />

        {/* Corrected Calcium */}
        <CalculatorCard
          title="Corrected Calcium"
          description="Adjust calcium for albumin"
          onClick={() => router.push("/calculators/calcium")}
        />
      </div>
    </div>
  );
}

function CalculatorCard({ title, description, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white text-gray-900 shadow-md rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-200"
    >
      <div>
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-700">{description}</p>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-200 w-full"
      >
        Open
      </button>
    </div>
  );
}
