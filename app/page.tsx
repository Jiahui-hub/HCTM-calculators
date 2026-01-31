"use client"; // for router
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const tiles = [
    {
      title: "Potassium Calculator",
      description: "Estimate potassium deficit safely",
      route: "/calculators/potassium",
      icon: "🧪", // Example emoji icon
    },
    {
      title: "Sodium Calculator",
      description: "Correct sodium safely",
      route: "/calculators/sodium",
      icon: "🧂",
    },
    {
      title: "Magnesium Calculator",
      description: "Check magnesium safely",
      route: "/calculators/magnesium",
      icon: "⚗️",
    },
    {
      title: "Corrected Calcium",
      description: "Adjust calcium for albumin",
      route: "/calculators/calcium",
      icon: "🦴",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0f0f0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}
    >
      {/* Page Title */}
      <h1
        style={{
          marginBottom: "40px",
          fontSize: "2.5rem",
          color: "#222",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        HCTM Calculators
      </h1>

      {/* Container for tiles with animation */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "25px",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        {tiles.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "15px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              width: "100%",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "all 0.3s ease",
              opacity: 0,
              transform: "translateY(20px)",
              animation: `fadeInUp 0.5s ease forwards ${index * 0.2}s`,
            }}
            onClick={() => router.push(item.route)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            }}
          >
            {/* Icon */}
            <div
              style={{
                fontSize: "2rem",
                marginBottom: "12px",
              }}
            >
              {item.icon}
            </div>
            {/* Title */}
            <h2 style={{ marginBottom: "8px", color: "#222" }}>{item.title}</h2>
            {/* Description */}
            <p style={{ margin: 0, color: "#555", textAlign: "center" }}>
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Keyframes for fade-in animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}