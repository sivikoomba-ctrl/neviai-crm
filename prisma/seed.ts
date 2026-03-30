import { PrismaClient } from "../src/generated/prisma/client.js";

const prisma = new PrismaClient();

async function main() {
  await prisma.interaction.deleteMany();
  await prisma.deal.deleteMany();
  await prisma.contact.deleteMany();

  const contacts = await Promise.all([
    prisma.contact.create({
      data: {
        name: "Sarah Chen",
        email: "sarah.chen@techcorp.com",
        phone: "+1 (415) 555-0101",
        company: "TechCorp",
        notes: "VP of Engineering. Key decision maker for enterprise deals.",
        tags: JSON.stringify(["enterprise", "vip"]),
      },
    }),
    prisma.contact.create({
      data: {
        name: "Marcus Johnson",
        email: "marcus.j@innovate.io",
        phone: "+1 (212) 555-0202",
        company: "Innovate.io",
        notes: "CTO. Interested in AI-powered automation tools.",
        tags: JSON.stringify(["startup", "ai-interest"]),
      },
    }),
    prisma.contact.create({
      data: {
        name: "Emily Rodriguez",
        email: "emily.r@globalfin.com",
        phone: "+1 (312) 555-0303",
        company: "GlobalFin",
        notes: "Director of Operations. Budget approved for Q1.",
        tags: JSON.stringify(["enterprise", "finance"]),
      },
    }),
    prisma.contact.create({
      data: {
        name: "David Park",
        email: "david.park@nexusai.com",
        phone: "+1 (650) 555-0404",
        company: "NexusAI",
        notes: "Founder. Looking for partnership opportunities.",
        tags: JSON.stringify(["partner", "ai-interest"]),
      },
    }),
    prisma.contact.create({
      data: {
        name: "Lisa Thompson",
        email: "lisa.t@retailplus.com",
        phone: "+1 (305) 555-0505",
        company: "RetailPlus",
        notes: "Head of Digital Transformation.",
        tags: JSON.stringify(["retail", "enterprise"]),
      },
    }),
    prisma.contact.create({
      data: {
        name: "James Wilson",
        email: "james.w@cloudserv.net",
        phone: "+1 (503) 555-0606",
        company: "CloudServ",
        notes: "Senior architect. Evaluating cloud migration.",
        tags: JSON.stringify(["cloud", "technical"]),
      },
    }),
    prisma.contact.create({
      data: {
        name: "Ana Martinez",
        email: "ana.m@healthtech.org",
        phone: "+1 (617) 555-0707",
        company: "HealthTech",
        notes: "Product Manager. Healthcare compliance required.",
        tags: JSON.stringify(["healthcare", "compliance"]),
      },
    }),
    prisma.contact.create({
      data: {
        name: "Robert Kim",
        email: "robert.kim@datavault.com",
        phone: "+1 (206) 555-0808",
        company: "DataVault",
        notes: "CEO. Fast-growing data analytics company.",
        tags: JSON.stringify(["analytics", "vip"]),
      },
    }),
    prisma.contact.create({
      data: {
        name: "Priya Sharma",
        email: "priya.s@edulearn.com",
        phone: "+1 (408) 555-0909",
        company: "EduLearn",
        notes: "VP Product. EdTech sector, large user base.",
        tags: JSON.stringify(["edtech", "growth"]),
      },
    }),
    prisma.contact.create({
      data: {
        name: "Michael Brown",
        email: "michael.b@mfgcorp.com",
        phone: "+1 (713) 555-1010",
        company: "MfgCorp",
        notes: "Operations Director. Manufacturing automation.",
        tags: JSON.stringify(["manufacturing", "enterprise"]),
      },
    }),
  ]);

  await Promise.all([
    prisma.deal.create({ data: { title: "TechCorp Enterprise License", value: 120000, stage: "Won", contactId: contacts[0].id } }),
    prisma.deal.create({ data: { title: "TechCorp Annual Renewal", value: 85000, stage: "Negotiation", contactId: contacts[0].id } }),
    prisma.deal.create({ data: { title: "Innovate.io Pilot Program", value: 15000, stage: "Proposal", contactId: contacts[1].id } }),
    prisma.deal.create({ data: { title: "GlobalFin Platform Migration", value: 250000, stage: "Qualified", contactId: contacts[2].id } }),
    prisma.deal.create({ data: { title: "NexusAI Partnership Deal", value: 75000, stage: "Negotiation", contactId: contacts[3].id } }),
    prisma.deal.create({ data: { title: "RetailPlus Digital Suite", value: 95000, stage: "Proposal", contactId: contacts[4].id } }),
    prisma.deal.create({ data: { title: "CloudServ Migration Package", value: 180000, stage: "Lead", contactId: contacts[5].id } }),
    prisma.deal.create({ data: { title: "HealthTech Compliance Module", value: 65000, stage: "Qualified", contactId: contacts[6].id } }),
    prisma.deal.create({ data: { title: "DataVault Analytics Platform", value: 200000, stage: "Won", contactId: contacts[7].id } }),
    prisma.deal.create({ data: { title: "DataVault Premium Support", value: 45000, stage: "Proposal", contactId: contacts[7].id } }),
    prisma.deal.create({ data: { title: "EduLearn Learning Suite", value: 55000, stage: "Lead", contactId: contacts[8].id } }),
    prisma.deal.create({ data: { title: "MfgCorp Automation System", value: 310000, stage: "Negotiation", contactId: contacts[9].id } }),
    prisma.deal.create({ data: { title: "Innovate.io Full Deployment", value: 42000, stage: "Lead", contactId: contacts[1].id } }),
    prisma.deal.create({ data: { title: "GlobalFin Data Dashboard", value: 35000, stage: "Lost", contactId: contacts[2].id } }),
    prisma.deal.create({ data: { title: "RetailPlus POS Integration", value: 28000, stage: "Won", contactId: contacts[4].id } }),
  ]);

  await Promise.all([
    prisma.interaction.create({ data: { type: "email", subject: "Enterprise proposal follow-up", body: "Sent updated pricing for the enterprise tier.", contactId: contacts[0].id } }),
    prisma.interaction.create({ data: { type: "call", subject: "Discovery call", body: "Discussed requirements and timeline. Very interested in AI features.", contactId: contacts[0].id } }),
    prisma.interaction.create({ data: { type: "meeting", subject: "Product demo", body: "Presented full platform demo. Positive feedback on analytics module.", contactId: contacts[0].id } }),
    prisma.interaction.create({ data: { type: "email", subject: "Introduction email", body: "Initial outreach with product overview.", contactId: contacts[1].id } }),
    prisma.interaction.create({ data: { type: "call", subject: "Technical discussion", body: "Deep dive into API capabilities and integrations.", contactId: contacts[1].id } }),
    prisma.interaction.create({ data: { type: "meeting", subject: "Budget review meeting", body: "Reviewed Q1 budget allocation. Approved for pilot.", contactId: contacts[2].id } }),
    prisma.interaction.create({ data: { type: "email", subject: "Partnership proposal", body: "Sent partnership framework document.", contactId: contacts[3].id } }),
    prisma.interaction.create({ data: { type: "note", subject: "Internal note", body: "High potential account. Escalate to senior sales.", contactId: contacts[4].id } }),
    prisma.interaction.create({ data: { type: "call", subject: "Follow-up call", body: "Addressed concerns about cloud migration timeline.", contactId: contacts[5].id } }),
    prisma.interaction.create({ data: { type: "meeting", subject: "Compliance review", body: "Reviewed HIPAA compliance requirements with their legal team.", contactId: contacts[6].id } }),
    prisma.interaction.create({ data: { type: "email", subject: "Contract negotiation", body: "Sent revised contract with updated terms.", contactId: contacts[7].id } }),
    prisma.interaction.create({ data: { type: "call", subject: "Product roadmap discussion", body: "Shared upcoming features relevant to their use case.", contactId: contacts[8].id } }),
    prisma.interaction.create({ data: { type: "meeting", subject: "Factory visit", body: "On-site visit to understand manufacturing workflow.", contactId: contacts[9].id } }),
    prisma.interaction.create({ data: { type: "email", subject: "Quote follow-up", body: "Sent detailed quote breakdown per department.", contactId: contacts[9].id } }),
  ]);

  console.log("Seed complete: 10 contacts, 15 deals, 14 interactions created.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
