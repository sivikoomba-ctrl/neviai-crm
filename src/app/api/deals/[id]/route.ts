import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deal = await prisma.deal.findUnique({
      where: { id },
      include: { contact: true },
    });

    if (!deal) {
      return Response.json({ error: "Deal not found" }, { status: 404 });
    }

    return Response.json(deal);
  } catch (error) {
    console.error("GET /api/deals/[id] error:", error);
    return Response.json({ error: "Failed to fetch deal" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, value, stage, aiScore, aiAdvice, contactId } = body;

    const data: Record<string, unknown> = {};
    if (title !== undefined) data.title = title;
    if (value !== undefined) data.value = parseFloat(value);
    if (stage !== undefined) data.stage = stage;
    if (aiScore !== undefined) data.aiScore = aiScore;
    if (aiAdvice !== undefined) data.aiAdvice = aiAdvice;
    if (contactId !== undefined) data.contactId = contactId;

    const deal = await prisma.deal.update({
      where: { id },
      data,
      include: { contact: true },
    });

    return Response.json(deal);
  } catch (error) {
    console.error("PUT /api/deals/[id] error:", error);
    return Response.json({ error: "Failed to update deal" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.deal.delete({ where: { id } });
    return Response.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/deals/[id] error:", error);
    return Response.json({ error: "Failed to delete deal" }, { status: 500 });
  }
}
