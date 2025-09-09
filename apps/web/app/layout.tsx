import Navigation from "./(components)/navigation";

export const metadata = { title: "Media Planner" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{ fontFamily: "system-ui, sans-serif", margin: 0, background: "#f5f7fa" }}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
