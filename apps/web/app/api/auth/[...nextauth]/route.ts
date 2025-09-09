import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../(components)/prisma";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Email",
      credentials: { email: { label: "Email", type: "email" } },
      async authorize(credentials) {
        const email = credentials?.email;
        if (!email) return null;
        let user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          user = await prisma.user.create({ data: { email } });
          // ensure default org/membership
          let org = await prisma.organization.findFirst();
          if (!org) {
            org = await prisma.organization.create({ data: { name: "Default Org", slug: "default-org" } });
          }
          await prisma.membership.create({ data: { userId: user.id, orgId: org.id, role: "PLANNER" } });
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        session.user = { ...(session.user || {}), id: token.sub } as any;
        const m = await prisma.membership.findFirst({ where: { userId: token.sub } });
        if (m) {
          (session as any).orgId = m.orgId;
          (session as any).role = m.role;
        }
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
