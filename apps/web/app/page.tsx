
import Link from "next/link";
export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Media Planner</h1>
      <p>Welcome. Go to the <Link href="/dashboard">dashboard</Link>.</p>
    </main>
  );
}
