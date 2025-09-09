
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../(components)/prisma";
import { authGuard } from "../../../(components)/auth";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { orgId } = await authGuard();
  const c = await prisma.campaign.findFirst({ where: { id: params.id, orgId }, include: { flights: true, actuals: true } });
  if (!c) return new NextResponse("Not found", { status: 404 });
  return NextResponse.json(c);
}

const Patch = z.object({
  budgetTotal: z.number().optional(),
  targetMetric: z
    .enum([
      "IMPRESSIONS",
      "REACH",
      "WEBSITE_TRAFFIC",
      "CTR",
      "CPC",
      "LEADS",
      "CONVERSION_RATE",
      "CAC",
      "ROI",
    ])
    .optional(),
  targetValue: z.number().nonnegative().optional(),
});
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { orgId } = await authGuard();
  const body = Patch.parse(await req.json());
  const updated = await prisma.campaign.update({ where: { id: params.id }, data: body });
  return NextResponse.json(updated);
}
