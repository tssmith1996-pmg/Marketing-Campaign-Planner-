
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../(components)/prisma";
import { authGuard } from "../(components)/auth";

const CreateFlight = z.object({
  campaignId: z.string(),
  channel: z.string(),
  market: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  budget: z.number().nonnegative(),
  pacingMode: z.enum(["daily", "weekly"]).optional(),
});

export async function POST(req: Request) {
  const { orgId } = await authGuard();
  const body = CreateFlight.parse(await req.json());
  const camp = await prisma.campaign.findFirst({ where: { id: body.campaignId, orgId } });
  if (!camp) return new NextResponse("Campaign not found", { status: 404 });
  const flight = await prisma.flight.create({
    data: { ...body, startDate: new Date(body.startDate), endDate: new Date(body.endDate) },
  });
  return NextResponse.json({ flight }, { status: 201 });
}
