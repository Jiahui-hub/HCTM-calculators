"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/")}
      className="
        mb-6
        flex
        items-center
        gap-2
        text-sm
        text-slate-600
        hover:text-slate-900
        transition
      "
    >
      ← Back to Calculator
    </button>
  );
}
