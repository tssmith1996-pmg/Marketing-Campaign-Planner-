
import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import prisma from "../../(components)/prisma";

export async function POST(req: Request) {
  const { campaignId } = await req.json();
  const c = await prisma.campaign.findUnique({ where: { id: campaignId }, include: { client: true, flights: true } });
  if (!c) return new NextResponse("Not found", { status: 404 });

  const doc = new PDFDocument({ margin: 36 });
  const chunks: Buffer[] = [];
  doc.on("data", (d) => chunks.push(d));
  const done = new Promise<Buffer>((res) => doc.on("end", () => res(Buffer.concat(chunks))));

  doc.fontSize(16).text(process.env.ORG_NAME || "Media Planner", { align: "right" });
  doc.moveDown().fontSize(22).text(`Insertion Order: ${c.name}`);
  doc.fontSize(12).text(`Client: ${c.client?.name || "-"}`);
  doc.text(`Dates: ${c.startDate.toDateString()}–${c.endDate.toDateString()}`);
  doc.moveDown().text("Flights:");
  c.flights.forEach((f) => doc.text(`• ${f.channel} ${f.market} ${f.startDate.toDateString()}–${f.endDate.toDateString()}  Budget: $${f.budget}`));
  doc.end();
  const pdf = await done;
  return new NextResponse(pdf, { headers: { "Content-Type": "application/pdf" } });
}
