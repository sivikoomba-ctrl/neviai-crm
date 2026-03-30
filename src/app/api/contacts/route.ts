import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const q = request.nextUrl.searchParams.get("q");
    const where = q
      ? {
          OR: [
            { name: { contains: q } },
            { email: { contains: q } },
            { company: { contains: q } },
          ],
        }
      : undefined;

    const contacts = await prisma.contact.findMany({
      where,
      include: { deals: true, _count: { select: { interactions: true } } },
      orderBy: { createdAt: "desc" },
    });

    return Response.json(contacts, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("GET /api/contacts error:", error);
    return Response.json({ error: "Failed to fetch contacts" }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, notes, tags } = body;

    if (!name || !email) {
      return Response.json({ error: "Name and email are required" }, { status: 400 });
    }

    const contact = await prisma.contact.create({
      data: { name, email, phone, company, notes, tags },
    });

    return Response.json(contact, { status: 201 });
  } catch (error: unknown) {
    console.error("POST /api/contacts error:", error);
    if (error && typeof error === "object" && "code" in error && (error as { code: string }).code === "P2002") {
      return Response.json({ error: "A contact with this email already exists" }, { status: 409 });
    }
    return Response.json({ error: "Failed to create contact" }, { status: 500 });
  }
}
