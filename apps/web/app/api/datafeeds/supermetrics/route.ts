import { NextRequest, NextResponse } from 'next/server';
import { authGuard } from '../../../(components)/auth';
import { importActualsFromSupermetrics } from '../../../../lib/supermetrics';

export async function POST(req: NextRequest) {
  const { orgId } = await authGuard();
  const body = await req.json();
  const { campaignId, dsId, startDate, endDate } = body;
  if (!campaignId || !dsId || !startDate || !endDate) {
    return NextResponse.json({ error: 'Missing params' }, { status: 400 });
  }
  // Ensure campaign belongs to org (simplified)
  // Real implementation should verify orgId with campaignId
  try {
    const records = await importActualsFromSupermetrics(campaignId, { dsId, startDate, endDate });
    return NextResponse.json({ imported: records.length });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
