"use client"; // for router
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="dashboard bg-gray-50 text-gray-900 min-h-screen">
      <div className="card">
        <h2>Potassium Calculator</h2>
        <p>Estimate potassium deficit safely</p>
        <button onClick={() => router.push("/calculators/potassium")}>Open</button>
      </div>
      <div className="card">
        <h2>Sodium Calculator</h2>
        <p>Correct sodium safely</p>
        <button onClick={() => router.push("/calculators/sodium")}>Open</button>
      </div>
      <div className="card">
        <h2>Magnesium Calculator</h2>
        <p>Check magnesium safely</p>
        <button onClick={() => router.push("/calculators/magnesium")}>Open</button>
      </div>
      <div className="card">
        <h2>Corrected Calcium</h2>
        <p>Adjust calcium for albumin</p>
        <button onClick={() => router.push("/calculators/calcium")}>Open</button>
      </div>
    </div>
  );
}
