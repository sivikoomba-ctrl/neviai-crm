import { prisma } from "@/lib/prisma";
import { smartSearch } from "@/lib/ai/smart-search";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const q = request.nextUrl.searchParams.get("q");

    if (!q) {
      return Response.json({ results: [] });
    }

    let results;
    try {
      results = await smartSearch(q);
    } catch {
      // Fallback to basic text search if AI is unavailable
      const [contacts, deals] = await Promise.all([
        prisma.contact.findMany({
          where: {
            OR: [
              { name: { contains: q } },
              { email: { contains: q } },
              { company: { contains: q } },
            ],
          },
          take: 10,
          orderBy: { updatedAt: "desc" },
        }),
        prisma.deal.findMany({
          where: {
            OR: [{ title: { contains: q } }],
          },
          include: { contact: { select: { name: true } } },
          take: 10,
          orderBy: { updatedAt: "desc" },
        }),
      ]);

      results = [
        ...contacts.map((c) => ({
          type: "contact" as const,
          id: c.id,
          title: c.name,
          subtitle: `${c.email}${c.company ? ` · ${c.company}` : ""}`,
          relevance: "Text match",
        })),
        ...deals.map((d) => ({
          type: "deal" as const,
          id: d.id,
          title: d.title,
          subtitle: `$${d.value.toLocaleString()} · ${d.stage} · ${d.contact.name}`,
          relevance: "Text match",
        })),
      ];
    }

    return Response.json({ results });
  } catch (error) {
    console.error("GET /api/search error:", error);
    return Response.json({ error: "Search failed" }, { status: 500 });
  }
}
