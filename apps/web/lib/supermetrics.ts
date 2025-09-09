import type { Actual } from '@prisma/client';
import prisma from '../app/(components)/prisma';

export interface SupermetricsRow {
  date: string;
  spend?: number;
  impressions?: number;
  clicks?: number;
  [key: string]: string | number | undefined;
}

interface PullParams {
  dsId: string;
  startDate: string;
  endDate: string;
  metrics?: string[];
  dimensions?: string[];
}

const API_BASE = 'https://api.supermetrics.com/insight/v2';

async function getToken() {
  const res = await fetch(`${API_BASE}/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'sm_api',
      api_key: process.env.SUPERMETRICS_API_KEY,
    }),
  });
  if (!res.ok) throw new Error(`Supermetrics token error ${res.status}`);
  const json = await res.json();
  return json.data.access_token as string;
}

export async function pullDailyMetrics(
  { dsId, startDate, endDate, metrics = ['spend', 'impressions', 'clicks'], dimensions = ['date'] }: PullParams
): Promise<SupermetricsRow[]> {
  const token = await getToken();
  const res = await fetch(`${API_BASE}/query/data`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ds_id: dsId,
      date_range: { start: startDate, end: endDate },
      metrics,
      dimensions,
    }),
  });
  if (!res.ok) throw new Error(`Supermetrics query error ${res.status}`);
  const json = await res.json();
  return (json.data?.rows || []) as SupermetricsRow[];
}

export async function importActualsFromSupermetrics(
  campaignId: string,
  params: PullParams
): Promise<Actual[]> {
  const rows = await pullDailyMetrics(params);
  const records: Actual[] = [];
  for (const row of rows) {
    const rec = await prisma.actual.create({
      data: {
        campaignId,
        date: new Date(row.date),
        spend: row.spend ? Number(row.spend) : 0,
        impressions: row.impressions ? Number(row.impressions) : undefined,
        clicks: row.clicks ? Number(row.clicks) : undefined,
        source: 'supermetrics',
      },
    });
    records.push(rec);
  }
  return records;
}
