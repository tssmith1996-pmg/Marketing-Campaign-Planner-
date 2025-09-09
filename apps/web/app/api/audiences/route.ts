import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../(components)/prisma";
import { authGuard } from "../../(components)/auth";

const Create = z.object({
  name: z.string().min(2),
  definition: z.any(),
});

export async function GET() {
  const { orgId } = await authGuard();
  const data = await prisma.audience.findMany({ where: { orgId } });
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  const { orgId } = await authGuard();
  const body = Create.parse(await req.json());
  const audience = await prisma.audience.create({ data: { ...body, orgId } });
  return NextResponse.json({ audience }, { status: 201 });
}
