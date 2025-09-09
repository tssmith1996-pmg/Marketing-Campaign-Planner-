
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../(components)/prisma";
import { authGuard } from "../../(components)/auth";

const Create = z.object({
  clientId: z.string(),
  name: z.string().min(2),
  objective: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
  budgetTotal: z.number().nonnegative(),
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

export async function GET() {
  const { orgId } = await authGuard();
  const data = await prisma.campaign.findMany({ where: { orgId }, include: { flights: true } });
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  const { orgId, userId } = await authGuard();
  const body = Create.parse(await req.json());
  const campaign = await prisma.campaign.create({
    data: {
      ...body,
      orgId,
      createdById: userId,
      status: "DRAFT",
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
    },
  });
  return NextResponse.json({ campaign }, { status: 201 });
}
