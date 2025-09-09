import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../(components)/prisma";
import { authGuard } from "../../(components)/auth";

const Create = z.object({
  name: z.string().min(2),
});

export async function GET() {
  const { orgId } = await authGuard();
  const data = await prisma.client.findMany({ where: { orgId } });
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  const { orgId } = await authGuard();
  const body = Create.parse(await req.json());
  const client = await prisma.client.create({ data: { ...body, orgId } });
  return NextResponse.json({ client }, { status: 201 });
}
