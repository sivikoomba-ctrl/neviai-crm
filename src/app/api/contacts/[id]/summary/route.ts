import { prisma } from "@/lib/prisma";
import { generateContactSummary } from "@/lib/ai/contact-summary";
import { NextRequest } from "next/server";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const contact = await prisma.contact.findUnique({
      where: { id },
      include: { deals: true, interactions: true },
    });

    if (!contact) {
      return Response.json({ error: "Contact not found" }, { status: 404 });
    }

    let summary: string;
    try {
      summary = await generateContactSummary(contact);
    } catch {
      // Fallback to basic summary if AI is unavailable
      const dealCount = contact.deals.length;
      const totalValue = contact.deals.reduce((sum, d) => sum + d.value, 0);
      const wonDeals = contact.deals.filter((d) => d.stage === "Won").length;
      const interactionCount = contact.interactions.length;
      summary = `${contact.name} is a ${contact.company ? `contact at ${contact.company}` : "valued contact"} with ${dealCount} deal${dealCount !== 1 ? "s" : ""} totaling $${totalValue.toLocaleString()}. ${wonDeals > 0 ? `They have ${wonDeals} won deal${wonDeals !== 1 ? "s" : ""}.` : "No deals won yet."} There have been ${interactionCount} recorded interaction${interactionCount !== 1 ? "s" : ""}. ${interactionCount > 5 ? "This is a highly engaged contact." : "Consider increasing engagement."}`;
    }

    const updated = await prisma.contact.update({
      where: { id },
      data: { aiSummary: summary },
    });

    return Response.json({ summary: updated.aiSummary });
  } catch (error) {
    console.error("POST /api/contacts/[id]/summary error:", error);
    return Response.json({ error: "Failed to generate summary" }, { status: 500 });
  }
}
