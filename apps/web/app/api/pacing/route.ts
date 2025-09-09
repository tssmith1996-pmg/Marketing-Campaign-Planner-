import { NextRequest, NextResponse } from 'next/server';
import { authGuard } from '../../(components)/auth';
import prisma from '../../(components)/prisma';
import { calculatePacing } from '../../../lib/pacing';

export async function GET(req: NextRequest) {
  const { orgId } = await authGuard();
  const { searchParams } = new URL(req.url);
  const campaignId = searchParams.get('plan_version_id');
  const asOfStr = searchParams.get('asOf');
  if (!campaignId) {
    return NextResponse.json({ error: 'plan_version_id required' }, { status: 400 });
  }
  const asOf = asOfStr ? new Date(asOfStr) : new Date();
  const campaign = await prisma.campaign.findFirst({
    where: { id: campaignId, orgId },
    include: { flights: true, actuals: { where: { date: { lte: asOf } } } },
  });
  if (!campaign) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const rows: any[] = [];
  for (const flight of campaign.flights) {
    const flightActuals = campaign.actuals.filter(a => a.flightId === flight.id);
    const pacing = calculatePacing(
      { startDate: flight.startDate, endDate: flight.endDate, budget: Number(flight.budget) },
      flightActuals,
      asOf
    );
    rows.push({
      level: 'line',
      ref_id: flight.id,
      snapshot_date: asOf.toISOString().slice(0, 10),
      period_start: flight.startDate.toISOString().slice(0, 10),
      period_end: flight.endDate.toISOString().slice(0, 10),
      planned_spend: pacing.planned,
      actual_spend: pacing.actual,
      variance_spend_pct: pacing.variancePct,
    });
  }
  const totalBudget = campaign.flights.reduce((s, f) => s + Number(f.budget), 0);
  const planPacing = calculatePacing(
    { startDate: campaign.startDate, endDate: campaign.endDate, budget: totalBudget },
    campaign.actuals,
    asOf
  );
  rows.unshift({
    level: 'plan',
    ref_id: campaign.id,
    snapshot_date: asOf.toISOString().slice(0, 10),
    period_start: campaign.startDate.toISOString().slice(0, 10),
    period_end: campaign.endDate.toISOString().slice(0, 10),
    planned_spend: planPacing.planned,
    actual_spend: planPacing.actual,
    variance_spend_pct: planPacing.variancePct,
  });
  return NextResponse.json(rows);
}
