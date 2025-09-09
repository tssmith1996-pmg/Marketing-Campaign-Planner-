import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: 40, textAlign: "center" }}>
      <h1>Media Planner</h1>
      <p style={{ marginTop: 16 }}>
        Plan campaigns, manage audiences, and track pacing across channels.
      </p>
      <Link href="/dashboard" style={{ color: "#2563eb", textDecoration: "underline", marginTop: 24, display: "inline-block" }}>
        Go to Dashboard →
      </Link>
    </main>
  );
}
