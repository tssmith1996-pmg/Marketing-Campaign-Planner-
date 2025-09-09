import { NextRequest, NextResponse } from "next/server";
import PDFDocument from "pdfkit";

export async function POST(req: NextRequest) {
  const items = await req.json();
  const doc = new PDFDocument({ margin: 40 });
  const chunks: Buffer[] = [];
  doc.on("data", (chunk) => chunks.push(chunk));

  doc.fontSize(18).text("Media Plan");
  doc.moveDown();
  items.forEach((item: any) => {
    doc
      .fontSize(12)
      .text(
        `${item.channel} | ${item.market} | ${item.format} | ${item.audience} | ${item.start} - ${item.end} | Est: $${item.estimatedCost.toFixed(2)}`
      );
  });
  doc.end();

  await new Promise((resolve) => doc.on("end", resolve));
  const pdf = Buffer.concat(chunks);
  return new NextResponse(pdf, {
    headers: {
      "Content-Type": "application/pdf",
    },
  });
}
