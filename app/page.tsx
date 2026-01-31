"use client"; 
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const calculators = [
    {
      title: "Potassium Calculator",
      desc: "Estimate potassium deficit safely",
      route: "/calculators/potassium",
      color: "bg-yellow-50"
    },
    {
      title: "Sodium Calculator",
      desc: "Correct sodium safely",
      route: "/calculators/sodium",
      color: "bg-blue-50"
    },
    {
      title: "Magnesium Calculator",
      desc: "Check magnesium safely",
      route: "/calculators/magnesium",
      color: "bg-purple-50"
    },
    {
      title: "Corrected Calcium",
      desc: "Adjust calcium for albumin",
      route: "/calculators/calcium",
      color: "bg-green-50"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
        HCTM Calculators
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {calculators.map((calc) => (
          <div
            key={calc.title}
            className={`${calc.color} rounded-2xl shadow-md p-6 flex flex-col justify-between`}
          >
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{calc.title}</h2>
              <p className="text-gray-700 mb-4">{calc.desc}</p>
            </div>
            <button
              onClick={() => router.push(calc.route)}
              className="mt-auto bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 px-4 rounded-lg transition"
            >
              Open
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
