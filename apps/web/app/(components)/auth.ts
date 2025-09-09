
export async function authGuard() {
  // Placeholder without real NextAuth wiring (so the starter runs)
  // In dev, pretend a single org/user; swap to NextAuth later.
  return { orgId: "dev-org", userId: "dev-user", role: "ADMIN" };
}
