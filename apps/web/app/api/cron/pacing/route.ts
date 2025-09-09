
import { NextResponse } from "next/server";
import prisma from "../../../(components)/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const campaignId = searchParams.get("campaignId");
  if (!campaignId) return new NextResponse("campaignId required", { status: 400 });
  const c = await prisma.campaign.findUnique({ where: { id: campaignId }, include: { flights: true, actuals: true } });
  if (!c) return new NextResponse("Not found", { status: 404 });

  const plan: Record<string, number> = {};
  const actual: Record<string, number> = {};

  for (const f of c.flights) {
    const msDay = 86400000;
    const days = Math.max(1, Math.ceil((+f.endDate - +f.startDate) / msDay) + 1);
    const perDay = Number(f.budget) / days;
    for (let t = +f.startDate; t <= +f.endDate; t += msDay) {
      const key = new Date(t).toISOString().slice(0, 10);
      plan[key] = (plan[key] || 0) + perDay;
    }
  }
  for (const a of c.actuals) {
    const key = a.date.toISOString().slice(0, 10);
    actual[key] = (actual[key] || 0) + Number(a.spend);
  }

  let cumPlan = 0, cumAct = 0;
  const allDates = Array.from(new Set([...Object.keys(plan), ...Object.keys(actual)])).sort();
  const rows = allDates.map(d => {
    cumPlan += plan[d] || 0;
    cumAct += actual[d] || 0;
    return { date: d, plan: Number(cumPlan.toFixed(2)), actual: Number(cumAct.toFixed(2)), delta: Number((cumAct - cumPlan).toFixed(2)) };
  });
  return NextResponse.json(rows);
}
