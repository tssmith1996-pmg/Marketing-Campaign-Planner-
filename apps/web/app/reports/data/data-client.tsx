'use client';

import { useState } from 'react';

interface Actual {
  id: string;
  date: string;
  spend: string;
  impressions?: number | null;
  clicks?: number | null;
}

export default function DataClient({ initialData }: { initialData: Actual[] }) {
  const [records, setRecords] = useState<Actual[]>(initialData);
  const [campaignId, setCampaignId] = useState('');
  const [dsId, setDsId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  async function refresh() {
    const params = new URLSearchParams();
    if (campaignId) params.set('campaignId', campaignId);
    const res = await fetch(`/api/actuals?${params.toString()}`);
    const json = await res.json();
    setRecords(json.data);
  }

  async function importSupermetrics() {
    await fetch('/api/datafeeds/supermetrics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ campaignId, dsId, startDate, endDate }),
    });
    await refresh();
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2 items-end">
        <input
          className="border p-2 rounded"
          placeholder="Campaign ID"
          value={campaignId}
          onChange={(e) => setCampaignId(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Supermetrics dsId"
          value={dsId}
          onChange={(e) => setDsId(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button
          onClick={importSupermetrics}
          className="bg-blue-600 text-white px-3 py-2 rounded"
        >
          Import via Supermetrics
        </button>
        <button onClick={refresh} className="border px-3 py-2 rounded">
          Load From DB
        </button>
      </div>

      <table className="min-w-full border-collapse border">
        <thead>
          <tr className="bg-gray-50">
            <th className="border p-2 text-left">Date</th>
            <th className="border p-2 text-left">Spend</th>
            <th className="border p-2 text-left">Impressions</th>
            <th className="border p-2 text-left">Clicks</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id} className="odd:bg-white even:bg-gray-50">
              <td className="border p-2">{new Date(r.date).toLocaleDateString()}</td>
              <td className="border p-2">{r.spend}</td>
              <td className="border p-2">{r.impressions ?? ''}</td>
              <td className="border p-2">{r.clicks ?? ''}</td>
            </tr>
          ))}
          {records.length === 0 && (
            <tr>
              <td colSpan={4} className="p-4 text-center text-gray-500">
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
