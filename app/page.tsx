"use client"; // for router
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0f0f0", // Light background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        {[
          {
            title: "Potassium Calculator",
            description: "Estimate potassium deficit safely",
            route: "/calculators/potassium",
          },
          {
            title: "Sodium Calculator",
            description: "Correct sodium safely",
            route: "/calculators/sodium",
          },
          {
            title: "Magnesium Calculator",
            description: "Check magnesium safely",
            route: "/calculators/magnesium",
          },
          {
            title: "Corrected Calcium",
            description: "Adjust calcium for albumin",
            route: "/calculators/calcium",
          },
        ].map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              width: "100%",
              textAlign: "center",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onClick={() => router.push(item.route)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
            }}
          >
            <h2 style={{ marginBottom: "10px" }}>{item.title}</h2>
            <p style={{ margin: 0, color: "#555" }}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}