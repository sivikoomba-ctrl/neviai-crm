import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const interactions = await prisma.interaction.findMany({
      where: { contactId: id },
      orderBy: { createdAt: "desc" },
    });

    return Response.json(interactions);
  } catch (error) {
    console.error("GET /api/contacts/[id]/interactions error:", error);
    return Response.json({ error: "Failed to fetch interactions" }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { type, subject, body: interactionBody, metadata } = body;

    if (!type) {
      return Response.json({ error: "Interaction type is required" }, { status: 400 });
    }

    const interaction = await prisma.interaction.create({
      data: {
        type,
        subject,
        body: interactionBody,
        metadata,
        contactId: id,
      },
    });

    return Response.json(interaction, { status: 201 });
  } catch (error) {
    console.error("POST /api/contacts/[id]/interactions error:", error);
    return Response.json({ error: "Failed to create interaction" }, { status: 500 });
  }
}
