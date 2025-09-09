
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export async function authGuard() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || !(session as any).orgId) {
    throw new Error("Unauthorized");
  }
  return {
    orgId: (session as any).orgId as string,
    userId: session.user.id as string,
    role: ((session as any).role as string) || "VIEWER",
  };
}
