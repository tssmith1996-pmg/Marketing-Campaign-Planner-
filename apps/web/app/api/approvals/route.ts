
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../(components)/prisma";
import { authGuard } from "../(components)/auth";

const Transition = z.object({ campaignId: z.string(), action: z.enum(["submit","approve","goLive","complete","revert"]) });

export async function POST(req: Request) {
  const { orgId, userId, role } = await authGuard();
  const { campaignId, action } = Transition.parse(await req.json());
  const campaign = await prisma.campaign.findFirst({ where: { id: campaignId, orgId } });
  if (!campaign) return new NextResponse("Not found", { status: 404 });
  const fsm: any = { DRAFT:{ submit:"PENDING_REVIEW" }, PENDING_REVIEW:{ approve:"APPROVED" }, APPROVED:{ goLive:"LIVE" }, LIVE:{ complete:"COMPLETE" }, COMPLETE:{ revert:"APPROVED" } };
  const next = fsm[campaign.status]?.[action];
  if (!next) return new NextResponse("Invalid transition", { status: 400 });
  if (action === "approve" && !(role === "ADMIN" || role === "OWNER")) return new NextResponse("Forbidden", { status: 403 });
  const updated = await prisma.campaign.update({ where: { id: campaign.id }, data: { status: next } });
  await prisma.approval.create({ data: { campaignId, state: next, reviewedBy: userId } });
  return NextResponse.json({ campaign: updated });
}
