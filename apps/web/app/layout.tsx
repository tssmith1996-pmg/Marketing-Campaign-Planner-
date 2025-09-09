import Navigation from "./(components)/navigation";
import Sidebar from "./(components)/sidebar";

export const metadata = { title: "Media Planner" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          background: "#f5f7fa",
          display: "flex",
          height: "100vh",
        }}
      >
        <Sidebar />
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Navigation />
          <main style={{ flex: 1, overflow: "auto", padding: 24 }}>{children}</main>
        </div>
      </body>
    </html>
  );
}
