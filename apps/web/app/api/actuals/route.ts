import { NextResponse } from "next/server";
import prisma from "../../(components)/prisma";
import { authGuard } from "../../(components)/auth";

export async function GET(req: Request) {
  const { orgId } = await authGuard();
  const { searchParams } = new URL(req.url);
  const campaignId = searchParams.get("campaignId") || undefined;

  const data = await prisma.actual.findMany({
    where: {
      ...(campaignId ? { campaignId } : {}),
      campaign: { orgId },
    },
    orderBy: { date: "asc" },
  });

  return NextResponse.json({ data });
}
